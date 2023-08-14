import {
    onAuthStateChanged,
    auth,
    doc,
    db,
    getDoc,
    collection,
    query,
    where,
    getDocs,
    addDoc,
    serverTimestamp,
    onSnapshot,
    orderBy,
    updateDoc,
    signOut
} from '../register/firebaseconfig.js'

const username = document.querySelector(".username")
let curentloggedinuser;
console.log()
onAuthStateChanged(auth, (user) => {
    // console.log(user, "==>> user")
    if (user) {
        // User is signed in, see docs for a list of available properties
        // https://firebase.google.com/docs/reference/js/auth.user
        const uid = user.uid;
        // console.log(uid);
        getUserData(uid)
        getAllUsers(user.email)
        curentloggedinuser=uid
        // console.log(curentloggedinuser)
    } else {
        window.location.href = "../register/index.html"    // User is signed out
    }
});

// console.log("awaeen check")

async function getUserData(uid) {
    //   console.log(uid)
    try {
        const userimg = document.querySelector("#userimage")
        const docRef = doc(db, "users", uid);
        const docSnap = await getDoc(docRef);
        //   const{fullName} = docSnap.data()
        if (docSnap.exists()) {
            // console.log("Document data:", docSnap.data());
            const { fullName, email , picture } = docSnap.data()
            // username.value = docSnap.data().fullName;
            username.textContent = fullName;
            userimg.src = picture || "./assets/user.png"

        } else {
            // docSnap.data() will be undefined in this case
            console.log("No such document!");
        }
    } catch (error) {
        console.log(error, "==>>error in get User Data")
    }
}

// your_js_file.js

// const getAlluser = async (email) => {
    
//              const q = query(collection(db, "users"),orderBy("isActive",'desc'));
//              const chatBox = document.querySelector('#chat-box')
//     const unsubscribe = onSnapshot(q, (querySnapshot) => {
//             const users = [];
//        querySnapshot.forEach((doc) => {
//         // console.log(doc.data())
//        users.push(doc.data());
       
//     })
//     const chatlist = document.querySelector(".chatlist");
//     chatlist.innerHTML = ""
    
//     for (var i=0; i<users.length; i++){
//         const { fullName, email ,  picture , isActive} = users[i];
//         chatlist.innerHTML += `
//         <div onclick="selectChat('${email}', '${fullName}','${users.id}' , ${picture} )" class="block active">
//         <div class="imgbox">
//         <img src="${picture || "./assets/user.png"}" class="cover">
//         </div>
//         <div class="details">
//         <div class="listhead">
//         <h4>${fullName}</h4>
//         <p class="online ${isActive    ? 'online1' : 'offline'}"></p>
//                     </div>
//                     </div>
//                     </div>`;
//                 }
                
                
                
                
//                 // const q = query(collection(db, "users"), where("email", "!=", email));
//                 // const querySnapshot = await getDocs(q);
//                 // chatlist.innerHTML = ""; // Clear previous chatlist content
//                 // querySnapshot.forEach((doc) => {
//                     //     const { fullName, email , picture , isActive} = doc.data();
//                     // chatlist.innerHTML += `
//                     //     <div onclick="selectChat('${email}', '${fullName}','${doc.id}' , ${picture} )" class="block active">
//                     //         <div class="imgbox">
//                     //               <img src="${picture || "./assets/user.png"}" class="cover">
//                     //         </div>
//                     //         <div class="details">
//                     //             <div class="listhead">
//                     //                 <h4>${fullName}</h4>
//                     //                 <p class="online ${isActive    ? 'online' : 'offline'}"></p>
//                     //             </div>
//                     //         </div>
//                     //     </div>`;
//                     // console.log(doc.id);
//                 });
// };


const getAllUsers = async (email) => {
    try {
        const q = query(collection(db, "users") , orderBy("email") , where("email" , "!=" , email) , orderBy("isActive",'desc'));
        const chatBox = document.querySelector('#chat-box');

        const unsubscribe = onSnapshot(q, (querySnapshot) => {
            const users = [];
            querySnapshot.forEach((doc) => {
                users.push({...doc.data(), uid:doc.id});
            });

            const chatlist = document.querySelector(".chatlist");
            chatlist.innerHTML = "";

            for (var i = 0; i < users.length; i++) {
                const { fullName, email, picture, isActive , uid } = users[i];
                chatlist.innerHTML += `
                    <div onclick="selectChat('${email}', '${fullName}', '${uid}', '${picture}')" class="block active">
                        <div class="imgbox">
                            <img src="${picture || "./assets/user.png"}" class="cover">
                        </div>
                        <div class="details">
                            <div class="listhead">
                                <h4>${fullName}</h4>
                                <p class="online ${isActive ? 'online1' : 'offline'}"></p>
                            </div>
                        </div>
                    </div>`;
            }
        });

        // Agar kisi tarah ki error aati hai, to try-catch block usse handle karega
    } catch (error) {
        console.error("Error fetching users:", error);
    }
};

// const getAllUsers = async (email) => {
//     try {
//         const q = query(collection(db, "users"), );
//         const chatBox = document.querySelector('#chat-box');

//         const unsubscribe = onSnapshot(q, (querySnapshot) => {
//             const users = [];
//             querySnapshot.forEach((doc) => {
//                 users.push({  ...doc.data() , uid: doc.id}); // Include the document ID
//             });

//             const chatlist = document.querySelector(".chatlist");
//             chatlist.innerHTML = "";

//             users.forEach((user) => {
//                 const { fullName, email, picture, isActive } = users[i];
//                 chatlist.innerHTML += `
//                     <div onclick="selectChat('${email}', '${fullName}', '${uid}', ${picture})" class="block active">
//                         <div class="imgbox">
//                             <img src="${picture || "./assets/user.png"}" class="cover">
//                         </div>
//                         <div class="details">
//                             <div class="listhead">
//                                 <h4>${fullName}</h4>
//                                 <p class="online ${isActive ? 'online1' : 'offline'}"></p>
//                             </div>
//                         </div>
//                     </div>`;
//             });
//         });

//         // Agar kisi tarah ki error aati hai, to try-catch block usse handle karega
//     } catch (error) {
//         console.error("Error fetching users:", error);
//     }
// };
 

let selecteduserid;

const selectChat = (email, fullName , selectedid , picture) => {
    console.log(email, fullName , selectedid);
    selecteduserid = selectedid

    let chatID;
    if (selecteduserid < curentloggedinuser) {
        chatID = curentloggedinuser + selecteduserid;
    } else {
        chatID = selecteduserid + curentloggedinuser;
    }
       console.log(chatID)
    
    console.log(selectedid);
    const selectedName = document.querySelector(`#selectedUsername`)
    const selectedEmail = document.querySelector("#selecteduserEmail")
    const selectedpicture = document.querySelector("#selectedpicture")
    console.log(selectedpicture);
    selectedName.innerHTML=fullName;
    selectedEmail.innerHTML=email;
    selectedpicture.src = picture || "./assets/user.png"
    getAllMessages(chatID)
};

// Remove the following line if you don't need to make selectChat globally available;;;;;
window.selectChat = selectChat;

const msginput = document.querySelector("#msg-input")

msginput.addEventListener("keydown", async (e) => {
    if (e.keyCode === 13) {
          // console.log(selecteduserid);
          // console.log(curentloggedinuser);
        let chatID;
        if (selecteduserid < curentloggedinuser) {
            chatID = curentloggedinuser + selecteduserid;
        } else {
            chatID = selecteduserid + curentloggedinuser;
        }
           console.log(chatID)
        try {
            const docRef = await addDoc(collection(db, "messages"), {
                message: msginput.value,
                chatid: chatID,
                timestamp: serverTimestamp(), // Use serverTimestamp() to get the current server time
                sender: curentloggedinuser,
                reciever: selecteduserid
            });

            console.log("Message sent:", docRef.id);
        } catch (error) {
            console.error("Error sending message:", error);
        }
    }
});

const getAllMessages = (chatID) =>{
    console.log(chatID);
    const q = query(collection(db, "messages"),orderBy("timestamp",'desc'),where("chatid", "==", chatID));
    const chatBox = document.querySelector('#chat-box')
    const unsubscribe = onSnapshot(q, (querySnapshot) => {
            const messages = [];
       querySnapshot.forEach((doc) => {
        // console.log(doc.data())
       messages.push(doc.data());
       console.log(doc.data());
    });
    chatBox.innerHTML = "";
    for(var i=0; i < messages.length; i++){
        // let time = moment( messages[i].timestamp.toDate() ).fromNow()
        let time = messages[i].timestamp ? moment( messages[i].timestamp.toDate() ).fromNow() : moment().fromNow();
        // console.log("timestamp" ,moment( messages[i].timestamp.toDate() ).fromNow());
        if(curentloggedinuser === messages[i].sender){ 
      chatBox.innerHTML += `
                          <div class="message my-msg">
                        <p>${messages[i].message}<br><span class="time">${time}</span></p>        
                          </div>`}
                          else{ 

                           chatBox.innerHTML
                            +=`<div class="message friend-msg">
                            <p>${messages[i].message}<br><span class="time">${time}</span></p>        
                           </div>`
                     console.log("messages" , messages);
           }
      }
    });
   }

const setActiveStatus = async (status)=>{
    curentloggedinuser;
    const userRef = doc(db, "users" , curentloggedinuser);
    await updateDoc(userRef,{
        isActive : status
    })

}

window.addEventListener("beforeunload", ()=>{
    setActiveStatus(false)
})

window.addEventListener("focus", ()=>{
    setActiveStatus(true)
})


const logout = document.querySelector("#logout")
const logoutHandler = () => {
    signOut(auth).then(() => {
        // Sign-out successful.
        // console.log("signout successfully")
    }).catch((error) => {
        // An error happened.
    });
    window.location.href = '../register/index.html'
    
}
logout.addEventListener('click' , logoutHandler)