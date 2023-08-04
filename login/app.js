import{
    auth,
    createUserWithEmailAndPassword,
    setDoc,
    signInWithEmailAndPassword,
    doc,
    db
}from'../register/firebaseconfig.js'
const userEmial = document.querySelector("#email")
const userpassword = document.querySelector('#password')
console.log(userEmial)

const loginBtn = document.querySelector('#form')
// console.log(registerbtn)
loginBtn.addEventListener(`click`, loginHandler)

function loginHandler() {
    // console.log(userEmial.value)
    // 
    signInWithEmailAndPassword(auth, userEmial.value,userpassword.value)
  .then((userCredential) => {
    // Signed in 
    const user = userCredential.user;
    if(user){ 
    window.location.href = '../chatdash/index.html'
  }  
})
  .catch((error) => {
    const errorCode = error.code;
    const errorMessage = error.message;
    console.log(errorMessage,errorCode)
  });
}
