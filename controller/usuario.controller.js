
const create = ({username, email, password, rol = "usuario"}) => {
  return new Promise((resolve, reject) => {
    db.query(
      "insert into usuarios (username, email,password,rol) values(?,?,?,?)",
      [username, email, password, rol],
      (err, result) => {
        if (err) reject(err);
        resolve(result);
      }
    );
  });
};

// TODO: GET BY EMAIL

const getByEmail = (email) => {
  return new Promise((resolve, reject) => {
    db.query("select * from usuarios where email = ?", [email], (err, rows) => {
      if (err) reject(err);
      if (rows.length !== 1) resolve(null);
      resolve(rows[0]);
    });
  });
};

// TODO: GET BY USUARIO

const getByUser = (userId) => {
  return new Promise((resolve, reject) => {
    db.query(
      "select * from usuarios where id = ?",
      [userId],
      (err, rows) => {
        if (err) reject(err);
        if (rows.length !== 1) resolve(null);
        resolve(rows[0]);
      }
    );
  });
};

function getAllUsers () {
  return new Promise((resolve, reject) => {
    db.query("select id,username,email from usuarios", [], (err,rows)=>{
        if (err) reject(err)
        resolve(rows)
    })
  })
}

module.exports = {
  create,
  getByEmail,
  getByUser,
  getAllUsers
};
