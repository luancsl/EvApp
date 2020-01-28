import React from 'react';
import AppRoutes from './routes';
import { connect } from "react-redux";

const App = (props) => <AppRoutes screenProps={{ badge: props.config.searching }} />


export default connect(
    (state) => ({
        config: state.configState
    })
)(App);