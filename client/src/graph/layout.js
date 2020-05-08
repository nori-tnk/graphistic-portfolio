import { mergeOptions } from "../service/util";

const d3force = (cy, options, specialOptions) => {
  let fitOnce = specialOptions ? specialOptions.fitOnce : true;

  const defaultOptions = {
    name: "d3-force",
    animate: true,
    fit: false,
    fixedAfterDragging: false,
    ungrabifyWhileSimulating: false,
    padding: 50,
    linkId: function id(d) {
      return d.id;
    },
    linkDistance: 120,
    manyBodyStrength: -300,
    ready: function () {},
    stop: function () {},
    tick: function (progress) {
      if (fitOnce && 0.1 < progress) {
        fitOnce = false;
        cy.animate({ fit: { eles: cy.nodes(), padding: 30 } });
      }
    },
    randomize: false,
    infinite: true,
  };

  return mergeOptions(defaultOptions, options);
};

const cose = (options) => {
  const defaultOptions = {
    name: "cose",
    animate: true,
    nodeDimensionsIncludeLabels: true,
  };

  return mergeOptions(defaultOptions, options);
};

const concentric = (options) => {
  const defaultOptions = {
    name: "concentric",
    animate: true,
    nodeDimensionsIncludeLabels: true,
  };
  return mergeOptions(defaultOptions, options);
};

export { d3force, cose, concentric };
