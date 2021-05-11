const uuid = require("uuid");

let repository = require("../repository/repository");

module.exports.getAllProducts = () => {
    const prodList = repository.readProductJSONFile();
    return prodList;
}

module.exports.getAllCartItems = () => {
    const prodList = repository.readCartJSONFile();
    return prodList;
}

module.exports.getAllUsers = () => {
    const userList = repository.readUserJSONFile();
    return userList;
}

module.exports.addProduct = (newProduct) => {
    const prodList = repository.readProductJSONFile();
    newProduct.id = uuid.v4.apply();

    prodList.push(newProduct)

    repository.writeProductJSONFile(prodList);

    return newProduct;
}

module.exports.addProducttoCart = (newProduct) => {

    const prodList = repository.readCartJSONFile();

    prodList.push(newProduct)

    repository.writeCartJSONFile(prodList);

    return newProduct;
}

module.exports.getItemById = (id) => {
    const prodList = repository.readProductJSONFile();
    let foundItem = null;
    prodList.forEach(item => {
        if(item.id === id) {
            foundItem = item;
        }
    })
    return foundItem;
}

module.exports.getItemByName = (name) => {
    const prodList = repository.readProductJSONFile();
    let foundItem = null;
    prodList.forEach(item => {
        if(item.name === name) {
            foundItem = item;
        }
    })
    return foundItem;
}

module.exports.updateItem = (id, item) => {
    const prodList = repository.readProductJSONFile();
    let updateItem = null;
    for(let i = 0; i < prodList.length; i++) {
        if(prodList[i].id === id) {
            if(item.name) {
                prodList[i].name = item.name;
            }
  
            if(item.img) {
                prodList[i].img = item.img;
            }

            if(item.tags) {
                prodList[i].tags = item.tags;
            }
            updateItem = prodList[i];
            break;
        }
    }
    repository.writeProductJSONFile(prodList);
    return updateItem;
}

module.exports.deleteItem = (id) => {
    const prodList = repository.readProductJSONFile();
    let checkIfItemExists = false;
    for(let i = 0; i < prodList.length; i++) {
        if(prodList[i].id === id) {
            checkIfItemExists = true;
            prodList.splice(i, 1);
            break;
        }
    }
    repository.writeProductJSONFile(prodList);
    return checkIfItemExists;
}

module.exports.deleteItemCart = (id) => {
    const prodList = repository.readCartJSONFile();
    let checkIfItemExists = false;
    for(let i = 0; i < prodList.length; i++) {
        if(prodList[i].id === id) {
            checkIfItemExists = true;
            prodList.splice(i, 1);
            break;
        }
    }
    repository.writeCartJSONFile(prodList);
    return checkIfItemExists;
}

module.exports.getItemsByTag = (tag) => {
    const prodList = repository.readProductJSONFile();
    if(tag == "" || tag == null || tag == undefined) {
        return prodList;
    }
    console.log(tag);
    let itemsToReturn = [];
    for(let i = 0; i < prodList.length; i++) {
        if(prodList[i].tags.includes(tag)) {
            itemsToReturn.push(prodList[i]);
        }
    }
    return itemsToReturn;
}

module.exports.searchItemsByName = (tag) => {
    const prodList = repository.readProductJSONFile();
    if(tag == "" || tag == null || tag == undefined) {
        return prodList;
    }
    console.log(tag);
    let itemsToReturn = [];
    for(let i = 0; i < prodList.length; i++) {
        if(prodList[i].name.includes(tag)) {
            itemsToReturn.push(prodList[i]);
        }
    }
    return itemsToReturn;
}

module.exports.returnLogin = () => {
    const login = repository.readloginJSONFile();
    return login; 
}

module.exports.changeLoginState = (newState) => {
    repository.writeloginJSONFile(newState);
    return newState;
}