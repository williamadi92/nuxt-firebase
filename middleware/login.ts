import { GoogleAuthProvider, signInWithRedirect } from '@firebase/auth'

export default defineNuxtRouteMiddleware(async (to, from) => {
  const user = await getCurrentUser()
  const auth = useFirebaseAuth()

  if (!user && auth) {
    const provider = new GoogleAuthProvider()
    return signInWithRedirect(auth, provider)
  }
})