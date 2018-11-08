import React from "react";

function Card(props) {
  return (
    <div className="card-container">
      <div className="picture">
        <img
          src={props.image}
          className="image"
          index={props.index}
          url={props.url}
          onClick={props.handleClick}
          style={
            props.saved.includes(props.url)
              ? { borderTop: "solid 8px #FA3D3D" }
              : { borderTop: "none" }
          }
        />
      </div>
      <div className="text-container">
        <div>
          <a className="title" href={props.url} target="_blank">
            <p>{props.label}</p>
          </a>
          <ul>
            {props.ingredients.map(elementTwo => {
              return (
                <React.Fragment>
                  <li> {elementTwo.text} </li>
                </React.Fragment>
              );
            })}
          </ul>
        </div>
      </div>
    </div>
  );
}

export default Card
