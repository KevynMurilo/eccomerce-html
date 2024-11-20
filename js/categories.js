document.addEventListener("DOMContentLoaded", () => {
    const categoryList = document.getElementById("category-list");

    // Carrega os dados do arquivo JSON
    fetch("mocks/produtos.json")
        .then((response) => response.json())
        .then((mockData) => {
            // Conta os produtos por categoria
            const categoryCounts = {};

            // Conta todas as categorias combinadas
            mockData.forEach((product) => {
                const categories = product.categoria.split(", ");
                categories.forEach((category) => {
                    if (categoryCounts[category]) {
                        categoryCounts[category]++;
                    } else {
                        categoryCounts[category] = 1;
                    }
                });
            });

            // Renderiza as categorias
            Object.keys(categoryCounts).forEach((category) => {
                const categoryItem = document.createElement("li");
                categoryItem.innerHTML = `<a href="#" data-category="${category}">${category} (${categoryCounts[category]})</a>`;
                categoryList.appendChild(categoryItem);
            });

            // Adiciona evento de clique para listar produtos por categoria
            document.querySelectorAll("#category-list a").forEach((link) => {
                link.addEventListener("click", (e) => {
                    e.preventDefault();
                    const selectedCategory = e.target.dataset.category;
                    filterProductsByCategory(selectedCategory, mockData);
                });
            });
        })
        .catch((error) => {
            console.error("Erro ao carregar os dados:", error);
        });

    // Função para filtrar produtos por categoria
    const filterProductsByCategory = (category, products) => {
        const filteredProducts = products.filter((product) => 
            product.categoria.split(", ").includes(category)
        );

        const productContainer = document.getElementById("product-container");
        productContainer.innerHTML = ""; // Limpa os produtos atuais

        filteredProducts.forEach((product) => {
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
                            <a href="#" class="add-cart">+ Adicionar ao carrinho</a>
                            <div class="rating">
                                <i class="fa fa-star-o"></i>
                                <i class="fa fa-star-o"></i>
                                <i class="fa fa-star-o"></i>
                                <i class="fa fa-star-o"></i>
                                <i class="fa fa-star-o"></i>
                            </div>
                            <h5>$${product.preco.toFixed(2)}</h5>
                            <div class="product__color__select">
                                ${product.cores
                                    .map(
                                        (cor, index) => `
                                    <label for="pc-${product.id}-${index}" class="${cor.toLowerCase()}">
                                        <input type="radio" id="pc-${product.id}-${index}" name="color-${product.id}">
                                    </label>`
                                    )
                                    .join("")}
                            </div>
                        </div>
                    </div>
                </div>
            `;
            productContainer.innerHTML += productHTML;
        });

        // Rola para o topo da página
        window.scrollTo({
            top: 0,
            behavior: "smooth",
        });
    };
});
