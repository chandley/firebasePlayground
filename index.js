
var admin = require("firebase-admin");

var serviceAccount = require("./secret-key.json");

admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    databaseURL: "https://fir-spike-3b59f.firebaseio.com"
});

// As an admin, the app has access to read and write all data, regardless of Security Rules
var db = admin.database();
var ref = db.ref("server/saving-data/fireblog");

var usersRef = ref.child("users");
usersRef.set({
    alanisawesome: {
        email: "firstEmail",
        date_of_birth: "June 23, 1912",
        full_name: "Alan Turing"
    },
    gracehop: {
        email: "secondEmail",
        date_of_birth: "December 9, 1906",
        full_name: "Grace Hopper"
    },
    baktash: {
        full_name: "Baktash Ahmed",
        favorite_food: "biscuits"
    }
});

var contentRef = ref.child("stories");
contentRef.set({
    elvis: {
        headline: "Elvis died",
        body: "bad diet blamed",
        publishDate: "17 August 1977",
        mmgId: "elvis"
    },
    trump: {
        headline: "Trump elected",
        body: "poll was close",
        publishDate: "28 November 2016",
        mmgId: "trump"
    },
    libor: {
        headline: "Rain man convicted for LIBOR fraud",
        body: "gave full confession, then retracted it",
        publishDate: "13 September 2015",
        mmgId: "libor"
    }
});

var matchRef = ref.child("matches");
matchRef.set({
    firstEmail: {
        firstMatch: {
            profileId: "abc",
            contentMmgId: "elvis"
        },
        secondMatch: {
            profileId: "abc",
            contentMmgId: "trump"
        }
    },
    secondEmail: {
        firstMatch: {
            profileId: "def",
            contentMmgId: "elvis"
        },
        secondMatch: {
            profileId: "def",
            contentMmgId: "libor"
        }
    }
});



const users = ref.child('users');
const query = users
    .orderByChild('full_name')
    .equalTo('Baktash Ahmed');

query.once("value", function(snapshot) {
    console.log('getting user data from firebase');
    console.log(snapshot.val());
});

const stories = ref.child('stories');
const storyQuery = stories
    .orderByChild('headline')
    .equalTo('Elvis died');

storyQuery.once("value", function(snapshot) {
    console.log('getting story data from firebase');
    console.log(snapshot.val());
});

const matches = ref.child('matches');
const matchQuery = matches
    .child('firstEmail');

matchQuery.once("value", function(snapshot) {
    console.log('getting match data from firebase');
    console.log(snapshot.val());
});

matchQuery.once("value", function(snapshot) {
    firstList = matches.child('secondEmail');
    console.log('getting first list data from firebase');

    firstList.on('child_added', snap => {
        const story = ref.child('stories/' + snap.child("contentMmgId").val());
        story.once("value", function(storySnap) {
            console.log(storySnap.val());
        })
    })
});

