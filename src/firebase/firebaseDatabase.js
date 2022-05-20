import axios from "axios";
import { getDatabase, ref, update } from "firebase/database";
import { auth, url } from "./firebaseAuth";

export let events = [];

export const getEvents = async (currentUserId) => {
  const { data } = await axios.get(`${url}/users/${currentUserId}/events.json`);
  return data;
};

const getClickedEventId = async (clickInfo) => {
  const eventsObj = await getEvents(auth.currentUser.uid);
  for (const randomFirebaseId in eventsObj) {
    if (clickInfo.event.id === eventsObj[randomFirebaseId].id) {
      return randomFirebaseId;
    }
  }
};

export const removeEventFromFirebase = async (clickInfo) => {
  const eventId = await getClickedEventId(clickInfo);
  axios.delete(`${url}/users/${auth.currentUser.uid}/events/${eventId}.json`);
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
