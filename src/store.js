import { createStore, applyMiddleware } from "redux";
import createSagaMiddleware from "redux-saga";

import reducer from "./treeCellscape/reducer.js";

import { all, fork } from "redux-saga/effects";
import dataSagas from "./data/sagas.js";
import uiSagas from "./treeCellscape/ui/sagas.js";

function* rootSaga() {
  yield all([fork(dataSagas), fork(uiSagas)]);
}

const sagaMiddleware = createSagaMiddleware();
const store = createStore(reducer, applyMiddleware(sagaMiddleware));
sagaMiddleware.run(rootSaga);

export default store;
