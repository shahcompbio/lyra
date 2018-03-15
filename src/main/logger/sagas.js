import { take, select } from "redux-saga/effects";

function* loggerSaga() {
  while (true) {
    const action = yield take("*");
    const state = yield select();

    console.log("action", action);
    console.log("state after", state);
  }
}

export default loggerSaga;
