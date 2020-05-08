import React, { Component } from "react";
import { Button } from "grommet";

class CustomButton extends Component {
  render() {
    const { labelText, icon, onClick } = this.props;
    return (
      <Button
        fill="horizontal"
        margin="xxsmall"
        size="small"
        color="status-ok"
        primary
        onClick={onClick}
        label={labelText}
        icon={icon}
      ></Button>
    );
  }
}

export default CustomButton;
