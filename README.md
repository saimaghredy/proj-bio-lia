# Bio Lia Website - Firebase Integration

## 🚀 Firebase Setup Instructions

### 1. Create Firebase Project
1. Go to [Firebase Console](https://console.firebase.google.com/)
2. Click "Create a project"
3. Enter project name: `bio-lia-website`
4. Enable Google Analytics (optional)
5. Create project

### 2. Enable Firebase Services

#### Authentication
1. Go to Authentication → Sign-in method
2. Enable **Email/Password**
3. Enable **Phone** (for OTP verification)
4. **IMPORTANT**: Configure authorized domains:
   - Go to Authentication → Settings → Authorized domains
   - Add `localhost` to the authorized domains list
   - **For Bolt.new preview**: Add the current preview domain (e.g., `*.bolt.new` or the specific subdomain you're using)
   - Add your production domain when deploying

#### Firestore Database
1. Go to Firestore Database
2. Click "Create database"
3. Start in **test mode** (rules will be updated automatically)
4. Choose location closest to your users

#### Storage
1. Go to Storage
2. Click "Get started"
3. Start in **test mode**

#### Hosting (Optional)
1. Go to Hosting
2. Click "Get started"
3. Follow setup instructions

### 3. Get Firebase Configuration
1. Go to Project Settings (gear icon)
2. Scroll down to "Your apps"
3. Click "Web app" icon
4. Register app with name: `bio-lia-website`
5. Copy the configuration object

### 4. Environment Variables
1. Create `.env` file in project root
2. Copy from `.env.example`
3. Fill in your Firebase configuration:

```env
VITE_FIREBASE_API_KEY=your_api_key_here
VITE_FIREBASE_AUTH_DOMAIN=your_project_id.firebaseapp.com
VITE_FIREBASE_PROJECT_ID=your_project_id
VITE_FIREBASE_STORAGE_BUCKET=your_project_id.appspot.com
VITE_FIREBASE_MESSAGING_SENDER_ID=your_messaging_sender_id
VITE_FIREBASE_APP_ID=your_app_id
VITE_FIREBASE_MEASUREMENT_ID=your_measurement_id
```

### 5. Install Firebase CLI (for deployment)
```bash
npm install -g firebase-tools
firebase login
firebase init
```

### 6. Deploy to Firebase Hosting
```bash
npm run build
firebase deploy
```

## 📱 Features Integrated

### ✅ Authentication
- Email/Password sign up and sign in
- Email verification
- Phone number verification with OTP
- User profile management
- Secure session management

### ✅ Database (Firestore)
- User profiles
- Product catalog
- Order management
- Weather insights history
- Contact form submissions

### ✅ Security
- Firestore security rules
- Storage security rules
- User data protection
- Admin-only operations

### ✅ Real-time Features
- Live authentication state
- Real-time order updates
- Instant data synchronization

## 🔧 Development

### Local Development
```bash
npm install
npm run dev
```

### Build for Production
```bash
npm run build
```

### Firebase Emulators (Optional)
```bash
firebase emulators:start
```

## 📊 Firebase Console Monitoring
- Authentication users
- Firestore data
- Storage files
- Hosting analytics
- Performance monitoring

## 🛡️ Security Best Practices
- Environment variables for sensitive data
- Firestore security rules
- Input validation
- Error handling
- Rate limiting (via Firebase)

## 📞 Support
For Firebase-specific issues, refer to:
- [Firebase Documentation](https://firebase.google.com/docs)
- [Firebase Console](https://console.firebase.google.com/)