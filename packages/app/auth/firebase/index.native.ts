import auth, { FirebaseAuthTypes } from '@react-native-firebase/auth'

const getIsSignedIn = () => Boolean(auth().currentUser)

const signOut = () => auth().signOut()

const signInAnonymously = async () => {
  const { user } = await auth().signInAnonymously()

  return user
}

const onAuthStateChanged = (
  callback:
    | FirebaseAuthTypes.AuthListenerCallback
    | { next: FirebaseAuthTypes.AuthListenerCallback }
) => auth().onAuthStateChanged(callback)

const getCurrentUser = () => auth().currentUser

export { getIsSignedIn, signOut, signInAnonymously, onAuthStateChanged, getCurrentUser }
