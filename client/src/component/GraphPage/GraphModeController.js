import React, { Component } from "react";
import { Box, CheckBox, Markdown, RadioButtonGroup } from "grommet";
import { All, Last, Selection } from "../common/Icons";

class GraphModeController extends Component {
  constructor(props) {
    super(props);
    this.state = {
      viewStateManager: this.props.graphManager.viewStateManager,
      focusMode: "ALL",
      autoFocus: true,
      hasObservers: false,
    };
    this.setFocusMode = this.setFocusMode.bind(this);
    this.toggleAutoFocus = this.toggleAutoFocus.bind(this);
    this.addObservers = this.addObservers.bind(this);
  }

  componentWillUnmount() {
    if (this.state.viewStateManager && this.state.viewStateManager.ee) {
      this.state.viewStateManager.ee.removeAllListeners();
    }
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevProps !== this.props) {
      this.setState({
        viewStateManager: this.props.graphManager.viewStateManager,
      });
    }
    if (prevState !== this.state) {
      if (this.state.viewStateManager) {
        if (!this.state.hasObservers) {
          this.addObservers();
        }
      }
    }
  }

  addObservers() {
    this.state.viewStateManager.ee.on("focusModeChange", (focusMode) => {
      this.setState({
        focusMode,
      });
    });
    this.state.viewStateManager.ee.on("autoFocusToggle", (autoFocus) => {
      this.setState({ autoFocus });
    });

    this.setState({
      hasObservers: true,
      fofusMode: this.state.viewStateManager.focusMode,
      autoFocus: this.state.viewStateManager.autoFocus,
    });
  }

  setFocusMode(event) {
    this.setState({ focusMode: event.target.value }, () => {
      this.sendManuallySetFocusModeToViewStateManager();
    });
  }

  toggleAutoFocus() {
    this.setState({ autoFocus: !this.state.autoFocus }, () => {
      this.state.viewStateManager.setAutoFocus(this.state.autoFocus).render();
    });
  }

  sendManuallySetFocusModeToViewStateManager() {
    this.state.viewStateManager.setAutoFocus(this.state.focusMode).render();
  }

  render() {
    return (
      <>
        <Box
          alignSelf="end"
          pad="small"
          direction="column"
          border={{
            color: "light-4",
            width: "10px",
          }}
          round="small"
          background={{
            color: "dark-1",
          }}
        >
          <Box direction="column" pad="xsmall" border="all" round="small">
            <RadioButtonGroup
              options={[
                {
                  id: "one",
                  name: "",
                  value: "ALL",
                  label: <All />,
                },
                {
                  id: "two",
                  name: "",
                  value: "SELECTION",
                  label: <Selection />,
                },
                {
                  id: "three",
                  name: "",
                  value: "LAST",
                  label: <Last />,
                },
              ]}
              value={this.state.focusMode}
              onChange={this.setFocusMode}
              name=""
            />
          </Box>
          <Box direction="row" margin="small">
            <Markdown>{this.state.autoFocus ? "AUTO" : "~~AUTO~~"}</Markdown>
            <CheckBox
              checked={this.state.autoFocus}
              onChange={() => {
                this.toggleAutoFocus();
              }}
            />
          </Box>
        </Box>
      </>
    );
  }
}

export default GraphModeController;
