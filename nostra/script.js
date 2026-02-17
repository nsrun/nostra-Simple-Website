// Product Data
const products = [
    {
        id: 1,
        name: "Classic Denim Jacket",
        category: "men",
        price: 89.99,
        image: "https://images.unsplash.com/photo-1576872381149-78ef7b73cc82?q=80&w=2000&auto=format&fit=crop"
    },
    {
        id: 2,
        name: "Summer Floral Dress",
        category: "women",
        price: 79.99,
        image: "https://images.unsplash.com/photo-1549474843-ed8330ad0ed9?q=80&w=2000&auto=format&fit=crop"
    },
    {
        id: 3,
        name: "Premium Leather Wallet",
        category: "accessories",
        price: 49.99,
        image: "https://images.unsplash.com/photo-1627123424574-724758594e93?q=80&w=2000&auto=format&fit=crop"
    },
    {
        id: 4,
        name: "Kids Explorer T-Shirt",
        category: "kids",
        price: 34.99,
        image: "https://images.unsplash.com/photo-1622290291468-a28f7a7dc6a8?q=80&w=2000&auto=format&fit=crop"
    },
    {
        id: 5,
        name: "Urban Sneakers",
        category: "men",
        price: 99.99,
        image: "https://images.unsplash.com/photo-1549298916-b41d501d3772?q=80&w=2000&auto=format&fit=crop"
    },
    {
        id: 6,
        name: "Elegant Handbag",
        category: "women",
        price: 129.99,
        image: "https://images.unsplash.com/photo-1584917865442-de89df76afd3?q=80&w=2000&auto=format&fit=crop"
    },
    {
        id: 7,
        name: "Modern Sunglasses",
        category: "accessories",
        price: 149.99,
        image: "https://images.unsplash.com/photo-1511499767390-a8a196109e92?q=80&w=2000&auto=format&fit=crop"
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

    productsGrid.innerHTML = productsToDisplay.map((product, index) => `
        <div class="product-card reveal active" style="transition-delay: ${index * 0.05}s">
            <div class="product-image" style="background-image: url('${product.image}')"></div>
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

    // Check for category in URL
    const urlParams = new URLSearchParams(window.location.search);
    const categoryParam = urlParams.get('category');
    if (categoryParam) {
        currentCategory = categoryParam;
        // Update button active state
        filterButtons.forEach(btn => {
            if (btn.getAttribute('data-category') === categoryParam) {
                btn.classList.add('active');
            } else {
                btn.classList.remove('active');
            }
        });
    }

    // Display initial products
    filterProducts();

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

// Intersection Observer for Reveal Animations
function initRevealAnimations() {
    const revealElements = document.querySelectorAll('.reveal, .fade-in');

    const observerOptions = {
        threshold: 0.15,
        rootMargin: "0px 0px -50px 0px"
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('active');
                // Optional: stop observing once revealed
                // observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    revealElements.forEach(el => observer.observe(el));
}

// Dropdown Handler for Mobile
function initDropdowns() {
    const dropdowns = document.querySelectorAll('.dropdown');

    dropdowns.forEach(dropdown => {
        const link = dropdown.querySelector('a');

        if (link) {
            link.addEventListener('click', (e) => {
                // Only prevent default and toggle if on mobile and has dropdown items
                if (window.innerWidth <= 768) {
                    e.preventDefault();
                    dropdown.classList.toggle('active');

                    // Close other dropdowns
                    dropdowns.forEach(other => {
                        if (other !== dropdown) {
                            other.classList.remove('active');
                        }
                    });
                }
            });
        }
    });

    // Close dropdowns when clicking outside
    document.addEventListener('click', (e) => {
        if (!e.target.closest('.dropdown')) {
            dropdowns.forEach(d => d.classList.remove('active'));
        }
    });
}

// Initialize everything when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    initCollectionsPage();
    initContactForm();
    initHamburgerMenu();
    initDropdowns();
    initSmoothScroll();
    initRevealAnimations();

    // Add scroll effect to navbar
    const navbar = document.querySelector('.navbar');
    if (navbar) {
        window.addEventListener('scroll', () => {
            if (window.scrollY > 50) {
                navbar.style.background = 'rgba(255, 255, 255, 0.9)';
                navbar.style.boxShadow = 'var(--shadow-md)';
                navbar.style.padding = '0.5rem 0';
            } else {
                navbar.style.background = 'var(--glass)';
                navbar.style.boxShadow = 'var(--shadow-sm)';
                navbar.style.padding = '1rem 0';
            }
        });
    }
});
