import React, { Component } from "react";
import { Box, List } from "grommet";
import ListItem from "./ListItem";

class MatchList extends Component {
  constructor(props) {
    super(props);
    this.state = { matchList: this.props.defaultList || [] };
  }

  componentDidUpdate(prevProps, _) {
    const emptyInputWithDefaultList =
      this.props.defaultList && !this.props.input;

    // @lesson: make sure the state is changed only if the prop/state have been changed
    if (this.props.input !== prevProps.input) {
      if (!emptyInputWithDefaultList) {
        return this.search();
      } else {
        return this.setState({ matchList: this.props.defaultList });
      }
    }
    if (this.props.defaultList !== prevProps.defaultList) {
      if (emptyInputWithDefaultList) {
        return this.setState({ matchList: this.props.defaultList });
      }
      console.warn("Unhandled state change");
    }
  }

  search() {
    const { input, defaultList, graphManager } = this.props;
    const searchResult = defaultList
      ? graphManager.searcher.search(input, defaultList).sort()
      : graphManager.searcher.search(input).sort();

    // console.log(searchResult);
    this.setState({ matchList: searchResult });
  }

  render() {
    const size = this.props.size;
    return (
      this.state.matchList &&
      0 < this.state.matchList.length && (
        <Box
          align="center"
          pad="none"
          justify="start"
          overflow={{ vertical: "scroll", horizontal: "hidden" }}
          width="medium"
          height={size !== "small" ? "large" : "auto"}
          fill={size !== "small" ? false : "vertical"}
          basis="5/6"
          margin="xsmall"
          background={{ opacity: "0" }}
        >
          <List data={this.state.matchList} pad="xxsmall">
            {(datum) => (
              <ListItem
                key={datum.id}
                datum={datum}
                defaultMembership={!this.props.defaultList}
                graphManager={this.props.graphManager}
              />
            )}
          </List>
        </Box>
      )
    );
  }
}

export default MatchList;
