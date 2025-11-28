import FloatingLines from "@/components/animations/FloatingLines";
import React from "react";

export const Background = () => {
  return (
    <div
      style={{
        width: "100%",
        overflow: "hidden",
        height: "100%",
        position: "absolute",
        borderTopLeftRadius: "50px",
        borderBottomLeftRadius: "50px",
        border: "0px",
        opacity: "0.9",
      }}
    >
      <FloatingLines
        enabledWaves={["top", "middle", "bottom"]}
        // Array - specify line count per wave; Number - same count for all waves
        lineCount={[10, 15, 20]}
        // Array - specify line distance per wave; Number - same distance for all waves
        lineDistance={[8, 6, 4]}
        bendRadius={5.0}
        bendStrength={-0.5}
        interactive={true}
        parallax={true}
      />
    </div>
  );
};
