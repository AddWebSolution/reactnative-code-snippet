import {legacy_createStore as createStore, applyMiddleware} from 'redux';
import thunk from 'redux-thunk';
import {persistStore, persistReducer} from 'redux-persist';
import AsyncStorage from '@react-native-async-storage/async-storage';
import RootReducer from './reducers';
const persistConfig = {
  key: 'root',
  storage: AsyncStorage,
  whitelist: ['userReducer'],
};

const persistedReducer = persistReducer(persistConfig, RootReducer);
const Store = createStore(persistedReducer, applyMiddleware(thunk));
let Persistor = persistStore(Store);

export {Store, Persistor};
