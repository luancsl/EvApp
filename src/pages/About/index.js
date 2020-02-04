import React, { Component } from "react";
import { View, Text, StyleSheet, TextInput, FlatList, TouchableOpacity } from "react-native";
import Modal from 'react-native-modalbox';
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { Creators as SpaceActions } from "../../store/ducks/space";
import { Image, Button, Input, Icon, SearchBar } from 'react-native-elements'

class About extends Component {

    state = {

    };

    componentDidMount() {
    }

    render() {

        return (
            <View>
            </View>
        );
    }

}

const mapStateToProps = state => ({
    spaces: state.spaceState
});
const mapDispatchToProps = dispatch =>
    bindActionCreators(SpaceActions, dispatch);

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(About);

const styles = StyleSheet.create({
    modal: {
        justifyContent: 'center',
        alignItems: 'center'
    },
    modal3: {
        height: 300,
        width: 300
    },
    modal4: {
        height: 150
    }
});
