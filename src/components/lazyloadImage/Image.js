import React from "react";
import { LazyLoadImage } from "react-lazy-load-image-component";
import "react-lazy-load-image-component/src/effects/blur.css";

const Image = ({ src, className, alt, click }) => {
  return (
    <LazyLoadImage
      className={className || ""}
      alt={alt || ""}
      effect="blur"
      src={src}
      onClick={click}
    />
  );
};

export default Image;
