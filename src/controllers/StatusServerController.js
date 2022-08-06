/**
 * Implementação do projeto ultilizando a arquitetura limpa
 * Controller se torna responsável apenas por utilizar:
 *  Os casos de usos,
 *  Os repositorys
 *  E receber o request e responder com o response.
 */
export default {
  statusServer(request, response) {
    response.status(200).json({ alive: true });
  },
};
