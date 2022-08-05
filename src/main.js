import connection from './database/connection.js';
import Server from './server.js';

connection.then(() => {
  Server.listen(process.env.PORT || 3333, () => {
    console.log(`Server on in port ${process.env.PORT || 3333}`);
  });
});
