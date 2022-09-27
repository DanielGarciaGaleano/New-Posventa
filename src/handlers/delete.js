const pool = require('../../db/conectDB.js')
const erase = module.exports;

// Borrar nuevo Intento 
erase.deleteAttempt = async(req,res)=>{

    try {
        let {id}=req.params;

        pool.query("DELETE FROM Usuario_has_Intento WHERE id_usuario_intentos = ?", id, async(err,result)=>{
            if (err) throw err;
            await res.status(201).send({message:`Hemos Eliminado el Intento con ${id} de los registros`});
        });
        
    } catch (error) {
        res.status(500);
        res.send(`Hay un error tipo: ${error.message}`);
    };
};