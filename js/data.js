// Mock Data for BazAIr App

// Vendor Data
const mockVendor = {
    id: 'v1',
    name: 'Raj Kumar',
    location: 'T. Nagar, Chennai',
    phone: '+91 98765 43210',
    verified: true,
    rating: 4.5,
    joinedDate: '2024-01-15'
};

// Cart Items
const mockCartItems = [
    {
        id: 'i1',
        name: 'Onions',
        emoji: '🧅',
        quantity: 10,
        unit: 'kg',
        pricePerUnit: 32,
        totalPrice: 320
    },
    {
        id: 'i2',
        name: 'Tomatoes',
        emoji: '🍅',
        quantity: 6,
        unit: 'kg',
        pricePerUnit: 42,
        totalPrice: 252
    },
    {
        id: 'i3',
        name: 'Green Chilies',
        emoji: '🌶️',
        quantity: 2,
        unit: 'kg',
        pricePerUnit: 40,
        totalPrice: 80
    },
    {
        id: 'i4',
        name: 'Masala Pack',
        emoji: '🧂',
        quantity: 1,
        unit: 'unit',
        pricePerUnit: 60,
        totalPrice: 60
    }
];

// Suppliers
const mockSuppliers = [
    {
        id: 's1',
        name: 'FreshFarm Traders',
        rating: 4.8,
        location: 'Koyambedu Market',
        deliveryTime: 'Next Day',
        priceRange: 'medium',
        verified: true,
        speciality: ['Vegetables', 'Spices'],
        eta: 'Tomorrow, 8AM - 10AM'
    },
    {
        id: 's2',
        name: 'Green Valley Suppliers',
        rating: 4.6,
        location: 'Pallavaram',
        deliveryTime: 'Same Day',
        priceRange: 'low',
        verified: true,
        speciality: ['Organic Vegetables'],
        eta: 'Today, 4PM - 6PM'
    },
    {
        id: 's3',
        name: 'Metro Fresh Wholesale',
        rating: 4.9,
        location: 'Chromepet',
        deliveryTime: 'Next Day',
        priceRange: 'high',
        verified: true,
        speciality: ['Premium Quality', 'Bulk Orders'],
        eta: 'Tomorrow, 10AM - 12PM'
    }
];

// Nearby Vendors for Group Orders
const mockNearbyVendors = [
    {
        id: 'v2',
        name: 'Priya Devi',
        location: 'T. Nagar, Chennai',
        phone: '+91 97654 32109',
        verified: true,
        rating: 4.3,
        joinedDate: '2024-02-10'
    },
    {
        id: 'v3',
        name: 'Kumar Singh',
        location: 'T. Nagar, Chennai',
        phone: '+91 96543 21098',
        verified: true,
        rating: 4.7,
        joinedDate: '2024-01-20'
    },
    {
        id: 'v4',
        name: 'Lakshmi Menon',
        location: 'T. Nagar, Chennai',
        phone: '+91 95432 10987',
        verified: true,
        rating: 4.4,
        joinedDate: '2024-03-05'
    }
];

// Wastage Insights
const mockWastageInsights = [
    {
        itemName: 'Onions',
        ordered: 15,
        used: 8,
        wasted: 7,
        loss: 170,
        suggestion: 'Order only 9kg next time based on usage pattern'
    },
    {
        itemName: 'Tomatoes',
        ordered: 8,
        used: 7,
        wasted: 1,
        loss: 42,
        suggestion: 'Good utilization! Continue with similar quantities'
    },
    {
        itemName: 'Green Chilies',
        ordered: 3,
        used: 2,
        wasted: 1,
        loss: 40,
        suggestion: 'Reduce order by 1kg to minimize waste'
    }
];

// Smart Offers
const mockSmartOffers = [
    {
        id: 'welcome_offer',
        triggerType: 'first_login',
        title: 'Welcome to BazAIr! 🎉',
        message: 'Get started with your first order and save big!',
        reward: {
            type: 'discount',
            value: 50,
            couponCode: 'WELCOME50',
            validDays: 30
        },
        animation: 'confetti',
        isActive: true
    },
    {
        id: 'comeback_offer',
        triggerType: 'comeback',
        title: 'We Missed You! 💝',
        message: 'Welcome back! Here\'s a special reward just for you.',
        reward: {
            type: 'discount',
            value: 25,
            couponCode: 'COMEBACK25',
            validDays: 7
        },
        animation: 'sparkles',
        isActive: true
    },
    {
        id: 'loyalty_boost',
        triggerType: 'loyalty',
        title: 'Loyalty Bonus! ⭐',
        message: 'You\'re our star vendor! Enjoy this AI insight boost.',
        reward: {
            type: 'ai_boost',
            value: 100,
            couponCode: 'AIBOOST100',
            validDays: 14
        },
        animation: 'glow',
        isActive: true
    }
];

// Festivals
const mockFestivals = [
    {
        id: 'independence-day-2024',
        name: 'Independence Day',
        date: '2024-08-15',
        isActive: true,
        theme: {
            primaryColor: '#FF6B35',
            secondaryColor: '#FFFFFF',
            accentColor: '#138808',
            gradientFrom: '#FF6B35',
            gradientTo: '#138808'
        },
        banner: {
            text: 'Happy Independence Day!',
            emoji: '🇮🇳',
            subtext: 'Celebrating 77 years of freedom'
        },
        offers: [
            {
                title: 'Freedom Special',
                description: 'Get 15% off on all orders above ₹500',
                discount: 15,
                emoji: '🎆'
            }
        ]
    }
];

// User Login Data (for smart offers)
const mockUserLoginData = {
    userId: 'user_raj_kumar',
    lastLoginDate: '2024-12-20',
    loginCount: 15,
    isFirstTime: false, // Set to true to test welcome offer
    consecutiveDays: 3,
    totalRewards: 2,
    activeRewards: []
};

// Color Presets for Festivals
const colorPresets = {
    independence: {
        primary: '#FF6B35',
        secondary: '#FFFFFF',
        accent: '#138808',
        gradientFrom: '#FF6B35',
        gradientTo: '#138808'
    },
    pongal: {
        primary: '#FFD700',
        secondary: '#8B4513',
        accent: '#32CD32',
        gradientFrom: '#FFD700',
        gradientTo: '#FFA500'
    },
    diwali: {
        primary: '#FFD700',
        secondary: '#FF4500',
        accent: '#8B0000',
        gradientFrom: '#FFD700',
        gradientTo: '#FF4500'
    },
    friendship: {
        primary: '#FF69B4',
        secondary: '#FFB6C1',
        accent: '#FF1493',
        gradientFrom: '#FF69B4',
        gradientTo: '#FFB6C1'
    }
};