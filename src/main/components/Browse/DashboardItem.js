import React, { Component } from "react";
import PropTypes from "prop-types";
import styled, { css } from "react-emotion";
//import {Panel} from "react-bootstrap";
import { Panel } from "react-bootstrap";
import dashboardNames from "./dashboardNames.js";
import BrowseItem from "./BrowseItem.js";

class DashboardItemBase extends Component {
  static propTypes = {
    title: PropTypes.string.isRequired,
    onClick: PropTypes.func.isRequired,
    analyses: PropTypes.array.isRequired,
    selectedAnalysisID: PropTypes.string,
    selectAnalysis: PropTypes.func.isRequired
  };
  constructor(props) {
    super(props);
    this.state = {
      isDashboardExpanded: true
    };
  }
  render() {
    const {
      title,
      analyses,
      selectedAnalysisID,
      className,
      selectAnalysis,
      onClick
    } = this.props;
    const dashboardClick = () => {
      this.setState({ isDashboardExpanded: !this.state.isDashboardExpanded });
    };
    return (
      <div className={className}>
        <Panels expanded={this.state.isDashboardExpanded} onToggle>
          <Heading
            onClick={dashboardClick}
            test={this.state.isDashboardExpanded}
          >
            <Title>
              {dashboardNames[title]}
              <Icon />
            </Title>
          </Heading>
          <Panel.Collapse>
            <Body>
              {analyses.map(analysis => {
                const isSelected = selectedAnalysisID === analysis.id;
                const onAnlysisClick = () => {
                  if (!isSelected) {
                    selectAnalysis(analysis);
                    onClick();
                  }
                };
                return (
                  <BrowseItem
                    key={analysis.title}
                    title={analysis.title}
                    description={analysis.description}
                    onClick={onAnlysisClick}
                    isSelected={isSelected}
                  />
                );
              })}
            </Body>
          </Panel.Collapse>
        </Panels>
      </div>
    );
  }
}

const Title = styled(Panel.Title)`
  font-size: 15px;
  width: 100%;
  a {
    text-decoration: none;
  }
`;

const Panels = styled(Panel)`
  cursor: pointer;
  margin-bottom: 0px;
  border: none;
`;

const Body = styled(Panel.Body)`
  padding: 0px;
`;

const dashBoardItemTypes = {
  normal: css`
    background: #f5f5f5;
    color: #000000;
    text-align: left;
  `,

  selected: css`
    background: #184dc1;
    color: #dee3e1;
    text-align: right;
    padding-right: 10px;
  `
};

const dashboardType = {
  closed: css`
    border-radius: 9px;
    div div {
      transform: rotate(135deg);
      -webkit-transform: rotate(135deg);
      transition: 100ms linear all;
    }
  `,
  expanded: css`
    border-radius: 0px;
    border-top-left-radius: 9px;
    border-top-right-radius: 9px;
    div div {
      transform: rotate(45deg) !important;
      -webkit-transform: rotate(45deg) !important;
      transition: 100ms linear all;
    }
  `
};

const Icon = styled("div")`
  border: solid black;
  border-width: 0 1px 1px 0;
  display: inline-block;
  padding: 4px;
  float: right;
  margin-top: 4px;
`;

const Heading = styled(({ test, ...restProps }) => (
  <Panel.Heading {...restProps} />
))`
  ${props =>
    props.test ? dashboardType["expanded"] : dashboardType["closed"]};

  background-color: #c1c1c1;
  padding: 15px 15px 15px 5px;
`;

const DashboardItem = styled(DashboardItemBase)`
  ${props =>
    props.isSelected
      ? dashBoardItemTypes["selected"]
      : dashBoardItemTypes["normal"]};

  width: 100%;
  border-radius: 8px;
  margin-top: 10px;
  margin-bottom: 10px;
  font-size: 12px;

  &:hover {
    color: #184dc1;
    background: #b0b4b2;
    border-radius: 8px;
  }
`;

export default DashboardItem;
