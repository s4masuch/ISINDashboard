// isin-upload.js
alert('DOMContentLoaded event listener added');
console.log('DOMContentLoaded event listener added');
document.addEventListener('DOMContentLoaded', function () {
  const uploadButton = document.getElementById('uploadButton');
  uploadButton.addEventListener('click', handleFileUpload);
});

console.log('handleFileUpload function called!');
function handleFileUpload() {
  const fileInput = document.getElementById('fileInput');
  const feedbackText = document.getElementById('feedbackText');

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
    displayISINs(isins);
    feedbackText.innerText = 'File uploaded successfully.';
  };

  reader.readAsText(file);
}

console.log('parseFileContent function called!');
function parseFileContent(content) {
  // Implement your logic to parse the file content and extract ISINs
  // For example, if it's a CSV file, you can split by lines and commas

  const lines = content.split('\n');
  const isins = [];

  for (const line of lines) {
    const columns = line.split(',');
    const isin = columns[0]; // Assuming ISIN is in the first column
    if (isin) {
      isins.push(isin.trim());
    }
  }

  return isins;
}

console.log('displayISINs function called!');
function displayISINs(isins) {
  const feedbackContainer = document.getElementById('feedbackContainer');
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
  while (feedbackContainer.firstChild) {
    feedbackContainer.removeChild(feedbackContainer.firstChild);
  }

  feedbackContainer.appendChild(table);
}
