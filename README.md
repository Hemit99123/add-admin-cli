# Firestore Security Rules

## Documentation (video):
https://www.youtube.com/watch?v=wmKzu_mQg0s

This is the code for firebase services rules that should be implemented into the Firebase product for security

### Firestore rules

```firebase
rules_version = '2';

service cloud.firestore {
  match /databases/{database}/documents {
    
    // Match for the blogs collection
    match /blogs/{blogId} {
      // Allow read access to everyone
      allow read: if true;

      // Allow write access only if the user is an admin
      allow write: if request.auth.token.admin == true;
    }

  }
}
```

### Firebase storage rules (images)

```firebase 
rules_version = '2';

service firebase.storage {
  match /b/{bucket}/o {
    match /{allPaths=**} {
      // Allow read access to anyone
      allow read: if true;
      
      // Allow write access only to authenticated users
      // who own the data (identified by their UID)
      allow write: if request.auth.token.admin == true;
    }
  }
}
```# add-admin-cli
