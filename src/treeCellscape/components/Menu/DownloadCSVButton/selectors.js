import { makeGetMissingIDMappings, makeGetIDsByIndices } from "../selectors.js";

export { getCurrTreeIndices } from "../selectors.js";

export const getMissingIDMappings = makeGetMissingIDMappings();
export const getIDsByIndices = makeGetIDsByIndices();
