const pool = require('../../db/conectDB.js')
const view = module.exports;

// Información primordial

// mostar tablas -- Desarrollo 
view.tables = async (req, res) => {
    try {
        pool.query("SHOW TABLES", async (err, result) => {
            if (err) throw err;
            await res.send(result);
        })
    } catch (error) {
        console.error(error);
    };
};

view.categories = async (req, res) => {
    try {
        pool.query("SELECT * FROM Categoria", async (err, result) => {
            if (err) throw err;
            await res.send(result);
        })
    } catch (error) {
        console.error(error);
    };
}

view.intentos = async (req, res) => {
    try {
        pool.query("SELECT * FROM Intento", async (err, result) => {
            if (err) throw err;
            await res.send(result);
        })
    } catch (error) {
        console.error(error);
    };
};

// Ver info de intentos Limit 1!
view.intentosEachUser = async (req, res) => {
    try {
        let { id, curseId } = req.params;
        pool.query(`SELECT * FROM Usuario_has_Intento
                        INNER JOIN Moto ON Usuario_has_Intento.id_moto = Moto.id
                        WHERE Usuario_idUsuario = ? and id_moto = ?
                        ORDER BY id_usuario_intentos DESC LIMIT 1`, [id, curseId
        ], async (err, result) => {
            if (err) throw err;
            if (result.length == 0) {
                res.status(404).json({
                    message: `No hay Intentos para el Curso ${curseId} cuando el Usuario tiene ID: ${id}`,
                    curseId: `${curseId}`,
                    id_user: `${id}`,
                    error_Status: 404
                });
            } else {
                await res.send(result);
                console.log(`Ver User ID:${id} Exitoso`);
            };
        });
    } catch (error) {
        console.error(error);
    }
};

// Ver información del usuario
view.users = async (req, res) => {
    try {
        pool.query("SELECT * FROM Usuario ", async (err, result) => {
            if (err) throw err;
            await res.send(result);
            console.log(`Ver todos los usuarios`);
        });
    } catch (error) {
        console.error(error);
    }
};

// Ver información del usuario -- solo un resultado
view.user = async (req, res) => {
    try {
        let { id } = req.params;
        pool.query("SELECT * FROM Usuario WHERE idUsuario =?", id, async (err, result) => {
            if (err) throw err;
            if (result.length == 0) {
                res.status(404).json({
                    message: `No hay contenido para el Usuario con ID: ${id}`,
                    error_Status: 404
                });
            } else {
                await res.send(result[0]);
                console.log(`Ver User ID:${id} Exitoso`);
            };
        });
    } catch (error) {
        console.error(error);
    }
};

//Ver Cursos filtrado por ID Moto
view.curso = async (req, res) => {
    try {
        let { id } = req.params;
        pool.query("SELECT * FROM Moto WHERE id=?", id, async (err, result) => {
            if (err) throw err;
            if (result.length == 0) {
                res.status(404).json({
                    message: `No hay contenido para la moto con ID: ${id}`,
                    error_Status: 404
                });
                console.log(`Error Status 404 para la Moto ID ${id} No existe en Base de datos`)
            } else {
                await res.send(result[0]);
                console.log(`Ver moto ID:${id} Exitoso`);
            };
        });
    } catch (error) {
        console.error(error);
    }
};

//Ver todos los cursos
view.cursos = async (req, res) => {
    try {

        pool.query("SELECT * FROM Moto", async (err, result) => {
            if (err) throw err;
            await res.send(result);
            console.log('Todos los cursos fueron consultados')
        });

    } catch (error) {
        console.error(error);
    }
};

//Ver el listado de todas las actividades dispponibles
view.allActivities = async (req, res) => {
    try {
        pool.query("SELECT * FROM Actividad", async (err, result) => {
            if (err) throw err;
            await res.send(result);
        });
    } catch (error) {
        console.error(error);
    };
};

//Actividades por ID Moto
view.activities = async (req, res) => {
    try {
        let { id } = req.params;
        pool.query("SELECT * FROM Actividad WHERE Moto_id =?", id, async (err, result) => {
            if (err) throw err;
            if (result.length == 0) {
                res.status(404).json({
                    message: `No hay contenido para la actividad con ID_MOTO: ${id}`,
                    error_Status: 404
                });
            } else {
                await res.send(result);
            };
        });
    } catch (error) {
        console.error(error);
    };
};

//Todas las preguntas de las actividaades
view.questionsActivities = async (req, res) => {
    try {
        pool.query("SELECT * FROM Pregunta_actividad", async (err, result) => {
            if (err) throw err;
            await res.send(result);
        });
    } catch (error) {
        console.error(error);
    };
};

//Ver Las preguntas y respuestas de las actividades por ID Actividad
view.AnswersAndQuestions = async (req, res) => {
    try {
        let { idCurso } = req.params
        pool.query(`SELECT * FROM Pregunta_actividad 
                        INNER JOIN Respuesta_actividad ON Pregunta_actividad.idPregunta_actividad = Respuesta_actividad.Pregunta_actividad_idPregunta_actividad
                        WHERE Actividad_idActividades = ?`, idCurso, async (err, result) => {
            if (err) throw err;
            await res.send(result);
            console.log(`Se consultaron las preguntas y las respuestas de la actividad con ID ${idCurso}`)
        });
    } catch (error) {
        console.error(error);
    }
};

//Todas las preguntas por el Id de la activdad
view.questionsEachActivity = async (req, res) => {
    try {
        let { idActivity } = req.params;
        pool.query("SELECT * FROM Pregunta_actividad WHERE Actividad_idActividades =?", idActivity, async (err, result) => {
            if (err) throw err;
            if (result.length == 0) {
                res.status(404).json({
                    message: `No hay contenido para la actividad con ID_MOTO: ${idActivity}`,
                    error_Status: 404
                });
            } else {
                await res.send(result);
            };
        });
    } catch (error) {
        console.error(error);
    };
};

//Todas las respuestas de las actividades 
view.answersActivity = async (req, res) => {
    try {
        pool.query("SELECT * FROM Respuesta_actividad", async (err, result) => {
            if (err) throw err;
            await res.send(result);
        });
    } catch (error) {
        console.error(error);
    };
};

//Todas las respuestas disponibles filtrado por el ID de lña pregunta
view.answersActivityEachQuestion = async (req, res) => {

    try {
        let { id_question } = req.params;
        pool.query("SELECT * FROM Respuesta_actividad WHERE Pregunta_actividad_idPregunta_actividad =?", id_question, async (err, result) => {
            if (err) throw err;
            if (result.length == 0) {
                res.status(404).json({
                    message: `No hay contenido para las respuestas de la pregunta ${id_question}`,
                    error_Status: 404
                });
                console.log(`No hay contenido para las respuestas de la pregunta ${id_question} Status: 404`);
            } else {
                await res.send(result);
                console.log(`Se consultó el contenido para las respuestas de la pregunta ${id_question}`);
            };
        });
    } catch (error) {
        console.error(error);
    };

};

//Respuestas mandadas por el usuario
view.answersEachUsers = async (req, res) => {
    try {
        pool.query("SELECT * FROM Usuario_has_Pregunta_actividad", async (err, result) => {
            if (err) throw err;
            await res.send(result);
        });
    } catch (error) {
        console.error(error);
    };
};

//Respuestas mandadas por usuario Filtrado por ID Usuario
view.answersForUser = async (req, res) => {
    try {
        let { id_user } = req.params
        pool.query("SELECT * FROM Usuario_has_Pregunta_actividad WHERE Usuario_idUsuario=?", id_user, async (err, result) => {
            if (err) throw err;
            await res.send(result);
        });
    } catch (error) {
        console.error(error);
    };
};

//Ver todos los resultados
view.activitiesResults = async (req, res) => {
    try {
        pool.query("SELECT * FROM Usuario_has_Actividad", async (err, result) => {
            if (err) throw err;
            await res.send(result);
        });
    } catch (error) {
        console.error(error);
    };
};

//Ver el resultado por actividad
view.activitiesResultEachCurso = async (req, res) => {
    try {
        let { activity_id } = req.params;
        pool.query("SELECT * FROM Usuario_has_Actividad WHERE Actividad_idActividades = ? ", activity_id, async (err, result) => {
            if (err) throw err;
            if (result.length == 0) {
                res.status(404).json({
                    message: `No hay contenido disponible para esta consulta id ${activity_id}`,
                    error_Status: 404
                });
                console.log(`Se intentó consultar el ID de la actividad ${activity_id} 404`)
            } else {
                console.log(`Se consultó el ID de la actividad ${activity_id}`);
                await res.send(result[0]);
            };
        });
    } catch (error) {
        console.error(error);
    };
};

view.activitiyWithResults = async (req, res) => {
    try {
        let { idCurse, idUser, idIntento } = req.params;
        pool.query(`SELECT * FROM Actividad
                        INNER JOIN Usuario_has_Actividad ON Actividad.idActividades = Usuario_has_Actividad.Actividad_idActividades
                        WHERE idActividades = ? and Usuario_idUsuario = ? and Intento_idIntento = ?`, [idCurse, idUser, idIntento], async (err, result) => {
            if (err) throw err;
            if (result.length == 0) {
                res.status(404).json({
                    message: `No hay contenido disponible para esta consulta`,
                    idcurse: `${idCurse}`,
                    udUser: `${idUser}`,
                    error_Status: 404
                });
                console.log(`Se intentó consultar la atividad con id ${idCurse} para el usuario ${idUser}  con el intento con id ${idIntento} y no fue posible`)
            } else {
                console.log(`Se consultó la actividad con ID ${idCurse} para el usuario ${idUser} en el intento ${idIntento}`);
                await res.send(result);
            };
        });
    } catch (error) {
        console.error(error);
    };
}

// Ver todos los resultados de las actividaddes filtrado por ID usuario 
view.activitiesResultEachUserAndActivity = async (req, res) => {
    try {
        let { activity_id, id_user, idIntento } = req.params;
        pool.query(`SELECT * FROM Usuario_has_Actividad WHERE Usuario_idUsuario = ? and Actividad_idActividades = ? and Intento_idIntento = ?
                        ORDER BY id_user_actividad DESC Limit 1`, [id_user, activity_id, idIntento], async (err, result) => {
            if (err) throw err;
            if (result.length == 0) {
                res.status(404).json({
                    message: `No hay contenido disponible para la consulta de la actividad ID ${activity_id} cuando el usuario es ID ${id_user} en el intento ${idIntento}`,
                    intento: `${idIntento}`,
                    actividad: `${activity_id}`,
                    usuario: `${id_user}`,
                    error_Status: 404
                });
                console.log(`El usuario con ID ${id_user} intentó consultar la actividad con ID ${activity_id} 404`)
            } else {
                console.log(`El usuario con ID ${id_user} consultó la actividad con ID ${activity_id}`);
                await res.send(result[0]);
            };
        });
    } catch (error) {
        console.error(error);
    };
};

//Ver todos los resultados filtrados por usuario
view.activitiesResultEachUser = async (req, res) => {
    try {
        let { id_user } = req.params;
        pool.query("SELECT * FROM Usuario_has_Actividad WHERE Usuario_idUsuario = ?", id_user, async (err, result) => {
            if (err) throw err;
            if (result.length == 0) {
                res.status(404).json({
                    message: `No hay contenido disponible para esta consulta cuando el usuario es ID ${id_user}`,
                    error_Status: 404
                });
                console.log(`El usuario con ID ${id_user} intentó consultar sus actividades STATUS 404 `)
            } else {
                console.log(`El usuario con ID ${id_user} intentó consultar sus actividades`);
                await res.send(result[0]);
            };
        });
    } catch (error) {
        console.error(error);
    };
};

//Ver todos los examenes de todas los cursos
view.allQuizzes = async (req, res) => {
    try {
        pool.query("SELECT * FROM Examen ", async function (err, result) {
            if (err) throw err;
            await res.send(result);
            console.log(`Se ha consultado la lista de examenes disponibles`);
        });

    } catch (error) {
        console.error(error);
    };
};

//Ver todos los examenes Filtrados po ID MOTO 
view.allQuizEachCurso = async (req, res) => {
    try {
        let { id_curso } = req.params
        pool.query("SELECT * FROM Examen WHERE Moto_id =?", id_curso, async function (err, result) {
            if (err) throw err;
            if (result.length == 0) {
                res.status(404).json({
                    message: `No hay contenido disponible para el examen de la moto ID${id_curso}`,
                    error_Status: 404
                });
                console.log(`No hay contenido disponible para el examen de la moto ID${id_curso}`);
            } else {
                await res.send(result[0]);
                console.log(`Se ha consultado el examen que pertenece a la moto ID ${id_curso}`);
            };
        });

    } catch (error) {
        console.error(error);
    };
};

//Ver las preguntas de todos los examenes
view.allQuestionQuizzes = async (req, res) => {
    try {
        pool.query("SELECT * FROM Pregunta_examen ", async function (err, result) {
            if (err) throw err;
            await res.send(result);
            console.log(`Se ha consultado la lista de las preguntas de todos los examenes disponibles`);
        });

    } catch (error) {
        console.error(error);
    }
};

//Ver las preguntas de todos los examenes filtrados por ID Examen 
view.questionsQuizz = async (req, res) => {
    try {
        let { id_examen } = req.params
        pool.query("SELECT * FROM Pregunta_examen WHERE Examen_idExamen =?", id_examen, async function (err, result) {
            if (err) throw err;
            if (result.length == 0) {
                res.status(404).json({
                    message: `No hay contenido disponible para las preguntas del examen ID ${id_examen}`,
                    error_Status: 404
                });
                console.log(`No hay contenido disponible para las preguntas del examen ID ${id_examen}`);
            } else {
                await res.send(result);
                console.log(`Se ha consultado Las preguntas del examen ID ${id_examen}`);
            };
        });

    } catch (error) {
        console.error(error);
    };
};

//Ver todas las respuestas de los examenes Disponibles
view.answersQuizzes = async (req, res) => {
    try {
        pool.query("SELECT * FROM Respuesta_examen ", async function (err, result) {
            if (err) throw err;
            await res.send(result);
            console.log(`Se ha consultado la lista de Respuestas de los examenes disponibles`);
        });

    } catch (error) {
        console.error(error);
    };
};

//Ver todas las respuestas del examen filtrado por ID Examen
view.answersQuizz = async (req, res) => {
    try {
        let { id_examen } = req.params
        pool.query("SELECT * FROM Respuesta_examen WHERE Pregunta_examen_idPregunta_examen =?", id_examen, async function (err, result) {
            if (err) throw err;
            if (result.length == 0) {
                res.status(404).json({
                    message: `No hay contenido disponible para las Respuestas del examen ID ${id_examen}`,
                    error_Status: 404
                });
                console.log(`No hay contenido disponible para las Respuestas del examen ID ${id_examen}`);
            } else {
                await res.send(result);
                console.log(`Se ha consultado Las respuestas del examen ID ${id_examen}`);
            };
        });

    } catch (error) {
        console.error(error);
    };
};

//Ver todas las respuestas que mandaron los usuarios
view.answersQuizzesUsers = async (req, res) => {
    try {
        pool.query("SELECT * FROM Usuario_has_Pregunta_examen ", async function (err, result) {
            if (err) throw err;
            await res.send(result);
            console.log(`Se ha consultado la lista completa de las Respuestas de los usuarios`);
        });

    } catch (error) {
        console.error(error);
    };
};

//Ver todas las respuestas de los examenes filtrado por usuario
view.answersQuizzesEachUser = async (req, res) => {
    try {
        let { id_user } = req.params;
        pool.query("SELECT * FROM Usuario_has_Pregunta_examen WHERE Usuario_idUsuario=?", id_user, async function (err, result) {
            if (err) throw err;
            if (result.length == 0) {
                res.status(404).json({
                    message: `No hay contenido disponible para el usuario ID ${id_user} al momento de consultar sus respuestas`,
                    error_Status: 404
                });
                console.log(`No hay contenido disponible para el usuario ID ${id_user} al momento de consultar sus respuestas. STATUS 404 `)
            } else {
                console.log(`El usuario con ID ${id_user} consultó sus respuestas de todos los examenes`);
                await res.send(result);
            };
        });

    } catch (error) {
        console.error(error);
    };
}

//Ver todas las respuestas que mandaron los usuarios filtrado por ID EXAMEN y ID usuario
view.answersQuizzEachUsersAndQuizz = async (req, res) => {
    try {
        let { id_examen, id_user } = req.params;
        pool.query("SELECT * FROM Usuario_has_Pregunta_examen WHERE Usuario_idUsuario=? && Pregunta_examen_idPregunta_examen = ?", [id_user, id_examen], async function (err, result) {
            if (err) throw err;
            if (result.length == 0) {
                res.status(404).json({
                    message: `No hay contenido disponible para el examen Id ${id_examen} cuando el usuario ID ${id_user} consulta sus respuestas`,
                    error_Status: 404
                });
                console.log(`El usuario con ID ${id_user} intentó consultar sus respuestas del examen ${id_examen}. STATUS 404 `)
            } else {
                console.log(`El usuario con ID ${id_user} consultó sus respuestas del examen ${id_examen}`);
                await res.send(result[0]);
            };
        });

    } catch (error) {
        console.error(error);
    };
};

//Ver resultado de todos los examenes
view.allResultQuizzes = async (req, res) => {
    try {
        pool.query("SELECT * FROM Usuario_has_Examen ", async function (err, result) {
            if (err) throw err;
            await res.send(result);
            console.log(`Se ha consultado la lista de resultados de los examenes`);
        });

    } catch (error) {
        console.error(error);
    };
};

//Ver el resultados de los examenes para un Usario
view.resultQuizzesForUser = async (req, res) => {
    try {
        let { id_user } = req.params;
        pool.query("SELECT * FROM Usuario_has_Examen WHERE Usuario_idUsuario =?", id_user, async function (err, result) {
            if (err) throw err;
            if (result.length == 0) {
                res.status(404).json({
                    message: `No hay contenido disponible para el usuario ID ${id_user}`,
                    error_Status: 404
                });
                console.log(`No hay contenido disponible para el usuario ID ${id_user} cuando desea ver todos los resultados de los examenes`)
            }
            await res.send(result);
            console.log(`Se ha consultado la lista de los examenes cuando el ID usuario = ${id_user}`);
        });

    } catch (error) {
        console.error(error);
    };
};

// Ver resultados por usuario y por ID del curso
view.resultEachUserIdcurse = async (req, res) => {
    try {
        let { id_user, id_curse } = req.params;
        pool.query("SELECT * FROM Usuario_has_Examen WHERE Usuario_idUsuario =?", id_user, async function (err, result) {
            if (err) throw err;
            if (result.length == 0) {
                res.status(404).json({
                    message: `No hay contenido disponible para el usuario ID ${id_user}`,
                    error_Status: 404
                });
                console.log(`No hay contenido disponible para el usuario ID ${id_user} cuando desea ver todos los resultados de los examenes`)
            }
            await res.send(result);
            console.log(`Se ha consultado la lista de los examenes cuando el ID usuario = ${id_user}`);
        });

    } catch (error) {
        console.error(error);
    };
};

//Ver el resultado de un examen filtrado por Id Examen filtrando un usuario
view.resultQuizzesForUserForQuizz = async (req, res) => {
    try {
        let { id_user, id_examen, idIntento } = req.params;
        pool.query(`SELECT * FROM Usuario_has_Examen 
                        INNER JOIN Examen ON Usuario_has_Examen.Examen_idExamen = Examen.idExamen
                        WHERE Usuario_idUsuario =? and Examen_idExamen=? and Intento_idIntento = ?`, [id_user, id_examen, idIntento], async function (err, result) {
            if (err) throw err;
            if (result.length == []) {
                res.status(404).json({
                    message: `No hay contenido disponible para el usuario ID ${id_user} cuando se consulta Examen ID ${id_examen} y su intento es el ${idIntento} `,
                    error_Status: 404
                });
                console.log(`No hay contenido disponible para el usuario ID ${id_user} cuando se consulta Examen ID ${id_examen} y su intento es el ${idIntento} `);
            } else {
                await res.send(result);
                console.log(`Se ha consultado el contenido disponible para el usuario ID ${id_user} cuando se consulta Examen ID ${id_examen} y su intento es el ${idIntento}`);
            }

        });

    } catch (error) {
        console.error(error);
    };
};


//Ver el estado completo de todos los cursos
view.UserCompleteCurso = async (req, res) => {
    try {
        pool.query("SELECT * FROM Usuario_has_Moto where Posventa =1", async function (err, result) {
            if (err) throw err;
            await res.send(result);
            console.log(`Se ha consultado la lista de Usuarios aprobados en todos los cursos`);
        });

    } catch (error) {
        console.error(error);
    };
};

//Ver información combinada Curso ID Usuario ID intento del usuario
view.mixingInfo = async (req, res) => {
    try {
        let { idUsuario, idCurso } = req.params;
        pool.query(`SELECT * FROM Usuario 
                        INNER JOIN  Usuario_has_Intento ON Usuario.idUsuario = Usuario_has_Intento.Usuario_idUsuario
                        INNER JOIN Moto ON Usuario_has_Intento.id_moto = Moto.id
                        WHERE Usuario.idUsuario = ? and Moto.id = ?;`, [idUsuario, idCurso], async function (err, result) {
            if (err) throw err;
            await res.send(result);
            console.log(`Se consultó la info del Usuario con ID ${idUsuario} para el curso con ID ${idCurso}`);
        });

    } catch (error) {
        console.error(error);
    };
};

// ==============================================================================
// ============================= DANIEL DASH BOARD ===============================
// ==============================================================================

// Conteo de las personas completas a un cursi
view.userCompleteDashboard = async (req, res) => {
    try {
        let { idcurse } = req.params
        pool.query(`SELECT COUNT(idUsuario) AS completados FROM (
                        SELECT COUNT(idUsuario) AS idUsuario, Usuario_has_Intento.Usuario_idUsuario FROM Usuario
                        INNER JOIN Usuario_has_Intento ON Usuario_has_Intento.Usuario_idUsuario = Usuario.idUsuario
                        where Usuario_has_Intento.Status = 1 AND id_moto = ?
                        GROUP BY Usuario_has_Intento.Usuario_idUsuario) t`, [idcurse], async function (err, result) {
            if (err) throw err;
            await res.send(result);
            console.log(`Se consultó el conteo de Usuario Has intento`)
        })
    } catch (error) {
        console.error(error);
    }
};

view.userInscriptDashboard = async (req, res) => {
    try {
        let { idcurse } = req.params
        pool.query(`SELECT COUNT(idUsuario) AS Inscritos FROM (
                        SELECT COUNT(idUsuario) AS idUsuario, Usuario_has_Intento.Usuario_idUsuario FROM Usuario
                        INNER JOIN Usuario_has_Intento ON Usuario_has_Intento.Usuario_idUsuario = Usuario.idUsuario
                        where Usuario_has_Intento.Intento_actual > 0 AND id_moto = ?
                        GROUP BY Usuario_has_Intento.Usuario_idUsuario) t`, idcurse, async function (err, result) {
            if (err) throw err;
            await res.send(result);
            console.log(`Se consultó el conteo de Usuario Has intento`)
        })
    } catch (error) {
        console.error(error);
    }
};

// Ver el estado de los cursos realizados por un usuario 
view.UserCompleteCursoEachUser = async (req, res) => {

    try {
        let { userId } = req.params
        pool.query("SELECT * FROM Usuario_has_Moto WHERE Usuario_idUsuario = ?", userId, async function (err, result) {
            if (err) throw err;
            await res.send(result);
            console.log(`Se ha consultado la lista de los cursos para el usuario con id ${userId}`);
        });

    } catch (error) {
        console.error(error);
    };
};

//Ver Historico de todas los Cursos 
view.HitoricResults = async (req, res) => {
    try {
        pool.query(`SELECT round(Calificacion,2) as Calificacion, Nombre, Nombre_moto,Concesionario,Intento_idIntento FROM Usuario_has_Moto, Usuario, Moto
                    WHERE Usuario_has_Moto.Usuario_idUsuario = Usuario.idUsuario 
                    AND Usuario_has_Moto.Moto_id = Moto.id
                    AND Moto.Posventa = 1
                    ORDER BY   Nombre ASC,Calificacion DESC, Nombre_moto;`, async function (err, result) {
            if (err) throw err;
            await res.send(result);
            console.log(`Se ha consultado los resultados históricos`);
        });

    } catch (error) {
        console.error(error);
    };
};

//Ver el estado de un curso filtrado por ID  y por usuario ID 
view.resultEachCurse = async (req, res) => {
    try {
        let { idCurso } = req.params
        pool.query(`SELECT t.*, MAX(PromedioActividades) as Calificacion_Max
                    from(SELECT  Moto_id,Usuario_idUsuario,nombre, Intento_idIntento,Concesionario, MAX(Calificacion) as PromedioActividades
                    FROM Usuario_has_Actividad
                    INNER JOIN Usuario ON Usuario_has_Actividad.Usuario_idUsuario = Usuario.idUsuario 
                    INNER JOIN Actividad ON Usuario_has_Actividad.Actividad_idActividades = Actividad.idActividades
                    INNER JOIN Moto ON Actividad.Moto_id = Moto.id
                    where Moto_id=?and Calificacion<>0 group by Usuario_idUsuario, Intento_idIntento) t group by Usuario_idUsuario`, idCurso, async function (err, result) {
            if (err) throw err;
            await res.send(result);
            console.log(`Se ha consultado la lista del los resultado para el curso con ID ${idCurso}`);
        });

    } catch (error) {
        console.error(error);
    };
};
// Ver el estado del examen segun su curso
view.resultEachExam = async (req, res) => {
    try {
        let { idCurso } = req.params
        pool.query(`SELECT *, MAX(Calificacion)*0.8 AS PromedioExamen
                        FROM Usuario_has_Examen
                        INNER JOIN Usuario ON Usuario_has_Examen.Usuario_idUsuario = Usuario.idUsuario 
                        INNER JOIN Examen ON Usuario_has_Examen.Examen_idExamen = Examen.idExamen
                        INNER JOIN Moto ON Examen.Moto_id = Moto.id
                        WHERE Moto_id=? GROUP BY Usuario_idUsuario ORDER BY PromedioExamen DESC;`, idCurso, async function (err, result) {
            if (err) throw err;
            await res.send(result);
            console.log(`Se ha consultado la lista del los resultado para el Examen del curso con ID ${idCurso}`);
        });

    } catch (error) {
        console.error(error);
    };
};



// Ver el estado del Actividad segun su curso
view.resultEachAct = async (req, res) => {
    try {
        let { idCurso, userid } = req.params
        pool.query(`SELECT t.*, MAX(PromedioActividades) as Promedio
                    from(SELECT  Moto_id,Usuario_idUsuario,nombre, Intento_idIntento,Concesionario, MAX(Calificacion) as PromedioActividades
                    FROM Usuario_has_Actividad
                    INNER JOIN Usuario ON Usuario_has_Actividad.Usuario_idUsuario = Usuario.idUsuario 
                    INNER JOIN Actividad ON Usuario_has_Actividad.Actividad_idActividades = Actividad.idActividades
                    INNER JOIN Moto ON Actividad.Moto_id = Moto.id
                    
                    where Moto_id=? and Calificacion<>0 And Moto.Posventa=1 group by Usuario_idUsuario, Intento_idIntento) t group by Usuario_idUsuario`, idCurso, async function (err, result) {
            if (err) throw err;
            await res.send(result);
            console.log(`Se ha consultado la lista del los resultado para la Actividad del curso con ID ${idCurso}`);
        });

    } catch (error) {
        console.error(error);
    };
};

buildFiltros = (filtros, result) => {

    let conditions = '';

    for (let key1 in filtros) {
        if(key1=="fechas")
        {
           
            var fechaIni=filtros[key1][0];
            var fechaFin=filtros[key1][1];
            if(fechaIni!='null' & fechaFin!='null')
            {
                conditions += `AND ${filtros[key1][0]}  between '${filtros[key1][1]}' AND '${filtros[key1][2]}'`
            }

        }
        else
        {
            if (filtros[key1] != "undefined") {
                conditions += `AND ${key1} ='` + filtros[key1] + `' `
            }
        }  
    }

    return (null, conditions);

};

view.resultEachHistorico =  (req, res) => {

    console.log(req.body, "Promedio General ");

    filters = buildFiltros(req.body);
    console.log(filters);
    
    try {
        let { idCurso } = req.params
        pool.query(`SELECT round(Calificacion,2) as Calificacion, Nombre, Nombre_moto,Concesionario,Intento_idIntento FROM Usuario_has_Moto, Usuario, Moto
                    WHERE Usuario_has_Moto.Usuario_idUsuario = Usuario.idUsuario 
                    AND Usuario_has_Moto.Moto_id = Moto.id
                    AND Moto.Posventa=1
                    `+ filters + `
                    ORDER BY   Nombre ASC,Calificacion DESC, Nombre_moto;`,  function (err, result) {
            if (err) throw err;
            res.send(result);
            console.log(`Se ha consultado Los Resultados totales  ${idCurso}`);
        });

    } catch (error) {
        console.error(error);
    };
};
// ============================================================== PORCENTAJES DE CUMPLIMIENTO FILTROS =======================================================
// ============================================================== PORCENTAJES DE CUMPLIMIENTO FILTROS =======================================================
// ============================================================== PORCENTAJES DE CUMPLIMIENTO FILTROS =======================================================
// ============================================================== PORCENTAJES DE CUMPLIMIENTO FILTROS =======================================================
view.resultEachCumpGen = async (req, res) => {
    console.log(req.body, "Promedio General ");

    filters = buildFiltros(req.body);
    console.log(filters);
    try {
        pool.query(`SELECT p.Zona,p.Gerente_regional,round(p.aprobados*100/q.totalCursos,2) AS avance FROM 
                    (SELECT Usuario.Zona,Usuario.Gerente_regional,Usuario.Razon_social, Usuario.Agencia, SUM(j.aprobados) aprobados FROM ( SELECT t.Usuario_idUsuario, COUNT(t.Usuario_idUsuario) AS aprobados
                    FROM(
                    SELECT Usuario.Zona,Usuario.Razon_social, Usuario.Agencia, Usuario.Gerente_regional,Usuario_has_Actividad.Usuario_idUsuario, COUNT(Usuario_has_Actividad.Usuario_idUsuario) 
                    FROM Usuario_has_Actividad,Usuario, Actividad, Moto
                    WHERE Usuario.idUsuario=Usuario_has_Actividad.Usuario_idUsuario
                    AND Actividad.idActividades= Usuario_has_Actividad.Actividad_idActividades
                    AND Actividad.Moto_id=Moto.id
                    AND Usuario_has_Actividad.Calificacion>=80 
                    AND Moto.Posventa=1
                    `+ filters + `
                    GROUP BY Usuario_has_Actividad.Usuario_idUsuario,Usuario_has_Actividad.Actividad_idActividades,Usuario.Gerente_regional,Usuario.Razon_social,Usuario.Agencia)t
                    GROUP BY t.Usuario_idUsuario)j,Usuario
                    WHERE Usuario.idUsuario=j.Usuario_idUsuario
                    GROUP BY Usuario.Gerente_regional,Usuario.Razon_social,Usuario.Agencia )p, (SELECT Usuario.Gerente_regional,SUM(Usuario.CantCursos) totalCursos FROM Usuario GROUP BY Usuario.Gerente_regional)q
                    WHERE p.Gerente_regional=q.Gerente_regional
                    GROUP BY p.Gerente_regional, p.Zona`, async function (err, result) {
            if (err) throw err;
            await res.send(result);
            console.log(`Se ha consultado el procentaje de cumplimiento General `);
        });

    } catch (error) {
        console.error(error);
    };
};

view.resultEachCumpGenProm = async (req, res) => {
    console.log(req.body, "Promedio General ");

    filters = buildFiltros(req.body);
    console.log(filters);
    try {
        pool.query(`SELECT round(AVG(temp.avance),2) as PromTotal FROM (SELECT p.Zona,p.Gerente_regional,round(p.aprobados*100/q.totalCursos,2) AS avance FROM 
                    (SELECT Usuario.Zona,Usuario.Gerente_regional,Usuario.Razon_social, Usuario.Agencia, SUM(j.aprobados) aprobados FROM ( SELECT t.Usuario_idUsuario, COUNT(t.Usuario_idUsuario) AS aprobados
                    FROM(
                    SELECT Usuario.Zona,Usuario.Razon_social, Usuario.Agencia, Usuario.Gerente_regional,Usuario_has_Actividad.Usuario_idUsuario, COUNT(Usuario_has_Actividad.Usuario_idUsuario) 
                    FROM Usuario_has_Actividad,Usuario, Actividad, Moto
                    WHERE Usuario.idUsuario=Usuario_has_Actividad.Usuario_idUsuario
                    AND Actividad.idActividades= Usuario_has_Actividad.Actividad_idActividades
                    AND Actividad.Moto_id=Moto.id
                    AND Usuario_has_Actividad.Calificacion>=80 
                    AND Moto.Posventa=1
                    `+ filters + `
                    GROUP BY Usuario_has_Actividad.Usuario_idUsuario,Usuario_has_Actividad.Actividad_idActividades,Usuario.Gerente_regional,Usuario.Razon_social,Usuario.Agencia)t
                    GROUP BY t.Usuario_idUsuario)j,Usuario
                    WHERE Usuario.idUsuario=j.Usuario_idUsuario
                    GROUP BY Usuario.Gerente_regional,Usuario.Razon_social,Usuario.Agencia )p, (SELECT Usuario.Gerente_regional,SUM(Usuario.CantCursos) totalCursos FROM Usuario GROUP BY Usuario.Gerente_regional)q
                    WHERE p.Gerente_regional=q.Gerente_regional
                    GROUP BY p.Gerente_regional, p.Zona)temp`, async function (err, result) {
            if (err) throw err;
            await res.send(result);
            console.log(`Se ha consultado el procentaje de cumplimiento General `);
        });

    } catch (error) {
        console.error(error);
    };
};

view.resultEachCumpEmpAge = async (req, res) => {
    console.log(req.body, "Promedio General ");

    filters = buildFiltros(req.body);
    console.log(filters);
    try {
        pool.query(`SELECT p.Zona,p.Gerente_regional,p.Razon_social,p.Agencia ,round(p.aprobados*100/q.totalCursos,2) AS avance FROM 
                    (SELECT Usuario.Zona,Usuario.Gerente_regional,Usuario.Razon_social, Usuario.Agencia, SUM(j.aprobados) aprobados FROM ( SELECT t.Usuario_idUsuario, COUNT(t.Usuario_idUsuario) AS aprobados
                    FROM(
                    SELECT Usuario.Zona,Usuario.Razon_social, Usuario.Agencia, Usuario.Gerente_regional,Usuario_has_Actividad.Usuario_idUsuario, COUNT(Usuario_has_Actividad.Usuario_idUsuario) 
                    FROM Usuario_has_Actividad,Usuario, Actividad, Moto
                    WHERE Usuario.idUsuario=Usuario_has_Actividad.Usuario_idUsuario
                    AND Actividad.idActividades= Usuario_has_Actividad.Actividad_idActividades
                    AND Actividad.Moto_id=Moto.id
                    AND Usuario_has_Actividad.Calificacion>=80 
                    AND Moto.Posventa=1 
                    `+ filters + `
                    GROUP BY Usuario_has_Actividad.Usuario_idUsuario,Usuario_has_Actividad.Actividad_idActividades,Usuario.Gerente_regional,Usuario.Razon_social,Usuario.Agencia)t
                    GROUP BY t.Usuario_idUsuario)j,Usuario
                    WHERE Usuario.idUsuario=j.Usuario_idUsuario
                    GROUP BY Usuario.Gerente_regional,Usuario.Razon_social,Usuario.Agencia )p, (SELECT Usuario.Gerente_regional,SUM(Usuario.CantCursos) totalCursos FROM Usuario GROUP BY Usuario.Gerente_regional)q
                    WHERE p.Gerente_regional=q.Gerente_regional
                    GROUP BY p.Gerente_regional, p.Agencia`, async function (err, result) {
            if (err) throw err;
            await res.send(result);
            console.log(`Se ha consultado el procentaje de cumplimiento General `);
        });

    } catch (error) {
        console.error(error);
    };
};

view.resultEachCumpEmpresa = async (req, res) => {
    console.log(req.body, "Promedio General ");

    filters = buildFiltros(req.body);
    console.log(filters);
    try {
        pool.query(`SELECT p.Zona,p.Gerente_regional,p.Razon_social,round(p.aprobados*100/q.totalCursos,2) AS avance FROM 
                    (SELECT Usuario.Zona,Usuario.Gerente_regional,Usuario.Razon_social, Usuario.Agencia, SUM(j.aprobados) aprobados FROM ( SELECT t.Usuario_idUsuario, COUNT(t.Usuario_idUsuario) AS aprobados
                    FROM(
                    SELECT Usuario.Zona,Usuario.Razon_social, Usuario.Agencia, Usuario.Gerente_regional,Usuario_has_Actividad.Usuario_idUsuario, COUNT(Usuario_has_Actividad.Usuario_idUsuario) 
                    FROM Usuario_has_Actividad,Usuario, Actividad, Moto
                    WHERE Usuario.idUsuario=Usuario_has_Actividad.Usuario_idUsuario
                    AND Actividad.idActividades= Usuario_has_Actividad.Actividad_idActividades
                    AND Actividad.Moto_id=Moto.id
                    AND Usuario_has_Actividad.Calificacion>=80 
                    AND Moto.Posventa=1
                    `+ filters + `
                    GROUP BY Usuario_has_Actividad.Usuario_idUsuario,Usuario_has_Actividad.Actividad_idActividades,Usuario.Gerente_regional,Usuario.Razon_social,Usuario.Agencia)t
                    GROUP BY t.Usuario_idUsuario)j,Usuario
                    WHERE Usuario.idUsuario=j.Usuario_idUsuario
                    GROUP BY Usuario.Gerente_regional,Usuario.Razon_social,Usuario.Agencia )p, (SELECT Usuario.Gerente_regional,SUM(Usuario.CantCursos) totalCursos FROM Usuario GROUP BY Usuario.Gerente_regional)q
                    WHERE p.Gerente_regional=q.Gerente_regional
                    GROUP BY p.Gerente_regional, p.Zona`, async function (err, result) {
            if (err) throw err;
            await res.send(result);
            console.log(`Se ha consultado el procentaje de cumplimiento General `);
        });

    } catch (error) {
        console.error(error);
    };
};

view.resultEachCumpCursoNombre = async (req, res) => {
    console.log(req.body, "Promedio General ");

    filters = buildFiltros(req.body);
    console.log(filters);
    try {
        pool.query(`SELECT j.Razon_social,j.Agencia, j.Nombre, j.CantCursos, j.aprobados, ROUND(((j.aprobados*100)/j.CantCursos),2) AS Avance
                    FROM
                    (SELECT t.Agencia, t.Razon_social,t.Nombre,t.Usuario_idUsuario,t.CantCursos, COUNT(t.Usuario_idUsuario) AS aprobados
                    FROM(
                    SELECT Usuario.Nombre, Usuario.CantCursos, Usuario.Zona,Usuario.Razon_social, Usuario.Agencia, Usuario.Gerente_regional,Usuario_has_Actividad.Usuario_idUsuario, COUNT(Usuario_has_Actividad.Usuario_idUsuario) 
                    FROM Usuario_has_Actividad,Usuario, Actividad, Moto
                    WHERE Usuario.idUsuario=Usuario_has_Actividad.Usuario_idUsuario
                    AND Actividad.idActividades= Usuario_has_Actividad.Actividad_idActividades
                    AND Actividad.Moto_id=Moto.id
                    AND Usuario_has_Actividad.Calificacion>=80 
                    AND Moto.Posventa=1 
                    `+ filters + `
                    GROUP BY Usuario_has_Actividad.Usuario_idUsuario,Usuario_has_Actividad.Actividad_idActividades,Usuario.Gerente_regional,Usuario.Razon_social,Usuario.Agencia)t
                    GROUP BY t.Usuario_idUsuario)j
                    `, async function (err, result) {
            if (err) throw err;
            await res.send(result);
            console.log(`Se ha consultado el procentaje de cumplimiento General `);
        });

    } catch (error) {
        console.error(error);
    };
};

view.resultEachCumpNombreGrupo = async (req, res) => {
    console.log(req.body, "Promedio General ");

    filters = buildFiltros(req.body);
    console.log(filters);
    try {
        pool.query(`SELECT j.Zona,j.Gerente_regional,j.Grupo, j.Nombre, j.CantCursos, j.aprobados, ROUND(((j.aprobados*100)/j.CantCursos),2) AS Avance
                    FROM
                    (SELECT t.Gerente_regional,t.Zona, t.Grupo, t.Razon_social,t.Nombre,t.Usuario_idUsuario,t.CantCursos, COUNT(t.Usuario_idUsuario) AS aprobados
                    FROM(
                    SELECT Usuario.Grupo, Usuario.Nombre,Usuario.CantCursos, Usuario.Zona,Usuario.Razon_social, Usuario.Agencia, Usuario.Gerente_regional,Usuario_has_Actividad.Usuario_idUsuario, COUNT(Usuario_has_Actividad.Usuario_idUsuario) 
                    FROM Usuario_has_Actividad,Usuario, Actividad, Moto
                    WHERE Usuario.idUsuario=Usuario_has_Actividad.Usuario_idUsuario
                    AND Actividad.idActividades= Usuario_has_Actividad.Actividad_idActividades
                    AND Actividad.Moto_id=Moto.id
                    AND Usuario_has_Actividad.Calificacion>=80 
                    AND Moto.Posventa=1
                    `+ filters + `
                    GROUP BY Usuario_has_Actividad.Usuario_idUsuario,Usuario_has_Actividad.Actividad_idActividades,Usuario.Gerente_regional,Usuario.Razon_social,Usuario.Agencia)t
                    GROUP BY t.Usuario_idUsuario)j`, async function (err, result) {
            if (err) throw err;
            await res.send(result);
            console.log(`Se ha consultado el procentaje de cumplimiento General `);
        });

    } catch (error) {
        console.error(error);
    };
};

view.resultEachExamRank = async (req, res) => {

    console.log(req.body, "Promedio Actividades");

    filters = buildFiltros(req.body);
    console.log(filters);
    
    try {
        let { idCurso } = req.params
        pool.query(`SELECT t.*, MAX(PromedioActividades) as Promedio
                    from(SELECT  Moto_id,Usuario_idUsuario,nombre, Intento_idIntento,Concesionario, MAX(Calificacion) as PromedioActividades, Usuario_has_Actividad.Fecha
                    FROM Usuario_has_Actividad
                    INNER JOIN Usuario ON Usuario_has_Actividad.Usuario_idUsuario = Usuario.idUsuario 
                    INNER JOIN Actividad ON Usuario_has_Actividad.Actividad_idActividades = Actividad.idActividades
                    INNER JOIN Moto ON Actividad.Moto_id = Moto.id
                    where Calificacion<>0
                    and Moto.Posventa = 1 `+ filters + ` group by Usuario_idUsuario, Intento_idIntento) t group by Usuario_idUsuario`, async function (err, result) {
            if (err) throw err;
            await res.send(result);
            console.log(`Se ha consultado Los Resultados la categoria en el 20% ${idCurso}`);
        });

    } catch (error) {
        console.error(error);
    };
};

view.resultEachRanking = async (req, res) => {

    console.log(req.body, "Promedio Actividades");

    filters = buildFiltros(req.body);
    console.log(filters);
    
    try {
        let { idCurso } = req.params
        pool.query(`SELECT t.*, MAX(PromedioActividades) as Calificacion_Max
                    from(SELECT  Moto_id,Usuario_idUsuario,nombre, Intento_idIntento,Concesionario, MAX(Calificacion) as PromedioActividades, Usuario_has_Actividad.Fecha
                    FROM Usuario_has_Actividad
                    INNER JOIN Usuario ON Usuario_has_Actividad.Usuario_idUsuario = Usuario.idUsuario 
                    INNER JOIN Actividad ON Usuario_has_Actividad.Actividad_idActividades = Actividad.idActividades
                    INNER JOIN Moto ON Actividad.Moto_id = Moto.id
                    where Calificacion<>0 AND Moto.Posventa = 1 `+filters+` group by Usuario_idUsuario, Intento_idIntento) t group by Usuario_idUsuario`, async function (err, result) {
            if (err) throw err;
            await res.send(result);
            console.log(`Se ha consultado Los Resultados la categoria en el 20% ${idCurso}`);
        });

    } catch (error) {
        console.error(error);
    };
};





view.resultEachPromEx = async (req, res) => {

    console.log(req.body, "sadasdsad asdsa ds");

    filters = buildFiltros(req.body);
    console.log(filters);

    try {
        let { idCurso } = req.params
        pool.query(`SELECT *, MAX(Calificacion)*0.8 AS PromedioExamen
                        FROM Usuario_has_Examen
                        INNER JOIN Usuario ON Usuario_has_Examen.Usuario_idUsuario = Usuario.idUsuario 
                        INNER JOIN Examen ON Usuario_has_Examen.Examen_idExamen = Examen.idExamen
                        INNER JOIN Moto ON Examen.Moto_id = Moto.id
                        WHERE  Moto_id=? `+ filters + `  GROUP BY Usuario_idUsuario ORDER BY PromedioExamen DESC;`, async function (err, result) {
            if (err) throw err;
            await res.send(result);
            console.log(`Se ha consultado Los Resultados el examen en el 80% ${idCurso}`);
        });

    } catch (error) {
        console.error(error);
    };
};


// Ver el resultado de la categoria 1
view.resultEachCat = async (req, res) => {

    console.log(req.body, "sadasdsad asdsa ds");

    filters = buildFiltros(req.body);
    console.log(filters);

    try {
        
        let { idCurso } = req.params
        pool.query(`SELECT f.Nombre_categoria, round(AVG(f.correctas)*25,2) AS promedio FROM (
                        SELECT  t.idCategoria,t.Nombre_categoria,t.Usuario_idUsuario,t.suma AS correctas FROM 
                        (SELECT DISTINCT  Usuario_has_Pregunta_examen.*,Categoria.idCategoria,Categoria.Nombre_categoria,SUM(Usuario_has_Pregunta_examen.Calificacion) AS suma FROM Usuario,Usuario_has_Pregunta_examen,Pregunta_examen,Examen,Categoria,Usuario_has_Moto
                        WHERE Usuario_has_Pregunta_examen.Pregunta_examen_idPregunta_examen=Pregunta_examen.idPregunta_examen
                        AND Examen.idExamen=Pregunta_examen.Examen_idExamen
                        AND Usuario.idUsuario=Usuario_has_Pregunta_examen.Usuario_idUsuario
                        AND Usuario_has_Moto.Usuario_idUsuario=Usuario_has_Pregunta_examen.Usuario_idUsuario
                        AND  Usuario.idUsuario=Usuario_has_Moto.Usuario_idUsuario
                        AND Usuario_has_Moto.Intento_idIntento=Usuario_has_Pregunta_examen.Intento_idIntento
                        AND Categoria.idCategoria=Pregunta_examen.Categoria_idCategoria
                        `+ filters + ` 
                        GROUP BY Usuario_has_Pregunta_examen.Intento_idIntento,Usuario_has_Pregunta_examen.Usuario_idUsuario,Categoria.idCategoria
                        order BY suma desc) t
                        GROUP BY t.Usuario_idUsuario,t.idCategoria) f`, async function (err, result) {
            if (err) throw err;
            await res.send(result);
            console.log(`Se ha consultado Los Resultados de la Categoria 5 ${idCurso}`);
        });

    } catch (error) {
        console.error(error);
    };
};
// Ver el resultado de la categoria 2
view.resultEachCat2 = async (req, res) => {
    try {
        let { idCurso } = req.params
        pool.query(`select *, (SUM(Calificacion_Categoria)/count(distinct Usuario_idUsuario)) as Categoria_2 from (SELECT Usuario_idUsuario, if(Calificacion=1,25,0) as Calificacion_Categoria,Nombre_categoria
                        FROM Usuario_has_Pregunta_examen
                        INNER JOIN Pregunta_examen ON Usuario_has_Pregunta_examen.Pregunta_examen_idPregunta_examen = Pregunta_examen.idPregunta_examen
                        INNER JOIN Usuario ON Usuario_has_Pregunta_examen.Usuario_idUsuario = Usuario.idUsuario
                        INNER JOIN Examen ON Pregunta_examen.Examen_idExamen =Examen.idExamen
                        INNER JOIN Moto ON Examen.Moto_id = Moto.id
                        INNER JOIN Categoria ON Pregunta_examen.Categoria_IdCategoria = Categoria.idCategoria
                        where Categoria_IdCategoria = 2 And Moto_id=? AND Calificacion<>0 group by Usuario_has_Pregunta_examen.id) t`, idCurso, async function (err, result) {
            if (err) throw err;
            await res.send(result);
            console.log(`Se ha consultado Los Resultados de la Categoria 2 ${idCurso}`);
        });

    } catch (error) {
        console.error(error);
    };
};
// Ver el resultado de la categoria 3
view.resultEachCat3 = async (req, res) => {
    try {
        let { idCurso } = req.params
        pool.query(`select *, (SUM(Calificacion_Categoria)/count(distinct Usuario_idUsuario)) as Categoria_3 from (SELECT Usuario_idUsuario, if(Calificacion=1,25,0) as Calificacion_Categoria,Nombre_categoria
                        FROM Usuario_has_Pregunta_examen
                        INNER JOIN Pregunta_examen ON Usuario_has_Pregunta_examen.Pregunta_examen_idPregunta_examen = Pregunta_examen.idPregunta_examen
                        INNER JOIN Usuario ON Usuario_has_Pregunta_examen.Usuario_idUsuario = Usuario.idUsuario
                        INNER JOIN Examen ON Pregunta_examen.Examen_idExamen =Examen.idExamen
                        INNER JOIN Moto ON Examen.Moto_id = Moto.id
                        INNER JOIN Categoria ON Pregunta_examen.Categoria_IdCategoria = Categoria.idCategoria
                        where Categoria_IdCategoria = 3 And Moto_id=? AND Calificacion<>0 group by Usuario_has_Pregunta_examen.id) t`, idCurso, async function (err, result) {
            if (err) throw err;
            await res.send(result);
            console.log(`Se ha consultado Los Resultados de la Categoria 3 ${idCurso}`);
        });

    } catch (error) {
        console.error(error);
    };
};
// Ver el resultado de la categoria 4
view.resultEachCat4 = async (req, res) => {
    try {
        let { idCurso } = req.params
        pool.query(`select *, (SUM(Calificacion_Categoria)/count(distinct Usuario_idUsuario)) as Categoria_4 from (SELECT Usuario_idUsuario, if(Calificacion=1,25,0) as Calificacion_Categoria,Nombre_categoria
                        FROM Usuario_has_Pregunta_examen
                        INNER JOIN Pregunta_examen ON Usuario_has_Pregunta_examen.Pregunta_examen_idPregunta_examen = Pregunta_examen.idPregunta_examen
                        INNER JOIN Usuario ON Usuario_has_Pregunta_examen.Usuario_idUsuario = Usuario.idUsuario
                        INNER JOIN Examen ON Pregunta_examen.Examen_idExamen =Examen.idExamen
                        INNER JOIN Moto ON Examen.Moto_id = Moto.id
                        INNER JOIN Categoria ON Pregunta_examen.Categoria_IdCategoria = Categoria.idCategoria
                        where Categoria_IdCategoria = 4 And Moto_id=? AND Calificacion<>0 group by Usuario_has_Pregunta_examen.id) t`, idCurso, async function (err, result) {
            if (err) throw err;
            await res.send(result);
            console.log(`Se ha consultado Los Resultados de la Categoria 4 ${idCurso}`);
        });

    } catch (error) {
        console.error(error);
    };
}; 1
// Ver el resultado de la categoria 5
view.resultEachCat5 = async (req, res) => {
    try {
        let { idCurso } = req.params
        pool.query(`SELECT f.Nombre_categoria, round(AVG(f.correctas)*25,2) AS promedio FROM (
                        SELECT  t.idCategoria,t.Nombre_categoria,t.Usuario_idUsuario,t.suma AS correctas FROM 
                        (SELECT DISTINCT  Usuario_has_Pregunta_examen.*,Categoria.idCategoria,Categoria.Nombre_categoria,SUM(Usuario_has_Pregunta_examen.Calificacion) AS suma FROM Usuario_has_Pregunta_examen,Pregunta_examen,Examen,Categoria,Usuario_has_Moto
                        WHERE Usuario_has_Pregunta_examen.Pregunta_examen_idPregunta_examen=Pregunta_examen.idPregunta_examen
                        AND Examen.idExamen=Pregunta_examen.Examen_idExamen
                        AND Usuario_has_Moto.Usuario_idUsuario=Usuario_has_Pregunta_examen.Usuario_idUsuario
                        AND Usuario_has_Moto.Intento_idIntento=Usuario_has_Pregunta_examen.Intento_idIntento
                        AND Categoria.idCategoria=Pregunta_examen.Categoria_idCategoria
                        AND Categoria.idCategoria=5
                        AND Usuario_has_Moto.Moto_id=?
                        GROUP BY Usuario_has_Pregunta_examen.Intento_idIntento,Usuario_has_Pregunta_examen.Usuario_idUsuario,Categoria.idCategoria
                        order BY suma desc) t
                        GROUP BY t.Usuario_idUsuario,t.idCategoria) f`, idCurso, async function (err, result) {
            if (err) throw err;
            await res.send(result);
            console.log(`Se ha consultado Los Resultados de la Categoria 5 ${idCurso}`);
        });

    } catch (error) {
        console.error(error);
    };
};

// Ver el resultado de la ciudad
view.FiltroCiudad = async (req, res) => {
    try {
        pool.query(`select Ciudad from davzzeunbx.Usuario
                group by Ciudad`, async function (err, result) {
            if (err) throw err;
            await res.send(result);
            console.log(`Se ha consultado Los filtros de ciudad `);
        });

    } catch (error) {
        console.error(error);
    };
};
// Ver el resultado Gerente regional
view.FiltroRegional = async (req, res) => {
    try {
        pool.query(`select Gerente_regional from davzzeunbx.Usuario
                group by Gerente_regional`, async function (err, result) {
            if (err) throw err;
            await res.send(result);
            console.log(`Se ha consultado Los filtros de ciudad `);
        });

    } catch (error) {
        console.error(error);
    };
};

// Ver el resultado la rezon social
view.FiltroSocial = async (req, res) => {
    try {
        pool.query(`select Razon_social from davzzeunbx.Usuario
                group by Razon_social`, async function (err, result) {
            if (err) throw err;
            await res.send(result);
            console.log(`Se ha consultado Los filtros de ciudad `);
        });

    } catch (error) {
        console.error(error);
    };
};



//Filtrado de Datos para cualquier filtros
view.FiltrosSelect = async (req, res) => {

    try {
        // variables
        let grupo = req.query.grupo;
        let userId = req.query.userId;
        let gerente = req.query.gerente;
        let razon = req.query.razon;
        let ciudad = req.query.ciudad;
        let fecha = req.query.fecha;

        //Variables consulta SQL
        let grupo2 = "";
        let nombre2 = "";
        let gerente2 = "";
        let razon2 = "";
        let ciudad2 = "";
        let fecha2 = "";


        // Consulta del grupo 1 por defecto
        if (grupo) { grupo2 = `Grupo = ${grupo}` } else { grupo2 = `Grupo = 3 or Grupo = 4` };
        if (userId) { nombre2 = `and idUsuario = ${userId}` } else { nombre2 = `` };
        if (gerente) { gerente2 = `and Gerente_regional = ${gerente}` } else { gerente2 = '' };
        if (razon) { razon2 = `and Razon_social = ${razon}` } else { razon2 = `` };
        if (ciudad) { ciudad2 = `and Ciudad = ${ciudad}` } else { ciudad2 = `` };
        if (fecha) { fecha2 = `and Fecha = ${fecha}` } else { fecha2 = `` }


        pool.query(`SELECT distinct * FROM Usuario WHERE ${grupo2} ${nombre2} ${gerente2} ${razon2} ${ciudad2}`, async (err, result) => {
            res.send(result);
        })

    } catch (error) {

    }

}

view.ConsultaFiltrada = async (req, res) => {

    try {
        // variables
        let grupo = req.query.grupo;
        let userId = req.query.userId;
        let gerente = req.query.gerente;
        let razon = req.query.razon;
        let ciudades = req.query.ciudades;
        // let fecha = req.query.fecha;

        //Variables consulta SQL
        let grupo2 = "";
        let nombre2 = "";
        let gerente2 = "";
        let razon2 = "";
        let ciudad2 = "";
        // let fecha2 = ""

        // Consulta del grupo 1 y 2 por defecto
        if (grupo == 'undefined') { grupo2 = `grupo IS NOT NULL` } else if (grupo !== undefined) { grupo2 = `Grupo = ${grupo}` };
        if (userId == 'undefined') { nombre2 = `and idUsuario IS NOT NULL` } else if (userId !== undefined) { nombre2 = `and idUsuario = ${userId}` }
        if (gerente == 'undefined') { gerente2 = `and Gerente_regional IS NOT NULL` } else if (gerente !== undefined) { gerente2 = `and Gerente_regional = "${gerente}"` };
        if (razon == 'undefined') { razon2 = ` and Razon_social IS NOT NULL` } else if (razon !== undefined) { razon2 = `and Razon_social ="${razon}"` };
        if (ciudades == 'undefined') { ciudad2 = `and Ciudad IS NOT NULL` } else if (ciudades !== undefined) { ciudad2 = `and Ciudad = "${ciudades}"` };
        // if(fecha == 'undefined' ){fecha2=` and Fecha IS NOT NULL`}else if(fecha!==undefined){fecha2=`and Fecha = ${fecha}`}

        pool.query(`SELECT *, MAX(Calificacion) AS Calificacion_Max FROM Usuario_has_Moto
                        INNER JOIN Usuario ON Usuario_has_Moto.Usuario_idUsuario = Usuario.idUsuario 
                        INNER JOIN Moto ON Usuario_has_Moto.Moto_id = Moto.id
                        WHERE ${grupo2} ${nombre2} ${gerente2} ${razon2} ${ciudad2} GROUP BY Usuario.idUsuario;`, async (err, result) => {
            if (err) throw err;

            if (result.length == 0) {
                res.send({
                    message: `No hay resultados para esta consulta`
                })
            } else {
                res.send(result);
            }

        });

    } catch (error) {

    };

};

// Ver el resultado la rezon social
view.CumplimientoGeneral = async (req, res) => {
    try {
        pool.query(`SELECT p.Zona,p.Gerente_regional,round(p.aprobados*100/q.totalCursos,2) AS avance FROM 
                    (SELECT Usuario.Zona,Usuario.Gerente_regional,Usuario.Razon_social, Usuario.Agencia, SUM(j.aprobados) aprobados FROM ( SELECT t.Usuario_idUsuario, COUNT(t.Usuario_idUsuario) AS aprobados
                    FROM(
                    SELECT Usuario.Zona,Usuario.Razon_social, Usuario.Agencia, Usuario.Gerente_regional,Usuario_has_Actividad.Usuario_idUsuario, COUNT(Usuario_has_Actividad.Usuario_idUsuario) 
                    FROM Usuario_has_Actividad,Usuario, Actividad, Moto
                    WHERE Usuario.idUsuario=Usuario_has_Actividad.Usuario_idUsuario
                    AND Actividad.idActividades= Usuario_has_Actividad.Actividad_idActividades
                    AND Actividad.Moto_id=Moto.id
                    AND Usuario_has_Actividad.Calificacion>=80 
                    AND Moto.Posventa=1
                    GROUP BY Usuario_has_Actividad.Usuario_idUsuario,Usuario_has_Actividad.Actividad_idActividades,Usuario.Gerente_regional,Usuario.Razon_social,Usuario.Agencia)t
                    GROUP BY t.Usuario_idUsuario)j,Usuario
                    WHERE Usuario.idUsuario=j.Usuario_idUsuario
                    GROUP BY Usuario.Gerente_regional,Usuario.Razon_social,Usuario.Agencia )p, (SELECT Usuario.Gerente_regional,SUM(Usuario.CantCursos) totalCursos FROM Usuario GROUP BY Usuario.Gerente_regional)q
                    WHERE p.Gerente_regional=q.Gerente_regional
                    GROUP BY p.Gerente_regional, p.Zona`, async function (err, result) {
            if (err) throw err;
            await res.send(result);
            console.log(`Se ha consultado el procentaje de cumplimiento General `);
        });

    } catch (error) {
        console.error(error);
    };
};

// Ver el resultado la rezon social
view.CumplimientoEmpresaAgencia = async (req, res) => {
    try {
        pool.query(`SELECT p.Zona,p.Gerente_regional,p.Razon_social,p.Agencia ,round(p.aprobados*100/q.totalCursos,2) AS avance FROM 
                    (SELECT Usuario.Zona,Usuario.Gerente_regional,Usuario.Razon_social, Usuario.Agencia, SUM(j.aprobados) aprobados FROM ( SELECT t.Usuario_idUsuario, COUNT(t.Usuario_idUsuario) AS aprobados
                    FROM(
                    SELECT Usuario.Zona,Usuario.Razon_social, Usuario.Agencia, Usuario.Gerente_regional,Usuario_has_Actividad.Usuario_idUsuario, COUNT(Usuario_has_Actividad.Usuario_idUsuario) 
                    FROM Usuario_has_Actividad,Usuario, Actividad, Moto
                    WHERE Usuario.idUsuario=Usuario_has_Actividad.Usuario_idUsuario
                    AND Actividad.idActividades= Usuario_has_Actividad.Actividad_idActividades
                    AND Actividad.Moto_id=Moto.id
                    AND Usuario_has_Actividad.Calificacion>=80 
                    AND Moto.Posventa=1 
                    GROUP BY Usuario_has_Actividad.Usuario_idUsuario,Usuario_has_Actividad.Actividad_idActividades,Usuario.Gerente_regional,Usuario.Razon_social,Usuario.Agencia)t
                    GROUP BY t.Usuario_idUsuario)j,Usuario
                    WHERE Usuario.idUsuario=j.Usuario_idUsuario
                    GROUP BY Usuario.Gerente_regional,Usuario.Razon_social,Usuario.Agencia )p, (SELECT Usuario.Gerente_regional,SUM(Usuario.CantCursos) totalCursos FROM Usuario GROUP BY Usuario.Gerente_regional)q
                    WHERE p.Gerente_regional=q.Gerente_regional
                    GROUP BY p.Gerente_regional, p.Agencia`, async function (err, result) {
            if (err) throw err;
            await res.send(result);
            console.log(`Se ha consultado Los filtros de ciudad `);
        });

    } catch (error) {
        console.error(error);
    };
};


//Ver el resultado la rezon social
view.CumplimientoEmpresa = async (req, res) => {
    try {
        pool.query(`SELECT p.Zona,p.Gerente_regional,p.Razon_social,round(p.aprobados*100/q.totalCursos,2) AS avance FROM 
                    (SELECT Usuario.Zona,Usuario.Gerente_regional,Usuario.Razon_social, Usuario.Agencia, SUM(j.aprobados) aprobados FROM ( SELECT t.Usuario_idUsuario, COUNT(t.Usuario_idUsuario) AS aprobados
                    FROM(
                    SELECT Usuario.Zona,Usuario.Razon_social, Usuario.Agencia, Usuario.Gerente_regional,Usuario_has_Actividad.Usuario_idUsuario, COUNT(Usuario_has_Actividad.Usuario_idUsuario) 
                    FROM Usuario_has_Actividad,Usuario, Actividad, Moto
                    WHERE Usuario.idUsuario=Usuario_has_Actividad.Usuario_idUsuario
                    AND Actividad.idActividades= Usuario_has_Actividad.Actividad_idActividades
                    AND Actividad.Moto_id=Moto.id
                    AND Usuario_has_Actividad.Calificacion>=80 
                    AND Moto.Posventa=1
                    GROUP BY Usuario_has_Actividad.Usuario_idUsuario,Usuario_has_Actividad.Actividad_idActividades,Usuario.Gerente_regional,Usuario.Razon_social,Usuario.Agencia)t
                    GROUP BY t.Usuario_idUsuario)j,Usuario
                    WHERE Usuario.idUsuario=j.Usuario_idUsuario
                    GROUP BY Usuario.Gerente_regional,Usuario.Razon_social,Usuario.Agencia )p, (SELECT Usuario.Gerente_regional,SUM(Usuario.CantCursos) totalCursos FROM Usuario GROUP BY Usuario.Gerente_regional)q
                    WHERE p.Gerente_regional=q.Gerente_regional
                    GROUP BY p.Gerente_regional, p.Zona`, async function (err, result) {
            if (err) throw err;
            await res.send(result);
            console.log(`Se ha consultado Los filtros de ciudad `);
        });

    } catch (error) {
        console.error(error);
    };
};


view.CumplimientoCursosNombre = async (req, res) => {
    try {
        pool.query(`SELECT j.Razon_social,j.Agencia, j.Nombre, j.CantCursos, j.aprobados, ROUND(((j.aprobados*100)/j.CantCursos),2) AS Avance
                    FROM
                    (SELECT t.Agencia, t.Razon_social,t.Nombre,t.Usuario_idUsuario,t.CantCursos, COUNT(t.Usuario_idUsuario) AS aprobados
                    FROM(
                    SELECT Usuario.Nombre, Usuario.CantCursos, Usuario.Zona,Usuario.Razon_social, Usuario.Agencia, Usuario.Gerente_regional,Usuario_has_Actividad.Usuario_idUsuario, COUNT(Usuario_has_Actividad.Usuario_idUsuario) 
                    FROM Usuario_has_Actividad,Usuario, Actividad, Moto
                    WHERE Usuario.idUsuario=Usuario_has_Actividad.Usuario_idUsuario
                    AND Actividad.idActividades= Usuario_has_Actividad.Actividad_idActividades
                    AND Actividad.Moto_id=Moto.id
                    AND Usuario_has_Actividad.Calificacion>=80 
                    AND Moto.Posventa=1
                    GROUP BY Usuario_has_Actividad.Usuario_idUsuario,Usuario_has_Actividad.Actividad_idActividades,Usuario.Gerente_regional,Usuario.Razon_social,Usuario.Agencia)t
                    GROUP BY t.Usuario_idUsuario)j`, async function (err, result) {
            if (err) throw err;
            await res.send(result);
            console.log(`Se ha consultado Los filtros de ciudad `);
        });

    } catch (error) {
        console.error(error);
    };
};

view.CumplimientoGrupo = async (req, res) => {
    try {
        pool.query(`SELECT j.Zona,j.Gerente_regional,j.Grupo, j.Nombre, j.CantCursos, j.aprobados, ROUND(((j.aprobados*100)/j.CantCursos),2) AS Avance
                    FROM
                    (SELECT t.Gerente_regional,t.Zona, t.Grupo, t.Razon_social,t.Nombre,t.Usuario_idUsuario,t.CantCursos, COUNT(t.Usuario_idUsuario) AS aprobados
                    FROM(
                    SELECT Usuario.Grupo, Usuario.Nombre,Usuario.CantCursos, Usuario.Zona,Usuario.Razon_social, Usuario.Agencia, Usuario.Gerente_regional,Usuario_has_Actividad.Usuario_idUsuario, COUNT(Usuario_has_Actividad.Usuario_idUsuario) 
                    FROM Usuario_has_Actividad,Usuario, Actividad, Moto
                    WHERE Usuario.idUsuario=Usuario_has_Actividad.Usuario_idUsuario
                    AND Actividad.idActividades= Usuario_has_Actividad.Actividad_idActividades
                    AND Actividad.Moto_id=Moto.id
                    AND Usuario_has_Actividad.Calificacion>=80 
                    AND Moto.Posventa=1
                    GROUP BY Usuario_has_Actividad.Usuario_idUsuario,Usuario_has_Actividad.Actividad_idActividades,Usuario.Gerente_regional,Usuario.Razon_social,Usuario.Agencia)t
                    GROUP BY t.Usuario_idUsuario)j`, async function (err, result) {
            if (err) throw err;
            await res.send(result);
            console.log(`Se ha consultado Los filtros de ciudad `);
        });

    } catch (error) {
        console.error(error);
    };
};

view.CumplimientoGeneralProm = async (req, res) => {
    try {
        pool.query(`SELECT round(AVG(temp.avance),2) as PromTotal FROM (SELECT p.Zona,p.Gerente_regional,round(p.aprobados*100/q.totalCursos,2) AS avance FROM 
                    (SELECT Usuario.Zona,Usuario.Gerente_regional,Usuario.Razon_social, Usuario.Agencia, SUM(j.aprobados) aprobados FROM ( SELECT t.Usuario_idUsuario, COUNT(t.Usuario_idUsuario) AS aprobados
                    FROM(
                    SELECT Usuario.Zona,Usuario.Razon_social, Usuario.Agencia, Usuario.Gerente_regional,Usuario_has_Actividad.Usuario_idUsuario, COUNT(Usuario_has_Actividad.Usuario_idUsuario) 
                    FROM Usuario_has_Actividad,Usuario, Actividad, Moto
                    WHERE Usuario.idUsuario=Usuario_has_Actividad.Usuario_idUsuario
                    AND Actividad.idActividades= Usuario_has_Actividad.Actividad_idActividades
                    AND Actividad.Moto_id=Moto.id
                    AND Usuario_has_Actividad.Calificacion>=80 
                    AND Moto.Posventa=1 
                    GROUP BY Usuario_has_Actividad.Usuario_idUsuario,Usuario_has_Actividad.Actividad_idActividades,Usuario.Gerente_regional,Usuario.Razon_social,Usuario.Agencia)t
                    GROUP BY t.Usuario_idUsuario)j,Usuario
                    WHERE Usuario.idUsuario=j.Usuario_idUsuario
                    GROUP BY Usuario.Gerente_regional,Usuario.Razon_social,Usuario.Agencia )p, (SELECT Usuario.Gerente_regional,SUM(Usuario.CantCursos) totalCursos FROM Usuario GROUP BY Usuario.Gerente_regional)q
                    WHERE p.Gerente_regional=q.Gerente_regional
                    GROUP BY p.Gerente_regional, p.Zona)temp`, async function (err, result) {
            if (err) throw err;
            await res.send(result);
            console.log(`Se ha consultado Los filtros de ciudad `);
        });

    } catch (error) {
        console.error(error);
    };
};
// 
