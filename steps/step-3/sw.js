self.addEventListener('install', (evt) => {
  console.log('sw, install', {evt});
});

self.addEventListener('activate', (evt) => {
  console.log('sw', 'activate', {evt});
});

self.addEventListener('fetch', (evt) => {
  console.log('fetch', {evt, request: evt.request});
  // Сейчас мы создадим ответ, который отправим в браузер.
  evt.respondWith(
    // Ищем в кеше данные по текущему запросу.
    caches.match(evt.request)
      .then((response) => {
        console.log(`Find in cache`, {response});
        // Если данные в кеше есть, то вернем их.
        // Иначе сделаем настоящий запрос на сервер.
        return response ? response : fetch(evt.request);
      })
      .catch((err) => console.error({err}))
  );
});
