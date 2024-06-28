import { initializeApp } from 'firebase/app';
import { getAnalytics } from "firebase/analytics";
import { 
  getAuth,  
  onAuthStateChanged, 
  createUserWithEmailAndPassword, 
  signInWithEmailAndPassword,
  signInWithPopup,
  GoogleAuthProvider, 
  signOut, 
} from "firebase/auth";
import { getDatabase, ref, child, get, set, remove } from "firebase/database";
import { v4 as uuidv4 } from 'uuid';

const provider = new GoogleAuthProvider();


// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: process.env.REACT_APP_FIREBASE_APIKEY,
  authDomain: process.env.REACT_APP_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.REACT_APP_PROJECT_ID,
  storageBucket: process.env.REACT_APP_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.REACT_APP_FIREBASE_MESSAGING_SENDER_ID, 
  appId: process.env.REACT_APP_FIREBASE_APP_ID,
  measurementId: process.env.REACT_APP_FIREBASE_MEASUREMENT_ID
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const auth = getAuth();
const dbRef = ref(getDatabase());

//현재 로그인한 사용자 가져오기
export function onUserStateChange(callback){
  onAuthStateChanged(auth, async (user) => {
    //updatedUser에는 user.id를 확인할 수 있음
    const updatedUser = user? await adminUser(user) : null;
    //console.log("updatedUser", updatedUser)
    callback(updatedUser);
  });
}

export async function AddNewUser(email, password, callback){
  return await createUserWithEmailAndPassword(auth, email, password)
  .then((userCredential) => {
    // Signed in 
    const user = userCredential.user; 
    console.log(user);
    callback();
    // ...
  })
  .catch((error) => {
    console.log(error.code)
    alert("이미 있는 아이디(이메일)이거나, 이메일이 형식에 맞지 않습니다.");
  })
}


async function adminUser(user){
  return get(child(dbRef, `admin`)).then((snapshot) => {
    if (snapshot.exists()){
      const result = snapshot.val();
      if (result.includes(user.uid)) return {...user, isAdmin:true};
      else return user;
    }
    return user;
  }).catch((error) => console.error(error)); 
}

export function EmailLogin({email, password},callback){    
   signInWithEmailAndPassword(auth, email, password)
  .then((userCredential) => {
    console.log("이메일 로그인 성공")
    console.log(userCredential);
    // Signed in 
    const user = userCredential.user;
    callback() //로그인 성공 시 홈으로 돌아감
    // ...
  })
  .catch((error) => {
    alert(error.code.slice(5,));
  });
}

export function GoogleLogin(callback){
  signInWithPopup(auth, provider)
  .then((result) => {
    // This gives you a Google Access Token. You can use it to access the Google API.
    const credential = GoogleAuthProvider.credentialFromResult(result);
    const token = credential.accessToken;
    const user = result.user;
    // IdP data available using getAdditionalUserInfo(result)
    //console.log("구글 로그인,", user, result);
    callback();
  }).catch((error) => console.log(error));
}

export function LogOut(){
  signOut(auth).catch(console.error);
}

export async function AddNewProduct(product, imageUrl){
    const db = getDatabase();
    const idx = uuidv4();
    return set(ref(db, `products/${idx}`), {
      ...product, id:idx, imageUrl
    });
}

export async function getAllProducts(){  
  const dbRef = ref(getDatabase());
  return await get(child(dbRef, `products`)).then((snapshot) => {
    if (snapshot.exists()) {
      const productsInfo = Object.values(snapshot.val());
      //console.log(productsInfo);
      return productsInfo;
    } 
    return [];
  }).catch((error) => {
    console.error(error);
  });

}

export async function AddProductToCart(uid, product){
  console.log("추가했음");
  const db = getDatabase()
  return set(ref(db, `carts/${uid}/${product.id}/${product.selected}`), product)
}


export async function deleteProduct(uid, product){
  const db = getDatabase();
  return remove(ref(db, `carts/${uid}/${product.id}/${product.selected}`));
}

export async function getCartProducts(uid, product){  
  return get(child(dbRef, `carts/${uid}/${product.id}`)).then((snapshot) => {

      const productsInfo = snapshot.val() ?? {};
      //const result = Object.values(productsInfo);
      return productsInfo;
    
  }).catch((error) => {
    console.error(error);
  });
}


export async function getProductsOfUser(uid){  
  return get(child(dbRef, `carts/${uid}`)).then((snapshot) => {
      const productsInfo = snapshot.val() ?? {};
      const result = Object.values(productsInfo);
      return result;
    
  }).catch((error) => {
    console.error(error);
  });
}
