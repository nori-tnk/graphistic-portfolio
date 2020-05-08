import { license, copyright } from "./license";

const contents = {
  notes: {
    heading: `### Notes`,
    body: `
#### What's in the graph?

* My experiences and knowledge on various IT concepts / software / programming languages;
* Learning materials that have significantly helped me gaining skills; and
* Relationships mostly in terms of what has been learned [by me, of couse] through what

#### What's NOT in the graph?

* Any fragments: every single blog post or video clip; or
* Relationships that are obvious or do not seem to tell my experiences well

I have learned a lot from many fragmental/modular resouces! Good examples are MDN web docs, W3C School and Traversy Media. 
While they all have been helpful, I ended up omitting those for simplicity. 
As for relationships, for instance, React.js, parcel-bunder and Cytoscape.js are obviously heavily related to JavaScript but those relationships are not in the graph.

#### How can I utilize the graph?
I simply hope you find serveral skills/experiences of your interest in the graph! 
Also, I hope doing so be more fun, efficient and with less limitation than just reading my resume on job-matching platforms!
`,
  },
  license: {
    heading: `### License & Disclaimer`,
    body: `
${license.forewards}
${copyright}
${license.body}`,
  },
  ack: {
    heading: `### Achknowledgement & Further info`,
    body: (pathToGithubRepo) => `
This graph app was built upon top of an execellent library called 
[Cytoscape.js](https://js.cytoscape.org/) and its extensions, including d3-force layout engine.
The source code including other pages in this web site can be found [here](${pathToGithubRepo}).
`,
  },
};

export default contents;
