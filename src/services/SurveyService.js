import { detect } from 'detect-browser'
import publicIp from 'public-ip'
import {
  addDoc,
  collection,
  getDocs,
  getFirestore,
  onSnapshot,
  serverTimestamp,
} from 'firebase/firestore'

import firebaseApp from '../firebaseApp'
import { useEffect, useState } from 'react'

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

export const useSurveyService = () => {
  const [list, setList] = useState({})

  useEffect(() => {
    const unSubscribeSnapshot = onSnapshot(
      collection(db, collectionName),
      snapshot =>
        snapshot.forEach(doc => setList(l => ({ ...l, [doc.id]: doc.data() })))
    )

    return () => unSubscribeSnapshot()
  }, [])

  return list
}

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
  count: async () => {
    const snapshot = await getDocs(collection(db, collectionName))
    return snapshot.size
  },
  get: async id => ({}),
}

export default SurveyService
