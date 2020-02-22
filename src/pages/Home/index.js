import React, { Component } from "react";
import { View, Text, StyleSheet, ActivityIndicator, ToastAndroid } from "react-native";
import { sia } from "@services";
import { Image, Icon } from 'react-native-elements'
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { Creators as SpaceActions } from "@store/ducks/space";
import { Creators as ConfigActions, Types } from "@store/ducks/config";
import Geolocation from '@react-native-community/geolocation';
import Equation from '@utils';
import { ModalPicker } from '@components';
import { Color, DateFns } from '@common';
import { string } from "@locales";
import SplashScreen from 'react-native-splash-screen'
import { copilot, walkthroughable, CopilotStep } from 'react-native-copilot';
import MapView from "react-native-maps";
import { AppSettings, SearchBarGooglePlace, MapSettings } from "./components";

const CopilotView = walkthroughable(View);

class Home extends Component {

    constructor(props) {
        super(props);
        this.state = {
            lat: 0,
            lon: 0,
            eto: '00',
            equation: 'Penman-Monteith',
            searching: true,
            data: null,
            appSettingsVisible: false,
            mapSettingsVisible: false,
            viewStations: false,
            mapType: 'standard',
            stations: [],
            initialRegion: {
                latitude: -3.874834,
                longitude: -32.492555,
                latitudeDelta: 0.0131,
                longitudeDelta: 0.0131
            },
            region: {
                latitude: -3.874834,
                longitude: -32.492555,
                latitudeDelta: 0.0131,
                longitudeDelta: 0.0131
            },
        };
        this._updateMyLocation();
    }

    componentDidMount() {
        const { config, noWelcome } = this.props;
        this.setState({ equation: config.defaultConfig.equation })
        SplashScreen.hide();
        if (config.welcome) {
            this.props.start();
        }
        noWelcome();
    }

    _getCurrentDate(delay) {
        return DateFns.mFormat(DateFns.mSubDays(new Date(), delay), 'yyyyMMdd');
    }

    _getETo() {
        const { config } = this.props;
        const { distance, service, type, equation } = config.defaultConfig;
        const { lat, lon } = this.state;
        const { addSpace, changeHistoric } = this.props;
        const currentDate = this._getCurrentDate(0);
        this.setState({ searching: true });
        sia.eto(
            lat,
            lon,
            currentDate,
            currentDate,
            distance,
            service,
            type,
            equation
        ).then((resposta) => {

            this.setState({ data: resposta.features })
            this._calculateETo(equation);

            const { service, type } = resposta.features;
            const data = resposta.features.data[0];
            const parameters = resposta.features.parameters;
            const space = {
                service,
                type,
                date: new Date().toISOString(),
                ...parameters,
                ...{
                    ...data,
                    Eto: this.state.eto
                },
            }
            addSpace(space);
            changeHistoric(true);
            this.setState({ searching: false });

            ToastAndroid.showWithGravityAndOffset(
                string('HOME_toast_completed_result'),
                ToastAndroid.SHORT,
                ToastAndroid.BOTTOM,
                0,
                150,
            );

        });

    }

    _calculateETo(equation) {
        const elmsl = this.state.data.parameters.location.elevation;
        const { Rad_Q0, Rad_Qg, Hum, Tmax, Tmin, Wind } = this.state.data.data[0];
        const [Calculate, equationName] = Equation(equation.toLowerCase());

        const result = Calculate(Rad_Qg, Rad_Q0, Hum, Tmax, Tmin, Wind, elmsl);
        this.setState({ eto: result, equation: equation });
    }

    _changeEquation(value) {
        this.setState({ equation: value })
        this._calculateETo(value);
    }

    _updateMyLocation() {
        Geolocation.getCurrentPosition(
            position => {
                const region = {
                    latitude: position.coords.latitude,
                    longitude: position.coords.longitude,
                    latitudeDelta: 0.0131,
                    longitudeDelta: 0.0131
                }
                this.setState({
                    lat: position.coords.latitude,
                    lon: position.coords.longitude,
                    region: region
                });
                this._getETo();
            },
            error => {

            },
            { enableHighAccuracy: true, timeout: 30000, maximumAge: 1000 }
        );
    }

    _handleAppSettingsPressed() {
        this.setState({ appSettingsVisible: true });
    }

    _handleMapSettingsPressed() {
        this.setState({ mapSettingsVisible: true });
    }

    _handleSearchPlace(value) {
        const { lat, lng } = value;
        const region = {
            ...this.state.region,
            latitude: lat,
            longitude: lng,
            latitudeDelta: 0.0541,
            longitudeDelta: 0.0541
        }
        this.setState({ lat: lat, lon: lng, region: region });
        this._getETo();
    }

    async _handleOnPressMap(value) {
        await this.setState({ lat: value.coordinate.latitude, lon: value.coordinate.longitude });
        this._getETo();
        this._getNearbyStations();
    }

    _handleAppSettingClosed() {
        this.setState({ appSettingsVisible: false });
    }

    _handleAppSettingSaved() {
        this.setState({ appSettingsVisible: false });
        this._getETo();
        this._getNearbyStations();
    }

    async _handleStationPinButton() {
        if (this.state.viewStations === true) {
            this.setState({
                viewStations: false,
                mapSettingsVisible: false,
                stations: []
            });
        } else {
            await this.setState({
                viewStations: true,
                mapSettingsVisible: false
            });
            await this._getNearbyStations();
            this.setState({
                region: {
                    ...this.state.region,
                    latitudeDelta: 5.0131,
                    longitudeDelta: 5.0131
                }
            })

        }

    }

    _getNearbyStations() {
        if (this.state.viewStations === true) {
            const { distance } = this.props.config.defaultConfig;
            sia.station(
                this.state.lat,
                this.state.lon,
                distance
            ).then((resposta) => {
                this.setState({ stations: resposta })
                if (resposta.length === 0) {
                    ToastAndroid.showWithGravityAndOffset(
                        `${string('HOME_toast_empty_stations_left')} ${distance} ${string('HOME_toast_empty_stations_right')}`,
                        ToastAndroid.SHORT,
                        ToastAndroid.BOTTOM,
                        0,
                        150,
                    );
                }
            });
        }

    }

    render() {
        return (
            <View style={{ flex: 1 }}>

                <View style={{ flex: 1 }}>
                    <View >
                        <View style={styles.container}>
                            <MapSettings
                                visible={this.state.mapSettingsVisible}
                                onMapTypeSelecting={(value) => this.setState({ mapType: value })}
                                onPressViewStations={() => this._handleStationPinButton()}
                                onMapSettingsClosed={() => this.setState({ mapSettingsVisible: false })}
                            />

                            <MapView
                                style={styles.mapView}
                                initialRegion={this.state.initialRegion}
                                region={this.state.region}
                                onRegionChangeComplete={(value) => this.setState({ region: value })}
                                onPress={() => this.setState({ mapSettingsVisible: true })}
                                onLongPress={(e) => this._handleOnPressMap(e.nativeEvent)}
                                mapType={this.state.mapType}
                                rotateEnabled={false}
                                showBuildings={false}
                                showsTraffic={false}
                            >
                                <MapView.Marker
                                    title={"Região"}
                                    description={`${this.state.lat}, ${this.state.lon}`}
                                    coordinate={{ latitude: this.state.lat, longitude: this.state.lon }}
                                />
                                {this.state.stations.map((item) => {
                                    return (
                                        <MapView.Marker
                                            title={
                                                `${string('HOME_station_marker_title_station')} ${item.station_cod}: ${item.city}-${item.state}`}
                                            description={
                                                `${string('HOME_station_marker_description_distance')} ${item.distance.toFixed(2)} Km`}
                                            coordinate={{
                                                latitude: item.location[0],
                                                longitude: item.location[1]
                                            }}
                                        >
                                            <Image
                                                source={require('../../assets/stationIcon4.png')}
                                                style={{ height: 40, width: 28 }}
                                            />
                                        </MapView.Marker>
                                    )
                                })}
                            </MapView>
                            <CopilotStep text={string('HOME_copilot_init')} order={1} name="init">
                                <CopilotView style={[styles.header, { height: '40%' }]}>

                                    <View style={{ flex: 1 }}>
                                        <AppSettings
                                            visible={this.state.appSettingsVisible}
                                            onClosed={() => this._handleAppSettingClosed()}
                                            onSavedSettings={() => this._handleAppSettingSaved()}
                                        />

                                        <CopilotStep text={string('HOME_copilot_search')} order={2} name="search">
                                            <CopilotView>
                                                <SearchBarGooglePlace
                                                    placeholder={string('HOME_search_description')}
                                                    onSearchPlace={(value) => this._handleSearchPlace(value)}
                                                />
                                            </CopilotView>
                                        </CopilotStep>

                                        <CopilotStep text={string('HOME_copilot_result')} order={3} name="result">
                                            <CopilotView style={{ flex: .5, flexDirection: 'row', justifyContent: 'center', alignItems: 'center', paddingVertical: 10, backgroundColor: 'rgba(255, 255, 255, 1)' }}>
                                                {
                                                    this.state.searching ?
                                                        <ActivityIndicator size="large" color={Color.home.activity_indicator} />
                                                        :
                                                        <Text style={{ fontSize: 30 }}> {parseFloat(this.state.eto).toFixed(2)} mm </Text>
                                                }
                                            </CopilotView>
                                        </CopilotStep>

                                        <View style={{ flex: .5, flexDirection: 'row', justifyContent: 'space-around', alignItems: 'center', marginVertical: 10 }}>
                                            <CopilotStep text={string('HOME_copilot_settings')} order={4} name="settings">
                                                <CopilotView>
                                                    <Icon
                                                        raised
                                                        name='settings-outline'
                                                        type='material-community'
                                                        color={Color.home.buttons_display}
                                                        size={15}
                                                        containerStyle={{ borderWidth: 1, borderRadius: 50, backgroundColor: '#1114', borderColor: '#1111' }}
                                                        underlayColor={Color.home.buttons_display_ground}
                                                        onPress={() => this._handleAppSettingsPressed()} />
                                                </CopilotView>
                                            </CopilotStep>

                                            <CopilotStep text={string('HOME_copilot_myLocations')} order={5} name="myLocations">
                                                <CopilotView>
                                                    <Icon
                                                        raised
                                                        name='map-marker-radius'
                                                        type='material-community'
                                                        color={Color.home.buttons_display}
                                                        size={15}
                                                        containerStyle={{ wborderWidth: 1, borderRadius: 50, backgroundColor: '#1114', borderColor: '#1111' }}
                                                        underlayColor={Color.home.buttons_display_ground}
                                                        onPress={() => this._updateMyLocation()} />
                                                </CopilotView>
                                            </CopilotStep>

                                            <CopilotStep text={string('HOME_copilot_mapType')} order={6} name="mapType">
                                                <CopilotView>
                                                    <Icon
                                                        raised
                                                        name='map-outline'
                                                        type='material-community'
                                                        color={Color.home.buttons_display}
                                                        size={15}
                                                        containerStyle={{ borderWidth: 1, borderRadius: 50, backgroundColor: '#1114', borderColor: '#1111' }}
                                                        underlayColor={Color.home.buttons_display_ground}
                                                        onPress={() => this._handleMapSettingsPressed()} />
                                                </CopilotView>
                                            </CopilotStep>

                                            <CopilotStep text={string('HOME_copilot_equation')} order={7} name="equation">
                                                <CopilotView>
                                                    <ModalPicker
                                                        data={['Penman-Monteith', 'Hargreaves-Samani']}
                                                        selected={this.state.equation}
                                                        onPress={(value) => this._changeEquation(value)}
                                                        icon={
                                                            <Icon
                                                                raised
                                                                name='function'
                                                                type='material-community'
                                                                color={Color.home.buttons_display}
                                                                size={15}
                                                                containerStyle={{ borderWidth: 1, borderRadius: 50, backgroundColor: '#1114', borderColor: '#1111' }}
                                                            />
                                                        }
                                                    />
                                                </CopilotView>
                                            </CopilotStep>
                                        </View>
                                    </View>
                                </CopilotView>
                            </CopilotStep>
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
)(copilot({
    overlay: 'svg',
    animated: true,
    verticalOffset: 25,
    labels: {
        previous: string('HOME_copilot_previous'),
        next: string('HOME_copilot_next'),
        skip: string('HOME_copilot_skip'),
        finish: string('HOME_copilot_finish'),
    }
})(Home));

const styles = StyleSheet.create({
    container: {
        justifyContent: 'flex-end',
        alignContent: 'space-between',
    },
    header: {
        flex: 1,
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        zIndex: 0,
    },
    mapView: {
        height: '100%',
        left: 0,
        right: 0,
        top: 50,
        bottom: 0,

    },
});
