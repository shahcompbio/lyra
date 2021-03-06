import React, { Component } from "react";
import PropTypes from "prop-types";
import styled, { css } from "react-emotion";
import { Card, CardHeader, Collapse, CardBody, CardTitle } from "reactstrap";
import DASHBOARD_NAMES from "./dashboardNames.js";
import AnalysisItem from "./Analysis.js";

class DashboardBase extends Component {
  static propTypes = {
    title: PropTypes.string.isRequired,
    onClick: PropTypes.func.isRequired,
    analyses: PropTypes.array.isRequired,
    selectedAnalysis: PropTypes.string,
    selectedDashboard: PropTypes.string,
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
      selectedAnalysis,
      selectedDashboard,
      className,
      selectAnalysis,
      onClick
    } = this.props;
    const dashboardClick = () => {
      this.setState({ isDashboardExpanded: !this.state.isDashboardExpanded });
    };
    const analysisItems = analyses.map(analysis => {
      const isSelected =
        selectedAnalysis === analysis.id && selectedDashboard === title;
      const onAnalysisClick = () => {
        if (!isSelected) {
          selectAnalysis(analysis.id, title);
          onClick();
        }
      };
      return (
        <AnalysisItem
          id={analysis.id}
          key={analysis.title}
          title={analysis.title}
          description={analysis.description}
          onClick={onAnalysisClick}
          isSelected={isSelected}
        />
      );
    });
    
    return (
      <div className={className}>
        <Cards>
          <Heading
            onClick={dashboardClick}
            isExpanded={this.state.isDashboardExpanded}
          >
            <Title>
              {DASHBOARD_NAMES[title]}
              <Icon />
            </Title>
          </Heading>
          <Collapse isOpen={this.state.isDashboardExpanded}>
            <Body>{analysisItems}</Body>
          </Collapse>
        </Cards>
      </div>
    );
  }
}

const Title = styled(CardTitle)`
  font-size: 15px;
  width: 100%;
  a {
    text-decoration: none;
  }
  margin-bottom: 0rem;
`;

const Cards = styled(Card)`
  cursor: pointer;
  margin-bottom: 0px;
  border: none;
`;

const Body = styled(CardBody)`
  padding: 0px;
`;

const Heading = styled(({ isExpanded, ...restProps }) => (
  <CardHeader {...restProps} />
))`
  ${props =>
    props.isExpanded ? headingType["expanded"] : headingType["closed"]};

  padding: 15px 15px 15px 5px;
`;

const headingType = {
  closed: css`
    border-radius: 9px;
    h5 div {
      transform: rotate(135deg);
      -webkit-transform: rotate(135deg);
      transition: 100ms linear all;
    }
  `,
  expanded: css`
    border-radius: 0px;
    border-top-left-radius: 9px;
    border-top-right-radius: 9px;
    h5 div {
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

const Dashboard = styled(DashboardBase)`
  background: #f5f5f5;
  color: #000000;
  text-align: left;
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

export default Dashboard;
