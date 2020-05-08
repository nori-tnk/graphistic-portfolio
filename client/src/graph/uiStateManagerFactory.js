/**
 * Manages user interaction states of nodes: selected/hovered
 */
class UIStateManager {
  constructor(graphManager) {
    this.graphManager = graphManager;

    this.viewStateManager = this.graphManager.viewStateManager;
    this.cy = this.graphManager.cy;
    this.nodes = this.graphManager.nodes;

    this.selectionHistory = [];

    this.initInteractionStates().registerEventHandlers();
  }

  initInteractionStates() {
    // interactionState is actually necessary as
    // 1. hovered state is not found in cytoscape.js; and
    // 2. eles.selected() is questionable: after the "select" event, it sometimes evaluates to false
    this.nodes.forEach(
      (n) => (n.interactionState = { hovered: false, selected: false })
    );

    return this;
  }

  registerEventHandlers() {
    const nodes = this.nodes;
    const viewStateManager = this.viewStateManager;

    nodes.on("select", (event) => {
      const node = event.target;

      node.interactionState.selected = true;

      // @patch
      // problem: on "select" event, node.selected() evaluates to false (probably only if triggered w/ custom event emit; race condition?)
      // workaround: manually node.select(); if selectionHistory has the node in question, immediately return
      if (this.selectionHistory.some((n) => n === node)) return;

      this.selectionHistory.push(node);

      if (!node.selected()) {
        node.select();
      }

      viewStateManager.updateStyle(event).recordPrevFocusMode().render();
    });

    nodes.on("unselect", (event) => {
      const node = event.target;
      const viewStateManager = this.viewStateManager;

      node.interactionState.selected = false;

      this.selectionHistory.splice(
        this.selectionHistory.findIndex((n) => n === node),
        1
      );
      viewStateManager.updateStyle(event).recordPrevFocusMode().render();
    });

    nodes.on("mouseover", (event) => {
      const node = event.target;

      node.interactionState.hovered = true;
      viewStateManager.updateStyle(event);
    });

    nodes.on("mouseout", (event) => {
      const node = event.target;

      node.interactionState.hovered = false;
      viewStateManager.updateStyle(event);
    });
  }

  trigger(event, targetId) {
    const node = this.nodes.getElementById(targetId);
    node.emit(event, { target: node });
  }

  getSelectedNodes(options) {
    if (!options) return this.selectionHistory;
    if (
      !options.as ||
      options.as.toString().toUpperCase() !== "COLLECTION" ||
      !options.of ||
      options.of.toString().toUpperCase() !== "NODES"
    ) {
      return new Error(`provided option ${options} is not supported`);
    }
    let collection = this.nodes.cy().collection();
    this.selectionHistory.forEach((n) => collection.merge(n));
    return collection;
  }

  getSelectedNodesAndTheirNbrs(options) {
    const selectedNodesAndtheirNbrs = this.graphManager.constructor.getNbrsOf(
      this.getSelectedNodes(),
      options
    );

    return selectedNodesAndtheirNbrs;
  }

  getLastSelection() {
    if (this.selectionHistory.length === 0) return this.nodes.cy().collection();
    return this.selectionHistory[this.selectionHistory.length - 1];
  }

  getLastSelectionAndItsNbrs(options) {
    return this.graphManager.constructor.getNbrsOf(
      this.getLastSelection(),
      options
    );
  }

  selectedNodesInclude(node) {
    if (typeof node === "string") {
      return this.nodes.getElementById(node).interactionState.selected;
    }
    return node.interactionState.selected;
  }

  getNodesUnderInteractionWithin(nodes) {
    const _nodes = nodes || this.nodes;
    return _nodes.filter((n) => {
      return n.interactionState.selected || n.interactionState.hovered;
    });
  }
}

export default (graphManager) => new UIStateManager(graphManager);
