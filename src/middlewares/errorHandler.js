import 'express-async-errors';

export default function errorHandler(error, request, response, next) {
  console.log(error);
  response.sendStatus(500);
}
