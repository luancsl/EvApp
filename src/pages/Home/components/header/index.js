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


class HeaderComponent extends PureComponent {

    constructor(props) {
        super(props);
        this.state = {
            data: this.props.data,
            search: '',
            modal: false,
            equation: 'penman-monteith',
            defaultConfig: {
                distance: null,
                service: null,
                type: null,
                equation: null,

            },
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

    _setDefaultConfig() {
        const { changeDefaultConfig } = this.props;
        changeDefaultConfig(this.state.defaultConfig);
        this.props.onChangeDefaultConfig();
        this.setState({ modal: false });

    }

    render() {
        const { config } = this.props;

        return (
            <View style={[styles.header, { height: '40%' }]}>
                <View style={{ flex: 1 }}>

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


                    <View style={{ borderRadius: 2, overflow: 'hidden' }}>
                        <SearchBar
                            platform='android'
                            placeholder="Pesquisar"
                            onChangeText={(value) => (this.setState({ search: value }))}
                            value={this.state.search}
                        />
                    </View>

                    <View style={{ flex: .5, flexDirection: 'row', justifyContent: 'center', alignItems: 'center', paddingVertical: 10, backgroundColor: 'rgba(255, 255, 255, 1)' }}>
                        {
                            this.props.searching ?
                                <ActivityIndicator size="large" color="#0000ff" />
                                :
                                <Text style={{ fontSize: 30 }}> {parseFloat(this.props.eto).toFixed(3)} mm </Text>
                        }
                    </View>

                    <View style={{ flex: .5, flexDirection: 'row', justifyContent: 'space-around', alignItems: 'center', marginVertical: 10 }}>
                        <Icon
                            raised
                            name='settings-outline'
                            type='material-community'
                            color='#f50'
                            size={15}
                            containerStyle={{ borderWidth: 1, borderRadius: 50, backgroundColor: '#1114', borderColor: '#1111' }}
                            underlayColor='#c0c0c0'
                            onPress={() => this.setState({ modal: true })} />
                        <Icon
                            raised
                            name='map-marker-radius'
                            type='material-community'
                            color='#f50'
                            size={15}
                            containerStyle={{ wborderWidth: 1, borderRadius: 50, backgroundColor: '#1114', borderColor: '#1111' }}
                            onPress={() => this.props.onPressLocation()} />
                        <Icon
                            raised
                            name='map-outline'
                            type='material-community'
                            color='#f50'
                            size={15}
                            containerStyle={{ borderWidth: 1, borderRadius: 50, backgroundColor: '#1114', borderColor: '#1111' }}
                            onPress={() => this.props.onPressMap()} />

                        <ModalPicker
                            data={['penman-monteith', 'hargreaves-samani']}
                            selected={this.state.equation}
                            onPress={(value) => this._onPressChangeEquation(value)}
                            icon={
                                <Icon
                                    raised
                                    name='function'
                                    type='material-community'
                                    color='#f50'
                                    size={15}
                                    containerStyle={{ borderWidth: 1, borderRadius: 50, backgroundColor: '#1114', borderColor: '#1111' }}
                                />

                            }
                        />

                    </View>

                </View>
            </View>
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
)(HeaderComponent);

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