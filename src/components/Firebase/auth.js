import { auth } from "./firebase";

// *** Auth API ***
export function doCreateUserWithEmailAndPassword (username,email, password) {
    return auth().createUserWithEmailAndPassword(email, password)
    .then((result) => {
        return result.user.updateProfile({
          displayName: username
        })
    })
}

export function doSignInWithEmailAndPassword (email, password){
    return auth().signInWithEmailAndPassword(email,password);
}
export function doSignOut (){
    return auth().signOut();
}

export function doPasswordReset(email){
    return auth().sendPasswordResetEmail(email);
}

export function doPasswordUpdate(password){
    return auth().currentUser.updatePassword(password);
}

// *** Google Auth API ***
export function doCreateUserWithGoogle() {
    const provider = new auth.GoogleAuthProvider();
    return auth().signInWithPopup(provider);
}

 // *** Facebook Auth API ***
export function doCreateUserWithFacebook(){
    return auth().signInWithPopup(this.FacebookProvider);
} 
