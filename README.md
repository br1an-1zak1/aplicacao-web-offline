## Recursos para exploração

- Utilizado o plugin Live Server do vsCode como servidor local para testes
- De preferência utilizar o Chrome.
- Para visualizar o SW, verificar a dev tools do browser na aba application.

---
## Exploração do Service Worker

[Service worker](https://developers.google.com/web/fundamentals/primers/service-workers) possui um ciclo de vida diferente pois é um JavaScript worker ([web worker](https://www.html5rocks.com/en/tutorials/workers/basics/)) e ao alterar algo nele é necessário que feche a janela do navegador e abra novamente para ver as alterações do Service Worker. <br>
Resumidamente, SW é um script que funciona à parte do navegador (em background) e não pode acessar o DOM diretamente. Ele vai gerenciar as requisições e respostas após o primeiro acesso da página. 


### Ciclo de vida

- Registro
  - momento que registra o SW referente à página no navegador.
- Instalação
  - momento perfeito para salvar em cache os arquivos que deseja que sejam mostrados rapidamente quando a página for acessada (offline, rede 3G).
- Ativação
  - momento bom para limpar os caches do SW anterior e adicionar em cache os atualizados.
- Busca
  - só poderá funcionar quando o processo de Instalação e ativação estiver completo.
  - momento de interceptação das requisições para verificar se há no cache, caso haja retorna o que está no cache. Caso não, continua com a requisição ap servidor.
- Redundante
  - são os SW que foram descartados, ou falharam ou o que está sendo trocado por um novo

### Códigos

```javascript
navigator.serviceWorker.register('nome-do-SW.js')
.then( (register) => {
  register.unregister(); // cancela o registro do SW
  register.update(); // atualiza o SW (pois as modificações novas ficam na espera)
  register.installing; // mostra que está havendo uma instalação
  register.waiting; // mostra quando há um novo SW ESPERANDO.
  register.active; // mostra quando o SW já está ativo
  
  // se for nulo carregou pela web se existir é pq a página foi carregada pelo SW (possui uma instancia do SW)
  navigator.serviceWorker.controller;
})
```

---

Acompanhado video aulas da Udacity sobre [Offline Web Applications com Jake Archibald e Mike Wales](https://classroom.udacity.com/courses/ud899)
