import React, { PureComponent } from "react";
import { View, StyleSheet } from "react-native";
import { Input, Button } from 'react-native-elements'
import Equation from '@utils';
import { string } from "@locales";
import { Color } from "@common";

class Linacre extends PureComponent {

    constructor(props) {
        super(props);
        this.state = {
            tmax: 0,
            tmin: 0,
            elmsl: 0,
            lat: 0,
            dewPoint: 0
        };
        this.textInput = {};
    }

    componentDidMount() {

    }

    focusNextTextInput(id) {
        this.textInput[id].focus();
    }

    _onPressCalculate() {
        const { tmax, tmin, elmsl, lat, dewPoint } = this.state;
        const [Calculate, equationName] = Equation(this.props.equation);
        const result = Calculate({ tmax, tmin, elmsl, lat, dewPoint });

        this.props.onCalculateValue(result);
    }

    render() {
        return (
            <View style={{ flex: 1 }}>
                <View style={{ flex: 1, flexDirection: 'column', justifyContent: 'space-around' }}>
                    <Input
                        ref={ref => this.textInput[0] = ref}
                        onSubmitEditing={() => this.focusNextTextInput(1)}
                        returnKeyType={"next"}
                        blurOnSubmit={false}
                        label={string('CALC_tmax')}
                        placeholder='24 °C'
                        keyboardType='numeric'
                        placeholderTextColor={Color.calc.placeholder}
                        leftIcon={{ type: 'font-awesome', size: 10, name: 'chevron-right', color: Color.calc.icon_form }}
                        onChangeText={text => this.setState({ tmax: parseFloat(text) })}
                    />
                    <Input
                        ref={ref => this.textInput[1] = ref}
                        onSubmitEditing={() => this.focusNextTextInput(2)}
                        returnKeyType={"next"}
                        blurOnSubmit={false}
                        label={string('CALC_tmin')}
                        placeholder='9 °C'
                        keyboardType='numeric'
                        placeholderTextColor={Color.calc.placeholder}
                        leftIcon={{ type: 'font-awesome', size: 10, name: 'chevron-right', color: Color.calc.icon_form }}
                        onChangeText={text => this.setState({ tmin: parseFloat(text) })}
                    />
                    <Input
                        ref={ref => this.textInput[2] = ref}
                        onSubmitEditing={() => this.focusNextTextInput(3)}
                        returnKeyType={"done"}
                        blurOnSubmit={false}
                        label={string('CALC_elevation')}
                        placeholder='434 m'
                        keyboardType='numeric'
                        placeholderTextColor={Color.calc.placeholder}
                        leftIcon={{ type: 'font-awesome', size: 10, name: 'chevron-right', color: Color.calc.icon_form }}
                        onChangeText={text => this.setState({ elmsl: parseFloat(text) })}
                    />
                    <Input
                        ref={ref => this.textInput[3] = ref}
                        onSubmitEditing={() => this.focusNextTextInput(4)}
                        returnKeyType={"next"}
                        blurOnSubmit={false}
                        label={string('CALC_lat')}
                        placeholder='-8°'
                        keyboardType='numeric'
                        placeholderTextColor={Color.calc.placeholder}
                        leftIcon={{ type: 'font-awesome', size: 10, name: 'chevron-right', color: Color.calc.icon_form }}
                        onChangeText={text => this.setState({ lat: parseFloat(text) })}
                    />
                    <Input
                        ref={ref => this.textInput[4] = ref}
                        onSubmitEditing={() => this._onPressCalculate()}
                        returnKeyType={"next"}
                        blurOnSubmit={false}
                        label={string('CALC_dewPoint')}
                        placeholder='10 °C'
                        keyboardType='numeric'
                        placeholderTextColor={Color.calc.placeholder}
                        leftIcon={{ type: 'font-awesome', size: 10, name: 'chevron-right', color: Color.calc.icon_form }}
                        onChangeText={text => this.setState({ dewPoint: parseFloat(text) })}
                    />

                </View>
                <View style={{ flex: 1, flexDirection: 'row', justifyContent: 'space-around', alignItems: 'center', margin: 20 }}>

                    <Button
                        icon={{
                            name: 'check-circle',
                            type: 'material-community',
                            color: Color.calc.button_icon,
                            size: 25,
                        }}
                        title={string('CALC_button_calculate')}
                        size={50}
                        type="solid"
                        buttonStyle={{ backgroundColor: Color.calc.button }}
                        onPress={() => this._onPressCalculate()} />

                </View>
            </View>
        );
    }
}

export default Linacre;

const styles = StyleSheet.create({

})