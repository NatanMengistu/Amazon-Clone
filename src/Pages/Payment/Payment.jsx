import Layout from "../../Components/Layout/Layout";
import Classes from "./payment.module.css";
import { DataContext } from "../../Components/DataProvider/DataProvider";
import { useContext, useState } from "react";
import ProductCard from "../../Components/Product/ProductCard";
import { useStripe, useElements, CardElement } from "@stripe/react-stripe-js";
import Currencyformat from "../../Components/CurrencyFormat/CurrencyFormat";
import { axiosInstance } from "../../Api/axios";
import { ClipLoader } from "react-spinners";
import { db } from "../../Utility/firebase";
import { useNavigate } from "react-router-dom";
import { Type } from "../../Utility/action.type";

function Payment() {
  const [cardError, setCardError] = useState(null);
  const [processing, setProcessing] = useState(false);
  const [{ user, basket }, dispatch] = useContext(DataContext);
  const totalItem = basket.reduce((amount, item) => {
    return item.amount + amount;
  }, 0);
  const total = basket.reduce((amount, item) => {
    return item.price * item.amount + amount;
  }, 0);
  const stripe = useStripe();
  const elements = useElements();
  const navigate = useNavigate();

  const handlechange = (e) => {
    e?.error?.message ? setCardError(e?.error?.message) : setCardError(" ");
  };

  const handlepayment = async (e) => {
    e.preventDefault();
    try {
      setProcessing(true);
      const response = await axiosInstance({
        method: "POST",
        url: `/payment/create?total=${total * 100}`,
      });
      console.log(response.data)
      const clientSecret = response.data?.clientSecret;
      const { paymentIntent } = await stripe.confirmCardPayment(clientSecret, {
        payment_method: {
          card: elements.getElement(CardElement),
         },
      });
      console.log(paymentIntent);
      await db
        .collection("users")
        .doc(user.uid)
        .collection("orders")
        .doc(paymentIntent.id)
        .set({
          basket: basket,
          amount: paymentIntent.amount,
          created: paymentIntent.created,
        });
      dispatch({ type: Type.EMPTY_BASKET });
      setProcessing(false);
      navigate("/order", { state: { msg: "you have placed new order" } });
    } catch (error) {
      console.log(error);
      setProcessing(false);
    }
  };
  return (
    <Layout>
      <div className={Classes.payment_header}>Checkout ({totalItem}) items</div>
      <section className={Classes.payment}>
        <div className={Classes.flex}>
          <h3>Delivery Address</h3>
          <div>
            <div>{user?.email}</div>
            <div>123 React Lane</div>
            <div>Chicago,IL</div>
          </div>
        </div>
        <hr />

        <div className={Classes.flex}>
          <h3>Review items and delivery</h3>
          <div>
            {basket.map((item) => {
              return <ProductCard key={item.id} product={item} flex={true} />;
            })}
          </div>
        </div>
        <hr />
        <div className={Classes.flex}>
          <h3>Payment methods</h3>
          <div className={Classes.payment_card_container}>
            <div className={Classes.payment_detail}>
              <form onSubmit={handlepayment}>
                {cardError && (
                  <small style={{ color: "red" }}>{cardError}</small>
                )}
                <CardElement onChange={handlechange} />
                <div className={Classes.payment_price}>
                  <div>
                    <span style={{ display: "flex", gap: "10px" }}>
                      Total Order | <Currencyformat amount={total} />
                    </span>
                  </div>
                  <button type="submit">
                    {processing ? (
                      <div className={Classes.loading}>
                        <ClipLoader color="grey" size={12} />
                        <p>Please wait ...</p>
                      </div>
                    ) : (
                      "pay Now"
                    )}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
}

export default Payment;
