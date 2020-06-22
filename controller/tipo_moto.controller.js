// TODO : GETALLTIPOS
const getAllTipos = () => {
    return new Promise((resolve, reject) => {
        db.query('select * from olddonkeygarage.tipo_moto'), (err, rows) => {
            if (err) resolve(null);
            resolve(rows);
        };
    });
};

// TODO : GETBYID
const getById = (tipoId) => {
    return new Promise((resolve, reject) => {
        db.query('select * from olddonkeygarage.tipo_moto where id = ?' [tipoId], (err, rows) => {
            if (err) resolve(null);
            resolve(rows[0]);
        });
    });
};

// TODO: CREATE

const create = ({
    tipo,
    anuncio_id
}) => {
    return new Promise((resolve, reject) => {
        db.query('insert into olddonkeygarage.tipo_moto(tipo, anuncio_id) values(?,?)' [tipo, anuncio_id], (err, result) => {
            if (err) resolve(null);
            resolve(result);
        });
    });
};

// TODO: DELETEBYID

const deleteById = (tipoId) => {
    return new Promise((resolve, reject) => {
        db.query('select * from olddonkeygarage.tipo_moto where id = ?', [tipoId], (err, result) => {
            if (err) resolve(null);
            resolve(result);
        });
    });
};

// TODO: UPDATEBYID

const updateById = (tipoId, {
    tipo,
    anuncio_id
}) => {
    return new Promise((resolve, reject) => {
        db.query('update olddonkeygarage.tipo_moto set tipo=?, usuario_id=?', [tipo, anuncio_id, tipoId], (err, result) => {
            if (err) resolve(null);
            resolve(result)
        });
    });
};

module.exports = {
    getAllTipos,
    getById,
    create,
    deleteById,
    updateById
}