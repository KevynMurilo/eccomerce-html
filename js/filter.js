document.addEventListener("DOMContentLoaded", () => {
    const brandList = document.getElementById("brand-list");
    const priceList = document.getElementById("price-list");
    const searchBox = document.getElementById("search-box");

    const priceRanges = [
        { label: "$0.00 - $50.00", min: 0, max: 50 },
        { label: "$50.00 - $100.00", min: 50, max: 100 },
        { label: "$100.00 - $150.00", min: 100, max: 150 },
        { label: "$150.00 - $200.00", min: 150, max: 200 },
        { label: "$200.00+", min: 200, max: Infinity },
    ];

    // Carrega os dados do arquivo JSON
    fetch("mocks/produtos.json")
        .then((response) => response.json())
        .then((mockData) => {
            // Função para contar os valores únicos
            const countUniqueValues = (key, array) => {
                return array.reduce((acc, item) => {
                    const values = Array.isArray(item[key]) ? item[key] : [item[key]];
                    values.forEach((value) => {
                        acc[value] = (acc[value] || 0) + 1;
                    });
                    return acc;
                }, {});
            };

            // Renderizar marcas
            const brandCounts = countUniqueValues("marca", mockData);
            renderFilterList(brandList, brandCounts, "marca", mockData);

            // Renderizar preços
            renderPriceFilters(priceList, priceRanges, mockData);

            // Adicionar evento ao campo de busca
            searchBox.addEventListener("input", (e) => {
                const searchTerm = e.target.value.toLowerCase();
                filterProductsBySearch(searchTerm, mockData);
            });
        })
        .catch((error) => {
            console.error("Erro ao carregar os dados:", error);
        });

    // Função para renderizar filtros dinâmicos
    const renderFilterList = (listContainer, counts, key, data) => {
        Object.keys(counts).forEach((value) => {
            const listItem = document.createElement("li");
            listItem.innerHTML = `<a href="#" data-filter="${value}" data-type="${key}">${value} (${counts[value]})</a>`;
            listContainer.appendChild(listItem);
        });

        // Adicionar evento de clique para filtro
        listContainer.querySelectorAll("a").forEach((link) => {
            link.addEventListener("click", (e) => {
                e.preventDefault();
                const filterValue = e.target.dataset.filter;
                const filterType = e.target.dataset.type;
                filterProducts(filterType, filterValue, data);
            });
        });
    };

    // Função para renderizar filtros de preços
    const renderPriceFilters = (listContainer, ranges, data) => {
        ranges.forEach((range) => {
            const listItem = document.createElement("li");
            listItem.innerHTML = `<a href="#" data-min="${range.min}" data-max="${range.max}">${range.label}</a>`;
            listContainer.appendChild(listItem);
        });

        // Adicionar evento de clique para filtro por preço
        listContainer.querySelectorAll("a").forEach((link) => {
            link.addEventListener("click", (e) => {
                e.preventDefault();
                const min = parseFloat(e.target.dataset.min);
                const max = parseFloat(e.target.dataset.max);
                filterProductsByPrice(min, max, data);
            });
        });
    };

    // Função para filtrar produtos por busca
    const filterProductsBySearch = (term, data) => {
        const filteredProducts = data.filter((product) =>
            product.nome.toLowerCase().includes(term)
        );

        renderFilteredProducts(filteredProducts);
    };

    // Função para filtrar produtos por chave (marca)
    const filterProducts = (key, value, data) => {
        const filteredProducts = data.filter((product) =>
            Array.isArray(product[key])
                ? product[key].includes(value)
                : product[key] === value
        );

        renderFilteredProducts(filteredProducts);
    };

    // Função para filtrar produtos por preço
    const filterProductsByPrice = (min, max, data) => {
        const filteredProducts = data.filter(
            (product) => product.preco >= min && product.preco <= max
        );

        renderFilteredProducts(filteredProducts);
    };

    // Função para renderizar os produtos filtrados
    const renderFilteredProducts = (products) => {
        const productContainer = document.getElementById("product-container");
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
    };
});
