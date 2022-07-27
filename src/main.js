import Server from "./server.js"

Server.listen(process.env.PORT || 3333, () => {
  console.log(`Server on in port ${process.env.PORT || 3333}`);
});