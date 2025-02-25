## Exercício
### Contexto
Possuímos um programa de teste de carga que gera um arquivo CSV com a lista de requisições para cada cenário. Precisamos agrupar os cenários. Cada cenário representa uma infra diferente<br>
  Ex: 
  - Cenário A: 4gb memória ram, 2 CPU, 4 threads concorrentes
  - Cenário B: 6gb memória ram, 2 CPU, 4 threads concorrentes
  - Cenário B: 4gb memória ram, 3 CPU, 6 threads concorrentes
  - ...

Dados de uma requests
- Tempo de request
- Cenário de teste
- Status - Sucesso | Falha

Obs: Ordem do csv é aleatória

### Objetivo
Agregar para calcular as métricas por cenários

- Média
- Mínimo (mais rápida de todas)
- Máximo (mais lenta de todas)
- P95 mais lentas
- Percentual de sucesso

## Desafio
  Calcular o melhor cenário

  - Critério eliminatório
      se não passar no minimo do critério, não pode ser selecionado como melhor
      - Percentual de sucesso acima de 85% 
  - Critério qualidade
      - Pontuação de acordo com ranking em cada critério
          - Primeiro: 10 pontos
          - Segundo: 7
          - Terceiro: 2
      - Média
      - Máximo
      - P95
      - Quem pontuar mais é o melhor centário
