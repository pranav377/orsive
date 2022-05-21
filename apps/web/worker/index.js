importScripts("https://www.gstatic.com/firebasejs/8.10.1/firebase-app.js");
importScripts(
  "https://www.gstatic.com/firebasejs/8.10.1/firebase-messaging.js"
);
importScripts(
  "https://cdnjs.cloudflare.com/ajax/libs/localforage/1.10.0/localforage.min.js"
);

firebase.initializeApp({
  apiKey: "AIzaSyAb1MpzB9JHyPwYiSlvXbKGbP77TVI_SLs",
  authDomain: "orsive.firebaseapp.com",
  projectId: "orsive",
  storageBucket: "orsive.appspot.com",
  messagingSenderId: "261738070343",
  appId: "1:261738070343:web:4cca1e84eefa1c1d36cc62",
});

const initMessaging = firebase.messaging();

initMessaging.setBackgroundMessageHandler((payload) => {
  const { data } = payload;
  localforage.getItem("username").then((username) => {
    if (username === data.for) {
      registration.showNotification(data.title, {
        body: data.body,
        icon: "/icons/android-icon-192x192.png",
      });
    }
  });
});

self.addEventListener("notificationclick", function (event) {
  let url = new URL("notifications", location).href;
  event.notification.close(); // Android needs explicit close.
  event.waitUntil(
    clients.matchAll({ type: "window" }).then((windowClients) => {
      // Check if there is already a window/tab open with the target URL
      for (var i = 0; i < windowClients.length; i++) {
        var client = windowClients[i];
        // If so, just focus it.
        if (client.url === url && "focus" in client) {
          return client.focus();
        }
      }
      // If not, then open the target URL in a new window/tab.
      if (clients.openWindow) {
        return clients.openWindow(url);
      }
    })
  );
});
