const mergeOptions = (defaultOptions, providedOptions) => {
  let _options = defaultOptions;
  if (!!providedOptions) {
    Object.entries(providedOptions).forEach(([k, v]) => {
      _options[k] = v;
    });
  }

  return _options;
};

const trimNewLinesOf = (markdown) => {
  return markdown.replace(/\n/g, "");
};

export { mergeOptions, trimNewLinesOf };
