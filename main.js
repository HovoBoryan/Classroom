// script.js
// Creat a table
let table = document.getElementById('timeTable');

//Create a header line with the days of the week
let headerRow = document.createElement('tr');

// Adding a header row to a table
table.appendChild(headerRow);

// Create 26 rows with time values
let currentTime = new Date();
currentTime.setHours(10, 00, 0); //Start time 10:00

for (let i = 0; i < 26; i++) {
  // Create a table row
  let row = document.createElement('tr');

  // Create a table cell with the current time
  let timeCell = document.createElement('th');
  timeCell.textContent = currentTime.getHours() + ':' + (currentTime.getMinutes() < 10 ? '0' : '') + currentTime.getMinutes();

  // Adding a cell with time to a string
  row.appendChild(timeCell);

  // Add cells for each day of the week
  for (let j = 0; j < 7; j++) {
    let dayCell = document.createElement('td');
    // add additional logic to populate cells with values ?????????
    row.appendChild(dayCell);
  }

  // Adding a row to a table
  table.appendChild(row);

  // increase the current time by 30 minutes
  currentTime.setMinutes(currentTime.getMinutes() + 30);
}

// Added search and filter code

let searchInput = document.getElementById('searchInput');
let searchButton = document.getElementById('searchButton');
let daySelect = document.getElementById('daySelect');
let timeFromSelect = document.getElementById('timeFromSelect');
let timeToSelect = document.getElementById('timeToSelect');
let seeAvailabilityButton = document.getElementById('availabilityButton');
let resetFiltersButton = document.getElementById('resetButton');

searchButton.addEventListener('click', function() {
  let searchText = searchInput.value.toLowerCase();
  let selectedDay = daySelect.value;
  let selectedTimeFrom = timeFromSelect.value;
  let selectedTimeTo = timeToSelect.value;

  let cells = document.getElementsByTagName('td');
  for (let i = 0; i < cells.length; i++) {
    let cellText = cells[i].textContent.toLowerCase();
    let row = cells[i].parentNode;
    let day = row.firstChild.textContent.toLowerCase();
    let time = row.childNodes[1].textContent;

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
  let rows = table.getElementsByTagName('tr');
  for (let i = 0; i < rows.length; i++) {
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
