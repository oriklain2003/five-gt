import admin from 'firebase-admin';
import path from 'path';

let firebaseInitialized = false;

export const initializeFirebase = () => {
  if (firebaseInitialized) {
    return;
  }

  try {
    console.log('Initializing Firebase...');
    
    // Check if running in production (Render)
    if (process.env.NODE_ENV === 'production') {
      // Use environment variables in production
      const serviceAccount = {
        type: process.env.FIREBASE_TYPE || 'service_account',
        project_id: process.env.FIREBASE_PROJECT_ID,
        private_key_id: process.env.FIREBASE_PRIVATE_KEY_ID,
        private_key: process.env.FIREBASE_PRIVATE_KEY?.replace(/\\n/g, '\n'),
        client_email: process.env.FIREBASE_CLIENT_EMAIL,
        client_id: process.env.FIREBASE_CLIENT_ID,
        auth_uri: process.env.FIREBASE_AUTH_URI || 'https://accounts.google.com/o/oauth2/auth',
        token_uri: process.env.FIREBASE_TOKEN_URI || 'https://oauth2.googleapis.com/token',
        auth_provider_x509_cert_url: process.env.FIREBASE_AUTH_PROVIDER_X509_CERT_URL || 'https://www.googleapis.com/oauth2/v1/certs',
        client_x509_cert_url: process.env.FIREBASE_CLIENT_X509_CERT_URL
      };

      console.log('Using environment variables for Firebase config');
      admin.initializeApp({
        credential: admin.credential.cert(serviceAccount as admin.ServiceAccount)
      });
    } else {
      // Use local file in development
      const serviceAccountPath = path.join(__dirname, '../../firebase.json');
      console.log('Using local firebase.json file');
      admin.initializeApp({
        credential: admin.credential.cert(serviceAccountPath)
      });
    }
    
    firebaseInitialized = true;
    console.log('Firebase initialized successfully');
  } catch (error) {
    console.error('Error initializing Firebase:', error);
    console.error('Make sure Firebase environment variables are set correctly');
    throw error;
  }
};

export const getDb = () => {
  if (!firebaseInitialized) {
    throw new Error('Firebase not initialized. Call initializeFirebase() first.');
  }
  return admin.firestore();
};

export default admin;

