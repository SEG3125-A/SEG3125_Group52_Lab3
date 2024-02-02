        // JavaScript for cart functionality
        let cart = JSON.parse(localStorage.getItem('cart')) || [];
        
        function updateCartDisplay() {
            const cartItems = document.getElementById('cart-items');
            cartItems.innerHTML = ''; 

            let total = 0;
            cart.forEach(item => {
                total += item.price * item.quantity;
                cartItems.innerHTML += `
                    <div class="cart-item">
                        <div class="item-name">${item.name}</div>
                        <input type="number" class="item-quantity" value="${item.quantity}">
                        <div class="item-price">$${(item.price * item.quantity).toFixed(2)}</div>
                        <button class="update-btn" onclick="updateItem('${item.name}')">Update</button>
                        <button class="remove-btn" onclick="removeItem('${item.name}')">Remove</button>
                    </div>
                `;
            });
            
            document.getElementById('cart-total').textContent = `Total: $${total.toFixed(2)}`;
        }

        function updateItem(name) {
            const itemToUpdate = cart.find(item => item.name === name);
            const newQuantity = parseInt(document.querySelector(`.item-quantity[value="${itemToUpdate.quantity}"]`).value);
            
            if (!isNaN(newQuantity) && newQuantity >= 0) {
                itemToUpdate.quantity = newQuantity;
                localStorage.setItem('cart', JSON.stringify(cart));
                updateCartDisplay();
            } else {
                alert('Please enter a valid quantity (non-negative number).');
            }
        }

        function removeItem(name) {
            cart = cart.filter(item => item.name !== name);
            localStorage.setItem('cart', JSON.stringify(cart));
            updateCartDisplay();
        }

        updateCartDisplay();

        function openNav() {
            document.getElementById("side-menu").style.width = "250px";
        }
        
        function closeNav() {
            document.getElementById("side-menu").style.width = "0";
        }
        