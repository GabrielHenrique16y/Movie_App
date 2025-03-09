import { persistStore } from 'redux-persist';
import { legacy_createStore as createStore, applyMiddleware } from 'redux';
import createSagaMiddleware from 'redux-saga';

import persistConfig from './modules/reduxPersist';
import rootReducer from './modules/rootReducer';
import rootSaga from './modules/rootSaga';

const SagaMiddleware = createSagaMiddleware();

const store = createStore(
    persistConfig(rootReducer),
    applyMiddleware(SagaMiddleware),
);

SagaMiddleware.run(rootSaga);

export const persistor = persistStore(store);
export default store;
