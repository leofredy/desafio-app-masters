# API do projeto de doação de computador.

## Projeto em produção.
[Link API](https://api-doacao-pc-app-master.herokuapp.com/)
### Endpoints:
- Verificação de vida da API:
  #### GET: '/'

- Cria uma doação:
  #### POST: /donation
  #### Request body:
```
  {
    "name": "any",
    "email": "any@any.com",
    "phone": "99999999999",
    "zip": "99999999",
    "city": "any city",
    "state": "AA",
    "streetAddress": "R. Any",
    "number": "999",
    "complement": "",
    "neighborhood": "sim",
    "deviceCount": 1,
    "devices": [{
      "type": "notebook",
      "condition": "working"
    }]
  }
```
  #### Responses:
```
{
  "success": true
}
```



### Comandos do projeto:
* Inicia em modo de produção
```
  npm run start
```
* Inicia em modo de desenvolvimento
```
  npm run dev
```
* Realiza testes e2e
```
  npm run test
```
