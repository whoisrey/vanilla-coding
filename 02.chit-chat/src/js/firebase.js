import { initializeApp } from "firebase/app";
import { getDatabase, ref, push, onChildAdded } from "firebase/database";

const firebaseConfig = {
  apiKey: import.meta.env.VITE_API_KEY,
  authDomain: import.meta.env.VITE_AUTH_DOMAIN,
  databaseURL: import.meta.env.VITE_DATABASE_URL,
  projectId: import.meta.env.VITE_PROJECT_ID,
  storageBucket: import.meta.env.VITE_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_MESSAGING_SENDER_ID,
  appId: import.meta.env.VITE_APP_ID,
  measurementId: "G-NDRQ1C98R1",
};

const app = initializeApp(firebaseConfig);
const database = getDatabase(app);

export const pushData = (chatData) => {
  const myData = chatData.getData();

  push(ref(database, "users/" + "info"), {
    username: myData["username"],
    colorCode: myData["colorCode"],
    text: myData["text"],
    createdAt: myData["createdAt"],
  });
};

export const addChild = (chatData, manageChat) => {
  const myData = chatData.getData();

  onChildAdded(ref(database, `users/info`), (getData) => {
    if (
      myData["username"] !== getData.val()["username"] &&
      myData["colorCode"] !== getData.val()["colorCode"]
    ) {
      manageChat(getData.val(), true);
    }
  });
};
