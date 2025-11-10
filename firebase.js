// firebase.js — inicialização (compat)
// Já com a sua config (se preferir altere aqui)
const firebaseConfig = {
  apiKey: "AIzaSyBGeQ1-IKrCyC8hA2BETaJLidLpuYrCRmk",
  authDomain: "alphajournal-dc6bb.firebaseapp.com",
  projectId: "alphajournal-dc6bb",
  storageBucket: "alphajournal-dc6bb.appspot.com",
  messagingSenderId: "835722822229",
  appId: "1:835722822229:web:974ee6dc7b6696f1edcadc"
};

if(typeof firebase === 'undefined'){
  console.error('Firebase SDK não encontrado. Verifica inclusão dos scripts compat no HTML.');
} else {
  // inicializa apenas se necessário
  if(!firebase.apps?.length){
    firebase.initializeApp(firebaseConfig);
  }
  window.auth = firebase.auth();
  window.db = firebase.firestore();
  window.storage = firebase.storage();
}
