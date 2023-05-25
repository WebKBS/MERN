import PlaceList from "../components/PlaceList";

import { useParams } from "react-router-dom";

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

const UserPlaces = () => {
  const userId = useParams().userId;
  const loadedPlaces = DUMMY_PLACES.filter((place) => place.creator === userId);
  return <PlaceList items={loadedPlaces} />;
};
export default UserPlaces;
