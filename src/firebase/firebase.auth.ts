import { getAuth, GoogleAuthProvider } from 'firebase/auth';
import { app } from './firebase.config';

// Global {auth, googleAuthProvider} constants, import to other components when doing authy stuff there, do not create new constants.
export const auth = getAuth(app);
export const googleAuthProvider = new GoogleAuthProvider();
