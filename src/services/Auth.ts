import {
  signInWithEmailAndPassword,
  getAuth,
  createUserWithEmailAndPassword,
  sendPasswordResetEmail,
  signInAnonymously,
} from 'firebase/auth';
import firebase_app from '../infra/Firebase';
import Toast from './Toast';
import { setCache } from './Cache';
import { verifyErrors } from './FirebaseErrors';

const auth = getAuth(firebase_app);

async function signIn(email: string, password: string) {
  let result = null,
    error = null;
  try {
    result = await signInWithEmailAndPassword(auth, email, password);
    Toast().success('Bem Vindo!');
  } catch (e: any) {
    Toast().error(verifyErrors(e.code));
    error = e;
  }

  if (result?.user) {
    setCache('user', result.user.uid);
  }

  return { result, error };
}

async function signInAnon() {
  let result,
    error = null;
  try {
    result = await signInAnonymously(auth);
  } catch (e) {
    error = e;
  }

  if (result?.user) {
    setCache('user', result.user.uid);
  }

  return { result, error };
}

async function signUp(
  email: string,
  password: string,
  confirmPassword: string
) {
  let result,
    error = null;
  if (password !== confirmPassword) {
    Toast().error('Senhas não conferem');
    return;
  }
  try {
    result = await createUserWithEmailAndPassword(auth, email, password);
  } catch (e) {
    error = e;
  }

  if (result?.user) {
    setCache('user', result.user.uid);
  }

  return { result, error };
}

async function signOut() {
  let result,
    error = null;
  try {
    result = await auth.signOut();
    localStorage.clear();
  } catch (e) {
    error = e;
  }

  setCache('user');

  return { result, error };
}

async function forgotPassword(email: string) {
  let result,
    error = null;
  try {
    result = await sendPasswordResetEmail(auth, email);
  } catch (e) {
    error = e;
  }

  return { result, error };
}

export default function Authentication() {
  return {
    auth,
    signIn,
    signInAnon,
    signUp,
    signOut,
    forgotPassword,
  };
}
