import React, { Component } from "react";
import styled from "styled-components";
import { Box, Accordion, AccordionPanel } from "grommet";
import WrappedMarkdown from "../common/WrappedMarkdown";
import config from "../../config";

const pathToGithubRepo = config.externalLinks.githubRepo.path;

const _Markdown = styled(WrappedMarkdown)`
  padding-left: 8px;
  padding-right: 8px;
  word-wrap: ${(props) => (props.size !== "small" ? "auto" : "break-word")};
`;

class GraphDescription extends Component {
  render() {
    const size = this.props.size;
    return (
      <Accordion>
        {Object.entries(this.props.contents).map(([section, parts]) => (
          <AccordionPanel
            key={section}
            label={<_Markdown markdown={parts.heading} size={size} />}
          >
            <Box pad="small">
              <_Markdown
                markdown={
                  parts.body instanceof Function
                    ? parts.body(pathToGithubRepo)
                    : parts.body
                }
                size={size}
              />
            </Box>
          </AccordionPanel>
        ))}
      </Accordion>
    );
  }
}

export default GraphDescription;
