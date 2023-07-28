import Card from '../../shared/components/UiElement/Card';
import PlaceItem from './PlaceItem';

import Button from '../../shared/components/FormElements/Button';
import './PlaceList.css';

const PlaceList = (props) => {
  if (props.items.length === 0) {
    return (
      <div className="place-list center">
        <Card>
          <h2>Place가 없습니다. 만드시겠습니까?</h2>
          <Button to="/places/new">Share Place</Button>
        </Card>
      </div>
    );
  }

  return (
    <ul className="place-list">
      {props.items.map((place) => (
        <PlaceItem key={place.id} id={place.id} image={place.image} title={place.title} description={place.description} address={place.address} creatorId={place.creator} coordinates={place.location} />
      ))}
    </ul>
  );
};

export default PlaceList;
