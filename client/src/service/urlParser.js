const queryDarkMode = () => {
  const loc = document.location;

  if (loc.hash) {
    const reMatch = new RegExp(/#.*[?]dark=(true|false)/).exec(loc.hash);
    return reMatch ? "true" === reMatch[1] : false;
  }

  const darkMode = new URLSearchParams(loc.search).get("dark");
  return darkMode === "true";
};

export { queryDarkMode };
