// script.js
// Creat a table
var table = document.getElementById('timeTable');

//Create a header line with the days of the week
var headerRow = document.createElement('tr');

// Create an empty cell in the upper left corner
var emptyHeaderCell = document.createElement('th');
headerRow.appendChild(emptyHeaderCell);

// Adding a header row to a table
table.appendChild(headerRow);

// Create 26 rows with time values
var currentTime = new Date();
currentTime.setHours(10, 30, 0); //Start time 10:30

for (var i = 0; i < 26; i++) {
  // Create a table row
  var row = document.createElement('tr');

  // Create a table cell with the current time
  var timeCell = document.createElement('th');
  timeCell.textContent = currentTime.getHours() + ':' + (currentTime.getMinutes() < 10 ? '0' : '') + currentTime.getMinutes();

  // Adding a cell with time to a string
  row.appendChild(timeCell);

  // Add cells for each day of the week
  for (var j = 0; j < 7; j++) {
    var dayCell = document.createElement('td');
    // add additional logic to populate cells with values ?????????
    row.appendChild(dayCell);
  }

  // Adding a row to a table
  table.appendChild(row);

  // increase the current time by 30 minutes
  currentTime.setMinutes(currentTime.getMinutes() + 30);
}

// Added search and filter code

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
  // logic to display timeslot availability
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
