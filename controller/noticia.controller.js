// TODO : GETALLNOTICIAS
const getAllNoticias = () => {
    return new Promise((resolve, reject) => {
        db.query('select * from olddonkeygarage.noticia'), (err, rows) => {
            if (err) resolve(null);
            resolve(rows)
        };
    });
};

// TODO : GETBYID
const getById = (noticiaId) => {
    return new Promise((resolve, reject) => {
        db.query('select * from olddonkeygarage.noticia where id = ?', [noticiaId], (err, rows) => {
            if (err) reject(err);
            if (rows.length !== 1) resolve(null);
            resolve(rows[0])
        });
    });
};

// TODO : CREATE 
const create = ({
    titulo,
    descripcion,
    autor,
    categoria,
    imagen,
    estado,
    fecha_publicacion = new Date(),
    usuarios_id

}) => {
    return new Promise((resolve, reject) => {
        db.query('insert into olddonkeygarage.noticia (titulo, descripcion, autor, categoria, imagen, estado, fecha_publicacion, usuarios_id) values(?,?,?,?,?,?,?,?)', [titulo, descripcion, autor, categoria, imagen, estado, fecha_publicacion, usuarios_id], (err, result) => {
            if (err) resolve(null),
                resolve(result);
        });
    });
};

// TODO: DELETEBYID

const deleteById = (noticiaId) => {
    return new Promise((resolve, reject) => {
        db.query('select * from olddonkeygarage.noticia where id = ?', [noticiaId], (err, result) => {
            if (err) resolve(null);
            resolve(result);
        });
    });
};

// TODO : UPDATEBYID

const updateById = (noticiaId, {
    titulo,
    descripcion,
    autor,
    categoria,
    imagen,
    estado,
    usuarios_id
}) => {
    return new Promise((resolve, reject) => {
        db.query('update olddonkeygarage.noticia set titulo=?, descripcion=?, autor=?, categoria=?, imagen=?, estado=?, fecha_publicacion=?, usuarios_id=?', [titulo, descripcion, autor, categoria, imagen, estado, new Date(), usuarios_id, noticiaId], (err, result) => {
            if (err) resolve(null);
            resolve(result);
        });
    });
};

module.exports = {
    getAllNoticias,
    getById,
    create,
    deleteById,
    updateById
}