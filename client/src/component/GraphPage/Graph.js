import React, { Component } from "react";
import { Box } from "grommet";
import graphManagerFactory from "../../graph/graphManagerFactory";

class Graph extends Component {
  constructor(props) {
    super(props);
    this.state = { graphManager: {} };
  }

  componentDidMount() {
    if (!this.props.demo) {
      this.setState({
        graphManager: graphManagerFactory(this.props.data, {
          container: document.getElementById(this.props.cyDOMId),
        }),
      });
      return this.props.liftUpGraphManager({
        graphManager: this.state.graphManager,
      });
    }

    const graphManager = graphManagerFactory(
      this.props.data,
      {
        container: document.getElementById(this.props.cyDOMId),
      },
      this.props.demo
    );
    this.setState({ graphManager });
  }

  componentDidUpdate(_, prevState) {
    if (prevState !== this.state) {
      this.props.liftUpGraphManager(this.state.graphManager);
    }
  }

  componentWillUnmount() {
    if (this.state.graphManager.viewStateManager) {
      this.state.graphManager.viewStateManager.clearAllTippies();
      this.state.graphManager.destroyGraph();
    }
  }

  render() {
    return (
      <Box align="center">
        <div id={this.props.cyDOMId}></div>
      </Box>
    );
  }
}

export default Graph;
