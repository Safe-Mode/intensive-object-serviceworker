console.log('Im index.js');

const button = document.querySelector(`#load_button`);
button.onclick = () => {
  fetch(`https://api.github.com/users`)
    .then((response) => {
      if (response.ok) {
        return response.json();
      } else {
        throw response.text();
      }
    })
    .then((users) => console.log({users}))
    .catch(console.error);
};
