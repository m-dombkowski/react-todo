import { getDatabase, ref, onValue, update } from "firebase/database";
import { auth } from "./firebaseAuth";

const db = getDatabase;

export const getUserEventsFromDatabase = () => {
  const eventsRef = ref(db, "users/" + auth.currentUser.uid + "/events");
  onValue(eventsRef, (snapshot) => {
    const data = snapshot.val();
    for (const property in data) {
      console.log(data[property]);
    }
  });
};

export const writeUserToDb = () => {
  const db = getDatabase();
  const userData = {
    id: auth.currentUser.uid,
  };

  const updates = {};
  updates["users/" + auth.currentUser.uid] = userData;

  return update(ref(db), updates);
};
