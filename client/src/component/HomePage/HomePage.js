import React, { Component } from "react";
import { ResponsiveContext, Box, Grommet, Image } from "grommet";
import { GlobalErrorBoundary, GlobalHeader, GlobalFooter } from "../common";
import Jumbotron from "./Jumbotron";
import Greeting from "./Greeting";
import Detail from "./Detail";
import config, { data } from "../../config";
import contents from "../../assets/contents/homePage";
import right from "../../assets/pictures/right-01.png";
import wrong from "../../assets/pictures/wrong-f3-01.png";
import wrongAnim from "../../assets/pictures/wrong-01-0025ms.gif";
import { queryDarkMode } from "../../service/urlParser";

class HomePage extends Component {
  constructor(props) {
    super(props);

    this.state = { darkMode: queryDarkMode(), wrongImgAnim: false };
    this.toggleDarkMode = this.toggleDarkMode.bind(this);
  }

  componentDidMount() {
    document.title = config.pages.home.title;
  }

  toggleDarkMode() {
    this.setState({ darkMode: !this.state.darkMode });
  }

  swapWrongImg(wrongImgAnim) {
    this.setState({ wrongImgAnim });
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
                  pageTitle={config.pages.home.title}
                  allPages={config.pages}
                  size={size}
                />
              )}
            </ResponsiveContext.Consumer>
            <Jumbotron
              heading={contents.jumbotron.heading}
              catch={contents.jumbotron.catch}
              darkMode={this.state.darkMode}
              graphPagePath={config.pages.graph.path}
              data={data}
            />
            <Greeting
              heading={contents.greeting.heading}
              paragraph={contents.greeting.body}
            />
            <Box
              width="60vw"
              height="xxsmall"
              alignSelf="center"
              border="bottom"
              style={{ borderColor: "light-4" }}
            />
            <Box
              gap="medium"
              basis="full"
              padding="large"
              justify="center"
              margin="medium"
            >
              <Detail
                reverse={false}
                heading={contents.benefits.heading}
                paragraph={contents.benefits.body(
                  `${config.pages.graph.path}?dark=${this.state.darkMode}`,
                  `${config.pages.about.path}?dark=${this.state.darkMode}`
                )}
                picture={<Image src={right} fit="contain" fill={true} />}
              />
              <Detail
                reverse={true}
                heading={contents.alert.heading}
                paragraph={contents.alert.body(
                  `${config.pages.graph.path}?dark=${this.state.darkMode}`
                )}
                picture={
                  <Image
                    src={this.state.wrongImgAnim ? wrongAnim : wrong}
                    fit="contain"
                    onMouseOver={this.swapWrongImg.bind(this, true)}
                    onMouseOut={this.swapWrongImg.bind(this, false)}
                    hoverIndicator={false}
                  />
                }
              />
            </Box>

            <GlobalFooter />
          </Box>
        </Grommet>
      </GlobalErrorBoundary>
    );
  }
}

export default HomePage;
