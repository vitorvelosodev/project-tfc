# README - TFC (Tabela de Futebol e Classificação)

Este é o README do projeto TFC, que consiste em um site informativo sobre partidas e classificações de futebol. Neste projeto, o foco é o desenvolvimento do back-end dockerizado e integração com o front-end por meio de uma API, seguindo regras de negócio específicas.

# Executando a Aplicação com Docker

Se preferir executar a aplicação usando Docker, siga as instruções abaixo.

## Pré-requisitos

Certifique-se de atender aos seguintes requisitos:

- O seu `docker-compose` deve estar na versão 1.29 ou superior. Se necessário, consulte a documentação para atualizar.

## Inicializando os Serviços

Para iniciar os serviços Node.js e MySQL em containers Docker, siga os passos abaixo:

1. Abra o terminal.

2. Navegue até o diretório raiz do projeto onde está localizado o arquivo `docker-compose.yml`.

3. Execute o seguinte comando para construir e iniciar os containers:

   ```bash
   docker-compose up -d --build
   
Certifique-se de que o MySQL local não esteja em execução na porta padrão (3306) ou faça as adaptações necessárias nas configurações se você desejar utilizar a aplicação em containers.

## Acessando o Terminal Interativo do Container
Para acessar o terminal interativo do container onde a aplicação está sendo executada, utilize o seguinte comando:
   ```bash
   docker exec -it blogs_api
   ```

Isso permitirá que você acesse o terminal dentro do container em execução.

## Instalando Dependências (Dentro do Container)
Dentro do container, você pode instalar as dependências necessárias com o seguinte comando:

   ```bash
   npm install
   ```

### ⚠️ Atenção:

Todos os comandos disponíveis no package.json (como npm start, npm test, npm run dev, etc.) devem ser executados dentro do container, ou seja, no terminal aberto após a execução do comando docker exec mencionado acima.

O Git dentro do container não virá configurado com suas credenciais. Você pode optar por fazer commits fora do container ou configurar suas credenciais do Git dentro do container conforme necessário.

Evite rodar o comando npm audit fix, pois ele atualizará várias dependências do projeto e pode gerar conflitos com o avaliador.

## ✨ Dica
A extensão "Remote - Containers" do Visual Studio Code é recomendada para desenvolver sua aplicação diretamente no container Docker, como se estivesse trabalhando com seus arquivos locais.

## Descrição do Projeto

O projeto TFC é uma aplicação que fornece informações sobre partidas de futebol e a classificação dos times. Ele inclui os seguintes fluxos principais:

### Fluxo 1: Times (Teams)

Neste fluxo, lidamos com informações relacionadas aos times de futebol. Os principais requisitos incluem:

- Desenvolver migrations e models para a tabela de times.
- Implementar um endpoint `/teams` que retorna todos os times.
- Implementar um endpoint `/teams/:id` que retorna dados de um time específico.

### Fluxo 2: Usuários e Login

Neste fluxo, tratamos das operações de autenticação e usuários. Os principais requisitos incluem:

- Desenvolver migrations e models para a tabela de pessoas usuárias.
- Implementar um endpoint `/login` para autenticação, com validação de email e senha.
- Implementar um middleware de validação de token.
- Implementar um endpoint `/login/role` que retorna o tipo de usuário.

### Fluxo 3: Partidas (Matches)

Neste fluxo, lidamos com informações relacionadas às partidas de futebol. Os principais requisitos incluem:

- Desenvolver migrations e models para a tabela de partidas.
- Implementar um endpoint `/matches` que retorna todas as partidas.
- Implementar filtros para partidas em andamento e partidas finalizadas.
- Implementar endpoints para finalizar e atualizar partidas em andamento.
- Implementar um endpoint para cadastrar novas partidas.

### Fluxo 4: Placares (Leaderboards)

Neste fluxo, trabalhamos com classificações de times, considerando jogos em casa e jogos fora de casa. Os principais requisitos incluem:

- Implementar um endpoint `/leaderboard/home` que retorna informações sobre o desempenho dos times da casa.
- Implementar um endpoint `/leaderboard/away` que retorna informações sobre o desempenho dos times visitantes.
- Implementar um endpoint `/leaderboard` que retorna a classificação geral dos times.

**Observações Importantes:**

- Todos os endpoints devem ser protegidos por autenticação por meio de tokens.
- A encriptação de senhas é obrigatória.
- Certifique-se de cumprir as regras de negócio e as porcentagens mínimas de cobertura de testes definidas.

**Nota:** Lembre-se de manter uma documentação atualizada e detalhada ao longo do desenvolvimento do projeto, incluindo instruções para configurar o ambiente de desenvolvimento, executar testes e implantar a aplicação, se aplicável.
