import { all } from 'redux-saga/effects';

import Auth from './Auth/sagas';

export default function* rootSaga() {
    return yield all([Auth]);
}
