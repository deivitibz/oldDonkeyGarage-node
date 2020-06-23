// TODO: GETALLANUNCIOS

const getAllAnuncios = () => {
    return new Promise((resolve, reject) => {
        db.query('select * from olddonkeygarage.anuncio', (err, rows) => {
            if (err) resolve(err);
            resolve(rows);
        });
    });
}

//TODO : GETBYID
const getById = (anuncioid) => {
    return new Promise((resolve, reject) => {
        db.query('select * from olddonkeygarage.anuncio where id = ?', [anuncioid], (err, rows) => {
            if (err) reject(err);
            if (rows.length !== 1) resolve(null);
            resolve(rows[0])
        });
    });
};

// TODO: CREATE

const create = ({
    titulo,
    imagenes = 'https://picsum.photos/200',
    descripcion,
    km,
    year,
    provincia,
    poblacion,
    itv,
    homologacion,
    precio,
    marca,
    modelo,
    usuarios_id
}) => {
    return new Promise((resolve, reject) => {
        db.query(
            'insert into olddonkeygarage.anuncio (titulo, imagenes, descripcion, km, year,  provincia, poblacion, itv, homologacion, fecha_publicacion, precio, marca, modelo, usuarios_id) values(?,?,?,?,?,?,?,?,?,?,?,?,?,?)',
            [titulo, imagenes, descripcion, km, year, provincia, poblacion, itv, homologacion, new Date(), precio, marca, modelo, usuarios_id],
            (err, result) => {
                if (err) reject(err);
                resolve(result);
            }
        );
    });

}

// TODO: DELETE
const deleteById = (anuncioId) => {
    return new Promise((resolve, reject) => {
        db.query('DELETE FROM olddonkeygarage.anuncio where id=?', [anuncioId], (err, result) => {
            if (err) reject(err);
            resolve(result)
        });
    });
};


//TODO: UPDATEBYID
const updateById = (pAnuncioId, {
    titulo,
    imagenes,
    descripcion,
    km,
    year,
    provincia,
    poblacion,
    itv,
    homologacion,
    precio,
    marca,
    modelo,
    usuarios_id
}) => {
    return new Promise((resolve, reject) => {
        db.query('update olddonkeygarage.anuncio set titulo=?, imagenes = ?, descripcion = ?, km = ?, year = ?, provincia = ?, poblacion = ?, itv = ?, homologacion = ?, fecha_publicacion = ?, precio = ?, marca = ?, modelo = ?, usuarios_id = ? where id = ?', [titulo, imagenes, descripcion, km, year, provincia, poblacion, itv, homologacion, new Date(), precio, marca, modelo, usuarios_id, pAnuncioId], (err, result) => {
            if (err) resolve(null);
            resolve(result);
        });
    });
};


module.exports = {
    getAllAnuncios,
    getById,
    create,
    deleteById,
    updateById
}