import React, { Component } from "react";
import { Box, Button, Carousel } from "grommet";
import { CirclePlay } from "grommet-icons";
import GraphModeController from "./GraphModeController";
import Graph from "./Graph";
import ServiceUnit from "./ServiceUnit";

class GraphCarousel extends Component {
  constructor(props) {
    super(props);
    this.state = { graphManager: {} };
    this.liftUpGraphManager = this.liftUpGraphManager.bind(this);
  }

  liftUpGraphManager(graphManager) {
    this.setState({ graphManager });
  }

  render() {
    const size = this.props.size;
    return (
      <Carousel initialChild={1}>
        <Box width="100vw">
          <Box
            height="medium"
            direction="row-reverse"
            justify="evenly"
            style={{ zIndex: "15", minHeight: "medium" }}
          >
            <GraphModeController graphManager={this.state.graphManager} />
            <Box
              height="xxsmall"
              margin="medium"
              background="neutral-3"
              round="xlarge"
              style={{
                zIndex: "1000",
              }}
            >
              <Button
                alignSelf="start"
                size="small"
                icon={<CirclePlay />}
                onClick={this.props.startGuide}
              />
            </Box>
          </Box>
          <Box fill="horizontal" height="xxsmall"></Box>
          <Box fill="horizontal" height="xxsmall"></Box>
        </Box>
        <Box width="100vw">
          <Box style={{ zIndex: "15" }}>
            <Box
              flex="shrink"
              width="80vw"
              height="medium"
              align="center"
              alignSelf="center"
              justify="start"
              pad="small"
              elevation="small"
              direction="column"
              border="all"
              overflow="hidden"
            >
              <Graph
                cyDOMId="cy"
                data={this.props.data}
                liftUpGraphManager={this.liftUpGraphManager}
              />
            </Box>
          </Box>
          <Box fill="horizontal" height="xxsmall"></Box>
          <Box fill="horizontal" height="xxsmall"></Box>
        </Box>
        <Box width="100vw">
          <Box height="medium" style={{ zIndex: "15" }}>
            <ServiceUnit graphManager={this.state.graphManager} size={size} />
          </Box>

          <Box fill="horizontal" height="xxsmall"></Box>
          <Box fill="horizontal" height="xxsmall"></Box>
        </Box>
      </Carousel>
    );
  }
}

export default GraphCarousel;
