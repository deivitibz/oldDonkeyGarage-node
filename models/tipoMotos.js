const getAll = () => {
    return new Promise((resolve, reject) => {
        db.query('select * from tipo_custom', (err, rows) => {
            if (err) reject(err);
            resolve(rows);
        });
    });
};

const getAllV2 = () => {
    return new Promise((resolve, reject) => {
        db.query('select * from tipo_custom', (err, rows) => {
            if (err) reject(err);
            resolve(rows);
        });
    });
};

module.exports = {
    getAll, getAllV2
}