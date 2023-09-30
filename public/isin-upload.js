// Debug log
console.log("isin-upload.js is called");

// Add event listener to the upload button
document.addEventListener("DOMContentLoaded", function () {
  const uploadButton = document.getElementById("uploadButton");
  const fileInput = document.getElementById("fileInput");

  uploadButton.addEventListener("click", function () {
    // Check if a file is selected
    if (fileInput.files.length === 0) {
      alert("Please select a file to upload.");
      return;
    }

    // You can handle the file upload here
    // For example, you can use FormData to send the file to a server
    const formData = new FormData();
    formData.append("file", fileInput.files[0]);

    // Send the formData to the server using fetch or XMLHttpRequest
    // Example using fetch:
    fetch("/upload-endpoint", {
      method: "POST",
      body: formData,
    })
      .then((response) => {
        if (response.ok) {
          alert("File uploaded successfully!");
        } else {
          alert("File upload failed. Please try again.");
        }
      })
      .catch((error) => {
        console.error("Error:", error);
        alert("File upload failed. Please try again.");
      });
  });
});
