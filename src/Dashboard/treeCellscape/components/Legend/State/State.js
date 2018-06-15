import React from "react";

import config from "./config.js";

import styled from "react-emotion";

const { stateScale, stateColors } = config;

const legendBoxSize = 12;
const legendSpacing = 2;

const State = () => {
  const stateElements = stateScale.map((state, i) => (
    <LegendElement
      label={state}
      color={stateColors[i]}
      x={20}
      y={28 + i * (legendBoxSize + legendSpacing)}
    />
  ));

  return (
    <g>
      <Title x={16} y={8} fill={"#4f4f4f"}>
        State
      </Title>
      {stateElements}
    </g>
  );
};

const Title = styled("text")`
  font-size: 12px;
  dominant-baseline: hanging;
`;

const LegendElement = ({ label, color, x, y }) => (
  <g>
    <rect
      width={legendBoxSize}
      height={legendBoxSize}
      x={x}
      y={y}
      fill={color}
    />

    <Label x={x + legendBoxSize + 5} y={y} fill={"#4f4f4f"}>
      {label}
    </Label>
  </g>
);

const Label = styled("text")`
  font-size: 11px;
  dominant-baseline: hanging;
`;

export default State;
