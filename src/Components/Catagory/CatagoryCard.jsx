import Classes from "./catagory.module.css";
import { Link } from "react-router-dom";

function CatagoryCard(props) {
  const { title, name, imgLink } = props;
  console.log(name);
  return (
    <div>
      <div className={Classes.catagory}>
        <Link to={`/Category/${name}`}>
          <span>
            <h2>{title}</h2>
          </span>
          <img src={imgLink} alt="img" />
          <p>Shop now</p>
        </Link>
      </div>
    </div>
  );
}

export default CatagoryCard;
