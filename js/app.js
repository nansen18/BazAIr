// Main Application Logic for BazAIr

// Global state
let currentPage = 'dashboard';
let appState = {
    cartItems: [...mockCartItems],
    suppliers: [...mockSuppliers],
    rewards: [],
    festivals: [...mockFestivals],
    offers: [...mockSmartOffers],
    insights: [],
    groupOrder: null,
    userLoginData: { ...mockUserLoginData }
};

// Initialize app
document.addEventListener('DOMContentLoaded', function() {
    initializeApp();
});

function initializeApp() {
    // Initialize Lucide icons
    initializeIcons();
    
    // Setup navigation
    setupNavigation();
    
    // Setup event listeners
    setupEventListeners();
    
    // Check for smart offers on app load
    checkForSmartOffers();
    
    // Initialize current page
    showPage('dashboard');
    
    // Render initial data
    renderSmartCart(appState.cartItems, [
        'Weather is sunny - increase tomato quantities by 20%',
        'Weekend approaching - stock extra onions',
        'Festival season - consider premium masala pack'
    ]);
    
    console.log('BazAIr app initialized successfully!');
}

// Navigation
function setupNavigation() {
    // Bottom navigation
    const navButtons = document.querySelectorAll('.nav-btn');
    navButtons.forEach(btn => {
        btn.addEventListener('click', () => {
            const page = btn.getAttribute('data-page');
            showPage(page);
        });
    });
    
    // Top navigation dropdowns
    const notificationsBtn = document.getElementById('notifications-btn');
    const profileBtn = document.getElementById('profile-btn');
    const notificationsDropdown = document.getElementById('notifications-dropdown');
    const profileDropdown = document.getElementById('profile-dropdown');
    
    if (notificationsBtn && notificationsDropdown) {
        notificationsBtn.addEventListener('click', (e) => {
            e.stopPropagation();
            notificationsDropdown.classList.toggle('show');
            profileDropdown.classList.remove('show');
        });
    }
    
    if (profileBtn && profileDropdown) {
        profileBtn.addEventListener('click', (e) => {
            e.stopPropagation();
            profileDropdown.classList.toggle('show');
            notificationsDropdown.classList.remove('show');
        });
    }
    
    // Close dropdowns when clicking outside
    document.addEventListener('click', () => {
        if (notificationsDropdown) notificationsDropdown.classList.remove('show');
        if (profileDropdown) profileDropdown.classList.remove('show');
    });
}

function showPage(pageId) {
    // Update navigation
    const navButtons = document.querySelectorAll('.nav-btn');
    navButtons.forEach(btn => {
        btn.classList.toggle('active', btn.getAttribute('data-page') === pageId);
    });
    
    // Show/hide pages
    const pages = document.querySelectorAll('.page');
    pages.forEach(page => {
        page.style.display = page.id === `${pageId}-page` ? 'block' : 'none';
    });
    
    currentPage = pageId;
    
    // Page-specific initialization
    switch (pageId) {
        case 'suppliers':
            // Reset suppliers page state
            const supplierFinder = document.getElementById('supplier-finder');
            const filterBar = document.getElementById('filter-bar');
            const suppliersList = document.getElementById('suppliers-list');
            
            if (supplierFinder) supplierFinder.style.display = 'block';
            if (filterBar) filterBar.style.display = 'none';
            if (suppliersList) suppliersList.innerHTML = '';
            break;
            
        case 'group':
            // Reset group orders page state
            const groupFinder = document.getElementById('group-finder');
            const groupOrderCard = document.getElementById('group-order-card');
            const groupMembers = document.getElementById('group-members');
            
            if (groupFinder) groupFinder.style.display = 'block';
            if (groupOrderCard) groupOrderCard.style.display = 'none';
            if (groupMembers) groupMembers.style.display = 'none';
            break;
            
        case 'insights':
            // Reset insights page state
            const insightsAnalyzer = document.getElementById('insights-analyzer');
            const savingsCard = document.getElementById('savings-card');
            const insightsResults = document.getElementById('insights-results');
            
            if (insightsAnalyzer) insightsAnalyzer.style.display = 'block';
            if (savingsCard) savingsCard.style.display = 'none';
            if (insightsResults) insightsResults.style.display = 'none';
            break;
            
        case 'admin':
            // Show vendors tab by default
            showAdminTab('vendors');
            break;
            
        case 'rewards':
            // Render rewards
            renderRewards(appState.rewards);
            break;
    }
}

// Event Listeners
function setupEventListeners() {
    // Smart Cart
    const regenerateCartBtn = document.getElementById('regenerate-cart');
    const orderNowBtn = document.getElementById('order-now-btn');
    const editCartBtn = document.getElementById('edit-cart-btn');
    
    if (regenerateCartBtn) {
        regenerateCartBtn.addEventListener('click', regenerateSmartCart);
    }
    
    if (orderNowBtn) {
        orderNowBtn.addEventListener('click', placeOrder);
    }
    
    if (editCartBtn) {
        editCartBtn.addEventListener('click', editCart);
    }
    
    // Group Orders
    const findGroupBtn = document.getElementById('find-group-btn');
    const confirmGroupBtn = document.getElementById('confirm-group-btn');
    const passGroupBtn = document.getElementById('pass-group-btn');
    
    if (findGroupBtn) {
        findGroupBtn.addEventListener('click', findGroupOrder);
    }
    
    if (confirmGroupBtn) {
        confirmGroupBtn.addEventListener('click', confirmGroupOrder);
    }
    
    if (passGroupBtn) {
        passGroupBtn.addEventListener('click', passGroupOrder);
    }
    
    // Suppliers
    const findSuppliersBtn = document.getElementById('find-suppliers-btn');
    
    if (findSuppliersBtn) {
        findSuppliersBtn.addEventListener('click', findSuppliers);
    }
    
    // Insights
    const analyzeOrdersBtn = document.getElementById('analyze-orders-btn');
    
    if (analyzeOrdersBtn) {
        analyzeOrdersBtn.addEventListener('click', analyzeOrders);
    }
    
    // Admin
    const addFestivalBtn = document.getElementById('add-festival-btn');
    const addOfferBtn = document.getElementById('add-offer-btn');
    
    if (addFestivalBtn) {
        addFestivalBtn.addEventListener('click', () => showFestivalModal());
    }
    
    if (addOfferBtn) {
        addOfferBtn.addEventListener('click', () => showOfferModal(mockSmartOffers[0]));
    }
    
    // Admin tabs
    const tabButtons = document.querySelectorAll('.tab-btn');
    tabButtons.forEach(btn => {
        btn.addEventListener('click', () => {
            const tab = btn.getAttribute('data-tab');
            showAdminTab(tab);
        });
    });
    
    // Modal event listeners
    setupModalEventListeners();
    
    // Festival form
    setupFestivalForm();
}

function setupModalEventListeners() {
    // Offer modal
    const closeOfferModal = document.getElementById('close-offer-modal');
    const claimRewardBtn = document.getElementById('claim-reward-btn');
    const dismissOfferBtn = document.getElementById('dismiss-offer-btn');
    const copyCodeBtn = document.getElementById('copy-coupon');
    
    if (closeOfferModal) {
        closeOfferModal.addEventListener('click', hideOfferModal);
    }
    
    if (claimRewardBtn) {
        claimRewardBtn.addEventListener('click', claimReward);
    }
    
    if (dismissOfferBtn) {
        dismissOfferBtn.addEventListener('click', hideOfferModal);
    }
    
    if (copyCodeBtn) {
        copyCodeBtn.addEventListener('click', copyCouponCode);
    }
    
    // Festival modal
    const closeFestivalModal = document.getElementById('close-festival-modal');
    const cancelFestival = document.getElementById('cancel-festival');
    
    if (closeFestivalModal) {
        closeFestivalModal.addEventListener('click', hideFestivalModal);
    }
    
    if (cancelFestival) {
        cancelFestival.addEventListener('click', hideFestivalModal);
    }
    
    // Close modals on backdrop click
    const modalOverlays = document.querySelectorAll('.modal-overlay');
    modalOverlays.forEach(overlay => {
        overlay.addEventListener('click', (e) => {
            if (e.target === overlay) {
                overlay.style.display = 'none';
            }
        });
    });
}

function setupFestivalForm() {
    const festivalForm = document.getElementById('festival-form');
    if (!festivalForm) return;
    
    festivalForm.addEventListener('submit', handleFestivalSubmit);
    
    // Emoji selector
    const emojiButtons = document.querySelectorAll('.emoji-btn');
    emojiButtons.forEach(btn => {
        btn.addEventListener('click', (e) => {
            e.preventDefault();
            emojiButtons.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            updateColorPreview();
        });
    });
    
    // Color presets
    const presetButtons = document.querySelectorAll('.preset-btn');
    presetButtons.forEach(btn => {
        btn.addEventListener('click', (e) => {
            e.preventDefault();
            presetButtons.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            updateColorPreview();
        });
    });
    
    // Form inputs
    const nameInput = document.getElementById('festival-name');
    const textInput = document.getElementById('banner-text');
    
    if (nameInput) {
        nameInput.addEventListener('input', updateColorPreview);
    }
    
    if (textInput) {
        textInput.addEventListener('input', updateColorPreview);
    }
}

// Smart Cart Functions
async function regenerateSmartCart() {
    const btn = document.getElementById('regenerate-cart');
    if (btn) {
        btn.innerHTML = '<div class="spinner" style="width: 1rem; height: 1rem; border: 2px solid transparent; border-top: 2px solid currentColor; border-radius: 50%; animation: spin 1s linear infinite;"></div>';
        btn.disabled = true;
    }
    
    showLoading('🤖 AI is analyzing your needs...');
    
    try {
        await simulateApiDelay(2000);
        
        // Simulate slight variations in cart
        const variations = [
            { id: 'i1', quantity: 12, totalPrice: 384 },
            { id: 'i2', quantity: 8, totalPrice: 336 },
            { id: 'i3', quantity: 1.5, totalPrice: 60 },
            { id: 'i4', quantity: 2, totalPrice: 120 }
        ];
        
        appState.cartItems = appState.cartItems.map(item => {
            const variation = variations.find(v => v.id === item.id);
            return variation ? { ...item, ...variation } : item;
        });
        
        const newSuggestions = [
            'Updated: Weather forecast shows rain - reduce tomato quantity',
            'Market trend: Onion prices expected to rise - stock up now',
            'Customer preference: Spicy food demand increased by 15%'
        ];
        
        renderSmartCart(appState.cartItems, newSuggestions);
        showToast('Cart updated with fresh AI insights! 🤖', 'success');
        
    } catch (error) {
        handleError(error, 'regenerateSmartCart');
    } finally {
        hideLoading();
        if (btn) {
            btn.innerHTML = '<i data-lucide="refresh-cw"></i>';
            btn.disabled = false;
            initializeIcons();
        }
    }
}

async function placeOrder() {
    const btn = document.getElementById('order-now-btn');
    if (btn) {
        btn.innerHTML = '<div class="spinner" style="width: 1rem; height: 1rem; border: 2px solid transparent; border-top: 2px solid white; border-radius: 50%; animation: spin 1s linear infinite; margin-right: 0.5rem;"></div>Placing Order...';
        btn.disabled = true;
    }
    
    try {
        await simulateApiDelay(2000);
        
        const total = appState.cartItems.reduce((sum, item) => sum + item.totalPrice, 0);
        showToast(`Order placed successfully! Total: ${formatCurrency(total)} 🎉`, 'success');
        
        // Show success state
        const smartCartCard = document.getElementById('smart-cart-card');
        if (smartCartCard) {
            smartCartCard.innerHTML = `
                <div style="text-align: center; padding: 2rem;">
                    <div style="background: rgba(16, 185, 129, 0.1); padding: 1rem; border-radius: 1rem; margin-bottom: 1rem;">
                        <div style="font-size: 3rem; margin-bottom: 0.5rem;">✅</div>
                        <h3 style="color: var(--success-color); margin-bottom: 0.5rem;">Order Placed Successfully!</h3>
                        <p style="color: var(--success-color); font-size: 0.875rem;">
                            Your order for ${formatCurrency(total)} has been confirmed. You'll receive updates via WhatsApp.
                        </p>
                    </div>
                    <button class="text-btn" onclick="resetSmartCart()">Back to Cart</button>
                </div>
            `;
        }
        
    } catch (error) {
        handleError(error, 'placeOrder');
    } finally {
        if (btn) {
            btn.innerHTML = '<i data-lucide="shopping-cart"></i><span>Order Now</span>';
            btn.disabled = false;
            initializeIcons();
        }
    }
}

function resetSmartCart() {
    renderSmartCart(appState.cartItems, [
        'Weather is sunny - increase tomato quantities by 20%',
        'Weekend approaching - stock extra onions',
        'Festival season - consider premium masala pack'
    ]);
}

function editCart() {
    showToast('Cart editing feature coming soon! 🛠️', 'info');
}

// Group Orders Functions
async function findGroupOrder() {
    const btn = document.getElementById('find-group-btn');
    const groupFinder = document.getElementById('group-finder');
    const groupOrderCard = document.getElementById('group-order-card');
    const groupMembers = document.getElementById('group-members');
    
    if (btn) {
        btn.innerHTML = '<div class="spinner" style="width: 1rem; height: 1rem; border: 2px solid transparent; border-top: 2px solid white; border-radius: 50%; animation: spin 1s linear infinite; margin-right: 0.5rem;"></div>Searching...';
        btn.disabled = true;
    }
    
    showLoading('🤖 Finding nearby vendors with similar needs...');
    
    try {
        await simulateApiDelay(1500);
        
        const totalCost = appState.cartItems.reduce((sum, item) => sum + item.totalPrice, 0);
        const discount = 0.15;
        const finalCost = totalCost * (1 - discount);
        
        appState.groupOrder = {
            id: 'g1',
            vendors: mockNearbyVendors.slice(0, 3),
            items: appState.cartItems,
            totalCost,
            discount,
            finalCost,
            status: 'forming',
            estimatedSavings: totalCost - finalCost
        };
        
        if (groupFinder) groupFinder.style.display = 'none';
        if (groupOrderCard) groupOrderCard.style.display = 'block';
        if (groupMembers) groupMembers.style.display = 'block';
        
    } catch (error) {
        handleError(error, 'findGroupOrder');
    } finally {
        hideLoading();
        if (btn) {
            btn.innerHTML = 'Find Group Partners';
            btn.disabled = false;
        }
    }
}

async function confirmGroupOrder() {
    const btn = document.getElementById('confirm-group-btn');
    if (btn) {
        btn.innerHTML = '<div class="spinner" style="width: 1rem; height: 1rem; border: 2px solid transparent; border-top: 2px solid var(--primary-color); border-radius: 50%; animation: spin 1s linear infinite; margin-right: 0.5rem;"></div>Confirming...';
        btn.disabled = true;
    }
    
    try {
        await simulateApiDelay(1500);
        
        if (appState.groupOrder) {
            showToast(`Group order confirmed! You saved ${formatCurrency(Math.round(appState.groupOrder.estimatedSavings))} 🎉`, 'success');
            
            // Show success state
            const groupOrderCard = document.getElementById('group-order-card');
            if (groupOrderCard) {
                groupOrderCard.innerHTML = `
                    <div style="text-align: center; padding: 2rem;">
                        <div style="background: rgba(16, 185, 129, 0.1); padding: 1rem; border-radius: 1rem; margin-bottom: 1rem;">
                            <div style="font-size: 3rem; margin-bottom: 0.5rem;">✅</div>
                            <h3 style="color: var(--success-color); margin-bottom: 0.5rem;">Group Order Confirmed! 🎉</h3>
                            <p style="color: var(--success-color); font-size: 0.875rem; margin-bottom: 0.5rem;">
                                Your order has been added to the group buying pool
                            </p>
                            <p style="color: var(--success-color); font-weight: 600;">
                                Final savings: ${formatCurrency(Math.round(appState.groupOrder.estimatedSavings))}
                            </p>
                        </div>
                        <p style="color: var(--gray-600); font-size: 0.875rem;">
                            You'll receive delivery updates via WhatsApp
                        </p>
                    </div>
                `;
            }
        }
        
    } catch (error) {
        handleError(error, 'confirmGroupOrder');
    } finally {
        if (btn) {
            btn.innerHTML = '<i data-lucide="check-circle"></i><span>Confirm Group</span>';
            btn.disabled = false;
            initializeIcons();
        }
    }
}

async function passGroupOrder() {
    const btn = document.getElementById('pass-group-btn');
    if (btn) {
        btn.innerHTML = '<div class="spinner" style="width: 1rem; height: 1rem; border: 2px solid transparent; border-top: 2px solid var(--gray-600); border-radius: 50%; animation: spin 1s linear infinite; margin-right: 0.5rem;"></div>Passing...';
        btn.disabled = true;
    }
    
    try {
        await simulateApiDelay(1000);
        
        showToast('Group order passed. Looking for other opportunities...', 'info');
        
        // Reset to finder state
        const groupFinder = document.getElementById('group-finder');
        const groupOrderCard = document.getElementById('group-order-card');
        const groupMembers = document.getElementById('group-members');
        
        if (groupFinder) groupFinder.style.display = 'block';
        if (groupOrderCard) groupOrderCard.style.display = 'none';
        if (groupMembers) groupMembers.style.display = 'none';
        
    } catch (error) {
        handleError(error, 'passGroupOrder');
    } finally {
        if (btn) {
            btn.innerHTML = '<i data-lucide="x"></i><span>Pass</span>';
            btn.disabled = false;
            initializeIcons();
        }
    }
}

// Suppliers Functions
async function findSuppliers() {
    const btn = document.getElementById('find-suppliers-btn');
    const supplierFinder = document.getElementById('supplier-finder');
    const filterBar = document.getElementById('filter-bar');
    
    if (btn) {
        btn.innerHTML = '<div class="spinner" style="width: 1rem; height: 1rem; border: 2px solid transparent; border-top: 2px solid white; border-radius: 50%; animation: spin 1s linear infinite; margin-right: 0.5rem;"></div>Searching...';
        btn.disabled = true;
    }
    
    showLoading('🤖 Matching with best suppliers...');
    
    try {
        await simulateApiDelay(1000);
        
        if (supplierFinder) supplierFinder.style.display = 'none';
        if (filterBar) filterBar.style.display = 'block';
        
        renderSuppliers(appState.suppliers);
        
    } catch (error) {
        handleError(error, 'findSuppliers');
    } finally {
        hideLoading();
        if (btn) {
            btn.innerHTML = 'Find Best Suppliers';
            btn.disabled = false;
        }
    }
}

function selectSupplier(supplierId) {
    const supplier = appState.suppliers.find(s => s.id === supplierId);
    if (supplier) {
        showToast(`${supplier.name} selected! You'll receive delivery updates via WhatsApp 📱`, 'success');
    }
}

// Insights Functions
async function analyzeOrders() {
    const btn = document.getElementById('analyze-orders-btn');
    const insightsAnalyzer = document.getElementById('insights-analyzer');
    const savingsCard = document.getElementById('savings-card');
    const insightsResults = document.getElementById('insights-results');
    
    if (btn) {
        btn.innerHTML = '<div class="spinner" style="width: 1rem; height: 1rem; border: 2px solid transparent; border-top: 2px solid white; border-radius: 50%; animation: spin 1s linear infinite; margin-right: 0.5rem;"></div>Analyzing...';
        btn.disabled = true;
    }
    
    showLoading('🤖 Analyzing your usage patterns...');
    
    try {
        await simulateApiDelay(1500);
        
        appState.insights = [...mockWastageInsights];
        
        if (insightsAnalyzer) insightsAnalyzer.style.display = 'none';
        if (savingsCard) savingsCard.style.display = 'block';
        if (insightsResults) insightsResults.style.display = 'block';
        
        renderInsights(appState.insights);
        
    } catch (error) {
        handleError(error, 'analyzeOrders');
    } finally {
        hideLoading();
        if (btn) {
            btn.innerHTML = 'Analyze My Orders';
            btn.disabled = false;
        }
    }
}

// Admin Functions
function showAdminTab(tabId) {
    // Update tab buttons
    const tabButtons = document.querySelectorAll('.tab-btn');
    tabButtons.forEach(btn => {
        btn.classList.toggle('active', btn.getAttribute('data-tab') === tabId);
    });
    
    // Show/hide tab content
    const tabContents = document.querySelectorAll('.tab-content');
    tabContents.forEach(content => {
        content.classList.toggle('active', content.id === `${tabId}-tab`);
    });
    
    // Load tab-specific data
    switch (tabId) {
        case 'festivals':
            renderFestivals(appState.festivals);
            break;
        case 'offers':
            renderSmartOffers(appState.offers);
            break;
    }
}

// Festival Functions
function updateColorPreview() {
    const preview = document.getElementById('color-preview');
    const nameInput = document.getElementById('festival-name');
    const textInput = document.getElementById('banner-text');
    const activeEmoji = document.querySelector('.emoji-btn.active');
    const activePreset = document.querySelector('.preset-btn.active');
    
    if (!preview) return;
    
    const name = nameInput ? nameInput.value || 'Festival Name' : 'Festival Name';
    const text = textInput ? textInput.value || name : name;
    const emoji = activeEmoji ? activeEmoji.getAttribute('data-emoji') : '🎉';
    const presetName = activePreset ? activePreset.textContent.toLowerCase() : 'independence';
    
    const preset = colorPresets[presetName] || colorPresets.independence;
    
    preview.style.background = `linear-gradient(135deg, ${preset.gradientFrom}, ${preset.gradientTo})`;
    preview.innerHTML = `
        <span class="preview-emoji">${emoji}</span>
        <span class="preview-text">${text}</span>
    `;
}

async function handleFestivalSubmit(e) {
    e.preventDefault();
    
    const form = e.target;
    const formData = new FormData(form);
    
    const name = formData.get('festival-name') || document.getElementById('festival-name').value;
    const date = formData.get('festival-date') || document.getElementById('festival-date').value;
    const endDate = formData.get('festival-end-date') || document.getElementById('festival-end-date').value;
    const bannerText = formData.get('banner-text') || document.getElementById('banner-text').value;
    const bannerSubtext = formData.get('banner-subtext') || document.getElementById('banner-subtext').value;
    
    const activeEmoji = document.querySelector('.emoji-btn.active');
    const activePreset = document.querySelector('.preset-btn.active');
    
    const emoji = activeEmoji ? activeEmoji.getAttribute('data-emoji') : '🎉';
    const presetName = activePreset ? activePreset.textContent.toLowerCase() : 'independence';
    const preset = colorPresets[presetName] || colorPresets.independence;
    
    // Validation
    if (!name || !date || !bannerText) {
        showToast('Please fill in all required fields', 'error');
        return;
    }
    
    // Check for duplicates
    const isDuplicate = appState.festivals.some(festival => 
        festival.name.toLowerCase() === name.toLowerCase() && 
        festival.date === date
    );
    
    if (isDuplicate) {
        showToast('A festival with this name and date already exists', 'error');
        return;
    }
    
    showLoading('Creating festival...');
    
    try {
        await simulateApiDelay(1000);
        
        const newFestival = {
            id: generateId('festival'),
            name,
            date,
            endDate: endDate || undefined,
            isActive: true,
            theme: {
                primaryColor: preset.primary,
                secondaryColor: preset.secondary,
                accentColor: preset.accent,
                gradientFrom: preset.gradientFrom,
                gradientTo: preset.gradientTo
            },
            banner: {
                text: bannerText,
                emoji,
                subtext: bannerSubtext || undefined
            },
            offers: [
                {
                    title: `${name} Special`,
                    description: `Special discount for ${name} celebration`,
                    discount: 15,
                    emoji: '🎁'
                }
            ]
        };
        
        appState.festivals.push(newFestival);
        renderFestivals(appState.festivals);
        hideFestivalModal();
        showToast('Festival added successfully! 🎊', 'success');
        
    } catch (error) {
        handleError(error, 'handleFestivalSubmit');
    } finally {
        hideLoading();
    }
}

function toggleFestival(festivalId) {
    const festival = appState.festivals.find(f => f.id === festivalId);
    if (festival) {
        festival.isActive = !festival.isActive;
        renderFestivals(appState.festivals);
        showToast(`Festival ${festival.isActive ? 'activated' : 'deactivated'}`, 'success');
    }
}

function editFestival(festivalId) {
    showToast('Festival editing feature coming soon! 🛠️', 'info');
}

function deleteFestival(festivalId) {
    if (confirm('Are you sure you want to delete this festival theme?')) {
        appState.festivals = appState.festivals.filter(f => f.id !== festivalId);
        renderFestivals(appState.festivals);
        showToast('Festival deleted successfully', 'success');
    }
}

// Smart Offers Functions
function toggleOffer(offerId) {
    const offer = appState.offers.find(o => o.id === offerId);
    if (offer) {
        offer.isActive = !offer.isActive;
        renderSmartOffers(appState.offers);
        showToast(`Offer ${offer.isActive ? 'activated' : 'deactivated'}`, 'success');
    }
}

function editOffer(offerId) {
    showToast('Offer editing feature coming soon! 🛠️', 'info');
}

function deleteOffer(offerId) {
    if (confirm('Are you sure you want to delete this offer?')) {
        appState.offers = appState.offers.filter(o => o.id !== offerId);
        renderSmartOffers(appState.offers);
        showToast('Offer deleted successfully', 'success');
    }
}

// Smart Offers System
function checkForSmartOffers() {
    // Simulate checking user login behavior
    const today = new Date();
    const lastLogin = new Date(appState.userLoginData.lastLoginDate);
    const daysDifference = Math.floor((today.getTime() - lastLogin.getTime()) / (1000 * 60 * 60 * 24));
    
    let triggerOffer = null;
    
    // Check for first-time user
    if (appState.userLoginData.isFirstTime) {
        triggerOffer = appState.offers.find(offer => 
            offer.triggerType === 'first_login' && offer.isActive
        );
    }
    // Check for comeback user (more than 10 days inactive)
    else if (daysDifference >= 10) {
        const comebackOffers = appState.offers.filter(offer => 
            offer.triggerType === 'comeback' && offer.isActive
        );
        if (comebackOffers.length > 0) {
            triggerOffer = comebackOffers[Math.floor(Math.random() * comebackOffers.length)];
        }
    }
    // Check for loyalty rewards (every 30 logins)
    else if (appState.userLoginData.loginCount > 0 && appState.userLoginData.loginCount % 30 === 0) {
        triggerOffer = appState.offers.find(offer => 
            offer.triggerType === 'loyalty' && offer.isActive
        );
    }
    
    if (triggerOffer) {
        setTimeout(() => showOfferModal(triggerOffer), 1000);
    }
}

async function claimReward() {
    const btn = document.getElementById('claim-reward-btn');
    if (btn) {
        btn.innerHTML = '<div class="spinner" style="width: 1rem; height: 1rem; border: 2px solid transparent; border-top: 2px solid white; border-radius: 50%; animation: spin 1s linear infinite; margin-right: 0.5rem;"></div>Claiming...';
        btn.disabled = true;
    }
    
    try {
        await simulateApiDelay(1000);
        
        // Get current offer data from modal
        const title = document.getElementById('offer-title').textContent;
        const message = document.getElementById('offer-message').textContent;
        const couponCode = document.getElementById('coupon-code').textContent;
        
        const newReward = {
            id: generateId('reward'),
            type: 'welcome',
            title,
            description: message,
            couponCode,
            discount: 50,
            emoji: '🎉',
            expiryDate: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString(),
            isRedeemed: false
        };
        
        appState.rewards.push(newReward);
        hideOfferModal();
        showToast('Reward claimed successfully! 🎉', 'success');
        
        // Update rewards page if currently viewing
        if (currentPage === 'rewards') {
            renderRewards(appState.rewards);
        }
        
    } catch (error) {
        handleError(error, 'claimReward');
    } finally {
        if (btn) {
            btn.innerHTML = '<i data-lucide="gift"></i><span>Claim Reward</span>';
            btn.disabled = false;
            initializeIcons();
        }
    }
}

async function copyCouponCode() {
    const couponCode = document.getElementById('coupon-code').textContent;
    const btn = document.getElementById('copy-coupon');
    
    const success = await copyToClipboard(couponCode);
    
    if (success && btn) {
        const originalIcon = btn.innerHTML;
        btn.innerHTML = '<i data-lucide="check"></i>';
        btn.classList.add('copied');
        
        setTimeout(() => {
            btn.innerHTML = originalIcon;
            btn.classList.remove('copied');
            initializeIcons();
        }, 2000);
        
        showToast('Coupon code copied!', 'success');
    }
}

// Rewards Functions
async function copyRewardCode(code, button) {
    const success = await copyToClipboard(code);
    
    if (success) {
        const originalIcon = button.innerHTML;
        button.innerHTML = '<i data-lucide="check"></i>';
        button.classList.add('copied');
        
        setTimeout(() => {
            button.innerHTML = originalIcon;
            button.classList.remove('copied');
            initializeIcons();
        }, 2000);
        
        showToast('Coupon code copied!', 'success');
    }
}

async function useReward(rewardId) {
    const reward = appState.rewards.find(r => r.id === rewardId);
    if (!reward) return;
    
    try {
        await simulateApiDelay(500);
        
        reward.isRedeemed = true;
        reward.redeemedAt = new Date().toISOString();
        
        renderRewards(appState.rewards);
        showToast('Reward used successfully!', 'success');
        
    } catch (error) {
        handleError(error, 'useReward');
    }
}

// Initialize network monitoring
initializeNetworkMonitoring();