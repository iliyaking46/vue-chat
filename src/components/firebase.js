import firebase from "firebase/app";
import "firebase/firestore";

const config = {
    apiKey: "AIzaSyB1Yawu-rdguhoTONnL3nSzKLgNAl0Dtak",
    authDomain: "vue-chat-54fec.firebaseapp.com",
    databaseURL: "https://vue-chat-54fec.firebaseio.com",
    projectId: "vue-chat-54fec",
    storageBucket: "vue-chat-54fec.appspot.com",
    messagingSenderId: "788843237988"
};
firebase.initializeApp(config);
const  db = firebase.firestore();
db.settings({
    timestampsInSnapshots: true
});

export default db;
