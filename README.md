# patrula-canina

API e Front End para retornar os membros da patrulha canina com fotos de animais de verdade

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
