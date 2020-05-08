import React, { Component } from "react";
import { ResponsiveContext, Box, Grommet, Image } from "grommet";
import {
  GlobalErrorBoundary,
  GlobalHeader,
  GlobalFooter,
  headerHeight,
  footerHeight,
} from "../common";
import Detail from "../HomePage/Detail";
import config from "../../config";
import contents from "../../assets/contents/aboutPage";
import portrait from "../../assets/pictures/portrait.png";
import { queryDarkMode } from "../../service/urlParser";

const _theme = config.theme;
const headerFooterHeight = [
  _theme.global.size[headerHeight],
  _theme.global.size[footerHeight],
].join(" + ");

class AboutPage extends Component {
  constructor(props) {
    super(props);

    this.state = { darkMode: queryDarkMode() };
    this.toggleDarkMode = this.toggleDarkMode.bind(this);
  }

  componentDidMount() {
    document.title = config.pages.about.title;
  }

  toggleDarkMode() {
    this.setState({ darkMode: !this.state.darkMode });
  }

  render() {
    return (
      <GlobalErrorBoundary>
        <Grommet
          theme={config.theme}
          full
          style={{ maxWidth: "100vw" }}
          overflow="hidden"
          themeMode={this.state.darkMode ? "dark" : "light"}
        >
          <Box
            flex
            fill="horizontal"
            direction="column"
            pad="none"
            align="stretch"
            justify="stretch"
            overflow="hidden"
            wrap={true}
          >
            <ResponsiveContext.Consumer>
              {(size) => (
                <GlobalHeader
                  headerTitle={config.headerTitle}
                  darkMode={this.state.darkMode}
                  toggleDarkMode={this.toggleDarkMode}
                  pageTitle={config.pages.about.title}
                  allPages={config.pages}
                  size={size}
                />
              )}
            </ResponsiveContext.Consumer>
            <Box
              height={{
                min: `calc(100vh - (${headerFooterHeight}) - 2 * ${_theme.global.edgeSize.medium})`,
              }}
              gap="medium"
              basis="full"
              padding="large"
              justify="center"
              margin="medium"
            >
              <Detail
                reverse={true}
                heading={contents.about.heading}
                paragraph={contents.about.body(
                  `${config.pages.graph.path}?dark=${this.state.darkMode}`
                )}
                picture={<Image src={portrait} fit="contain" />}
              />
            </Box>

            <GlobalFooter />
          </Box>
        </Grommet>
      </GlobalErrorBoundary>
    );
  }
}

export default AboutPage;
