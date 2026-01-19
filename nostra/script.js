// Product Data
const products = [
    {
        id: 1,
        name: "Classic Denim Jacket",
        category: "men",
        price: 89.99,
        image: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)"
    },
    {
        id: 2,
        name: "Summer Dress",
        category: "women",
        price: 79.99,
        image: "linear-gradient(135deg, #f093fb 0%, #f5576c 100%)"
    },
    {
        id: 3,
        name: "Leather Wallet",
        category: "accessories",
        price: 49.99,
        image: "linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)"
    },
    {
        id: 4,
        name: "Kids T-Shirt Set",
        category: "kids",
        price: 34.99,
        image: "linear-gradient(135deg, #43e97b 0%, #38f9d7 100%)"
    },
    {
        id: 5,
        name: "Casual Sneakers",
        category: "men",
        price: 99.99,
        image: "linear-gradient(135deg, #fa709a 0%, #fee140 100%)"
    },
    {
        id: 6,
        name: "Elegant Handbag",
        category: "women",
        price: 129.99,
        image: "linear-gradient(135deg, #30cfd0 0%, #330867 100%)"
    },
    {
        id: 7,
        name: "Designer Sunglasses",
        category: "accessories",
        price: 149.99,
        image: "linear-gradient(135deg, #a8edea 0%, #fed6e3 100%)"
    },
    {
        id: 8,
        name: "Kids Sneakers",
        category: "kids",
        price: 59.99,
        image: "linear-gradient(135deg, #ff9a9e 0%, #fecfef 100%)"
    },
    {
        id: 9,
        name: "Formal Shirt",
        category: "men",
        price: 69.99,
        image: "linear-gradient(135deg, #ffecd2 0%, #fcb69f 100%)"
    },
    {
        id: 10,
        name: "Silk Scarf",
        category: "women",
        price: 39.99,
        image: "linear-gradient(135deg, #ff6e7f 0%, #bfe9ff 100%)"
    },
    {
        id: 11,
        name: "Smart Watch",
        category: "accessories",
        price: 199.99,
        image: "linear-gradient(135deg, #e0c3fc 0%, #8ec5fc 100%)"
    },
    {
        id: 12,
        name: "Kids Backpack",
        category: "kids",
        price: 44.99,
        image: "linear-gradient(135deg, #f77062 0%, #fe5196 100%)"
    },
    {
        id: 13,
        name: "Wool Sweater",
        category: "men",
        price: 84.99,
        image: "linear-gradient(135deg, #c471f5 0%, #fa71cd 100%)"
    },
    {
        id: 14,
        name: "Evening Gown",
        category: "women",
        price: 159.99,
        image: "linear-gradient(135deg, #fccb90 0%, #d57eeb 100%)"
    },
    {
        id: 15,
        name: "Leather Belt",
        category: "accessories",
        price: 29.99,
        image: "linear-gradient(135deg, #e0c3fc 0%, #8ec5fc 100%)"
    },
    {
        id: 16,
        name: "Kids Dress",
        category: "kids",
        price: 39.99,
        image: "linear-gradient(135deg, #fbc2eb 0%, #a6c1ee 100%)"
    }
];

let currentCategory = 'all';
let searchQuery = '';

// Display Products Function
function displayProducts(productsToDisplay) {
    const productsGrid = document.getElementById('productsGrid');
    const noResults = document.getElementById('noResults');
    
    if (!productsGrid) return;

    if (productsToDisplay.length === 0) {
        productsGrid.style.display = 'none';
        noResults.style.display = 'block';
        return;
    }

    productsGrid.style.display = 'grid';
    noResults.style.display = 'none';
    
    productsGrid.innerHTML = productsToDisplay.map(product => `
        <div class="product-card">
            <div class="product-image" style="background: ${product.image}"></div>
            <div class="product-info">
                <h3>${product.name}</h3>
                <p class="product-category">${capitalizeFirst(product.category)}</p>
                <p class="product-price">$${product.price.toFixed(2)}</p>
            </div>
        </div>
    `).join('');
}

// Filter Products Function
function filterProducts() {
    let filteredProducts = products;

    // Filter by category
    if (currentCategory !== 'all') {
        filteredProducts = filteredProducts.filter(product => 
            product.category === currentCategory
        );
    }

    // Filter by search query
    if (searchQuery) {
        filteredProducts = filteredProducts.filter(product =>
            product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
            product.category.toLowerCase().includes(searchQuery.toLowerCase())
        );
    }

    displayProducts(filteredProducts);
}

// Capitalize First Letter
function capitalizeFirst(str) {
    return str.charAt(0).toUpperCase() + str.slice(1);
}

// Initialize Collections Page
function initCollectionsPage() {
    const filterButtons = document.querySelectorAll('.filter-btn');
    const searchInput = document.getElementById('searchInput');
    const searchBtn = document.querySelector('.search-btn');

    if (!filterButtons.length) return;

    // Display all products initially
    displayProducts(products);

    // Filter button click handlers
    filterButtons.forEach(button => {
        button.addEventListener('click', () => {
            // Remove active class from all buttons
            filterButtons.forEach(btn => btn.classList.remove('active'));
            // Add active class to clicked button
            button.classList.add('active');
            
            // Update current category
            currentCategory = button.getAttribute('data-category');
            filterProducts();
        });
    });

    // Search functionality
    if (searchInput) {
        searchInput.addEventListener('input', (e) => {
            searchQuery = e.target.value;
            filterProducts();
        });

        searchInput.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') {
                searchQuery = e.target.value;
                filterProducts();
            }
        });
    }

    if (searchBtn) {
        searchBtn.addEventListener('click', () => {
            if (searchInput) {
                searchQuery = searchInput.value;
                filterProducts();
            }
        });
    }
}

// Contact Form Handler
function initContactForm() {
    const contactForm = document.getElementById('contactForm');
    const formMessage = document.getElementById('formMessage');

    if (!contactForm) return;

    contactForm.addEventListener('submit', (e) => {
        e.preventDefault();

        const formData = {
            name: document.getElementById('name').value,
            email: document.getElementById('email').value,
            subject: document.getElementById('subject').value,
            message: document.getElementById('message').value
        };

        // Simulate form submission
        formMessage.textContent = 'Thank you for your message! We will get back to you soon.';
        formMessage.className = 'form-message success';
        formMessage.style.display = 'block';

        // Reset form
        contactForm.reset();

        // Hide message after 5 seconds
        setTimeout(() => {
            formMessage.style.display = 'none';
        }, 5000);

        console.log('Form submitted:', formData);
    });
}

// Hamburger Menu Handler
function initHamburgerMenu() {
    const hamburger = document.querySelector('.hamburger');
    const navMenu = document.querySelector('.nav-menu');

    if (!hamburger || !navMenu) return;

    hamburger.addEventListener('click', () => {
        navMenu.classList.toggle('active');
    });

    // Close menu when clicking outside
    document.addEventListener('click', (e) => {
        if (!hamburger.contains(e.target) && !navMenu.contains(e.target)) {
            navMenu.classList.remove('active');
        }
    });
}

// Smooth Scroll for anchor links
function initSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
}

// Initialize everything when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    initCollectionsPage();
    initContactForm();
    initHamburgerMenu();
    initSmoothScroll();

    // Add scroll effect to navbar
    const navbar = document.querySelector('.navbar');
    if (navbar) {
        window.addEventListener('scroll', () => {
            if (window.scrollY > 50) {
                navbar.style.boxShadow = '0 4px 20px rgba(0,0,0,0.15)';
            } else {
                navbar.style.boxShadow = '0 2px 10px rgba(0,0,0,0.1)';
            }
        });
    }
});