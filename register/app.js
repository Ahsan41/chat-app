import{
    auth,
    createUserWithEmailAndPassword,
    setDoc,
    doc,
    db,
    storage,
    ref,
    uploadBytesResumable,
    getDownloadURL

}from './firebaseconfig.js'
const userName = document.querySelector(`#name`)
const userEmial = document.querySelector('#email')
const userpassword = document.querySelector('#password')
// console.log(userName)

const registerbtn = document.querySelector('#form')
const fileInput = document.querySelector("#fileInput");
console.log(fileInput) 

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
     
    

// async function addUserHandler(uid) {
//     const file = fileInput.files[0]


//     // Create the file metadata
//     /** @type {any} */
//     const metadata = {
//         contentType: 'image/jpeg'
//     };

//     // Upload file and metadata to the object 'images/mountains.jpg'
//     // const storageRef = ref(storage, 'images/' + file.name);
//     // const uploadTask = uploadBytesResumable(storageRef, file, metadata);

//     const storageRef = ref(storage, 'images/' + file.name);
//     const uploadTask = uploadBytesResumable(storageRef, file, metadata);


//     // Listen for state changes, errors, and completion of the upload.
//     uploadTask.on('state_changed',
//         (snapshot) => {
//             // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
//             const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
//             console.log('Upload is ' + progress + '% done');
//             switch (snapshot.state) {
//                 case 'paused':
//                     console.log('Upload is paused');
//                     break;
//                 case 'running':
//                     console.log('Upload is running');
//                     break;
//             }
//         },
//         (error) => {
//             // A full list of error codes is available at
//             // https://firebase.google.com/docs/storage/web/handle-errors
//             switch (error.code) {
//                 case 'storage/unauthorized':
//                     // User doesn't have permission to access the object
//                     break;
//                 case 'storage/canceled':
//                     // User canceled the upload
//                     break;

//                 // ...

//                 case 'storage/unknown':
//                     // Unknown error occurred, inspect error.serverResponse
//                     break;
//             }
//         },
//         () => {
//             // Upload completed successfully, now we can get the download URL
//             getDownloadURL(uploadTask.snapshot.ref).then(async (downloadURL) => {
//                 console.log('File available at', downloadURL);
//                 console.log(uid);
//                 await setDoc(doc(db, "users", uid), {
//                     fullName: userName.value,
//                     email: userEmial.value,
//                     password: userpassword.value,
//                     picture: downloadURL
                    
//                 });
//             });
//         }
//     );
//  }

async function addUserHandler(uid) {
    const file = fileInput.files[0];

    const metadata = {
        contentType: 'image/jpeg'
    };

    if (file) {
        const storageRef = ref(storage, 'images/' + file.name);
        const uploadTask = uploadBytesResumable(storageRef, file, metadata);

        uploadTask.on('state_changed',
            // ... (remaining code for progress and error handling)
            () => {
                getDownloadURL(uploadTask.snapshot.ref).then(async (downloadURL) => {
                    console.log('File available at', downloadURL);
                    await setDoc(doc(db, "users", uid), {
                        fullName: userName.value,
                        email: userEmial.value,
                        password: userpassword.value,
                        picture: downloadURL
                    });
                });
            }
        );
    } else {
        try {
            await setDoc(doc(db, "users", uid), {
                fullName: userName.value,
                email: userEmial.value,
                password: userpassword.value
            });
            console.log("User data added successfully without picture.");
        } catch (error) {
            console.error("Error adding user data:", error);
        }
        window.location.href = '../login/index.html'
    }
}


