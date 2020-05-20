import cytoscape from "cytoscape";
import jquery from "jquery";
import graphml from "cytoscape-graphml";
import d3Force from "cytoscape-d3-force";
import popper from "cytoscape-popper";
import config from "../config";
import SearchService from "../service/searcher";
import CollectionService from "../service/collection";
import DocService from "../service/documentator";
import SlimifyingService from "../service/slimifier";
import viewStateManagerFactory from "./viewStateManagerFactory";
import uiStateManagerFactory from "./uiStateManagerFactory";
import demoPlayerFactory from "./demoPlayerFactory";

graphml(cytoscape, jquery);
cytoscape.use(d3Force);
cytoscape.use(popper);

/**
 * Manages the graph instance and wires up state managers and other additional services.
 */
class GraphManager {
  constructor(data, options, demo) {
    this.cy = this.initGraph(data, options);
    this.nodes = this.cy.nodes();
    this.edges = this.cy.edges();
    this.formatData();
    this.viewStateManager = viewStateManagerFactory(this);
    this.uiStateManager = uiStateManagerFactory(this);

    this.viewStateManager.render();

    if (demo) {
      this.demoPlayer = demoPlayerFactory(this);
      this.cy.on("layoutstop", () => {
        this.demoPlayer.randomlyTraverse();
      });
    } else {
      this.nodeBeansManager = new SlimifyingService(this.nodes);
      this.searcher = new SearchService(this);
      this.collector = new CollectionService(this);
      this.documentator = new DocService(config.doc, this);
      this.config = config;
    }
  }

  initGraph(data, options) {
    // default options
    let _options = {
      container: document.getElementById("cy"),
      headless: false,

      selectionType: "additive",
      ready: function () {
        this.graphml({
          node: { css: true },
          edge: { css: true },
          layoutBy: "grid",
        });
        this.graphml(data);
      },
    };

    // merge provided options into the default one
    if (!!options) {
      Object.entries(options).forEach(([k, v]) => {
        _options[k] = v;
      });
    }

    return cytoscape(_options);
  }

  formatData() {
    this.edges.forEach((e) =>
      e.data("label", e.data("label").replace(/_/g, " "))
    );

    this.nodes.forEach((n) => {
      const key = "description";
      const raw = n.data(key);
      !raw || n.data(key, raw.slice(0, 1).toUpperCase() + raw.slice(1));
    });
  }

  getRelationshipsOf(nodeId) {
    // temporarily restore currently selected nodes regardless of the current focusMode
    const simulator = this.viewStateManager.simulateRemovalState("SELECTION");
    simulator.next();

    const node = this.nodes.getElementById(nodeId);
    const nbrs = node.openNeighbourhood();
    const edges = nbrs.edges();
    const nodes = nbrs.nodes();
    const rels = { from: [], to: [] };

    // for eavh edge, get target/source node ids and find corresponding nodes from the neighborhood list
    edges.forEach((e) => {
      const label = e.data("label");
      if (node === e.source()) {
        const target = nodes.filter((n) => n === e.target())[0];
        const i = rels.from.findIndex((rel) => rel.label === label);
        const name = target.data("name");
        if (0 <= i) {
          rels.from[i].nodes.push(name);
        } else {
          rels.from.push({ label, nodes: [name] });
        }
      }

      if (node === e.target()) {
        const source = nodes.filter((n) => n === e.source())[0];
        const i = rels.to.findIndex((rel) => rel.label === label);
        const name = source.data("name");
        if (0 <= i) {
          rels.to[i].nodes.push(name);
        } else {
          rels.to.push({ label, nodes: [name] });
        }
      }
    });

    // restore the original removal state
    simulator.next();
    return rels;
  }

  destroyGraph() {
    if (this.demoPlayer) clearInterval(this.demoPlayer.interval);
    this.cy.destroy();
  }

  // @refactor reduce redundant procedures
  static getNbrsOf(nodes, option) {
    const predefinedOption = {
      as: { default: "ARRAY", others: new Set(["SET", "COLLECTION"]) },
    };
    const nbrs = new Set();

    if (
      !option ||
      !option.of ||
      (option.of.toString().toUpperCase() !== "ID" &&
        option.of.toString().toUpperCase() !== "IDS")
    ) {
      nodes.forEach((n) => {
        n.closedNeighborhood()
          .nodes()
          .forEach((n) => nbrs.add(n));
      });
    } else {
      nodes.forEach((n) => {
        n.closedNeighborhood()
          .nodes()
          .map((n) => n.data("id"))
          .forEach((id) => nbrs.add(id));
      });
    }

    if (
      !option ||
      !option.as ||
      !predefinedOption.as.others.has(option.as.toString().toUpperCase())
    ) {
      return GraphManager.setToArray(nbrs);
    }

    if (option.as.toString().toUpperCase() === "COLLECTION") {
      let collection = nodes.cy().collection();
      nodes.forEach((n) => collection.merge(n.closedNeighborhood().nodes()));
      return collection;
    }

    return nbrs;
  }

  static zeroToSecondNbrsOf(node, option) {
    const nbrs = new Set();
    node
      .closedNeighborhood()
      .nodes()
      .forEach((firstNbr) => {
        nbrs.add(firstNbr);
        firstNbr
          .closedNeighborhood()
          .nodes()
          .forEach((secondNbr) => nbrs.add(secondNbr));
      });

    if (option) {
      if (option.of && "NODES" !== option.of.toString().toUpperCase()) {
        console.error(`Unsupported option option.of:${option.of}`);
      }
      if (option.as && "ARRAY" !== option.as.toString().toUpperCase()) {
        console.error(`Unsupported option option.as:${option.as}`);
      }
    }

    return GraphManager.setToArray(nbrs);
  }

  static setToArray(set) {
    const array = [];

    set.forEach((n) => {
      array.push(n);
    });
    return array;
    // @lesson filter() is not for Set of SetIterator,
    // deep copying to an Array is imposibble for "Uncaught TypeError: Converting circular structure to JSON"
  }
}

export default (data, options, demo) => {
  return new GraphManager(data, options, demo);
};
