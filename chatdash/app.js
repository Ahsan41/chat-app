import {
    onAuthStateChanged,
    auth,
    doc,
    db,
    getDoc,
    collection,
    query,
    where,
    getDocs
} from '../register/firebaseconfig.js'


const username = document.querySelector(".username")
console.log(username)
onAuthStateChanged(auth, (user) => {
    console.log(user, "==>> user")
    if (user) {
        // User is signed in, see docs for a list of available properties
        // https://firebase.google.com/docs/reference/js/auth.user
        const uid = user.uid;
        console.log(uid);
        getUserData(uid)
        getAlluser(user.email)
        console.log(user.email)
    } else {
        window.location.href = "../register/index.html"    // User is signed out
    }
});

console.log("awaeen check")

async function getUserData(uid) {
    //   console.log(uid)
    try {
        const docRef = doc(db, "users", uid);
        const docSnap = await getDoc(docRef);
        //   const{fullName} = docSnap.data()
        if (docSnap.exists()) {
            console.log("Document data:", docSnap.data());
            const { fullName, email } = docSnap.data()
            // username.value = docSnap.data().fullName;
            username.textContent = fullName;
        } else {
            // docSnap.data() will be undefined in this case
            console.log("No such document!");
        }
    } catch (error) {
        console.log(error, "==>>error in get User Data")
    }
}

// your_js_file.js
const selectChat = (email, fullName) => {
    console.log(email, fullName);
    const selectedName = document.querySelector(`#selectedUsername`)
    const selectedEmail = document.querySelector("#selecteduserEmail")
    console.log(selectedEmail);
    selectedName.innerHTML=fullName;
    selectedEmail.innerHTML=email;
};

const getAlluser = async (email) => {
    const q = query(collection(db, "users"), where("email", "!=", email));
    const chatlist = document.querySelector(".chatlist");
    const querySnapshot = await getDocs(q);
    chatlist.innerHTML = ""; // Clear previous chatlist content
    querySnapshot.forEach((doc) => {
        const { fullName, email } = doc.data();
        chatlist.innerHTML += `
            <div onclick="selectChat('${email}', '${fullName}')" class="block active">
                <div class="imgbox">
                      <img src="./assets/user.png" class="cover">
                </div>
                <div class="details">
                    <div class="listhead">
                        <h4>${fullName}</h4>
                        <p class="time"></p>
                    </div>
                </div>
            </div>`;
    });
};

// Remove the following line if you don't need to make selectChat globally available;;;;;
window.selectChat = selectChat;

const msginput = document.querySelector("#msg-input")
// console.log(msginput)

msginput.addEventListener("keydown", (e) => {
    // console.log(e.keyCode);
    if(e.keyCode === 13){
        console.log(msginput.value);
        
    }
    // console.log(msginput.value)
})