const staticCacheTeste = 'teste-3'

// Ciclo de vida: INSTALAÇÃO (momento para "baixar" arquivos na primeira vez do SW)
self.addEventListener('install', (event) =>{
  // aqui é o momento de armazenar em cache os arquivos
  
  const urlsToCache = [
    '/',
    'img/lontra.jpg',
    'style.css'
  ];

  // sinaliza o progresso da instalação
  event.waitUntil(
    // será passado uma promisse (resolvido: salva o SW; rejeitado: descarta o SW)
    caches.open(staticCacheTeste)
      .then((cache) => {
        return cache.addAll(urlsToCache)
      })
  )
})


// Ciclo de vida: ATIVAÇÂO (ocorre quando o SW se torna ativo 
//    e o SW anterior está ausente)
self.addEventListener('activate', (event) => {
  // momento bom para retirar os caches antigos
  
  // tem significado de "espere até"
  event.waitUntil( 
    // caches.delete('teste-1') // forma fácil porem não é escalável
    
    // busca todos os caches e retorna em promisse
    caches.keys()
      .then((cacheNames) => {
        // o resultado da promisse é um array com todos os nomes de cache no navegador
        console.log(cacheNames)
      })
  );

});


// ciclo de vida: BUSCA (busca de arquivos novos a cada atualização da página)
self.addEventListener('fetch', (event) => {
  
  // busca por requisições no cache
  event.respondWith(
    caches.match(event.request)
      .then((response) => {
        if (response) 
          return response;
        return fetch(event.request);
      })
      .catch((error) => {
        console.log('erro: ', error)
      })
  )
  
  /*
  // diz ao navegador que a gente que vai cuidar da requisição 
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
})