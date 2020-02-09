//routes 
const _ =require('underscore')
const {Router}= require('express');
const router =Router();
const datosUsuarios =require('../datos.json');
router.get('/usuarios',(req, res)=>{
    res.json(datosUsuarios); 
    });
router.post('/usuarios',(req,res)=>{
    const {Mensaje, edad, ciudad}=req.body;
    if(Mensaje && edad && ciudad){
        const id =datosUsuarios.length +1;
        const nuevoMensaje ={...req.body,id};
       // console.log(datosUsuarios);
        datosUsuarios.push(nuevoMensaje);
        res.json(datosUsuarios);
    }else{
         
         res.status(500).json({error:'Hubo un error.'});
    }


});

router.put('/usuarios/:id',(req, res)=>{
const {id}=req.params;
const {Mensaje, edad , ciudad}=req.body;
if(Mensaje && edad && ciudad){
    _.each(datosUsuarios, (indice, valor)=>{
        if(indice.id==id){
            indice.Mensaje=Mensaje;
            indice.edad=edad;
            indice.ciudad=ciudad;
        }
    });
    res.json(datosUsuarios);
}else{
    res.status(500).json({error: 'Hubo un error..! El mensaje no se actualizo..!'});
}
});

router.delete('/usuarios/:id',(req,res)=>{

    _.each(datosUsuarios,(indice,valor)=>{
        const {id}=req.params;
        if(indice.id==id){
            datosUsuarios.splice(valor,1);
        }
    })
console.log(req.params);
res.send('Eliminado..!')
});

    module.exports =router;