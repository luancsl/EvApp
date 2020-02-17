import React, { PureComponent } from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { Image } from 'react-native-elements'
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { Creators as ConfigActions } from "@store/ducks/config";
import { material, systemWeights } from 'react-native-typography';
import Modal from 'react-native-modalbox';
import { string } from "@locales";

class MapSettingsPage extends PureComponent {
    constructor(props) {
        super(props);
        this.state = {
            typeMapStation: 1
        }
    }

    _changeTypeMapStation() {
        if (this.state.typeMapStation === 1) {
            this.setState({ typeMapStation: 0 });
        } else {
            this.setState({ typeMapStation: 1 });
        }
    }

    render() {
        const { config, changeTypeMap } = this.props;

        return (
            <Modal
                style={styles.modal4}
                position={"bottom"}
                isOpen={this.props.visible}
                onClosed={() => this.props.onMapSettingsClosed()}
                coverScreen={true}
                backButtonClose={true}
            >
                <View style={{ flex: 1, flexDirection: 'row', justifyContent: 'space-evenly', alignItems: 'center' }}>
                    <TouchableOpacity onPress={() => { this.props.onMapTypeSelecting('standard'); changeTypeMap(0, 1, 1) }}>
                        <Text style={[material.subheading, systemWeights.semibold, { color: '#696969' }]}>{string('HOME_maptype_hybrid')}</Text>
                        <Image
                            source={require('../../../assets/normal.png')}
                            containerStyle={{ borderRadius: 9, overflow: 'hidden', opacity: 0.3 ** config.map.standard }}
                            style={{ width: 80, height: 90 }}
                        />
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => { this.props.onPressViewStations(); this._changeTypeMapStation() }} >
                        <Text style={[material.subheading, systemWeights.semibold, { color: '#696969' }]}>{string('HOME_maptype_stations')}</Text>
                        <Image
                            source={require('../../../assets/pointer.png')}
                            containerStyle={{ borderRadius: 9, overflow: 'hidden', opacity: 0.3 ** this.state.typeMapStation }}
                            style={{ width: 80, height: 90 }}
                        />
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => { this.props.onMapTypeSelecting('satellite'); changeTypeMap(1, 1, 0) }}>
                        <Text style={[material.subheading, systemWeights.semibold, { color: '#696969' }]}>{string('HOME_maptype_land')}</Text>
                        <Image
                            source={require('../../../assets/terrestre.jpg')}
                            containerStyle={{ borderRadius: 9, overflow: 'hidden', opacity: 0.3 ** config.map.satellite }}
                            style={{ width: 80, height: 90 }}
                        />
                    </TouchableOpacity>

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
)(MapSettingsPage);

const styles = StyleSheet.create({
    modal4: {
        height: 126,
        borderTopStartRadius: 6,
        borderTopEndRadius: 6
    },
});