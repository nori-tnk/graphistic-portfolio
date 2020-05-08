import React, { Component } from "react";
import { Box, Button, Collapsible } from "grommet";
import { Drawer } from "grommet-icons";
import ServiceUnit from "./ServiceUnit";

class CollaplibleBus extends Component {
  constructor(props) {
    super(props);
    this.state = {
      openDrawer: false,
    };
  }

  render() {
    return (
      <Box direction="row" align="start" height="xsmall">
        <Box
          direction="column"
          justify="start"
          alignSelf="start"
          margin="none"
          height="medium"
        >
          <Button
            primary
            color="dark-2"
            fill={false}
            margin={{
              left: "small",
              right: "none",
              top: "none",
              bottom: "none",
            }}
            style={{ borderRadius: "8px 0px 0px 8px" }}
            elevation="medium"
            onClick={() => {
              this.setState({
                openDrawer: !this.state.openDrawer,
              });
            }}
            icon={<Drawer />}
          />
        </Box>
        <Collapsible direction="horizontal" open={this.state.openDrawer}>
          <ServiceUnit
            graphManager={this.props.graphManager}
            size={this.props.size}
          />
        </Collapsible>
      </Box>
    );
  }
}

export default CollaplibleBus;
