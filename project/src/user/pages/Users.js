import UsersList from "../components/UsersList";

const Users = () => {
  const USERS = [
    {
      id: "u1",
      name: "Kang",
      image:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQP0IpZ4iMAHaVYDSV0xhM4Ot0egqIeuUAwXQ&usqp=CAU",
      places: 3,
    },
  ];

  return <UsersList items={USERS} />;
};

export default Users;
