const contents = {
  jumbotron: {
    heading: "Blockchain. Graph Database & Visualization.",
    catch: "Tech-driven out-of-the-box.",
  },
  greeting: {
    heading: `## Greetings! Glad you have reached my portfolio web site.`,
    body: "### Seems both you and I are lucky today!",
  },
  benefits: {
    heading: `## "What can I get from this web site?"`,
    body: (pathToGraphPage, pathToAboutPage) => `
* ### Let's find out if I can collaborate with your team. 
  In order to share my skills/experiences with you, I made [an interactive graph app](${pathToGraphPage}), 
where you can find out my experiences by traversing around, 
searching by skills, domains, etc., and can even 
download an auto-generated Markdown report, as well as an image of the graph in one-go!

* ### "Any quick self-introduction?"

  Simply put, I am basically a web developer, 
  seeking for a new position as a developer or possibly a solution architect, for as much as I can imagine right now. 
  My current main interests include *blockchain, graph database and visualization technologies*. 
  You can also check out my profile [here](${pathToAboutPage}).`,
  },
  alert: {
    heading: `## A tiny alert: <small>to save your time...</small>`,
    body: (pathToGraphPage) => `
If you do need to insist to finding someone with a plenty of experiences strictly *through a paid job*, 
I suppose you would rather like to look into some other places: 
I have to say I am still fairly new to the IT industry, although I have been continuously gaining valuable knowledge on various topics in some advanced domains. 

In case it does not sound enough for you, then I hope I will be able to collaborate with your team in the near furure! 
Still, if you are interested in [my graph app](${pathToGraphPage}) anyway, you are absolutely welcomed to poke it!`,
  },
};

export default contents;
