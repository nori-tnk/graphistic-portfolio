export default class CollectionService {
  constructor(graphManager) {
    this.graphManager = graphManager;
  }

  nodeBeansInCollection() {
    return this.graphManager.nodeBeansManager.getNODE_BEANSof(
      this.graphManager.uiStateManager.getSelectedNodes()
    );
  }

  getCollectionLength() {
    return this.graphManager.uiStateManager.getSelectedNodes().length;
  }

  getSelectionList() {
    return this.graphManager.nodeBeansManager
      .getNODE_BEANSof(this.graphManager.uiStateManager.getSelectedNodes())
      .reverse();
  }
}
