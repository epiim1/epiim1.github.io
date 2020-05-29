function firebaseHelper() {
    this.init = function() {
        var firebaseConfig = {
            apiKey: "AIzaSyAc6CVyuFuYpzGveJDkfgaKhGn_3tG1Fzg",
            authDomain: "hsnu-epii.firebaseapp.com",
            databaseURL: "https://hsnu-epii.firebaseio.com",
            projectId: "hsnu-epii",
            storageBucket: "hsnu-epii.appspot.com",
            messagingSenderId: "158800013008",
            appId: "1:158800013008:web:813bcb042659552ada60d5",
            measurementId: "G-X0L2JDJNQ8"
        };
        firebase.initializeApp(firebaseConfig);
    };

    this.messages = {};
    this.messages.list = async function(tag=null) {
        if(tag) var ref = firebase.firestore().collection("messages").where("tags", "array-contains", tag);
        else var ref = firebase.firestore().collection("messages");
        return ref.orderBy("time", "desc").get().then(snap => {
            var documents = [];
            snap.forEach(doc => {
                documents.push(doc.data());
            });
            return documents;
        });
    };
    this.messages.get = async function(id) {
        var ref = firebase.firestore().collection("messages").doc(id);
        return ref.get().then(doc => {
            if (doc.exists) {
                return doc.data();
            } else {
                return { error: "no data found." };
            }
        });
    };
    this.messages.make = async function(q, t = []) {
        var id = Date.now().toString(36) + "-" + Math.floor(10e9+Math.random()*90e9).toString(36);
        var ref = firebase.firestore().collection("messages").doc(id);
        return ref.set({
            request: q,
            response: "",
            tags: t,
            time: new Date()
        }).then(() => {
            return true;
        });
    };
    this.messages.update = async function(id, r) {
        var ref = firebase.firestore().collection("messages").doc(id);
        return ref.update({
            response: r
        }).then(() => {
            return true;
        });
    };
}
