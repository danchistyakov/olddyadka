var filmsElem = document.getElementById('films');
var searchInput = document.getElementById('search');
var searchStatus = document.getElementById('status');
var debounceTimeout = setTimeout(function () {}, 100);

function fetch(url) {
  var xhr;
  if (window.XMLHttpRequest) {
    //Firefox, Opera, IE7, and other browsers will use the native object
    xhr = new XMLHttpRequest();
  } else {
    //IE 5 and 6 will use the ActiveX control
    xhr = new ActiveXObject('Microsoft.XMLHTTP');
  }

  xhr.onload = function () {
    searchStatus.textContent = '';
    var data = JSON.parse(xhr.responseText);
    data = data.data;
    filmsElem.innerHTML = '';
    for (var i = 0; i < data.length; i++) {
      var filmElem = document.createElement('li');
      filmElem.className = 'film';
      filmElem.innerHTML =
        "<div class='film-poster' style=\"background-image: url('" +
        data[i].poster +
        "')\"></div><p class='film-title'>" +
        data[i].title +
        '</p>';
      filmsElem.appendChild(filmElem);
    }
  };

  xhr.onerror = function (e) {
    alert('Error Status: ' + e.target.status);
    console.log('Error Status: ' + e.target.status);
  };

  xhr.open('GET', url, true);
  xhr.send();
}

searchInput.addEventListener(
  'input',
  function (e) {
    clearTimeout(debounceTimeout);
    debounceTimeout = setTimeout(function () {
      searchStatus.textContent = 'Загрузка...';
      filmsElem.innerHTML = '';
      fetch('/search.php?query=' + e.target.value);
    }, 500);
  },
  true
);
