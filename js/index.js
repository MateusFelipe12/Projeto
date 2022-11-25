// document.addEventListener( 'DOMContentLoaded', function () {
//   new Splide( '#image-carousel', {
//     heightRatio: 0.5,
//     type: 'loop',
//   } ).mount();
// });


const receberSubmitFormLivros = () => {
  try {
    const form = $('#form-cadastro-livros')
    form.unbind('submit').submit((e)=>{
      e.preventDefault();
      let livro = form.find('#livro').val().replace(/\s+/g, ' ');
      let autor = form.find('#autor').val().replace(/\s+/g, ' ');
      
      form.find('#livro').val('');
      form.find('#autor').val('');

      if(!autor || !livro || autor === ' ' || livro === ' '){
        Toastify({
          text: "Informe nome do autor e do livro",
          duration: 2000,
          close: false,
          gravity: "bottom",
          position: "left",
          stopOnFocus: true, 
          style: {
            background: "#f73030a9",
            borderRadius: "5px",
          }}).showToast();
        }else{
          $('.modal').modal('hide')
          setLocalStorage(livro, autor);
          gerarTableLivros();
        }
      })
  } catch (error) {
    Toastify({
      text: "Opss, Ocorreu um erro",
      duration: 2000,
      close: false,
      gravity: "bottom",
      position: "left",
      stopOnFocus: true, 
      style: {
        background: "#f73030a9",
        borderRadius: "5px",
      }}).showToast();
  }
}

const receberSubmitFormAutores = function(){
  try {
    const form = $('#form-cadastro-autores')

    form.unbind('submit').submit((e)=>{
      e.preventDefault();
      let nome = form.find('#autor').val().replace(/\s+/g, ' ');
      let dataNascimento = form.find('#dataNascimento').val();
    

      let dia = dataNascimento.substr(8,2)
      let mes = dataNascimento.substr(5,2)
      let ano = dataNascimento.substr(0,4)

      console.log(nome, dataNascimento)
      dataNascimento = dia  + '-' + mes + '-' + ano;

      console.log(nome, dataNascimento)

      form.find('#autor').val('');
      form.find('#dataNascimento').val('');
    })

  } catch (error) {
    console.log(error.message);
    Toastify({
      text: "Opss, Ocorreu um erro",
      duration: 2000,
      close: false,
      gravity: "bottom",
      position: "left",
      stopOnFocus: true, 
      style: {
        background: "#f73030a9",
        borderRadius: "5px",
      }}
    ).showToast();
  }
}




const setLocalStorage = function(livro, autor) {
  // funçao pega os books salvos se existe, e adiciona o novo livro;
  // salva no aramazenamento
  try{
    let livros = localStorage.getItem( 'booksBiblioteca' )
    if ( livros ) {
      livros = atob( atob(livros))
      livros = JSON.parse( livros ) 
    } else {
      livros =  { "books": [] }
    }
      livros.books.push( {
        "name": livro,
        "autor": autor
      } )

      livros = JSON.stringify(livros)
      livros = btoa(btoa(livros))
      localStorage.setItem( 'booksBiblioteca', livros );
  } catch ( error ){
    console.log(error.message);
    Toastify({
      text: "Opss, Ocorreu um erro",
      duration: 2000,
      close: false,
      gravity: "bottom",
      position: "left",
      stopOnFocus: true, 
      style: {
        background: "#f73030a9",
        borderRadius: "5px",
      }}
    ).showToast();
  }
}

const getLocalStorage = function () {
  try {
    let booksStorage =  localStorage.getItem( 'booksBiblioteca' )
    booksStorage = JSON.parse( atob( atob( booksStorage ) ) )
    return booksStorage;

  } catch (error) {
    console.log(error.message);
    Toastify({
      text: "Opss, Ocorreu um erro",
      duration: 2000,
      close: false,
      gravity: "bottom",
      position: "left",
      stopOnFocus: true, 
      style: {
        background: "#f73030a9",
        borderRadius: "5px",
      }}
    ).showToast();
  }
}

const gerarTableLivros = function() {
  try {
    let table = $('#table-livros tbody')
    table.html( '' )
  
    let livros = getLocalStorage();
    if( livros.books.length == 0 ){
      table.append(`
        <tr id="tr-null">
          <td colspan="4">Ainda não exixtem regirstros</td>
        </tr>
      `)
    }
    livros.books.forEach( (livro, i) => {
      table.append(`
        <tr style="transition: all .5s;">
          <td class="id">${i + 1}</td>
          <td>${livro.name}</td>
          <td>${livro.autor}</td>
          <td>
            <button onclick="deleteLivros($(this))">
              <i class="tiny material-icons">delete</i>
            </button>
          </td>
        </tr>
      `)
    });
  
  } catch (error) {
    console.log(error.message);
    Toastify({
      text: "Opss, Ocorreu um erro",
      duration: 2000,
      close: false,
      gravity: "bottom",
      position: "left",
      stopOnFocus: true, 
      style: {
        background: "#f73030a9",
        borderRadius: "5px",
      }}
    ).showToast();
  }
}

const deleteLivros = function(element) {
  try {
    $(element).closest('tr').remove()
    let posicao = $(element).closest('tr').find('.id').text()
    let livros = getLocalStorage();
    livros.books.splice(posicao - 1,1);

    livros = JSON.stringify(livros)
    livros = btoa(btoa(livros))
    localStorage.setItem( 'booksBiblioteca', livros )
    gerarTableLivros();

  } catch (error) {
    console.log(error.message);
    Toastify({
      text: "Opss, Ocorreu um erro",
      duration: 2000,
      close: false,
      gravity: "bottom",
      position: "left",
      stopOnFocus: true, 
      style: {
        background: "#f73030a9",
        borderRadius: "5px",
      }}
    ).showToast();

  }
}

const onLoad = function(){
  gerarTableLivros()
}()