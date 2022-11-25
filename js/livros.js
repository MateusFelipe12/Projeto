const receberSubmitForm = () =>{
  try {
    const form = $('#form-cadastro-livros')
    form.submit((e)=>{
      e.preventDefault()
      let livro = form.find('#livro').val().replace(/\s+/g, '');
      let autor = form.find('#autor').val().replace(/\s+/g, '');

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
        let table = $('#table-livros tbody')
        table.find('#tr-null').remove()
        table.append(`<tr> <td>${livro}</td> <td>${autor}</td> </tr>`)
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

