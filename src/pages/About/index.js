import React, { Component } from "react";
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Linking } from "react-native";
import { material, systemWeights } from 'react-native-typography';
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { Creators as SpaceActions } from "../../store/ducks/space";
import { Image, Divider } from 'react-native-elements'
import { overlay } from "react-native-paper";

class About extends Component {

    state = {

    };

    componentDidMount() {
    }

    render() {
        return (
            <View style={styles.container}>
                <View style={styles.header}>
                    <Text style={[material.display1, { marginTop: 15 }]}>EvApp</Text>
                    <Text style={[material.body1, { paddingTop: 4, paddingHorizontal: 5 }]}>
                        Aplicativo desenvolvido na Universidade Federal Rural de Pernambuco,
                        Campus Garanhuns, durante um projeto de extensão.Tem como funcionalidade o calculo da evapotranspiração
                        de uma dada região, através de dados do Inmet e NASA Power.
                    </Text>
                </View>
                <View style={styles.body}>
                    <ScrollView showsVerticalScrollIndicator={false}>
                        <TouchableOpacity style={{ padding: 5 }} onPress={() => (Linking.openURL('http://lattes.cnpq.br/9321874150400095'))}>
                            <Text>Luan Lins</Text>
                            <View style={{ marginLeft: 5 }}>
                                <Text style={material.caption}>Bacharel em Ciência da Computação</Text>
                                <Text style={material.caption}>luancsl95@gmail.com</Text>
                                <Text style={material.caption}>Desenvolvedor</Text>
                            </View>
                        </TouchableOpacity>

                        <Divider style={{ backgroundColor: '#0004' }} />

                        <TouchableOpacity style={{ padding: 5 }} onPress={() => (Linking.openURL('http://lattes.cnpq.br/2498961747789618'))}>
                            <Text>Jean Teixeira</Text>
                            <View style={{ marginLeft: 5 }}>
                                <Text style={material.caption}>Doutor em Ciência da Computação</Text>
                                <Text style={material.caption}>teixeirajean1@gmail.com</Text>
                                <Text style={material.caption}>Orientador</Text>
                            </View>
                        </TouchableOpacity>

                        <Divider style={{ backgroundColor: '#0004' }} />

                        <TouchableOpacity style={{ padding: 5 }} onPress={() => (Linking.openURL('http://lattes.cnpq.br/3010818143250408'))}>
                            <Text>Romualdo Lima</Text>
                            <View style={{ marginLeft: 5 }}>
                                <Text style={material.caption}>Doutorado em Tecnologias Energéticas Nucleares</Text>
                                <Text style={material.caption}>romualdo.lima@ufrpe.br</Text>
                                <Text style={material.caption}>Orientador</Text>
                            </View>
                        </TouchableOpacity>

                        <Divider style={{ backgroundColor: '#0004' }} />
                    </ScrollView>
                </View>
                <View style={styles.footer}>
                    <View style={styles.footerimages}>
                        <Image
                            source={require('@assets/uaglogo.png')}
                            containerStyle={{ borderRadius: 10 }}
                            style={{ width: 45, height: 70 }}
                        />
                        <Image
                            source={require('@assets/ufrpelogo.png')}
                            containerStyle={{ borderRadius: 10 }}
                            style={{ width: 45, height: 70 }}
                        />
                        <Image
                            source={require('@assets/unamelogo.png')}
                            containerStyle={{ borderRadius: 10 }}
                            style={{ width: 209, height: 70 }}
                        />
                    </View>
                </View>
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
    container: {
        flex: 1,
        paddingHorizontal: 7,
        paddingVertical: 2,
        backgroundColor: '#FFF'
    },
    header: {
        flex: .4,
        overflow: 'hidden'
    },
    body: {
        flex: .4,
        overflow: 'hidden'
    },
    footer: {
        flex: .2,
        justifyContent: 'flex-end',
        alignItems: 'center',
        alignContent: 'center',
        overflow: 'hidden'
    },
    footerdescription: {
        flex: 1,
        padding: 5
    },
    footerimages: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'flex-start',
        alignItems: 'flex-end',
        alignContent: 'space-around',
        overflow: 'hidden',
    }
});
