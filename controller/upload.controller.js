
const uploadFileUser = ({
    originalname,
    mimetype,
    filename,
    path,
    size,
    userId,
    anuncioId,
    noticiaId
}) => {
    //console.log(originalName,mimetype,filename,path,size,userId);
    
    return new Promise ((resolve,reject) => {
        db.query(
            "insert into imagenes (originalname,mimetype,filename,path,size,fk_imagen_usuario,fk_imagen_anuncio,fk_imagen_noticia) values(?,?,?,?,?,?,?,?)",
            [originalname,mimetype,filename,path,size,userId,anuncioId,noticiaId],
            (err,result) => {
                if (err) reject (err);
                resolve(result);
            }
        )
    });
}





module.exports = {
    uploadFileUser
}