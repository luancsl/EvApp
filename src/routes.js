import React from "react";
import { createAppContainer } from 'react-navigation';
import { createDrawerNavigator } from 'react-navigation-drawer';
import { createStackNavigator } from 'react-navigation-stack';
import { createMaterialBottomTabNavigator } from 'react-navigation-material-bottom-tabs'
import { Home, History, Calc, About, DrawerComponent } from '@pages';
import { Icon, withBadge } from 'react-native-elements'
import { Creators as ConfigActions } from "@store/ducks/config";
import { Badge } from "react-native-paper";

const { changeHistoric, getHistoric } = ConfigActions;

console.log("AALDFASDF: ", ConfigActions);

const DrawerStack = createMaterialBottomTabNavigator({
    Calc: {
        screen: Calc,
        navigationOptions: {
            header: null,
            tabBarLabel: 'Calculadora',
            tabBarIcon: ({ tintColor }) => (
                <Icon
                    name='calculator-variant'
                    type='material-community'
                    color={tintColor}
                    size={25} />
            )
        }
    },
    Home: {
        screen: Home,
        navigationOptions: {
            header: null,
            tabBarLabel: 'Home',
            tabBarIcon: ({ tintColor }) => (
                <Icon name="home-outline" type='material-community' color={tintColor} size={25} />
            )
        }
    },

    History: {
        screen: History,
        navigationOptions: {
            header: null,
            tabBarLabel: 'History',
            tabBarIcon: ({ tintColor }) => {
                const BadgedIcon = withBadge(null, { hidden: getHistoric(), left: 20, top: -8 })(Icon)
                return (
                    < BadgedIcon
                        name="history"
                        type='material-community'
                        color={tintColor}
                        size={25}
                        onPress={() => changeHistoric(false)}
                    />
                );

            }
        }
    },
    About: {
        screen: About,
        navigationOptions: (props) => ({
            tabBarBadge: props.screenProps.badge,
            header: null,
            tabBarLabel: 'About',
            tabBarIcon: ({ tintColor }) => (
                <Icon
                    name='information'
                    type='material-community'
                    color={tintColor}
                    size={25} />
            )
        }),
    }
}, {
    initialRouteName: 'Home',
    barStyle: {
        height: '10%',
        padding: 0,
        backgroundColor: '#694fad'
    },
})


const MainNavigator = createDrawerNavigator(
    {
        Home: DrawerStack,
    },
    {
        initialRouteName: 'Home',
        drawerPosition: 'left',
        contentComponent: DrawerComponent,
        drawerOpenRoute: 'DrawerOpen',
        drawerCloseRoute: 'DrawerClose',
        drawerToggleRoute: 'DrawerToggle',

    });




const App = createAppContainer(MainNavigator);

export default App;