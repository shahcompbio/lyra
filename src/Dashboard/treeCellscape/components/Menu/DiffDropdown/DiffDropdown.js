import React, { Component } from "react";
import PropTypes from "prop-types";
import { ButtonDropdown, DropdownToggle, DropdownMenu } from "reactstrap";

import Ploidy from "./Ploidy/Ploidy";
import Mode from "./Mode/Mode";

class DiffDropdown extends Component {
  static propTypes = {
    analysis: PropTypes.string.isRequired
  };

  constructor(props) {
    super(props);

    this.toggle = this.toggle.bind(this);
    this.state = {
      dropdownOpen: false
    };
  }

  toggle() {
    this.setState({
      dropdownOpen: !this.state.dropdownOpen
    });
  }

  render() {
    const analysis = this.props.analysis;
    return (
      <ButtonDropdown isOpen={this.state.dropdownOpen} toggle={this.toggle} id={`dropdown-basic-diff`}>
        <DropdownToggle caret outline>
          Diff Heatmap
        </DropdownToggle>    
        <DropdownMenu>
          <Ploidy analysis={analysis} />
          <Mode analysis={analysis} />
        </DropdownMenu>
      </ButtonDropdown>
    );
  }
}

export default DiffDropdown;
