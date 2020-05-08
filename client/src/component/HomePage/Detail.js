import React, { Component } from "react";
import { ResponsiveContext, Box, Markdown } from "grommet";
import WrappedMarkdown from "../common/WrappedMarkdown";

class Detail extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <ResponsiveContext.Consumer>
        {(size) => (
          <Box
            margin="medium"
            basis="full"
            direction="row-responsive"
            flex="shrink"
            justify="evenly"
            pad="xsmall"
          >
            <Box
              width={{ max: "80vw" }}
              direction="column"
              flex="shrink"
              padding="small"
              style={{
                order: size === "small" ? "1" : this.props.reverse ? "2" : "1",
              }}
            >
              <Box margin="small">
                <Markdown>{this.props.heading}</Markdown>
              </Box>
              <Box
                margin="small"
                width={{ max: "large" }}
                pad={{ right: size !== "small" ? "xlarge" : "small" }}
              >
                <WrappedMarkdown markdown={this.props.paragraph} />
              </Box>
            </Box>
            <Box
              margin="small"
              width="medium"
              height="medium"
              flex="shrink"
              pad="small"
              style={{
                maxWidth: "90vw",
                order: size === "small" ? "2" : this.props.reverse ? "1" : "2",
              }}
            >
              {this.props.picture}
            </Box>
          </Box>
        )}
      </ResponsiveContext.Consumer>
    );
  }
}

export default Detail;
