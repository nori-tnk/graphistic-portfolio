import React, { Component } from "react";
import { Box, Markdown, Paragraph } from "grommet";

class WrappedMarkdown extends Component {
  render() {
    return (
      <Box {...this.props}>
        <Markdown
          components={{
            p: (props) => <Paragraph {...props} fill />,
            li: (props) => <li {...props} style={{ fontSize: "20px" }} />,
          }}
        >
          {this.props.markdown}
        </Markdown>
      </Box>
    );
  }
}

export default WrappedMarkdown;
