const http = require('http');
const network = require('network');
const ping = require('tcp-ping');
const express = require('express');
const app = express();

const PORT = 25792;
const HOST = '0.0.0.0';
var gatewayPrefix;
var connectedComputers = [];

app.listen(PORT, function () {
  console.log(`Server running at http://${HOST}:${PORT}/`);
});


network.get_private_ip(function(err, ip) {
  if (err) {
    return null;
  } else {
    const byteArray = ip.split('.');
    const localByte = Number(byteArray.pop());
    gatewayPrefix = byteArray.join('.');

    for (let i = 0; i < 256; i++) {
      ping.probe(`${gatewayPrefix}.${i}`, PORT, function(err, alive) {
        if (alive) {
          connectedComputers.push(i);
        }
      });
    }
  }
});

let drop = document.getElementsByTagName('body')[0];

function handleDrop(e) {
  e.stopPropagation();
  e.preventDefault();

  // Dropped file.
  let file = e.dataTransfer.files[0];
  app.get('/', function (req, res) {
    res.download(file.path);
  });
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
