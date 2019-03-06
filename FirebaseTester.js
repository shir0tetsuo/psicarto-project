const admin = require('firebase-admin');

var serviceAccount = require('./service-account.json');

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount)
});

var db = admin.firestore();

// CREATE
var userId = "111111111111111111";
var docRef = db.collection('pc-user').doc(userId);

// MODIFY
var setAda = docRef.set({
  key: 'XxqQAaBB',
  banned: false
});

// READ
db.collection('pc-users').get()
  .then((snapshot) => {
    snapshot.forEach((doc) => {
      console.log(doc.id, '=>', doc.data());
    });
  })
  .catch((err) => {
    console.log('Error getting documents', err);
  });
