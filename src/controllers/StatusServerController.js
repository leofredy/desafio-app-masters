export default {
  statusServer(request, response) {
    response.status(200).json({ alive: true });
  },
};
