# CRUD utilizando Node com: Mysql e ORM Sequelize fornecendo uma API via Express

Foi realizado com base no tutorial de Luiz Duarte "Tutorial de CRUD com Node.js, Sequelize e MySQL" e "Criando uma WebAPI com Node.js e MySQL", com as devidas adequações que julguei necessárias para trabalhar com API desacoplando as funções de criação, busca, atualização e deleção; isso propicia que elas possam ser utilizadas para qualquer Model com quantidade de atributos variados. Não é algo ideal mas garante uma ceta flexibilidade e generalização. Fiz adaptações que agregam valor aos tutoriais aqui citados. Fonte: https://www.luiztools.com.br/post/tutorial-de-crud-com-node-js-sequelize-e-mysql/ e https://www.luiztools.com.br/post/criando-uma-webapi-com-nodejs-e-mysql/

Presumo que você já tenha um ambiente NodeJS instalado em seu computador. Caso não tenha providencie baixar e instalar o arquivo de instalação correspondente ao seu Sistema Operacional. O Node utilizado neste projeto foi o 16.14.2 com o npm 8.5.0 que acompanha o mesmo. Assim como o Docker, também instalado e funcionando, para que possa criar o container do banco de dados MySQL.

## Passos necessários para executar este projeto:

1. Clone este repositório:
   `$ git clone https://github.com/emersonccf/nodemysql-sequelize.git`

2. Execute, no diretório raiz do projeto o comando, o comando a seguir para instalar as dependências do projeto contidas no arquivo package.json, isto irá criar a pasta `node_modules` com todas as dependências:
   `$ npm install`

3. Carregue o container do SGBD, quando copiar o código abaixo descarte a observação para que não ocorra erros ao executá-lo:

### no Linux ou Mac (sistemas Unix)

```
   $ docker run \
   -dp 3306:3306 \
   --name mysql_node \
   -v datamysql57:/var/lib/mysql \
   -e MYSQL_ROOT_PASSWORD=1234 \ # use your own password (when copying discard this observation)
   -e MYSQL_DATABASE=nodemysql \
   mysql:5.7
```

ou

### no PowerShell do Windows

```
   $ docker run `
   -dp 3306:3306 `
   --name mysql_node `
   -v datamysql57:/var/lib/mysql `
   -e MYSQL_ROOT_PASSWORD=1234 ` # use your own password (when copying discard this observation)
   -e MYSQL_DATABASE=nodemysql `
   mysql:5.7
```

4. Crie um arquivo chamado .env.js na pasta raiz deste projeto, nele você irá colocar a senha do usuário root do banco de dados

   ATENÇÃO: conteúdo do arquivo .env.js . Este arquivo não deve ser versionado pois contem dados sensíveis da aplicação.

   ```
   const databaseSettings = {
   database: 'nodemysql',
   user: 'root',
   password: '1234',
   }

   const databaseConnection = {
      dialect: 'mysql',
      host: 'localhost'
   }

   module.exports = {
      databaseSettings,
      databaseConnection
   }
   ```

5. Execute o comando a seguir, no diretório raiz do projeto o comando, para inicializar a API de manipulação de cadastro de clientes:

### No modo desenvolvedor:

`$ npm run dev`

ou

### No modo produção:

`$ npm start`

6. Por Fim, carregue alguns alguns registros para que possamos utilizar e testar nossa API. Para executar este passo certifique-se que o container do banco de dados está em execução (`$ docker ps -a`), verifique na lista que será exibida se mysql_node está em `Up..`, caso não execute `$ docker start mysql_node` ou repita o passo 3; NÃO EXECUTE ESTE PASSO ANTES DO ANTERIOR, pois ao executa o passo 5 é criado o banco de dados automaticamente no MySQL. Quando executar o comando abaixo será solicitada a senha do banco de dados, forneça a senha correta para que o comando seja executado sem falhas:
   - Importar dados:
   ```
      $ docker cp ./backup_nodemysql.sql mysql_node:/ && docker exec -it mysql_node bash -c 'mysql -u root -p nodemysql < backup_nodemysql.sql'
   ```
   - Exportar dados, caso necessite fazer um backup dos dados ao final do trabalho:
   ```
      $ docker exec -it mysql_node mysqldump -u root -p nodemysql > backup_nodemysql.sql
   ```

Para manipulação da API pode ser utilizado o comando `curl` ou o aplicativo Postman, irei exemplificar aqui como fazer as requisições através através do comando `curl`, deixe um terminal executando a aplicação `$ npm run dev` e em outro execute as instruções a seguir:

1. GET na rota '/' da API:
   `$ curl -X GET http://localhost:3000/`

   - Deve retornar a seguinte resposta:
     `{"message":"Rota raiz funcionando: com Express e Sequelize!"}`

2. GET na rota '/clientes':
   `$ curl -X GET http://localhost:3000/clientes`

   - Deve retornar a seguinte resposta:
     ```
     [
        {"id":1,"nome":"Carlos Almeida","cpf":"12345678901","createdAt":"2022-04-07T01:23:22.000Z","updatedAt":"2022-04-07T01:23:22.000Z"},
        {"id":2,"nome":"Ana Santos","cpf":"09876543210","createdAt":"2022-04-07T01:27:14.000Z","updatedAt":"2022-04-07T01:27:14.000Z"},
        {"id":3,"nome":"Emerson Ferreira","cpf":"12312312399","createdAt":"2022-04-07T01:28:19.000Z","updatedAt":"2022-04-07T01:28:19.000Z"}
      ]
     ```

3. GET na rota '/clientes/1', pesquisando um cliente por id=1:
   `$ curl -X GET http://localhost:3000/clientes/1`

   - Deve retornar a seguinte resposta:
     `[ {"id":1,"nome":"Carlos Almeida","cpf":"12345678901"}]`

4. DELETE na rota '/clientes/1', deletando um cliente por id=1:
   `$ curl -X DELETE http://localhost:3000/clientes/1`

   - Deve retornar a seguinte resposta: `1` Que representa a quantidade de registros afetados pela solicitação. Se quiser conferir quantos clientes exitem agora repita o passo 2.
     `1`

5. POST na rota '/clientes', inserindo um cliente na base de dados:
   `$ curl -X POST -d "nome=Caetano Veloso&cpf=22222233354" http://localhost:3000/clientes`

   - Deve retornar a seguinte resposta, um JSON contendo todos os dados do cliente recentemente inserido, inclusive seu id. Se quiser conferir quantos clientes exitem agora repita o passo 2.
     `{"id":4,"nome":"Caetano Veloso","cpf":"22222233354","updatedAt":"2022-04-09T04:56:01.941Z","createdAt":"2022-04-09T04:56:01.941Z"}`

6. PATCH na rota '/clientes/2', atualizando dados de um cliente pelo id:
   `$ curl -X PATCH -d "nome=Maria Rita&cpf=09876543210" http://localhost:3000/clientes/2`

   - Ana Santos de id=2 passará a ser Maria Rita mantendo o mesmo CPF

   - Deve retornar a seguinte resposta, um JSON contendo todos os dados do cliente já com as alterações efetivadas, demostrando que o registro sofreu mudanças. Se quiser conferir as alterações realizadas no cliente repita o passo 2.
     `{"id":2,"nome":"Maria Rita","cpf":"09876543210","createdAt":"2022-04-07T01:27:14.000Z","updatedAt":"2022-04-09T05:00:38.143Z"}`

## Esta é uma breve e singela demostração de todo poder e recursos que estas ferramentas podem produzir em conjunto. Agora você pode utilizar este material para estudar em conjunto com os tutoriais aqui citados.
