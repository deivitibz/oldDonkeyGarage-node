const create = ({ titulo, imagenes = 'https://picsum.photos/200', descripcion, km, year, tipo_motocicleta, provincia, itv, homologacion, fecha_publicacion = new Date()}) => {
    return new Promise((resolve, reject) => {
        db.query(
            'insert into anuncios (titulo, imagenes, descripcion, km, year, tipo_motocicleta, provincia, itv, homologacion, fecha_publicacion) values(?,?,?,?,?,?,?,?,?,?)',
            [titulo, imagenes, descripcion, km, year, tipo_motocicleta, provincia, itv, homologacion, fecha_publicacion],
            (err, result) => {
                if (err) reject(err);
                resolve(result);
            }
        );
    });

}

// TODO: GET BY EMAIL

const getByEmail = (email) => {
    return new Promise((resolve, reject) => {
        db.query(
            'select * from usuarios where email = ?',
            [email],
            (err, rows) => {
                if (err) reject(err);
                if (rows.length !== 1) resolve(null);
                resolve(rows[0]);
            }
        );
    });
}


// TODO: GET BY USUARIO


const getByUser = (userId) => {
    return new Promise((resolve,reject)=>{
        db.query(
            'select * from usuarios where id = ?',
            [userId],
            (err,response) => {
                if (err) reject(err);
                if (rows.length !== 1) resolve (null);
                resolve(rows[0]);
            }
        )
    });
}


module.exports = {
    create,getByEmail,getByUser
}