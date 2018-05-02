const testNodeID = "SA906-A90600C-R61-C43";

const testTreeNode = {
  cellID: testNodeID,
  heatmapIndex: 0
};

const testSegs = {
  cellID: testNodeID,
  chromosome: "01"
};

const rowElement = {
  index: 10,
  range: null,
  element: "row"
};
const clusterElement = {
  index: null,
  range: [5, 20],
  element: "cluster"
};
const cladeElement = {
  index: 10,
  range: [5, 20],
  element: "clade"
};

const testChromosomes = [{ chrom: "01" }, { chrom: "02" }];

const testChromDataObj = {
  "01": { chrom: "01" },
  "02": { chrom: "02" }
};

const testChromList = ["01", "02"];

const data = {
  testNodeID,
  testTreeNode,
  testSegs,
  rowElement,
  cladeElement,
  clusterElement,

  testChromosomes,
  testChromDataObj,
  testChromList
};
export default data;
