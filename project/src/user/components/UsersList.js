import "./UsersList.css";
import UserItem from "./UsersItem";
const UsersList = (props) => {
  if (props.items.length === 0) {
    return (
      <div className="center">
        <h2>유저가 없습니다.</h2>
      </div>
    );
  }

  return (
    <ul className="users-list">
      {props.items.map((user) => {
        return (
          <UserItem
            key={user.id}
            id={user.id}
            image={user.image}
            name={user.name}
            placeCount={user.places}
          />
        );
      })}
    </ul>
  );
};
export default UsersList;
