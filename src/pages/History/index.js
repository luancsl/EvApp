import React, { Component } from "react";
import { View, Text, StyleSheet, TextInput, FlatList, TouchableOpacity } from "react-native";
import { Image, Button, Input, Icon, SearchBar, ListItem } from 'react-native-elements'
import { Modal } from '@components';
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { Creators as SpaceActions } from "../../store/ducks/space";
import { material, systemWeights } from 'react-native-typography';
import moment from "moment";
import 'moment/min/locales';
import 'moment/locale/pt-br';


class History extends Component {

    state = {
        select: null,
        modal: false,

    };

    componentDidMount() {
        const { config } = this.props;
        moment(config.language);
    }

    _onPressItem(item) {
        this.setState({ select: item, modal: true });
    }

    render() {
        const { spaces } = this.props;

        const selectItem = this.state.select;

        console.log(selectItem);

        return (
            <View style={{ flex: 1 }}>
                <Modal
                    height={370}
                    width={300}
                    visible={this.state.modal}
                    transparent={true}
                    animationType="fade"
                    hardwareAccelerated={true}
                    backgroundColor='#0005'
                    pressOut={() => this.setState({ modal: false })}
                >
                    {
                        selectItem ?
                            <View style={{ flex: 1, padding: 10 }}>
                                <View style={{ flex: .1, padding: 4, marginVertical: 10, justifyContent: 'center' }}>

                                    <Text style={material.display1}>Eto {selectItem.Eto.toFixed(3)} mm</Text>

                                </View>
                                <View style={{ flex: .4, padding: 4, backgroundColor: '#1111' }}>

                                    <Text style={[material.body1, systemWeights.light]}>Lat: {selectItem.location.lat.toFixed(6)}  Lon: {selectItem.location.lon.toFixed(6)}</Text>
                                    {
                                        selectItem.city ?
                                            <Text style={[material.body1, systemWeights.light]}>Local: {selectItem.city}-{selectItem.state}, {selectItem.country}</Text>
                                            :
                                            null
                                    }
                                    <Text style={[material.body1, systemWeights.light]}>Serviço: {selectItem.service}, {selectItem.type}</Text>
                                    <Text style={[material.body1, systemWeights.light]}>Calculo: {selectItem.calculationType}</Text>
                                    <Text style={[material.body1, systemWeights.light]}>Equação: {selectItem.equation}</Text>

                                </View>
                                <View style={{ flex: .4, padding: 4, marginVertical: 10, backgroundColor: '#1111' }}>

                                    <Text style={material.caption}>Radiação global(Qo): {selectItem.Rad_Q0}</Text>
                                    <Text style={material.caption}>Radicação superficie(Qg): {selectItem.Rad_Qg}</Text>
                                    <Text style={material.caption}>Umidade: {selectItem.Hum} </Text>
                                    <Text style={material.caption}>Temperatura maxima: {selectItem.Tmax}</Text>
                                    <Text style={material.caption}>Temperatura minima: {selectItem.Tmin}</Text>
                                    <Text style={material.caption}>Velocidade do vento: {selectItem.Wind}</Text>
                                    <Text style={material.caption}>Elevação: {selectItem.location.elevation}</Text>

                                </View>
                                <View style={{ flex: .1, padding: 5 }}>
                                    {
                                        selectItem.distance ?
                                            <Text style={[material.caption, systemWeights.regular, { fontStyle: 'italic' }]}>A {selectItem.distance} km da estação mais próxima</Text>
                                            :
                                            null
                                    }
                                </View>
                            </View>
                            :
                            null
                    }
                </Modal>
                <FlatList
                    data={spaces}
                    keyExtractor={(item, index) => index}
                    renderItem={({ item }) => (
                        <ListItem
                            key={item}
                            title={`Eto: ${item.Eto.toFixed(3)} mm `}
                            subtitle={`${moment(item.date).format('dddd, MM MMM')}`}
                            bottomDivider
                            onPress={() => this._onPressItem(item)}
                        />
                    )}
                />
            </View>
        );
    }

}

const mapStateToProps = state => ({
    spaces: state.spaceState,
    config: state.configState
});
const mapDispatchToProps = dispatch =>
    bindActionCreators(SpaceActions, dispatch);

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(History);

const styles = StyleSheet.create({

});
