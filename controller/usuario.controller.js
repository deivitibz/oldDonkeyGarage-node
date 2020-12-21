const create = ({username,email,password,rol = "Usuario"}) => {
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
    db.query("select * from usuarios where id = ?",[userId],(err, rows) => {
        if (err) reject(err);
        if (rows.length !== 1) resolve(null);
        resolve(rows[0]);
      }
    );
  });
};

// TODO : GETALLUSERS
function getAllUsers() {
  return new Promise((resolve, reject) => {
    db.query("select * from usuarios", [], (err, rows) => {
      if (err) reject(err);
      resolve(rows);
    });
  });
};

// TODO: DELETEBYID
const deleteById = (userId) => {
  return new Promise((resolve, reject) => {
    db.query('delete from olddonkeygarage.usuarios where id = ?', [userId], (err, result) => {
      if (err) resolve(null);
      resolve(result);
    });
  });
};

// TODO: UPDATEBYID
const updateById = (userId, {username,password,email,rol,nombre,apellidos,direccion,localidad,provincia,nombre_constructor,descripcion,persona_contacto,telefono,imagenes_usuario,imagenes_constructor
}) => {
  return new Promise((resolve, reject) => {
    db.query('update olddonkeygarage.usuarios set username=?, password=?, email=?, rol=?, nombre=?, apellidos=?, direccion=?, localidad=?, provincia=?, nombre_constructor=?, descripcion=?, persona_contacto=?, telefono=?,imagenes_usuario=?, imagenes_constructor=? where  id = ?', 
    [username,password, email, rol, nombre, apellidos, direccion, localidad, provincia, nombre_constructor, descripcion, persona_contacto, telefono, imagenes_usuario, imagenes_constructor, userId], (err, result) => {
      if (err) resolve(null);
      resolve(result);
    });
  });
};

const updatePerfil = (userId, {nombre,apellidos,direccion,localidad,provincia,nombre_constructor,descripcion,persona_contacto,telefono,imagenes_usuario,imagenes_constructor
}) => {
  return new Promise((resolve, reject) => {
    db.query('update olddonkeygarage.usuarios set nombre=?, apellidos=?, direccion=?, localidad=?, provincia=?, nombre_constructor=?, descripcion=?, persona_contacto=?, telefono=?,imagenes_usuario=?, imagenes_constructor=? where  id = ?', 
    [nombre, apellidos, direccion, localidad, provincia, nombre_constructor, descripcion, persona_contacto, telefono, imagenes_usuario, imagenes_constructor, userId], (err, result) => {
      if (err) resolve(null);
      resolve(result);
    });
  });
};

module.exports = {
  create,
  getByEmail,
  getByUser,
  getAllUsers,
  deleteById,
  updateById,
  updatePerfil
};