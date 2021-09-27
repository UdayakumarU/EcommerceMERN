import { createStore, applyMiddleware, persistStore, logger } from "../library";
import rootReducer from './root.reducer';

const middleware = [];
if(process.env.NODE_ENV !== 'production'){
    middleware.push(logger);
}
const store = createStore(rootReducer, applyMiddleware(...middleware));
const persistor = persistStore(store);

export {store, persistor};