// Component Functions for BazAIr App

// Smart Cart Component
function renderSmartCart(cartItems, suggestions = []) {
    const cartItemsContainer = document.getElementById('cart-items');
    const totalAmount = document.getElementById('cart-total-amount');
    const suggestionsList = document.getElementById('ai-suggestions-list');
    
    if (!cartItemsContainer) return;
    
    // Clear existing items
    cartItemsContainer.innerHTML = '';
    
    // Calculate total
    let total = 0;
    
    // Render cart items
    cartItems.forEach(item => {
        total += item.totalPrice;
        
        const cartItem = document.createElement('div');
        cartItem.className = 'cart-item';
        cartItem.innerHTML = `
            <div class="cart-item-info">
                <span class="cart-item-emoji">${item.emoji}</span>
                <div class="cart-item-details">
                    <span class="cart-item-name">${item.name}</span>
                    <span class="cart-item-quantity">${item.quantity}${item.unit}</span>
                </div>
            </div>
            <span class="cart-item-price">${formatCurrency(item.totalPrice)}</span>
        `;
        
        cartItemsContainer.appendChild(cartItem);
    });
    
    // Update total
    if (totalAmount) {
        totalAmount.textContent = formatCurrency(total);
    }
    
    // Update suggestions
    if (suggestionsList && suggestions.length > 0) {
        suggestionsList.innerHTML = '';
        suggestions.forEach(suggestion => {
            const li = document.createElement('li');
            li.textContent = suggestion;
            suggestionsList.appendChild(li);
        });
    }
}

// Suppliers List Component
function renderSuppliers(suppliers) {
    const suppliersList = document.getElementById('suppliers-list');
    if (!suppliersList) return;
    
    suppliersList.innerHTML = '';
    
    suppliers.forEach(supplier => {
        const supplierCard = document.createElement('div');
        supplierCard.className = 'supplier-card w-full';
        
        // Generate stars
        let starsHtml = '';
        for (let i = 1; i <= 5; i++) {
            starsHtml += `<i data-lucide="star" class="star ${i <= supplier.rating ? 'filled' : ''}"></i>`;
        }
        
        // Generate specialties
        let specialtiesHtml = '';
        supplier.speciality.forEach(specialty => {
            specialtiesHtml += `<span class="specialty-tag">${specialty}</span>`;
        });
        
        supplierCard.innerHTML = `
            <div class="supplier-header">
                <div class="supplier-info">
                    <h3>${supplier.name}</h3>
                    <div class="supplier-rating">
                        ${starsHtml}
                        <span>(${supplier.rating})</span>
                    </div>
                    <div class="supplier-location">
                        <i data-lucide="map-pin"></i>
                        <span>${supplier.location}</span>
                    </div>
                </div>
                <div class="supplier-match">
                    <div class="match-badge">${Math.round(supplier.rating * 20)}% match</div>
                    <div class="supplier-eta">${supplier.eta}</div>
                </div>
            </div>
            
            <div class="supplier-details">
                <div class="supplier-detail">
                    <i data-lucide="clock"></i>
                    <span>${supplier.deliveryTime}</span>
                </div>
                <div class="supplier-detail">
                    <i data-lucide="map-pin"></i>
                    <span class="capitalize">${supplier.priceRange} price</span>
                </div>
            </div>
            
            <div class="supplier-specialties">
                <div class="label">Specialties:</div>
                <div class="specialties-list">
                    ${specialtiesHtml}
                </div>
            </div>
            
            <button class="btn btn-primary w-full" onclick="selectSupplier('${supplier.id}')">
                Select Supplier
            </button>
        `;
        
        suppliersList.appendChild(supplierCard);
    });
    
    // Initialize icons
    initializeIcons();
}

// Rewards Component
function renderRewards(rewards) {
    const activeRewardsSection = document.getElementById('active-rewards-section');
    const activeRewardsList = document.getElementById('active-rewards-list');
    const activeCount = document.getElementById('active-count');
    const activeRewardsCount = document.getElementById('active-rewards-count');
    const noRewards = document.getElementById('no-rewards');
    
    const activeRewards = rewards.filter(reward => !reward.isRedeemed && !isRewardExpired(reward));
    
    if (activeRewards.length > 0) {
        // Show active rewards section
        if (activeRewardsSection) activeRewardsSection.style.display = 'block';
        if (noRewards) noRewards.style.display = 'none';
        
        // Update counts
        if (activeCount) activeCount.textContent = activeRewards.length;
        if (activeRewardsCount) activeRewardsCount.textContent = activeRewards.length;
        
        // Render rewards
        if (activeRewardsList) {
            activeRewardsList.innerHTML = '';
            
            activeRewards.forEach(reward => {
                const rewardCard = document.createElement('div');
                rewardCard.className = 'reward-card';
                rewardCard.innerHTML = `
                    <div class="reward-header">
                        <div class="reward-info">
                            <span class="reward-emoji">${reward.emoji}</span>
                            <div class="reward-details">
                                <h4>${reward.title}</h4>
                                <p>${reward.description}</p>
                            </div>
                        </div>
                        <div class="reward-value">${reward.discount}% OFF</div>
                    </div>
                    
                    <div class="coupon-section">
                        <p class="coupon-header">Coupon Code</p>
                        <div class="coupon-display">
                            <span class="coupon-code">${reward.couponCode}</span>
                            <button class="copy-btn" onclick="copyRewardCode('${reward.couponCode}', this)">
                                <i data-lucide="copy"></i>
                            </button>
                        </div>
                    </div>
                    
                    <div class="reward-footer">
                        <div class="reward-expiry">
                            <i data-lucide="clock"></i>
                            <span>Expires: ${formatDate(reward.expiryDate)}</span>
                        </div>
                        <button class="btn btn-sm btn-primary" onclick="useReward('${reward.id}')">
                            Use Now
                        </button>
                    </div>
                `;
                
                activeRewardsList.appendChild(rewardCard);
            });
        }
    } else {
        // Show no rewards state
        if (activeRewardsSection) activeRewardsSection.style.display = 'none';
        if (noRewards) noRewards.style.display = 'block';
        if (activeRewardsCount) activeRewardsCount.textContent = '0';
    }
    
    // Initialize icons
    initializeIcons();
}

// Insights Component
function renderInsights(insights) {
    const insightsResults = document.getElementById('insights-results');
    if (!insightsResults) return;
    
    insightsResults.innerHTML = '';
    
    insights.forEach(insight => {
        const wastagePercentage = Math.round((insight.wasted / insight.ordered) * 100);
        const isHighWastage = wastagePercentage > 20;
        
        const insightCard = document.createElement('div');
        insightCard.className = `insight-card w-full ${isHighWastage ? 'high-wastage' : ''}`;
        insightCard.innerHTML = `
            <div class="insight-header">
                <div class="insight-info">
                    <div class="insight-icon ${isHighWastage ? 'warning' : 'success'}">
                        <i data-lucide="${isHighWastage ? 'alert-triangle' : 'trending-down'}"></i>
                    </div>
                    <div class="insight-details">
                        <h3>${insight.itemName}</h3>
                        <p>Last week analysis</p>
                    </div>
                </div>
                <span class="wastage-badge ${isHighWastage ? 'high' : 'low'}">
                    ${wastagePercentage}% wasted
                </span>
            </div>
            
            <div class="insight-stats">
                <div class="insight-stat">
                    <div class="value ordered">${insight.ordered}kg</div>
                    <div class="label">Ordered</div>
                </div>
                <div class="insight-stat">
                    <div class="value used">${insight.used}kg</div>
                    <div class="label">Used</div>
                </div>
                <div class="insight-stat">
                    <div class="value wasted">${insight.wasted}kg</div>
                    <div class="label">Wasted</div>
                </div>
            </div>
            
            ${isHighWastage ? `
                <div class="wastage-alert">
                    <p>⚠️ Last week you ordered ${insight.ordered}kg ${insight.itemName.toLowerCase()}, but used only ${insight.used}kg.</p>
                    <p class="loss">Estimated loss: ${formatCurrency(insight.loss)}</p>
                </div>
            ` : ''}
            
            <div class="ai-recommendation">
                <div class="recommendation-header">
                    <i data-lucide="lightbulb"></i>
                    <div class="recommendation-content">
                        <p>💡 AI Recommendation:</p>
                        <p class="suggestion">${insight.suggestion}</p>
                    </div>
                </div>
            </div>
        `;
        
        insightsResults.appendChild(insightCard);
    });
    
    // Initialize icons
    initializeIcons();
}

// Festival Component
function renderFestivals(festivals) {
    const festivalsGrid = document.getElementById('festivals-grid');
    if (!festivalsGrid) return;
    
    festivalsGrid.innerHTML = '';
    
    festivals.forEach(festival => {
        const festivalCard = document.createElement('div');
        festivalCard.className = 'festival-card w-full';
        festivalCard.innerHTML = `
            <div class="festival-preview" style="background: linear-gradient(135deg, ${festival.theme.gradientFrom}, ${festival.theme.gradientTo})">
                <div>
                    <h4>${festival.name}</h4>
                    <p>${formatDate(festival.date)}</p>
                </div>
                <span class="festival-emoji">${festival.banner.emoji}</span>
            </div>
            
            <div class="festival-details">
                <div class="festival-status">
                    <div class="status-indicator">
                        <span class="status-dot ${festival.isActive ? 'active' : 'inactive'}"></span>
                        <span class="status-text ${festival.isActive ? 'active' : 'inactive'}">
                            ${festival.isActive ? 'Active' : 'Inactive'}
                        </span>
                    </div>
                    <div class="offers-count">${festival.offers.length} offer${festival.offers.length !== 1 ? 's' : ''}</div>
                </div>
                
                <p class="festival-description">${festival.banner.text}</p>
                
                <div class="card-actions">
                    <div class="action-group">
                        <button class="action-btn toggle ${festival.isActive ? 'active' : 'inactive'}" 
                                onclick="toggleFestival('${festival.id}')" 
                                title="${festival.isActive ? 'Deactivate' : 'Activate'}">
                            <i data-lucide="${festival.isActive ? 'eye-off' : 'eye'}"></i>
                        </button>
                        <button class="action-btn edit" onclick="editFestival('${festival.id}')" title="Edit">
                            <i data-lucide="edit-3"></i>
                        </button>
                    </div>
                    <button class="action-btn delete" onclick="deleteFestival('${festival.id}')" title="Delete">
                        <i data-lucide="trash-2"></i>
                    </button>
                </div>
            </div>
        `;
        
        festivalsGrid.appendChild(festivalCard);
    });
    
    // Initialize icons
    initializeIcons();
}

// Smart Offers Component
function renderSmartOffers(offers) {
    const offersGrid = document.getElementById('offers-grid');
    if (!offersGrid) return;
    
    offersGrid.innerHTML = '';
    
    offers.forEach(offer => {
        const offerCard = document.createElement('div');
        offerCard.className = 'offer-card w-full';
        
        const triggerTypeLabels = {
            'first_login': 'First Login',
            'comeback': 'Comeback User',
            'loyalty': 'Loyalty Reward',
            'special_day': 'Special Day'
        };
        
        const rewardTypeLabels = {
            'discount': 'Discount',
            'ai_boost': 'AI Boost',
            'free_delivery': 'Free Delivery',
            'group_bonus': 'Group Bonus'
        };
        
        offerCard.innerHTML = `
            <div class="offer-details">
                <div class="offer-status">
                    <div class="status-indicator">
                        <span class="status-dot ${offer.isActive ? 'active' : 'inactive'}"></span>
                        <span class="status-text ${offer.isActive ? 'active' : 'inactive'}">
                            ${offer.isActive ? 'Active' : 'Inactive'}
                        </span>
                    </div>
                </div>
                
                <h4>${offer.title}</h4>
                <p class="offer-description">${offer.message}</p>
                
                <div class="offer-tags" style="margin-bottom: 1rem;">
                    <span class="tag">${triggerTypeLabels[offer.triggerType]}</span>
                </div>
                
                <div class="reward-info" style="background: var(--gray-50); padding: 0.75rem; border-radius: var(--border-radius-lg); margin-bottom: 1rem;">
                    <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 0.5rem;">
                        <span style="font-size: 0.875rem; font-weight: 500; color: var(--gray-700);">Reward</span>
                        <span style="font-size: 0.875rem; color: var(--gray-500);">${rewardTypeLabels[offer.reward.type]}</span>
                    </div>
                    <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 0.5rem;">
                        <span style="font-size: 1.125rem; font-weight: 700; color: var(--primary-color);">
                            ${offer.reward.value}${['discount', 'ai_boost', 'group_bonus'].includes(offer.reward.type) ? '%' : ''}
                            ${offer.reward.type === 'discount' ? ' OFF' : ''}
                            ${offer.reward.type === 'ai_boost' ? ' Boost' : ''}
                            ${offer.reward.type === 'group_bonus' ? ' Bonus' : ''}
                        </span>
                        <span style="font-size: 0.875rem; color: var(--gray-500);">${offer.reward.validDays} days</span>
                    </div>
                    <div style="font-size: 0.75rem; color: var(--gray-500); font-family: monospace;">
                        Code: ${offer.reward.couponCode}
                    </div>
                </div>
                
                <div class="card-actions">
                    <div class="action-group">
                        <button class="action-btn toggle ${offer.isActive ? 'active' : 'inactive'}" 
                                onclick="toggleOffer('${offer.id}')" 
                                title="${offer.isActive ? 'Deactivate' : 'Activate'}">
                            <i data-lucide="${offer.isActive ? 'eye-off' : 'eye'}"></i>
                        </button>
                        <button class="action-btn edit" onclick="editOffer('${offer.id}')" title="Edit">
                            <i data-lucide="edit-3"></i>
                        </button>
                    </div>
                    <button class="action-btn delete" onclick="deleteOffer('${offer.id}')" title="Delete">
                        <i data-lucide="trash-2"></i>
                    </button>
                </div>
            </div>
        `;
        
        offersGrid.appendChild(offerCard);
    });
    
    // Initialize icons
    initializeIcons();
}

// Modal Components
function showOfferModal(offer) {
    const modal = document.getElementById('offer-modal-overlay');
    const title = document.getElementById('offer-title');
    const message = document.getElementById('offer-message');
    const rewardValue = document.getElementById('reward-value');
    const couponCode = document.getElementById('coupon-code');
    
    if (!modal) return;
    
    // Update modal content
    if (title) title.textContent = offer.title;
    if (message) message.textContent = offer.message;
    if (couponCode) couponCode.textContent = offer.reward.couponCode;
    
    if (rewardValue) {
        let valueText = `${offer.reward.value}`;
        if (['discount', 'ai_boost', 'group_bonus'].includes(offer.reward.type)) {
            valueText += '%';
        }
        if (offer.reward.type === 'discount') valueText += ' OFF';
        if (offer.reward.type === 'ai_boost') valueText += ' AI Boost';
        if (offer.reward.type === 'group_bonus') valueText += ' Group Bonus';
        if (offer.reward.type === 'free_delivery') valueText = 'Free Delivery';
        
        rewardValue.textContent = valueText;
    }
    
    // Show modal
    modal.style.display = 'flex';
    
    // Add confetti if it's a welcome offer
    if (offer.animation === 'confetti') {
        setTimeout(createConfetti, 500);
    }
}

function hideOfferModal() {
    const modal = document.getElementById('offer-modal-overlay');
    if (modal) modal.style.display = 'none';
}

function showFestivalModal(festival = null) {
    const modal = document.getElementById('festival-modal-overlay');
    if (!modal) return;
    
    // Reset form if creating new festival
    if (!festival) {
        const form = document.getElementById('festival-form');
        if (form) form.reset();
        
        // Set default date to today
        const dateInput = document.getElementById('festival-date');
        if (dateInput) {
            dateInput.value = new Date().toISOString().split('T')[0];
        }
        
        // Reset emoji selection
        const emojiButtons = document.querySelectorAll('.emoji-btn');
        emojiButtons.forEach(btn => btn.classList.remove('active'));
        if (emojiButtons[0]) emojiButtons[0].classList.add('active');
        
        // Reset color preset
        const presetButtons = document.querySelectorAll('.preset-btn');
        presetButtons.forEach(btn => btn.classList.remove('active'));
        if (presetButtons[0]) presetButtons[0].classList.add('active');
    }
    
    modal.style.display = 'flex';
}

function hideFestivalModal() {
    const modal = document.getElementById('festival-modal-overlay');
    if (modal) modal.style.display = 'none';
}

// Helper functions
function isRewardExpired(reward) {
    return new Date(reward.expiryDate) < new Date();
}

function getInitials(name) {
    return name.split(' ').map(n => n[0]).join('').toUpperCase();
}