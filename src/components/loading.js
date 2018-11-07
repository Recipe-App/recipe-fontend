import React from "react";
import { Image, Button, Panel } from "react-bootstrap";
function Loading(props) {
  return (
    <div className="loading-grid">
      <div className="loading-container">
        <div className="loading-square" />
        <div className="loading-text-container">
        </div>
      </div>
    </div>
  );
}
export default Loading;
