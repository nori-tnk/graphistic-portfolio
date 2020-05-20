import React, { Component } from "react";
import { Box, Footer, Nav, Anchor } from "grommet";
import { Github, Linkedin } from "grommet-icons";
import contents from "../../assets/contents/license";
import config from "./../../config";

const footerHeight = "xsmall";
class GlobalFooter extends Component {
  render() {
    return (
      <Footer
        height={footerHeight}
        margin="none"
        pad="xsmall"
        justify="between"
        alignContent="center"
        elevation="large"
      >
        <Box>{contents.copyright}</Box>
        <Nav direction="row">
          <Anchor
            icon={<Github />}
            href={config.externalLinks.githubHome.path}
          />
          <Anchor
            icon={<Linkedin />}
            href={config.externalLinks.linkedIn.path}
            target="_blank"
          />
        </Nav>
      </Footer>
    );
  }
}

// export default GlobalFooter;
export { GlobalFooter as default, footerHeight };
