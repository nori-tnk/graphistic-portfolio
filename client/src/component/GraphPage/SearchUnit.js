import React, { Component } from "react";
import { Box } from "grommet";
import { Search } from "grommet-icons";
import SearchBox from "./SearchBox";
import MatchList from "./MatchList";

class SearchUnit extends Component {
  constructor(props) {
    super(props);
    this.state = { input: "" };
    this.liftInputUp = this.liftInputUp.bind(this);
  }

  liftInputUp(input) {
    this.setState({ input });
  }

  render() {
    const size = this.props.size;
    return (
      <Box
        align="center"
        flex={true}
        overflow={size !== "small" ? { vertical: "scroll" } : "hidden"}
        fill={size === "small"}
        justify="start"
      >
        <SearchBox
          liftInputUp={this.liftInputUp}
          defaultPlaceholder="e.g. nodejs"
          icon={<Search />}
        />

        <MatchList
          input={this.state.input}
          graphManager={this.props.graphManager}
          size={size}
        />
      </Box>
    );
  }
}

export default SearchUnit;
