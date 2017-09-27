import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './view/App';
import { Provider } from 'react-redux'
import { createStore, applyMiddleware } from 'redux'
import reducer from './state/reducers/index.js'
import registerServiceWorker from './registerServiceWorker';
//import thunk from 'redux-thunk'
import createSagaMiddleware from 'redux-saga'
import { rootSaga } from './state/sagas/index.js'


const sagaMiddleware = createSagaMiddleware()
const store = createStore(
  reducer,
  //applyMiddleware(thunk)
  applyMiddleware(sagaMiddleware)
)

sagaMiddleware.run(rootSaga)

ReactDOM.render(
	<Provider store={store}>
		<App />
	</Provider>, 
	document.getElementById('root'));
registerServiceWorker();
