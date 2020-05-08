import tippy, { sticky } from "tippy.js";
import "tippy.js/dist/tippy.css";

// tippy generator
var makeTippy = function (node, text) {
  var ref = node.popperRef();

  // unfortunately, a dummy element must be passed
  // as tippy only accepts a dom element as the target
  // https://github.com/atomiks/tippyjs/issues/661
  var dummyDomEle = document.createElement("div");

  var tip = tippy(dummyDomEle, {
    onCreate: function (instance) {
      // mandatory
      // patch the tippy's popper reference so positioning works
      // https://atomiks.github.io/tippyjs/misc/#custom-position
      instance.popperInstance.reference = ref;
    },
    lazy: false, // mandatory
    trigger: "manual", // mandatory

    // dom element inside the tippy:
    content: function () {
      // function can be better for performance
      var div = document.createElement("div");

      div.innerHTML = text;

      return div;
    },

    arrow: true,
    placement: "auto",
    distance: "0.5rem",
    hideOnClick: true,
    multiple: true,
    sticky: true,
    plugins: [sticky],
    // delay: [0, 1000], // for some reason this does not take an effect
    theme: "original", // this neither works
    interactive: true,
    appendTo: document.body, // or append dummyDomEle to document.body
  });

  return tip;
};

const tippyContentOf = (node) => {
  let name,
    labels,
    url = null;
  let others = `<table>`;
  others += Object.entries(node.data()).reduce((accum, [k, v]) => {
    switch (k) {
      case "id":
        break;
      case "name":
        name = v;
        break;
      case "labels":
        labels = v;
        break;
      case "url":
        url = v;
        break;
      default:
        return accum + `<tr><td><h5>${k}</h5></td><td>${v}</td></tr>`;
    }

    return accum;
  }, "");

  others += `</table>`;
  url = url ? `<a href="${url}" target="_blank">Link</a>` : "";
  return `<div class="tippy-content"><h4>${name}</h4><p class="labels">${labels}</p>${others}${url}</div>`;
};

export { makeTippy, tippyContentOf };
