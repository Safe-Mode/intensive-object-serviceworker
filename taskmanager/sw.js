const CACHE_NAME = `TASK_MANAGER`;

// Настроим кеширование статики во время установки SW.
self.addEventListener(`install`, (evt) => {
  console.log(`sw, install`, {evt});
  // Активация SW не произойдет, пока кеш не будет настроен.
  evt.waitUntil(
    // Открываем наш кеш.
    caches.open(CACHE_NAME)
      .then((cache) => {
        // Добавляем в кеш список статических ресурсов.
        return cache.addAll([
          `./`,
          `./index.html`,
          `./main.js`,
          `./css/normalize.css`,
          `./css/style.css`,
          `./fonts/HelveticaNeueCyr-Bold.woff`,
          `./fonts/HelveticaNeueCyr-Bold.woff2`,
          `./fonts/HelveticaNeueCyr-Medium.woff`,
          `./fonts/HelveticaNeueCyr-Medium.woff2`,
          `./fonts/HelveticaNeueCyr-Roman.woff`,
          `./fonts/HelveticaNeueCyr-Roman.woff2`,
          `./img/add-photo.svg`,
          `./img/close.svg`,
          `./img/sample-img.jpg`,
          `./img/wave.svg`,
        ])
      })
  );
});

self.addEventListener(`activate`, (evt) => {
  console.log(`sw`, `activate`, {evt});
});

self.addEventListener(`fetch`, (evt) => {
  evt.respondWith(
    caches.match(evt.request)
      .then((response) => {
        console.log(`Find in cache`, {response});
        return response ? response : fetch(evt.request);
      })
      .catch((err) => {
        console.error({err});
        throw err;
      })
  );
});
