self.addEventListener('install', (evt) => {
  console.log('sw, install', {evt});
});

self.addEventListener('activate', (evt) => {
  console.log('sw', 'activate', {evt});
});

self.addEventListener('fetch', (evt) => {
  console.log('fetch', {evt, request: evt.request});
  // Проверяем, что это тот запрос, который мы хотим перехватить.
  if (evt.request.url === `https://api.github.com/users`) {
    // Сейчас мы создадим ответ, который отправим в браузер.
    evt.respondWith(
      // Создаем объект Response, который попадет в результат работы `fetch` в браузере.
      new Response(JSON.stringify({message: `You are hacked`}))
    );
  }
});
