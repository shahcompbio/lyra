import types from "./types.js";

/**
 * Highlight given cell index/indices
 * @param {int || array} index
 */
export const highlightElement = ({ index, range }) => ({
  type: types.highlightElement,
  index,
  range
});

/**
 * Unhighlight current cell index/indices
 */
export const unhighlightElement = () => ({
  type: types.unhighlightElement
});
