# BUG-033 — Reset de senha sem verificação de identidade

**Severidade:** Crítica
**Prioridade:** Alta
**Categoria:** Segurança

## Passos para Reproduzir
1. Acessar a aplicação em `http://localhost:3000`
2. Clicar em "Esqueceu sua senha?"
3. Digitar o username de qualquer usuário existente
4. Digitar uma nova senha qualquer
5. Clicar em "Resetar Senha"

## Resultado Esperado
Sistema deve verificar a identidade do usuário antes de permitir a troca de senha, por exemplo via email de confirmação ou código de verificação.

## Resultado Atual
Sistema redefine a senha imediatamente sem nenhuma verificação. Qualquer pessoa que conheça o username de outro usuário consegue trocar a senha da conta sem autorização.

## Evidência
Testado manualmente: ao inserir um username válido e uma nova senha, o sistema confirma a alteração sem nenhum desafio de identidade. O próprio código fonte documenta o problema:
```js
// BUG 47: Não pede email ou código de verificação
```

## Impacto
Permite que qualquer usuário tome controle de qualquer conta da plataforma apenas conhecendo o username, comprometendo toda a segurança do sistema.

## Sugestão de Correção
Implementar fluxo de verificação antes do reset:
1. Solicitar o email cadastrado
2. Enviar código de verificação por email
3. Validar o código antes de permitir a troca de senha