function updateCartInfo() {
    const cartItems = JSON.parse(localStorage.getItem("cart")) || [];
    const cartCountElements = document.querySelectorAll(".count_cart");
    const cartTotalElements = document.querySelectorAll("#cart-total");
  
    let total = 0;
  
    // Calcula o total do carrinho
    cartItems.forEach((item) => {
      total += item.preco;
    });
  
    // Atualiza o número de itens no carrinho
    cartCountElements.forEach((element) => {
      element.textContent = cartItems.length;
    });
  
    // Atualiza o total do carrinho
    cartTotalElements.forEach((element) => {
      element.textContent = `R$${total.toFixed(2)}`;
    });
  }
  
  // Atualiza os dados do carrinho ao carregar a página
  window.onload = updateCartInfo;
  