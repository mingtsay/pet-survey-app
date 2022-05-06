import { detect } from 'detect-browser'
import publicIp from 'public-ip'
import { initializeApp } from 'firebase/app'
import {
  getFirestore,
  collection,
  addDoc,
  serverTimestamp,
} from 'firebase/firestore'

// TODO: FirebaseUI
// import * as firebaseui from 'firebaseui'

const firebaseConfig = {
  apiKey: 'AIzaSyB7H_S-kyAXYsPq87fxvVzAeqgT5AdCBtM',
  authDomain: 'pet-survey-app.firebaseapp.com',
  projectId: 'pet-survey-app',
  storageBucket: 'pet-survey-app.appspot.com',
  messagingSenderId: '6609428721',
  appId: '1:6609428721:web:c47729b06189a632354950',
}

const app = initializeApp(firebaseConfig)
const db = getFirestore(app)
const browser = (({ type, name, version, os }) => ({
  type,
  name,
  version,
  os,
}))(detect())

const ip = {}
new Promise(async resolve => {
  ip.v4 = await publicIp.v4()
  ip.v6 = await publicIp.v6()
  resolve()
})

const firebase = {
  submitSurvey: surveyValue =>
    addDoc(collection(db, 'survey'), {
      timestamp: serverTimestamp(),
      ip,
      browser,
      surveyValue,
    }),
  startFirebaseUI: domSelector => {
    // TODO: FirebaseUI
    // const ui = new firebaseui.auth.AuthUI(auth)
    // ui.start(domSelector, {
    //   signInSuccessUrl: '/dashboard',
    //   signInOptions: [app.auth.GoogleAuthProvider.PROVIDER_ID],
    //   tosUrl: '/',
    // })
  },
}

export default firebase
