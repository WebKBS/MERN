import React from "react";

const GoalList = (props) => {
  return (
    <ul>
      {props.data.map((prop) => {
        return (
          <li key={prop.id}>
            {prop.name}: {prop.text}
          </li>
        );
      })}
    </ul>
  );
};

export default GoalList;
