import React from "react";
import { useEffect, useState } from "react";
import UsersList from "../components/UsersList";
import ErrorModal from "../../shared/components/UiElement/ErrorModal";
import LoadingSpinner from "../../shared/components/UiElement/LoadingSpinner";

const Users = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState();
  const [loadedUsers, setLoadedUsers] = useState();

  // useEffect에는 콜백함수로 async를 넣지않는다.!!! 반드시 함수를 따로 만들어야함.
  useEffect(() => {
    const sendRequest = async () => {
      setIsLoading(true);

      try {
        const response = await fetch("http://localhost:4000/api/users");
        const responseData = await response.json();

        if (!response.ok) {
          throw new Error(response.message);
        }

        setLoadedUsers(responseData.users);
        setIsLoading(true);
      } catch (err) {
        setError(err.message);
      }
      setIsLoading(false);
    };

    sendRequest();
  }, []);

  const errorHandler = () => {
    setError(null);
  };
  return (
    <React.Fragment>
      <ErrorModal error={error} onClear={errorHandler} />
      {isLoading && (
        <div className="center">
          <LoadingSpinner />
        </div>
      )}
      {!isLoading && loadedUsers && <UsersList items={loadedUsers} />}
    </React.Fragment>
  );
};

export default Users;
