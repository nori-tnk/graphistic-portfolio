import React, { Component } from "react";
import { Box, Button, Text } from "grommet";
import { AddCircle, SubtractCircle } from "grommet-icons";

class ListItem extends Component {
  constructor(props) {
    super(props);
    // this.state = { added: !this.props.defaultMembership };
    this.graphManager = this.props.graphManager;
    this.state = {
      added: this.graphManager.uiStateManager.selectedNodesInclude(
        this.props.datum.id
      ),
    };
    this.selectNode = this.selectNode.bind(this);
    this.unselectNode = this.unselectNode.bind(this);
  }

  highlightNodes(id) {
    this.props.graphManager.uiStateManager.trigger("mouseover", id);
  }

  unhighlightNodes(id) {
    this.props.graphManager.uiStateManager.trigger("mouseout", id);
  }

  selectNode(id) {
    this.setState({ added: true });
    this.props.graphManager.uiStateManager.trigger("select", id);
  }

  unselectNode(id) {
    this.setState({ added: false });
    this.props.graphManager.uiStateManager.trigger("unselect mouseout", id);
  }

  render() {
    return (
      <Box
        value={this.props.datum.id}
        direction="row"
        // fill="horizontal"
        width="small"
        height="xxsmall"
        gap="xsmall"
        margin={{
          left: "xxsmall",
          right: "small",
          top: "xxsmall",
          bottom: "xxsmall",
        }}
        pad={{
          left: "small",
          right: "small",
          top: "xxsmall",
          bottom: "xxsmall",
        }}
        align="center"
        flex="shrink"
        border="all"
        round="xsmall"
        background={{ color: "light-1", opacity: "strong" }}
        animation="fadeIn"
        onMouseOver={() => {
          this.highlightNodes(this.props.datum.id);
        }}
        onMouseOut={() => {
          this.unhighlightNodes(this.props.datum.id);
        }}
        tabIndex="-1"
        onKeyDown={() => {
          // @bug behaves in a wrong way
          if (!this.state.added) {
            // this.selectNode(this.props.datum.id);
          } else {
            // this.unselectNode(this.props.datum.id);
          }
          return false;
        }}
      >
        <Box basis="3/4">
          <Text truncate={true} size="small">
            {this.props.datum.name}
          </Text>
        </Box>
        <Button justify="start">
          {!this.state.added ? (
            <AddCircle
              onClick={() => {
                this.selectNode(this.props.datum.id);
              }}
            />
          ) : (
            <SubtractCircle
              onClick={() => {
                this.unselectNode(this.props.datum.id);
              }}
            />
          )}
        </Button>
      </Box>
    );
  }
}

export default ListItem;
