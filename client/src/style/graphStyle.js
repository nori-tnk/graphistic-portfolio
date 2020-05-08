const style = {
  node: {
    init: {
      learningOpportunity: {
        "background-color": "skyblue",
        label: "data(name)",
      },
      tech: {
        "background-color": "khaki",
        label: "data(name)",
      },
      abstractConcept: {
        "background-color": "plum",
        label: "data(name)",
      },
      cert: {
        "background-color": "salmon",
        label: "data(name)",
      },
    },
    norm: {
      "background-opacity": 1.0,
    },
    weak: {
      "background-opacity": 0.3,
    },
    selected: {
      "border-width": 5,
      "border-color": "lime",
      "border-opacity": "1",
      padding: "10%",
      "text-valign": "top",
      "font-size": 20,
      color: "black",
      "text-background-opacity": "0",
      "text-outline-color": "white",
      "text-outline-width": "0.1em",
      "text-wrap": "wrap",
      "text-max-width": "14em",
    },
    unselected: {
      "border-width": 10,
      "border-opacity": "0",
      padding: "10%",
      "text-valign": "center",
      "font-size": 14,
      color: "white",
      "text-background-opacity": "0",
      "text-outline-color": "black",
      "text-outline-width": "0.1em",
      "text-wrap": "ellipsis",
      "text-max-width": "10em",
    },
  },
  edge: {
    norm: {
      "curve-style": "bezier",
      "target-arrow-shape": "triangle",
      "target-arrow-color": "lightgray",
      "line-color": "lightgray",
      "target-distance-from-node": "5%",
      content: "data(label)",
      "text-rotation": "autorotate",
      color: "aliceblue",
      "text-outline-color": "black",
      "text-outline-width": "0.1em",
      "font-size": 10,
      "min-zoomed-font-size": 20,
      "font-style": "italic",
      "text-wrap": "wrap",
      "text-overflow-wrap": "whitespace",
      "text-max-width": "5em",
    },
  },
};

style.initSet = [
  {
    selector: "node[labels *= ':LearningOpportunity']",
    style: style.node.init.learningOpportunity,
  },
  { selector: "node[labels *= ':Tech']", style: style.node.init.tech },
  {
    selector: "node[labels *= ':AbstractConcept']",
    style: style.node.init.abstractConcept,
  },
  { selector: "node[labels *= ':Cert']", style: style.node.init.cert },
  {
    selector: "edge",
    style: style.edge.norm,
  },
  {
    selector: "node:selected",
    style: style.node.selected,
  },
  {
    selector: "node:unselected",
    style: style.node.unselected,
  },
];

export default style;
