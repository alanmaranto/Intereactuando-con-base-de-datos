'use strict';

let bcrypt = require('bcrypt');

const createUser = (db) => {
    const Usuarios = db.collection('usuarios');

    Usuarios.findOne({nomusu: 'admin'}, (err, doc) => {
        if (err) throw err;

        if (doc) {
            console.log('Usuario registrado anteriormente');
        }
        else {
            let salt = bcrypt.genSaltSync();
            let password_hash = bcrypt.hashSync('clave', salt);
            Usuarios.insertOne({nomusu: 'admin', clave: password_hash}, (err, doc) => {
                if (err) throw err;
                console.log('usuario registrado correctamente...', JSON.stringify(doc));
            });
        }
        //db.close();
    });
}

module.exports = createUser