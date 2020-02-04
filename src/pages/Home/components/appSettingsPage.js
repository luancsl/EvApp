import React, { PureComponent } from "react";
import { View, Text, StyleSheet, TouchableOpacity, ActivityIndicator, Slider, Picker } from "react-native";
import { Image, Button, Input, Icon, SearchBar } from 'react-native-elements'
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { Creators as ConfigActions, Types } from "@store/ducks/config";
import { ModalPicker, Modal } from '@components';

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
            equation: 'penman-monteith',

        }
    }

    componentDidMount() {
        const { config } = this.props;
        this.setState({ ...this.state, defaultConfig: config.defaultConfig, equation: config.defaultConfig.equation });

    }

    _setDefaultConfig() {
        const { changeDefaultConfig, onClosed } = this.props;
        changeDefaultConfig(this.state.defaultConfig);
        this.setState({ modal: false });
        onClosed();


    }

    render() {
        this.setState({ modal: this.props.visible });
        return (
            <Modal
                height='70%'
                width='95%'
                visible={this.state.modal}
                transparent={true}
                animationType="fade"
                hardwareAccelerated={true}
                backgroundColor='#0001'
                pressOut={() => this._setDefaultConfig()}
            >
                <View style={{ flex: 1, padding: 10, paddingTop: 20 }}>
                    <View style={{ flex: .2 }}>
                        <Text>Distancia das Estações   {this.state.defaultConfig.distance}</Text>
                        <Slider
                            maximumValue={100}
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
                    <View style={{ flex: .2 }}>
                        <Text style={{ textAlignVertical: 'center' }}>Equação: </Text>
                        <Picker
                            selectedValue={this.state.defaultConfig.equation}
                            style={{ height: 50, width: 250 }}
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
                                    <Picker.Item label={item} value={item.toLowerCase()} />
                                ))
                            }
                        </Picker>
                    </View>
                    <View style={{ flex: .2 }}>
                        <Text style={{ textAlignVertical: 'center' }}>Serviço: </Text>
                        <Picker
                            selectedValue={this.state.defaultConfig.service}
                            style={{ height: 50, width: 250 }}
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
                        <Text style={{ textAlignVertical: 'center' }}>Tipo: </Text>
                        <Picker
                            selectedValue={this.state.defaultConfig.type}
                            style={{ height: 50, width: 250 }}
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
                    <View style={{ flex: .2, marginVertical: 10 }}>
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
            </Modal>
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