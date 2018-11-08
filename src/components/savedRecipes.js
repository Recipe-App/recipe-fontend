import React, { Component, Fragment } from "react";

class SavedRecipes extends Component {
  render() {
    return (
      <div className="flex-container">
        {this.props.saved.map((x, index) => {
          return (
            <div className="card-container">
              <div className="picture">
                <img
                  src={x.image}
                  className="image"
                  id={`${x.id}`}
                  onClick={this.props.handleDelete}
                  style={{ borderTop: "solid 8px #FA3D3D" }}
                />
              </div>

              <button
                id={`${x.id}`}
                className="saved-button"
                onClick={this.props.handleAdd}
              >
              </button>

              <div className="text-container">
                <div>
                  <a className="title" href={x.url} target="_blank">
                    <p>{x.label}</p>
                  </a>
                  <ul>
                    {x.ingredients.split("//").map(ingredient => {
                      return (
                        <Fragment>
                          <li> {ingredient} </li>
                        </Fragment>
                      );
                    })}
                  </ul>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    );
  }
}

export default SavedRecipes;
