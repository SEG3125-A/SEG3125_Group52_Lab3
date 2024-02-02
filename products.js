// JavaScript for dynamic product listing and sorting
var products = [
    { name: 'Apple', price: 0.99, category: 'Fruits' },
    { name: 'Bread', price: 2.99, category: 'Gluten Free' },
    { name: 'Cucumber', price: 1.20, category: 'Vegetables' },
    { name: 'Chicken', price: 4.99, category: 'Meat' },
    { name: 'Carrot', price: 1.50, category: 'Vegetables' },
    { name: 'Salmon', price: 7.99, category: 'Meat' },
    { name: 'Lettuce', price: 1.99, category: 'Vegetables' },
    { name: 'Pasta', price: 3.49, category: 'Gluten Free' }, 
    { name: 'Beef', price: 9.99, category: 'Meat' },
    { name: 'Tomato', price: 1.25, category: 'Vegetables' },
    { name: 'Orange', price: 1.49, category: 'Fruits' },
    { name: 'Milk', price: 5.99, category: 'Dairy' },
    { name: 'Yogurt', price: 2.79, category: 'Dairy' },
];



// New getImagePath function
function getImagePath(productName) {
    // Convert the product name to a format that matches your image file names
    const imageName = productName.toLowerCase().replace(/\s+/g, '') + '.jpg';
    return 'images/' + imageName;
}

// Function to filter products based on dietary restrictions
function filterProducts(diet, productList) {
    if (diet === 'Vegetarian') {
        // If Vegetarian, exclude 'Chicken', 'Salmon', 'Beef' products
        return productList.filter(product => product.category !== 'Meat');
    } else if (diet === 'Gluten Free') {
        // If Gluten Free, exclude products with 'Gluten Free' category
        return productList.filter(product => product.category !== 'Gluten Free');
    } else if (diet === 'Organic') {
        // If Organic, only show products with 'Organic' category
        return productList.filter(product => product.category !== 'Gluten Free');
    } else if (diet === 'Meat') {
        // If Meat, show 'Chicken', 'Salmon', 'Beef' products
        return productList.filter(product => ['Chicken', 'Salmon', 'Beef'].includes(product.name));
    }
    // If none or any other preference, show all products
    return productList;
}

let cart = JSON.parse(localStorage.getItem('cart')) || [];

// Function to add a product to the cart
function addToCart(productName) {
    // Find the product details based on the productName
    const product = products.find(p => p.name === productName);
    // Check if the product is already in the cart
    const productInCart = cart.find(p => p.name === productName);

    if (productInCart) {
        // If it's already in the cart, increment the quantity
        productInCart.quantity += 1;
    } else {
        // If it's not in the cart, add it with a quantity of 1
        cart.push({ ...product, quantity: 1 });
    }

    
    localStorage.setItem('cart', JSON.stringify(cart));
    alert('You have added ' + productName + ' to your cart.');
}

function sortProducts(sortBy, productList) {
    if (sortBy === 'price') {
        return productList.sort((a, b) => a.price - b.price);
    } else {
        return productList.sort((a, b) => a.name.localeCompare(b.name));
    }
}

function filterByCategory(category, productList) {
    if (category === 'All') {
        return productList;
    } else {
        return productList.filter(product => product.category === category);
    }
}

function displayProducts() {
    const productGrid = document.getElementById('product-list');
    productGrid.innerHTML = ''; 

    const dietPreference = localStorage.getItem('dietPreference');
    const sortBy = document.getElementById('sort').value;
    const categoryFilter = document.getElementById('category').value; // Get the selected category

    let filteredProducts = filterByCategory(categoryFilter, products);
    filteredProducts = dietPreference ? filterProducts(dietPreference, filteredProducts) : filteredProducts;
    filteredProducts = sortProducts(sortBy, filteredProducts);

    filteredProducts.forEach(function(product) {
        const imagePath = getImagePath(product.name);
        const productHTML = `
            <div class="product-item">
                <img src="${imagePath}" alt="${product.name}" class="product-image">
                <div class="product-name">${product.name}</div>
                <div class="product-price">$${product.price.toFixed(2)}</div>
                <button class="add-to-cart" onclick="addToCart('${product.name}')">Add to Cart</button>
            </div>
        `;
        productGrid.insertAdjacentHTML('beforeend', productHTML);
    });
}

// Add event listener for the sort select element
document.getElementById('sort').addEventListener('change', function() {
    displayProducts(); 
});

// Add event listener for the category select element
document.getElementById('category').addEventListener('change', function() {
    displayProducts(); 
});

displayProducts(); // Initial call to display products

function openNav() {
    document.getElementById("side-menu").style.width = "250px";
}

function closeNav() {
    document.getElementById("side-menu").style.width = "0";
}
