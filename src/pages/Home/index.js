import React, { Component } from "react";
import { View, Text, StyleSheet, Dimensions, TextInput, FlatList, TouchableOpacity, AsyncStorage } from "react-native";
import { sia, requestElevation } from "../../services/sia_api";
import MapView from "react-native-maps";
import { Image, Icon } from 'react-native-elements'
import Modal from 'react-native-modalbox';
import { material, systemWeights } from 'react-native-typography';
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { Creators as SpaceActions } from "../../store/ducks/space";
import { Creators as ConfigActions, Types } from "../../store/ducks/config";
import Geolocation from '@react-native-community/geolocation';
import moment from "moment";
import 'moment/min/locales';
import 'moment/locale/pt-br';
import Header from './components/header';
import Equation from '../../utils';
import SplashScreen from 'react-native-splash-screen'

class Home extends Component {

    state = {
        eto: '00',
        equation: 'penman-monteith',
        searching: true,
        mapType: 'standard',
        etc_list: [],
        data: null,
        defaultConfig: {
            distance: null,
            service: null,
            typeService: null,
            equation: null,

        },
        place: {
            id: 1,
            title: "ETo",
            description: "carregando",
            dataIncial: "20190516",
            dataFinal: "20190516",
            error: null
        },
        region: {
            latitude: 0,
            longitude: 0,
            latitudeDelta: 0.0142,
            longitudeDelta: 0.0231
        },
        initialRegion: {
            latitude: 0,
            longitude: 0,
            latitudeDelta: 0.0142,
            longitudeDelta: 0.0231
        },
        marker: {
            latitude: 0,
            longitude: 0,
            latitudeDelta: 0.0142,
            longitudeDelta: 0.0231
        },
        space: null
    };

    componentDidMount() {
        const { config } = this.props;
        this.setState({ ...this.state, defaultConfig: config.defaultConfig, equation: config.defaultConfig.equation })
        moment.locale(config.language);
        this.set_data();
        Geolocation.getCurrentPosition(
            position => {
                const region = {
                    ...this.state.region,
                    latitude: position.coords.latitude,
                    longitude: position.coords.longitude,
                };
                this.setState({
                    ...this.state,
                    region,
                    marker: region,
                });

                this.get_pet()
            },
            error => {

            },
            { enableHighAccuracy: true, timeout: 30000, maximumAge: 1000 }
        );
        SplashScreen.hide();
    }

    get_data(atraso) {
        return moment().subtract(atraso, 'days').format('YYYYMMDD');
    }

    _setMarker(lat, lon) {
        this.setState({
            ...this.state,
            marker: {
                ...this.state.marker,
                latitude: lat,
                longitude: lon
            }
        });
    }

    get_pet() {
        const { addSpace, removeSpace, spaces, config, changeHistoric } = this.props;
        const { marker, place } = this.state;
        this.setState({ searching: true });
        sia.eto(marker.latitude,
            marker.longitude,
            place.dataIncial,
            place.dataFinal,
            distance = config.defaultConfig.distance,
            service = config.defaultConfig.service,
            type = config.defaultConfig.type,
            equation = config.defaultConfig.equation

        ).then((resposta) => {

            this.setState({ data: resposta.features })

            this._calculate(config.defaultConfig.equation);

            const { service, type } = resposta.features;
            const data = resposta.features.data[0];
            const parameters = resposta.features.parameters;
            const space = {
                service,
                type,
                date: moment().format('YYYYMMDD'),
                ...parameters,
                ...{
                    ...data,
                    Eto: this.state.eto
                },
            }

            addSpace(space);

            changeHistoric(true);

            this.setState({ searching: false });

        });
        console.log("PET")

    }

    set_data() {
        const data = this.get_data(9);
        let place = this.state.place;
        place.dataIncial = data;
        place.dataFinal = data;

        this.setState({ place: place });
    }

    _calculate(equation) {
        const elmsl = this.state.data.parameters.location.elevation;
        const { Rad_Q0, Rad_Qg, Hum, Tmax, Tmin, Wind } = this.state.data.data[0];
        console.log('dados:', this.state.data.data[0]);
        const [Calculate, equationName] = Equation(equation);

        const result = Calculate(Rad_Qg, Rad_Q0, Hum, Tmax, Tmin, Wind, elmsl);
        console.log('result:', result);
        this.setState({ eto: result });
    }

    _changeEquation(value) {
        this.setState({ equation: value })

        this._calculate(value);
    }

    _regionChange = (region) => {
        this.setState({ ...this.state, region: region });
    }

    _myLocationMap() {
        Geolocation.getCurrentPosition(
            position => {
                const region = {
                    ...this.state.region,
                    latitude: position.coords.latitude,
                    longitude: position.coords.longitude,
                };
                this.setState({
                    ...this.state,
                    region,
                    marker: region,
                });

            },
            error => {

            },
            { enableHighAccuracy: true, timeout: 30000, maximumAge: 1000 }
        );
    }

    _updateDefaultConfig() {
        this.get_pet();
    }



    render() {

        const { config, changeTypeMap } = this.props;

        return (
            <View style={{ flex: 1 }}>
                <Modal style={styles.modal4} position={"bottom"} ref={"modal4"} coverScreen={true}>
                    <View style={{ flex: 1, flexDirection: 'row', justifyContent: 'space-evenly', alignItems: 'center' }}>

                        <TouchableOpacity onPress={() => { this.setState({ mapType: 'standard' }); changeTypeMap(0, 1, 1) }}>
                            <Image
                                source={require('../../assets/normal.png')}
                                containerStyle={{ borderRadius: 10, overflow: 'hidden', opacity: 0.3 ** config.map.standard }}
                                style={{ width: 80, height: 90 }}
                            />
                        </TouchableOpacity>
                        <TouchableOpacity onPress={() => (changeTypeMap(0, 0, 1))}>
                            <Image
                                source={require('../../assets/pointer.png')}
                                containerStyle={{ borderRadius: 10, overflow: 'hidden', opacity: 0.3 ** config.map.stations }}
                                style={{ width: 80, height: 90 }}
                            />
                        </TouchableOpacity>
                        <TouchableOpacity onPress={() => { this.setState({ mapType: 'satellite' }); changeTypeMap(1, 1, 0) }}>
                            <Image
                                source={require('../../assets/terrestre.jpg')}
                                containerStyle={{ borderRadius: 10, overflow: 'hidden', opacity: 0.3 ** config.map.satellite }}
                                style={{ width: 80, height: 90 }}
                            />
                        </TouchableOpacity>


                    </View>
                </Modal>
                <View style={{ flex: 1 }}>
                    <View >
                        <View style={styles.container}>
                            <MapView
                                ref={map => (this.mapView = map)}
                                initialRegion={this.state.initialRegion}
                                region={this.state.region}
                                onRegionChangeComplete={(region) => { this._regionChange(region) }}
                                onPress={() => {
                                    this.refs.modal4.open();
                                }}
                                onLongPress={e => {
                                    let event = e.nativeEvent;

                                    this._setMarker(
                                        event.coordinate.latitude,
                                        event.coordinate.longitude
                                    );
                                    this.get_pet();
                                }}
                                mapType={this.state.mapType}
                                style={styles.mapView}
                                rotateEnabled={false}
                                scrollEnabled={true}
                                zoomEnabled={true}
                                showsPointsOfInterest={false}
                                showBuildings={false}
                                showsUserLocation={true}
                                followsUserLocation={true}
                                showsPointsOfInterest={true}
                                showsCompass={true}
                            >
                                {
                                    <MapView.Marker
                                        ref={mark => (this.state.place.mark = mark)}
                                        title={"Região"}
                                        description={`${this.state.marker.latitude},${
                                            this.state.marker.longitude
                                            }`}
                                        key={this.state.place.id}
                                        coordinate={{
                                            latitude: this.state.marker.latitude,
                                            longitude: this.state.marker.longitude
                                        }}
                                    />
                                }

                            </MapView>

                            <Header
                                eto={this.state.eto}
                                equation={this.state.equation}
                                searching={this.state.searching}
                                onPressLocation={() => this._myLocationMap()}
                                onPressMap={() => this.refs.modal4.open()}
                                onChangeEquation={(value) => this._changeEquation(value)}
                                onChangeDefaultConfig={() => this._updateDefaultConfig()} />
                        </View>
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
    bindActionCreators({ ...ConfigActions, ...SpaceActions }, dispatch);

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Home);


const styles = StyleSheet.create({

    modal4: {
        height: 150,
        borderTopStartRadius: 3,
        borderTopEndRadius: 3
    },
    calloutView: {
        flexDirection: "row",
        backgroundColor: "rgba(255, 255, 255, 0.9)",
        borderRadius: 10,
        width: "40%",
        marginLeft: "30%",
        marginRight: "30%",
        marginTop: 20
    },
    calloutSearch: {
        borderColor: "transparent",
        marginLeft: 10,
        width: "90%",
        marginRight: 10,
        height: 40,
        borderWidth: 0.0
    },
    container: {
        justifyContent: 'flex-end',
        alignContent: 'space-between',
    },

    mapView: {
        height: '100%',
        left: 0,
        right: 0,
        top: 0,
        bottom: 0,

    },

    placesContainer: {
        width: "100%",
        maxHeight: 200
    },

    place: {
        height: 150,
        backgroundColor: "#FFF",
        borderTopLeftRadius: 5,
        borderTopRightRadius: 5,
        padding: 12,
        borderWidth: 1.5,
        borderColor: '#0003',
    },

    title: {
        fontWeight: "bold",
        fontSize: 12,
        backgroundColor: "transparent"
    },

    description: {
        color: "#999",
        fontSize: 12,
        marginTop: 5
    }
});
