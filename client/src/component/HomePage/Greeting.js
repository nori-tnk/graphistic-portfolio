import React, { Component } from "react";
import { Box, Markdown } from "grommet";

class Greeting extends Component {
  render() {
    return (
      <Box
        alignSelf="center"
        justify="center"
        align="center"
        style={{
          maxWidth: "70vw",
        }}
      >
        <Markdown style={{ textAlign: "center" }}>
          {this.props.heading}
        </Markdown>
        <Markdown>{this.props.paragraph}</Markdown>
      </Box>
    );
  }
}

export default Greeting;
