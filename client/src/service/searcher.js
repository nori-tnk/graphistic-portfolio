/**
 * Provides matched list of nodes based on input
 */
export default class SearchService {
  constructor(graphManager) {
    this.graphManager = graphManager;
  }

  search(input, searchSet) {
    this.input = input;

    let matchedNodes = [];
    if (input.length > 0) {
      let regex;
      try {
        regex = new RegExp(`${input}`, "gi");
      } catch (e) {
        regex = /.*/gi;
      }
      matchedNodes = (
        searchSet || this.graphManager.nodeBeansManager.NODE_BEANS
      ).filter((nodeBean) => {
        return Object.values(nodeBean).some((v) => {
          if (v === nodeBean.id) return false;
          return regex.test(v.toString());
        });
      });
    }

    // Measure for an edge case: tippy and highlight will remain if the cursor is kept on the match list and match result be empty
    if (matchedNodes.length === 0) {
      this.graphManager.viewStateManager.clearAllTippies();
    }

    this.matchedNodes = matchedNodes;
    return this;
  }

  sort() {
    const input = this.input;

    return this.matchedNodes.sort((a, b) => {
      try {
        const aIndex = a.name.toUpperCase().indexOf(input.toUpperCase());
        const bIndex = b.name.toUpperCase().indexOf(input.toUpperCase());
        if (bIndex < 0 && 0 <= aIndex) return -1;
        if (aIndex < 0 && 0 <= bIndex) return +1;
        return aIndex - bIndex;
      } catch (e) {
        console.error(
          `Seems a match result datum ${a} or ${b} failed to have string name prop`
        );
        return 0;
      }
    });
  }
}
