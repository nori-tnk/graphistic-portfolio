import React, { Component } from "react";
import { Box } from "grommet";
import { Filter } from "grommet-icons";
import SearchBox from "./SearchBox";
import MatchList from "./MatchList";

class CollectionUnit extends Component {
  constructor(props) {
    super(props);
    this.state = {
      input: "",
      collection: [],
    };
    this.liftInputUp = this.liftInputUp.bind(this);

    // register an observer to update this.state.collection on update of node selection
    this.props.graphManager.nodes.on(
      "select unselect",
      this.updateCollection.bind(this)
    );
  }

  componentDidMount() {
    this.updateCollection();
  }

  componentWillUnmount() {
    this.props.graphManager.nodes.unlisten(
      "select unselect",
      this.updateCollection.bind(this)
    );
  }

  liftInputUp(input) {
    this.setState({ input });
  }

  updateCollection() {
    this.setState({
      collection: this.props.graphManager.collector.getSelectionList(),
    });
  }

  render() {
    return (
      <Box align="center">
        <SearchBox liftInputUp={this.liftInputUp} icon={<Filter />} />
        <MatchList
          input={this.state.input}
          defaultList={this.state.collection}
          graphManager={this.props.graphManager}
          size={this.props.size}
        />
      </Box>
    );
  }
}

export default CollectionUnit;
