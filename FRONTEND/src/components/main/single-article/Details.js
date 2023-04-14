//
import SingleDetail from "./SingleDetail";

import classes from "./Details.module.css";

const Details = (props) => {
  return (
    <div className={classes["details-container"]}>
      <h2>Detalji</h2>
      <div className={classes["details-body"]}>
        <ul>
          <SingleDetail
            detail={{ name: "Kablovska TV", value: props.data.kablovska }}
          />
          <SingleDetail detail={{ name: "Klima", value: props.data.klima }} />
          <SingleDetail detail={{ name: "Bazen", value: props.data.bazen }} />
          <SingleDetail
            detail={{ name: "Novogradnja", value: props.data.novogradnja }}
          />
          <SingleDetail
            detail={{ name: "Internet", value: props.data.internet }}
          />
          <SingleDetail detail={{ name: "Garaža", value: props.data.garaza }} />
          <SingleDetail
            detail={{ name: "Namješten", value: props.data.namjesten }}
          />
          {props.data.kratkorocno && (
            <SingleDetail
              detail={{ name: "Kratkoročno", value: props.data.kratkorocno }}
            />
          )}
          {props.data.dugorocno && (
            <SingleDetail
              detail={{ name: "Dugoročno", value: props.data.dugorocno }}
            />
          )}
        </ul>
      </div>
    </div>
  );
};

export default Details;
