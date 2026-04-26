# language: pt

Funcionalidade: Autenticação de Usuários
  Como usuário da plataforma
  Quero conseguir me autenticar e criar uma conta
  Para acessar o sistema com segurança

  # ─────────────────────────────────────────────
  # LOGIN
  # ─────────────────────────────────────────────

  Cenário: Login com credenciais válidas
    Dado que estou na tela de login
    Quando preencho o usuário e senha corretos
    E clico em "Entrar"
    Então sou redirecionado para o dashboard

  Cenário: Login com senha incorreta
    Dado que estou na tela de login
    Quando preencho o usuário correto e uma senha errada
    E clico em "Entrar"
    Então vejo uma mensagem de erro

  Cenário: Login com usuário inexistente
    Dado que estou na tela de login
    Quando preencho um usuário que não existe
    E clico em "Entrar"
    Então vejo uma mensagem de erro

  Cenário: Login com campos vazios
    Dado que estou na tela de login
    Quando clico em "Entrar" sem preencher nenhum campo
    Então vejo uma mensagem de erro

  Cenário: Acesso ao dashboard sem autenticação
    Dado que não estou autenticado
    Quando acesso a URL do dashboard diretamente
    Então sou redirecionado para a tela de login

  Cenário: [BUG-027] Checkbox "Lembrar-me" não persiste sessão
    Dado que estou na tela de login
    Quando marco o checkbox "Lembrar-me"
    E realizo login com credenciais válidas
    E fecho e abro o navegador novamente
    Então deveria permanecer autenticado
    Mas sou redirecionado para a tela de login

  # ─────────────────────────────────────────────
  # REGISTRO
  # ─────────────────────────────────────────────

  Cenário: Registro com dados válidos
    Dado que estou na aba de registro
    Quando preencho todos os campos com dados válidos
    E clico em "Registrar"
    Então a conta é criada com sucesso

  Cenário: Registro com email inválido
    Dado que estou na aba de registro
    Quando preencho o campo de email com um valor inválido
    E clico em "Registrar"
    Então vejo uma mensagem de erro informando email inválido

  Cenário: Registro com senhas diferentes
    Dado que estou na aba de registro
    Quando preencho senhas diferentes nos campos de senha e confirmação
    E clico em "Registrar"
    Então vejo uma mensagem de erro informando que as senhas não coincidem

  Cenário: Registro com campos vazios
    Dado que estou na aba de registro
    Quando clico em "Registrar" sem preencher nenhum campo
    Então vejo uma mensagem de erro

  Cenário: [BUG-029] Username aceita espaços sem validação
    Dado que estou na aba de registro
    Quando preencho o username com espaços (ex: "gab riel")
    E clico em "Registrar"
    Então deveria ver uma mensagem de erro sobre username inválido
    Mas o sistema registra o usuário sem mostrar erro

  Cenário: [BUG-028] Username aceita caracteres especiais
    Dado que estou na aba de registro
    Quando preencho o username com caracteres especiais (ex: "gab@")
    E clico em "Registrar"
    Então deveria ver uma mensagem de erro sobre username inválido
    Mas o sistema registra o usuário sem mostrar erro

  Cenário: [BUG-030] Campo de email com tipo incorreto
    Dado que estou na aba de registro
    Quando inspeciono o campo de email
    Então o atributo type deveria ser "email"
    Mas o atributo type é "text"

  Cenário: [BUG-033] Reset de senha sem verificação de identidade
    Dado que estou na tela de recuperação de senha
    Quando preencho o username de um usuário existente
    E defino uma nova senha
    E clico em "Resetar Senha"
    Então deveria ser solicitada uma verificação de identidade
    Mas a senha é redefinida sem nenhuma confirmação
