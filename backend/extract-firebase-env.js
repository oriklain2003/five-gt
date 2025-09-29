// Script to extract Firebase environment variables from firebase.json
const fs = require('fs');
const path = require('path');

try {
  const firebaseConfigPath = path.join(__dirname, 'firebase.json');
  
  if (!fs.existsSync(firebaseConfigPath)) {
    console.error('❌ firebase.json not found in backend directory');
    process.exit(1);
  }
  
  const firebaseConfig = JSON.parse(fs.readFileSync(firebaseConfigPath, 'utf8'));
  
  console.log('\n🔥 Firebase Environment Variables for Render:');
  console.log('================================================\n');
  
  console.log('Copy and paste these environment variables in Render Dashboard:\n');
  
  console.log(`FIREBASE_TYPE=${firebaseConfig.type || 'service_account'}`);
  console.log(`FIREBASE_PROJECT_ID=${firebaseConfig.project_id}`);
  console.log(`FIREBASE_PRIVATE_KEY_ID=${firebaseConfig.private_key_id}`);
  console.log(`FIREBASE_PRIVATE_KEY=${firebaseConfig.private_key}`);
  console.log(`FIREBASE_CLIENT_EMAIL=${firebaseConfig.client_email}`);
  console.log(`FIREBASE_CLIENT_ID=${firebaseConfig.client_id}`);
  console.log(`FIREBASE_AUTH_URI=${firebaseConfig.auth_uri}`);
  console.log(`FIREBASE_TOKEN_URI=${firebaseConfig.token_uri}`);
  console.log(`FIREBASE_AUTH_PROVIDER_X509_CERT_URL=${firebaseConfig.auth_provider_x509_cert_url}`);
  console.log(`FIREBASE_CLIENT_X509_CERT_URL=${firebaseConfig.client_x509_cert_url}`);
  
  console.log('\n📝 Instructions:');
  console.log('1. Go to your Render dashboard');
  console.log('2. Select your backend service');
  console.log('3. Go to Environment tab');
  console.log('4. Add each variable above');
  console.log('5. Redeploy your service');
  console.log('\n✅ Your Firebase authentication should work after redeployment!');
  
} catch (error) {
  console.error('❌ Error reading firebase.json:', error.message);
  process.exit(1);
}
