function fetchCartItems(){
    var container = document.getElementById("sub-container-cart");
    fetch('http://localhost:3000/cart', {
        method: 'get'
    }).then((response) => {
        response.json().then((data) =>{
            for(let i = 0; i < data.length; i++){
                console.log(data[i].name);
                let itemToAppend = document.createElement("div");

                let image = document.createElement("img");
                image.setAttribute("src", data[i].img);

                let name = document.createElement("p");
                name.innerText = data[i].name + ',' + data[i].tags;

                let deleteButton = document.createElement("button");
                deleteButton.classList.add("qty-delete-container");
                deleteButton.innerText = "X";
                deleteButton.onclick = function(){deleteItemCart(data[i].id)};

                itemToAppend.classList.add("cart-item");
                itemToAppend.appendChild(image);
                itemToAppend.appendChild(name);
                itemToAppend.appendChild(deleteButton);

                container.appendChild(itemToAppend);
            }
        })
    })
}

fetchCartItems();

function deleteItemCart(id){
    fetch('http://localhost:3000/cart/' + id, {
        method: 'delete',
        headers: {
            'Content-Type': 'application/json'
        }
    }).then((response) =>{
        window.location.reload();
    })
}

function clearCart(){
    fetch('http://localhost:3000/cart', {
        method: 'get'
    }).then((response) =>{
        response.json().then((data) =>{
            for (let i=0; i<data.length; i++){
                deleteItemCart(data[i].id);
            }
        })
    })
}