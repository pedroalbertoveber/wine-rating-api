# Wine Rating App

An app made for rate the bests wines in the world.

# RF's (Requisitos Funcionais)
- [x] Deve ser possível se cadastrar
- [x] Deve ser possível se autenticar
- [x] Deve ser possível obter o perfil do usuário logado
- [x] Deve ser possível buscar todos os vinhos
- [x] Deve ser possível buscar vinhos através do nome
- [x] Deve ser possível buscar vinhos pelo país de origem
- [x] Deve ser possível avaliar um vinho
- [x] Deve ser possível obter o histórico de vinhos avaliados por usuário
- [x] Deve ser possível obter o histórico de avaliação por vinho
- [x] Deve ser possível obter a média de avaliação de um vinho
- [x] Deve ser possível cadastrar um vinho
- [x] Deve ser possível editar um vinho

# RN's (Regras de Negócio)
- [x] O usuário não pode se cadastrar um e-mail duplicado
- [x] O usuário não pode avaliar duas vezes o mesmo vinho
- [ ] O vinho só pode ser cadastrado/editado por administradores
- [ ] O vinho só pode ser avaliado por usuários

# RNF's (Requisitos Não-Funcionais)
- [x] A senha do usuário precisa estar criptografada
- [x] Os dados da aplicação precisam estar persistidos em um banco PostgreSQL
- [x] Todas as listas de dados precisam estar paginadas com 20 ítens por página
- [x] O usuário deve ser identificado por um JWT (JSON Web Token)

# Nexts Tasks
- [x] - Criar Factories
- [x] - Criar Casos de Usos no repositório Prisma
- [x] - Chamar as funções use-cases no controller
- [x] - Criação de Token JWT
- [x] - Testes E2E