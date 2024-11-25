document.addEventListener("DOMContentLoaded", () => {
    const productsPerPage = 12; // Número de produtos por página
    const productContainer = document.getElementById("product-container");
    const paginationContainer = document.getElementById("pagination-container");

    // Carrega os dados do arquivo JSON
    fetch("mocks/produtos.json")
        .then((response) => response.json())
        .then((mockData) => {
            const totalPages = Math.ceil(mockData.length / productsPerPage);

            // Função para renderizar produtos
            const renderProducts = (products) => {
                productContainer.innerHTML = ""; // Limpa os produtos atuais
                products.forEach((product) => {
                    const productHTML = `
                        <div class="col-lg-4 col-md-6 col-sm-6">
                            <div class="product__item ${product.desconto ? "sale" : ""}">
                                <div class="product__item__pic set-bg" style="background-image: url('${product.imagem}')">
                                    ${product.desconto ? '<span class="label">Desconto</span>' : ""}
                                    <ul class="product__hover">
                                        <li><a href="#"><img src="img/icon/heart.png" alt="Favorito"></a></li>
                                    </ul>
                                </div>
                                <div class="product__item__text">
                                    <h6>${product.nome}</h6>
                                    <a href="#" class="add-cart" data-product-id="${product.id}">+ Adicionar ao carrinho</a>
                                    <div class="rating">
                                        <i class="fa fa-star-o"></i>
                                        <i class="fa fa-star-o"></i>
                                        <i class="fa fa-star-o"></i>
                                        <i class="fa fa-star-o"></i>
                                        <i class="fa fa-star-o"></i>
                                    </div>
                                    <h5>$${product.preco.toFixed(2)}</h5>
                                </div>
                            </div>
                        </div>
                    `;
                    productContainer.innerHTML += productHTML;
                });

                // Adiciona funcionalidade ao botão "Adicionar ao Carrinho"
                document.querySelectorAll(".add-cart").forEach((button) => {
                    button.addEventListener("click", (e) => {
                        e.preventDefault();
                        const productId = parseInt(e.target.dataset.productId);
                        const product = products.find((p) => p.id === productId);
                        addToCart(product); // Chama a função do cart.js
                    });
                });
            };

            // Função para renderizar a navegação da paginação
            const renderPagination = () => {
                paginationContainer.innerHTML = ""; // Limpa a navegação atual
                for (let i = 1; i <= totalPages; i++) {
                    const pageLink = document.createElement("a");
                    pageLink.href = "#";
                    pageLink.innerText = i;
                    pageLink.dataset.page = i;

                    // Adiciona evento de clique para carregar a página
                    pageLink.addEventListener("click", (e) => {
                        e.preventDefault();
                        const pageNumber = parseInt(e.target.dataset.page);
                        loadPage(pageNumber);
                        updateActivePage(pageLink);
                        scrollToTop(); // Adiciona rolagem para o topo
                    });

                    paginationContainer.appendChild(pageLink);
                }
            };

            // Função para atualizar o link ativo
            const updateActivePage = (activeLink) => {
                document.querySelectorAll("#pagination-container a").forEach((link) => {
                    link.classList.remove("active");
                });
                activeLink.classList.add("active");
            };

            // Função para carregar uma página específica
            const loadPage = (pageNumber) => {
                const startIndex = (pageNumber - 1) * productsPerPage;
                const endIndex = startIndex + productsPerPage;
                const productsToDisplay = mockData.slice(startIndex, endIndex);
                renderProducts(productsToDisplay);
            };

            // Função para rolar para o topo da página
            const scrollToTop = () => {
                window.scrollTo({
                    top: 0,
                    behavior: "smooth", // Animação suave
                });
            };

            // Inicialização
            renderPagination();
            loadPage(1); // Carrega a primeira página por padrão
            updateActivePage(document.querySelector("#pagination-container a")); // Define a primeira página como ativa
        })
        .catch((error) => {
            console.error("Erro ao carregar os dados:", error);
        });
});
