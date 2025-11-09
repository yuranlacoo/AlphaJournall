import { initializeApp } from 'https://www.gstatic.com/firebasejs/9.22.2/firebase-app.js';
import { getFirestore, setDoc, doc, serverTimestamp } from 'https://www.gstatic.com/firebasejs/9.22.2/firebase-firestore.js';
import { getStorage, ref, uploadString, getDownloadURL } from 'https://www.gstatic.com/firebasejs/9.22.2/firebase-storage.js';
import { firebaseConfig } from './firebase-config.js';

const app = initializeApp(firebaseConfig);
const storage = getStorage(app);

function saveLocalTrade(trade){
  const id = trade.id || ('t_'+Date.now());
  trade.id = id;
  trade.createdAt = trade.createdAt || new Date().toISOString();
  trade.updatedAt = new Date().toISOString();
  trade.synced = false;
  let list = JSON.parse(localStorage.getItem('aj_trades')||'[]');
  list.push(trade);
  localStorage.setItem('aj_trades', JSON.stringify(list));
  return id;
}

export function queueTrade(trade){ return saveLocalTrade(trade); }

async function uploadImageIfNeeded(trade){
  if(!trade.imagem || trade.imagem.startsWith('http')) return trade.imagem || null;
  const storageRef = ref(storage, `prints/${trade.id}.png`);
  await uploadString(storageRef, trade.imagem, 'data_url');
  const url = await getDownloadURL(storageRef);
  return url;
}

export async function syncAll(userId){
  const list = JSON.parse(localStorage.getItem('aj_trades')||'[]');
  const unsynced = list.filter(t=>!t.synced);
  for(const t of unsynced){
    try{
      t.userId = userId;
      const imageUrl = await uploadImageIfNeeded(t);
      if(imageUrl) t.imagem = imageUrl;
      await setDoc(doc(getFirestore(), 'users', userId, 'trades', t.id), { ...t, syncedAt: serverTimestamp() });
      t.synced = true;
    }catch(e){
      console.error('sync error', e);
    }
  }
  localStorage.setItem('aj_trades', JSON.stringify(list));
}
