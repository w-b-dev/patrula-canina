# THE GAME

THE PLAYER MUST CHOOSE A CATEGORY TO PLAY.

> SO THE VERY FIRST SCREEN IS THE **PLAYER SELECTION SCREEN**.

THE PLAYER MUST CHOOSE A CATEGORY (AND POSSIBLY A DIFFICULTY LEVEL ASSOCIATED WITH IT).

> THE SCREEN FOLLOWING THE PLAYER SELECTION IS THE **CATEGORY SELECTION SCREEN**.

FINALLY THE PLAYER IS PRESENTED WITH A QUESTION AND TWO ANSWERS.

> THE SCREEN FOLLOWING THE CATEGORY SELECTION IS THE **QUESTION SCREEN**.

NOW IT IS THE MEAT OF THE GAME:

- ON THE QUESTION SCREEN, THE PLAYER CHOOSES AN ANSWER.
  - IF THE ANSWER IS CORRECT, THE SCREEN CHANGES FOR THE NEXT QUESTION.
  - IF THE ANSWER IS INCORRECT, THE OPTION CHOSEN IS DISABLED AND THE PLAYER CONTINUES ON THE SAME SCREEN.
    > REGARDLESS OF THE CORRECTNESS, ANY ACTION WILL **CREDIT** OR **SUBTRACT** POINTS FROM THE PLAYER'S STATS.

## THE QUESTION SCREEN

THE QUESTION SCREEN IS THE MOST IMPORTANT SCREEN IN THE GAME.

> IT IS THE SCREEN THAT THE PLAYER WILL BE USING THE MOST.

HOW I SEE ITS LAYOUT:

- HEADER
  - LOGO
  - NAME OF THE CURRENT ACTIVE USER
- MAIN USER DASHBOARD
  - GAME STATS FOR THE CURRENT USER
    - NUMBER OF CORRECT QUESTIONS ANSWERED
    - NUMBER OF INCORRECT QUESTIONS ANSWERED
    - ~~TIME SPEND ON THE CURRENT QUESTION~~
- THE QUESTION (AKA `BASE CARD`)
  - GIVEN A CERTAIN CATEGORY WAS PREVIOUSLY DECIDED ON, AN ENTRY IS RANDOMLY SELECTED FROM THE DATABASE.
  - EACH ENTRY HAS ITS OWN PROPERTIES, SUCH AS:
    - CATEGORY
    - NAME
    - BASE IMAGES ASSOCIATED WITH IT
    - **RELATED IMAGES ASSOCIATED WITH IT**
- THE ANSWERS (AKA `RELATED CARDS`)
  > THE TWO/THREE/X CARDS PRESENTED HERE FOO
  - CARD 1 <-- THE CONTENT HERE COMES FROM THE ENTRY LOADED IN `CARD 1`
    - IMAGE
    - NAME
  - CARD 2 <-- THE CONTENT HERE COMES FROM THE ENTRY LOADED IN `CARD 2`
    - IMAGE
    - NAME
  - BUTTONS
    - **SUBMIT**
    - **SKIP**
    - **EXIT**
- FOOTER

## Front End

[Link para a imagem original](https://docs.google.com/presentation/d/1bXE5zhl2eTDUXlpknz8bSeav3oXDIyf4kNtnIt3UI4c/edit?usp=sharing) <img width="933" alt="image" src="https://user-images.githubusercontent.com/18291038/163624833-00288d1a-6a37-4690-8a6a-1ecd40c5ed14.png">

- Permite um usuario nao logado jogar
- O jogo consiste em:
  - mostrar uma foto de animal (stock ou personalisada) no painel superior
  - mostrar duas (ou X) rostos (desenho) dos membros da patrulha canina no painel inferior
  - o objetivo eh acertar (em baixo) qual o membro que eh da raca do cao (acima)

O usuario logado:

- Pode carregar fotos associadas a cada membro da patrulha canina (tela #2)
- E pode ter o historico de acertos registrado

<img width="933" alt="image" src="https://user-images.githubusercontent.com/18291038/163624977-40b187d5-9330-433d-a24f-757b050d5e28.png">

## API

COMO O GITHUB ARMAZENA AS IMAGES COLADAS DO CLIPBOARD?

- `https://user-images.githubusercontent.com/18291038/163624833-00288d1a-6a37-4690-8a6a-1ecd40c5ed14.png`

- Retorna um JSON com os dados de cada membro da patrulha canina
  - GET Dados stock (PC_ID, nome, raca, habilidade, etc)
- Armazena dados do usuario no banco de dados
  - Ver [abaixo](BANCO-DE-DADOS)
- Proxy para a API de armazenamento de imagens (Amazon S3)
  - GET retorna imagens stock
  - GET retorna imagens do usuario (precisa de caminho especifico, mas nao de token)
  - POST salva imagens do usuario

## Banco de dados

- Armazena cada novo usuario; cada usuario tem
  - id, email
  - URL S3 com fotos personalizadas associadas a cada membro da patrulha canina (cada uma com seu id, e endereco no S3)
  - historico de jogos (timestamp, e pontuacao)

# Proposta FASE 1

- UI simples que pega dados da API (tudo anonimo; sem login)
- API consulta banco de dados com informacoes sobre Patrulha Canina e fotos stock (url publicas)
