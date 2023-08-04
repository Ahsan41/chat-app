import{
    auth,
    createUserWithEmailAndPassword,
    setDoc,
    doc,
    db
}from './firebaseconfig.js'
const userName = document.querySelector(`#name`)
const userEmial = document.querySelector('#email')
const userpassword = document.querySelector('#password')
// console.log(userName)

const registerbtn = document.querySelector('#form')
console.log(registerbtn)
registerbtn.addEventListener('click', register)

async function register (){
    try{

        const response = await createUserWithEmailAndPassword(auth, userEmial.value, userpassword.value) 
            // Signed in 
            // const user = userCredential.user;
            console.log(response);
            if(response.user){ 
            addUserHandler (response.user.uid)
            }
        }
        catch  (error){
            
            const errorCode = error.code;
            const errorMessage = error.message;
            console.log(errorMessage)
            // ..
        }
    }

async function addUserHandler(uid) {
    try {
        const response = await setDoc(doc(db, "users", uid), {
            fullName : userName.value,
            email : userEmial.value,
            password : userpassword.value
        });

        window.location.href = '.././login/index.html'
    } catch (e) {
        console.error("Error adding document: ", e);
    }
}






