import { catagoryInfo } from "./CatagoryInfo";
import CatagoryCard from "./CatagoryCard";
import Classes from "./catagory.module.css";

function Catagory() {
  return (
    <section className={Classes.catagory_container}>
      {catagoryInfo.map((info) => {
        console.log(info.name);

        const { title, name, imgLink } = info;
        return (
          <CatagoryCard
            title={title}
            name={name}
            imgLink={imgLink}
            key={imgLink}
          />
        );
      })}
    </section>
  );
}

export default Catagory;
