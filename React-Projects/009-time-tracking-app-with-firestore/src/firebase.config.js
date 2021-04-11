import firebase from 'firebase/app';
import 'firebase/firestore';

const firebaseConfig = {
	apiKey: "AIzaSyDmjFiC7mcOKSCIU9WXdcV7ccSV8MMeHDw",
	authDomain: "time-tracking-d7ed4.firebaseapp.com",
	databaseURL: "https://time-tracking-d7ed4-default-rtdb.firebaseio.com",
	projectId: "time-tracking-d7ed4",
	storageBucket: "time-tracking-d7ed4.appspot.com",
	messagingSenderId: "1088893142607",
	appId: "1:1088893142607:web:638cc2e5cbf1ee53cbcc3a",
	measurementId: "G-LXP99HDDGX"
};

firebase.initializeApp(firebaseConfig);
const db = firebase.firestore();

export default db;


































