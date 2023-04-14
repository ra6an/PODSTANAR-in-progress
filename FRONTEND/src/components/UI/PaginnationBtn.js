//

import classes from "./PaginnationBtn.module.css";

const PaginnationBtn = (props) => {
  // console.log(props.curPage);
  return (
    <li
      key={props.curPage}
      onClick={props.onClick}
      id={props.curPage}
      className={props.className ? props.className : ""}
    >
      {props.curPage}
    </li>
  );
};

export default PaginnationBtn;
