import React, { Component } from "react";
import { View, Text, StyleSheet, SafeAreaView, ScrollView, Picker } from "react-native";
import DisplayCalc from "./components/display";


class Calc extends Component {

    constructor(props) {
        super(props);
        this.state = {
            eto: false,
            equation: 'penman-monteith'
        };
        this.Display = DisplayCalc('penman-monteith');
    }

    componentDidMount() {
    }

    _onChangeEquation(value) {
        this.setState({ equation: value });
        this.Display = DisplayCalc(value);
    }

    render() {
        const Display = this.Display;
        return (
            <View style={{ flex: 1 }}>
                <View style={styles.header}>
                    <View style={{ flex: .8, paddingBottom: 20, flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }}>

                        <Text style={{ fontSize: 30 }}> {this.state.eto ? parseFloat(this.state.eto).toFixed(2) + ' mm' : '...'} </Text>

                    </View>
                    <View style={{ flex: .2, justifyContent: 'center', alignItems: 'center', paddingVertical: 6 }}>
                        <Picker
                            selectedValue={this.state.equation}
                            style={{ height: 20, width: '59%', borderWidth: 4, borderBottomColor: '#000' }}
                            mode={'dropdown'}
                            onValueChange={(itemValue, itemIndex) => this._onChangeEquation(itemValue)}
                        >
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
            </View >
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
        height: 90,
        paddingTop: 20,
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
        flex: 1,
        paddingTop: 30,
        paddingBottom: 20,
        paddingHorizontal: 5,
        backgroundColor: '#fff',
    }

});
