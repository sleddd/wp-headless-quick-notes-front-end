import React from "react";
import "./fullWidthBackground.scss";

const FullWidthBackground: React.FC<{ id: string }> = (props) => (
  <div
    id={`fullWidthBackground__${props.id}`}
    className="fullWidthBackground"></div>
);

export default FullWidthBackground;
