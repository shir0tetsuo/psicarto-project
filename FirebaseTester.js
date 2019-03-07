const admin = require('firebase-admin');

var serviceAccount = require('./service-account.json');

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount)
});

var db = admin.firestore();

// CREATE
var userId = "111111111111111111";
var docRef = db.collection('pc-user').doc(userId);
console.log('14')
// MODIFY
var setAda = docRef.set({
  key: 'XxqQAaBB',
  banned: false
});
console.log('20')
// READ
db.collection('pc-user').get()
  .then((snapshot) => {
    snapshot.forEach((doc) => {
      if (!doc.data('key')) {
        console.log("SKIP")
      } else if (doc.data.key == 'XxqQAaBB') {
        console.log("HIT///////////")
      }
      console.log(doc.id, '=>', doc.data());
    });
  })
  .catch((err) => {
    console.log('Error getting documents', err);
  });
console.log('31')
