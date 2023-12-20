## Features para implementar:

- [x] Skeleton loading;
- [x] Menu mobile;
- [x] Modal do menu de configuração;
- [x] Escolher tempo de atualização da moeda;
- [x] Dark theme;
    - [x] Salvar e recuperar do localStorage;
- [x] Tratamento de exceptions;
- [ ] Criar **MoneyInput**;
- [ ] Emitir alertas sonoros:
    - [x] Quando o preço da moeda chegar em um valor abaixo do determinado pelo usuário;
    - [x] Quando o preço da moeda alterar (somente quando a configuração **update interval** for acionada);
        - [ ] Bug: Audio tocando quando altera a bandeira;
    - [ ] Exibir toaster de feedback;
- [x] Utilizar API externa para pegar as cotações; (possívelmente https://exchangeratesapi.io/) **Acabei criando uma API em Python e usei webscrapping para capturar os dados do site investing.com**
- [x] Fazer o valor default ("USD") carregar a partir do response;
- [ ] Refactor componentes;
- [ ] Testes;
- [ ] Internacionalização (https://react.i18next.com/ |  https://locize.com/blog/next-i18next/);