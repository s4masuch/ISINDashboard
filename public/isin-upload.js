// isin-upload.js
document.addEventListener('DOMContentLoaded', function () {
  console.log('DOMContentLoaded event fired');
  const uploadButton = document.getElementById('uploadButton');
  uploadButton.addEventListener('click', handleFileUpload);
});

function handleFileUpload() {
  console.log('handleFileUpload function called');
  const fileInput = document.getElementById('fileInput');
  const feedbackText = document.getElementById('feedbackText');
  const tableContainer = document.getElementById('tableContainer'); // Add this line

  const file = fileInput.files[0];

  if (!file) {
    feedbackText.innerText = 'Please select a file.';
    return;
  }

  const reader = new FileReader();

  reader.onload = function (e) {
    const content = e.target.result;
    const isins = parseFileContent(content);

    // Display ISINs in the table
    displayISINs(isins, tableContainer); // Pass the table container
    feedbackText.innerText = 'File uploaded successfully.';
  };

  reader.readAsText(file);
}

function displayISINs(isins, tableContainer) {
  const table = document.createElement('table');
  table.border = '1';

  // Add table header
  const headerRow = table.insertRow();
  const headerCell = headerRow.insertCell(0);
  headerCell.innerText = 'ISIN';

  // Add table rows with ISINs
  for (const isin of isins) {
    const row = table.insertRow();
    const cell = row.insertCell(0);
    cell.innerText = isin;
  }

  // Replace existing table (if any) with the new one
  while (tableContainer.firstChild) {
    tableContainer.removeChild(tableContainer.firstChild);
  }

  tableContainer.appendChild(table);
}
