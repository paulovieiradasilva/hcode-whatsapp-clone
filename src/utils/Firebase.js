const firebase = require ('firebase'); 
require('firebase/firestore');

export class Firebase {

    constructor() {

        this._config = {
            apiKey: "AIzaSyB0a9PbNE6dmCiRr9lK1OD2fZgc_LdroWM",
            authDomain: "whatsapp-clone-133d5.firebaseapp.com",
            databaseURL: "https://whatsapp-clone-133d5.firebaseio.com",
            projectId: "whatsapp-clone-133d5",
            storageBucket: "whatsapp-clone-133d5.appspot.com",
            messagingSenderId: "458953986248",
            appId: "1:458953986248:web:f75f8916b27ff3fd4595fd"
        };

        this.init();

    }

    /** */
    init() {
        if (!this._initialized) {
            // Initialize Firebase
            firebase.initializeApp(this._config);
            firebase.firestore().settings({});
            this._initialized = true;
        }
    }

    /** */
    initAuth() {
        return new Promise((resolve, reject) => {

            let provider = new firebase.auth.GoogleAuthProvider();

            firebase.auth().signInWithPopup(provider).then((result) => {
                let token = result.credential.accessToken;
                let user = result.user;

                resolve(user, token);

            }).catch((error) => {
                reject(error);
            });
        });
    }

    /** */
    static db() {
        return firebase.firestore();
    }

    /** */
    static hd() {
        return firebase.storage();
    }

}