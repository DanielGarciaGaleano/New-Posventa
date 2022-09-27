const express = require('express');
const router = express.Router();
const viewer =require('./handlers/views.js');
const insert = require('./handlers/results.js')
const erase = require('./handlers/delete.js')

// --------------------------------------------------------------------------
// gets
// --------------------------------------------------------------------------

// MOSTRAR LAS TABLAS
router.get('/tables', viewer.tables);
router.get('/categorias',viewer.categories);

    // =========== RUTAS DEL FRONT END ==========
    router.get('/info/usuario/:idUsuario/curso/:idCurso', viewer.mixingInfo);

    // =============== INTENTOS =======================

    router.get('/intentos', viewer.intentos);
    router.get('/intentos/usuario/:id/curso/:curseId', viewer.intentosEachUser);

    // =============== USUARIOS =======================

    //Ver todos los usuarios
    router.get('/usuarios',viewer.users);
    //Mostrar info del usuario único
    router.get('/usuario/:id',viewer.user);
    

    // ================= CURSOS ==========================

    //Mostrar un curso filtrado por ID de la moto
    router.get('/curso/:id', viewer.curso);
    //Mostrar Todos los cursos -- listado cpompleto
    router.get('/cursos', viewer.cursos);

    // =============== ACTIVIDADES =======================

    //Ver todas las actividades de cualquier curso -- listado completo 
    router.get('/todas/actividades',viewer.allActivities);
    //Todas las actividades que corresponen a un curso -- se filtra por id curso 
    router.get('/todas/actividad/:id', viewer.activities);
    //Ver todas las preguntas de las actividades 
    router.get('/preguntas/actividades',viewer.questionsActivities);
    //Ver todas las preguntas filtrando Id actividad
    router.get('/preguntas/actividad/:idActivity',viewer.questionsEachActivity);
    // Ver todas las respuestas 
    router.get('/respuestas/actividades',viewer.answersActivity);
    // Ver todas las respuestas por Id de pregunta
    router.get('/respuestas/actividades/:id_question',viewer.answersActivityEachQuestion);
    // Respuestas enviadas por los usuarios
    router.get('/respuestas/usuarios', viewer.answersEachUsers);
    // Respuestas enviadas por los usuarios
    router.get('/respuestas/usuario/:id_user', viewer.answersForUser);
    //ver todos los resultados de todas la actividades
    router.get('/resultado/actividades', viewer.activitiesResults);
    //ver todos los resultados de las actividades por id de la actividad
    router.get('/resultado/actividades/:activity_id', viewer.activitiesResultEachCurso);
    //ver todos los resultados de las actividades por id de la actividad y por id del usuario
    router.get('/resultado/actividad/:activity_id/usuario/:id_user/intento/:idIntento', viewer.activitiesResultEachUserAndActivity);
    //Ver todos los resultados filtrados por el id de usuario
    router.get('/actividades/resultado/usuario/:id_user', viewer.activitiesResultEachUser);

    // Ver las preguntas y respuestas por ID de la actividad 
    router.get('/actividades/preguntas/respuestas/:idCurso', viewer.AnswersAndQuestions);
    //Ver las actividades y el estado en el que se encuentran
    router.get('/actividades/resultados/usuario/:idUser/actividad/:idCurse/intento/:idIntento', viewer.activitiyWithResults);

    // =============== EXAMENES =======================

    //Ver todos los examenes
    router.get('/todos/examenes' , viewer.allQuizzes);
    //Ver examenes por cursos
    router.get('/todos/examenes/:id_curso' , viewer.allQuizEachCurso);
    //Ver todas las preguntas de los examenes
    router.get('/preguntas/examenes',viewer.allQuestionQuizzes);
    //Ver todas las preguntas de los examanes filtrado por ID Examen
    router.get('/preguntas/examen/:id_examen',viewer.questionsQuizz);
    //Ver Respuestas de las preguntas de los examenes
    router.get('/respuestas/examenes',viewer.answersQuizzes);
    //Ver Respuestas de los examenes filtrado por el ID del examen
    router.get('/respuestas/examen/:id_examen',viewer.answersQuizz);
    //Ver Respuestas que mandaron los usuarios en los examenes
    router.get('/respuestas/examenes/usuarios', viewer.answersQuizzesUsers);
    //Ver Respuestas que mandaron los usuarios en los examenes -- se filtra por usuario 
    router.get('/respuestas/examenes/usuario/:id_user',viewer.answersQuizzesEachUser);
    //Ver Respuestas que mandaron los usuarios en los examenes filtrado por usuario y Id examen
    router.get('/respuestas/usuario/:id_user/examen/:id_examen',viewer.answersQuizzEachUsersAndQuizz);
    //Ver Resultado de todos los examenes
    router.get('/resultados/examenes',viewer.allResultQuizzes);
    //Ver el resultado de los examenes filtrado por usuario
    router.get('/resultado/examenes/usuario/:id_user', viewer.resultQuizzesForUser);
    //Ver el resultado de un examen filtrando id examen y id usuario 
    router.get('/resultado/examen/usuario/:id_user/Examen/:id_examen/intento/:idIntento', viewer.resultQuizzesForUserForQuizz);

    // =============== RESULTADO FINAL =====================

    //Ver el estado de todos los cursos 
    router.get('/resultados/cursos',viewer.UserCompleteCurso);

// --------------------------------------------------------------------------
// post
// --------------------------------------------------------------------------

    // =============== INTENTOS =======================

    //Insertar nuevo Intento Por usuario
    router.post('/insertar/nuevoIntento', insert.newAttempt);
    

    //Insertar resultado de las actividades
    router.post('/insertar/resultados/actividades',insert.activityTotalResult);

    //Insertar cuando El módulo ya está completo -- Resultado Total del módulo
    router.post('/insert/cursoCompleto', insert.resultModule);


// --------------------------------------------------------------------------
// DELETE
// --------------------------------------------------------------------------

    // Eliminamos el intento por Id Unico de la tabla
    router.delete('/delete/intento/:id', erase.deleteAttempt);

//========================================================= DANIEL DASHBOARD

    // Ver el resultado de los cursos POR ID  Y POR  USUARIO 
    router.get('/resultados/historico', viewer.HitoricResults);

    // Ver el conteo de los usuarios que completado un curso filtro ID 
    router.get(`/conteo/usuarioCompleto/curso/:idcurse`, viewer.userCompleteDashboard)

    // Ver el coneto de los usuarios inscritos en el curso Fitlro ID
    router.get(`/conteo/usuarioInscrito/curso/:idcurse`, viewer.userInscriptDashboard)

    // Ver el resultado de los cursos por ID Usuario
    router.get('/resultados/cursos/usuario/:userId', viewer.UserCompleteCursoEachUser);

    //Ver el resultado de los cursos por ID CURSO 
    router.get('/resultados/cursos/:idCurso', viewer.resultEachCurse);

    //Ver el resultado de los Examenes por ID CURSO 
    router.get('/resultados/examenes/:idCurso', viewer.resultEachExam);
    
    //Ver el resultado de las Actividades por ID CURSO 
    router.get('/resultados/Actividades/:idCurso', viewer.resultEachAct);
    
    //Ver los filtros 
    router.get('/filtros/', viewer.FiltrosSelect);
    
    //Ver los filtros Ciudad
    router.get('/filtros/ciudad', viewer.FiltroCiudad);

    //Ver los filtros Regional
    router.get('/filtros/regional', viewer.FiltroRegional); 

    //Ver los filtros Regional
    router.get('/filtros/social', viewer.FiltroSocial); 

    //Ver el resultado de filtros con calificacion
    router.get('/filtros/calificados/', viewer.ConsultaFiltrada);

    //Ver el resultado del promedio examen Filtrado
    router.post('/examen/promedio/', viewer.resultEachPromEx);

    //Ver el resultado de la categoria 1
    router.post('/Categoria/', viewer.resultEachCat);
   

    //Ver el resultado de la categoria 2
    router.get('/Categoria2/:idCurso', viewer.resultEachCat2);

    //Ver el resultado de la categoria 3
    router.get('/Categoria3/:idCurso', viewer.resultEachCat3);

    //Ver el resultado de la categoria 4
    router.get('/Categoria4/:idCurso', viewer.resultEachCat4);

    //Ver el resultado de la categoria 5
    router.get('/Categoria5/:idCurso', viewer.resultEachCat5);

    //Ver el resultado el procentaje general promedio
    router.get('/cumplimiento/general/promtotal', viewer.CumplimientoGeneralProm);

    //Ver el resultado el procentaje de cumplimiento general
    router.get('/cumplimiento/general', viewer.CumplimientoGeneral);

    //Ver el resultado el procentaje de cumplimiento de Empresa y Agencia
    router.get('/cumplimiento/empresa/agencia', viewer.CumplimientoEmpresaAgencia);

    //Ver el resultado el procentaje de cumplimiento por empresa
    router.get('/cumplimiento/empresa', viewer.CumplimientoEmpresa);

    //Ver el resultado el procentaje de cumplimiento Cursos y nombre
    router.get('/cumplimiento/cursos/nombre', viewer.CumplimientoCursosNombre);
    
    //Ver el resultado el procentaje de cumplimiento por
    router.get('/cumplimiento/cursos/nombre', viewer.CumplimientoGrupo);

    // *********************************METODOS POST

    //Ver el resultado de la categoria 1
    router.post('/Categoria/', viewer.resultEachCat);

    //Ver el resultado del Examen Actividad 
    router.post('/examen/ranking', viewer.resultEachExamRank);
       //Ver el resultado del Examen Actividad 
    router.post('/ranking/', viewer.resultEachRanking );
    //Ver el resultado del promedio examen Filtrado
    router.post('/examen/promedio/', viewer.resultEachPromEx);
    
    //Ver el resultado del promedio cumplimiento general
    router.post('/filter/cumplimiento/general', viewer.resultEachCumpGen);

    //Ver el resultado del promedio cumplimiento general
    router.post('/filter/cumplimiento/general/prom', viewer.resultEachCumpGenProm);

    //Ver el resultado del promedio cumplimiento general
    router.post('/filter/cumplimiento/empresa/agencia', viewer.resultEachCumpEmpAge);

    //Ver el resultado del promedio cumplimiento general
    router.post('/filter/cumplimiento/empresa', viewer.resultEachCumpEmpresa);

    //Ver el resultado del promedio cumplimiento general
    router.post('/filter/cumplimiento/curso/nombre', viewer.resultEachCumpCursoNombre);

    //Ver el resultado del promedio cumplimiento general
    router.post('/filter/cumplimiento/grupo/nombre', viewer.resultEachCumpNombreGrupo);

    //Ver el resultado del historico
    router.post('/historico/filtrado', viewer.resultEachHistorico);

module.exports=router;




