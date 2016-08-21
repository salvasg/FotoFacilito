var Imagen = require("../models/imagenes");
var owner_check = require("./image_permission");

module.exports = function(req,res,next){
    Imagen.findById(req.params.id)
        .populate("creator")
        .exec(function(err,imagen){
        if(imagen != null && owner_check(imagen,req,res)){
            console.log("Encontre la imagen "+ imagen.title + " del usuario " + imagen.creator);
            res.locals.imagen = imagen;
            next();
        }else{
            res.redirect("/app");
        }
    })
}