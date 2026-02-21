(function () {
  "use strict";

  document.addEventListener("DOMContentLoaded", function () {
    const openBtn = document.getElementById("hcl-tmm-expband-v1-open-btn");
    const modal = document.getElementById("hcl-tmm-expband-v1-modal");
    const closeBtn = document.getElementById("hcl-tmm-expband-v1-close-btn");
    const cancelBtn = document.getElementById("hcl-tmm-expband-v1-cancel-btn");

    if (!openBtn || !modal) return;

    const openModal = () => {
      modal.style.display = "flex";
      modal.setAttribute("aria-hidden", "false");
    };

    const closeModal = () => {
      modal.style.display = "none";
      modal.setAttribute("aria-hidden", "true");
    };

    openBtn.addEventListener("click", openModal);
    closeBtn?.addEventListener("click", closeModal);
    cancelBtn?.addEventListener("click", closeModal);

    modal.addEventListener("click", (e) => {
      if (e.target === modal) {
        closeModal();
      }
    });
  });
})();





/**
 * Band Details Modal - Fixed JavaScript
 * File: function/Band_Details_Modal_Fixed.js
 * Purpose: Handle the modal functionality and tab switching
 */

// Global variables
let currentModalTab = 'overview';
let isModalInitialized = false;

// Initialize Modal
function initializeBandModal() {
    console.log('Initializing Band Details Modal...');
    
    // Setup event listeners
    setupModalEventListeners();
    
    // Load initial data
    loadModalData();
    
    // Initialize first tab
    initializeOverviewTab();
    
    isModalInitialized = true;
    console.log('Band Details Modal initialized successfully.');
}

// Setup Event Listeners
function setupModalEventListeners() {
    // Close Modal Button
    const closeBtn = document.getElementById('modal-close-btn');
    if (closeBtn) {
        closeBtn.addEventListener('click', closeModal);
    }
    
    // Tab Click Events
    const tabs = document.querySelectorAll('.modal-tab');
    tabs.forEach(tab => {
        tab.addEventListener('click', function() {
            const tabId = this.getAttribute('data-tab');
            switchModalTab(tabId);
        });
    });
    
    // Overview Tab Buttons
    const overviewRefreshBtn = document.getElementById('overview-refresh-btn');
    if (overviewRefreshBtn) {
        overviewRefreshBtn.addEventListener('click', refreshOverview);
    }
    
    const overviewExportBtn = document.getElementById('overview-export-btn');
    if (overviewExportBtn) {
        overviewExportBtn.addEventListener('click', exportOverview);
    }
    
    // Customer/Account Selectors
    const customerSelect = document.getElementById('overview-customer-select');
    if (customerSelect) {
        customerSelect.addEventListener('change', updateModalTitle);
    }
    
    const accountSelect = document.getElementById('overview-account-select');
    if (accountSelect) {
        accountSelect.addEventListener('change', updateModalTitle);
    }
    
    // Footer Actions
    const syncExcelBtn = document.getElementById('modal-sync-excel-btn');
    if (syncExcelBtn) {
        syncExcelBtn.addEventListener('click', syncWithExcel);
    }
    
    const recalcAllBtn = document.getElementById('modal-recalculate-all-btn');
    if (recalcAllBtn) {
        recalcAllBtn.addEventListener('click', recalculateAll);
    }
    
    // Close modal when clicking outside (optional)
    const modalOverlay = document.getElementById('hcl-tmm-expband-v1-modal');
    if (modalOverlay) {
        modalOverlay.addEventListener('click', function(e) {
            if (e.target === this) {
                closeModal();
            }
        });
    }
    
    // Escape key to close modal
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape') {
            closeModal();
        }
    });
}

// Switch Modal Tab
function switchModalTab(tabId) {
    console.log('Switching to tab:', tabId);
    
    // Update current tab
    currentModalTab = tabId;
    
    // Update tab buttons
    const tabs = document.querySelectorAll('.modal-tab');
    tabs.forEach(tab => {
        const isActive = tab.getAttribute('data-tab') === tabId;
        tab.classList.toggle('active', isActive);
    });
    
    // Update tab content
    const tabContents = document.querySelectorAll('.modal-tab-content');
    tabContents.forEach(content => {
        const isActive = content.id === `${tabId}-tab-content`;
        content.classList.toggle('active', isActive);
    });
    
    // Update status text
    updateModalStatus(tabId);
    
    // Initialize tab content if needed
    switch(tabId) {
        case 'dedicated':
            initializeDedicatedTab();
            break;
        case 'project':
            initializeProjectTab();
            break;
        case 'calendar':
            initializeCalendarTab();
            break;
        case 'analytics':
            initializeAnalyticsTab();
            break;
        case 'ai-summary':
            initializeAITab();
            break;
        case 'settings':
            initializeSettingsTab();
            break;
    }
}

// Update Modal Title
function updateModalTitle() {
    const customerSelect = document.getElementById('overview-customer-select');
    const accountSelect = document.getElementById('overview-account-select');
    const customerLabel = document.getElementById('modal-customer-label');
    const accountLabel = document.getElementById('modal-account-label');
    
    if (customerSelect && accountSelect && customerLabel && accountLabel) {
        const customer = customerSelect.value === 'All customers' ? 'All' : customerSelect.value;
        const account = accountSelect.options[accountSelect.selectedIndex].text;
        
        customerLabel.textContent = customer;
        accountLabel.textContent = ' - ' + account;
    }
}

// Update Modal Status
function updateModalStatus(tabId) {
    const statusText = document.getElementById('modal-status-text');
    if (!statusText) return;
    
    const statusMessages = {
        'overview': 'Overview dashboard loaded - Ready',
        'dedicated': 'Managing dedicated resources - ' + getDedicatedCount() + ' technicians',
        'project': 'Managing projects - ' + getProjectCount() + ' active projects',
        'calendar': 'Calendar view - ' + getHolidayCount() + ' holidays configured',
        'analytics': 'Analytics dashboard - Viewing reports',
        'ai-summary': 'AI Assistant ready - Ask me anything',
        'settings': 'System configuration - Modify settings'
    };
    
    statusText.textContent = statusMessages[tabId] || 'Ready';
}

// Open Modal
function openBandModal() {
    const modal = document.getElementById('hcl-tmm-expband-v1-modal');
    if (modal) {
        modal.style.display = 'flex';
        document.body.style.overflow = 'hidden';
        
        // Initialize if not already done
        if (!isModalInitialized) {
            initializeBandModal();
        }
        
        // Switch to overview tab by default
        switchModalTab('overview');
        
        // Update modal title
        updateModalTitle();
        
        console.log('Band Details Modal opened');
    }
}

// Close Modal
function closeModal() {
    const modal = document.getElementById('hcl-tmm-expband-v1-modal');
    if (modal) {
        modal.style.display = 'none';
        document.body.style.overflow = 'auto';
        console.log('Band Details Modal closed');
    }
}

// Load Modal Data
function loadModalData() {
    // Load sample data or fetch from API
    console.log('Loading modal data...');
    // This would typically make API calls to load data
}

// Initialize Overview Tab
function initializeOverviewTab() {
    console.log('Initializing Overview tab...');
    
    // Update stats with actual data
    updateOverviewStats();
    
    // Set up overview-specific event listeners
    setupOverviewEventListeners();
}

// Update Overview Stats
function updateOverviewStats() {
    // These would be populated with real data
    const stats = {
        totalResources: 8,
        monthlyCost: 25420,
        utilization: 92,
        slaCompliance: 88
    };
    
    // Update DOM elements
    const totalValue = document.getElementById('overview-stat-total-value');
    const costValue = document.getElementById('overview-stat-cost-value');
    const utilizationValue = document.getElementById('overview-stat-utilization-value');
    const slaValue = document.getElementById('overview-stat-sla-value');
    
    if (totalValue) totalValue.textContent = stats.totalResources;
    if (costValue) costValue.textContent = '€' + stats.monthlyCost.toLocaleString();
    if (utilizationValue) utilizationValue.textContent = stats.utilization + '%';
    if (slaValue) slaValue.textContent = stats.slaCompliance + '%';
}

// Refresh Overview
function refreshOverview() {
    console.log('Refreshing overview data...');
    updateOverviewStats();
    showModalNotification('Overview data refreshed successfully!', 'success');
}

// Export Overview
function exportOverview() {
    console.log('Exporting overview data...');
    showModalNotification('Overview data exported successfully!', 'success');
}

// Setup Overview Event Listeners
function setupOverviewEventListeners() {
    // View All Activity Button
    const viewAllBtn = document.getElementById('view-all-activity-btn');
    if (viewAllBtn) {
        viewAllBtn.addEventListener('click', function() {
            showModalNotification('Opening activity log...', 'info');
        });
    }
    
    // Action cards already have onclick handlers in HTML
}

// Initialize Other Tabs (stub functions)
function initializeDedicatedTab() {
    console.log('Initializing Dedicated tab...');
    // Load dedicated data, setup table, etc.
}

function initializeProjectTab() {
    console.log('Initializing Project tab...');
    // Load project data, setup table, etc.
}

function initializeCalendarTab() {
    console.log('Initializing Calendar tab...');
    // Initialize calendar, load holidays, etc.
}

function initializeAnalyticsTab() {
    console.log('Initializing Analytics tab...');
    // Load charts, setup analytics, etc.
}

function initializeAITab() {
    console.log('Initializing AI tab...');
    // Setup AI chat functionality
}

function initializeSettingsTab() {
    console.log('Initializing Settings tab...');
    // Load current settings
}

// Get Count Functions (stubs)
function getDedicatedCount() {
    return 5; // Would fetch actual count
}

function getProjectCount() {
    return 3; // Would fetch actual count
}

function getHolidayCount() {
    return 3; // Would fetch actual count
}

// Footer Actions
function syncWithExcel() {
    console.log('Syncing with Excel...');
    showModalNotification('Data synchronized with Excel successfully!', 'success');
}

function recalculateAll() {
    console.log('Recalculating all...');
    showModalNotification('All calculations completed successfully!', 'success');
}

// Show Notification
function showModalNotification(message, type = 'info') {
    // Create notification element
    const notification = document.createElement('div');
    notification.className = `modal-notification modal-notification-${type}`;
    notification.innerHTML = `
        <i class="fas fa-${type === 'success' ? 'check-circle' : 
                          type === 'error' ? 'times-circle' : 
                          type === 'warning' ? 'exclamation-triangle' : 
                          'info-circle'}"></i>
        <span>${message}</span>
    `;
    
    // Add styles (you might want to add these to your CSS)
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background: ${type === 'success' ? '#2d6a2d' : 
                     type === 'error' ? '#a52a2a' : 
                     type === 'warning' ? '#b85c1e' : '#1e5fa1'};
        color: white;
        padding: 15px 25px;
        border-radius: 8px;
        display: flex;
        align-items: center;
        gap: 12px;
        z-index: 100000;
        box-shadow: 0 5px 20px rgba(0,0,0,0.2);
        animation: slideInRight 0.3s ease-out;
    `;
    
    // Add to body
    document.body.appendChild(notification);
    
    // Remove after 5 seconds
    setTimeout(() => {
        notification.style.animation = 'slideOutRight 0.3s ease-out';
        setTimeout(() => {
            notification.remove();
        }, 300);
    }, 5000);
}

// Add CSS for notifications
const notificationStyles = document.createElement('style');
notificationStyles.textContent = `
    @keyframes slideInRight {
        from {
            opacity: 0;
            transform: translateX(100%);
        }
        to {
            opacity: 1;
            transform: translateX(0);
        }
    }
    
    @keyframes slideOutRight {
        from {
            opacity: 1;
            transform: translateX(0);
        }
        to {
            opacity: 0;
            transform: translateX(100%);
        }
    }
`;
document.head.appendChild(notificationStyles);

// Initialize when DOM is ready
document.addEventListener('DOMContentLoaded', function() {
    console.log('DOM ready, initializing modal...');
    
    // Check if modal exists on page
    if (document.getElementById('hcl-tmm-expband-v1-modal')) {
        initializeBandModal();
    }
    
    // If you have an external button to open the modal:
    const openModalButtons = document.querySelectorAll('[data-open-band-modal]');
    openModalButtons.forEach(button => {
        button.addEventListener('click', openBandModal);
    });
});

// Make functions available globally
window.openBandModal = openBandModal;
window.closeModal = closeModal;
window.switchModalTab = switchModalTab;