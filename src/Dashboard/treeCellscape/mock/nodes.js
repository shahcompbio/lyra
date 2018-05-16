export const NODE_ID1 = "SA906-A73046B-R53-C34";
export const NODE_ID2 = "SA906-A73056B-R58-C38";

export const NODE_INDEX1 = 0;
export const NODE_INDEX2 = 3;

export const NODE1 = {
  cellID: NODE_ID1,
  heatmapIndex: NODE_INDEX1,
  parent: "root",
  minIndex: 0,
  maxHeight: 44,
  maxIndex: 8606,
  children: [NODE_ID2]
};

export const NODE2 = {
  cellID: NODE_ID2,
  heatmapIndex: NODE_INDEX2,
  parent: NODE_ID1,
  minIndex: 3,
  maxHeight: 28,
  maxIndex: 1268,
  children: []
};
