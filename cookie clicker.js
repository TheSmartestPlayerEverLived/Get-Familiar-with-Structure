// Game State
const gameState = {
    cookies: 0,
    perSecond: 0,
    clickPower: 1,
    totalClicks: 0,
    totalCookies: 0
};

// Upgrades Database - Base upgrades
const baseUpgrades = [
    {
        id: 'cursor',
        name: 'Cursor',
        icon: '👆',
        desc: '+1 click',
        cost: 10,
        power: 1,
        purchased: 0,
        type: 'click'
    },
    {
        id: 'grandma',
        name: 'Grandma',
        icon: '👵',
        desc: '+0.1 per second',
        cost: 100,
        power: 0.1,
        purchased: 0,
        type: 'passive'
    },
    {
        id: 'farm',
        name: 'Cookie Farm',
        icon: '🌾',
        desc: '+0.5 per second',
        cost: 500,
        power: 0.5,
        purchased: 0,
        type: 'passive'
    },
    {
        id: 'factory',
        name: 'Cookie Factory',
        icon: '🏭',
        desc: '+2 per second',
        cost: 3000,
        power: 2,
        purchased: 0,
        type: 'passive'
    },
    {
        id: 'wizard',
        name: 'Wizard Tower',
        icon: '🧙',
        desc: '+5 per second',
        cost: 10000,
        power: 5,
        purchased: 0,
        type: 'passive'
    },
    {
        id: 'time',
        name: 'Time Machine',
        icon: '⏰',
        desc: '+10 per second',
        cost: 50000,
        power: 10,
        purchased: 0,
        type: 'passive'
    },
    {
        id: 'buff',
        name: 'Double Click Buff',
        icon: '💥',
        desc: 'x2 click power (one-time)',
        cost: 250,
        power: 0,
        purchased: 0,
        type: 'buff',
        effect: () => {
            gameState.clickPower *= 2;
            updateUI();
            showMotivation(`YOOO YOU'RE CRACKED NOW!!! 💪`);
        }
    },
    {
        id: 'skin',
        name: 'Legendary Skin',
        icon: '✨',
        desc: 'no stat boost, just drip',
        cost: 500,
        power: 0,
        purchased: 0,
        type: 'cosmetic'
    },
    {
        id: 'bing',
        name: 'Bing Chilling',
        icon: '❄️',
        desc: '+3 per second (based)',
        cost: 5000,
        power: 3,
        purchased: 0,
        type: 'passive'
    }
];

let upgrades = [...baseUpgrades];

// Generate infinite scaling upgrades
function generateInfiniteUpgrades() {
    upgrades = [...baseUpgrades];

    // Add scaling upgrades every 10 levels
    const scales = [100000, 1000000, 10000000, 100000000, 1000000000];
    scales.forEach((scale, idx) => {
        upgrades.push({
            id: `mega_${idx}`,
            name: `MEGA GRINDER ${idx + 1}`,
            icon: '🚀',
            desc: `+${(50 * (idx + 1))} per second`,
            cost: scale,
            power: 50 * (idx + 1),
            purchased: 0,
            type: 'passive'
        });
    });
}

// Achievements Database
const baseAchievements = [
    {
        id: 'first_click',
        name: 'First W',
        icon: '✅',
        desc: 'Click the cookie once',
        unlocked: false,
        check: () => gameState.totalClicks >= 1
    },
    {
        id: 'hundred_clicks',
        name: 'No Cap',
        icon: '💯',
        desc: 'Click 100 times',
        unlocked: false,
        check: () => gameState.totalClicks >= 100
    },
    {
        id: 'thousand_clicks',
        name: 'SKIBIDI SIGMA',
        icon: '🗣️',
        desc: 'Click 1,000 times',
        unlocked: false,
        check: () => gameState.totalClicks >= 1000
    },
    {
        id: 'first_upgrade',
        name: 'Touched Grass (Upgrade)',
        icon: '🌱',
        desc: 'Buy your first upgrade',
        unlocked: false,
        check: () => upgrades.some(u => u.purchased > 0)
    },
    {
        id: 'cookie_millionaire',
        name: 'MILLIONAIRE MINDSET',
        icon: '💰',
        desc: 'Have 1,000,000 cookies',
        unlocked: false,
        check: () => gameState.totalCookies >= 1000000
    },
    {
        id: 'passive_income',
        name: 'Passive Income King',
        icon: '👑',
        desc: 'Generate 10+ cookies per second',
        unlocked: false,
        check: () => gameState.perSecond >= 10
    },
    {
        id: 'gen_z',
        name: 'Gen Z Native',
        icon: '🧬',
        desc: 'Use 5 different upgrades',
        unlocked: false,
        check: () => upgrades.filter(u => u.purchased > 0).length >= 5
    },
    {
        id: 'speedrun',
        name: 'Speed Run Any%',
        icon: '⚡',
        desc: 'Reach 100,000 cookies (session)',
        unlocked: false,
        check: () => gameState.cookies >= 100000
    },
    {
        id: 'drip',
        name: 'Drip Check',
        icon: '👗',
        desc: 'Buy the Legendary Skin',
        unlocked: false,
        check: () => upgrades.find(u => u.id === 'skin').purchased > 0
    }
];

// Generate infinite achievements based on milestones
let achievements = [...baseAchievements];

function generateInfiniteAchievements() {
    // Clear and rebuild
    achievements = [...baseAchievements];

    // Milestone achievements for clicks
    const clickMilestones = [10000, 50000, 100000, 500000, 1000000];
    clickMilestones.forEach((mil, idx) => {
        achievements.push({
            id: `clicks_${mil}`,
            name: `${mil.toLocaleString()} CLICKS SIGMA`,
            icon: '🖱️',
            desc: `Click ${mil.toLocaleString()} times`,
            unlocked: false,
            check: () => gameState.totalClicks >= mil
        });
    });

    // Milestone achievements for cookies
    const cookieMilestones = [10000000, 100000000, 1000000000];
    cookieMilestones.forEach((mil, idx) => {
        achievements.push({
            id: `cookies_${mil}`,
            name: `${(mil / 1000000).toFixed(0)}M COOKIES`,
            icon: '🍪',
            desc: `Earn ${mil.toLocaleString()} cookies total`,
            unlocked: false,
            check: () => gameState.totalCookies >= mil
        });
    });

    // Milestone achievements for per-second
    const psMilestones = [50, 100, 500, 1000];
    psMilestones.forEach((mil, idx) => {
        achievements.push({
            id: `persec_${mil}`,
            name: `${mil}/SEC MAIN CHARACTER`,
            icon: '📈',
            desc: `Generate ${mil}+ cookies per second`,
            unlocked: false,
            check: () => gameState.perSecond >= mil
        });
    });
}

// Motivational Quotes (Gen Z Edition)
const motivationalQuotes = [
    'fr fr, keep grinding 💪',
    'no cap, this game hits different 🔥',
    'touch grass after this sesh 🌿',
    'you got the vibe, keep it up ✨',
    'this is lowkey fire not gonna lie 🔥',
    'we ball 🏀',
    'slay queen/king 👑',
    'it\'s giving main character energy 💫',
    'ate and left no crumbs 🍪',
    'main character moment fr 🎬',
    'the algorithm is blessing you rn 📱',
    'based and cookie-pilled 💊'
];

// DOM Elements
const cookieBtn = document.getElementById('cookieBtn');
const cookieCountEl = document.getElementById('cookieCount');
const perSecondEl = document.getElementById('perSecond');
const clickTextEl = document.getElementById('clickText');
const motivationalTextEl = document.getElementById('motivationalText');
const upgradesGrid = document.getElementById('upgradesGrid');
const achievementsGrid = document.getElementById('achievementsGrid');

// Click Cookie
cookieBtn.addEventListener('click', (e) => {
    gameState.cookies += gameState.clickPower;
    gameState.totalClicks++;
    gameState.totalCookies += gameState.clickPower;

    // Play music on first click if needed
    const bgMusic = document.getElementById('bgMusic');
    if (bgMusic.paused) {
        bgMusic.play().catch(e => console.log('Audio play failed'));
    }

    // Show floating text
    showClickText(gameState.clickPower, e);

    // Update UI
    updateUI();

    // Check achievements
    checkAchievements();
});

function showClickText(amount, event) {
    const text = clickTextEl;
    text.textContent = `+${Math.floor(amount)} 🍪`;
    text.style.animation = 'none';
    setTimeout(() => {
        text.style.animation = 'popout 0.5s ease-out';
    }, 10);
}

function updateUI() {
    cookieCountEl.textContent = formatNumber(gameState.cookies);
    perSecondEl.textContent = formatNumber(gameState.perSecond);
    updateUpgradeAffordability();
}

function updateUpgradeAffordability() {
    const items = document.querySelectorAll('.upgrade-item');
    upgrades.forEach((upgrade, idx) => {
        if (items[idx]) {
            const canAfford = gameState.cookies >= upgrade.cost;
            items[idx].classList.toggle('disabled', !canAfford);
        }
    });
}

function formatNumber(num) {
    if (num >= 1000000) return (num / 1000000).toFixed(2) + 'M';
    if (num >= 1000) return (num / 1000).toFixed(2) + 'K';
    return Math.floor(num).toString();
}

function renderUpgrades() {
    upgradesGrid.innerHTML = '';
    upgrades.forEach(upgrade => {
        const canAfford = gameState.cookies >= upgrade.cost;
        const div = document.createElement('div');
        div.className = `upgrade-item ${!canAfford ? 'disabled' : ''}`;

        const costStr = formatNumber(upgrade.cost);
        const countStr = upgrade.purchased > 0 ? ` (x${upgrade.purchased})` : '';

        div.innerHTML = `
            <div class="upgrade-info">
                <div class="upgrade-name">${upgrade.icon} ${upgrade.name}${countStr}</div>
                <div class="upgrade-desc">${upgrade.desc}</div>
            </div>
            <div class="upgrade-cost">${costStr}</div>
        `;

        div.addEventListener('click', () => {
            buyUpgrade(upgrade);
        });

        upgradesGrid.appendChild(div);
    });
}

function buyUpgrade(upgrade) {
    if (gameState.cookies < upgrade.cost) return;

    gameState.cookies -= upgrade.cost;
    upgrade.purchased++;

    if (upgrade.type === 'click') {
        gameState.clickPower += upgrade.power;
        showMotivation(`CLICK POWER UP!!! +${upgrade.power} 💪`);
    } else if (upgrade.type === 'passive') {
        gameState.perSecond += upgrade.power;
        showMotivation(`${upgrade.name.toUpperCase()} ONLINE!!! 🚀`);
    } else if (upgrade.type === 'buff') {
        upgrade.effect();
    } else if (upgrade.type === 'cosmetic') {
        showMotivation(`you got drip now bestie ✨`);
    }

    updateUI();
    renderUpgrades();
    checkAchievements();
}

function renderAchievements() {
    achievementsGrid.innerHTML = '';
    achievements.forEach(ach => {
        const div = document.createElement('div');
        const isUnlocked = ach.check();
        const wasUnlocked = ach.unlocked;

        if (isUnlocked && !wasUnlocked) {
            ach.unlocked = true;
            showMotivation(`ACHIEVEMENT UNLOCKED: ${ach.name}!!! 🏆`);
        }

        div.className = `achievement-item ${isUnlocked ? 'unlocked' : 'locked'}`;
        div.innerHTML = `
            <div style="display: flex; align-items: center; flex-grow: 1;">
                <span class="achievement-icon">${ach.icon}</span>
                <div class="achievement-info">
                    <div class="achievement-name">${ach.name}</div>
                    <div class="achievement-desc">${ach.desc}</div>
                </div>
            </div>
            ${isUnlocked ? '<span style="color: #00d4ff; font-weight: bold;">✓ UNLOCKED</span>' : '<span style="color: #666;">🔒</span>'}
        `;

        achievementsGrid.appendChild(div);
    });
}

function checkAchievements() {
    renderAchievements();
}

function showMotivation(text) {
    motivationalTextEl.textContent = text;
    motivationalTextEl.style.animation = 'none';
    setTimeout(() => {
        motivationalTextEl.style.animation = 'pulse 2s infinite';
    }, 10);
}

function switchTab(tabName) {
    // Hide all tabs
    document.querySelectorAll('.tab-content').forEach(tab => {
        tab.classList.remove('active');
    });
    // Remove active class from buttons
    document.querySelectorAll('.tab-btn').forEach(btn => {
        btn.classList.remove('active');
    });

    // Show selected tab
    document.getElementById(tabName).classList.add('active');
    event.target.classList.add('active');
}

// Passive income
setInterval(() => {
    gameState.cookies += gameState.perSecond / 10; // Per frame (100ms)
    gameState.totalCookies += gameState.perSecond / 10;
    updateUI();
    checkAchievements(); // Check achievements every frame
}, 100);

// Initialize
generateInfiniteUpgrades();
generateInfiniteAchievements();
renderUpgrades();
updateUI();
renderAchievements();
showMotivation('fr fr, keep grinding 💪');

// Start phonk background music
const bgMusic = document.getElementById('bgMusic');
if (bgMusic) {
    bgMusic.volume = 0.2;
    bgMusic.muted = false; // Unmute to start playing
    bgMusic.play().catch(e => {
        // If autoplay fails, play on first click
        document.addEventListener('click', function playOnClick() {
            bgMusic.play().catch(() => { });
            document.removeEventListener('click', playOnClick);
        });
    });
}
