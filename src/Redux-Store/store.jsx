import { configureStore } from '@reduxjs/toolkit';
import loggedUserReducer from './slices/loggedUserSlice.jsx';
import { persistStore, persistReducer,FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER } from 'redux-persist';
import storageSession from 'redux-persist/lib/storage/session';


// Persist config
const persistConfig = {
    key: 'root',
    storage: storageSession,
};

// Persisted reducer
const persistedReducer = persistReducer(persistConfig, loggedUserReducer);

const store = configureStore({
    reducer: {
        // loggedUser : loggedUserReducer,                 without redux-persist 
        loggedUser: persistedReducer,                     // when using redux persist for persisting state of store reducers (loggedUserReducer) on browser refresh
    },
    middleware: (getDefaultMiddleware) =>       // this middleware added just to remove warning that redux toolkit give due to non serializable values in action or states by redux-persist
        getDefaultMiddleware({
            serializableCheck: {
                ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
            },
        }),
})

// Persistor
const persistor = persistStore(store);

export { store, persistor };


