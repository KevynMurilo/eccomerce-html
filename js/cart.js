// Função para adicionar ao carrinho
function addToCart(product) {
    let cart = JSON.parse(localStorage.getItem("cart")) || [];
    const isInCart = cart.some((item) => item.id === product.id);

    if (!isInCart) {
        cart.push(product);
        localStorage.setItem("cart", JSON.stringify(cart));
        showModal("Produto adicionado ao carrinho!");
    } else {
        showModal("Este produto já está no carrinho!");
    }
}

// Função para exibir o modal do Bootstrap
function showModal(message) {
    const modalMessage = document.getElementById("modalMessage");
    modalMessage.innerText = message;
    $("#cartModal").modal("show");
}
