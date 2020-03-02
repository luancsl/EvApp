import React, { Component } from "react";
import { View, Text, StyleSheet, FlatList } from "react-native";
import { ListItem } from 'react-native-elements'
import { Modal } from '@components';
import { DateFns, ConvDecSeparator } from "@common";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { Creators as SpaceActions } from "@store/ducks/space";
import { material, systemWeights } from 'react-native-typography';
import { string } from "@locales";

class History extends Component {

    constructor(props) {
        super(props);
        this.state = {
            select: null,
            modal: false,

        };
    }


    componentDidMount() {

    }

    _onPressItem(item) {
        this.setState({ select: item, modal: true });
    }

    render() {
        const { spaces } = this.props;

        const selectItem = this.state.select;

        return (
            <View style={{ flex: 1, backgroundColor: '#F8F8F8' }}>
                <Modal
                    height={'70%'}
                    width={'90%'}
                    visible={this.state.modal}
                    transparent={true}
                    animationType="fade"
                    hardwareAccelerated={true}
                    backgroundColor='#0005'
                    onRequestClose={() => this.setState({ modal: false })}
                    pressOut={() => this.setState({ modal: false })}
                >
                    {
                        selectItem ?
                            <View style={{ flex: 1, padding: 10 }}>
                                <View style={{ flex: .1, padding: 4, marginVertical: 10, justifyContent: 'center' }}>

                                    <Text style={material.display1}>ETo: {ConvDecSeparator(selectItem.Eto)} mm/d</Text>

                                </View>
                                <View style={{ flex: .4, padding: 4, justifyContent: 'space-around', backgroundColor: '#0001' }}>

                                    <Text style={[material.body1, systemWeights.light]}>Lat: {selectItem.location.lat.toFixed(6)}  Lon: {selectItem.location.lon.toFixed(6)}</Text>
                                    {
                                        selectItem.city ?
                                            <Text style={[material.body1, systemWeights.light]}>Local: {selectItem.city}-{selectItem.state}, {selectItem.country}</Text>
                                            :
                                            null
                                    }
                                    <Text style={[material.body1, systemWeights.light]}>{string('HISTORIC_service')}: {selectItem.service}, {selectItem.type}</Text>
                                    <Text style={[material.body1, systemWeights.light]}>{string('HISTORIC_calculation')}: {selectItem.calculationType}</Text>
                                    <Text style={[material.body1, systemWeights.light]}>{string('HISTORIC_equation')}: {selectItem.equation}</Text>

                                </View>
                                <View style={{ flex: .4, justifyContent: 'space-around', padding: 4, marginVertical: 10, backgroundColor: '#1111' }}>

                                    <Text style={[systemWeights.light, { color: '#808080' }]}>{string('HISTORIC_qo')}: {selectItem.Rad_Q0} MJ m/d</Text>
                                    <Text style={[systemWeights.light, { color: '#808080' }]}>{string('HISTORIC_qg')}: {selectItem.Rad_Qg} MJ m/d</Text>
                                    <Text style={[systemWeights.light, { color: '#808080' }]}>{string('HISTORIC_umi')}: {selectItem.Hum}%</Text>
                                    <Text style={[systemWeights.light, { color: '#808080' }]}>{string('HISTORIC_tmax')}: {selectItem.Tmax} °C</Text>
                                    <Text style={[systemWeights.light, { color: '#808080' }]}>{string('HISTORIC_tmin')}: {selectItem.Tmin} °C</Text>
                                    <Text style={[systemWeights.light, { color: '#808080' }]}>{string('HISTORIC_wind')}: {selectItem.Wind} m/s</Text>
                                    <Text style={[systemWeights.light, { color: '#808080' }]}>{string('HISTORIC_elevation')}: {selectItem.location.elevation} m</Text>

                                </View>
                                <View style={{ flex: .1, padding: 5 }}>
                                    {
                                        selectItem.distance ?
                                            <Text style={[material.caption, systemWeights.regular, { fontStyle: 'italic' }]}> {selectItem.distance} m {string('HISTORIC_distance')}</Text>
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
                            title={`ETo: ${ConvDecSeparator(item.Eto)} mm/d `}
                            subtitle={DateFns.mFormatRelative(item.date)}
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
