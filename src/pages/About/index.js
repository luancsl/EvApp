import React, { Component } from "react";
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Linking } from "react-native";
import { material, systemWeights } from 'react-native-typography';
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { Creators as SpaceActions } from "../../store/ducks/space";
import { Image, Divider } from 'react-native-elements'
import { string } from "@locales";

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
                        {string('ABOUT_description')}
                    </Text>
                </View>
                <View style={styles.body}>
                    <ScrollView showsVerticalScrollIndicator={false}>
                        <View style={{ padding: 5 }} >
                            <Text>Luan Carlos Soares Lins</Text>
                            <View style={{ marginLeft: 5 }}>
                                <Text style={material.caption}>{string('ABOUT_member01_level')}</Text>
                                <Text style={material.caption}>luancsl95@gmail.com</Text>
                                <Text style={material.caption}>{string('ABOUT_member01_function')}</Text>
                            </View>
                        </View>

                        <Divider style={{ backgroundColor: '#0004' }} />

                        <TouchableOpacity style={{ padding: 5 }} onPress={() => (Linking.openURL('http://lattes.cnpq.br/2498961747789618'))}>
                            <Text>Jean Carlos Teixeira de Araujo</Text>
                            <View style={{ marginLeft: 5 }}>
                                <Text style={material.caption}>{string('ABOUT_member02_level')}</Text>
                                <Text style={material.caption}>teixeirajean1@gmail.com</Text>
                                <Text style={material.caption}>{string('ABOUT_member02_function')}</Text>
                            </View>
                        </TouchableOpacity>

                        <Divider style={{ backgroundColor: '#0004' }} />

                        <TouchableOpacity style={{ padding: 5 }} onPress={() => (Linking.openURL('http://lattes.cnpq.br/3010818143250408'))}>
                            <Text>José Romualdo de Sousa Lima</Text>
                            <View style={{ marginLeft: 5 }}>
                                <Text style={material.caption}>{string('ABOUT_member03_level')}</Text>
                                <Text style={material.caption}>romualdo.lima@ufrpe.br</Text>
                                <Text style={material.caption}>{string('ABOUT_member03_function')}</Text>
                            </View>
                        </TouchableOpacity>

                        <Divider style={{ backgroundColor: '#0004' }} />
                    </ScrollView>
                </View>
                <View style={styles.footer}>
                    <View style={styles.footerimages}>
                        <Image
                            source={require('@assets/unamelogo2.png')}
                            containerStyle={{ width: 51, height: 69, borderRadius: 2, overflow: 'hidden' }}
                        />
                        <Image
                            source={require('@assets/uaglogo.png')}
                            containerStyle={{ width: 51, height: 70, marginHorizontal: 20, borderRadius: 2, overflow: 'hidden' }}
                        />
                        <Image
                            source={require('@assets/ufrpelogo.png')}
                            containerStyle={{ width: 45, height: 70, borderRadius: 2, overflow: 'hidden' }}
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
        backgroundColor: '#FFF'
    },
    header: {
        height: 185,
        overflow: 'hidden',
        paddingHorizontal: 7,
        paddingVertical: 2,
    },
    body: {
        flex: .7,
        overflow: 'hidden',
        paddingHorizontal: 7,
        paddingVertical: 2,
    },
    footer: {
        flex: .3,
        padding: 5,
        justifyContent: 'flex-end',
        alignItems: 'center',
        alignContent: 'center',
        overflow: 'hidden',
        backgroundColor: '#F8F8F8'
    },
    footerdescription: {
        flex: 1,
        padding: 5
    },
    footerimages: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        alignContent: 'space-around',
        overflow: 'hidden',
    }
});
