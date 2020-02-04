import React, { PureComponent } from "react";
import { View, Text, StyleSheet, TouchableOpacity, ActivityIndicator, Slider, Picker } from "react-native";
import { Image, Button, Input, Icon, SearchBar } from 'react-native-elements'
import { penmanMonteith } from '../../../../utils';
import { material, systemWeights } from 'react-native-typography';
import ModalDropdown from 'react-native-modal-dropdown';
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { Creators as SpaceActions } from "../../../../store/ducks/config";
import { Creators as ConfigActions, Types } from "../../../../store/ducks/config";
import { ModalPicker, Modal } from '@components';
import { copilot, walkthroughable, CopilotStep } from 'react-native-copilot';

const CopilotIcon = walkthroughable(Icon);

class HeaderComponent extends PureComponent {

    constructor(props) {
        super(props);
        this.state = {
            data: this.props.data,
            search: '',
            modal: false,
            equation: 'penman-monteith',
            
        };
    }

    componentDidMount() {
        const { config } = this.props;
        this.setState({ ...this.state, defaultConfig: config.defaultConfig, equation: config.defaultConfig.equation });

    }

    _onPressChangeEquation(value) {
        this.setState({ equation: value })
        const { onChangeEquation } = this.props;
        onChangeEquation(value);

    }

    render() {
        const { config } = this.props;

        return (
            
        );
    }
}

const mapStateToProps = state => ({
    spaces: state.spaceState,
    config: state.configState
});

const mapDispatchToProps = dispatch =>
    bindActionCreators(ConfigActions, dispatch);

export default copilot({
    animated: true, // Can be true or false
    overlay: 'svg', // Can be either view or svg
})(connect(
    mapStateToProps,
    mapDispatchToProps
)(HeaderComponent));

const styles = StyleSheet.create({
    modal: {
        justifyContent: 'center',
        alignItems: 'center'
    },
    modal3: {
        height: 360,
        width: 300,
        borderRadius: 3,
    },
    container: {
        flex: 1,
        paddingLeft: 3,
        paddingVertical: 8,
        marginVertical: 3,
        marginHorizontal: 4,
        borderRadius: 5,
        borderWidth: 1,
        borderColor: '#9992',
        justifyContent: 'space-between',
        flexDirection: 'row',
    },
    header: {
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        overflow: 'hidden',
    },
    list: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'space-evenly',
        alignItems: 'center',
        paddingLeft: 25,
        borderWidth: 1,
        borderColor: '#9995',
        width: 200,
        borderRadius: 16
    },
    list_text: {
        width: 200
    },
    dropdown_text: {

    },
    dropdown_dropdown: {
        width: 180,
        borderRadius: 20,
        borderWidth: 1,
        borderColor: '#9995',

    }

})