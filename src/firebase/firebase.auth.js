import { getAuth, GoogleAuthProvider } from 'firebase/auth';


// Global {auth, googleAuthProvider} constants, import to other components when doing authy stuff there, do not create new constants.
export const auth = getAuth();
export const googleAuthProvider = new GoogleAuthProvider();
