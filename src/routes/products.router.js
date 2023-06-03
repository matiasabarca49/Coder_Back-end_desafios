const express = require('express')
const MongoManager = require("../dao/db.js")

//Desestructuramos el objeto para obtener el constructor de Rutas
const { Router } = express
//Creamos una nueva instancia de Router
const router = new Router()

const mongoManager = new MongoManager("mongodb+srv://coderTest-1:jVd13ilZAKE7LUl8@cluster-mongo-coder-tes.qh8sdrt.mongodb.net/ecommerce")




/**
* GET
**/
router.get("/", async (req,res) =>{
    const products = await mongoManager.getProductFromDB()
    console.log(products)
    if (req.query.limit){
        products.splice(req.query.limit)
    }
    res.send({productos: products})
})


router.get("/:id", async (req,res) =>{
    const products = await mongoManager.getProductFromDB()
    const productFound = products.find( product => product.id === req.params.id)
    productFound
        ? res.send({status: "Success", producto: productFound})
        : res.send({status: "Error", reason: "Producto no encontrado"})
})

/**
* POST
**/

router.post("/", async (req, res) =>{
    const productAdded = await mongoManager.addProductToMongo(req.body)
    productAdded
        ?res.status(201).send({status: "Success", action: "Producto agregado a DB correctamente", producto: productAdded})
        :res.status(500).send({status: "Error", action: 'Campos Faltantes, mal escritos o  campo code repetido'})
})

router.post("/manyproducts", (req, res) =>{
    const prs = mongoManager.addManyProductToMongo(req.body,res)
    productAdded
        ?res.status(201).send({status: "Success", action: "Producto agregado a DB correctamente", productos: prs})
        :res.status(500).send({status: "Error", action: 'Campos Faltantes, mal escritos o  campo code repetido'})
})

/**
* PUT
*/

router.put("/:id", (req,res)=>{
   const productUpdated =  productManager.updateProduct( req.params.id, req.body )
   productUpdated
    ? res.send({status: "Success", action: "Producto actualizado correctamente", product: productUpdated})
    : res.send({status: "Error", reason: "Al producto le faltan campos o no existe "})
    
})

/**
* DELETE
*/

router.delete("/:id", (req,res) => {
    const productDelete = productManager.deleteProduct(req.params.id)
    productDelete
     ?res.send({status: "Success", action: "Producto borrado correctamente", product: productDelete})
     :res.send({status: "Error", reason: "El producto no existe"})
})


module.exports = router