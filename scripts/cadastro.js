const frm = document.querySelector("form"); //cria referência ao form

frm.addEventListener("submit",(e) => {
    e.preventDefault()// evita envio do form

     //obtém o conteúdo dos campos(trinm() remove os espaços)
     const palavra = frm.inPalavra.value.trim();
     const dica = frm.inDica.value;

     //valida preenchimento, palavra não deve possuir espaço em branco no meio
     if(palavra.includes(" ")){
        alert("Informe uma palavra válida (sem espaços)");
        frm.inPalavra.focus();
        return;
     };

     //se já existem dados em local storage,grava o conteúdo anterior + ";" palavra/dica
     if(localStorage.getItem("jogoPalavra")){
        localStorage.setItem("jogoPalavra",localStorage.getItem("jogoPalavra") + ";" + palavra);
        localStorage.setItem("jogoDica",localStorage.getItem("jogoDica") + ";" + dica);
     }else{
        //se não, é a primeira inclusão grava grava apenas a palavra dica
        localStorage.setItem("jogoPalavra",palavra);
        localStorage.setItem("jogoDica",dica);

        //verifica se salvou
        if(localStorage.getItem("jogoPalavra")){
            alert(`Ok! Palavra ${palavra} cadastrada com sucesso`);
        }

        frm.reset();
        frm.inPalavra.focus();
        

     }
});