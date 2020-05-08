import React, { Component } from "react";
import { Box, CheckBox, Header, Menu, Image, Text } from "grommet";
import { Actions } from "grommet-icons";
import config from "../../config";
import logo from "../../assets/icons/logo04.png";

const headerHeight = "xsmall";

class GlobalHeader extends Component {
  constructor(props) {
    super(props);
    this.toggleDarkMode = this.toggleDarkMode.bind(this);
    this.state = { darkMode: this.props.darkMode };

    this.otherPages = Object.values(this.props.allPages)
      .filter((page) => page.title !== this.props.pageTitle)
      .map((page) => ({
        label: page.title,
        onClick: () => {
          this.jumpTo(page.path);
        },
      }));
  }

  jumpTo(path) {
    window.location.href = `${path}?dark=${this.props.darkMode}`;
  }

  toggleDarkMode(e) {
    this.props.toggleDarkMode();
    this.setState({ darkMode: !this.state.darkMode });
  }

  render() {
    const size = this.props.size;
    return (
      <>
        {/* spacer for the sticky header */}
        <Box fill="horizontal" height={headerHeight} />
        <Header
          margin="none"
          fill="horizontal"
          height={headerHeight}
          flex
          elevation="large"
          pad="none"
          overflow={{ horizontal: "hidden" }}
          background="background"
          style={{ maxHeight: "xsmall", position: "absolute", zIndex: "19" }}
        >
          <Box
            margin="none"
            // flex
            direction="row-responsive"
            pad="none"
            overflow="hidden"
          >
            <Box
              margin="xxsmall"
              width="xsmall"
              flex="shrink"
              direction="row"
              justify="center"
              alignSelf="center"
              align="center"
              onClick={this.jumpTo.bind(this, config.pages.home.path)}
            >
              <Image
                src={logo}
                fit="contain"
                style={{
                  height: "90%",
                  width: "90%",
                }}
              />
            </Box>
          </Box>
          {size !== "small" ? (
            <Box width="80vw" direction="row" justify="center">
              {Object.values(config.pages).map((page) => (
                <Box
                  key={page.title}
                  onClick={this.jumpTo.bind(this, page.path)}
                  margin="none"
                  width="medium"
                  pad={{ vertical: "small", horizontal: "large" }}
                  hoverIndicator
                  focusIndicator={false}
                  round="small"
                  style={{ fontSize: "large" }}
                >
                  <Box direction="row" justify="evenly" align="center">
                    {this.props.pageTitle === page.title ? (
                      <>
                        <Text color="brand">{`{`}</Text>
                        <Text>{page.title}</Text>
                        <Text color="brand">{`}`}</Text>
                      </>
                    ) : (
                      <Text>{page.title}</Text>
                    )}
                  </Box>
                </Box>
              ))}
            </Box>
          ) : (
            <Box
              margin={{ horizontal: "none", veritcal: "xsmall" }}
              direction="row"
              justify="center"
            >
              <Menu
                margin={{ left: "medium" }}
                alignSelf="stretch"
                label={this.props.pageTitle}
                items={this.otherPages}
                dropAlign={{ top: "bottom", left: "left" }}
                size="small"
              />
            </Box>
          )}
          <Box
            margin="small"
            alignSelf="center"
            direction="row"
            justify="evenly"
          >
            <Actions />
            <CheckBox
              toggle
              checked={this.state.darkMode}
              onChange={this.toggleDarkMode}
            />
          </Box>
        </Header>
      </>
    );
  }
}

export { GlobalHeader as default, headerHeight };
