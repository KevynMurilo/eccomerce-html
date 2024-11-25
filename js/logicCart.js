function updateCart() {
    const cartItems = JSON.parse(localStorage.getItem("cart")) || [];
    const cartTable = document.getElementById("cart-items");
    const cartCountElements = document.querySelectorAll(".count_cart"); // Todos os elementos que exibem a quantidade de itens
    const cartTotalElements = document.querySelectorAll("#cart-total"); // Todos os elementos que exibem o total
    let total = 0;
  
    // Atualiza a tabela do carrinho (se existir)
    if (cartTable) {
      cartTable.innerHTML = "";
  
      cartItems.forEach((item, index) => {
        const itemTotal = item.preco; // Considerando preço unitário do item
        total += itemTotal;
  
        const row = document.createElement("tr");
        row.innerHTML = `
          <td class="product__cart__item">
              <div class="product__cart__item__pic">
                  <img src="${item.imagem}" alt="">
              </div>
              <div class="product__cart__item__text">
                  <h6>${item.nome}</h6>
                  <h5>R$${item.preco.toFixed(2)}</h5>
                  <p>Marca: ${item.marca}</p>
                  <p>Tamanho: ${item.tamanho.join(", ")}</p>
                  <p>Cores: ${item.cores.join(", ")}</p>
              </div>
          </td>
          <td class="quantity__item">
              <div class="quantity">
                  <div class="pro-qty-2">
                      <input type="text" value="1">
                  </div>
              </div>
          </td>
          <td class="cart__price">R$${itemTotal.toFixed(2)}</td>
          <td class="cart__close">
              <i class="fa fa-close" onclick="removeItem(${index})"></i>
          </td>
        `;
        cartTable.appendChild(row);
      });
    }
  
    // Atualiza o número total de itens no carrinho
    cartCountElements.forEach((countElement) => {
      countElement.textContent = cartItems.length;
    });
  
    // Atualiza o total do carrinho
    cartTotalElements.forEach((totalElement) => {
      totalElement.textContent = `R$${total.toFixed(2)}`;
    });
  }
  
  // Função para remover um item do carrinho
  function removeItem(index) {
    const cartItems = JSON.parse(localStorage.getItem("cart")) || [];
    cartItems.splice(index, 1); // Remove o item do array
    localStorage.setItem("cart", JSON.stringify(cartItems)); // Atualiza o localStorage
    updateCart(); // Atualiza a visualização do carrinho
  }
  
  // Atualiza o carrinho quando a página carrega
  window.onload = updateCart;
  