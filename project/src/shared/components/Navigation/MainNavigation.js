import "./MainNavigation.css";

import { Link } from "react-router-dom";

import MainHeader from "./MainHeader";

const MainNavigation = (props) => {
  return (
    <MainHeader>
      <button className="main-navigation__menu-btn">
        <span />
        <span />
        <span />
      </button>
      <h1 className="main-navigation__title">
        <Link to="/">Your Place</Link>
      </h1>
      <nav>navi</nav>
    </MainHeader>
  );
};

export default MainNavigation;
