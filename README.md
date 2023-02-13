# Desafio para o processo seletivo SHARENERGY 2023/01


Desafio proposto pela empresa Sharenergy para a vaga DEV. Backend Junior.

## Instalação

Após clonar o repositório, instale as dependências na raiz do back e do front para poder inicializar o projeto.

```bash
npm install
```
Para rodar o projeto, é necessário utilizar o [Docker](https://www.docker.com/). Certifique-se de que o mesmo está instalado em sua máquina.
Será necessário um container MongoDB
```bash 
docker run --name mongo -p 27017:27017 -d mongo
```
Verifique se o container está em execução usando o comando docker ps. Isso mostrará todos os containers em execução.
Caso ele esteja em execução, basta entrar na raiz do backend e usar o comando:
```bash
npm start
```
Com isso o banco de dados ficará online e já conectado com o Mongoose.
Para inicializar o front, basta ir na raiz do mesmo e utilizar o comando

```bash
vite dev --host 

```

## Desenvolvimento
Para desenvolvimento do projeto, foram usados as seguintes tecnologias, bibliotecas e frameworks:

- Typescript
- React
- Docker
- MaterialUI
- Mongoose
- MongoDB
- Axios
- Validator
- CORS

## Funcionamento


As páginas pedidas ficaram da seguinte forma:


Login Page:
![Login page](https://iili.io/HaRBn3B.png)

Página dos clientes cadastrados
![Clients page](https://iili.io/HaR7roN.png)

Random Dog page
![Dogs page](https://iili.io/HaR1yWx.png)

HTTP Cat page
![Cats page](https://iili.io/HaRlcWQ.png)


## Feedback

Agradeço qualquer feedback em relação ao meu trabalho, independente de contratação ou não.


## Agradecimento

Obrigado a Sharenergy por me considerar para a vaga. Foi um projeto divertido.
