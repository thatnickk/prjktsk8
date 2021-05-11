function fetchItems() {
    let container = document.getElementById("item-container");

    fetch('http://localhost:3000/products', {
    method: 'get'
    }).then( (response) => {
        response.json().then((data) => {
            for(let i = 0; i < data.length; i++){
                let itemToAppend = `<div class="item"><img src="${data[i].img}">${data[i].name}<button id="${data[i].id}" onclick="addToCart(${data[i].id})">+</button></div>`;
                container.innerHTML += itemToAppend;
            }
        })
    })
}

fetchItems();

let listener = document.querySelectorAll(".catalog-category");
listener.forEach( (element) => {
    element.addEventListener('click', onClickCatalogCateg, false);
})

function onClickCatalogCateg(e) {
    var current = e.currentTarget;
    var tagname = current.innerText;
    if (tagname === "All"){
        tagname = '';
    }

    function filterByTag() {
        let container = document.getElementById("item-container");
    
        fetch('http://localhost:3000/products/filter/property?tag=' + tagname, {
            method: 'get'
        }).then( (response) => {
            while (container.hasChildNodes()){
                container.removeChild(container.lastChild);
            }

            response.json().then( (data) => {
                for (let i = 0; i < data.length; i++){
                    let itemToAppend = `<div class="item"><img src="${data[i].img}">${data[i].name}<button id="${data[i].id}" onclick="addToCart()">+</button></div>`;
                    container.innerHTML += itemToAppend;
                }
            })

        })
    }

    filterByTag();
}

let searchicon = document.getElementById("search-button");
searchicon.addEventListener('click', onClickSearch, false);

function onClickSearch(e){
    var searchWords = document.getElementById("search").value;

    function searchByName() {
        let container = document.getElementById("item-container");
    
        fetch('http://localhost:3000/products/search/searchterm?tag=' + searchWords, {
            method: 'get'
        }).then( (response) => {
            while (container.hasChildNodes()){
                container.removeChild(container.lastChild);
            }

            response.json().then( (data) => {
                for (let i = 0; i < data.length; i++){
                    let itemToAppend = `<div class="item"><img src="${data[i].img}">${data[i].name}<button id="${data[i].id}" onclick="addToCart()">+</button></div>`;
                    container.innerHTML += itemToAppend;
                }
            })

        })
    }

    searchByName();
}

function loginThing() {
    fetch('http://localhost:3000/login', {
        method: 'get'
    }).then( (response) => {
        response.json().then((login) =>{
            let navcontainer = document.getElementById("navbar");
            let loginButton = document.getElementById("login-button");
            if (login.state === true){
                // let logoutButton = `<div>
                // <button id="logoutButton" onclick="logmeout()"><i class="fa fa-address-card"></i>
                // </button>logout
                // </div>`
                let logoutButton = document.createElement("div");
                logoutButton.classList.add("logoutbox");
                let butter = document.createElement("button");
                butter.onclick = function(){logmeout()};
                butter.innerText = "logout";
                logoutButton.appendChild(butter);
                
                let editsbox = document.createElement("div");
                editsbox.classList.add("logoutbox2");

                let label1 = document.createElement("label");
                label1.innerText ="id:";
                let input1 = document.createElement("input");
                input1.id = "id";

                let label2 = document.createElement("label");
                label2.innerText ="denumire:";
                let input2 = document.createElement("input");
                input2.id = "naem";

                let label3 = document.createElement("label");
                label3.innerText ="link imagine:";
                let input3 = document.createElement("input");
                input3.id = "imaeg";

                let label4 = document.createElement("label");
                label4.innerText ="taguri:";
                let input4 = document.createElement("input");
                input4.id = "tage";

                let buttonEdit = document.createElement("button");
                let buttonAdd = document.createElement("button");
                let buttonDelete = document.createElement("button");

                buttonEdit.onclick = function(){editProduct()};
                buttonAdd.onclick = function(){addProduct()};
                buttonDelete.onclick = function(){deleteProduct()};

                buttonEdit.innerText = "{}";
                buttonAdd.innerText = "+";
                buttonDelete.innerText = "X";

                editsbox.appendChild(label1);
                editsbox.appendChild(input1);
                editsbox.appendChild(label2);
                editsbox.appendChild(input2);
                editsbox.appendChild(label3);
                editsbox.appendChild(input3);
                editsbox.appendChild(label4);
                editsbox.appendChild(input4);
                editsbox.appendChild(buttonEdit);
                editsbox.appendChild(buttonAdd);
                editsbox.appendChild(buttonDelete);

                loginButton.innerText = "LOGGED IN AS ADMIN";
                
                navcontainer.appendChild(logoutButton);
                navcontainer.appendChild(editsbox);
            }
            else{
                // let logbox = `<div class="loginbox" id="loginbox">
                // <input placeholder="username" id="userbox">
                // <input placeholder="password" id="passbox">
                // <button id="loggerButton" onclick="startLogin()"><i class="fa fa-address-card"></i></button>
                // </div>`;
                let logbox = document.createElement("div");
                logbox.classList.add("loginbox");
                logbox.id = "loginbox";

                let inp1 = document.createElement("input");
                inp1.id = "userbox";
                inp1.placeholder = "username";

                let inp2 = document.createElement("input");
                inp2.id = "passbox";
                inp2.placeholder = "password";

                let butte = document.createElement("button");
                butte.id = "loggerButton";
                butte.onclick = function(){startLogin()};
                
                let icon = document.createElement("i");
                icon.classList.add("fa");
                icon.classList.add("fa-address-card");
                butte.appendChild(icon);
                logbox.appendChild(inp1);
                logbox.appendChild(inp2);
                logbox.appendChild(butte);
                navcontainer.appendChild(logbox);
            }
        })
    })
}

loginThing();

function startLogin() {
    var user = document.getElementById("userbox").value;
    var pass = document.getElementById("passbox").value;
    fetch ('http://localhost:3000/checkuser', {
        method: 'get'
    }).then( (response) => {
        response.json().then( (users) => {

            for (let i = 0; i < users.length; i++){
                if (users[i].username == user){
                    if (users[i].password ==  pass){
                        logmein();
                    }
                    else{
                        window.alert("Wrong password");
                    }
                }
            }
        })
    })
}

function logmein() {
    var login = {
        state: true
    };
    fetch ('http://localhost:3000/login', {
        method: 'put',
        headers: {
            'content-type': 'application/json',
        },
        body: JSON.stringify(login)
    }).then( (response) => {
        console.log("ok");
    })
}

function logmeout() {
    var logout = {
        state: false
    };
    fetch ('http://localhost:3000/login', {
        method: 'put',
        headers: {
            'content-type': 'application/json'
        },
        body: JSON.stringify(logout)
    }).then( (response) => {
    })
}

function addProduct(){
    var name = document.getElementById("naem").value;
    var image = document.getElementById("imaeg").value;
    var tags = document.getElementById("tage").value;
    var newProduct = {
        name: name,
        img: image,
        tags: [tags]
    }
    fetch('http://localhost:3000/products', {
        method: 'post',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(newProduct)
    }).then((response) =>{
        console.log(newProduct);
    })
}

function deleteProduct(){
    var id = document.getElementById("id").value;
    fetch('http://localhost:3000/products/' + id, {
        method: 'delete',
        headers: {
            'Content-Type': 'application/json'
        }
    }).then((response) =>{
        window.location.reload();
    })
}

function editProduct(){
    var id = document.getElementById("id").value;
    var name = document.getElementById("naem").value;
    var image = document.getElementById("imaeg").value;
    var tags = document.getElementById("tage").value;
    var newProduct = {
        name: name,
        img: image,
        tags: [tags]
    }

    fetch('http://localhost:3000/products/' + id, {
        method: 'put',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(newProduct)
    }).then((response) =>{
        window.location.reload();
    })
}

function addToCart(id){
    fetch('http://localhost:3000/products/' + id, {
        method: 'get'
    }).then((response) => {
        response.json().then((product) =>{
            var cartItem = {
                id: product.id,
                name: product.name,
                img: product.img,
                tags: product.tags
            };
            fetch('http://localhost:3000/cart', {
                method: 'post',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(cartItem)
            }).then((respond) =>{
                console.log("added to cart");
            })
        })
    })
}