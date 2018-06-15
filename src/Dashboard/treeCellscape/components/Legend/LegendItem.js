import React from "react";

import styled from "react-emotion";

const legendBoxSize = 12;
const legendSpacing = 2;

const LegendItem = ({ title, labels, colors, y }) => {
  const elements = labels.map((label, i) => (
    <LegendElement
      key={`${title}-${label}`}
      label={label}
      color={colors[i]}
      x={20}
      y={20 + y + i * (legendBoxSize + legendSpacing)}
    />
  ));

  return (
    <g>
      <Title x={16} y={y} fill={"#4f4f4f"}>
        {title}
      </Title>
      {elements}
    </g>
  );
};

const Title = styled("text")`
  font-size: 13.5px;
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

export default LegendItem;
