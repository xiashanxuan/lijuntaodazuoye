// Product image helper: use local images/ folder, fallback to gradient placeholder
function getProductImg(product, size) {
    if (product.img) {
        return `<img src="${product.img}" alt="${product.name}" onerror="this.style.display='none';this.nextSibling.style.display='flex';">`;
    }
    return '';
}
function getProductFallback(product) {
    return `<span style="display:flex;align-items:center;justify-content:center;width:100%;height:100%;font-size:${product.id % 2 === 0 ? '70px' : '80px'};">${product.emoji}</span>`;
}
function getProductImgHtml(product, size) {
    return getProductImg(product, size) + getProductFallback(product);
}

// Product data store
const products = [
    { id: 1, name: '华为 Mate 70 Pro 智能手机 512GB', category: '手机数码', price: 6999, originalPrice: 7999, sold: 15234, emoji: '📱', img: 'images/w1.png', desc: '搭载麒麟9100芯片，支持卫星通信，1英寸大底主摄，昆仑玻璃面板。' },
    { id: 2, name: 'Apple MacBook Pro 14英寸 M4芯片', category: '电脑办公', price: 14999, originalPrice: 16999, sold: 8921, emoji: '💻', img: 'images/w2.png', desc: 'M4芯片，16GB统一内存，512GB SSD，Liquid Retina XDR显示屏。' },
    { id: 3, name: '索尼 WH-1000XM6 头戴式降噪耳机', category: '手机数码', price: 2499, originalPrice: 2999, sold: 23100, emoji: '🎧', img: 'images/w3.png', desc: '行业领先降噪技术，30小时续航，支持LDAC高清音频。' },
    { id: 4, name: '小米平板7 Pro 12.4英寸', category: '电脑办公', price: 3299, originalPrice: 3699, sold: 5432, emoji: '📋', img: 'images/w4.png', desc: '骁龙8Gen3处理器，120Hz高刷屏，10000mAh大电池。' },
    { id: 5, name: '戴森 V15 Detect 无绳吸尘器', category: '家用电器', price: 4990, originalPrice: 5990, sold: 18765, emoji: '🧹', img: 'images/w5.png', desc: '激光探测微尘，LCD屏幕实时显示，60分钟续航。' },
    { id: 6, name: 'Nike Air Jordan 1 复古篮球鞋', category: '运动户外', price: 1299, originalPrice: 1599, sold: 34210, emoji: '👟', img: 'images/w6.png', desc: '经典复刻设计，Air气垫缓震，优质皮革鞋面。' },
    { id: 7, name: '海蓝之谜修护精萃液 150ml', category: '美妆护肤', price: 1680, originalPrice: 1980, sold: 4560, emoji: '✨', img: 'images/w7.png', desc: '深海巨藻精华，修护肌肤屏障，提升肌肤光泽。' },
    { id: 8, name: '美的变频空调 1.5匹 一级能效', category: '家用电器', price: 3299, originalPrice: 3999, sold: 27650, emoji: '❄️', img: 'images/w8.png', desc: '新一级能效，全直流变频，自清洁技术，静音运行。' },
    { id: 9, name: '茅台 飞天53度 酱香型白酒 500ml', category: '食品酒饮', price: 2999, originalPrice: 3299, sold: 8765, emoji: '🍶', img: 'images/w9.png', desc: '贵州茅台镇原产，酱香突出，幽雅细腻，回味悠长。' },
    { id: 10, name: '乐高 兰博基尼Sián 机械组跑车模型', category: '玩具乐器', price: 3499, originalPrice: 3999, sold: 3210, emoji: '🏎️', img: 'images/w10.png', desc: '3696颗粒，1:8比例，可动V12引擎，转向系统。' },
    { id: 11, name: '三星 Galaxy Tab S10 Ultra 平板', category: '电脑办公', price: 8999, originalPrice: 9999, sold: 3456, emoji: '📲', img: 'images/w11.png', desc: '14.6英寸Dynamic AMOLED屏，S Pen，IP68防水。' },
    { id: 12, name: 'SK-II 神仙水 面部精华液 230ml', category: '美妆护肤', price: 1590, originalPrice: 1790, sold: 28900, emoji: '💧', img: 'images/w12.png', desc: 'PITERA精华，改善肌肤纹理，提亮肤色。' },
    { id: 13, name: '华为 Watch GT 4 智能手表 46mm', category: '手机数码', price: 2488, originalPrice: 2688, sold: 12300, emoji: '⌚', img: 'images/w13.png', desc: '14天超长续航，AI心率监测，高尔夫模式。' },
    { id: 14, name: '三只松鼠 坚果大礼包 1818g', category: '食品酒饮', price: 99, originalPrice: 149, sold: 89500, emoji: '🥜', img: 'images/w14.png', desc: '多种坚果零食组合，年货送礼佳品。' },
    { id: 15, name: 'PS5 Pro 游戏主机 国行版', category: '玩具乐器', price: 4999, originalPrice: 5499, sold: 6700, emoji: '🎮', img: 'images/w15.png', desc: '光线追踪，4K 120fps，SSD极速加载。' },
];

// Categories
const categories = ['全部', '手机数码', '电脑办公', '家用电器', '美妆护肤', '食品酒饮', '运动户外', '玩具乐器'];

// Cart management with localStorage
function getCart() {
    return JSON.parse(localStorage.getItem('cart') || '[]');
}

function saveCart(cart) {
    localStorage.setItem('cart', JSON.stringify(cart));
}

function addToCart(productId, quantity = 1) {
    const cart = getCart();
    const existing = cart.find(item => item.id === productId);
    if (existing) {
        existing.quantity += quantity;
    } else {
        cart.push({ id: productId, quantity });
    }
    saveCart(cart);
    updateCartCount();
    showToast('已添加到购物车');
}

function updateCartCount() {
    const cart = getCart();
    const count = cart.reduce((sum, item) => sum + item.quantity, 0);
    document.querySelectorAll('.cart-count').forEach(el => {
        el.textContent = count;
    });
}

function getCartTotal() {
    const cart = getCart();
    return cart.reduce((sum, item) => {
        const product = products.find(p => p.id === item.id);
        return sum + (product ? product.price * item.quantity : 0);
    }, 0);
}

// User management with localStorage
function getCurrentUser() {
    return JSON.parse(localStorage.getItem('currentUser') || 'null');
}

function setCurrentUser(user) {
    localStorage.setItem('currentUser', JSON.stringify(user));
}

function getUsers() {
    return JSON.parse(localStorage.getItem('users') || '[]');
}

function registerUser(username, password) {
    const users = getUsers();
    if (users.find(u => u.username === username)) {
        return { success: false, message: '用户名已存在' };
    }
    const newUser = { username, password, createdAt: new Date().toISOString() };
    users.push(newUser);
    localStorage.setItem('users', JSON.stringify(users));
    return { success: true, message: '注册成功' };
}

function loginUser(username, password) {
    const users = getUsers();
    const user = users.find(u => u.username === username && u.password === password);
    if (user) {
        setCurrentUser(user);
        return { success: true, message: '登录成功' };
    }
    return { success: false, message: '用户名或密码错误' };
}

function logoutUser() {
    localStorage.removeItem('currentUser');
}

// Order management
function getOrders() {
    return JSON.parse(localStorage.getItem('orders') || '[]');
}

function placeOrder(orderData) {
    const user = getCurrentUser();
    if (!user) return { success: false, message: '请先登录' };
    const orders = getOrders();
    const order = {
        id: 'ORD' + Date.now(),
        username: user.username,
        items: orderData.items,
        total: orderData.total,
        address: orderData.address,
        phone: orderData.phone,
        receiver: orderData.receiver,
        date: new Date().toISOString().split('T')[0],
        status: '待发货'
    };
    orders.unshift(order);
    localStorage.setItem('orders', JSON.stringify(orders));
    // Clear cart
    saveCart([]);
    updateCartCount();
    return { success: true, message: '订单提交成功', order };
}

// Toast notification
function showToast(message) {
    const existing = document.querySelector('.toast');
    if (existing) existing.remove();
    const toast = document.createElement('div');
    toast.className = 'toast';
    toast.textContent = message;
    document.body.appendChild(toast);
    setTimeout(() => toast.remove(), 2000);
}

// Format currency
function formatPrice(price) {
    return '¥' + price.toFixed(2);
}

// Get product by ID
function getProduct(id) {
    return products.find(p => p.id === id);
}

// Search products
function searchProducts(keyword) {
    const kw = keyword.toLowerCase();
    return products.filter(p =>
        p.name.toLowerCase().includes(kw) ||
        p.category.toLowerCase().includes(kw) ||
        p.desc.toLowerCase().includes(kw)
    );
}

// Initialize demo data on first visit
function initDemoData() {
    if (!localStorage.getItem('demoInitialized')) {
        // Pre-register a demo user
        const users = getUsers();
        if (!users.find(u => u.username === 'demo')) {
            users.push({ username: 'demo', password: '123456', createdAt: new Date().toISOString() });
            localStorage.setItem('users', JSON.stringify(users));
        }
        // Add some demo orders
        if (getOrders().length === 0) {
            const demoOrders = [
                {
                    id: 'ORD' + (Date.now() - 86400000),
                    username: 'demo',
                    items: [{ img: 'images/phone.jpg', emoji: '📱', name: '华为 Mate 70 Pro 智能手机 512GB', price: 6999, quantity: 1 }],
                    total: 6999,
                    receiver: '李钧涛', phone: '13800138000',
                    address: '广东省佛山市南海区 广东东软学院',
                    date: '2025-06-15', status: '已完成'
                },
                {
                    id: 'ORD' + (Date.now() - 172800000),
                    username: 'demo',
                    items: [{ img: 'images/headphone.jpg', emoji: '🎧', name: '索尼 WH-1000XM6 头戴式降噪耳机', price: 2499, quantity: 1 }],
                    total: 2499,
                    receiver: '李钧涛', phone: '13800138000',
                    address: '广东省佛山市南海区 广东东软学院',
                    date: '2025-06-10', status: '已完成'
                }
            ];
            localStorage.setItem('orders', JSON.stringify(demoOrders));
        }
        localStorage.setItem('demoInitialized', 'true');
    }
}
initDemoData();

// Initialize on page load
document.addEventListener('DOMContentLoaded', () => {
    updateCartCount();
    // Show logged-in user
    const user = getCurrentUser();
    const welcomeEl = document.getElementById('welcome-text');
    const authLinks = document.getElementById('auth-links');
    if (user && welcomeEl) {
        welcomeEl.textContent = '欢迎，' + user.username + '！';
        if (authLinks) {
            authLinks.innerHTML = '<a href="profile.html">个人中心</a><a href="#" onclick="logoutUser();location.reload();">退出</a>';
        }
    }
});

// ===== Scroll-triggered animations =====
const observerOptions = { threshold: 0.1, rootMargin: '0px 0px -40px 0px' };

const fadeInObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
            fadeInObserver.unobserve(entry.target);
        }
    });
}, observerOptions);

// Animate product cards on scroll
document.addEventListener('DOMContentLoaded', () => {
    setTimeout(() => {
        document.querySelectorAll('.product-card').forEach((card, i) => {
            card.style.opacity = '0';
            card.style.transform = 'translateY(20px)';
            card.style.transition = `all 0.4s cubic-bezier(0.4, 0, 0.2, 1) ${i * 0.04}s`;
            fadeInObserver.observe(card);
        });
    }, 100);
});
