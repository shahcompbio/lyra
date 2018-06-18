import types from "./types.js";

/**
 * Highlight given cell index/indices
 * @param {int || array} index
 */
export const highlightElement = ({ index, range, element, id }) => ({
  type: types.highlightElement,
  index,
  range,
  element,
  id
});

/**
 * Unhighlight current cell index/indices
 */
export const unhighlightElement = () => ({
  type: types.unhighlightElement
});

export const highlightChromosome = chromosome => ({
  type: types.highlightChromosome,
  chromosome
});
