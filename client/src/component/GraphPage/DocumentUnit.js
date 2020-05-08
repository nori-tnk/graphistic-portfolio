import React, { Component } from "react";
import { Box, Button, TextArea, Markdown } from "grommet";
import { Download, Refresh, Code, Article } from "grommet-icons";
import DownloadService from "../../service/downloader";
import CustomButton from "../common/CustomButton";

class DocumentUnit extends Component {
  constructor(props) {
    super(props);
    this.state = {
      finalData: this.props.graphManager.documentator.generateMarkdownFrom(
        this.props.graphManager.collector.nodeBeansInCollection()
      ),
      markdownPreview: false,
    };
    this.generateMarkdown = this.generateMarkdown.bind(this);
    this.toggleMarkdownPreview = this.toggleMarkdownPreview.bind(this);
    this.startDownload = this.startDownload.bind(this);
    this.updateData = this.updateData.bind(this);
  }

  componentDidMount() {
    this.props.graphManager.viewStateManager.enterDocumentTab().render();
  }

  componentDidUpdate() {
    this.props.graphManager.viewStateManager.render();
  }

  componentWillUnmount() {
    this.props.graphManager.viewStateManager.leaveDocumentTab();
  }

  updateData(e) {
    this.setState({ finalData: e.target.value });
  }

  generateMarkdown() {
    this.setState({
      finalData: this.props.graphManager.documentator.generateMarkdownFrom(
        this.props.graphManager.collector.nodeBeansInCollection()
      ),
    });
  }

  toggleMarkdownPreview() {
    this.setState({ markdownPreview: !this.state.markdownPreview });
  }

  startDownload(format) {
    // @refactor this logic should be inside startDownload in DownloadService
    let data, prefix;
    const config = this.props.graphManager.config;
    switch (format) {
      case "text":
        data = this.state.finalData;
        prefix = `${config.doc.title}-${config.doc.name}`;
        break;
      case "png":
        data = this.props.graphManager.cy.png();
        prefix = `${config.img.title}-${config.doc.name}`;
        break;
      default:
        console.warn(`Unsupported format ${format}`);
    }
    new DownloadService(data, format, prefix).startDownload();
  }

  render() {
    const size = this.props.size;
    return (
      <Box
        align="center"
        flex={true}
        fill={size !== "small" ? false : true}
        height="medium"
      >
        <Box fill="horizontal" style={{ maxHeight: "xxsmall" }} direction="row">
          <Button
            margin="xsmall"
            icon={<Refresh />}
            onClick={this.generateMarkdown}
          />
          <Button
            margin="xsmall"
            icon={this.state.markdownPreview ? <Code /> : <Article />}
            onClick={this.toggleMarkdownPreview}
          />
        </Box>
        <Box
          // height="medium"
          overflow="hidden"
          fill={true}
          // fill="horizontal"
          style={{ minHeight: "medium" }}
          background="dark-2"
        >
          {this.state.markdownPreview ? (
            <Box overflow={{ vertical: "scroll" }}>
              <Markdown>{this.state.finalData}</Markdown>
            </Box>
          ) : (
            <TextArea
              size="large"
              fill={true}
              resize="vertical"
              style={{
                fontFamily: "Ubuntu Mono, monospace",
                backgroundColor: "dimgray",
                color: "antiquewhite",
                fontSize: "18px",
                fontWeight: "normal",
              }}
              value={this.state.finalData || "markdown goes here"}
              onChange={this.updateData}
            />
          )}
        </Box>
        <Box
          direction="row"
          fill="horizontal"
          pad="xsmall"
          justify="stretch"
          alignContent="stretch"
          overflow="hidden"
          background={size !== "small" ? "dark-2" : "transparent"}
          round={{ corner: "bottom", size: "xxsmall" }}
        >
          <CustomButton
            labelText=".png"
            icon={<Download size="small" />}
            onClick={this.startDownload.bind(this, "png")}
          />
          <CustomButton
            labelText=".md"
            icon={<Download size="small" />}
            onClick={this.startDownload.bind(this, "text")}
          />
        </Box>
      </Box>
    );
  }
}

export default DocumentUnit;
