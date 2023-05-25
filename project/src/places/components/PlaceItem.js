import "./PlaceItem.css";
import Card from "../../shared/components/UiElement/Card";
import Button from "../../shared/components/FormElements/Button";

const PlaceItem = (props) => {
  return (
    <li className="place-item">
      <Card>
        <div className="place-item__image">
          <img src={props.image} alt={props.title} />
        </div>
        <div className="place-item__info">
          <h2>{props.title}</h2>
          <h2>{props.address}</h2>
          <h2>{props.description}</h2>
        </div>
        <div className="place-item__actions">
          <Button inverse>View On Map</Button>
          <Button to={`/places/${props.id}`}>Edit</Button>
          <Button danger>Delete</Button>
        </div>
      </Card>
    </li>
  );
};

export default PlaceItem;
