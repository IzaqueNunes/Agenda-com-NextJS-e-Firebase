import { initializeApp } from 'firebase/app'
import { getDatabase, ref, set } from 'firebase/database'
import { getAuth } from 'firebase/auth'

const firebaseConfig = {
  apiKey: 'AIzaSyDeSjZW6Oq1Rh1Me04Jzpc-Sinf88BBipg',
  authDomain: 'agendaapp-98300.firebaseapp.com',
  projectId: 'agendaapp-98300',
  storageBucket: 'agendaapp-98300.appspot.com',
  messagingSenderId: '1035615029280',
  appId: '1:1035615029280:web:fb325d0d06e2c2c9c4d445'
}

const app = initializeApp(firebaseConfig)
const database = getDatabase(app)
const auth = getAuth(app)

export { auth, database, ref, set }
