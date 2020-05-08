import React, { Component } from "react";
import { ResponsiveContext, Box, Button, Heading, Stack } from "grommet";
import config from "../../config";
import Graph from "../GraphPage/Graph";

const _styles = {
  wrapper: {
    flex: true,
    wrap: true,
  },
  baseStackBox0: {
    flex: true,
    height: "70vh",
    width: "full",
    background: "dark-1",
    overflow: "hidden",
  },
  graphContainer: {
    width: "50vw",
    alignSelf: "end",
  },
  firstStackBox0: {
    fill: "horizontal",
    height: "70vh",
    flex: true,
    wrap: true,
    background:
      "linear-gradient(90deg, rgba(0,0,0,1) 0%, rgba(0,0,0,1) 50%, rgba(0,0,0,0) 100%);",
  },
  jumboHeading: {
    level: "1",
    margin: "medium",
    size: "xlarge",
    color: "light-2",
  },
  firstStackBox1: {
    flex: true,
    wrap: true,
  },
  catchContainer: {
    width: "medium",
    justify: "center",
    style: {
      display: "block",
    },
  },
  catch: {
    level: "3",
    margin: { left: "medium" },
    color: "light-4",
  },
  buttonContainer: {
    flex: true,
    justify: "center",
    alignSelf: "center",
    margin: "small",
    wrap: true,
  },
  button: {
    size: "medium",
    alignSelf: "center",
    primary: true,
    color: "brand",
  },
};

class Jumbotron extends Component {
  constructor(props) {
    super(props);
    this.jumpToGraphPage = this.jumpToGraphPage.bind(this);
  }

  jumpToGraphPage() {
    window.location.href = `${this.props.graphPagePath}?dark=${this.props.darkMode}`;
  }

  render() {
    return (
      <Box {..._styles.wrapper}>
        <Stack>
          <Box {..._styles.baseStackBox0}>
            <Box {..._styles.graphContainer}>
              <Graph
                cyDOMId="cy"
                data={this.props.data}
                demo={true}
                liftUpGraphManager={() => {}}
              />
            </Box>
          </Box>
          <Box {..._styles.firstStackBox0}>
            <ResponsiveContext.Consumer>
              {(size) => (
                <Heading
                  style={{
                    wordBreak: size !== "small" ? "normal" : "break-all",
                  }}
                  {..._styles.jumboHeading}
                >
                  {this.props.heading}
                </Heading>
              )}
            </ResponsiveContext.Consumer>
            <Box {..._styles.firstStackBox1}>
              <Box {..._styles.catchContainer}>
                <Heading {..._styles.catch}>{this.props.catch}</Heading>
              </Box>
              <Box {..._styles.buttonContainer}>
                <Button
                  label="Check out my Experience Graph"
                  onClick={this.jumpToGraphPage}
                  {..._styles.button}
                />
              </Box>
            </Box>
          </Box>
        </Stack>
      </Box>
    );
  }
}

export default Jumbotron;
