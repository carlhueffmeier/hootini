const { map, prop } = require('../lib/functionalUtils');

function createSimpleBatchLoader(loadAll, batchSize) {
  let queue = [];

  function load(document) {
    return new Promise((resolve, reject) => {
      queue.push({ document, resolve, reject });
      if (queue.length === batchSize) {
        start();
      }
    });
  }

  function start() {
    loadAll(map(prop('document'), queue))
      .then(() => queue.forEach(i => i.resolve()))
      .catch(error => queue.forEach(i => i.reject(error)));
    queue = [];
  }

  return {
    load,
    start
  };
}

exports.createSimpleBatchLoader = createSimpleBatchLoader;
