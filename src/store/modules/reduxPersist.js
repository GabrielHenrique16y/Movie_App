import storage from 'redux-persist/lib/storage';
import { persistReducer } from 'redux-persist';

export default (reducers) => {
    const persistedReducers = persistReducer(
        {
            key: 'Movie-App',
            storage,
            whitelist: ['Auth'],
        },
        reducers,
    );

    return persistedReducers;
};
