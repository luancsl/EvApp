import React, { Component } from "react";
import { View, TouchableOpacity } from "react-native";
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';
import { Icon, SearchBar } from 'react-native-elements'
import { Modal } from '@components';
import { string } from "@locales";

class SearchBarGooglePlace extends Component {
    constructor(props) {
        super(props);
        this.state = {
            modal: false,
            text: '',
        }
    }

    componentDidMount() {

    }

    _setDefaultConfig() {
        this.setState({ modal: false });

    }

    _showModal() {
        this.setState({ modal: true })
    }

    _hideModal() {
        this.setState({ modal: false })
    }

    _handleRef(ref) {
        if (ref) {
            this.searchPlace = ref
            this.searchPlace.triggerFocus();
        }
    }

    _handleReturn(value) {
        this.setState({ text: value, modal: false })
    }

    clear() {
        this.setState({ text: '' });
    }

    render() {
        return (
            <View>
                <TouchableOpacity
                    activeOpacity={0.98}
                    onPress={() => this._showModal()}
                >
                    <SearchBar
                        editable={false}
                        placeholder={string('HOME_search_description')}
                        onFocus={() => this._showModal()}
                        value={this.state.text}
                        searchIcon={{
                            color: '#5d5d5d',
                            size: 26
                        }}
                        containerStyle={{
                            backgroundColor: '#FFFF',
                            padding: 0,
                            borderTopWidth: 0,
                            borderBottomWidth: 0,
                        }}
                        inputContainerStyle={{
                            backgroundColor: '#FFFF',
                            borderWidth: 0,
                        }}
                        inputStyle={{
                            marginLeft: 10,
                            marginRight: 0,
                            color: '#5d5d5d',
                            fontSize: 19,
                            borderWidth: 0,
                            zIndex: 0
                        }}
                    />
                </TouchableOpacity>

                <Modal
                    height='100%'
                    width='100%'
                    style={{ borderRadius: 0, overflow: 'visible' }}
                    visible={this.state.modal}
                    transparent={true}
                    animationType="fade"
                    hardwareAccelerated={true}
                    onRequestClose={() => this._hideModal()}
                    backgroundColor='#0001'
                    pressOut={() => this._setDefaultConfig()}
                >

                    < GooglePlacesAutocomplete
                        ref={ref => this._handleRef(ref)}
                        placeholder={this.props.placeholder}
                        minLength={2}
                        getDefaultValue={() => this.state.text}
                        returnKeyType={'default'}
                        fetchDetails={true}
                        query={{
                            key: 'AIzaSyA4qk-2c3Maa4iVFa3in9yg7MK5LBV5pfE',
                            language: 'pt',
                        }}
                        onPress={(data, details = null) => {
                            this.props.onSearchPlace(details.geometry.location);
                            this._handleReturn(data.description);
                        }}

                        GooglePlacesDetailsQuery={{ fields: 'geometry' }}

                        currentLocationLabel="Current location"
                        nearbyPlacesAPI='GooglePlacesSearch'
                        predefinedPlacesAlwaysVisible={true}
                        renderDescription={row => row.description}
                        listViewDisplayed='auto'
                        renderLeftButton={() => (
                            <Icon
                                containerStyle={{
                                    height: 40,
                                    justifyContent: 'center',
                                }}
                                iconStyle={{
                                    borderWidth: 0
                                }}
                                name='arrow-back'
                                type='material'
                                color='#5d5d5d'
                                size={26}
                                onPress={() => this._hideModal()} />
                        )}

                        renderRightButton={() => (
                            <Icon
                                containerStyle={{
                                    height: 40,
                                    justifyContent: 'center',
                                    marginRight: 5,
                                }}
                                iconStyle={{
                                    borderWidth: 0
                                }}
                                name='close-circle'
                                type='material-community'
                                color='#5d5d5d'
                                size={26}
                                onPress={() => this.searchPlace.clearText()} />
                        )}


                        styles={{
                            listView: {
                                zIndex: 5,

                            },
                            description: {
                                backgroundColor: '#FFFF',
                                fontSize: 16,
                            },
                            row: {
                            },
                            textInputContainer: {
                                padding: 4,
                                backgroundColor: 'rgba(255,255,255)',
                                borderWidth: 0,
                                borderTopWidth: 0,
                                borderBottomWidth: 0,
                            },
                            textInput: {
                                height: 40,
                                color: '#5d5d5d',
                                fontSize: 19,
                                borderWidth: 0,
                                marginTop: 0,
                            },
                            predefinedPlacesDescription: {
                                color: '#1faadb'
                            },
                        }}
                    />
                </Modal>
            </View>
        );
    }
}

export default SearchBarGooglePlace;