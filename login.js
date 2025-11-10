import { initializeApp } from "https://www.gstatic.com/firebasejs/10.11.1/firebase-app.js";
import { getAuth, signInWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/10.11.1/firebase-auth.js";

const firebaseConfig = {
  apiKey: "AIzaSyBGeQ1-IKrCyC8hA2BETaJLidLpuYrCRmk",
  authDomain: "alphajournal-dc6bb.firebaseapp.com",
  projectId: "alphajournal-dc6bb",
  storageBucket: "alphajournal-dc6bb.firebasestorage.app",
  messagingSenderId: "835722822229",
  appId: "1:835722822229:web:974ee6dc7b6696f1edcadc"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

const loginForm = document.getElementById("login-form");

loginForm.addEventListener("submit", (e) => {
    e.preventDefault();

    const email = loginForm["email"].value;
    const password = loginForm["password"].value;

    signInWithEmailAndPassword(auth, email, password)
        .then(() => {
            console.log("✅ Login feito com sucesso");
            window.location.href = "dashboard.html";
        })
        .catch((error) => {
            alert("Erro ao fazer login: " + error.message);
        });
});
