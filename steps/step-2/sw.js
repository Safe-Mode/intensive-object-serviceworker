self.addEventListener('install', (evt) => {
  console.log('sw, install', {evt});
});

self.addEventListener('activate', (evt) => {
  console.log('sw', 'activate', {evt});
});

self.addEventListener('fetch', (evt) => {
  console.log('fetch', {evt, request: evt.request});
  if (evt.request.url === `https://api.github.com/users`) {
    evt.respondWith(new Response(JSON.stringify({message: `You are hacked`})))
  }
});
