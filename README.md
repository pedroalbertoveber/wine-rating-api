# Wine Rating App

An app made for rate the bests wines in the world.

# RF's (Requisitos Funcionais)
- [x] Deve ser possível se cadastrar
- [x] Deve ser possível se autenticar
- [ ] Deve ser possível obter o perfil do usuário logado
- [x] Deve ser possível buscar todos os vinhos
- [x] Deve ser possível buscar vinhos através do nome
- [x] Deve ser possível buscar vinhos pelo país de origem
- [ ] Deve ser possível avaliar um vinho
- [ ] Deve ser possível obter o histórico de vinhos avaliados por usuário
- [ ] Deve ser possível obter o histórico de vinhos avaliados por vinho
- [x] Deve ser possível cadastrar um vinho
- [ ] Deve ser possível editar um vinho

# RN's (Regras de Negócio)
- [x] O usuário não pode se cadastrar um e-mail duplicado
- [ ] O usuário não pode avaliar duas vezes o mesmo vinho
- [ ] O vinho só pode ser cadastrado/editado por administradores
- [ ] O vinho só pode ser avaliado por usuários

# RNF's (Requisitos Não-Funcionais)
- [x] A senha do usuário precisa estar criptografada
- [ ] Os dados da aplicação precisam estar persistidos em um banco PostgreSQL
- [x] Todas as listas de dados precisam estar paginadas com 20 ítens por página
- [ ] O usuário deve ser identificado por um JWT (JSON Web Token)