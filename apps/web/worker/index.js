self.addEventListener("notificationclick", function (event) {
  //For root applications: just change "'./'" to "'/'"
  //Very important having the last forward slash on "new URL('./', location)..."
  const rootUrl = new URL("./notifications", location).href;
  event.notification.close();
  event.waitUntil(
    clients.matchAll().then((matchedClients) => {
      for (let client of matchedClients) {
        if (client.url.indexOf(rootUrl) >= 0) {
          return client.focus();
        }
      }

      return clients.openWindow(rootUrl).then(function (client) {
        client.focus();
      });
    })
  );
});
