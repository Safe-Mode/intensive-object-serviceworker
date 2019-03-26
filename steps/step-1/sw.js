self.addEventListener('install', (evt) => {
    console.log('sw, install', {evt});
  });
  
  self.addEventListener('activate', (evt) => {
    console.log('sw', 'activate', {evt});
  });
  
  self.addEventListener('fetch', (evt) => {
    console.log('fetch', {evt, request: evt.request});
  });
  