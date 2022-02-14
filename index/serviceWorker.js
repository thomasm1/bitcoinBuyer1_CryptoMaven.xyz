self.addEventListener('fetch', function (event) {
    // log all the network requests
    console.log(event.request.url);
  });