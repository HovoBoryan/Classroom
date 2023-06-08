// script.js
// Создаем таблицу
var table = document.getElementById('timeTable');

// Создаем заголовочную строку с днями недели
var headerRow = document.createElement('tr');

// Создаем пустую ячейку в левом верхнем углу
var emptyHeaderCell = document.createElement('th');
headerRow.appendChild(emptyHeaderCell);

// Добавляем заголовочную строку в таблицу
table.appendChild(headerRow);

// Создаем 26 строк со значениями времени
var currentTime = new Date();
currentTime.setHours(10, 30, 0); // Начальное время 10:30

for (var i = 0; i < 26; i++) {
  // Создаем строку таблицы
  var row = document.createElement('tr');

  // Создаем ячейку таблицы с текущим временем
  var timeCell = document.createElement('th');
  timeCell.textContent = currentTime.getHours() + ':' + (currentTime.getMinutes() < 10 ? '0' : '') + currentTime.getMinutes();

  // Добавляем ячейку с временем в строку
  row.appendChild(timeCell);

  // Добавляем ячейки для каждого дня недели
  for (var j = 0; j < 7; j++) {
    var dayCell = document.createElement('td');
    // Здесь можно добавить дополнительную логику для заполнения ячеек значениями, если необходимо
    row.appendChild(dayCell);
  }

  // Добавляем строку в таблицу
  table.appendChild(row);

  // Увеличиваем текущее время на 30 минут
  currentTime.setMinutes(currentTime.getMinutes() + 30);
}

// Добавленный код для поиска и фильтрации

var searchInput = document.getElementById('searchInput');
var searchButton = document.getElementById('searchButton');
var daySelect = document.getElementById('daySelect');
var timeFromSelect = document.getElementById('timeFromSelect');
var timeToSelect = document.getElementById('timeToSelect');
var seeAvailabilityButton = document.getElementById('availabilityButton');
var resetFiltersButton = document.getElementById('resetButton');

searchButton.addEventListener('click', function() {
  var searchText = searchInput.value.toLowerCase();
  var selectedDay = daySelect.value;
  var selectedTimeFrom = timeFromSelect.value;
  var selectedTimeTo = timeToSelect.value;

  var cells = document.getElementsByTagName('td');
  for (var i = 0; i < cells.length; i++) {
    var cellText = cells[i].textContent.toLowerCase();
    var row = cells[i].parentNode;
    var day = row.firstChild.textContent.toLowerCase();
    var time = row.childNodes[1].textContent;

    if (
      (selectedDay === 'all' || day === selectedDay) &&
      (cellText.includes(searchText)) &&
      (isTimeInRange(time, selectedTimeFrom, selectedTimeTo))
    ) {
      row.style.display = '';
    } else {
      row.style.display = 'none';
    }
  }
});

seeAvailabilityButton.addEventListener('click', function() {
  // Дополнительная логика для отображения доступности временных слотов
});

resetFiltersButton.addEventListener('click', function() {
  var rows = table.getElementsByTagName('tr');
  for (var i = 0; i < rows.length; i++) {
    rows[i].style.display = '';
  }
  searchInput.value = '';
  daySelect.value = 'all';
  timeFromSelect.value = 'all';
  timeToSelect.value = 'all';
});

function isTimeInRange(time, from, to) {
  if (from === 'all' && to === 'all') {
    return true;
  } else if (from === 'all' && to !== 'all') {
    return parseInt(time) <= parseInt(to);
  } else if (from !== 'all' && to === 'all') {
    return parseInt(time) >= parseInt(from);
  } else {
    return parseInt(time) >= parseInt(from) && parseInt(time) <= parseInt(to);
  }
}
