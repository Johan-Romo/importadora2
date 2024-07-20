'use strict'
var Producto = require('../models/producto');
var fs = require('fs');
const registro_producto_admin = async function (req,res){
 
        if (req.user){
            if(req.user.role === 'admin'){
                let data =  req.body;
                var img_path = req.files.portada.path;
                var name = img_path.split('\\')
                var portada_name = name[2];
                data.slug =data.titulo.toLowerCase().replace(/ /g, '-').replace(/[^\w-]+/g,'');
                data.portada=portada_name;
                let reg = await Producto.create(data);

                res.status(200).send({data:reg});
                
            }else{
                res.status(500).send({message: 'No Acces'});
            }
        }else{
            res.status(500).send({message: 'No Acces'});
        }
    
}

const listar_producto_admin = async function (req, res){
    
    if (req.user){
        if(req.user.role === 'admin'){
            var filtro = req.params['filtro'];
            let reg = await Producto.find({titulo: new RegExp(filtro, 'i')});
            res.status(200).send({data: reg});
            
        }else{
            res.status(500).send({message: 'No Acces'});
        }
    }else{
        res.status(500).send({message: 'No Acces'});
    }
}

const obtener_portada = async function (req,res){
    var img = req.params['img'];
    console.log(img);
}

module.exports={
    registro_producto_admin,
    listar_producto_admin,
    obtener_portada

}