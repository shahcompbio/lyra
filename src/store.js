import { createStore, applyMiddleware, combineReducers } from "redux";
import createSagaMiddleware from "redux-saga";
import { rootSaga } from "./state/sagas/index.js";

import { combineReducers } from "redux";
import data from "./data/reducer.js";
import ui from "./treeCellscape/ui/reducer.js";

import { all, fork } from "redux-saga/effects";
import dataSagas from "./data/sagas.js";
import uiSagas from "./treeCellscape/ui/sagas.js";

const reducer = combineReducers({
  data,
  ui
});

function* rootSaga() {
  yield all([fork(dataSagas), fork(uiSagas)]);
}

const sagaMiddleware = createSagaMiddleware();
const store = createStore(reducer, applyMiddleware(sagaMiddleware));
sagaMiddleware.run(rootSaga);

export default store;
