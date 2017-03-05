/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import {
    AppRegistry,
    StyleSheet,
    ActivityIndicator,
    Text,
    TextInput,
    TouchableHighlight,
    Image,
    View,
} from 'react-native';
import buffer from 'buffer';

export default class Login extends Component {
    constructor(props) {
        super(props);
        this.state = {
            showProgress: false
        }
    }
    render() {
        let errorCtrl = <View />;
        if (!this.state.success && this.state.badCredential) {
            errorCtrl = <Text style={styles.error}>
                The username and password is wrong
            </Text>
        }
        if(!this.state.success && this.state.unknownError){
            errorCtrl = <Text style={styles.error}>
                Unknown Error Found
            </Text>
        }
        if(this.state.success){
            errorCtrl = <Text style={styles.error}>
                Success
            </Text>
        }
        return (
            <View style={styles.container}>
                <Image style={styles.imageSize} source={require('./img/Octocat.png')}/>
                <Text style={styles.heading}>GitHub Browser</Text>
                <TextInput
                    onChangeText={(text)=> this.setState({username: text})}
                    style={styles.input}
                    placeholder="Github Username"
                />
                <TextInput
                    onChangeText={(text)=> this.setState({password: text})}
                    style={styles.input}
                    secureTextEntry={true}
                    placeholder="Github Password"
                />
                <TouchableHighlight
                    onPress={this.onLoginPressed.bind(this)}
                    style={styles.button}
                >
                    <Text style={styles.buttonText}>Login</Text>
                </TouchableHighlight>
                { errorCtrl }
                <ActivityIndicator
                    animating={this.state.showProgress}
                    size="large"
                    style={styles.loader}
                />
            </View>
        );
    }

    onLoginPressed() {
        this.setState({ showProgress: true });

        let b = buffer.Buffer(this.state.username + ':' + this.state.password);
        const encodedAuth = b.toString('base64');

        fetch('https://api.github.com/user', {
            headers: {
                'Authorization': 'Basic ' + encodedAuth
            }
        })
        .then((response) => {
            if (response.status >= 200 && response.status <= 300) {
                return response;
            }
            throw {
                badCredential: response.status == 401,
                unknownError: response.status != 401,
            }
        })
        .then((response) => {
            return response.json();
        })
        .then((results) => {
            console.log(results);
            this.setState({ showProgress: false })
            this.setState({ success: true })
        })
        .catch((err) => {
            this.setState(err)
        })
        .finally(() => {
            this.setState({ showProgress: false })
        })
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingTop: 40,
        alignItems: 'center',
        padding: 10
    },
    imageSize: {
        width: 60,
        height: 60,
    },
    heading: {
        color: '#000',
        fontSize: 28
    },
    input: {
        height: 50,
        padding: 5,
        marginTop: 10,
        borderWidth: 1,
        borderColor: '#48bbec',
    },
    button: {
        height: 50,
        backgroundColor: '#48bbec',
        alignSelf: 'stretch',
        marginTop: 10,
        justifyContent: 'center',
        alignItems: 'center',
    },
    buttonText: {
        color: 'white',
        fontSize: 22
    },
    loader: {
        marginTop: 20
    },
    error: {
        color: 'red',
        paddingTop: 10
    }
});