import React, { Component } from "react";
import { Box, Stack, Tab, Tabs, Text } from "grommet";
import { Basket, DocumentText, Search } from "grommet-icons";
import SearchUnit from "./SearchUnit";
import CollectionUnit from "./CollectionUnit";
import DocumentUnit from "./DocumentUnit";

class ServiceUnit extends Component {
  constructor(props) {
    super(props);
    this.state = {
      numNodesInCollection: 0,
      hasBadgeWatcher: false,
    };
  }

  componentDidUpdate() {
    if (!this.state.hasBadgeWatcher && this.props.graphManager.nodes) {
      this.props.graphManager.nodes.on(
        "select unselect",
        this.updateBadge.bind(this)
      );
    }
  }

  componentWillUnmount() {
    if (this.props.graphManager && this.props.graphManager.nodes) {
      this.props.graphManager.nodes.unlisten(
        "select unselect",
        this.updateBadge
      );
    }
  }

  updateBadge() {
    this.setState({
      numNodesInCollection: this.props.graphManager.collector.getCollectionLength(),
      hasBadgeWatcher: true,
    });
  }

  render() {
    const { size, graphManager } = this.props;
    return (
      <Box
        flex
        width={size !== "small" ? "medium" : "full"}
        height={size !== "small" ? "small" : "medium"}
        background="dark-2"
        elevation="medium"
      >
        <Tabs flex>
          <Tab
            title={
              <Box pad="small">
                <Search />
              </Box>
            }
          >
            <SearchUnit graphManager={graphManager} size={size} />
          </Tab>
          <Tab
            title={
              <Stack anchor="top-right">
                <Box pad="small">
                  <Basket />
                </Box>
                <Box
                  background="brand"
                  pad={{ horizontal: "xsmall" }}
                  round
                  size="xsmall"
                >
                  <Text size="xsmall">{this.state.numNodesInCollection}</Text>
                </Box>
              </Stack>
            }
          >
            <CollectionUnit graphManager={graphManager} size={size} />
          </Tab>
          <Tab
            title={
              <Box pad="small">
                <DocumentText />
              </Box>
            }
          >
            <DocumentUnit graphManager={graphManager} size={size} />
          </Tab>
        </Tabs>
      </Box>
    );
  }
}

export default ServiceUnit;
