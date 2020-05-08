/**
 * Collection of funcs responsible for stying nodes. viewStateManager is intended to be plugged in as `this`
 */
import { makeTippy, tippyContentOf } from "./tippy";
import style from "../style/graphStyle";

const addMarkerTo = function (node) {
  node.style(
    this.style.initSet.find((s) => s.selector === "node:selected").style
  );

  return this;
};

const removeMarkerFrom = function (node) {
  node.style(
    this.style.initSet.find((s) => s.selector === "node:unselected").style
  );

  return this;
};

const highlightNeighborsWithin = function (targetNodes) {
  const underInteraction = this.uiStateManager.getNodesUnderInteractionWithin(
    targetNodes
  );

  const neighborsIdSet = new Set();
  underInteraction.forEach((n) => {
    n.closedNeighborhood()
      .nodes()
      .forEach((n) => neighborsIdSet.add(n.id()));
  });

  targetNodes.forEach((n) => {
    if (neighborsIdSet.has(n.id())) {
      n.style(style.node.norm);
    } else {
      n.style(style.node.weak);
    }
  });

  return this;
};

const highlightAllNodes = function () {
  this.nodes.style(this.style.node.norm);
  return this;
};

const showTippyOf = function (node) {
  this.clearTippiesOf(
    this.nodes.filter((n) => n.data("id") !== node.data("id"))
  );

  if (!node.tippy) {
    node.tippy = makeTippy(node, tippyContentOf(node));
  }
  node.tippy.show();

  return this;
};

const clearTippiesOf = function (targetNodes) {
  let _targetNodes = targetNodes || this.nodes;
  if (!(_targetNodes instanceof Array) && _targetNodes.tippy) {
    _targetNodes.tippy.hide();
    return this;
  }

  _targetNodes
    .filter((n) => n.tippy)
    .forEach((n) => {
      n.tippy.hide();
    });

  return this;
};

const clearAllTippies = function () {
  return this.clearTippiesOf();
};

const stylist = {
  style,
  addMarkerTo,
  removeMarkerFrom,
  highlightNeighborsWithin,
  showTippyOf,
  clearTippiesOf,
  clearAllTippies,
  highlightAllNodes,
};

export {
  stylist as default,
  style,
  addMarkerTo,
  removeMarkerFrom,
  highlightNeighborsWithin,
  showTippyOf,
  clearTippiesOf,
  clearAllTippies,
  highlightAllNodes,
};
