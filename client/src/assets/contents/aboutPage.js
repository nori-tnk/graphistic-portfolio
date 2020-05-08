const contents = {
  about: {
    heading: `# A few words about myself
    `,
    body: (pathToGraphPage) => `
Greetings! My name is TANAKA Noritsugu. I am a web developer with particular interests on blockchain, graph database and visualization technologies. 
My primary IT skills include, but are not limited in, Java, JavaScript and Neo4j, as well as some high-level knowledge on blockchain technologies.
I have been certified as Certified Blockchain Solution Architect and Certified Neo4j Professional Developer.

Before diving into the IT indusry, I completed a Master of Engineering program in Materials and Manufacturing Science in Graduate School of Engineering, Osaka University; 
then worked for Production Technology R&D Center of a company in the automotive industry.

Now I am looking for a new job in the IT industry, fascinated by the power of the open-source culture and the momentum towards acception/incubation of new technologies. 
Despite my last job / master's degree, I would like to look into future rather than to stick to the past, much like the development culture in Ethereum.
More on my skills/experiences in IT domain can be found on [the graph page](${pathToGraphPage}).
`,
  },
};

export default contents;
