const admin = require('firebase-admin');
const readline = require('readline');

// Initialize the Firebase Admin SDK with your service account credentials
const serviceAccount = require('./adminKey.json');

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount)
});

// Function to set custom user claims
async function setCustomUserClaims(uid, isAdmin) {
  try {
    // Set custom user claims for the user
    await admin.auth().setCustomUserClaims(uid, { admin: isAdmin });
    console.log(`Custom claims set for user ${uid}`);
  } catch (error) {
    console.error('Error setting custom claims:', error);
  }
}

// Create an interface to read input from the command line
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

// Prompt the user to enter the admin property and UID
rl.question('Set admin property (true/false): ', (boolean) => {
  const isAdmin = boolean.toLowerCase() === 'true'; // Convert to boolean
  rl.question('Please enter the user UID: ', (userUid) => {
    // Call the function with the entered UID and admin property
    setCustomUserClaims(userUid, isAdmin);
    // Close the readline interface
    rl.close();
  });
});
