import { initializeApp } from 'firebase/app'
import {
  NextOrObserver,
  User,
  browserLocalPersistence,
  browserPopupRedirectResolver,
  initializeAuth,
  onAuthStateChanged as onAuthStateChangedFirebase,
  signInAnonymously as signInAnonymouslyFirebase,
} from 'firebase/auth'

let auth: ReturnType<typeof initializeAuth>

if (typeof window !== 'undefined') {
  const firebaseApp = initializeApp({
    apiKey: 'AIzaSyCiTbjP-WX1DRgeY_pomCmNjmZV5Dw3Mjg',
    authDomain: 'community-3864c.firebaseapp.com',
    projectId: 'community-3864c',
    storageBucket: 'community-3864c.appspot.com',
    messagingSenderId: '323159179896',
    appId: '1:323159179896:web:0bcc52d45b510a5a67238d',
  })
  auth = initializeAuth(firebaseApp, {
    popupRedirectResolver: browserPopupRedirectResolver,
    persistence: browserLocalPersistence,
  })
}

const getIsSignedIn = () => Boolean(auth?.currentUser)

const signOut = () => auth?.signOut()

const signInAnonymously = async () => {
  const { user } = await signInAnonymouslyFirebase(auth)

  return user
}

const onAuthStateChanged = (callback: NextOrObserver<User>) =>
  onAuthStateChangedFirebase(auth, callback)

const getCurrentUser = () => auth?.currentUser

export { getIsSignedIn, signOut, signInAnonymously, onAuthStateChanged, getCurrentUser }
