var filmsElem = document.getElementById('films');
var searchInput = document.getElementById('search');
var searchStatus = document.getElementById('status');
var debounceTimeout = setTimeout(function () {}, 100);

function fetch(method, url, body = {}) {
  var xhr = new XMLHttpRequest();
  xhr.open(method, url, true);
  xhr.responseType = 'json';
  if (method === 'POST') {
    xhr.setRequestHeader('Content-type', 'application/json; charset=utf-8');
    xhr.send(JSON.stringify(body));
  } else {
    xhr.send();
  }
  xhr.onload = function () {
    searchStatus.textContent = '';
    var data = xhr.response.data;
    filmsElem.innerHTML = '';
    for (var i = 0; i < data.length; i++) {
      var filmElem = document.createElement('li');
      filmElem.className = 'film';
      filmElem.innerHTML = `<img class='film-poster' src=${data[i].poster}></img><p>${data[i].title}</p>`;
      filmsElem.append(filmElem);
    }
  };

  xhr.onerror = function () {
    alert('Запрос не удался');
  };
}

searchInput.addEventListener('input', (e) => {
  clearTimeout(debounceTimeout);
  debounceTimeout = setTimeout(() => {
    searchStatus.textContent = 'Загрузка...';
    filmsElem.innerHTML = '';
    fetch('POST', 'https://api.dyadka.gq/search', { query: e.target.value });
  }, 500);
});
