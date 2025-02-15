import { thunk } from 'redux-thunk';
import rootReducers from './rootReducers';
import { configureStore } from '@reduxjs/toolkit';


const store = configureStore({ 
    reducer: rootReducers,
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(thunk)
})

// export const useAppDispatch = store.dispatch;

export default store;
