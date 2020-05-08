import React, { Component } from "react";
import { Box, TextInput } from "grommet";

class SearchBox extends Component {
  constructor(props) {
    super(props);
    this.state = { value: "" };
    this.onChange = this.onChange.bind(this);
  }

  onChange(event) {
    const value = event.target.value;
    this.setState({ value });
    this.props.liftInputUp(value);
  }

  render() {
    return (
      <Box fill="horizontal" align="center" pad="small">
        <Box width="medium">
          <TextInput
            icon={this.props.icon}
            placeholder={this.props.defaultPlaceholder}
            value={this.state.value}
            onChange={this.onChange}
          />
        </Box>
      </Box>
    );
  }
}

export default SearchBox;
