import { treeConfig as prevConfig } from "../../config.js";

const config = {
  height: prevConfig["height"],
  width: prevConfig["width"],

  clusterMinHeight: prevConfig["clusterMinHeight"],
  clusterVerticalOffset: prevConfig["clusterVerticalOffset"],
  depthSpacing: prevConfig["depthSpacing"],

  nodeRadius: prevConfig["nodeRadius"],
  nodeColor: prevConfig["nodeColor"],
  clusterWidth: prevConfig["clusterWidth"],
  clusterColorGradient: prevConfig["clusterColorGradient"],
  highlightColor: prevConfig["highlightColor"],

  horizontalBranchWidth: prevConfig["horizontalBranchWidth"],
  horizontalBranchColor: prevConfig["horizontalBranchColor"],
  verticalBranchWidth: prevConfig["verticalBranchWidth"],
  verticalBranchColor: prevConfig["verticalBranchColor"]
};

export default config;
