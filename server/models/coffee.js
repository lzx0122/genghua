// Import the functions you need from the SDKs you need
const { initializeApp } = require("firebase/app");
const {
  getFirestore,
  doc,
  getDoc,
  getDocs,
  collection,
  query,
  where,
  addDoc,
  deleteDoc,
  updateDoc,
  Timestamp,
} = require("firebase/firestore");
require('dotenv').config()
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: process.env.FIREBASE_API_KEY,
  authDomain: process.env.FIREBASE_AUTH_DOMAIN,
  databaseURL: process.env.FIREBASE_DATABASE_URL,
  projectId: process.env.FIREBASE_PROJECT_ID,
  storageBucket: process.env.FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.FIREBASE_APP_ID,
  measurementId: process.env.FIREBASE_MEASUREMENT_ID,
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);


function formatDate(timestamp) {
  const date = new Date(parseInt(timestamp));

  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  return `${month}-${day}`;
}

let model = {
  async addUser(account, name, date, email, desc) {
    try {
      if (account === null || account.trim() === "") {
        throw new Error("用戶電話不可為空");
      }

      if (name === null || name.trim() === "") {
        throw new Error("用戶姓名不可為空");
      }

      if (await this.getUserByAccount(account)) {
        throw new Error("此電話已存在");
      }
      const docRef = await addDoc(collection(db, "User"), {
        Account: account,
        Name: name,
        Date: Timestamp.fromMillis(date),
        Email: email,
        Desc: desc,
        MonthDay: formatDate(date)
      });

      return {
        id: docRef.id,
        Account: account,
        Name: name,
        Date: Timestamp.fromMillis(date),
        Email: email,
        Desc: desc,
      };
    } catch (e) {
      throw new Error("新增客戶資料失敗：" + e.message);
    }
  },
  async getAllUsers() {
    try {
      const querySnapshot = await getDocs(collection(db, "User")); // 獲取 user 集合中的所有
      const users = []; // 用來儲存用戶資料的陣列

      querySnapshot.forEach((doc) => {
        users.push({ id: doc.id, ...doc.data() }); // 將每個文件的資料推入陣列中
      });

      return users; // 返回用戶資料陣列
    } catch (e) {
      throw new Error("getAllUsers() error\n" + e.message);
    }
  },
  async getUserByAccount(accountNumber) {
    try {
      // 建立查詢條件
      const q = query(
        collection(db, "User"),
        where("Account", "==", accountNumber)
      );
      // 獲取符合條件的文檔
      const querySnapshot = await getDocs(q);
      // 檢查是否找到任何文檔
      if (querySnapshot.empty) {
        return null;
      }

      //取得客戶寄放商品
      const q2 = query(
        collection(db, "Keep"),
        where("Account", "==", accountNumber)
      );
      const queryKeep = await getDocs(q2);
      let keeps = [];
      for (const doc of queryKeep.docs) {
        // 取得 keep
        let item = await this.getItemById(doc.data().ItemId);
        delete item.Desc;
        keeps.push({ id: doc.id, ...doc.data(), Item: item });
      }

      let doc = querySnapshot.docs[0];

      return { id: doc.id, ...doc.data(), Keeps: keeps }; // 返回用戶資料陣列
    } catch (e) {
      throw new Error("getUserByAccount() error\n" + e.message);
    }
  },
  async getUsersByDate(date) {
    try {
      const q = query(
        collection(db, "User"),
        where("MonthDay", "==", formatDate(date))
      );
      // 獲取符合條件的文檔
      const querySnapshot = await getDocs(q);
      // 檢查是否找到任何文檔
      if (querySnapshot.empty) {
        return null;
      }
      let users = [];

      querySnapshot.forEach((doc) => {
        users.push({ id: doc.id, ...doc.data() }); // 將每個文件的資料推入陣列中
      });

      for (const [index, user] of users.entries()) {
        //取得客戶寄放商品
        const q2 = query(
          collection(db, "Keep"),
          where("Account", "==", user.Account)
        );
        const queryKeep = await getDocs(q2);
        let keeps = [];
        for (const doc of queryKeep.docs) {
          // 取得 keep
          let item = await this.getItemById(doc.data().ItemId);
          keeps.push({ id: doc.id, ...doc.data(), Item: item });
        }
        users[index].Keeps = keeps;
      }

      return users; // 返回用戶資料陣列
    } catch (e) {
      throw new Error("getUserByAccount() error\n" + e.message);
    }
  },
  async getUserAndLogsByUserData(userData) {
    try {
      //取得客戶寄放商品
      const q = query(
        collection(db, "Logs"),
        where("Account", "==", userData.Account)
      );
      const queryLogs = await getDocs(q);
      let logos = [];
      for (const doc of queryLogs.docs) {
        // 取得 logs
        logos.push({ id: doc.id, ...doc.data() });
      }

      return { ...userData, logos }; // 返回用戶資料陣列
    } catch (e) {
      throw new Error("getAdminById() error\n" + e.message);
    }
  },
  async getAdminById(adminId) {
    try {
      // 建立查詢條件
      const q = query(collection(db, "Admin"), where("AdminId", "==", adminId));
      // 獲取符合條件的文檔
      const querySnapshot = await getDocs(q);
      // 檢查是否找到任何文檔
      if (querySnapshot.empty) {
        return null;
      }
      let doc = querySnapshot.docs[0];
      return { id: doc.id, ...doc.data() }; // 返回用戶資料陣列
    } catch (e) {
      throw new Error("getAdminById() error\n" + e.message);
    }
  },
  async loginAdmin(adminId, pwd) {
    try {
      // 建立查詢條件
      const q = query(collection(db, "Admin"), where("AdminId", "==", adminId));

      // 獲取符合條件的文檔
      const querySnapshot = await getDocs(q);
      // 檢查是否找到任何文檔
      if (querySnapshot.empty) {
        return false;
      }
      let doc = querySnapshot.docs[0];
      if (doc.data().Password == pwd) {
        return doc.data();
      }
      return false; // 返回用戶資料陣列
    } catch (e) {
      throw new Error("getUserByAccount() error\n" + e.message);
    }
  },
  async getAllItem() {
    try {
      const querySnapshot = await getDocs(collection(db, "Item")); // 獲取 user 集合中的所有
      const items = []; // 用來儲存用戶資料的陣列

      querySnapshot.forEach((doc) => {
        items.push({ id: doc.id, ...doc.data() }); // 將每個文件的資料推入陣列中
      });

      return items; // 返回用戶資料陣列
    } catch (e) {
      throw new Error("getAllItem() error\n" + e.message);
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
        return null;
      }
      let doc = querySnapshot.docs[0];
      return { id: doc.id, ...doc.data() }; // 返回用戶資料陣列
    } catch (e) {
      throw new Error("getItemById() error\n" + e.message);
    }
  },
  async addItem(itemId, name) {
    try {
      if (await this.getItemById(itemId)) {
        throw new Error("此產品ID 已存在");
      }
      const docRef = await addDoc(collection(db, "Item"), {
        ItemId: itemId,
        Name: name,
      });

      return {
        id: docRef.id,
        ItemId: itemId,
        Name: name,
      };
    } catch (e) {
      throw new Error("新增商品資料失敗：" + e.message);
    }
  },
  async updateItem(id, itemId, name) {
    try {
      let data = await this.getItemById(itemId);
      if (data && data.id != id && data.ItemId == itemId) {
        throw new Error("此產品ID 已存在");
      }
      const itemRef = doc(db, "Item", id);
      await updateDoc(itemRef, { ItemId: itemId, Name: name });
      return {
        id: id,
        ItemID: itemId,
        Name: name,
      };
    } catch (e) {
      throw new Error("更新商品資料失敗：" + e.message);
    }
  },
  async deleteItem(id) {
    try {
      const itemRef = doc(db, "Item", id); // 指向要刪除的文檔
      await deleteDoc(itemRef); // 刪除文檔

      return true;
    } catch (e) {
      throw new Error("刪除商品資料失敗：" + e.message);
    }
  },
  //keep
  async addKeep(account, adminId, itemId, amount, date) {
    try {
      if (!(await this.getUserByAccount(account))) {
        throw new Error("此用戶不存在");
      }
      if (!(await this.getItemById(itemId))) {
        throw new Error("此商品ID不存在");
      }

      const docRef = await addDoc(collection(db, "Keep"), {
        Account: account,
        AdminId: adminId,
        ItemId: itemId,
        Amount: parseInt(amount),
        Date: Timestamp.fromMillis(date),
        PickUp: [],
      });

      return {
        id: docRef.id,
        Account: account,
        AdminId: adminId,
        ItemId: itemId,
        Amount: parseInt(amount),
        Date: Timestamp.fromMillis(date),
        PickUp: [],
      };
    } catch (e) {
      throw new Error("新增寄放商品資料失敗：" + e.message);
    }
  },
  async deleteKeep(id) {
    try {
      const itemRef = doc(db, "Keep", id); // 指向要刪除的文檔
      await deleteDoc(itemRef); // 刪除文檔

      return true;
    } catch (e) {
      throw new Error("刪除商品資料失敗：" + e.message);
    }
  },
  async updateKeep(id, itemId, amount) {
    try {
      if (!(await this.getItemById(itemId))) {
        throw new Error("此商品ID不存在");
      }
      const itemRef = doc(db, "Keep", id);
      await updateDoc(itemRef, { ItemId: itemId, Amount: amount });

      return {
        id: id,
        ItemID: itemId,
        Amount: amount,
      };
    } catch (e) {
      throw new Error("更新寄放商品資料失敗：" + e.message);
    }
  },
  //keep pickup
  async addKeepPickup(id, date, adminId) {
    try {
      const docRef = doc(db, "Keep", id);
      const docSnap = await getDoc(docRef);
      if (!docSnap.exists()) {
        throw new Error("此Keep ID不存在");
      }
      let data = docSnap.data();

      data.Pickup.push({ Date: Timestamp.fromMillis(date), AdminId: adminId });
      await updateDoc(docRef, {
        Pickup: data.Pickup, // 新後的 Pickup
      });
      return {
        id: docRef.id,
        ...data,
      };
    } catch (e) {
      throw new Error("新增寄放商品領取紀錄失敗：" + e.message);
    }
  },
  async deleteKeepPickup(id, index) {
    try {
      const docRef = doc(db, "Keep", id);
      const docSnap = await getDoc(docRef);
      if (!docSnap.exists()) {
        throw new Error("此Keep ID不存在");
      }
      let data = docSnap.data();

      data.Pickup.splice(index, 1);
      await updateDoc(docRef, {
        Pickup: data.Pickup, // 新後的 Pickup
      });
      return {
        id: docRef.id,
        ...data,
      };
    } catch (e) {
      throw new Error("刪除寄放商品領取紀錄失敗：" + e.message);
    }
  },
};
module.exports = model;
