import CarouselEffect from "../../Components/Carousel/CarouselEffect";
import Catagory from "../../Components/Catagory/Catagory";
import Layout from "../../Components/Layout/Layout";
import Product from "../../Components/Product/Product";

function Landing() {
  return (
    <Layout>
      <CarouselEffect />;
      <Catagory />
      <Product />
    </Layout>
  );
}

export default Landing;
