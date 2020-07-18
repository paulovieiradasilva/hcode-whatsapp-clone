import { Model } from "./Model";
import { Firebase } from "../utils/Firebase";

export class Chat extends Model {

    constructor() {
        super();
    }

    get users() { return this._data.users; }
    set users(value) { return this._data.users = value }

    get timeStemp() { return this._data.timeStemp; }
    set timeStemp(value) { return this._data.timeStemp = value }

    static getRef() {
        Firebase.db().collection('/chats');
    }

    static create(firstEmail, secondMail) {

        return new Promise((resolve, reject) => {

            let users = {};

            users[btoa(firstEmail)] = true;
            users[btoa(secondMail)] = true;

            Chat.getRef().add({
                users,
                timeStemp: new Date()
            }).then((doc) => {

                Chat.getRef().doc(doc.id).get().then((chat) => {
                    resolve(chat);
                }).catch((error) => reject(error));

            }).catch((error) => reject(error));
        });

    }

    static find(firstEmail, secondMail) {
        return Chat.getRef()
            .where(btoa(firstEmail), '==', true) // TODO error -> Uncaught (in promise) TypeError: Cannot read property 'where' of undefined
            .where(btoa(secondMail), '==', true)
            .get();
    }

    static createIfNotExists(firstEmail, secondMail) {
        return new Promise((resolve, reject) => {

            Chat.find(firstEmail, secondMail).then((chats) => {

                if (chats.empty) {

                    Chat.create(firstEmail, secondMail).then((chat) => {
                        resolve(chat);
                    });

                } else {

                    chats.forEach((chat) => {
                        resolve(chat);
                    });

                }
            }).catch((error) => reject(error));
        });
    }
}