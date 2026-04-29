# Desafio QA — VLAB | Sistema de Autenticação e Coleta de Dados

Projeto de automação de testes desenvolvido como parte do processo seletivo para a vaga de estágio em Quality Assurance na VLAB. O objetivo é auditar os módulos de autenticação e coleta de dados de uma plataforma educacional, garantindo a integridade dos fluxos críticos e identificando falhas reais no sistema.

---

## Sumário

- [Stack](#stack)
- [Estrutura do Projeto](#estrutura-do-projeto)
- [Como Rodar](#como-rodar)
- [Estratégia de Testes](#estratégia-de-testes)
- [Cobertura de Testes](#cobertura-de-testes)
- [Bugs Encontrados](#bugs-encontrados)
- [Diferenciais Implementados](#diferenciais-implementados)

---

## Stack

| Ferramenta | Versão | Uso |
|---|---|---|
| Cypress | 15.x | Automação E2E |
| TypeScript | 5.x | Linguagem dos testes |
| Node.js | 22.x | Runtime |
| Docker + Docker Compose | — | Ambiente isolado |
| cypress-axe | 1.7.x | Testes de acessibilidade |

---

## Estrutura do Projeto

```
cypress/
├── e2e/
│   ├── auth/
│   │   ├── login.cy.ts          # Testes do módulo de login
│   │   └── register.cy.ts       # Testes do módulo de registro
│   ├── coleta/
│   │   └── coleta.cy.ts         # Testes do módulo de coleta
│   ├── api/
│   │   └── api-health.cy.ts     # Health check da API
│   └── accessibility/
│       └── accessibility.cy.ts  # Testes de acessibilidade
├── pages/
│   ├── LoginPage.ts             # Page Object — Login
│   ├── RegisterPage.ts          # Page Object — Registro
│   └── ColetaPage.ts            # Page Object — Coleta
├── fixtures/
│   └── users.json               # Dados de teste
features/
├── auth.feature                 # Cenários BDD — Autenticação
└── coleta.feature               # Cenários BDD — Coleta
docs/
├── bug-reports/                 # Relatórios de bugs encontrados
├── casos-de-teste.md            # Casos de teste detalhados
└── checklist-regressao.md       # Checklist de regressão
```

---

## Como Rodar

### Pré-requisitos

- Docker e Docker Compose instalados
- Git

### 1. Clonar o repositório

```bash
git clone https://github.com/gabriotz/Desafio-QA
cd Desafio-QA
```

### 2. Subir o ambiente

```bash
docker compose up -d
```

### 3. Rodar todos os testes

```bash
docker exec -it desafio-qa_vlab-cypress-1 npx cypress run
```

### 4. Rodar um módulo específico

```bash
# Login
docker exec -it desafio-qa_vlab-cypress-1 npx cypress run --spec "cypress/e2e/auth/login.cy.ts"

# Registro
docker exec -it desafio-qa_vlab-cypress-1 npx cypress run --spec "cypress/e2e/auth/register.cy.ts"

# Coleta
docker exec -it desafio-qa_vlab-cypress-1 npx cypress run --spec "cypress/e2e/coleta/coleta.cy.ts"

# Health Check da API
docker exec -it desafio-qa_vlab-cypress-1 npx cypress run --spec "cypress/e2e/api/api-health.cy.ts"

# Acessibilidade
docker exec -it desafio-qa_vlab-cypress-1 npx cypress run --spec "cypress/e2e/accessibility/accessibility.cy.ts"
```

---

## Estratégia de Testes

### Pirâmide de Testes adotada

O projeto foi estruturado seguindo a pirâmide de testes, priorizando testes de maior valor e menor custo de manutenção:

```
        /\
       /  \
      / E2E \         ← Cypress: fluxos completos de ponta a ponta
     /--------\
    / Integração\     ← cy.request: validação direta da API (Health Check)
   /------------\
  /   Unitário   \    ← Validações isoladas de componentes (campos, seletores, atributos HTML)
 /________________\
```

**Testes Unitários** — verificações isoladas de elementos e atributos, como o tipo do campo de email (`type="email"` vs `type="text"`) e a presença de elementos de acessibilidade. Não dependem de navegação ou estado da aplicação.

**Testes de Integração** — realizados via `cy.request` no Health Check, que bate diretamente no endpoint `/login` da API sem passar pelo browser. Valida que o contrato entre frontend e backend está funcionando, o tempo de resposta e os códigos de status.

**Testes E2E (End-to-End)** — simulam o comportamento real do usuário do início ao fim: abrir o browser, navegar, preencher formulários, submeter e verificar o resultado. Cobrem os fluxos de login, registro e coleta de dados.

### Testes Positivos vs Negativos

Cada módulo possui:

- **Testes positivos** — validam que o happy path funciona corretamente
- **Testes negativos** — validam que o sistema rejeita entradas inválidas (campos vazios, dados fora do range, formatos incorretos)
- **Testes de bug** — documentam comportamentos incorretos conhecidos; falham intencionalmente para evidenciar o bug

### Resiliência

- Seletores baseados em `data-testid` — desacoplados de classes CSS e estrutura HTML
- Esperas dinâmicas com `{ timeout }` ao invés de `cy.wait()` fixo
- `#registerMessage` e `#loginMessage` usados ao invés de `[data-testid="message"]` para evitar ambiguidade (3 elementos com o mesmo testid na página)

---

## Cobertura de Testes

### Login (`login.cy.ts`) — 5/5 ✅

| Teste | Resultado |
|---|---|
| Login com credenciais válidas | ✅ Passa |
| Login com senha incorreta | ✅ Passa |
| Login com usuário inexistente | ✅ Passa |
| Login com campos vazios | ✅ Passa |
| Acesso ao dashboard sem autenticação | ✅ Passa |

### Registro (`register.cy.ts`) — 4 passando / 2 falhando (bugs documentados)

| Teste | Resultado |
|---|---|
| Registro com dados válidos | ✅ Passa |
| Email inválido | ✅ Passa |
| Senhas diferentes | ✅ Passa |
| Campos vazios | ✅ Passa |
| [BUG-029] Username com espaços | ❌ Falha — bug confirmado |
| [BUG-030] Campo email type="text" | ❌ Falha — bug confirmado |

### Coleta (`coleta.cy.ts`) — 1 passando / 4 falhando (bugs documentados)

| Teste | Resultado |
|---|---|
| Coleta com dados válidos | ✅ Passa |
| [BUG-045] Taxa de Conclusão negativa | ❌ Falha — bug confirmado |
| [BUG-046] Frequência acima de 100% | ❌ Falha — bug confirmado |
| [BUG-047] Nota acima de 10 | ❌ Falha — bug confirmado |
| [BUG-052] Histórico de todos os usuários | ❌ Falha — bug confirmado |

### Health Check (`api-health.cy.ts`) — 4/4 ✅

| Teste | Resultado |
|---|---|
| POST /login com credenciais válidas retorna 200 | ✅ Passa |
| POST /login com credenciais inválidas retorna erro | ✅ Passa |
| POST /login com campos vazios retorna erro | ✅ Passa |
| API responde em menos de 3 segundos | ✅ Passa |

### Acessibilidade (`accessibility.cy.ts`) — 0/4 (violações reais encontradas)

| Teste | Resultado |
|---|---|
| Sem violações críticas na página de login | ❌ 1 violação crítica encontrada |
| Sem violações de contraste na página de login | ❌ 3 violações de contraste |
| Barra de Governo presente | ❌ Não implementada |
| Sem violações críticas na página de coleta | ❌ 1 violação crítica encontrada |

---

## Bugs Encontrados

| Bug | Descrição | Severidade | Módulo |
|---|---|---|---|
| BUG-027 | Checkbox "Lembrar-me" não persiste sessão | Baixa | Login |
| BUG-028 | Username aceita caracteres especiais | Alta | Registro |
| BUG-029 | Username aceita espaços | Alta | Registro |
| BUG-030 | Campo email com `type="text"` | Média | Registro |
| BUG-032 | Validação de senha apenas no backend | Baixa | Registro |
| BUG-033 | Reset de senha sem verificação de identidade | Crítica | Reset |
| BUG-045 | Taxa de Conclusão aceita valores negativos | Alta | Coleta |
| BUG-046 | Frequência aceita valores acima de 100% | Alta | Coleta |
| BUG-047 | Nota de Avaliação sem limite máximo | Alta | Coleta |
| BUG-052 | Histórico expõe dados de todos os usuários | Crítica | Coleta |

Relatórios completos em `docs/bug-reports/`.

---

## Diferenciais Implementados

- ✅ **Page Objects** — `LoginPage`, `RegisterPage` e `ColetaPage` com responsabilidade única
- ✅ **Docker** — ambiente completamente isolado via Docker Compose
- ✅ **Health Check de API** — validação direta do endpoint `/login` via `cy.request`
- ✅ **Acessibilidade** — testes com `cypress-axe` detectando violações reais de contraste e acessibilidade
- ✅ **BDD Gherkin** — cenários em `features/auth.feature` e `features/coleta.feature`
- ✅ **Checklist de Regressão** — documento em `docs/checklist-regressao.md`
- ✅ **Casos de Teste Detalhados** — 11 casos em `docs/casos-de-teste.md`
