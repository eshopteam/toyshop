// Cart Management
class Cart {
    constructor() {
        this.items = JSON.parse(localStorage.getItem('cart')) || [];
        this.updateCartCount();
    }

    addItem(product) {
        const existingItem = this.items.find(item => item.id === product.id);
        
        if (existingItem) {
            existingItem.quantity += 1;
        } else {
            this.items.push({
                id: product.id,
                name: product.name,
                price: product.price,
                image: product.image,
                quantity: 1
            });
        }

        this.saveCart();
        this.updateCartCount();
    }

    removeItem(productId) {
        this.items = this.items.filter(item => item.id !== productId);
        this.saveCart();
        this.updateCartCount();
    }

    updateQuantity(productId, quantity) {
        const item = this.items.find(item => item.id === productId);
        if (item) {
            item.quantity = quantity;
            if (item.quantity <= 0) {
                this.removeItem(productId);
            } else {
                this.saveCart();
                this.updateCartCount();
            }
        }
    }

    getTotal() {
        return this.items.reduce((total, item) => total + (item.price * item.quantity), 0);
    }

    saveCart() {
        localStorage.setItem('cart', JSON.stringify(this.items));
    }

    updateCartCount() {
        const cartCount = document.querySelector('.cart-count');
        if (cartCount) {
            const totalItems = this.items.reduce((sum, item) => sum + item.quantity, 0);
            cartCount.textContent = totalItems;
        }
    }
}

// Initialize cart
const cart = new Cart();

// Search functionality
const searchInput = document.querySelector('.search-bar input');
if (searchInput) {
    searchInput.addEventListener('input', debounce(function(e) {
        const query = e.target.value.trim();
        if (query.length >= 2) {
            // Here you would typically make an API call to get search results
            console.log('Searching for:', query);
        }
    }, 300));
}

// Product quantity controls
document.addEventListener('click', function(e) {
    if (e.target.matches('.quantity-btn')) {
        const input = e.target.parentElement.querySelector('input');
        const currentValue = parseInt(input.value);
        
        if (e.target.classList.contains('decrease')) {
            input.value = Math.max(1, currentValue - 1);
        } else if (e.target.classList.contains('increase')) {
            input.value = currentValue + 1;
        }
        
        // Trigger change event
        input.dispatchEvent(new Event('change'));
    }
});

// Add to cart buttons
document.addEventListener('click', function(e) {
    if (e.target.matches('.add-to-cart')) {
        const productCard = e.target.closest('.product-card');
        if (productCard) {
            const product = {
                id: productCard.dataset.id,
                name: productCard.querySelector('.product-title').textContent,
                price: parseFloat(productCard.querySelector('.product-price').dataset.price),
                image: productCard.querySelector('.product-image').src
            };
            cart.addItem(product);
            
            // Show success message
            showNotification('محصول به سبد خرید اضافه شد');
        }
    }
});

// Notification system
function showNotification(message, type = 'success') {
    const notification = document.createElement('div');
    notification.className = `notification ${type}`;
    notification.textContent = message;
    
    document.body.appendChild(notification);
    
    // Trigger animation
    setTimeout(() => notification.classList.add('show'), 100);
    
    // Remove after 3 seconds
    setTimeout(() => {
        notification.classList.remove('show');
        setTimeout(() => notification.remove(), 300);
    }, 3000);
}

// Utility functions
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// Form validation
function validateForm(form) {
    const inputs = form.querySelectorAll('input[required], select[required], textarea[required]');
    let isValid = true;

    inputs.forEach(input => {
        if (!input.value.trim()) {
            isValid = false;
            input.classList.add('error');
            
            // Add error message if it doesn't exist
            if (!input.nextElementSibling?.classList.contains('error-message')) {
                const errorMessage = document.createElement('div');
                errorMessage.className = 'error-message';
                errorMessage.textContent = 'این فیلد الزامی است';
                input.parentNode.insertBefore(errorMessage, input.nextSibling);
            }
        } else {
            input.classList.remove('error');
            const errorMessage = input.nextElementSibling;
            if (errorMessage?.classList.contains('error-message')) {
                errorMessage.remove();
            }
        }
    });

    return isValid;
}

// Add form validation to all forms
document.querySelectorAll('form').forEach(form => {
    form.addEventListener('submit', function(e) {
        if (!validateForm(this)) {
            e.preventDefault();
        }
    });
}); 