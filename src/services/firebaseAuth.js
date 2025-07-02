import { 
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  updateProfile,
  sendEmailVerification,
  RecaptchaVerifier,
  signInWithPhoneNumber,
  PhoneAuthProvider,
  signInWithCredential
} from 'firebase/auth';
import { doc, setDoc, getDoc, updateDoc } from 'firebase/firestore';
import { auth, db } from '../config/firebase';

class FirebaseAuthService {
  constructor() {
    this.recaptchaVerifier = null;
  }

  // Initialize reCAPTCHA for phone verification
  initializeRecaptcha(containerId = 'recaptcha-container') {
    if (!this.recaptchaVerifier) {
      this.recaptchaVerifier = new RecaptchaVerifier(auth, containerId, {
        size: 'invisible',
        callback: (response) => {
          console.log('reCAPTCHA solved');
        },
        'expired-callback': () => {
          console.log('reCAPTCHA expired');
        }
      });
    }
    return this.recaptchaVerifier;
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
        updatedAt: new Date().toISOString()
      });

      // Send email verification
      await sendEmailVerification(user);

      return {
        id: user.uid,
        email: user.email,
        firstName,
        lastName,
        phone,
        emailVerified: user.emailVerified,
        phoneVerified: false
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
        phoneVerified: userData?.phoneVerified || false
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

  // Send phone OTP
  async sendPhoneOTP(phoneNumber) {
    try {
      // Ensure phone number is in international format
      const formattedPhone = phoneNumber.startsWith('+') ? phoneNumber : `+91${phoneNumber}`;
      
      const recaptchaVerifier = this.initializeRecaptcha();
      const confirmationResult = await signInWithPhoneNumber(auth, formattedPhone, recaptchaVerifier);
      
      return confirmationResult;
    } catch (error) {
      console.error('Phone OTP error:', error);
      throw new Error('Failed to send phone OTP');
    }
  }

  // Verify phone OTP
  async verifyPhoneOTP(confirmationResult, otp) {
    try {
      const result = await confirmationResult.confirm(otp);
      const user = result.user;

      // Update phone verification status in Firestore
      await updateDoc(doc(db, 'users', user.uid), {
        phoneVerified: true,
        updatedAt: new Date().toISOString()
      });

      return { success: true, message: 'Phone verified successfully' };
    } catch (error) {
      console.error('Phone verification error:', error);
      throw new Error('Invalid OTP');
    }
  }

  // Send email verification
  async sendEmailVerification() {
    try {
      const user = auth.currentUser;
      if (user) {
        await sendEmailVerification(user);
        return { success: true, message: 'Verification email sent' };
      }
      throw new Error('No user logged in');
    } catch (error) {
      console.error('Email verification error:', error);
      throw new Error('Failed to send verification email');
    }
  }

  // Check if email is verified
  async checkEmailVerification() {
    try {
      const user = auth.currentUser;
      if (user) {
        await user.reload();
        if (user.emailVerified) {
          // Update verification status in Firestore
          await updateDoc(doc(db, 'users', user.uid), {
            emailVerified: true,
            updatedAt: new Date().toISOString()
          });
        }
        return user.emailVerified;
      }
      return false;
    } catch (error) {
      console.error('Email verification check error:', error);
      return false;
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
          phoneVerified: userData?.phoneVerified || false
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
      default:
        return 'An error occurred. Please try again';
    }
  }
}

export default new FirebaseAuthService();