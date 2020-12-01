//TODO GETALLTUTORIAL

const getAllTutorial = () => {
    return new Promise((resolve, reject) => {
        db.query('select * from olddonkeygarage.video_tutorial', (err, rows) => {
            if (err) resolve(null);
            resolve(rows);
        });
    });
};

// TODO: GETBYID
const getById = (tutorialId) => {
    return new Promise((resolve, reject) => {
        db.query('select * from olddonkeygarage.video_tutorial where id = ?', [tutorialId], (err, rows) => {
            if (err) reject(err);
            if (rows.length !== 1) resolve(null);
            resolve(rows[0]);
        });
    });
};

// TODO: CREATE
const create = ({
    titulo,
    descripcion,
    autor,
    categoria,
    url_video,
    usuarios_id
}) => {
    return new Promise((resolve, reject) => {
        db.query('insert into olddonkeygarage.video_tutorial(titulo, descripcion,autor,categoria, url_video, fecha_publicacion, usuarios_id) values(?,?,?,?,?,?,?)', [titulo, descripcion, autor, categoria, url_video, new Date(), usuarios_id], (err, result) => {
            if (err) reject(err);
            resolve(result);
        });
    });
};

// TODO : DELETEBYID
const deleteById = (tutorialId) => {
    return new Promise((resolve, reject) => {
        db.query('DELETE FROM olddonkeygarage.video_tutorial where id=?', [tutorialId], (err, result) => {
            if (err) resolve(null);
            resolve(result);
        });
    });
};

// TODO : UPDATEBYID

const updateById = (tutorialId, {
    titulo,
    descripcion,
    autor,
    categoria,
    url_video,
    usuarios_id
}) => {
    return new Promise((resolve, reject) => {
        db.query('update olddonkeygarage.video_tutorial set titulo=?, descripcion=?, autor=?, categoria=?, url_video=?, fecha_publicacion=?, usuarios_id=? where id = ?', [titulo, descripcion, autor, categoria, url_video, new Date(), usuarios_id, tutorialId], (err, result) => {
            if (err) resolve(err);
            resolve(result);
        });
    });
}

module.exports = {
    getAllTutorial,
    getById,
    create,
    deleteById,
    updateById
}