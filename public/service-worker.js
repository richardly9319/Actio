self.addEventListener('install', (event) => {
    // Cache resources here
    console.log("install fired");
  });
  
  self.addEventListener('fetch', (event) => {
    // Handle fetch events, serve from cache, etc.
  });
  