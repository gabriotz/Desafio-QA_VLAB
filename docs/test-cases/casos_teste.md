# Casos de Teste — Sistema de Autenticação e Coleta de Dados

---

## CT-001 — Login com credenciais válidas

**Pré-condição:** Usuário `admin` cadastrado com senha `admin123`. Aplicação rodando em `http://localhost:3000`.

**Passos:**
1. Acessar `http://localhost:3000`
2. Preencher o campo "Usuário" com `admin`
3. Preencher o campo "Senha" com `admin123`
4. Clicar em "Entrar"

**Resultado Esperado:** Usuário é redirecionado para `/dashboard` com sucesso.

---

## CT-002 — Login com senha incorreta

**Pré-condição:** Usuário `admin` cadastrado. Aplicação rodando.

**Passos:**
1. Acessar `http://localhost:3000`
2. Preencher o campo "Usuário" com `admin`
3. Preencher o campo "Senha" com `senhaerrada`
4. Clicar em "Entrar"

**Resultado Esperado:** Mensagem de erro é exibida. Usuário permanece na tela de login.

---

## CT-003 — Login com campos vazios

**Pré-condição:** Aplicação rodando em `http://localhost:3000`.

**Passos:**
1. Acessar `http://localhost:3000`
2. Não preencher nenhum campo
3. Clicar em "Entrar"

**Resultado Esperado:** Mensagem de erro solicitando preenchimento dos campos é exibida.

---

## CT-004 — Acesso direto ao dashboard sem autenticação

**Pré-condição:** Usuário não autenticado. Aplicação rodando.

**Passos:**
1. Sem realizar login, acessar diretamente `http://localhost:3000/dashboard`

**Resultado Esperado:** Usuário é redirecionado para a tela de login em `/`.

---

## CT-005 — Registro com dados válidos

**Pré-condição:** Aplicação rodando. Usuário ainda não cadastrado.

**Passos:**
1. Acessar `http://localhost:3000`
2. Clicar na aba "Registrar"
3. Preencher "Usuário" com `novouser123`
4. Preencher "Email" com `novouser@test.com`
5. Preencher "Senha" com `Password123`
6. Preencher "Confirmar Senha" com `Password123`
7. Clicar em "Registrar"

**Resultado Esperado:** Conta criada com sucesso. Mensagem de sucesso exibida.

---

## CT-006 — Registro com senhas diferentes

**Pré-condição:** Aplicação rodando.

**Passos:**
1. Acessar `http://localhost:3000`
2. Clicar na aba "Registrar"
3. Preencher todos os campos válidos
4. Preencher "Senha" com `Password123`
5. Preencher "Confirmar Senha" com `Diferente456`
6. Clicar em "Registrar"

**Resultado Esperado:** Mensagem de erro informando que as senhas não coincidem.

---

## CT-007 — [BUG-029] Registro com espaço no username

**Pré-condição:** Aplicação rodando.

**Passos:**
1. Acessar `http://localhost:3000`
2. Clicar na aba "Registrar"
3. Preencher "Usuário" com `gab riel`
4. Preencher os demais campos com valores válidos
5. Clicar em "Registrar"

**Resultado Esperado:** Mensagem de erro informando que o username não pode conter espaços.

**Resultado Atual (Bug):** Sistema registra o usuário sem exibir nenhum erro.

---

## CT-008 — Submeter coleta com dados válidos

**Pré-condição:** Usuário autenticado. Aplicação rodando em `/coleta`.

**Passos:**
1. Logar com `admin / admin123`
2. Navegar para `/coleta`
3. Preencher "ID do Beneficiário" com `001`
4. Preencher "Nome Completo" com `João Silva`
5. Preencher "Taxa de Conclusão" com `80`
6. Preencher "Frequência de Presença" com `90`
7. Preencher "Nota de Avaliação" com `8`
8. Preencher "Progresso Técnico" com `100`
9. Selecionar status "Completo"
10. Clicar em "Submeter Coleta"

**Resultado Esperado:** Mensagem de sucesso exibida. Coleta registrada no sistema.

---

## CT-009 — [BUG-046] Frequência de Presença acima de 100%

**Pré-condição:** Usuário autenticado. Aplicação rodando em `/coleta`.

**Passos:**
1. Logar com `admin / admin123`
2. Navegar para `/coleta`
3. Preencher todos os campos com valores válidos
4. Preencher "Frequência de Presença (%)" com `150`
5. Clicar em "Submeter Coleta"

**Resultado Esperado:** Mensagem de erro informando que a frequência não pode ultrapassar 100%.

**Resultado Atual (Bug):** Sistema aceita o valor e registra a coleta normalmente.

---

## CT-010 — [BUG-052] Histórico expõe dados de outros usuários

**Pré-condição:** Dois usuários cadastrados: `admin` e `gab`. Ambos com coletas registradas.

**Passos:**
1. Logar com o usuário `gab`
2. Navegar para `/coleta`
3. Clicar na aba "Histórico"
4. Clicar em "Carregar Histórico"

**Resultado Esperado:** Apenas as coletas do usuário `gab` são exibidas.

**Resultado Atual (Bug):** Histórico exibe coletas de todos os usuários, incluindo as do `admin`.

---

## CT-011 — [BUG-033] Reset de senha sem verificação de identidade

**Pré-condição:** Usuário `admin` cadastrado. Aplicação rodando.

**Passos:**
1. Acessar `http://localhost:3000`
2. Clicar em "Esqueceu sua senha?"
3. Preencher "Usuário" com `admin`
4. Preencher "Nova Senha" com `novaSenha123`
5. Clicar em "Resetar Senha"

**Resultado Esperado:** Sistema solicita verificação de identidade antes de permitir a troca (ex: código por email).

**Resultado Atual (Bug):** Senha é redefinida imediatamente sem nenhuma confirmação de identidade.