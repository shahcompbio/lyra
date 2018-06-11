import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";

import { Query } from "react-apollo";
import gql from "graphql-tag";

import { getCurrRootRange } from "./selectors.js";

import FontAwesomeIcon from "@fortawesome/react-fontawesome";
import { faDownload } from "@fortawesome/fontawesome-free-solid";

import DownloadCSV from "./DownloadCSV.js";

class DownloadCSVButton extends Component {
  static propTypes = {
    Button: PropTypes.func.isRequired
  };

  constructor(props) {
    super(props);
    this.state = {
      isClicked: false
    };

    this.onClick = this.onClick.bind(this);
  }

  onClick() {
    this.setState({ isClicked: true });
  }

  render() {
    const { Button, analysis, range } = this.props;

    const isDownloading = this.state.isClicked;
    const callback = () => this.setState({ isClicked: false });

    return (
      <Button onClick={this.onClick} title="Download CSV of cell IDs">
        <FontAwesomeIcon icon={faDownload} size="2x" />
        {isDownloading ? (
          <Query query={IDS_QUERY} variables={{ analysis, range }}>
            {({ loading, error, data }) => {
              if (loading) return null;
              if (error) return null;

              const cellIDs = data.treeNodes.map(treeNode => treeNode.id);
              return <DownloadCSV callback={callback} cellIDs={cellIDs} />;
            }}
          </Query>
        ) : null}
      </Button>
    );
  }
}

const IDS_QUERY = gql`
  query treeNodes($analysis: String!, $range: [Int!]!) {
    treeNodes(analysis: $analysis, range: $range) {
      id
    }
  }
`;

const mapState = state => ({
  range: getCurrRootRange(state)
});

export default connect(mapState)(DownloadCSVButton);
