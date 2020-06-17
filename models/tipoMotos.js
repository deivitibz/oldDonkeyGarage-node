const getAll = () => {
    return new Promise((resolve, reject) => {
        db.query('select * from tipo_moto', (err, rows) => {
            if (err) reject(err);
            resolve(rows);
        });
    });
};

const addNew = (newMoto) => {
    return new Promise ((resolve,reject)=>{
        db.query('insert into tipo_custom (tipo) values (?)',
        [newMoto.tipo],
        (err,result)=>{
            if(err) reject (err);
            resolve(result)
        });
    });
};

module.exports = {
    getAll, addNew
}