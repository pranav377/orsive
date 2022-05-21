import axios from "axios";

const NotificationClient = axios.create({
  baseURL: "https://fcm.googleapis.com/fcm/send",
  headers: {
    Authorization: `key=${process.env.FIREBASE_NOTIFICATIONS_SERVER_KEY}`,
    "Content-Type": "application/json",
  },
});

export default NotificationClient;
