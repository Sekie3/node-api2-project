// require your server and launch it here
const server = require('./api/server');

const PORT = process.env.PORT || 4000;
server.listen(PORT, () => {
  console.log(`Listening on port ${PORT}...`);
});
