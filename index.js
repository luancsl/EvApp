import React from 'react';
import { AppRegistry } from 'react-native';
import App from './src';
import { name as appName } from './app.json';
import { Provider } from 'react-redux';
import { store, persistor } from './src/store';
import { PersistGate } from 'redux-persist/integration/react';


if (__DEV__) {
    require('react-devtools');
    import('./ReactotronConfig').then(() => console.log('Reactotron Configured'));
}

const RNRedux = () => {
    return (
        <Provider store={store}>
            <PersistGate loading={null} persistor={persistor}>
                <App />
            </PersistGate>
        </Provider>
    )
};

AppRegistry.registerComponent(appName, () => RNRedux);
