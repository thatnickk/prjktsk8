var express = require('express');
var router = express.Router();

let service = require("../service/service");

router.get("/products", (req, res) => {
    let prodList = service.getAllProducts()
    if(prodList != undefined && prodList.length != 0) {
        res.status(200).send(prodList);
    } else {
        res.status(404).send("No items found!");
    }
});

router.post("/products", (req, res) => {
    let newItem = service.addProduct(req.body);
    res.status(200).send(newItem);
});

router.get("/products/:id", (req, res) => {
    let id = req.params.id;
    let item = service.getItemById(id)
    if(item === null) {
        res.status(404).send("No item found!");
    } else {
        res.status(200).send(item);
    }
});

router.get("/products/name/:name", (req, res) => {
    let name = req.params.name;
    let item = service.getItemByName(name);
    if(item === null) {
        res.status(404).send("No item found!");
    } else {
        res.status(200).send(item);
    }
})

router.get("/products/filter/property", (req, res) => {
    let tag = req.query.tag;
    let items = service.getItemsByTag(tag);
    if(items.length) {
        res.status(200).send(items);
    } else {
        res.status(404).send("Items not found!");
    }
})

router.get("/products/search/searchterm", (req, res) => {
    let tag = req.query.tag;
    let items = service.searchItemsByName(tag);
    if(items.length) {
        res.status(200).send(items);
    } else {
        res.status(404).send("Items not found!");
    }
})

// Update
router.put("/products/:id", (req, res) => {
    let id = req.params.id;
    let item = service.updateItem(id, req.body);
    if(item !== null) {
        res.status(200).send(item);
    } else {
        res.status(404).send("No item found!");
    }
});

router.delete("/products/:id", (req, res) => {
    let id = req.params.id;
    let deleteFlag = service.deleteItem(id);
    if(deleteFlag === true) {
        res.status(200).send("Item deleted!");
    } else {
        res.status(404).send("Item not found!");
    }
});

router.post("/cart", (req, res) => {
    let newItem = service.addProducttoCart(req.body);
    res.status(200).send(newItem);
});

router.get("/cart", (req, res) => {
    let prodList = service.getAllCartItems()
    if(prodList != undefined && prodList.length != 0) {
        res.status(200).send(prodList);
    } else {
        res.status(404).send("No items found!");
    }
});

router.delete("/cart/:id", (req, res) => {
    let id = req.params.id;
    let deleteFlag = service.deleteItemCart(id);
    if(deleteFlag === true) {
        res.status(200).send("Item deleted!");
    } else {
        res.status(404).send("Item not found!");
    }
});

router.get("/login", (req, res) => {
    let login = service.returnLogin();
    res.status(200).send(login);
});

router.put("/login", (req, res) => {
    let login = service.changeLoginState(req.body);
    res.status(200).send(login);
});

router.get("/checkuser", (req, res) => {
    let users = service.getAllUsers();
    if (users != undefined && users.length != 0){
        res.status(200).send(users);
    }
    else{
        res.status(404).send("No users found");
    }
});

module.exports = router;