import { detect } from 'detect-browser'
import publicIp from 'public-ip'
import {
  addDoc,
  collection,
  getDocs,
  getFirestore,
  serverTimestamp,
} from 'firebase/firestore'

import firebaseApp from '../firebaseApp'

const db = getFirestore(firebaseApp)

const collectionName = 'survey'

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

const SurveyService = {
  submit: async surveyValue =>
    addDoc(collection(db, collectionName), {
      timestamp: serverTimestamp(),
      ip,
      browser,
      surveyValue,
    }),
  list: async () => {
    const list = []
    const snapshot = await getDocs(collection(db, collectionName))
    snapshot.forEach(doc => list.push({ id: doc.id, data: doc.data() }))
    return list
  },
  get: async id => ({}),
}

export default SurveyService
