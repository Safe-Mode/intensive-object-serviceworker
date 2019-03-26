self.addEventListener('install', (evt) => {
  console.log('sw, install', {evt});
});

self.addEventListener('activate', (evt) => {
  console.log('sw', 'activate', {evt});
});

self.addEventListener('fetch', (evt) => {
  console.log('fetch', {evt, request: evt.request});
  evt.respondWith(
    caches.match(evt.request)
      .then((response) => {
        console.log(`Find in cache`, {response});
        return response ? response : fetch(evt.request);
      })
      .catch((err) => console.error({err}))
  );
});
