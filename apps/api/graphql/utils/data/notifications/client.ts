import axios from "axios";
import { FIREBASE_NOTIFICATIONS_SERVER_KEY } from "../../../config";

const NotificationClient = axios.create({
  baseURL: "https://fcm.googleapis.com/fcm/send",
  headers: {
    Authorization: `key=${FIREBASE_NOTIFICATIONS_SERVER_KEY}`,
    "Content-Type": "application/json",
  },
});

export default NotificationClient;
