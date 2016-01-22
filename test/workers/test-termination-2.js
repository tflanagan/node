// Flags: --experimental-workers
'use strict';

var assert = require('assert');
var Worker = require('worker');
var checks = 0;

if (process.isMainThread) {
  var aWorker = new Worker(__filename);
  aWorker.terminate(function() {
    checks++;
  });
  aWorker.on('message', function() {
    checks++;
  });
  process.on('beforeExit', function() {
    assert.equal(1, checks);
  });
} else {
  while (true)
    Worker.postMessage({hello: 'world'});
}
