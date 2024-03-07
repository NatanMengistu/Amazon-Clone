import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { img } from "./data";
import Classes from "./carousel.module.css";

function CarouselEffect() {
  return (
    <div>
      <Carousel
        autoPlay={true}
        infiniteLoop={true}
        showIndicators={false}
        showThumbs={false}
      >
        {img.map((imageItemLink) => {
          return <img src={imageItemLink} key={imageItemLink} />;
        })}
      </Carousel>
      <div className={Classes.hero_img}></div>
    </div>
  );
}

export default CarouselEffect;
