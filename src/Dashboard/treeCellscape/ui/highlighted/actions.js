import types from "./types.js";

/**
 * Highlight given cell index/indices
 * @param {int || array} index
 */
export const highlightElement = ({ index, range, element }) => ({
  type: types.highlightElement,
  index,
  range,
  element
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
