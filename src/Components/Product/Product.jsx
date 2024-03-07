import { useEffect, useState } from "react";
import axios from "axios";
import ProductCard from "./ProductCard";
import Classes from "./product.module.css";
import Loader from "../Loader/Loader";

function Product() {
  const [products, setProducts] = useState();
  const [loading, setisLoading] = useState(false);
  useEffect(() => {
    setisLoading(true);
    axios
      .get("https://fakestoreapi.com/products")
      .then((res) => {
        setProducts(res.data);
        setisLoading(false);
      })
      .catch((err) => {
        console.log(err);
        setisLoading(false);
      });
  }, []);
  return (
    <>
    {
      loading?(<Loader/>):(
        <section className={Classes.products_container}>
        {products?.map((singleProduct) => {
          return (
            <ProductCard
              renderAdd={true}
              product={singleProduct}
              key={singleProduct.id}
            />
          );
        })}
      </section>
    
      )
    }
       
    </>
  );
}

export default Product;
