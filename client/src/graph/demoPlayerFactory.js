class DemoPlayer {
  constructor(graphManager) {
    this.graphManager = graphManager;
    this.nodes = graphManager.nodes;
  }

  randomlyTraverse() {
    const viewStateManager = this.graphManager.viewStateManager;
    const uiStateManager = this.graphManager.uiStateManager;
    const cy = this.graphManager.cy;

    const randomlyPickUpNodeFrom = (nodes) => {
      return nodes.toArray()[Math.floor(nodes.length * Math.random())];
    };

    const randomlyPickUpNode = () => randomlyPickUpNodeFrom(this.nodes);

    viewStateManager.setAutoFocus("ALL");
    let prevNode;

    this.interval = setInterval(() => {
      const numNodesSelected = uiStateManager.getSelectedNodes().length;
      if (numNodesSelected === 0 || 5 < numNodesSelected) {
        uiStateManager.getSelectedNodes().forEach((n) => n.emit("unselect"));
        prevNode = randomlyPickUpNode();
      }

      const selectedNodes = uiStateManager.getSelectedNodes({
        as: "collection",
        of: "nodes",
      });
      const nbrs = prevNode.openNeighbourhood().nodes();
      const node =
        randomlyPickUpNodeFrom(nbrs.subtract(selectedNodes)) ||
        randomlyPickUpNode();
      node.emit("select");
      cy.animate({
        center: { eles: node },
        zoom: 2,
        easing: "ease-in-out",
        duration: 2000,
      });
      prevNode = node;
    }, 3000);

    return this;
  }
}

export default (graphManager) => {
  return new DemoPlayer(graphManager);
};
