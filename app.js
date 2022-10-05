// Bibliotecas necessarias para criar uma API

// 1 - Express: É uma biblioteca para criar aplicacoes em node no formato de API
// >> npm instal express --save 

// 2 - Cors: É uma biblioteca para manipular as permissoes http
// >> npm instal cors --save 

// 3 - Body parser: É uma biblioteca que permite manipular o corpo do protocolo http 
// >> npm install body-parser --save

// Import da biblioteca do express para criar a API 
const express = require('express');

// Import da biblioteca do cors para manipular as permissoes do protocolo http 
const cors = require('cors');

// Import da biblioteca do body parser que ira manipular o corpo das requisicoes do protoclo http 
const bodyParser =  require('body-parser');
const { response } = require('express');

// Cria um obejto chamado app que sera especialista nas funcoes do express 
const app = express();

// Request  - Para receber dados
// Response - Para devolver dados
// Next     - Próximo

app.use((request, response, next) => {
    
    // Permite especificar quem serão os ip's que terão acesso a API ( * - todos )
    response.header('Access-Control-Allow-Origin', '*');
    
    // Permite especificar quais serão os verbos (metodos) que a API irá reconhecer 
    response.hasHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');

    // Estabelece que as permissoes acima serão representadas pelo cors
    app.use(cors());

    // Para pular para a próxima configuração
    next();

});

const {getCurso} = require('./cursos.js')
const {getAlunos, getAlunoStatus, getAlunoPorAnoConclusao, getAnosConclusao, getDisciplinaAluno, filtroEstudanteporStatus, getAlunoCurso, getAlunoMatricula, getAlunospelaMatricula} = require('./alunos.js')


// EndPoint: Cursos
app.get('/cursos/:sigla', cors(), async function(request, response, next){
    let sigla = request.params.sigla;
    let curso = getCurso(sigla) 

    if ( curso )
    { 
        response.status(200);
        response.json(curso)
    }
    
    else 
    {
        response.status(404);
        response.json('{message : "Nenhum item encontrado"}');
    }
});

// Endpoint para listar todos os alunos
app.get('/alunos', cors(), async (request, response, next) => {
    let listaEstudantes = getAlunos();

    if (listaEstudantes) {
        response.status(200);
        response.json(listaEstudantes);
    } else {
        response.status(404);
    }
});

app.get('/aluno/:matricula', function( request, response, next) {
    let matricula = request.params.matricula
    let aluno = getAlunospelaMatricula(matricula)

    if(aluno) {
        response.status(200)
        response.json(aluno)
    }
    else {
        response.status(404)
        response.json('{message : "Nenhum item encontrado"}')
    }
})



// // Endpoint para listar as informacoes de um aluno pelo numero de matricula
// app.get('/aluno/:matricula', cors(), async (request, response, next) => {
//     let estudanteEnrollment = request.params.matricula;
//     let informacoesAluno = getAlunos(estudanteEnrollment);

//     if (informacoesAluno) {
//         response.status(200);
//         response.json(informacoesAluno);
//     } else {
//         response.status(404);
//     }
// });

// // Endpoint para listar as disciplinas de um aluno pela matricula
// app.get('/disciplinas/:sigla', cors(), async (request, response, next) => {
//     let sigla = request.params.sigla;
//     let curso = getDisciplinaAluno(sigla);

//     if (curso) {
//         response.status(200);
//         response.json(curso)
//     }
//     else {
//         response.status(404)
//     }
// });


// End: Informações do aluno pela matricula 
app.get('/.aluno/:matricula/:curso', cors(), async function(request, response, next){

    let matricula = request.params.matricula
    let curso = request.params.curso

    let aluno = getAlunoMatricula(matricula, curso)

    if (aluno) {
        response.status(200)
        response.json(aluno)
    } else{
        response.status(404)
        response.json({message: '404'})
    }
})

// Alunos do Curso
app.get('/alunos/:curso', cors(), async function(request, response, next){

    let curso = request.params.curso
    let alunos = getAlunoCurso(curso)
    let alunosJSON = {}

    if (alunos) {
        alunosJSON.alunos = alunos
        response.status(200)
        response.json(alunosJSON)
    } else {
        response.status(404)
        response.json({message: '404'})
    }
})

// Endpoint para listar alunos a partir de um status
app.get('/alunos/status/:status', cors(), async (request, response, next) => {
    let status = request.params.status;
    let listaEstudantes = getAlunoStatus(status);

    if (listaEstudantes) {
        response.status(200);
        response.json(listaEstudantes);
    } else {
        response.status(404);
    }
});

// app.get('/alunos/conclusao/:data', cors(), async (request, response, next) => {
//     let data = request.params.data;
//     let listaEstudantes = getAlunoPorAnoConclusao(data);

//     if (listaEstudantes) {
//         response.status(200);
//         response.json(listaEstudantes);
//     } else {
//         response.status(404);
//     }
// });

// app.get('/conclusao/?', cors(), async (request, response, next) => {
//     let curso = request.query.curso;
//     let status = request.query.status;

//     let anosConclusao = getAnosConclusao(curso, status);

//     if (anosConclusao) {
//         response.status(200);
//         response.json(anosConclusao);
//     } else {
//         response.status(500);
//     }
// });

// Listen
app.listen(8080, function(){
    console.log('Servidor aguardando requisições.')

});

