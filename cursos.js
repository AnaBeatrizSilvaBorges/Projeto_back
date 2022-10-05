var cursos = [
    {
        "nome"  :   "001 - Técnico em Desenvolvimento de Sistemas",
        "sigla" :   "DS",
        "icone" :   "https://image.shutterstock.com/image-vector/api-interface-vector-icon-600w-659203513.jpg",
        "carga" :   "1200",
    },
    {
        "nome"  :   "002 - Técnico em Redes de Computadores",
        "sigla" :   "RDS",
        "icone" :   "https://img.icons8.com/ultraviolet/344/thin-client.png",
        "carga" :   "1200"
    }
];

const getCurso = function (siglaCurso){
    let sigla = siglaCurso.toUpperCase();
    let curso = {}
    let erro = true;

    if ( sigla != '')
    {
        cursos.forEach ( item => {
            if ( item.sigla.indexOf(sigla) == 0 ) {
                curso.sigla = item.sigla
                curso.descricao = item.nome 
                curso.carga = item.carga
                curso.icone = item.icone
                erro = false
            }
        })
    }

    if (erro )
    {
        return false;
    }

    else 
    {
        return curso;
    }
}

//console.log(getCurso('RDS'))

module.exports = 
{
    getCurso
}







