self.addEventListener('install', (evt) => {
  // Код выполнится, когда SW будет установлен.
  console.log('sw, install', {evt});
});

self.addEventListener('activate', (evt) => {
  // Код выполнится, когда SW будет активирован.
  console.log('sw', 'activate', {evt});
});

// Настройка перехвата запросов.
self.addEventListener('fetch', (evt) => {
  // Код выполнится, когда SW перехватит fetch запрос.
  console.log('fetch', {evt, request: evt.request});
});
