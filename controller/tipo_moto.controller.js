// TODO : GETALLTIPOS
const getAllTipos = () => {
    return new Promise((resolve, reject) => {
        db.query('select * from olddonkeygarage.tipo_moto', (err, rows) => {
            if (err) resolve(null);
            resolve(rows);
        });
    });
};

// TODO : GETBYID
const getById = (tipoId) => {
    return new Promise((resolve, reject) => {
        db.query('select * from olddonkeygarage.tipo_moto where id = ?', [tipoId], (err, rows) => {
            if (err) reject(err);
            if (rows.length !== 1) resolve(null);
            resolve(rows[0])
        });
    });
};

// TODO: CREATE

const create = ({
    tipo

}) => {
    return new Promise((resolve, reject) => {
        db.query('insert into tipo_moto(tipo) values(?)', [tipo], (err, result) => {
            if (err) reject(err);
            resolve(result);
        });
    });
};

// TODO: DELETEBYID

const deleteById = (tipoId) => {
    return new Promise((resolve, reject) => {
        db.query('DELETE FROM olddonkeygarage.tipo_moto where id = ?', [tipoId], (err, result) => {
            if (err) reject(err);
            resolve(result);
        });
    });
};

// TODO: UPDATEBYID

const updateById = (tipoId, {
    tipo

}) => {
    return new Promise((resolve, reject) => {
        db.query('update olddonkeygarage.tipo_moto set tipo=? where id = ?', [tipo, tipoId], (err, result) => {
            if (err) resolve(null);
            resolve(result);
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