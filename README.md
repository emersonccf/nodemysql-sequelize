# CRUD utilizando Node com Mysql com ORM Sequelize

Fonte: https://www.luiztools.com.br/post/tutorial-de-crud-com-node-js-sequelize-e-mysql/

Presumo que você já tenha um ambiente NodeJS instalado em seu computador. Caso não tenha providencie baixar e instalar o arquivo de instalação correspondente ao seu Sistema Operacional. O Node utilizado neste projeto foi o 16.14.2 com o npm 8.5.0 que acompanha o mesmo. Assim como o Docker instalado para que possa criar o container do banco de dados.

## Passos necessários para executar este projeto:

1. Clone este repositório:
   `$ git clone ...`

2. Execute, no diretório raiz do projeto o comando, o comando a seguir para instalar as dependências do projeto contidas no arquivo package.json:
   `$ npm install`

3. Carregue o container do SGBD, quando copiar o código abaixo descarte a observação para que não ocorra erros ao executá-lo:

### no Linux ou Mac (sistemas Unix)

    <code>
    $ docker run \
    -dp 3306:3306 \
    --name mysql_node \
    -v datamysql57:/var/lib/mysql \
    -e MYSQL_ROOT_PASSWORD=1234 \ # use your own password (when copying discard this observation)
    -e MYSQL_DATABASE=nodemysql \
    mysql:5.7
    </code>

ou

### no PowerShell do Windows

    <code>
    $ docker run `
    -dp 3306:3306 `
    --name mysql_node `
    -v datamysql57:/var/lib/mysql `
    -e MYSQL_ROOT_PASSWORD=1234 ` # use your own password (when copying discard this observation)
    -e MYSQL_DATABASE=nodemysql `
    mysql:5.7
    </code>

4. Crie um arquivo chamado .env.js na pasta raiz deste projeto, nele você irá colocar a senha do usuário root do banco de dados

   ATENÇÃO: conteúdo do arquivo .env.js . Este arquivo não deve ser versionado.

   ```
      const passwordBD = '1234' // use your own password
      module.exports = {passwordBD}
   ```

5. Execute, no diretório raiz do projeto o comando, para que seja criada a tabela na base de dados nodemysql e populada com alguns registros:
   `$ node create-table.js`

6. Por Fim, execute o comando a seguir, no diretório raiz do projeto o comando, para inicializar a API de manipulação de cadastro de clientes:

### No modo desenvolvedor:

`$ npm run dev`

ou

### No modo produção:

`$ npm start`

Para manipulação da API pode ser utilizado o comando `curl` ou o aplicativo Postman, irei exemplificar aqui como fazer as requisições através através do comando `curl`:

1. GET na rota '/' da API:
   `$ curl -X GET http://localhost:3000/`

   - Deve retornar a seguinte resposta:
     `{"message":"Rota raiz funcionando!"}`

2. GET na rota '/clientes':
   `$ curl -X GET http://localhost:3000/clientes`

   - Deve retornar a seguinte resposta:
     `[ {"id":1,"nome":"Carlos Almeida","cpf":"12345678901"}, {"id":2,"nome":"Ana Santos","cpf":"09876543210"}, {"id":3,"nome":"Emerson Ferreira","cpf":"12312312399"} ]`

3. GET na rota '/clientes/1', pesquisando um cliente por id=1:
   `$ curl -X GET http://localhost:3000/clientes/1`

   - Deve retornar a seguinte resposta:
     `[ {"id":1,"nome":"Carlos Almeida","cpf":"12345678901"}]`

4. DELETE na rota '/clientes/1', deletando um cliente por id=1:
   `$ curl -X DELETE http://localhost:3000/clientes/1`

   - Deve retornar a seguinte resposta, um JSON com o atributo "affectedRows":1. Se quiser conferir quantos clientes exitem agora repita o passo 2.
     `{"fieldCount":0,"affectedRows":1,"insertId":0,"serverStatus":2,"warningCount":0,"message":"","protocol41":true,"changedRows":0}`

5. POST na rota '/clientes', inserindo um cliente na base de dados:
   `$ curl -X POST -d "nome=Caetano Veloso&cpf=22222233354" http://localhost:3000/clientes`

   - Deve retornar a seguinte resposta, um JSON com o atributo "affectedRows":1 e "insertId":4 o id do cliente recentemente inserido. Se quiser conferir quantos clientes exitem agora repita o passo 2.
     `{"fieldCount":0,"affectedRows":1,"insertId":4,"serverStatus":2,"warningCount":0,"message":"","protocol41":true,"changedRows":0}`

6. PATCH na rota '/clientes/1', atualizando dados de um cliente pelo id:
   `$ curl -X PATCH -d "nome=Maria Rita&cpf=09876543210" http://localhost:3000/clientes/2`

   - Ana Santos de id=2 passará a ser Maria Rita mantendo o mesmo CPF

   - Deve retornar a seguinte resposta, um JSON com o atributo "affectedRows":1, "message":"(Rows matched: 1 Changed: 1 Warnings: 0" e "changedRows":1, demostrando que um registro sofreu alteração. Se quiser conferir as alterações realizadas no cliente repita o passo 2.
     `{"fieldCount":0,"affectedRows":1,"insertId":0,"serverStatus":2,"warningCount":0,"message":"(Rows matched: 1 Changed: 1 Warnings: 0","protocol41":true,"changedRows":1}`
