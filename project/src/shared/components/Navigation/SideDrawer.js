import "./SideDrawer.css";
import ReactDom from "react-dom";

const SiderDrawer = (props) => {
  const content = <aside className="side-drawer">{props.children}</aside>;

  return ReactDom.createPortal(content, document.getElementById("drawer-hook"));
};
export default SiderDrawer;
