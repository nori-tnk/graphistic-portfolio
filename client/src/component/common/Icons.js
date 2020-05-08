import React, { Component } from "react";
import { Box, Image } from "grommet";
import iconAll from "../../assets/icons/all-mode-00.png";
import iconSelection from "../../assets/icons/selection-mode-00.png";
import iconLast from "../../assets/icons/last-mode-01.png";

const size = "33%";
class Icon extends Component {
  render() {
    return (
      <Box heigt={size} width={size}>
        <Image src={this.props.img} fit="contain" />
      </Box>
    );
  }
}

class All extends Component {
  render() {
    return <Icon img={iconAll} />;
  }
}

class Selection extends Component {
  render() {
    return <Icon img={iconSelection} />;
  }
}

class Last extends Component {
  render() {
    return <Icon img={iconLast} />;
  }
}
export { All, Selection, Last };
