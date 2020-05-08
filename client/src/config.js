import { grommet } from "grommet/themes";
import { deepMerge } from "grommet/utils";
import customTheme from "./style/customTheme00.json";

const config = {
  hashRoutes: true,
  siteTitle: "nori-tnk",
  pages: {
    home: { title: "Home", path: "/" },
    graph: { title: "Experience Graph", path: "/graph" },
    about: { title: "About", path: "/about" },
  },
  doc: {
    title: "Report",
    siteUrl: document.location.origin,
    name: "TANAKA Noritsugu",
    country: "Japan",
    specialDataConversion: {
      node: [{ name: "This website", substitution: "Portfolio web site" }],
      rel: [
        { label: "LEARNED THROUGH", substitution: "HAS BEEN LEARNED THROUGH" },
        { label: "REPRODUCED ON", substitution: "HAS BEEN REPRODUCED ON" },
      ],
    },
  },
  img: {
    title: "Graph",
  },
  externalLinks: {
    githubRepo: {
      title: "nori-tnk/static-graphistic-portfolio",
      path: "https://github.com/nori-tnk/static-graphistic-portfolio",
    },
    demoVid: {
      title: "Graph app quick guide",
      path: "https://www.youtube-nocookie.com/embed/NDvEoRcTZrU",
    },
  },
  theme: deepMerge(deepMerge(grommet, customTheme), {
    global: {
      font: {
        size: "18px",
        height: "20px",
      },
    },
  }),
};

if (config.hashRoutes) {
  Object.values(config.pages).forEach((page) => {
    page.path = "#" + page.path;
  });
}

export default config;
