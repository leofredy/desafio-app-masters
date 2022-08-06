# API do projeto de doação de computador.

## Informações do projeto:
 - Projeto esta utilizando a arquitetura limpa com o design pattern singloton, e implementação do Data Mapper Patterns com TypeORM.
 
 - No banco de dados esta sendo usado MySQL o diagramado de modelo entidade utilizado é ilustrado abaixo: 
 ![image](https://user-images.githubusercontent.com/62650643/183231851-5fb1fa3a-b306-4d31-b439-a63243e15905.png)


## Projeto em produção.
[Link API](https://api-doacao-pc-app-master.herokuapp.com/)

[Download Collection Postman](https://drive.google.com/file/d/1xAGYifrIhZz32miwMKT2wpnluG842dRr/view?usp=sharing)
### Endpoints:

- Verificação de vida da API:
  #### GET: '/'
  #### Response:
```
  {
    "alive": true
  }
```

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
  "success": true,
  "data": {
      "giverId": 4,
      "donationId": 14,
      "devicesId": [
          24,
          34
      ]
  }
```

- Listagem de doação:
  #### GET: /donation
  #### Request query:
    * Obrigatórios:
      limit: um número.
      offset: um número.

    * Opcional:
      order: 'asc' || 'desc'
      default: 'asc'

<br />
<br />
<h3>* Importante a criação do arquivo env na raiz do projeto, use o .env-example para preenchimento adequado. O projeto utiliza MySQL.
</h3>
<br />
<br />
<br />

### Comandos do projeto:
* Inicia em modo de produção
```
  npm run start
```

* Inicia em modo de desenvolvimento
```
  npm run dev
```

* Criação da database
```
  npm run migration:up
```

* Rollback database
```
  npm run migration:down
```

* Realiza testes e2e
```
  npm run test
```
