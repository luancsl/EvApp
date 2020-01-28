import React, { PureComponent } from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { Input, Button } from 'react-native-elements'
import Equation from '@utils';

class PenmanMonteith extends PureComponent {

    constructor(props) {
        super(props);
        this.state = {
            qo: 234,
            qg: 33,
            rhmean: 33,
            tmax: 222,
            tmin: 22,
            u2: 33,
            elmsl: 11
        };
    }

    componentDidMount() {

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
                        label='Radiação global(Qo)'
                        placeholder='Qo'
                        keyboardType='numeric'
                        leftIcon={{ type: 'font-awesome', size: 10, name: 'chevron-left' }}
                        onChangeText={text => this.setState({ qo: parseFloat(text) })}
                    />
                    <Input
                        label='Radicação superficie(Qg)'
                        placeholder='Qg'
                        keyboardType='numeric'
                        leftIcon={{ type: 'font-awesome', size: 10, name: 'chevron-left' }}
                        onChangeText={text => this.setState({ qg: parseFloat(text) })}
                    />
                    <Input
                        label='Umidade'
                        placeholder='RHmean'
                        keyboardType='numeric'
                        leftIcon={{ type: 'font-awesome', size: 10, name: 'chevron-left' }}
                        onChangeText={text => this.setState({ rhmean: parseFloat(text) })}
                    />
                    <Input
                        label='Temperatura maxima'
                        placeholder='Tmax'
                        keyboardType='numeric'
                        leftIcon={{ type: 'font-awesome', size: 10, name: 'chevron-left' }}
                        onChangeText={text => this.setState({ tmax: parseFloat(text) })}
                    />
                    <Input
                        label='Temperatura minima'
                        placeholder='Tmin'
                        keyboardType='numeric'
                        leftIcon={{ type: 'font-awesome', size: 10, name: 'chevron-left' }}
                        onChangeText={text => this.setState({ tmin: parseFloat(text) })}
                    />
                    <Input
                        label='Velocidade do vento'
                        placeholder='U2'
                        keyboardType='numeric'
                        leftIcon={{ type: 'font-awesome', size: 10, name: 'chevron-left' }}
                        onChangeText={text => this.setState({ u2: parseFloat(text) })}
                    />
                    <Input
                        label='Elevação'
                        placeholder='ELmsl'
                        keyboardType='numeric'
                        leftIcon={{ type: 'font-awesome', size: 10, name: 'chevron-left' }}
                        onChangeText={text => this.setState({ elmsl: parseFloat(text) })}
                    />

                </View>
                <View style={{ flex: 1, flexDirection: 'row', justifyContent: 'space-around', alignItems: 'center', margin: 20 }}>

                    <Button
                        icon={{
                            name: 'check-circle',
                            type: 'material-community',
                            color: '#090',
                            size: 25,
                        }}
                        title="Calcular"
                        color='#090'
                        size={50}
                        type="solid"
                        buttonStyle={{ backgroundColor: '#000' }}
                        onPress={() => this._onPressCalculate()} />

                </View>
            </View>
        );
    }
}

export default PenmanMonteith;

const styles = StyleSheet.create({

})