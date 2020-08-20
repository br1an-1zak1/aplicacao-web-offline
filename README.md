## Recursos para exploração

- Utilizado o plugin Live Server do vsCode como servidor local para testes
- De preferência utilizar o Chrome.
- Para visualizar o SW, verificar a dev tools do browser na aba application.

---
## Exploração do Service Worker

Service worker possui um ciclo de vida diferente pois é um JavaScript worker ([web worker](https://www.html5rocks.com/en/tutorials/workers/basics/)) e ao alterar algo nele é necessário que feche a janela do navegador e abra novamente para ver as alterações do Service Worker.

### Ciclo de vida

- Registro
- Instalação
- Ativação
- Busca
- Redundante

### Códigos

```javascript
navigator.serviceWorker.register('nome-do-SW.js')
.then( (register) => {
  register.unregister(); // cancela o registro do SW
  register.update(); // atualiza o SW (pois as modificações novas ficam na espera)
  register.installing; // mostra que está havendo uma instalação
  register.waiting; // mostra quando há um novo SW ESPERANDO.
  register.active; // mostra quando o SW já está ativo
  
  // se for nulo carregou pela web se existir é pq a página foi carregada pelo SW
  navigator.serviceWorker.controller;
})
```

---

Acompanhado video aulas da Udacity sobre [Offline Web Applications com Jake Archibald e Mike Wales](https://classroom.udacity.com/courses/ud899)
