const staticCacheTeste = "teste-3";

// Ciclo de vida: INSTALAÇÃO (momento para salvar arquivos no navegador)
self.addEventListener("install", (event) => {
  // aqui é o momento de armazenar em cache os arquivos

  const urlsToCache = ["/", "img/lontra.jpg", "img/dr-evil.gif", "style.css"];

  // sinaliza o progresso da instalação
  event.waitUntil(
    // será passado uma promisse (resolvido: salva o SW; rejeitado: descarta o SW)
    caches.open(staticCacheTeste).then((cache) => {
      return cache.addAll(urlsToCache);
    })
  );
});

// Ciclo de vida: ATIVAÇÂO (ocorre quando o SW se torna ativo
//    e o SW anterior está ausente)
// momento bom para retirar os caches antigos
self.addEventListener("activate", (event) => {

  // tem significado de "espere até"
  event.waitUntil(
    // caches.delete('teste-1') // forma fácil porem não é escalável

    // ✅ "keys()" busca todos os caches e retorna em promisse
    //      o resultado da promisse é um array com todos os nomes de cache no navegador
    // ✅ "filter" separa os caches com nome iniciando "teste-"
    //      e que seja diferente do cache atual
    // ✅ "map" percorre cada o array criado no filter
    //      assim deletando todos os nomes de caches "obsoletos"
    //      e retornando uma promisse
    // ✅ "Promise.all()" vai esperar todas as promisses que retornam do "map"
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames
          .filter((cacheName) => {
            return (
              cacheName.startsWith("teste-") && cacheName !== staticCacheTeste
            );
          })
          .map((cacheName) => {
            return caches.delete(cacheName);
          })
      );
    })
  );
});

// ciclo de vida: BUSCA (busca de arquivos novos a cada atualização da página)
self.addEventListener("fetch", (event) => {
  // busca por requisições no cache
  event.respondWith(
    caches
      .match(event.request)
      .then((response) => {
        if (response) return response;
        return fetch(event.request);
      })
      .catch((error) => {
        console.log("erro: ", error);
      })
  );

  /*
  // ✅ "respondWith" diz ao navegador que a gente que vai cuidar da requisição 
  event.respondWith(
    // o primeiro parametro é o corpo da resposta e o segundo os cabeçalhos
    // retorna uma pagina html com "teste response"
    new Response('teste <b> response </b>', {
      headers: {
        "Content-Type": "Text/html", 
      }
    }) 
  )
  */

  /*
  // recupera uma imagem e personaliza a resposta 404
  event.respondWith(
    fetch('index.html')
      .then((res) => {
        if (res.status === 404){
          return fetch('/img/dr-evil.gif')
        }
        return res;
      })
      .catch(err => {
        // caso não tenha internet
        return 
      })
  )
  */
});


self.addEventListener('message', (event) => {
  console.log(event.data.action)
  if (event.data.action == 'skipWaiting'){
    // pode ser chamado enquanto esta nas fases: 
    // - installation
    // - waiting
    // ele dita que não deve ficar atrás do SW desatualizado, 
    // ele deve tomar o lugar do velho IMEDIATAMENTE!
    self.skipWaiting();
  }
})