import { 
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  updateProfile,
  GoogleAuthProvider,
  signInWithPopup
} from 'firebase/auth';
import { doc, setDoc, getDoc, updateDoc } from 'firebase/firestore';
import { auth, db } from '../config/firebase';

class FirebaseAuthService {
  constructor() {
    this.googleProvider = new GoogleAuthProvider();
  }

  // Google Sign-In
  async signInWithGoogle() {
    try {
      const result = await signInWithPopup(auth, this.googleProvider);
      const user = result.user;

      // Check if user document exists in Firestore
      const userDoc = await getDoc(doc(db, 'users', user.uid));
      
      if (!userDoc.exists()) {
        // Create user document if it doesn't exist
        const displayName = user.displayName || '';
        const nameParts = displayName.split(' ');
        const firstName = nameParts[0] || '';
        const lastName = nameParts.slice(1).join(' ') || '';

        await setDoc(doc(db, 'users', user.uid), {
          firstName,
          lastName,
          email: user.email,
          phone: user.phoneNumber || '',
          emailVerified: user.emailVerified,
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
          provider: 'google'
        });
      }

      // Get user data
      const userData = userDoc.exists() ? userDoc.data() : {};
      const displayName = user.displayName || '';
      const nameParts = displayName.split(' ');

      return {
        id: user.uid,
        email: user.email,
        firstName: userData.firstName || nameParts[0] || '',
        lastName: userData.lastName || nameParts.slice(1).join(' ') || '',
        phone: userData.phone || user.phoneNumber || '',
        emailVerified: user.emailVerified,
        phoneVerified: userData.phoneVerified || !!user.phoneNumber
      };
    } catch (error) {
      console.error('Google sign-in error:', error);
      throw new Error(this.getErrorMessage(error.code));
    }
  }

  // Register new user
  async register(userData) {
    try {
      const { email, password, firstName, lastName, phone } = userData;
      
      // Create user with email and password
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;

      // Update user profile
      await updateProfile(user, {
        displayName: `${firstName} ${lastName}`
      });

      // Save additional user data to Firestore
      await setDoc(doc(db, 'users', user.uid), {
        firstName,
        lastName,
        email,
        phone,
        emailVerified: false,
        phoneVerified: false,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
        provider: 'email'
      });

      return {
        id: user.uid,
        email: user.email,
        firstName,
        lastName,
        phone,
        emailVerified: user.emailVerified,
      };
    } catch (error) {
      console.error('Registration error:', error);
      throw new Error(this.getErrorMessage(error.code));
    }
  }

  // Sign in user
  async login(email, password) {
    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;

      // Get additional user data from Firestore
      const userDoc = await getDoc(doc(db, 'users', user.uid));
      const userData = userDoc.data();

      return {
        id: user.uid,
        email: user.email,
        firstName: userData?.firstName || '',
        lastName: userData?.lastName || '',
        phone: userData?.phone || '',
        emailVerified: user.emailVerified,
      };
    } catch (error) {
      console.error('Login error:', error);
      throw new Error(this.getErrorMessage(error.code));
    }
  }

  // Sign out user
  async logout() {
    try {
      await signOut(auth);
    } catch (error) {
      console.error('Logout error:', error);
      throw new Error('Failed to sign out');
    }
  }

  // Get current user data
  async getCurrentUserData() {
    try {
      const user = auth.currentUser;
      if (user) {
        const userDoc = await getDoc(doc(db, 'users', user.uid));
        const userData = userDoc.data();

        return {
          id: user.uid,
          email: user.email,
          firstName: userData?.firstName || '',
          lastName: userData?.lastName || '',
          phone: userData?.phone || '',
          emailVerified: user.emailVerified,
        };
      }
      return null;
    } catch (error) {
      console.error('Get user data error:', error);
      return null;
    }
  }

  // Helper method to get user-friendly error messages
  getErrorMessage(errorCode) {
    switch (errorCode) {
      case 'auth/user-not-found':
        return 'No user found with this email address';
      case 'auth/wrong-password':
        return 'Incorrect password';
      case 'auth/email-already-in-use':
        return 'An account with this email already exists';
      case 'auth/weak-password':
        return 'Password should be at least 6 characters';
      case 'auth/invalid-email':
        return 'Invalid email address';
      case 'auth/too-many-requests':
        return 'Too many failed attempts. Please try again later';
      case 'auth/popup-closed-by-user':
        return 'Sign-in popup was closed before completing';
      case 'auth/cancelled-popup-request':
        return 'Sign-in was cancelled';
      case 'auth/popup-blocked':
        return 'Pop-up window blocked. Please allow pop-ups for this site in your browser settings and try again.';
      default:
        return 'An error occurred. Please try again';
    }
  }
}

export default new FirebaseAuthService();