# Novo checkout COD AURELIS

## O que será feito
- Reconstruir apenas o conteúdo do checkout a partir de **ENTREGA**, no componente partilhado, sem mexer nas secções anteriores das páginas.
- Aplicar em todas as páginas que já usam o checkout, preservando ofertas, quantidades mínimas, preços, temas, avisos e o comportamento de sucesso de cada página.
- Criar um layout de duas colunas em ecrãs grandes, com formulário à esquerda e resumo à direita; em telemóveis, uma coluna e resumo compacto.
- Incluir província conforme a restrição actual de cada produto, município, nome próprio e apelido obrigatórios, endereço, complemento opcional, bairro e telefone angolano validado.
- Apresentar envio gratuito, sem inventar prazo: informar que a equipa confirma a entrega. Mostrar apenas COD e não incluir endereço de facturação separado.
- Manter resumo dinâmico com produto/oferta, quantidade, subtotal, envio e total; botão final “FAZER A MINHA ENCOMENDA”, estado de envio e prevenção de submissão duplicada.
- Preservar registo no painel, Webhooky, notificações existentes, Meta Pixel com deduplicação e os fluxos actuais de agradecimento/sucesso.

## Dados e compatibilidade
- Acrescentar campos opcionais à tabela de pedidos para município, bairro, origem e página de origem, sem remover nem renomear dados existentes.
- Continuar a preencher o nome e endereço antigos com valores combinados para manter compatibilidade com o painel actual; enviar a localização também no webhook.
- Validar os novos campos no formulário e preservar as províncias actualmente permitidas por produto. Município será introduzido como texto, pois não existe uma lista ou configuração de municípios no sistema.

## Verificação
- Confirmar compilação e abrir checkout em páginas com províncias limitadas, oferta fixa e tema personalizado.
- Verificar estados de validação, totais e limites de quantidade em ecrãs grandes e móveis.
- Simular uma submissão COD em ambiente de teste e confirmar que o pedido aparece com os dados, origem e página, mantendo as notificações e os eventos existentes.
