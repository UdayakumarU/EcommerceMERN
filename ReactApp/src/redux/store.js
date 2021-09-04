import { createStore, applyMiddleware, persistStore, logger } from "../library";
import rootReducer from './root.reducer';

const store = createStore(rootReducer, applyMiddleware(logger));
const persistor = persistStore(store);

export {store, persistor};