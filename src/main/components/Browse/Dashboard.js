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
    const analysisItems = analyses.map(analysis => {
      const isSelected = selectedAnalysis === analysis.id;
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
        <Cards>{analysisItems}</Cards>
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
