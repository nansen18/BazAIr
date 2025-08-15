// Utility Functions for BazAIr App

// Show loading overlay
function showLoading(text = 'Loading...') {
    const overlay = document.getElementById('loading-overlay');
    const loadingText = document.getElementById('loading-text');
    if (loadingText) loadingText.textContent = text;
    if (overlay) overlay.style.display = 'flex';
}

// Hide loading overlay
function hideLoading() {
    const overlay = document.getElementById('loading-overlay');
    if (overlay) overlay.style.display = 'none';
}

// Show toast notification
function showToast(message, type = 'info', duration = 3000) {
    const container = document.getElementById('toast-container');
    if (!container) return;

    const toast = document.createElement('div');
    toast.className = `toast ${type}`;
    toast.textContent = message;
    
    container.appendChild(toast);
    
    // Auto remove after duration
    setTimeout(() => {
        if (toast.parentNode) {
            toast.parentNode.removeChild(toast);
        }
    }, duration);
}

// Format currency
function formatCurrency(amount) {
    return `₹${amount.toLocaleString('en-IN')}`;
}

// Format date
function formatDate(dateString) {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-IN', {
        day: 'numeric',
        month: 'short',
        year: 'numeric'
    });
}

// Generate random ID
function generateId(prefix = 'id') {
    return `${prefix}_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
}

// Simulate API delay
function simulateApiDelay(ms = 1000) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

// Copy to clipboard
async function copyToClipboard(text) {
    try {
        await navigator.clipboard.writeText(text);
        return true;
    } catch (err) {
        // Fallback for older browsers
        const textArea = document.createElement('textarea');
        textArea.value = text;
        document.body.appendChild(textArea);
        textArea.select();
        try {
            document.execCommand('copy');
            document.body.removeChild(textArea);
            return true;
        } catch (fallbackErr) {
            document.body.removeChild(textArea);
            return false;
        }
    }
}

// Debounce function
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

// Throttle function
function throttle(func, limit) {
    let inThrottle;
    return function() {
        const args = arguments;
        const context = this;
        if (!inThrottle) {
            func.apply(context, args);
            inThrottle = true;
            setTimeout(() => inThrottle = false, limit);
        }
    }
}

// Local storage helpers
const storage = {
    set: (key, value) => {
        try {
            localStorage.setItem(key, JSON.stringify(value));
        } catch (e) {
            console.error('Error saving to localStorage:', e);
        }
    },
    
    get: (key, defaultValue = null) => {
        try {
            const item = localStorage.getItem(key);
            return item ? JSON.parse(item) : defaultValue;
        } catch (e) {
            console.error('Error reading from localStorage:', e);
            return defaultValue;
        }
    },
    
    remove: (key) => {
        try {
            localStorage.removeItem(key);
        } catch (e) {
            console.error('Error removing from localStorage:', e);
        }
    },
    
    clear: () => {
        try {
            localStorage.clear();
        } catch (e) {
            console.error('Error clearing localStorage:', e);
        }
    }
};

// Animation helpers
function createConfetti() {
    const container = document.createElement('div');
    container.className = 'confetti-container';
    document.body.appendChild(container);
    
    for (let i = 0; i < 50; i++) {
        const confetti = document.createElement('div');
        confetti.className = 'confetti-piece';
        confetti.style.left = Math.random() * 100 + '%';
        confetti.style.animationDelay = Math.random() * 3 + 's';
        confetti.style.animationDuration = (Math.random() * 2 + 2) + 's';
        container.appendChild(confetti);
    }
    
    // Remove after animation
    setTimeout(() => {
        if (container.parentNode) {
            container.parentNode.removeChild(container);
        }
    }, 5000);
}

// Form validation helpers
const validation = {
    required: (value) => {
        return value && value.toString().trim().length > 0;
    },
    
    email: (value) => {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(value);
    },
    
    phone: (value) => {
        const phoneRegex = /^[\+]?[1-9][\d]{0,15}$/;
        return phoneRegex.test(value.replace(/\s/g, ''));
    },
    
    number: (value, min = null, max = null) => {
        const num = parseFloat(value);
        if (isNaN(num)) return false;
        if (min !== null && num < min) return false;
        if (max !== null && num > max) return false;
        return true;
    },
    
    date: (value) => {
        const date = new Date(value);
        return date instanceof Date && !isNaN(date);
    }
};

// Event helpers
function addEventListeners(element, events, handler) {
    events.split(' ').forEach(event => {
        element.addEventListener(event, handler);
    });
}

function removeEventListeners(element, events, handler) {
    events.split(' ').forEach(event => {
        element.removeEventListener(event, handler);
    });
}

// DOM helpers
function createElement(tag, className = '', textContent = '') {
    const element = document.createElement(tag);
    if (className) element.className = className;
    if (textContent) element.textContent = textContent;
    return element;
}

function createIcon(iconName, className = '') {
    const icon = document.createElement('i');
    icon.setAttribute('data-lucide', iconName);
    if (className) icon.className = className;
    return icon;
}

// Initialize Lucide icons
function initializeIcons() {
    if (typeof lucide !== 'undefined') {
        lucide.createIcons();
    }
}

// Mobile detection
function isMobile() {
    return window.innerWidth <= 768;
}

// Touch event helpers
function addTouchSupport(element, callback) {
    let startY = 0;
    let startX = 0;
    
    element.addEventListener('touchstart', (e) => {
        startY = e.touches[0].clientY;
        startX = e.touches[0].clientX;
    });
    
    element.addEventListener('touchend', (e) => {
        const endY = e.changedTouches[0].clientY;
        const endX = e.changedTouches[0].clientX;
        const diffY = startY - endY;
        const diffX = startX - endX;
        
        if (Math.abs(diffY) > Math.abs(diffX)) {
            if (diffY > 50) {
                callback('swipeUp');
            } else if (diffY < -50) {
                callback('swipeDown');
            }
        } else {
            if (diffX > 50) {
                callback('swipeLeft');
            } else if (diffX < -50) {
                callback('swipeRight');
            }
        }
    });
}

// Error handling
function handleError(error, context = 'Unknown') {
    console.error(`Error in ${context}:`, error);
    showToast(`Something went wrong. Please try again.`, 'error');
}

// Network status
function isOnline() {
    return navigator.onLine;
}

// Initialize network status monitoring
function initializeNetworkMonitoring() {
    window.addEventListener('online', () => {
        showToast('Connection restored', 'success');
    });
    
    window.addEventListener('offline', () => {
        showToast('Connection lost. Some features may not work.', 'warning', 5000);
    });
}