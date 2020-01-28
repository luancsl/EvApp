import React, { Component } from "react";
import { View, Text, StyleSheet, TouchableOpacity, SafeAreaView, ScrollView, Picker } from "react-native";
import { Icon } from 'react-native-elements'
import ModalDropdown from 'react-native-modal-dropdown';
import DisplayCalc from "./components/display";


class Calc extends Component {

    state = {
        eto: false,
        equation: 'penman-monteith'

    };

    componentDidMount() {
    }

    render() {

        const Display = DisplayCalc(this.state.equation)

        return (
            <View style={{ flex: 1 }}>
                <View style={styles.header}>
                    <View style={{ flex: .7, flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }}>

                        <Text style={{ fontSize: 30 }}> {this.state.eto ? parseFloat(this.state.eto).toFixed(3) + ' mm' : '...'} </Text>

                    </View>
                    <View style={{ flex: .3, flexDirection: 'row', justifyContent: 'space-around', alignItems: 'center', paddingVertical: 6 }}>
                        <Picker
                            selectedValue={this.state.equation}
                            style={{ height: 20, width: '59%', borderWidth: 4, borderBottomColor: '#000' }}
                            mode={'dropdown'}
                            onValueChange={(itemValue, itemIndex) =>
                                this.setState({ equation: itemValue })
                            }>
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
                </View>
                <SafeAreaView style={styles.display}>
                    <ScrollView showsVerticalScrollIndicator={false}>
                        <Display
                            equation={this.state.equation}
                            onCalculateValue={(value) => this.setState({ eto: value })}
                        />
                    </ScrollView>
                </SafeAreaView>
            </View>
        );
    }

}

export default Calc;

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
        flex: 0.3,
        overflow: 'hidden',
        backgroundColor: '#fff',
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

    },
    display: {
        flex: 0.7,
        paddingVertical: 15,
        paddingHorizontal: 5,
        backgroundColor: '#fff',
    }

});
