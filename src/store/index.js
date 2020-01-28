import { createStore, applyMiddleware } from 'redux';
import { Reducers } from './ducks';
import Reactotron from "../../ReactotronConfig";
import { persistStore, persistReducer } from 'redux-persist';
import { AsyncStorage } from "react-native";
import { composeWithDevTools } from 'remote-redux-devtools';

const persistConfig = {
    key: 'root',
    storage: AsyncStorage,

}

/* blacklist: ['configState', 'spaceState'] */
const persistedReducer = persistReducer(persistConfig, Reducers)

const store = createStore(persistedReducer, composeWithDevTools(
    Reactotron.createEnhancer(),
));

const persistor = persistStore(store);

export { store, persistor };
