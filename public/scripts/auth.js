// login
const signInBtn = document.querySelector(".signin-btn");

signInBtn.addEventListener("click", (e) => {
  e.preventDefault();
  const provider = new firebase.auth.GoogleAuthProvider();
  auth
    .signInWithPopup(provider)
    .then((cred) => {
      signInBtn.style.display = "none";
      return db.collection("users").doc(cred.user.uid);
    })
    .catch((err) => {
      console.log(err);
    });
});
