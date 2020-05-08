/**
 * Provides a service to let the caller hold the only data of nodes as an array
 */
export default class SlimifyingService {
  constructor(nodes) {
    this.NODE_BEANS = this.constructor.slimify(nodes);
  }

  static slimify(nodes) {
    return nodes.map((n) => {
      const slimnode = {};
      Object.entries(n.data()).forEach(([k, v]) => {
        slimnode[k] = v;
      });
      return slimnode;
    });
  }

  getNODE_BEANSof(nodes) {
    const slimNodes = [];
    for (let n of nodes) {
      this.NODE_BEANS.forEach((slimNode) => {
        if (n.data("id") === slimNode.id) slimNodes.push(slimNode);
      });
    }
    return slimNodes;
  }
}
