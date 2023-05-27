import { useParams } from "react-router-dom";

import Input from "../../shared/components/FormElements/Input";
import Button from "../../shared/components/FormElements/Button";
import {
  VALIDATOR_REQUIRE,
  VALIDATOR_MINLENGTH,
} from "../../shared/util/validators";

import "./PlaceForm.css";

const DUMMY_PLACES = [
  {
    id: "p1",
    title: "헬로우!!",
    description: "이거슨 디스크립션",
    imageUrl:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSPVipQuhXr5m5_H2x1Teu2HpulWpV2KDG4tg&usqp=CAU",
    address: "이거슨 주소",
    location: {
      lat: 0,
      lng: 0,
    },
    creator: "u1",
  },
  {
    id: "p2",
    title: "바이!!",
    description: "두번째 디스크립션 ",
    imageUrl:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQdGp62Rw-a6f3wgYWvZhp8UJ1Mn8jKlvy9bQ&usqp=CAU",
    address: "이거슨 주소",
    location: {
      lat: 0,
      lng: 0,
    },
    creator: "u2",
  },
];

const UpdatePlace = () => {
  const placeId = useParams().placeId;
  const identifiedPlace = DUMMY_PLACES.find((p) => p.id === placeId);
  if (!identifiedPlace) {
    return (
      <div className="center">
        <h2>place가 없습니다.</h2>
      </div>
    );
  }
  return (
    <form className="place-form">
      <Input
        id="title"
        element="input"
        type="text"
        label="Title"
        validators={[VALIDATOR_REQUIRE()]}
        errorText="타이틀을 입력해주세요"
        onInput={() => {}}
        value={identifiedPlace.title}
        valid={true}
      />
      <Input
        id="description"
        element="textarea"
        label="Description"
        validators={[VALIDATOR_MINLENGTH(5)]}
        errorText="5글자 이상 입력해주세요"
        onInput={() => {}}
        value={identifiedPlace.description}
        valid={true}
      />
      <Button type="submit" disabled={true}>
        Update Place
      </Button>
    </form>
  );
};
export default UpdatePlace;
