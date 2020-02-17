import React, { PureComponent } from "react";
import AppRoutes from './routes';

class App extends PureComponent {

    constructor(props) {
        super(props);
    }

    render() {
        return (
            <AppRoutes />
        );
    }
}


export default App;