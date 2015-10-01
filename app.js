const express = require('express');
const app = express();

const PORT = 25792;

app.listen(PORT, function () {
  console.log(`Server running at http://localhost:${PORT}/`);
});

let drop = document.getElementsByTagName('body')[0];

function handleDrop(e) {
  e.stopPropagation();
  e.preventDefault();

  // Dropped file.
  let file = e.dataTransfer.files[0];

  // Make it downloadable on the root
  app.get('/', function (req, res) {
    res.download(file.path);
  });

  // Clear dragging style
  drop.classList.remove('dragover');
}

function handleDragover(e) {
  e.stopPropagation();
  e.preventDefault();
  drop.classList.add('dragover');
}

function handleDragleave(e) {
  e.stopPropagation();
  e.preventDefault();
  drop.classList.remove('dragover');
}

// Delegate all drop events to <body>
drop.addEventListener('dragenter', handleDragover, false);
drop.addEventListener('dragleave', handleDragleave, false);
drop.addEventListener('dragover', handleDragover, false);
drop.addEventListener('drop', handleDrop, false);
