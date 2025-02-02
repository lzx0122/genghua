// Import the functions you need from the SDKs you need
const { initializeApp } = require("firebase/app");
const { getFirestore, doc, getDoc, getDocs, collection, query, where } = require("firebase/firestore");
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyDrPbuNE850TaOHT2khE6QCVc0Fw3QPMPc",
    authDomain: "coffee-2c5c0.firebaseapp.com",
    databaseURL: "https://coffee-2c5c0-default-rtdb.asia-southeast1.firebasedatabase.app",
    projectId: "coffee-2c5c0",
    storageBucket: "coffee-2c5c0.firebasestorage.app",
    messagingSenderId: "564545427039",
    appId: "1:564545427039:web:221e38b47c08c300ac2dea",
    measurementId: "G-6RK00X94NV"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

let model = {
    async getAllUsers() {
        try {
            const querySnapshot = await getDocs(collection(db, "User")); // 獲取 user 集合中的所有
            const users = []; // 用來儲存用戶資料的陣列

            querySnapshot.forEach((doc) => {

                users.push({ id: doc.id, ...doc.data() }); // 將每個文件的資料推入陣列中
            });

            return users; // 返回用戶資料陣列
        } catch (e) {

            throw new Error("getAllUsers() error")
        }
    },
    async getUserByAccount(accountNumber) {
        try {

            // 建立查詢條件
            const q = query(collection(db, "User"), where("Account", "==", accountNumber));
            // 獲取符合條件的文檔
            const querySnapshot = await getDocs(q);
            // 檢查是否找到任何文檔
            if (querySnapshot.empty) {
                return;
            }

            //取得客戶寄放商品
            const q2 = query(collection(db, "Keep"), where("Account", "==", accountNumber));
            const queryKeep = await getDocs(q2);
            let keeps = []
            for (const doc of queryKeep.docs) {
                // 取得 keep
                let item = await this.getItemById(doc.data().ItemId);
                keeps.push({ id: doc.id, ...doc.data(), Item: item });
            }

            let doc = querySnapshot.docs[0]
            return { id: doc.id, ...doc.data(), Keeps: keeps }; // 返回用戶資料陣列

        } catch (e) {

            throw new Error("getUserByAccount() error")
        }
    },
    async getItemById(itemId) {
        try {

            // 建立查詢條件
            const q = query(collection(db, "Item"), where("ItemId", "==", itemId));
            // 獲取符合條件的文檔
            const querySnapshot = await getDocs(q);
            // 檢查是否找到任何文檔
            if (querySnapshot.empty) {
                return;
            }
            let doc = querySnapshot.docs[0]
            return { id: doc.id, ...doc.data() }; // 返回用戶資料陣列

        } catch (e) {

            throw new Error("getUserByAccount() error\n" + e)
        }

    }

}
module.exports = model