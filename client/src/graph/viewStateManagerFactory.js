import "regenerator-runtime/runtime";
import EventEmitter from "eventemitter3";
import { d3force, cose, concentric } from "./layout";
import stylist, { style } from "./stylist";

/**
 * Manages stying of nodes and the graph viewport, which is called "focus mode", acc to the current state
 */
class ViewStateManager {
  constructor(graphManager) {
    this.graphManager = graphManager;
    this.cy = this.graphManager.cy;
    this.nodes = this.graphManager.nodes;
    this.edges = this.graphManager.edges;
    this.style = style;
    this.focusMode = "ALL";
    this.autoFocus = true;
    this.inDocumentTab = false;
    this.prevFocusMode = "ALL";
    this.layouts = [];
    this.ee = new EventEmitter();

    this.initStyle().installStylist();
  }

  initStyle() {
    this.cy.style(style.initSet);
    return this;
  }

  installStylist() {
    Object.entries(stylist).forEach(([k, v]) => {
      if (v instanceof Function) {
        this[k] = v.bind(this);
      } else {
        this[k] = v;
      }
    });
    return this;
  }

  enterDocumentTab() {
    this.inDocumentTab = true;
    return this;
  }

  leaveDocumentTab() {
    this.inDocumentTab = false;
    return this;
  }

  setAutoFocus(mode) {
    this.recordPrevFocusMode();
    let autoFocusToggled = false;
    if (mode) {
      if (
        ["ALL", "SELECTION", "LAST"].find(
          (MODE) => MODE === mode.toString().toUpperCase()
        )
      ) {
        autoFocusToggled = this.autoFocus;
        this.autoFocus = false;
        this.focusMode = mode;
      } else {
        autoFocusToggled = !this.autoFocus;
        this.autoFocus = true;
      }
    } else {
      autoFocusToggled = this.autoFocus;
      this.autoFocus = false;
    }

    if (autoFocusToggled) {
      this.ee.emit("autoFocusToggle", this.autoFocus);
    }

    return this;
  }

  autoSetFocusMode() {
    this.recordPrevFocusMode();

    if (this.uiStateManager.selectionHistory.length === 0) {
      this.focusMode = "ALL";
    } else if (this.inDocumentTab) {
      this.focusMode = "SELECTION";
    } else {
      this.focusMode = "LAST";
    }

    if (this.prevFocusMode !== this.focusMode) {
      this.ee.emit("focusModeChange", this.focusMode);

      if (!this.autoFocus) {
        this.autoFocus = true;
        this.ee.emit("autoFocusToggle", this.autoFocus);
      }
    }

    return this;
  }

  recordPrevFocusMode() {
    this.prevFocusMode = this.focusMode;
    return this;
  }

  render() {
    if (!this.uiStateManager) {
      this.uiStateManager = this.graphManager.uiStateManager;
    }

    if (!this.autoFocus) {
      if (
        this.uiStateManager.getSelectedNodes().length === 0 &&
        this.focusMode !== "ALL"
      ) {
        this.autoSetFocusMode();
      }

      return this.updateRemovalState().runLayout();
    }

    this.autoSetFocusMode().updateRemovalState().runLayout();
  }

  runLayout() {
    const cy = this.cy;
    let layout = null;
    this.layouts.forEach(() => this.layouts.pop().stop());
    switch (this.focusMode) {
      case "SELECTION":
        layout = cy.layout(cose());
        break;
      case "LAST":
        layout = cy.layout(concentric());
        break;
      case "ALL":
        if (this.graphManager.demoPlayer) return this;

        if (
          0 < this.graphManager.uiStateManager.getSelectedNodes().length &&
          this.prevFocusMode === "ALL"
        ) {
          layout = cy.layout(d3force(this.cy, {}, { fitOnce: false }));
        } else {
          layout = cy.layout(d3force(this.cy));
        }
        break;
    }
    layout.run();
    this.layouts.push(layout);
    return this;
  }

  updateRemovalState() {
    const uiStateManager = this.uiStateManager;
    const nodes = this.nodes;
    const edges = this.edges;
    const cy = this.cy;

    nodes.restore();
    edges.restore();

    if (this.focusMode === "ALL") return this;
    let nodesToRetain;
    switch (this.focusMode) {
      case "SELECTION":
        nodesToRetain = uiStateManager.getSelectedNodes({
          as: "collection",
          of: "nodes",
        });
        break;
      case "LAST":
        nodesToRetain = uiStateManager.getLastSelectionAndItsNbrs({
          as: "collection",
          of: "nodes",
        });
        break;
      default:
        throw new Error(`Unexpected mode ${this.focusMode}`);
    }
    const elesToRemove = nodes.subtract(nodesToRetain);
    cy.remove(elesToRemove);
    return this;
  }

  *simulateRemovalState(focusMode) {
    const lastFocusMode = this.focusMode;
    const lastAutoFocus = this.autoFocus;
    this.focusMode = focusMode;
    yield this.updateRemovalState();

    if (!lastAutoFocus) {
      this.setAutoFocus(lastFocusMode);
    } else {
      this.autoSetFocusMode();
    }
    this.updateRemovalState().render();
  }

  updateStyle(event) {
    if (!this.uiStateManager) {
      this.uiStateManager = this.graphManager.uiStateManager;
    }
    const eventType = event.type;
    const node = event.target;

    switch (eventType) {
      case "select":
        return this.addMarkerTo(node);
      case "unselect":
        return this.clearTippiesOf(node).removeMarkerFrom(node);
      case "mouseover":
        return this.showTippyOf(node).highlightNeighborsWithin(this.nodes);
      case "mouseout":
        this.clearTippiesOf(node);
        if (this.uiStateManager.getSelectedNodes().length === 0) {
          return this.highlightAllNodes();
        }
        const { zeroToSecondNbrsOf } = this.graphManager.constructor;
        return this.highlightNeighborsWithin(
          zeroToSecondNbrsOf(node, { as: "array", of: "nodes" })
        );
      default:
        console.warn(`Unhandled event ${eventType} on ${node}`);
    }
  }
}

export default (graphManager) => new ViewStateManager(graphManager);
