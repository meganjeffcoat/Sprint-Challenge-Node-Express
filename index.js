// play this: https://www.youtube.com/watch?v=d-diB65scQU

// code away!

const server = require('./server');

const port = process.env.PORT || 5000;
server.listen(port, () => console.log(`\nAPI running on port ${port}\n`));
