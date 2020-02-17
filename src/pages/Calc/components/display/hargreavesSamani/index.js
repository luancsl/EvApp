import React, { PureComponent } from "react";
import { View, StyleSheet } from "react-native";
import { Input, Button } from 'react-native-elements'
import Equation from '@utils';
import { string } from "@locales";
import { Color } from "@common";

class HargreavesSamani extends PureComponent {

    constructor(props) {
        super(props);
        this.state = {
            qo: 0,
            qg: 0,
            rhmean: 0,
            tmax: 0,
            tmin: 0,
            u2: 0,
            elmsl: 0
        };
        this.textInput = {};
    }

    componentDidMount() {

    }

    focusNextTextInput(id) {
        this.textInput[id].focus();
    }

    _onPressCalculate() {

        const { qo, qg, rhmean, tmax, tmin, u2, elmsl } = this.state;
        const [Calculate, equationName] = Equation(this.props.equation);
        const result = Calculate(qg, qo, rhmean, tmax, tmin, u2, elmsl);

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
                        label={string('CALC_qo')}
                        placeholder='35 MJ m/d'
                        keyboardType='numeric'
                        placeholderTextColor={Color.calc.placeholder}
                        leftIcon={{ type: 'font-awesome', size: 10, name: 'chevron-right', color: Color.calc.icon_form }}
                        onChangeText={text => this.setState({ qo: parseFloat(text) })}
                        value={this.state.qo}
                    />
                    <Input
                        ref={ref => this.textInput[1] = ref}
                        onSubmitEditing={() => this.focusNextTextInput(2)}
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
                        ref={ref => this.textInput[2] = ref}
                        onSubmitEditing={() => this._onPressCalculate()}
                        returnKeyType={"done"}
                        blurOnSubmit={false}
                        label={string('CALC_tmin')}
                        placeholder='9 °C'
                        keyboardType='numeric'
                        placeholderTextColor={Color.calc.placeholder}
                        leftIcon={{ type: 'font-awesome', size: 10, name: 'chevron-right', color: Color.calc.icon_form }}
                        onChangeText={text => this.setState({ tmin: parseFloat(text) })}
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

export default HargreavesSamani;

const styles = StyleSheet.create({

})