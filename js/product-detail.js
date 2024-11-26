// Capture product ID from URL
const urlParams = new URLSearchParams(window.location.search);
const productId = urlParams.get('id');

// Load product data
fetch('./mocks/produtos.json')
    .then(response => {
        if (!response.ok) throw new Error('Erro ao carregar o arquivo JSON');
        return response.json();
    })
    .then(data => {
        console.log('Dados carregados:', data);
        const product = data.find(p => p.id == productId);
        if (product) {
            renderProductDetails(product);
        } else {
            console.error('Produto não encontrado:', productId);
            const productTitle = document.getElementById('product-title');
            if (productTitle) {
                productTitle.innerText = 'Produto não encontrado';
            }
        }
    })
    .catch(error => console.error('Erro:', error));

// Function to render product details
function renderProductDetails(product) {
    // Validate and fill main product details
    const productTitle = document.getElementById('product-title');
    if (productTitle) productTitle.innerText = product.nome || 'Sem nome';

    const productName = document.getElementById('product-name');
    if (productName) productName.innerText = product.nome || 'Sem nome';

    const productPrice = document.getElementById('product-price');
    if (productPrice) productPrice.innerText = `R$ ${product.preco?.toFixed(2) || '0.00'}`;

    const productDescription = document.getElementById('product-description');
    if (productDescription) productDescription.innerText = product.descricao || 'Descrição não disponível';

    // Set main product image
    const productImage = document.getElementById('product-image');
    if (productImage) {
        productImage.src = product.imagem || 'placeholder.jpg';
        productImage.alt = product.nome || 'Imagem do produto';
    }

    // Fill image thumbnails
    const productThumbs = document.getElementById('product-thumbs');
    if (productThumbs && Array.isArray(product.imagens)) {
        productThumbs.innerHTML = ''; // Clear existing thumbnails
        product.imagens.forEach((img, index) => {
            const thumb = document.createElement('li');
            thumb.classList.add('thumb-item', 'list-inline-item', 'p-1');
            thumb.innerHTML = `<img src="${img}" alt="Thumb ${index + 1}" class="img-fluid rounded shadow-sm" style="cursor: pointer;">`;
            productThumbs.appendChild(thumb);

            // Change main image when thumbnail is clicked
            thumb.addEventListener('click', () => {
                productImage.src = img;
                productImage.alt = `Imagem ${index + 1}`;
            });
        });
    }

    // Setup size selection
    const sizeContainer = document.getElementById('product-sizes');
    if (sizeContainer && Array.isArray(product.tamanhos)) {
        sizeContainer.innerHTML = ''; // Clear existing sizes
        product.tamanhos.forEach(size => {
            const sizeOption = document.createElement('span');
            sizeOption.textContent = size;
            sizeOption.classList.add('btn', 'btn-outline-primary', 'm-1', 'shadow-sm', 'border-radius-0');

            // Adiciona evento de clique para seleção
            sizeOption.addEventListener('click', () => {
                // Remove a classe 'active' de todos os tamanhos
                const allSizeOptions = sizeContainer.querySelectorAll('span');
                allSizeOptions.forEach(option => option.classList.remove('active'));

                // Adiciona a classe 'active' no tamanho selecionado
                sizeOption.classList.add('active');
            });

            sizeContainer.appendChild(sizeOption);
        });
    }

    // Setup color selection
    const colorContainer = document.getElementById('product-colors');
    if (colorContainer && Array.isArray(product.cores)) {
        colorContainer.innerHTML = ''; // Clear existing colors
        product.cores.forEach(cor => {
            const colorOption = document.createElement('span');
            colorOption.textContent = cor;
            colorOption.classList.add('btn', 'btn-outline-secondary', 'm-1', 'shadow-sm');

            // Adiciona evento de clique para seleção
            colorOption.addEventListener('click', () => {
                // Remove a classe 'active' de todas as cores
                const allColorOptions = colorContainer.querySelectorAll('span');
                allColorOptions.forEach(option => option.classList.remove('active'));

                // Adiciona a classe 'active' na cor selecionada
                colorOption.classList.add('active');
            });

            colorContainer.appendChild(colorOption);
        });
    }

    // Load random related products
    loadRandomRelatedProducts();
}

// Function to load random related products
function loadRandomRelatedProducts() {
    fetch('./mocks/produtos.json')
        .then(response => response.json())
        .then(data => {
            const randomProducts = getRandomProducts(data, 4);
            const relatedProductsContainer = document.getElementById('related-products');
            if (relatedProductsContainer) {
                relatedProductsContainer.innerHTML = ''; // Clear existing products
                randomProducts.forEach(product => {
                    const productHTML = `
                        <div class="col-lg-3 col-md-6 col-sm-6">
                            <div class="product__item ${product.desconto ? "sale" : ""}">
                               <a href="shop-details.html?id=${product.id}">
                                    <div class="product__item__pic set-bg" style="background-image: url('${product.imagem}')">
                                        ${product.desconto ? '<span class="label">Desconto</span>' : ""}
                                        <ul class="product__hover">
                                            <li><a href="#"><img src="img/icon/heart.png" alt="Favorito"></a></li>
                                        </ul>
                                    </div>
                                </a>
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
                    relatedProductsContainer.innerHTML += productHTML;
                });
            }
        })
        .catch(error => console.error('Erro ao carregar produtos relacionados:', error));
}

// Function to get random products
function getRandomProducts(products, count) {
    return products.sort(() => 0.5 - Math.random()).slice(0, count);
}

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
