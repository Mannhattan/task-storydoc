import { configureStore } from '@reduxjs/toolkit';
import { boardSlice } from './slices';
import { persistStore, persistReducer } from 'redux-persist'
import storage from 'redux-persist/lib/storage'

const persistConfig = {
    key: 'root',
    storage,
}

export const store = configureStore({
    reducer: {
        board: persistReducer(persistConfig, boardSlice.reducer),
    }
});

export const persistor = persistStore(store)

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;