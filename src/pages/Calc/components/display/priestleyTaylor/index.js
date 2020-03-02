import React, { PureComponent } from "react";
import { View, StyleSheet } from "react-native";
import { Input, Button } from 'react-native-elements'
import Equation from '@utils';
import { string } from "@locales";
import { Color } from "@common";

class PriestleyTaylor extends PureComponent {

    constructor(props) {
        super(props);
        this.state = {
            qo: 0,
            qg: 0,
            rhmean: 0,
            tmax: 0,
            tmin: 0,
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
        const { qo, qg, rhmean, tmax, tmin, elmsl } = this.state;
        const [Calculate, equationName] = Equation(this.props.equation);
        const result = Calculate({ qg, qo, rhmean, tmax, tmin, elmsl });

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
                    />
                    <Input
                        ref={ref => this.textInput[1] = ref}
                        onSubmitEditing={() => this.focusNextTextInput(2)}
                        returnKeyType={"next"}
                        blurOnSubmit={false}
                        label={string('CALC_qg')}
                        placeholder='28 MJ m/d'
                        keyboardType='numeric'
                        placeholderTextColor={Color.calc.placeholder}
                        leftIcon={{ type: 'font-awesome', size: 10, name: 'chevron-right', color: Color.calc.icon_form }}
                        onChangeText={text => this.setState({ qg: parseFloat(text) })}
                    />
                    <Input
                        ref={ref => this.textInput[2] = ref}
                        onSubmitEditing={() => this.focusNextTextInput(3)}
                        returnKeyType={"next"}
                        blurOnSubmit={false}
                        label={string('CALC_umi')}
                        placeholder='83 %'
                        keyboardType='numeric'
                        placeholderTextColor={Color.calc.placeholder}
                        leftIcon={{ type: 'font-awesome', size: 10, name: 'chevron-right', color: Color.calc.icon_form }}
                        onChangeText={text => this.setState({ rhmean: parseFloat(text) })}
                    />
                    <Input
                        ref={ref => this.textInput[3] = ref}
                        onSubmitEditing={() => this.focusNextTextInput(4)}
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
                        ref={ref => this.textInput[4] = ref}
                        onSubmitEditing={() => this.focusNextTextInput(5)}
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
                        ref={ref => this.textInput[5] = ref}
                        onSubmitEditing={() => this._onPressCalculate()}
                        returnKeyType={"done"}
                        blurOnSubmit={false}
                        label={string('CALC_elevation')}
                        placeholder='434 m'
                        keyboardType='numeric'
                        placeholderTextColor={Color.calc.placeholder}
                        leftIcon={{ type: 'font-awesome', size: 10, name: 'chevron-right', color: Color.calc.icon_form }}
                        onChangeText={text => this.setState({ elmsl: parseFloat(text) })}
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

export default PriestleyTaylor;

const styles = StyleSheet.create({

})