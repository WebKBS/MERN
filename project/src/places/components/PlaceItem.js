import React, { useState } from "react";
import "./PlaceItem.css";
import Card from "../../shared/components/UiElement/Card";
import Button from "../../shared/components/FormElements/Button";
import Modal from "../../shared/components/UiElement/Moal";

const PlaceItem = (props) => {
  const [showMap, setShowMap] = useState(false);

  const openMapHandler = () => setShowMap(true);
  const closeMapHandler = () => setShowMap(false);

  return (
    <React.Fragment>
      <Modal
        show={showMap}
        onCancel={closeMapHandler}
        header={props.address}
        contentClass="place-item__modal-content"
        footerClass="place-item__modal-actions"
        footer={<Button onClick={closeMapHandler}>Close</Button>}
      >
        <div className="map-container">
          <h2>The MAP!</h2>
        </div>
      </Modal>
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
            <Button inverse onClick={openMapHandler}>
              View On Map
            </Button>
            <Button to={`/places/${props.id}`}>Edit</Button>
            <Button danger>Delete</Button>
          </div>
        </Card>
      </li>
    </React.Fragment>
  );
};

export default PlaceItem;
