import { getDatabase, ref, update } from "firebase/database";
import { auth } from "./firebaseAuth";

export let events = [];

export const getUserEventsFromDatabase = () => {
  fetch(
    `https://todo-react-21854-default-rtdb.europe-west1.firebasedatabase.app/users/${auth.currentUser.uid}/events.json`
  )
    .then((response) => {
      return response.json();
    })
    .then((responseData) => {
      for (const property in responseData) {
        events.push(responseData[property]);
      }
      return events;
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

export const removeEventFromFirebase = (clickInfo) => {
  let randomFirebaseId;
  fetch(
    `https://todo-react-21854-default-rtdb.europe-west1.firebasedatabase.app/users/${auth.currentUser.uid}/events/.json`
  )
    .then((response) => {
      return response.json();
    })
    .then((responseData) => {
      for (const property in responseData) {
        if (clickInfo.event.id === responseData[property].id) {
          randomFirebaseId = property;
        }
      }
      return fetch(
        `https://todo-react-21854-default-rtdb.europe-west1.firebasedatabase.app/users/${auth.currentUser.uid}/events/${randomFirebaseId}.json`,
        {
          method: "DELETE",
        }
      );
    })
    .then((response) => {
      return response.json();
    })
    .then((responseData) => {
      console.log(responseData);
    });
};

// -----------------------------------------------------------------------------------------
// |  Not exactly firebase, but for creating unique ID's for firebase and calendar events  |
// -----------------------------------------------------------------------------------------
export const uuidv4 = () => {
  return ([1e7] + -1e3 + -4e3 + -8e3 + -1e11).replace(/[018]/g, (c) =>
    (
      c ^
      (crypto.getRandomValues(new Uint8Array(1))[0] & (15 >> (c / 4)))
    ).toString(16)
  );
};
