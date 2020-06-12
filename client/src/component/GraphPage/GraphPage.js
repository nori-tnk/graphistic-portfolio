import React, { Component } from "react";
import {
  ThemeContext,
  Box,
  Grommet,
  ResponsiveContext,
  Layer,
  Button,
  Markdown,
} from "grommet";
import { deepMerge } from "grommet/utils";
import { CirclePlay, Close, FormClose } from "grommet-icons";
import { GlobalErrorBoundary, GlobalHeader, GlobalFooter } from "../common";
import GraphModeController from "./GraphModeController";
import Graph from "./Graph";
import GraphDescription from "./GraphDescription";
import CollaplibleBus from "./CollapsibleBus";
import GraphCarousel from "./GraphCarousel";
import config, { data } from "../../config";
import contents from "../../assets/contents/graphPage";
import { queryDarkMode } from "../../service/urlParser";
import "../../style/style.css";

const modalTheme = (zIndex) =>
  deepMerge(config.theme, {
    layer: { zIndex },
  });

class GraphPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      graphManager: {},
      darkMode: queryDarkMode(),
      fresh: true,
      guideModal: false,
    };
    this.toggleDarkMode = this.toggleDarkMode.bind(this);
    this.liftUpGraphManager = this.liftUpGraphManager.bind(this);
    this.startGuide = this.startGuide.bind(this);
    this.closeInitModal = this.closeInitModal.bind(this);
  }

  componentDidMount() {
    document.title = config.pages.graph.title;
  }

  toggleDarkMode() {
    this.setState({ darkMode: !this.state.darkMode });
  }

  liftUpGraphManager(graphManager) {
    this.setState({ graphManager });
  }

  startGuide() {
    this.closeInitModal();
    this.setGuideModal(true);
  }

  closeInitModal() {
    this.setState({ fresh: false });
  }

  setGuideModal(guideModal) {
    this.setState({ guideModal });
  }

  render() {
    return (
      <GlobalErrorBoundary>
        <Grommet
          theme={config.theme}
          full
          themeMode={this.state.darkMode ? "dark" : "light"}
        >
          <ResponsiveContext.Consumer>
            {(size) => (
              <>
                <ThemeContext.Extend value={modalTheme("1000")}>
                  {this.state.guideModal && (
                    <Layer
                      onEsc={this.setGuideModal.bind(this, false)}
                      onClickOutside={this.setGuideModal.bind(this, false)}
                    >
                      <Box flex background="dark-1">
                        <Button
                          alignSelf="end"
                          icon={<FormClose />}
                          onClick={this.setGuideModal.bind(this, false)}
                        />
                        <iframe
                          width="560"
                          height="315"
                          src={config.externalLinks.demoVid.path}
                          frameBorder="0"
                          allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
                          allowFullScreen
                        ></iframe>
                      </Box>
                    </Layer>
                  )}
                </ThemeContext.Extend>
                <Box flex fill="horizontal" justify="stretch" wrap={true}>
                  <GlobalHeader
                    headerTitle={config.headerTitle}
                    darkMode={this.state.darkMode}
                    toggleDarkMode={this.toggleDarkMode.bind(this)}
                    pageTitle={config.pages.graph.title}
                    allPages={config.pages}
                    size={size}
                  />
                  <Box fill direction="column" wrap={true}>
                    {this.state.fresh && (
                      <ThemeContext.Extend value={modalTheme("1001")}>
                        <Layer position="center">
                          <Box pad="small">
                            <Markdown>
                              #### Welcome to my Experience Graph!
                            </Markdown>
                            <Button
                              margin="xsmall"
                              primary
                              size="small"
                              icon={<CirclePlay />}
                              label="Watch Quick Guide"
                              color="neutral-3"
                              onClick={this.startGuide}
                            />
                            <Button
                              margin="xsmall"
                              size="small"
                              icon={<Close />}
                              label="No thanks"
                              onClick={this.closeInitModal}
                            />
                          </Box>
                        </Layer>
                      </ThemeContext.Extend>
                    )}
                    {size !== "small" ? (
                      <>
                        <Layer
                          modal={false}
                          plain={true}
                          position="top-left"
                          margin={{ top: "xlarge" }}
                        >
                          <Box
                            height="xxsmall"
                            background="neutral-3"
                            style={{ borderRadius: "0 24px 24px 0" }}
                          >
                            <Button
                              alignSelf="start"
                              size="small"
                              icon={<CirclePlay />}
                              onClick={this.startGuide}
                            />
                          </Box>
                        </Layer>
                        <Layer
                          modal={false}
                          plain={true}
                          position="left"
                          margin={{ bottom: "medium" }}
                        >
                          <Box>
                            <GraphModeController
                              graphManager={this.state.graphManager}
                            />
                          </Box>
                        </Layer>
                        <Box
                          fill="horizontal"
                          flex={true}
                          align="center"
                          justify="start"
                          pad="small"
                          direction="column"
                        >
                          <Graph
                            cyDOMId="cy"
                            data={data}
                            liftUpGraphManager={this.liftUpGraphManager}
                          />
                          <Box
                            width="70vw"
                            align="center"
                            background={{ light: "light-2", dark: "dark-2" }}
                          >
                            <GraphDescription contents={contents} size={size} />
                          </Box>
                        </Box>
                        <Layer
                          modal={false}
                          direction="row"
                          position="top-right"
                          margin={{ top: "xlarge" }}
                          height="xsmall"
                          plain={true}
                        >
                          <CollaplibleBus
                            graphManager={this.state.graphManager}
                            size={size}
                          />
                        </Layer>
                      </>
                    ) : (
                      <>
                        <Box width="full" overflow="hidden">
                          <GraphCarousel
                            size={size}
                            startGuide={this.startGuide}
                            data={data}
                          />
                        </Box>
                        <Box
                          fill="horizontal"
                          align="center"
                          background={{ light: "light-2", dark: "dark-2" }}
                        >
                          <GraphDescription contents={contents} size={size} />
                        </Box>
                      </>
                    )}
                  </Box>
                  <GlobalFooter />
                </Box>
                {/* </Box> */}
              </>
            )}
          </ResponsiveContext.Consumer>
        </Grommet>
      </GlobalErrorBoundary>
    );
  }
}

export default GraphPage;
