import Pixi from "../../Classes/Pixi";
import React, { useRef, useEffect } from "react";

const Canvas = () => {
  const pixiRef = useRef();

  useEffect(() => {
    const pixi = new Pixi(pixiRef.current);
    pixi.start();
  }, []);

  return <div ref={pixiRef}></div>;
};

export default Canvas;
