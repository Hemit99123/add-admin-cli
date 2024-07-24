const admin = require("firebase-admin");
const readline = require("readline");

// Initialize the Firebase Admin SDK with your service account credentials
const serviceAccount = require("./adminKey.json");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});

// Function to set custom user claims
async function setCustomUserClaims(uid, isAdmin) {
  try {
    // Set custom user claims for the user
    await admin.auth().setCustomUserClaims(uid, { admin: isAdmin });
    console.log(`Custom claims set for user ${uid}`);
  } catch (error) {
    console.error("Error setting custom claims:", error);
  }
}

// Function to get UID from email
async function getUidFromEmail(email) {
  try {
    const user = await admin.auth().getUserByEmail(email);
    return user.uid;
  } catch (error) {
    console.error("Error retrieving user by email:", error);
    return null;
  }
}

// Create an interface to read input from the command line
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

// Prompt the user to enter the admin property and email address
rl.question("Set admin property (true/false): ", (boolean) => {
  const isAdmin = boolean.toLowerCase() === "true"; // Convert to boolean
  rl.question("Please enter the user email: ", async (email) => {
    const uid = await getUidFromEmail(email);
    if (uid) {
      // Call the function with the retrieved UID and admin property
      await setCustomUserClaims(uid, isAdmin);
    }
    // Close the readline interface
    rl.close();
  });
});
