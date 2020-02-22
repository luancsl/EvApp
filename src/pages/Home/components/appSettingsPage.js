import React, { PureComponent } from "react";
import { View, Text, Slider, Picker } from "react-native";
import { Button } from 'react-native-elements'
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { Creators as ConfigActions } from "@store/ducks/config";
import { material, systemWeights } from 'react-native-typography';
import { Modal } from '@components';
import { string } from "@locales";
import { Color } from "@common";

class AppSettingsPage extends PureComponent {
    constructor(props) {
        super(props);
        this.state = {
            defaultConfig: {
                distance: null,
                service: null,
                type: null,
                equation: null,

            },
            modal: false,
            equation: 'Penman-Monteith',

        }
    }

    componentDidMount() {
        const { config } = this.props;
        this.setState({ ...this.state, defaultConfig: config.defaultConfig, equation: config.defaultConfig.equation });

    }

    _handleClosed() {
        const { onClosed } = this.props;
        onClosed();
    }

    async _setDefaultConfig() {
        const { changeDefaultConfig, onClosed, onSavedSettings } = this.props;
        onClosed();
        await changeDefaultConfig(this.state.defaultConfig);
        onSavedSettings();

    }

    render() {
        this.setState({ modal: this.props.visible });
        return (
            <Modal
                height='60%'
                width='90%'
                visible={this.state.modal}
                transparent={true}
                animationType="fade"
                hardwareAccelerated={true}
                backgroundColor='#0001'
                onRequestClose={() => this._handleClosed()}
                pressOut={() => this._handleClosed()}
            >
                <View style={{ flex: 1 }}>
                    <View style={{ flex: .9, paddingHorizontal: 20, paddingTop: 20 }}>
                        <View style={{ flex: .2, marginBottom: 20 }}>
                            <View style={{ flexDirection: 'row', justifyContent: 'flex-start', alignItems: 'center', marginBottom: 5 }}>
                                <Text style={[material.subheading, systemWeights.bold, { color: '#606060' }]}>{string('HOME_settings_select_distance')}: </Text>
                                <Text>{this.state.defaultConfig.distance} Km</Text>
                            </View>
                            <Slider
                                maximumValue={200}
                                minimumValue={1}
                                value={this.state.defaultConfig.distance}
                                step={2}
                                onValueChange={(value) => this.setState({
                                    ...this.state,
                                    defaultConfig: {
                                        ...this.state.defaultConfig,
                                        distance: parseFloat(value)
                                    }
                                })}
                            />
                        </View>
                        <View style={{ flex: .2, marginBottom: 20 }}>
                            <Text style={[material.subheading, systemWeights.bold, { color: '#606060' }]}>{string('HOME_settings_select_equation')}: </Text>
                            <Picker
                                style={{ height: 30 }}
                                selectedValue={this.state.defaultConfig.equation}
                                onValueChange={(itemValue, itemIndex) => this.setState({
                                    ...this.state,
                                    defaultConfig: {
                                        ...this.state.defaultConfig,
                                        equation: itemValue
                                    }
                                })}>
                                {
                                    [
                                        'Penman-Monteith',
                                        'Hargreaves-Samani'
                                    ].map((item) => (
                                        <Picker.Item label={item} value={item} />
                                    ))
                                }
                            </Picker>
                        </View>
                        <View style={{ flex: .2, marginBottom: 20 }}>
                            <Text style={[material.subheading, systemWeights.bold, { color: '#606060' }]}>{string('HOME_settings_select_service')}: </Text>
                            <Picker
                                style={{ height: 30 }}
                                selectedValue={this.state.defaultConfig.service}
                                onValueChange={(itemValue, itemIndex) => this.setState({
                                    ...this.state,
                                    defaultConfig: {
                                        ...this.state.defaultConfig,
                                        service: itemValue
                                    }
                                })}>
                                {
                                    [
                                        'Inmet',
                                        'Nasa-Power'
                                    ].map((item) => (
                                        <Picker.Item label={item} value={item.toLowerCase()} />
                                    ))
                                }
                            </Picker>
                        </View>
                        <View style={{ flex: .2 }}>
                            <Text style={[material.subheading, systemWeights.bold, { color: '#606060' }]}>{string('HOME_settings_select_type')}: </Text>
                            <Picker
                                style={{ height: 30 }}
                                selectedValue={this.state.defaultConfig.type}
                                onValueChange={(itemValue, itemIndex) => this.setState({
                                    ...this.state,
                                    defaultConfig: {
                                        ...this.state.defaultConfig,
                                        type: itemValue
                                    }
                                })}>
                                {
                                    [
                                        'Station',
                                        'Satellite'
                                    ].map((item) => (
                                        <Picker.Item label={item} value={item.toLowerCase()} />
                                    ))
                                }
                            </Picker>
                        </View>
                    </View>
                    <View style={{ flex: .1, justifyContent: 'flex-end' }}>
                        <Button
                            icon={{
                                name: 'check',
                                type: 'material-community',
                                color: '#fff',
                                size: 25,
                            }}
                            title="Salvar"
                            size={50}
                            type="solid"
                            buttonStyle={{ backgroundColor: '#1114' }}
                            onPress={() => this._setDefaultConfig()} />
                    </View>
                </View>
            </Modal >
        );
    }

}

const mapStateToProps = state => ({
    spaces: state.spaceState,
    config: state.configState
});

const mapDispatchToProps = dispatch =>
    bindActionCreators(ConfigActions, dispatch);

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(AppSettingsPage);