import buffer from 'buffer';
let AsyncStorage = require('react-native').AsyncStorage;

class AuthService {
    login(creds, cb) {
        let b = buffer.Buffer(creds.username + ':' + creds.password);
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
                AsyncStorage.multiSet([
                    ['auth', encodedAuth],
                    ['user', JSON.stringify(results)]
                ], (err) => {
                    if (err) {
                        throw err;
                    }
                });
                return cb({ success: true })
            })
            .catch((err) => {
                return cb(err)
            })

    }
}

module.exports = new AuthService();