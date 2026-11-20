/**
 * AI Odyssey - Generative & Agentic AI Roadmap Tracker Engine
 * Multi-User Social Accountability & Live Sync Edition
 * Osama & Morshid Team Edition 🤝
 */

// Storage Keys
const STORAGE_KEY_MULTI = 'AI_ROADMAP_MULTIUSER_V1';
const LEGACY_STORAGE_KEY = 'GENAI_AGENTIC_ROADMAP_V2_DATA';
const ACTIVE_USER_KEY = 'AI_ROADMAP_ACTIVE_USER';
const CLOUD_CONFIG_KEY = 'AI_ROADMAP_CLOUD_CONFIG';

// Factory for Default User Structure
function createDefaultUser(id, name, nameAr, avatar, color, role) {
  return {
    id: id,
    name: name,
    nameAr: nameAr,
    avatar: avatar,
    color: color,
    role: role || 'AI Explorer & Engineer',
    cheers: 0,
    tasks: {},          // { taskId: boolean }
    projects: {},       // { projId: { completed: boolean, githubUrl: '', demoUrl: '', notes: '' } }
    notes: {},          // { weekId: string }
    career: {},         // { careerId: boolean }
    studySessions: 0,
    streakDays: 1,
    lastActiveDate: new Date().toISOString().split('T')[0],
    startDate: new Date().toISOString().split('T')[0]
  };
}

// Global Application Multi-User State
let appData = {
  activeUserId: 'osama',   // The user operating this device (can edit)
  viewingUserId: 'osama',  // The roadmap currently displayed on screen
  users: {
    'osama': createDefaultUser('osama', 'Osama', 'أسامة', '👑', '#3b82f6', 'Co-Founder & AI Engineer'),
    'morshid': createDefaultUser('morshid', 'Morshid', 'مُرشِد', '⚡', '#10b981', 'Study Partner & AI Challenger')
  },
  cloudConfig: {
    firebaseUrl: '',
    autoSync: true,
    serverUrl: '',
    lastSynced: null
  }
};

// Filter, Search, and UI State
let currentFilter = 'all'; // 'all', 'pending', 'completed', 'projects'
let searchQuery = '';
let expandedWeeks = new Set(['m1-w1']); // Default expand first week
let autoSyncTimer = null;
let toastTimeout = null;

// ==========================================================================
// State Initialization & Migration
// ==========================================================================
function loadState() {
  try {
    // 1. Load active user preference for this device
    const savedActiveUser = localStorage.getItem(ACTIVE_USER_KEY);
    if (savedActiveUser) {
      appData.activeUserId = savedActiveUser;
      appData.viewingUserId = savedActiveUser;
    }

    // 2. Load cloud configuration
    const savedCloud = localStorage.getItem(CLOUD_CONFIG_KEY);
    if (savedCloud) {
      appData.cloudConfig = { ...appData.cloudConfig, ...JSON.parse(savedCloud) };
    }

    // 3. Load multi-user data
    const savedMulti = localStorage.getItem(STORAGE_KEY_MULTI);
    if (savedMulti) {
      const parsed = JSON.parse(savedMulti);
      if (parsed.users) {
        // Merge users while preserving structure
        for (const uid in parsed.users) {
          appData.users[uid] = {
            ...createDefaultUser(uid, parsed.users[uid].name || uid, parsed.users[uid].nameAr || uid, parsed.users[uid].avatar || '⚡', parsed.users[uid].color || '#3b82f6', parsed.users[uid].role),
            ...parsed.users[uid]
          };
        }
      }
    } else {
      // Check legacy single-user data and migrate to Osama
      const legacyData = localStorage.getItem(LEGACY_STORAGE_KEY);
      if (legacyData) {
        try {
          const parsedLegacy = JSON.parse(legacyData);
          appData.users['osama'] = {
            ...appData.users['osama'],
            tasks: parsedLegacy.tasks || {},
            projects: parsedLegacy.projects || {},
            notes: parsedLegacy.notes || {},
            career: parsedLegacy.career || {},
            studySessions: parsedLegacy.studySessions || 0,
            streakDays: parsedLegacy.streakDays || 1,
            lastActiveDate: parsedLegacy.lastActiveDate || new Date().toISOString().split('T')[0]
          };
        } catch (e) {
          console.warn("Could not migrate legacy state:", e);
        }
      }
      saveState();
    }

    // 4. Streak Calculation for current active user
    const currentUser = getActiveUser();
    if (currentUser) {
      const today = new Date().toISOString().split('T')[0];
      if (currentUser.lastActiveDate) {
        const lastDate = new Date(currentUser.lastActiveDate);
        const currDate = new Date(today);
        const diffDays = Math.floor((currDate - lastDate) / (1000 * 60 * 60 * 24));
        if (diffDays === 1) {
          currentUser.streakDays = (currentUser.streakDays || 1) + 1;
        } else if (diffDays > 1) {
          currentUser.streakDays = 1;
        }
      }
      currentUser.lastActiveDate = today;
      saveState();
    }

  } catch (e) {
    console.error("Error loading application state:", e);
  }
}

function saveState() {
  try {
    localStorage.setItem(STORAGE_KEY_MULTI, JSON.stringify({
      users: appData.users
    }));
    localStorage.setItem(ACTIVE_USER_KEY, appData.activeUserId);
    localStorage.setItem(CLOUD_CONFIG_KEY, JSON.stringify(appData.cloudConfig));
  } catch (e) {
    console.error("Error saving state:", e);
  }
}

// Helpers to get current active / viewing user objects
function getActiveUser() {
  return appData.users[appData.activeUserId] || appData.users['osama'];
}

function getViewingUser() {
  return appData.users[appData.viewingUserId] || getActiveUser();
}

function isReadOnly() {
  return appData.activeUserId !== appData.viewingUserId;
}

// ==========================================================================
// DOM Ready & Startup
// ==========================================================================
document.addEventListener('DOMContentLoaded', () => {
  loadState();
  initThemeAndUI();
  renderHeaderIdentity();
  renderComparisonTable();
  renderMonthNavPills();
  renderChallengeArena();
  renderViewingTabs();
  renderRoadmap();
  renderCareerSection();
  updateAnalytics();
  initPomodoroTimer();
  initConfetti();
  initAutoSync();

  // Try initial silent sync if configured
  if (appData.cloudConfig.firebaseUrl || window.location.protocol.startsWith('http')) {
    syncNow(true);
  }
});

// UI Event Listeners
function initThemeAndUI() {
  // Search input
  const searchInput = document.getElementById('search-input');
  if (searchInput) {
    searchInput.addEventListener('input', (e) => {
      searchQuery = e.target.value.toLowerCase().trim();
      renderRoadmap();
    });
  }

  // Filter Buttons
  const filterBtns = document.querySelectorAll('.filter-btn');
  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      filterBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      currentFilter = btn.dataset.filter;
      renderRoadmap();
    });
  });

  // Action Buttons
  document.getElementById('btn-export-menu')?.addEventListener('click', openExportModalOrDirect);
  document.getElementById('btn-import-trigger')?.addEventListener('click', () => document.getElementById('file-import')?.click());
  document.getElementById('file-import')?.addEventListener('change', importAllData);
  document.getElementById('btn-reset')?.addEventListener('click', promptReset);
  document.getElementById('btn-print')?.addEventListener('click', () => window.print());
  document.getElementById('btn-pomodoro-toggle')?.addEventListener('click', openPomodoroModal);
  document.getElementById('btn-open-sync-modal')?.addEventListener('click', openCloudSyncModal);
  document.getElementById('btn-mobile-guide')?.addEventListener('click', () => openModal('mobile-guide-modal'));

  // Avatar & Color pickers in Add Friend Modal
  document.querySelectorAll('#avatar-picker-grid .emoji-option').forEach(el => {
    el.addEventListener('click', function() {
      document.querySelectorAll('#avatar-picker-grid .emoji-option').forEach(o => o.classList.remove('selected'));
      this.classList.add('selected');
      document.getElementById('friend-emoji-input').value = this.dataset.emoji;
    });
  });

  document.querySelectorAll('#color-picker-grid .color-option').forEach(el => {
    el.addEventListener('click', function() {
      document.querySelectorAll('#color-picker-grid .color-option').forEach(o => o.classList.remove('selected'));
      this.classList.add('selected');
      document.getElementById('friend-color-input').value = this.dataset.color;
    });
  });
}

// ==========================================================================
// User Identity & Switcher System
// ==========================================================================
function renderHeaderIdentity() {
  const activeUser = getActiveUser();
  const viewingUser = getViewingUser();
  const readOnly = isReadOnly();

  // Header user info
  const nameEl = document.getElementById('header-user-name');
  const avatarEl = document.getElementById('header-user-avatar');
  if (nameEl) nameEl.textContent = activeUser.nameAr || activeUser.name;
  if (avatarEl) {
    avatarEl.textContent = activeUser.avatar || '👤';
    avatarEl.style.background = activeUser.color || 'var(--gradient-ai)';
  }

  // Header mode pill
  const pillEl = document.getElementById('header-mode-pill');
  if (pillEl) {
    if (readOnly) {
      pillEl.className = 'mode-pill readonly';
      pillEl.innerHTML = `🔒 وضع المشاهدة (${viewingUser.nameAr})`;
    } else {
      pillEl.className = 'mode-pill edit';
      pillEl.innerHTML = `🟢 وضع التحرير النشط (${activeUser.nameAr})`;
    }
  }

  // Sticky Read-Only Banner
  const readonlyBanner = document.getElementById('readonly-banner');
  const readonlyUserTitle = document.getElementById('readonly-user-title');
  const backToMyName = document.getElementById('back-to-my-name');
  if (readonlyBanner) {
    if (readOnly) {
      readonlyBanner.style.display = 'flex';
      if (readonlyUserTitle) readonlyUserTitle.textContent = viewingUser.nameAr;
      if (backToMyName) backToMyName.textContent = activeUser.nameAr;
    } else {
      readonlyBanner.style.display = 'none';
    }
  }

  // Peer export name
  const peerExportName = document.getElementById('peer-export-name');
  if (peerExportName) peerExportName.textContent = activeUser.nameAr;
}

// Switch who is using this device (Active User)
function switchActiveUser(userId) {
  if (!appData.users[userId]) return;
  appData.activeUserId = userId;
  appData.viewingUserId = userId;
  saveState();

  renderHeaderIdentity();
  renderChallengeArena();
  renderViewingTabs();
  renderRoadmap();
  renderCareerSection();
  updateAnalytics();

  closeModal('switch-user-modal');
  showToast(`👤 مرحباً بك! أنت الآن مسجل كـ ${appData.users[userId].nameAr}. كل التعديلات ستسجل باسمك.`, '👑');
  playTickTone();
}

// Switch who we are inspecting on screen (Viewing User)
function switchViewingUser(userId) {
  if (!appData.users[userId]) return;
  appData.viewingUserId = userId;

  renderHeaderIdentity();
  renderChallengeArena();
  renderViewingTabs();
  renderRoadmap();
  renderCareerSection();
  updateAnalytics();

  const target = appData.users[userId];
  if (isReadOnly()) {
    showToast(`🔒 وضع المشاهدة: تتصفح حالياً إنجازات ${target.nameAr}. (غير قابل للتعديل)`, '👀');
  } else {
    showToast(`🟢 أنت في ملفك الخاص (${target.nameAr}). يمكنك تسجيل وتعديل مهامك!`, '✏️');
  }
  playTickTone();
}

function switchToMyProfile() {
  switchViewingUser(appData.activeUserId);
}

// Modal for switching active user
function openSwitchUserModal() {
  const container = document.getElementById('switch-user-list');
  if (!container) return;

  container.innerHTML = Object.values(appData.users).map(u => {
    const isCurrent = u.id === appData.activeUserId;
    return `
      <div class="glass-card" style="padding:12px 16px; display:flex; justify-content:space-between; align-items:center; cursor:pointer; border-color:${isCurrent ? 'var(--accent-blue)' : 'var(--border-color)'}; background:${isCurrent ? 'rgba(59, 130, 246, 0.15)' : 'rgba(255, 255, 255, 0.03)'};" onclick="switchActiveUser('${u.id}')">
        <div style="display:flex; align-items:center; gap:12px;">
          <div class="user-avatar-circle" style="background:${u.color};">${u.avatar}</div>
          <div>
            <div style="font-weight:700; color:#fff;">${u.nameAr} (${u.name})</div>
            <div style="font-size:11.5px; color:var(--text-muted);">${u.role}</div>
          </div>
        </div>
        <div>
          ${isCurrent ? `<span class="badge-you" style="padding:4px 10px; border-radius:999px; font-size:11.5px;">أنت الحالي ✅</span>` : `<button class="btn btn-sm">اختر هذا الحساب</button>`}
        </div>
      </div>
    `;
  }).join('');

  openModal('switch-user-modal');
}

// Render Viewing Tabs
function renderViewingTabs() {
  const container = document.getElementById('viewing-tabs-list');
  const noteEl = document.getElementById('viewing-mode-note');
  if (!container) return;

  container.innerHTML = Object.values(appData.users).map(u => {
    const isViewing = u.id === appData.viewingUserId;
    const isSelf = u.id === appData.activeUserId;
    return `
      <button class="btn btn-sm ${isViewing ? 'btn-primary' : ''}" onclick="switchViewingUser('${u.id}')" style="display:inline-flex; align-items:center; gap:6px;">
        <span>${u.avatar}</span>
        <span>${u.nameAr}</span>
        ${isSelf ? '<span style="font-size:10px; opacity:0.8;">(ملفي)</span>' : '<span style="font-size:10px; opacity:0.8;">(مشاهدة 🔒)</span>'}
        ${isViewing ? '<span>📍</span>' : ''}
      </button>
    `;
  }).join('');

  if (noteEl) {
    if (isReadOnly()) {
      noteEl.innerHTML = `<span style="color:var(--accent-amber);">🔒 وضع المشاهدة فقط لـ ${getViewingUser().nameAr}</span>`;
    } else {
      noteEl.innerHTML = `<span style="color:var(--accent-emerald);">🟢 وضع التعديل متاح لـ ${getActiveUser().nameAr}</span>`;
    }
  }
}

// ==========================================================================
// Accountability Hub & Challenge Arena
// ==========================================================================
function renderChallengeArena() {
  const container = document.getElementById('players-grid');
  if (!container) return;

  const usersList = Object.values(appData.users);

  // 1. Calculate stats for each user
  const userStats = usersList.map(u => {
    let completedTasks = 0;
    let completedProjects = 0;
    let completedHours = 0;

    ROADMAP_DATA.months.forEach(m => {
      m.weeks.forEach(w => {
        w.tasks.forEach(t => {
          if (u.tasks && u.tasks[t.id]) {
            completedTasks++;
            completedHours += (parseInt(t.estTime) || 3);
          }
        });
      });
      if (u.projects && u.projects[m.project.id]?.completed) {
        completedProjects++;
      }
    });

    const totalTasks = 80;
    const pct = Math.round((completedTasks / totalTasks) * 100);

    return {
      user: u,
      completedTasks,
      completedProjects,
      completedHours,
      pct
    };
  });

  // 2. Head to Head calculation (Osama vs Morshid or top 2)
  const u1 = userStats.find(s => s.user.id === 'osama') || userStats[0];
  const u2 = userStats.find(s => s.user.id === 'morshid') || userStats[1];

  const h2hMsg = document.getElementById('h2h-message');
  const h2hBar1 = document.getElementById('h2h-bar-user1');
  const h2hBar2 = document.getElementById('h2h-bar-user2');

  if (u1 && u2 && h2hMsg) {
    const diff = u1.completedTasks - u2.completedTasks;
    if (diff > 0) {
      h2hMsg.innerHTML = `<span>🔥 <strong>${u1.user.nameAr}</strong> متقدم بـ <strong>${diff}</strong> مهمة (${u1.pct}%)! شد حيلك يا <strong>${u2.user.nameAr}</strong> المنافسة مولعة! 🚀</span>`;
    } else if (diff < 0) {
      h2hMsg.innerHTML = `<span>⚡ <strong>${u2.user.nameAr}</strong> انتزع الصدارة بفارق <strong>${Math.abs(diff)}</strong> مهمة (${u2.pct}%)! يلا يا <strong>${u1.user.nameAr}</strong> ارجع للصدارة! 💪</span>`;
    } else {
      h2hMsg.innerHTML = `<span>🚀 <strong>${u1.user.nameAr}</strong> و <strong>${u2.user.nameAr}</strong> متعادلان تماماً برصيد <strong>${u1.completedTasks}</strong> مهمة (${u1.pct}%)! مين هيحسم المهمة الجاية؟ 🏆</span>`;
    }

    if (h2hBar1 && h2hBar2) {
      const sum = (u1.completedTasks + u2.completedTasks) || 2;
      const pct1 = Math.max(10, Math.min(90, Math.round((u1.completedTasks / sum) * 100)));
      h2hBar1.style.width = `${pct1}%`;
      h2hBar1.style.background = u1.user.color || '#3b82f6';
      h2hBar2.style.width = `${100 - pct1}%`;
      h2hBar2.style.background = u2.user.color || '#10b981';
    }
  }

  // 3. Render Cards
  container.innerHTML = userStats.map(stat => {
    const u = stat.user;
    const isCurrentActive = u.id === appData.activeUserId;
    const isCurrentlyViewing = u.id === appData.viewingUserId;

    return `
      <div class="player-card ${isCurrentActive ? 'active-user' : ''} ${isCurrentlyViewing ? 'viewing-target' : ''}" style="border-top: 3px solid ${u.color};">
        <div>
          <div class="player-card-top">
            <div class="player-identity">
              <div class="player-avatar" style="background:${u.color};">
                ${u.avatar}
              </div>
              <div>
                <div class="player-name">${u.nameAr} <span style="font-size:12px; font-weight:normal; color:var(--text-dim);">(${u.name})</span></div>
                <div class="player-role">${u.role}</div>
              </div>
            </div>

            <div>
              ${isCurrentActive ? `<span class="player-status-badge badge-you">أنت 👤</span>` : ''}
              ${isCurrentlyViewing ? `<span class="player-status-badge badge-viewing">معروض 📍</span>` : ''}
            </div>
          </div>

          <!-- Progress Bar -->
          <div class="player-progress-container">
            <div class="player-pct-header">
              <span class="player-pct-number" style="color:${u.color};">${stat.pct}%</span>
              <span style="font-size:11.5px; color:var(--text-muted);">${stat.completedTasks} من 80 مهمة</span>
            </div>
            <div class="player-progress-track">
              <div class="player-progress-bar" style="width:${stat.pct}%; background:${u.color};"></div>
            </div>
          </div>

          <!-- Stats Chips -->
          <div class="player-stats-chips">
            <div class="stat-chip">
              <span class="stat-chip-label">المشاريع المنجزة:</span>
              <span class="stat-chip-val">🏆 ${stat.completedProjects} / 5</span>
            </div>
            <div class="stat-chip">
              <span class="stat-chip-label">ساعات المذاكرة:</span>
              <span class="stat-chip-val">⏱️ ${stat.completedHours} ساعة</span>
            </div>
            <div class="stat-chip">
              <span class="stat-chip-label">أيام الالتزام:</span>
              <span class="stat-chip-val">🔥 ${u.streakDays || 1} أيام</span>
            </div>
            <div class="stat-chip">
              <span class="stat-chip-label">تشجيعات الأصحاب:</span>
              <span class="stat-chip-val">👏 ${u.cheers || 0}</span>
            </div>
          </div>
        </div>

        <!-- Action Buttons -->
        <div class="player-card-actions">
          <button class="btn-view-profile ${isCurrentlyViewing ? 'is-viewing' : ''}" onclick="switchViewingUser('${u.id}')">
            <span>${isCurrentlyViewing ? 'أنت تتصفحه حالياً 📍' : 'تصفح خارطة طريقه 👁️'}</span>
          </button>
          <button class="btn-cheer" onclick="sendCheer('${u.id}')" title="أرسل له تشجيعاً وتحية">
            <span>👏 شجعه!</span>
          </button>
        </div>
      </div>
    `;
  }).join('');
}

// Send Cheer (+1)
function sendCheer(userId) {
  const targetUser = appData.users[userId];
  const senderUser = getActiveUser();
  if (!targetUser) return;

  targetUser.cheers = (targetUser.cheers || 0) + 1;
  saveState();
  triggerDebouncedCloudSync();
  renderChallengeArena();

  triggerConfetti();
  playSuccessChord();

  if (targetUser.id === senderUser.id) {
    showToast(`👏 شجعت نفسك! عاش يا ${targetUser.nameAr}، كمل بقوة! 🚀`, '🔥');
  } else {
    showToast(`👏 أرسل ${senderUser.nameAr} تشجيعاً نارياً لـ ${targetUser.nameAr}! عاش يا وحش 💪`, '🎉');
  }
}

// Add New Friend Handler
function openAddFriendModal() {
  openModal('add-friend-modal');
}

function handleAddFriendSubmit(event) {
  event.preventDefault();
  const name = document.getElementById('friend-name-input').value.trim();
  const role = document.getElementById('friend-role-input').value.trim();
  const avatar = document.getElementById('friend-emoji-input').value || '⚡';
  const color = document.getElementById('friend-color-input').value || '#3b82f6';

  if (!name) return;

  // Generate unique ID
  const cleanId = name.toLowerCase().replace(/[^a-z0-9]/g, '') || ('friend_' + Date.now().toString(36));
  const uniqueId = appData.users[cleanId] ? (cleanId + '_' + Math.floor(Math.random() * 100)) : cleanId;

  appData.users[uniqueId] = createDefaultUser(uniqueId, name, name, avatar, color, role);
  saveState();
  triggerDebouncedCloudSync();

  closeModal('add-friend-modal');
  document.getElementById('add-friend-form').reset();

  renderHeaderIdentity();
  renderChallengeArena();
  renderViewingTabs();
  triggerConfetti();
  playSuccessChord();
  showToast(`🎉 تم إضافة ${name} إلى التحدي بنجاح! نورت الرحلة 🚀`, '🤝');
}

// ==========================================================================
// Roadmap Rendering & Tasks Management (With Read-Only Security)
// ==========================================================================
function renderRoadmap() {
  const container = document.getElementById('roadmap-content');
  if (!container) return;

  const viewingUser = getViewingUser();
  const readOnly = isReadOnly();
  let html = '';

  ROADMAP_DATA.months.forEach(month => {
    // Check if month matches filter/search
    const filteredWeeks = month.weeks.filter(week => {
      const matchSearch = !searchQuery || 
        week.title.toLowerCase().includes(searchQuery) ||
        week.titleAr.toLowerCase().includes(searchQuery) ||
        week.tasks.some(t => t.text.toLowerCase().includes(searchQuery)) ||
        week.primarySource.title.toLowerCase().includes(searchQuery);

      if (!matchSearch) return false;

      const allTasksDone = week.tasks.every(t => !!(viewingUser.tasks && viewingUser.tasks[t.id]));
      if (currentFilter === 'pending') return !allTasksDone;
      if (currentFilter === 'completed') return allTasksDone;
      if (currentFilter === 'projects') return false; // Handled in project view

      return true;
    });

    const isProjectVisible = currentFilter === 'all' || currentFilter === 'projects' || 
      (currentFilter === 'pending' && !(viewingUser.projects && viewingUser.projects[month.project.id]?.completed)) ||
      (currentFilter === 'completed' && viewingUser.projects && viewingUser.projects[month.project.id]?.completed);

    if (filteredWeeks.length === 0 && !isProjectVisible) return;

    html += `
      <section class="month-section" id="${month.id}">
        <div class="month-section-header">
          <div class="month-title-group">
            <h2>
              <span class="month-badge" style="background: ${month.themeColor};">الشهر ${month.number}</span>
              ${month.titleAr}
            </h2>
            <p>${month.descriptionAr} (${month.description})</p>
          </div>
          <div style="font-size:13px; font-weight:700; color:var(--text-muted);">
            معدل الساعات: 15 - 20 ساعة أسبوعياً
          </div>
        </div>

        <div class="weeks-list">
          ${filteredWeeks.map(week => renderWeekCard(week, month, viewingUser, readOnly)).join('')}
        </div>

        ${isProjectVisible ? renderProjectCard(month.project, month, viewingUser, readOnly) : ''}
      </section>
    `;
  });

  if (!html) {
    container.innerHTML = `
      <div style="text-align: center; padding: 60px 20px; color: var(--text-muted);">
        <div style="font-size: 40px; margin-bottom: 12px;">🔍</div>
        <h3>لا توجد نتائج مطابقة لبحثك أو الفلتر المحدد</h3>
        <p style="font-size: 13px; margin-top: 6px;">جرب تغيير كلمة البحث أو الضغط على "عرض الكل".</p>
      </div>
    `;
  } else {
    container.innerHTML = html;
  }
}

// Render Single Week Card
function renderWeekCard(week, month, viewingUser, readOnly) {
  const tasksTotal = week.tasks.length;
  const tasksDone = week.tasks.filter(t => !!(viewingUser.tasks && viewingUser.tasks[t.id])).length;
  const isWeekDone = tasksTotal > 0 && tasksDone === tasksTotal;
  const weekProgressPct = Math.round((tasksDone / tasksTotal) * 100);
  const weekNotes = (viewingUser.notes && viewingUser.notes[week.id]) || '';
  const isExpanded = expandedWeeks.has(week.id);

  return `
    <div class="week-card ${isWeekDone ? 'completed' : ''} ${isExpanded ? 'expanded' : ''}" id="card-${week.id}">
      <div class="week-header" onclick="toggleWeekAccordion('${week.id}')">
        <div class="week-header-left">
          <div class="week-status-dot ${isWeekDone ? 'done' : (tasksDone > 0 ? 'active' : '')}"></div>
          <div class="week-meta-info">
            <span class="week-number-label">الأسبوع ${week.weekNumber} • الشهر ${month.number}</span>
            <div class="week-title">${week.titleAr} <span style="font-size:12px; font-weight:normal; color:var(--text-dim);">(${week.title})</span></div>
          </div>
        </div>
        <div class="week-header-right">
          <span class="week-progress-pill">${tasksDone} / ${tasksTotal} مهام (${weekProgressPct}%)</span>
          <span class="week-chevron">▼</span>
        </div>
      </div>

      <div class="week-body">
        <!-- Sources -->
        <div class="sources-grid">
          <div class="source-card primary-source">
            <div>
              <div class="source-header">
                <span>📗 المصدر الأساسي (Primary)</span>
              </div>
              <div class="source-title" style="margin-top:6px;">${week.primarySource.titleAr}</div>
              <div class="source-guide" style="margin-top:4px;">${week.primarySource.guide}</div>
            </div>
            ${week.primarySource.url && week.primarySource.url !== '#' ? `
              <a href="${week.primarySource.url}" target="_blank" rel="noopener noreferrer" class="source-link-btn">
                <span>🔗 فتح المصدر</span>
              </a>
            ` : `<span style="font-size:11px; color:var(--text-dim); margin-top:6px;">موجود بمحاضرات الكورس المسجلة</span>`}
          </div>

          <div class="source-card backup-source">
            <div>
              <div class="source-header">
                <span>📙 المصدر البديل (Backup)</span>
              </div>
              <div class="source-title" style="margin-top:6px;">${week.backupSource.titleAr}</div>
              <div class="source-guide" style="margin-top:4px;">${week.backupSource.guide}</div>
            </div>
            ${week.backupSource.url && week.backupSource.url !== '#' ? `
              <a href="${week.backupSource.url}" target="_blank" rel="noopener noreferrer" class="source-link-btn">
                <span>🔗 فتح البديل</span>
              </a>
            ` : `<span style="font-size:11px; color:var(--text-dim); margin-top:6px;">راجع المصادر المرفقة</span>`}
          </div>
        </div>

        <!-- Daily Tasks Checklist -->
        <div class="tasks-container">
          <div class="section-label">
            <span>✅ مهام الأسبوع التفصيلية:</span>
            ${readOnly ? `<span class="lock-pill">🔒 وضع المشاهدة فقط (لـ ${viewingUser.nameAr})</span>` : ''}
          </div>
          ${week.tasks.map(task => {
            const checked = !!(viewingUser.tasks && viewingUser.tasks[task.id]);
            return `
              <div class="task-item ${checked ? 'done' : ''} ${readOnly ? 'locked-view' : ''}" onclick="toggleTask('${task.id}', event)">
                <input type="checkbox" class="task-checkbox" ${checked ? 'checked' : ''} ${readOnly ? 'disabled' : ''} onclick="event.stopPropagation(); toggleTask('${task.id}', event)">
                <div class="task-text-group">
                  <span class="task-title">${task.text}</span>
                  <span class="task-time-badge">⏱️ ${task.estTime}</span>
                </div>
              </div>
            `;
          }).join('')}
        </div>

        <!-- Action Item -->
        <div class="action-item-banner">
          <span style="font-size:18px;">🎯</span>
          <div>
            <strong>التطبيق العملي الإلزامي هذا الأسبوع:</strong>
            <p style="margin-top:2px;">${week.actionItem}</p>
          </div>
        </div>

        <!-- Notes / Repo link -->
        <div class="week-notes-wrapper">
          <div class="section-label" style="margin-bottom:6px;">
            <span>📝 ملاحظات وروابط كود ${viewingUser.nameAr}:</span>
            ${readOnly ? `<span class="lock-pill">🔒 غير قابلة للتعديل</span>` : ''}
          </div>
          <textarea class="notes-textarea" placeholder="${readOnly ? 'لا توجد ملاحظات مدونة من الصديق لهذا الأسبوع...' : 'اكتب هنا ملاحظاتك، أسئلتك، أو رابط المستودع على GitHub...'}" ${readOnly ? 'readonly' : ''} oninput="saveWeekNotes('${week.id}', this.value)">${weekNotes}</textarea>
        </div>
      </div>
    </div>
  `;
}

// Render Milestone Project Card
function renderProjectCard(proj, month, viewingUser, readOnly) {
  const pData = (viewingUser.projects && viewingUser.projects[proj.id]) || { completed: false, githubUrl: '', demoUrl: '', notes: '' };

  return `
    <div class="project-card ${pData.completed ? 'completed' : ''}" id="proj-${proj.id}">
      <div class="project-badge-top">
        <span>🏆 مشروع التخرج العملي للشهر ${proj.monthNumber}</span>
      </div>
      <h3 class="project-title">${proj.titleAr}</h3>
      <p class="project-objective">${proj.objectiveAr}</p>

      <div class="done-when-list">
        <div style="font-weight:700; color:var(--accent-amber); margin-bottom:8px; font-size:13px;">
          معايير قبول المشروع وتسليمه (Done When):
        </div>
        ${proj.doneWhen.map(item => `
          <div class="done-when-item">
            <span>✨</span>
            <span>${item}</span>
          </div>
        `).join('')}
      </div>

      <div class="project-inputs-grid">
        <div class="project-input-group">
          <label>رابط كود المشروع على GitHub:</label>
          <input type="text" class="project-input" placeholder="https://github.com/..." value="${pData.githubUrl || ''}" ${readOnly ? 'readonly' : ''} onchange="saveProjectField('${proj.id}', 'githubUrl', this.value)">
        </div>
        <div class="project-input-group">
          <label>رابط المعاينة المباشرة (Demo / HuggingFace Spaces):</label>
          <input type="text" class="project-input" placeholder="https://huggingface.co/spaces/..." value="${pData.demoUrl || ''}" ${readOnly ? 'readonly' : ''} onchange="saveProjectField('${proj.id}', 'demoUrl', this.value)">
        </div>
      </div>

      <button class="project-toggle-btn" ${readOnly ? 'disabled style="opacity:0.8; cursor:not-allowed;"' : ''} onclick="toggleProjectCompleted('${proj.id}')">
        <span>${pData.completed ? `🎉 أنجز ${viewingUser.nameAr} هذا المشروع بنجاح!` : (readOnly ? `⏳ لم يكتمل بعد بواسطة ${viewingUser.nameAr}` : 'اعتماد إنجاز مشروع الشهر ' + proj.monthNumber)}</span>
      </button>
    </div>
  `;
}

// ==========================================================================
// Task & Action Handlers (With Read-Only Interception)
// ==========================================================================
function toggleTask(taskId, event) {
  if (isReadOnly()) {
    const viewingUser = getViewingUser();
    showToast(`🔒 وضع المشاهدة فقط! لا يمكنك تعديل مهام ${viewingUser.nameAr}. كل واحد يعدل على جهازه فقط.`, '🔒');
    playLockedTone();
    return;
  }

  const activeUser = getActiveUser();
  if (!activeUser.tasks) activeUser.tasks = {};
  activeUser.tasks[taskId] = !activeUser.tasks[taskId];
  saveState();
  triggerDebouncedCloudSync();

  updateAnalytics();
  renderRoadmap();
  renderChallengeArena();
  playTickTone();

  checkMilestoneCelebration();
}

function toggleWeekAccordion(weekId) {
  if (expandedWeeks.has(weekId)) {
    expandedWeeks.delete(weekId);
  } else {
    expandedWeeks.add(weekId);
  }
  const card = document.getElementById(`card-${weekId}`);
  if (card) {
    card.classList.toggle('expanded');
  }
}

function saveWeekNotes(weekId, text) {
  if (isReadOnly()) return;
  const activeUser = getActiveUser();
  if (!activeUser.notes) activeUser.notes = {};
  activeUser.notes[weekId] = text;
  saveState();
  triggerDebouncedCloudSync();
}

function toggleProjectCompleted(projId) {
  if (isReadOnly()) {
    showToast(`🔒 وضع المشاهدة فقط! لا يمكنك اعتماد مشاريع الأصدقاء.`, '🔒');
    playLockedTone();
    return;
  }

  const activeUser = getActiveUser();
  if (!activeUser.projects) activeUser.projects = {};
  if (!activeUser.projects[projId]) {
    activeUser.projects[projId] = { completed: false, githubUrl: '', demoUrl: '', notes: '' };
  }
  activeUser.projects[projId].completed = !activeUser.projects[projId].completed;
  saveState();
  triggerDebouncedCloudSync();

  updateAnalytics();
  renderRoadmap();
  renderChallengeArena();

  if (activeUser.projects[projId].completed) {
    triggerConfetti();
    playSuccessChord();
    showToast(`🎉 مبروك! تم اعتماد مشروع التخرج بنجاح!`, '🏆');
  }
}

function saveProjectField(projId, field, val) {
  if (isReadOnly()) return;
  const activeUser = getActiveUser();
  if (!activeUser.projects) activeUser.projects = {};
  if (!activeUser.projects[projId]) {
    activeUser.projects[projId] = { completed: false, githubUrl: '', demoUrl: '', notes: '' };
  }
  activeUser.projects[projId][field] = val;
  saveState();
  triggerDebouncedCloudSync();
}

// Render Career Section
function renderCareerSection() {
  const container = document.getElementById('career-checklist-container');
  if (!container) return;
  const viewingUser = getViewingUser();
  const readOnly = isReadOnly();

  container.innerHTML = ROADMAP_DATA.careerAdvices.map(item => {
    const isChecked = !!(viewingUser.career && viewingUser.career[item.id]);
    return `
      <div class="career-card ${isChecked ? 'done' : ''} ${readOnly ? 'locked-view' : ''}" onclick="toggleCareerItem('${item.id}')">
        <div class="career-icon">${isChecked ? '✅' : '💼'}</div>
        <div class="career-content">
          <h4>${item.titleAr}</h4>
          <p>${item.textAr}</p>
        </div>
      </div>
    `;
  }).join('');
}

function toggleCareerItem(itemId) {
  if (isReadOnly()) {
    showToast(`🔒 وضع المشاهدة فقط!`, '🔒');
    playLockedTone();
    return;
  }
  const activeUser = getActiveUser();
  if (!activeUser.career) activeUser.career = {};
  activeUser.career[itemId] = !activeUser.career[itemId];
  saveState();
  triggerDebouncedCloudSync();
  renderCareerSection();
  playTickTone();
}

// ==========================================================================
// Top Analytics & Metrics
// ==========================================================================
function updateAnalytics() {
  const viewingUser = getViewingUser();
  const readOnly = isReadOnly();

  // Gauge title & avatar
  const gaugeTitle = document.getElementById('gauge-profile-title');
  const gaugeAvatar = document.getElementById('gauge-profile-avatar');
  if (gaugeTitle) {
    gaugeTitle.textContent = readOnly ? `إنجاز ${viewingUser.nameAr} (مشاهدة 🔒)` : `إنجازك الحالي يا ${viewingUser.nameAr}`;
  }
  if (gaugeAvatar) {
    gaugeAvatar.textContent = viewingUser.avatar || '👑';
  }

  let totalTasks = 0;
  let completedTasks = 0;
  let totalEstHours = 0;
  let completedEstHours = 0;
  let nextUpTask = null;

  ROADMAP_DATA.months.forEach(month => {
    let monthTasks = 0;
    let monthDone = 0;

    month.weeks.forEach(week => {
      week.tasks.forEach(t => {
        totalTasks++;
        const hrs = parseInt(t.estTime) || 3;
        totalEstHours += hrs;

        if (viewingUser.tasks && viewingUser.tasks[t.id]) {
          completedTasks++;
          completedEstHours += hrs;
          monthDone++;
        } else if (!nextUpTask) {
          nextUpTask = {
            task: t,
            week: week,
            month: month
          };
        }
        monthTasks++;
      });
    });

    // Update Month Nav Pill Progress
    const monthPct = monthTasks > 0 ? Math.round((monthDone / monthTasks) * 100) : 0;
    const pillPctEl = document.getElementById(`pct-${month.id}`);
    const pillBarEl = document.getElementById(`bar-${month.id}`);
    if (pillPctEl) pillPctEl.textContent = `${monthPct}%`;
    if (pillBarEl) pillBarEl.style.width = `${monthPct}%`;
  });

  // Calculate Overall Progress
  const overallPct = totalTasks > 0 ? Math.round((completedTasks / totalTasks) * 100) : 0;
  const remainingHours = totalEstHours - completedEstHours;

  // Projects Count
  let completedProjectsCount = 0;
  ROADMAP_DATA.months.forEach(m => {
    if (viewingUser.projects && viewingUser.projects[m.project.id]?.completed) {
      completedProjectsCount++;
    }
  });

  // Circular Gauge Update
  const gaugeCircle = document.getElementById('gauge-circle');
  const gaugeText = document.getElementById('gauge-text');
  if (gaugeCircle && gaugeText) {
    const circumference = 565; // 2 * PI * 90
    const offset = circumference - (overallPct / 100) * circumference;
    gaugeCircle.style.strokeDashoffset = offset;
    gaugeText.textContent = `${overallPct}%`;
  }

  // Stats Text Update
  document.getElementById('stat-completed-tasks').textContent = `${completedTasks} / ${totalTasks}`;
  document.getElementById('stat-tasks-pct').textContent = `${overallPct}% منجز`;

  document.getElementById('stat-projects-count').textContent = `${completedProjectsCount} / 5`;
  document.getElementById('stat-projects-sub').textContent = `${5 - completedProjectsCount} متبقية للتخرج`;

  document.getElementById('stat-hours-completed').textContent = `${completedEstHours} ساعة`;
  document.getElementById('stat-hours-remaining').textContent = `${remainingHours} ساعة مذاكرة متبقية`;

  // Streak & Study Sessions
  document.getElementById('stat-streak').textContent = `${viewingUser.streakDays || 1} أيام 🔥`;
  document.getElementById('stat-sessions').textContent = `${viewingUser.studySessions || 0} جلسة تركيز`;

  // Next Up Banner
  const nextUpBanner = document.getElementById('next-up-container');
  if (nextUpBanner) {
    if (nextUpTask) {
      nextUpBanner.innerHTML = `
        <div class="next-up-info">
          <span class="next-up-badge">${readOnly ? `الخطوة التالية لـ ${viewingUser.nameAr}` : 'خطوتك التالية'}</span>
          <div>
            <div class="next-up-text">${nextUpTask.task.text}</div>
            <div class="next-up-sub">الشهر ${nextUpTask.month.number} • الأسبوع ${nextUpTask.week.weekNumber}: ${nextUpTask.week.titleAr}</div>
          </div>
        </div>
        <button class="btn btn-primary btn-sm" onclick="scrollToWeek('${nextUpTask.week.id}')">
          <span>اذهب إليها الآن 🚀</span>
        </button>
      `;
    } else {
      nextUpBanner.innerHTML = `
        <div class="next-up-info">
          <span class="next-up-badge" style="background:var(--accent-emerald);">ألف مبروك!</span>
          <div>
            <div class="next-up-text">أتم ${viewingUser.nameAr} جميع مهام الرود ماب 100%! 🎉</div>
            <div class="next-up-sub">جاهز تماماً لسوق العمل والـ Freelance في الـ GenAI و Agentic AI.</div>
          </div>
        </div>
      `;
    }
  }
}

function scrollToWeek(weekId) {
  expandedWeeks.add(weekId);
  const card = document.getElementById(`card-${weekId}`);
  if (card) {
    card.scrollIntoView({ behavior: 'smooth', block: 'center' });
    card.classList.add('expanded');
  }
}

function checkMilestoneCelebration() {
  const activeUser = getActiveUser();
  let allDone = true;
  ROADMAP_DATA.months.forEach(m => {
    m.weeks.forEach(w => {
      w.tasks.forEach(t => {
        if (!activeUser.tasks || !activeUser.tasks[t.id]) allDone = false;
      });
    });
  });

  if (allDone) {
    triggerConfetti();
    playSuccessChord();
    showToast(`🏆 مبروك يا ${activeUser.nameAr}! أنهيت خريطة الطريق بالكامل 100%! أنت بطل! 🎉`, '🌟', 7000);
  }
}

// Render Month Pills
function renderMonthNavPills() {
  const container = document.getElementById('months-nav-container');
  if (!container) return;

  container.innerHTML = ROADMAP_DATA.months.map(m => `
    <div class="month-nav-pill" onclick="scrollToMonth('${m.id}')" id="pill-${m.id}">
      <div class="month-pill-header">
        <span class="month-pill-num">الشهر 0${m.number}</span>
        <span class="month-pill-pct" id="pct-${m.id}">0%</span>
      </div>
      <div class="month-pill-title">${m.titleAr.replace(/^الشهر.*?: /, '')}</div>
      <div class="progress-mini">
        <div class="progress-mini-bar" id="bar-${m.id}" style="width: 0%; background: ${m.themeColor};"></div>
      </div>
    </div>
  `).join('');
}

function scrollToMonth(monthId) {
  const el = document.getElementById(monthId);
  if (el) {
    el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    const firstWeek = el.querySelector('.week-card');
    if (firstWeek) {
      const weekId = firstWeek.id.replace('card-', '');
      expandedWeeks.add(weekId);
      firstWeek.classList.add('expanded');
    }
  }
}

// Render Comparison
function renderComparisonTable() {
  const container = document.getElementById('comparison-body');
  if (!container) return;

  container.innerHTML = ROADMAP_DATA.comparison.points.map(pt => `
    <tr>
      <td style="font-weight: 700; color: var(--accent-cyan);">${pt.aspectAr} <br><span style="font-size:11px; color:var(--text-dim);">${pt.aspect}</span></td>
      <td><strong>${pt.genAIAr}</strong><br><span style="font-size:11.5px; color:var(--text-muted);">${pt.genAI}</span></td>
      <td><strong>${pt.agenticAIAr}</strong><br><span style="font-size:11.5px; color:var(--text-muted);">${pt.agenticAI}</span></td>
    </tr>
  `).join('');
}

// ==========================================================================
// Cloud Sync & Realtime Backend Integration
// ==========================================================================
let syncDebounceTimer = null;
function triggerDebouncedCloudSync() {
  clearTimeout(syncDebounceTimer);
  syncDebounceTimer = setTimeout(() => {
    syncNow(true);
  }, 1200);
}

function initAutoSync() {
  if (autoSyncTimer) clearInterval(autoSyncTimer);
  // Auto check for updates every 20 seconds if firebase or server is configured
  autoSyncTimer = setInterval(() => {
    if (appData.cloudConfig.firebaseUrl || appData.cloudConfig.serverUrl || window.location.protocol.startsWith('http')) {
      syncNow(true);
    }
  }, 20000);
}

// Main Sync Function (Firebase or Python Server)
async function syncNow(isSilent = false) {
  const quickBtn = document.getElementById('sync-quick-btn');
  const dot = document.getElementById('sync-indicator-dot');
  const quickText = document.getElementById('sync-quick-text');
  const statusBtn = document.getElementById('btn-open-sync-modal');

  if (quickBtn) quickBtn.classList.add('syncing');
  if (dot) dot.textContent = '⏳';
  if (quickText && !isSilent) quickText.textContent = 'جاري المزامنة...';

  let syncSuccess = false;

  try {
    // 1. Try Firebase Realtime Database if configured
    if (appData.cloudConfig.firebaseUrl) {
      let baseUrl = appData.cloudConfig.firebaseUrl.trim().replace(/\/+$/, '');
      if (!baseUrl.endsWith('.json')) {
        // e.g. https://my-rtdb.firebaseio.com -> https://my-rtdb.firebaseio.com/roadmap
        if (!baseUrl.includes('/roadmap')) baseUrl += '/roadmap';
      }

      const activeUser = getActiveUser();

      // Upload my active user state
      await fetch(`${baseUrl}/users/${appData.activeUserId}.json`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(activeUser)
      });

      // Fetch all users to get friend's latest updates
      const res = await fetch(`${baseUrl}/users.json`);
      if (res.ok) {
        const cloudUsers = await res.json();
        if (cloudUsers && typeof cloudUsers === 'object') {
          for (const uid in cloudUsers) {
            if (cloudUsers[uid]) {
              // If it's another user, update their data
              if (uid !== appData.activeUserId) {
                appData.users[uid] = {
                  ...createDefaultUser(uid, cloudUsers[uid].name || uid, cloudUsers[uid].nameAr || uid, cloudUsers[uid].avatar, cloudUsers[uid].color, cloudUsers[uid].role),
                  ...cloudUsers[uid]
                };
              }
            }
          }
          saveState();
          syncSuccess = true;
        }
      }
    } 
    // 2. Try Python server API (/api/sync)
    else if (window.location.protocol.startsWith('http') || appData.cloudConfig.serverUrl) {
      const serverBase = (appData.cloudConfig.serverUrl || window.location.origin).replace(/\/+$/, '');
      const activeUser = getActiveUser();

      const res = await fetch(`${serverBase}/api/sync`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          userId: appData.activeUserId,
          user: activeUser,
          users: appData.users
        })
      });

      if (res.ok) {
        const result = await res.json();
        if (result.db && result.db.users) {
          for (const uid in result.db.users) {
            if (uid !== appData.activeUserId) {
              appData.users[uid] = {
                ...createDefaultUser(uid, result.db.users[uid].name || uid, result.db.users[uid].nameAr || uid, result.db.users[uid].avatar, result.db.users[uid].color, result.db.users[uid].role),
                ...result.db.users[uid]
              };
            }
          }
          saveState();
          syncSuccess = true;
        }
      }
    }
  } catch (err) {
    console.warn("Sync attempt note:", err);
  } finally {
    if (quickBtn) quickBtn.classList.remove('syncing');

    if (syncSuccess) {
      if (dot) dot.textContent = '🟢';
      if (quickText) quickText.textContent = 'متزامن سحابياً';
      if (quickBtn) quickBtn.classList.add('connected');
      if (statusBtn) statusBtn.classList.add('btn-success');
      renderChallengeArena();
      renderViewingTabs();
      renderRoadmap();
      updateAnalytics();
      if (!isSilent) showToast('☁️ تم مزامنة البيانات سحابياً بنجاح!', '✅');
    } else {
      if (dot) dot.textContent = '⚪';
      if (quickText) quickText.textContent = 'مزامنة فورية';
      if (!isSilent) showToast('💡 البيانات محفوظة محلياً. لمزامنة أسامة ومرشد سحابياً، أضف رابط Firebase من زر المزامنة!', '☁️', 5000);
    }
  }
}

// Cloud Sync Modal Handlers
function openCloudSyncModal() {
  const firebaseInput = document.getElementById('firebase-url-input');
  const serverInput = document.getElementById('server-url-input');
  const autoSyncBox = document.getElementById('firebase-auto-sync');

  if (firebaseInput) firebaseInput.value = appData.cloudConfig.firebaseUrl || '';
  if (serverInput) serverInput.value = appData.cloudConfig.serverUrl || (window.location.protocol.startsWith('http') ? window.location.origin : '');
  if (autoSyncBox) autoSyncBox.checked = appData.cloudConfig.autoSync !== false;

  openModal('cloud-sync-modal');
}

function switchSyncTab(tabName) {
  ['firebase', 'server', 'peer'].forEach(t => {
    const el = document.getElementById(`sync-tab-${t}`);
    const btn = document.getElementById(`tab-btn-${t}`);
    if (el) el.style.display = (t === tabName) ? 'block' : 'none';
    if (btn) {
      if (t === tabName) btn.classList.add('active');
      else btn.classList.remove('active');
    }
  });
}

async function saveAndTestFirebase() {
  const input = document.getElementById('firebase-url-input');
  if (!input) return;
  let url = input.value.trim();
  if (!url) {
    alert('يرجى إدخال رابط Firebase Realtime Database أولاً.');
    return;
  }

  showToast('⏳ جاري اختبار الاتصال بقاعدة بيانات Firebase...', '🔍');

  try {
    let testUrl = url.replace(/\/+$/, '');
    if (!testUrl.includes('/roadmap')) testUrl += '/roadmap';
    const res = await fetch(`${testUrl}/ping.json`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ ping: true, time: Date.now() })
    });

    if (res.ok) {
      appData.cloudConfig.firebaseUrl = url;
      appData.cloudConfig.autoSync = document.getElementById('firebase-auto-sync')?.checked !== false;
      saveState();
      showToast('🎉 رائع! تم الاتصال بقاعدة البيانات السحابية بنجاح!', '✅');
      closeModal('cloud-sync-modal');
      syncNow();
    } else {
      alert('تعذر الكتابة في قاعدة البيانات. يرجى التأكد من تفعيل قواعد Read و Write إلى true في تبويب Rules في Firebase.');
    }
  } catch (err) {
    alert('حدث خطأ أثناء الاتصال: ' + err.message + '\nتأكد من صحة الرابط واتصال الإنترنت.');
  }
}

function saveServerUrl() {
  const input = document.getElementById('server-url-input');
  if (input) {
    appData.cloudConfig.serverUrl = input.value.trim();
    saveState();
    showToast('💾 تم حفظ رابط السيرفر بنجاح!', '✅');
    syncNow();
  }
}

function syncWithPythonServer() {
  saveServerUrl();
  syncNow();
}

// Peer Export / Import for Offline or WhatsApp Sync
function exportMyProgressOnly() {
  const activeUser = getActiveUser();
  const payload = {
    syncVersion: "2.0",
    timestamp: new Date().toISOString(),
    userId: activeUser.id,
    user: activeUser
  };

  const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(payload, null, 2));
  const downloadAnchor = document.createElement('a');
  downloadAnchor.setAttribute("href", dataStr);
  downloadAnchor.setAttribute("download", `${activeUser.name}_Progress_${new Date().toISOString().split('T')[0]}.json`);
  document.body.appendChild(downloadAnchor);
  downloadAnchor.click();
  downloadAnchor.remove();

  showToast(`📤 تم تنزيل ملف إنجازات ${activeUser.nameAr}! أرسله لصديقك على WhatsApp ليستورده.`, '💾');
}

function importFriendProgress(event) {
  const file = event.target.files[0];
  if (!file) return;

  const reader = new FileReader();
  reader.onload = function(e) {
    try {
      const imported = JSON.parse(e.target.result);
      if (imported && imported.userId && imported.user) {
        // Safe merge: Update only friend's profile without touching my own!
        appData.users[imported.userId] = {
          ...createDefaultUser(imported.userId, imported.user.name || imported.userId, imported.user.nameAr || imported.userId, imported.user.avatar, imported.user.color, imported.user.role),
          ...imported.user
        };
        saveState();
        renderChallengeArena();
        renderViewingTabs();
        renderRoadmap();
        updateAnalytics();
        triggerConfetti();
        playSuccessChord();
        showToast(`🎉 تم دمج وتحديث إنجازات ${imported.user.nameAr || imported.userId} بنجاح!`, '✅');
        closeModal('cloud-sync-modal');
      } else {
        alert('الملف لا يحتوي على صيغة تحديث إنجازات صالحة.');
      }
    } catch (err) {
      alert('خطأ أثناء قراءة الملف: ' + err.message);
    }
  };
  reader.readAsText(file);
}

// Full Export / Backup State to JSON
function openExportModalOrDirect() {
  openCloudSyncModal();
  switchSyncTab('peer');
}

function exportAllData() {
  const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(appData, null, 2));
  const downloadAnchor = document.createElement('a');
  downloadAnchor.setAttribute("href", dataStr);
  downloadAnchor.setAttribute("download", `AI_Roadmap_Full_Team_${new Date().toISOString().split('T')[0]}.json`);
  document.body.appendChild(downloadAnchor);
  downloadAnchor.click();
  downloadAnchor.remove();
}

function importAllData(event) {
  const file = event.target.files[0];
  if (!file) return;

  const reader = new FileReader();
  reader.onload = function(e) {
    try {
      const imported = JSON.parse(e.target.result);
      if (imported.users) {
        appData.users = { ...appData.users, ...imported.users };
        saveState();
        renderHeaderIdentity();
        renderChallengeArena();
        renderViewingTabs();
        renderRoadmap();
        renderCareerSection();
        updateAnalytics();
        alert('✅ تم استرجاع بيانات الفريق بالكامل بنجاح!');
      } else if (imported.tasks) {
        // Legacy single user import -> merge into active user
        const activeUser = getActiveUser();
        activeUser.tasks = { ...activeUser.tasks, ...imported.tasks };
        activeUser.projects = { ...activeUser.projects, ...(imported.projects || {}) };
        saveState();
        renderRoadmap();
        updateAnalytics();
        alert('✅ تم دمج البيانات في ملف المستخدم النشط بنجاح!');
      }
    } catch (err) {
      alert('حدث خطأ أثناء قراءة الملف: ' + err.message);
    }
  };
  reader.readAsText(file);
}

// Reset Data with Prompt
function promptReset() {
  const activeUser = getActiveUser();
  if (confirm(`هل أنت متأكد من إعادة ضبط تقدمك الخاص (${activeUser.nameAr}) والبدء من الصفر؟ لن تتأثر بيانات أصدقائك.`)) {
    activeUser.tasks = {};
    activeUser.projects = {};
    activeUser.notes = {};
    activeUser.career = {};
    activeUser.studySessions = 0;
    activeUser.streakDays = 1;
    saveState();
    triggerDebouncedCloudSync();
    renderRoadmap();
    renderCareerSection();
    renderChallengeArena();
    updateAnalytics();
    showToast(`🔄 تم إعادة ضبط ملف ${activeUser.nameAr} بنجاح. بداية جديدة وموفقة! 🚀`, '✨');
  }
}

// ==========================================================================
// Modal Utilities & Toast Notifications
// ==========================================================================
function openModal(id) {
  const modal = document.getElementById(id);
  if (modal) modal.classList.add('active');
}

function closeModal(id) {
  const modal = document.getElementById(id);
  if (modal) modal.classList.remove('active');
}

function showToast(message, icon = '✨', duration = 3500) {
  const box = document.getElementById('toast-box');
  const msgEl = document.getElementById('toast-msg');
  const iconEl = document.getElementById('toast-icon');
  if (!box || !msgEl) return;

  msgEl.textContent = message;
  if (iconEl) iconEl.textContent = icon;

  box.classList.add('show');
  clearTimeout(toastTimeout);
  toastTimeout = setTimeout(() => {
    box.classList.remove('show');
  }, duration);
}

// ==========================================================================
// Pomodoro Timer Logic
// ==========================================================================
let pomodoroInterval = null;
let pomodoroSecondsLeft = 25 * 60;
let isPomodoroRunning = false;

function initPomodoroTimer() {
  updateTimerDisplay();
  document.getElementById('timer-start-btn')?.addEventListener('click', togglePomodoroTimer);
  document.getElementById('timer-reset-btn')?.addEventListener('click', resetPomodoroTimer);
}

function openPomodoroModal() {
  openModal('pomodoro-modal');
}

function togglePomodoroTimer() {
  const btn = document.getElementById('timer-start-btn');
  if (isPomodoroRunning) {
    clearInterval(pomodoroInterval);
    isPomodoroRunning = false;
    if (btn) btn.innerHTML = '<span>▶️ استئناف المذاكرة</span>';
  } else {
    isPomodoroRunning = true;
    if (btn) btn.innerHTML = '<span>⏸️ إيقاف مؤقت</span>';
    pomodoroInterval = setInterval(() => {
      if (pomodoroSecondsLeft > 0) {
        pomodoroSecondsLeft--;
        updateTimerDisplay();
      } else {
        clearInterval(pomodoroInterval);
        isPomodoroRunning = false;
        const activeUser = getActiveUser();
        activeUser.studySessions = (activeUser.studySessions || 0) + 1;
        saveState();
        triggerDebouncedCloudSync();
        updateAnalytics();
        playPomodoroBell();
        alert(`🎉 أحسنت يا ${activeUser.nameAr}! انتهت جلسة التركيز (25 دقيقة). خذ استراحة لمدة 5 دقائق.`);
        resetPomodoroTimer();
      }
    }, 1000);
  }
}

function resetPomodoroTimer() {
  clearInterval(pomodoroInterval);
  isPomodoroRunning = false;
  pomodoroSecondsLeft = 25 * 60;
  updateTimerDisplay();
  const btn = document.getElementById('timer-start-btn');
  if (btn) btn.innerHTML = '<span>▶️ ابدأ جلسة التركيز (25 دقيقة)</span>';
}

function updateTimerDisplay() {
  const mins = Math.floor(pomodoroSecondsLeft / 60);
  const secs = pomodoroSecondsLeft % 60;
  const str = `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  const display = document.getElementById('pomodoro-display');
  if (display) display.textContent = str;
}

// ==========================================================================
// Synthesized Audio Feedback via Web Audio API
// ==========================================================================
let audioCtx = null;
function getAudioContext() {
  if (!audioCtx) {
    audioCtx = new (window.AudioContext || window.webkitAudioContext)();
  }
  return audioCtx;
}

function playTickTone() {
  try {
    const ctx = getAudioContext();
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    osc.type = 'sine';
    osc.frequency.setValueAtTime(800, ctx.currentTime);
    osc.frequency.exponentialRampToValueAtTime(1200, ctx.currentTime + 0.05);
    gain.gain.setValueAtTime(0.08, ctx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.05);
    osc.connect(gain);
    gain.connect(ctx.destination);
    osc.start();
    osc.stop(ctx.currentTime + 0.05);
  } catch (e) {}
}

function playLockedTone() {
  try {
    const ctx = getAudioContext();
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    osc.type = 'square';
    osc.frequency.setValueAtTime(280, ctx.currentTime);
    osc.frequency.setValueAtTime(200, ctx.currentTime + 0.08);
    gain.gain.setValueAtTime(0.06, ctx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.16);
    osc.connect(gain);
    gain.connect(ctx.destination);
    osc.start();
    osc.stop(ctx.currentTime + 0.16);
  } catch (e) {}
}

function playSuccessChord() {
  try {
    const ctx = getAudioContext();
    const freqs = [523.25, 659.25, 783.99, 1046.50]; // C Major
    freqs.forEach((freq, idx) => {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = 'triangle';
      osc.frequency.setValueAtTime(freq, ctx.currentTime + idx * 0.08);
      gain.gain.setValueAtTime(0.12, ctx.currentTime + idx * 0.08);
      gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + idx * 0.08 + 0.5);
      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.start(ctx.currentTime + idx * 0.08);
      osc.stop(ctx.currentTime + idx * 0.08 + 0.5);
    });
  } catch (e) {}
}

function playPomodoroBell() {
  try {
    const ctx = getAudioContext();
    [880, 880, 1174].forEach((freq, idx) => {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = 'sine';
      osc.frequency.setValueAtTime(freq, ctx.currentTime + idx * 0.2);
      gain.gain.setValueAtTime(0.15, ctx.currentTime + idx * 0.2);
      gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + idx * 0.2 + 0.6);
      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.start(ctx.currentTime + idx * 0.2);
      osc.stop(ctx.currentTime + idx * 0.2 + 0.6);
    });
  } catch (e) {}
}

// ==========================================================================
// Confetti Particle Generator
// ==========================================================================
let confettiCanvas = null;
let confettiCtx = null;
let particles = [];

function initConfetti() {
  confettiCanvas = document.getElementById('confetti-canvas');
  if (confettiCanvas) {
    confettiCtx = confettiCanvas.getContext('2d');
    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);
  }
}

function resizeCanvas() {
  if (confettiCanvas) {
    confettiCanvas.width = window.innerWidth;
    confettiCanvas.height = window.innerHeight;
  }
}

function triggerConfetti() {
  if (!confettiCanvas || !confettiCtx) return;
  const colors = ['#3b82f6', '#8b5cf6', '#ec4899', '#10b981', '#f59e0b', '#06b6d4'];
  particles = [];
  for (let i = 0; i < 120; i++) {
    particles.push({
      x: window.innerWidth / 2,
      y: window.innerHeight / 2,
      w: Math.random() * 8 + 4,
      h: Math.random() * 8 + 4,
      color: colors[Math.floor(Math.random() * colors.length)],
      vx: (Math.random() - 0.5) * 18,
      vy: (Math.random() - 0.8) * 18,
      gravity: 0.4,
      rotation: Math.random() * 360,
      rotSpeed: (Math.random() - 0.5) * 8,
      alpha: 1
    });
  }
  requestAnimationFrame(updateConfetti);
}

function updateConfetti() {
  if (!confettiCtx || particles.length === 0) return;
  confettiCtx.clearRect(0, 0, confettiCanvas.width, confettiCanvas.height);

  particles.forEach((p, index) => {
    p.x += p.vx;
    p.y += p.vy;
    p.vy += p.gravity;
    p.rotation += p.rotSpeed;
    p.alpha -= 0.012;

    confettiCtx.save();
    confettiCtx.translate(p.x, p.y);
    confettiCtx.rotate((p.rotation * Math.PI) / 180);
    confettiCtx.fillStyle = p.color;
    confettiCtx.globalAlpha = Math.max(0, p.alpha);
    confettiCtx.fillRect(-p.w / 2, -p.h / 2, p.w, p.h);
    confettiCtx.restore();

    if (p.alpha <= 0) {
      particles.splice(index, 1);
    }
  });

  if (particles.length > 0) {
    requestAnimationFrame(updateConfetti);
  } else {
    confettiCtx.clearRect(0, 0, confettiCanvas.width, confettiCanvas.height);
  }
}
