
const render = (array)=>{
    const contProducts = document.getElementById('products')
    contProducts.innerHTML= ""
    array.forEach(product => {
        const div = document.createElement('div')
        div.className= " col-2 col-xs-6 col-sm-4 card  mb-3 flex-grow-1"
        div.style.maxWidth= "18rem"
        div.innerHTML= 

                    `
                        <div class="card-header bg-transparent ">
                            <p class="card-text"><small class="text-body-secondary">${product.category}</small>
                        </div>
                        <div class="card-body">
                            <h5 class="card-title fs-4 text fw-bold">${product.title}</h5>
                            <p class="card-text">${product.description}</p>
                        </div>
                        <div class="card-footer bg-transparent fs-4 text ">${product.price}</div>
                    `
        contProducts.appendChild(div)
    });

}

const socket = io()

socket.on("updateProducts", (data) =>{
    console.log(data)
    render(data)
    socket.emit('response', 'Hola soy el cliente' )
})

