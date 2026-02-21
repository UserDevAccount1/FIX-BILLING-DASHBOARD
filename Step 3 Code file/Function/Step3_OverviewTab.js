/**
 * Band Details - Overview Tab Functionality
 * File: step_OverviewTab.js
 */

// Overview Tab Variables
let overviewSearchTerm = '';
let overviewSearchActive = false;
let currentCurrency = 'EUR';
let currencyRates = {
    EUR: 1,
    USD: 1.08,
    GBP: 0.85,
    AED: 4.02,
    AUD: 1.64
};

// Initialize Overview Tab
function initializeOverviewTab() {
    console.log('Band Details: Initializing Overview tab...');
    
    // Update stats with actual data
    updateOverviewStats();
    
    // Set up overview-specific event listeners
    setupOverviewEventListeners();
    
    // Initialize search functionality
    initializeOverviewSearch();
    
    // Initialize action cards
    initializeActionCards();
    
    // Update modal status
    if (typeof updateModalStatus === 'function') {
        updateModalStatus('overview');
    }
    
    console.log('Band Details: Overview tab initialized successfully');
}

// Update Overview Stats
function updateOverviewStats() {
    console.log('Band Details: Updating overview stats...');
    
    // These would be populated with real data from API
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
    
    // Update cost with current currency
    if (costValue) {
        const symbol = getCurrencySymbol(currentCurrency);
        const rate = currencyRates[currentCurrency] || 1;
        const convertedCost = (stats.monthlyCost * rate).toFixed(0);
        costValue.textContent = `${symbol}${parseInt(convertedCost).toLocaleString()}`;
    }
    
    if (utilizationValue) utilizationValue.textContent = stats.utilization + '%';
    if (slaValue) slaValue.textContent = stats.slaCompliance + '%';
}

// Setup Overview Event Listeners
function setupOverviewEventListeners() {
    console.log('Band Details: Setting up overview event listeners...');
    
    // Overview Refresh Button
    const overviewRefreshBtn = document.getElementById('overview-refresh-btn');
    if (overviewRefreshBtn) {
        overviewRefreshBtn.addEventListener('click', refreshOverview);
    }
    
    // Overview Export Button
    const overviewExportBtn = document.getElementById('overview-export-btn');
    if (overviewExportBtn) {
        overviewExportBtn.addEventListener('click', exportOverview);
    }
    
    // View All Activity Button
    const viewAllBtn = document.getElementById('view-all-activity-btn');
    if (viewAllBtn) {
        viewAllBtn.addEventListener('click', function() {
            if (typeof showModalNotification === 'function') {
                showModalNotification('Opening activity log...', 'info');
            } else {
                console.log('Opening activity log...');
            }
        });
    }
    
    // Customer/Account Selectors
    const customerSelect = document.getElementById('overview-customer-select');
    if (customerSelect) {
        customerSelect.addEventListener('change', function() {
            updateOverviewData();
            if (typeof updateModalTitle === 'function') {
                updateModalTitle();
            }
        });
    }
    
    const accountSelect = document.getElementById('overview-account-select');
    if (accountSelect) {
        accountSelect.addEventListener('change', function() {
            updateOverviewData();
            if (typeof updateModalTitle === 'function') {
                updateModalTitle();
            }
        });
    }
    
    const ticketSelect = document.getElementById('overview-ticket-select');
    if (ticketSelect) {
        ticketSelect.addEventListener('change', updateOverviewData);
    }
    
    // Initialize stat card interactions
    initializeStatCards();
    
    // Initialize currency conversion
    initializeCurrencyConversion();
}

// Initialize Action Cards
function initializeActionCards() {
    const actionCards = document.querySelectorAll('.overview-actions-grid .action-card');
    
    actionCards.forEach(card => {
        card.addEventListener('click', function() {
            const action = this.getAttribute('data-action');
            if (action && typeof switchModalTab === 'function') {
                switchModalTab(action);
            } else if (action) {
                console.log(`Navigating to ${action} tab`);
                // Fallback navigation
                const tabs = document.querySelectorAll('.modal-tab-content');
                const tabContents = document.querySelectorAll('.modal-tab-content');
                
                tabs.forEach(tab => tab.classList.remove('active'));
                tabContents.forEach(content => content.classList.remove('active'));
                
                const targetTab = document.getElementById(`${action}-tab`);
                const targetContent = document.getElementById(`${action}-tab-content`);
                
                if (targetTab) targetTab.classList.add('active');
                if (targetContent) targetContent.classList.add('active');
            }
        });
        
        // Add hover effects
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-2px)';
            this.style.boxShadow = '0 6px 12px rgba(0,0,0,0.15)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0)';
            this.style.boxShadow = '0 2px 8px rgba(0,0,0,0.1)';
        });
    });
}

// Initialize Stat Cards with Enhanced Features
function initializeStatCards() {
    const statCards = document.querySelectorAll('.overview-stats-grid .stat-card');
    
    if (statCards.length === 0) {
        console.error('Band Details: No stat cards found in the DOM');
        return;
    }
    
    statCards.forEach(card => {
        // Click functionality to drill down
        card.addEventListener('click', function(e) {
            // Don't trigger if clicking on currency selector or details button
            if (e.target.closest('.currency-selector-dropdown') || 
                e.target.closest('.stat-details-btn')) {
                return;
            }
            
            const statType = this.getAttribute('data-stat');
            if (statType) {
                drillDownStat(statType);
            }
        });
        
        // Add active state on hover
        card.addEventListener('mouseenter', function() {
            this.classList.add('active');
        });
        
        card.addEventListener('mouseleave', function() {
            this.classList.remove('active');
        });
        
        // Details button click
        const detailsBtn = card.querySelector('.stat-details-btn');
        if (detailsBtn) {
            detailsBtn.addEventListener('click', function(e) {
                e.stopPropagation();
                const statType = card.getAttribute('data-stat');
                if (statType) {
                    showStatDetails(statType);
                }
            });
        }
    });
    
    console.log(`Band Details: Initialized ${statCards.length} stat cards`);
}

// Drill down into stat details
function drillDownStat(statType) {
    console.log(`Band Details: Drilling down into ${statType}`);
    
    const statNames = {
        'total-resources': 'Total Resources',
        'monthly-cost': 'Monthly Cost',
        'utilization': 'Utilization Rate',
        'sla-compliance': 'SLA Compliance'
    };
    
    const notificationMessages = {
        'total-resources': 'Navigating to dedicated resources list...',
        'monthly-cost': 'Opening cost breakdown analysis...',
        'utilization': 'Showing utilization details by technician...',
        'sla-compliance': 'Displaying SLA compliance report...'
    };
    
    if (typeof showModalNotification === 'function') {
        showModalNotification(notificationMessages[statType] || 'Loading details...', 'info');
    }
    
    // Simulate API call and navigation
    setTimeout(() => {
        showStatDetailsModal(statType, statNames[statType]);
    }, 500);
}

// Show stat details modal
function showStatDetailsModal(statType, statName) {
    const modalContent = getStatDetailsContent(statType);
    
    // Check if modal already exists and remove it
    const existingModal = document.querySelector('.stat-details-modal-overlay');
    if (existingModal) {
        existingModal.remove();
    }
    
    // Create modal overlay
    const modalOverlay = document.createElement('div');
    modalOverlay.className = 'stat-details-modal-overlay';
    modalOverlay.innerHTML = `
        <div class="stat-details-modal">
            <div class="modal-header">
                <h3><i class="fas fa-chart-bar"></i> ${statName} Details</h3>
                <button class="modal-close-btn" id="close-stat-details">
                    <i class="fas fa-times"></i>
                </button>
            </div>
            <div class="modal-content">
                ${modalContent}
            </div>
            <div class="modal-footer">
                <button class="btn btn-secondary" id="export-stat-details">
                    <i class="fas fa-download"></i> Export Data
                </button>
                <button class="btn btn-primary" id="close-stat-modal">
                    <i class="fas fa-check"></i> Close
                </button>
            </div>
        </div>
    `;
    
    // Add styles
    modalOverlay.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        background: rgba(0,0,0,0.7);
        display: flex;
        align-items: center;
        justify-content: center;
        z-index: 99999;
        padding: 20px;
        animation: fadeIn 0.3s ease-out;
    `;
    
    // Add animation keyframes if they don't exist
    if (!document.querySelector('#modal-animation-styles')) {
        const styleSheet = document.createElement('style');
        styleSheet.id = 'modal-animation-styles';
        styleSheet.textContent = `
            @keyframes fadeIn {
                from { opacity: 0; }
                to { opacity: 1; }
            }
            @keyframes fadeOut {
                from { opacity: 1; }
                to { opacity: 0; }
            }
            .stat-details-modal {
                background: white;
                border-radius: 12px;
                max-width: 600px;
                width: 100%;
                max-height: 80vh;
                overflow-y: auto;
                animation: slideIn 0.3s ease-out;
            }
            @keyframes slideIn {
                from {
                    transform: translateY(-30px);
                    opacity: 0;
                }
                to {
                    transform: translateY(0);
                    opacity: 1;
                }
            }
            .modal-header {
                padding: 20px;
                border-bottom: 1px solid #e0e0e0;
                display: flex;
                justify-content: space-between;
                align-items: center;
                background: #f8f9fa;
                border-radius: 12px 12px 0 0;
            }
            .modal-header h3 {
                margin: 0;
                font-size: 1.2rem;
            }
            .modal-header h3 i {
                margin-right: 10px;
                color: #007bff;
            }
            .modal-close-btn {
                background: none;
                border: none;
                font-size: 1.2rem;
                cursor: pointer;
                padding: 5px;
                color: #666;
                transition: color 0.2s;
            }
            .modal-close-btn:hover {
                color: #333;
            }
            .modal-content {
                padding: 20px;
            }
            .modal-footer {
                padding: 20px;
                border-top: 1px solid #e0e0e0;
                display: flex;
                justify-content: flex-end;
                gap: 10px;
            }
            .details-summary {
                display: grid;
                grid-template-columns: repeat(3, 1fr);
                gap: 15px;
                margin-bottom: 20px;
            }
            .summary-item {
                background: #f8f9fa;
                padding: 15px;
                border-radius: 8px;
                text-align: center;
            }
            .summary-label {
                display: block;
                font-size: 0.85rem;
                color: #666;
                margin-bottom: 5px;
            }
            .summary-value {
                display: block;
                font-size: 1.2rem;
                font-weight: bold;
                color: #333;
            }
            .trend-down {
                color: #dc3545;
            }
            .trend-up {
                color: #28a745;
            }
            .trend-neutral {
                color: #ffc107;
            }
            .details-table {
                margin-top: 20px;
            }
            .details-table h4 {
                margin-bottom: 15px;
                color: #333;
            }
            .details-table table {
                width: 100%;
                border-collapse: collapse;
            }
            .details-table th {
                background: #f8f9fa;
                padding: 10px;
                text-align: left;
                font-weight: 600;
                color: #333;
            }
            .details-table td {
                padding: 10px;
                border-bottom: 1px solid #e0e0e0;
            }
            .details-table tr:hover td {
                background: #f5f5f5;
            }
        `;
        document.head.appendChild(styleSheet);
    }
    
    document.body.appendChild(modalOverlay);
    
    // Close functionality
    const closeBtn = modalOverlay.querySelector('#close-stat-details');
    const closeModalBtn = modalOverlay.querySelector('#close-stat-modal');
    const exportBtn = modalOverlay.querySelector('#export-stat-details');
    
    const closeModal = () => {
        modalOverlay.style.animation = 'fadeOut 0.3s ease-out';
        setTimeout(() => {
            modalOverlay.remove();
        }, 300);
    };
    
    if (closeBtn) closeBtn.addEventListener('click', closeModal);
    if (closeModalBtn) closeModalBtn.addEventListener('click', closeModal);
    if (exportBtn) exportBtn.addEventListener('click', () => exportStatDetails(statType));
    
    // Close on overlay click
    modalOverlay.addEventListener('click', (e) => {
        if (e.target === modalOverlay) {
            closeModal();
        }
    });
    
    // Escape key to close
    const closeOnEscape = (e) => {
        if (e.key === 'Escape') {
            closeModal();
            document.removeEventListener('keydown', closeOnEscape);
        }
    };
    document.addEventListener('keydown', closeOnEscape);
}

// Get stat details content
function getStatDetailsContent(statType) {
    const contents = {
        'total-resources': `
            <div class="stat-details-content">
                <div class="details-summary">
                    <div class="summary-item">
                        <span class="summary-label">Active Technicians</span>
                        <span class="summary-value">5</span>
                    </div>
                    <div class="summary-item">
                        <span class="summary-label">On Leave</span>
                        <span class="summary-value">2</span>
                    </div>
                    <div class="summary-item">
                        <span class="summary-label">New This Month</span>
                        <span class="summary-value">2</span>
                    </div>
                </div>
                <div class="details-table">
                    <h4>Technicians by Band Level</h4>
                    <table>
                        <tr><th>Band Level</th><th>Count</th><th>Percentage</th></tr>
                        <tr><td>Band 0</td><td>1</td><td>12.5%</td></tr>
                        <tr><td>Band 1</td><td>2</td><td>25%</td></tr>
                        <tr><td>Band 2</td><td>3</td><td>37.5%</td></tr>
                        <tr><td>Band 3</td><td>1</td><td>12.5%</td></tr>
                        <tr><td>Band 4</td><td>1</td><td>12.5%</td></tr>
                    </table>
                </div>
            </div>
        `,
        'monthly-cost': `
            <div class="stat-details-content">
                <div class="details-summary">
                    <div class="summary-item">
                        <span class="summary-label">Current Currency</span>
                        <span class="summary-value">${currentCurrency}</span>
                    </div>
                    <div class="summary-item">
                        <span class="summary-label">Exchange Rate</span>
                        <span class="summary-value">1 EUR = ${currencyRates.USD} USD</span>
                    </div>
                    <div class="summary-item">
                        <span class="summary-label">Cost Trend</span>
                        <span class="summary-value trend-down">-5% this month</span>
                    </div>
                </div>
                <div class="details-table">
                    <h4>Cost Breakdown by Band</h4>
                    <table>
                        <tr><th>Band Level</th><th>Count</th><th>Monthly Cost</th><th>Percentage</th></tr>
                        <tr><td>Band 0</td><td>1</td><td>€1,500</td><td>5.9%</td></tr>
                        <tr><td>Band 1</td><td>2</td><td>€4,800</td><td>18.9%</td></tr>
                        <tr><td>Band 2</td><td>3</td><td>€10,770</td><td>42.3%</td></tr>
                        <tr><td>Band 3</td><td>1</td><td>€5,200</td><td>20.4%</td></tr>
                        <tr><td>Band 4</td><td>1</td><td>€3,150</td><td>12.4%</td></tr>
                    </table>
                </div>
            </div>
        `,
        'utilization': `
            <div class="stat-details-content">
                <div class="details-summary">
                    <div class="summary-item">
                        <span class="summary-label">Average Utilization</span>
                        <span class="summary-value">92%</span>
                    </div>
                    <div class="summary-item">
                        <span class="summary-label">Target</span>
                        <span class="summary-value">95%</span>
                    </div>
                    <div class="summary-item">
                        <span class="summary-label">Month-over-Month</span>
                        <span class="summary-value trend-up">+3%</span>
                    </div>
                </div>
                <div class="details-table">
                    <h4>Utilization by Technician</h4>
                    <table>
                        <tr><th>Technician</th><th>Utilization</th><th>Worked Days</th><th>Target</th></tr>
                        <tr><td>John Doe</td><td>95%</td><td>21/22</td><td>✓ Achieved</td></tr>
                        <tr><td>Jane Smith</td><td>100%</td><td>22/22</td><td>✓ Exceeded</td></tr>
                        <tr><td>Bob Johnson</td><td>86%</td><td>19/22</td><td>⚠️ Below Target</td></tr>
                        <tr><td>Alice Brown</td><td>91%</td><td>20/22</td><td>⚠️ Below Target</td></tr>
                        <tr><td>Charlie Wilson</td><td>88%</td><td>19.5/22</td><td>⚠️ Below Target</td></tr>
                    </table>
                </div>
            </div>
        `,
        'sla-compliance': `
            <div class="stat-details-content">
                <div class="details-summary">
                    <div class="summary-item">
                        <span class="summary-label">Overall SLA</span>
                        <span class="summary-value">88%</span>
                    </div>
                    <div class="summary-item">
                        <span class="summary-label">Target</span>
                        <span class="summary-value">95%</span>
                    </div>
                    <div class="summary-item">
                        <span class="summary-label">Status</span>
                        <span class="summary-value trend-neutral">Needs Improvement</span>
                    </div>
                </div>
                <div class="details-table">
                    <h4>SLA Compliance by Customer</h4>
                    <table>
                        <tr><th>Customer</th><th>SLA %</th><th>Status</th><th>Missed Incidents</th></tr>
                        <tr><td>HCL</td><td>92%</td><td>✓ Good</td><td>2</td></tr>
                        <tr><td>Acme Corp</td><td>85%</td><td>⚠️ Fair</td><td>5</td></tr>
                        <tr><td>COFORGE</td><td>95%</td><td>✓ Excellent</td><td>0</td></tr>
                        <tr><td>Cognizant</td><td>80%</td><td>❌ Poor</td><td>8</td></tr>
                    </table>
                </div>
            </div>
        `
    };
    
    return contents[statType] || '<p>No details available for this stat.</p>';
}

// Export stat details
function exportStatDetails(statType) {
    console.log(`Band Details: Exporting ${statType} details`);
    if (typeof showModalNotification === 'function') {
        showModalNotification(`Exporting ${statType.replace('-', ' ')} details...`, 'success');
    }
}

// Show stat details directly (without modal)
function showStatDetails(statType) {
    console.log(`Band Details: Showing detailed view for ${statType}`);
    
    // Navigate to appropriate tab based on stat type
    switch(statType) {
        case 'total-resources':
        case 'utilization':
            if (typeof switchModalTab === 'function') {
                switchModalTab('dedicated');
            } else {
                console.error('switchModalTab function not found');
                if (typeof showModalNotification === 'function') {
                    showModalNotification('Cannot navigate to dedicated tab', 'error');
                }
            }
            break;
        case 'monthly-cost':
            if (typeof switchModalTab === 'function') {
                switchModalTab('analytics');
            } else {
                console.error('switchModalTab function not found');
                if (typeof showModalNotification === 'function') {
                    showModalNotification('Cannot navigate to analytics tab', 'error');
                }
            }
            break;
        case 'sla-compliance':
            if (typeof showModalNotification === 'function') {
                showModalNotification('Opening SLA compliance dashboard...', 'info');
            }
            break;
    }
}

// Initialize Currency Conversion
function initializeCurrencyConversion() {
    const currencySelectorBtns = document.querySelectorAll('.currency-selector-btn');
    const currencyOptions = document.querySelectorAll('.currency-option');
    const conversionPanel = document.getElementById('currency-conversion-panel');
    const closePanelBtn = document.getElementById('close-currency-panel');
    const cancelConversionBtn = document.getElementById('cancel-conversion');
    const applyConversionBtn = document.getElementById('apply-conversion');
    const targetCurrencySelect = document.getElementById('target-currency');
    const conversionRateInput = document.getElementById('conversion-rate');
    const rateDisplay = document.getElementById('rate-display');
    
    // Currency selector button click
    currencySelectorBtns.forEach(btn => {
        btn.addEventListener('click', function(e) {
            e.stopPropagation();
            showCurrencyConversionPanel();
        });
    });
    
    // Currency option clicks
    currencyOptions.forEach(option => {
        option.addEventListener('click', function() {
            const currency = this.getAttribute('data-currency');
            const symbol = this.getAttribute('data-symbol');
            
            // Update active state
            currencyOptions.forEach(opt => opt.classList.remove('active'));
            this.classList.add('active');
            
            // Convert and update display
            convertAndUpdateCurrency(currency, symbol);
        });
    });
    
    // Close panel buttons
    if (closePanelBtn) {
        closePanelBtn.addEventListener('click', hideCurrencyConversionPanel);
    }
    
    if (cancelConversionBtn) {
        cancelConversionBtn.addEventListener('click', hideCurrencyConversionPanel);
    }
    
    // Apply conversion
    if (applyConversionBtn) {
        applyConversionBtn.addEventListener('click', () => {
            const targetCurrency = targetCurrencySelect.value;
            const rate = parseFloat(conversionRateInput.value);
            
            if (rate && rate > 0) {
                currencyRates[targetCurrency] = rate;
                convertAndUpdateCurrency(targetCurrency, getCurrencySymbol(targetCurrency));
                hideCurrencyConversionPanel();
                if (typeof showModalNotification === 'function') {
                    showModalNotification(`Currency converted to ${targetCurrency}`, 'success');
                }
            } else {
                if (typeof showModalNotification === 'function') {
                    showModalNotification('Please enter a valid exchange rate', 'error');
                }
            }
        });
    }
    
    // Update rate display when input changes
    if (conversionRateInput && rateDisplay) {
        conversionRateInput.addEventListener('input', function() {
            const rate = parseFloat(this.value) || 1.08;
            rateDisplay.textContent = rate.toFixed(2);
        });
    }
    
    // Update target currency when select changes
    if (targetCurrencySelect && conversionRateInput && rateDisplay) {
        targetCurrencySelect.addEventListener('change', function() {
            const currency = this.value;
            conversionRateInput.value = currencyRates[currency] || 1.08;
            rateDisplay.textContent = (currencyRates[currency] || 1.08).toFixed(2);
        });
    }
    
    // Close panel when clicking outside
    document.addEventListener('click', function(e) {
        if (conversionPanel && conversionPanel.classList.contains('show')) {
            if (!conversionPanel.contains(e.target) && 
                !e.target.closest('.currency-selector-btn')) {
                hideCurrencyConversionPanel();
            }
        }
    });
    
    console.log('Band Details: Currency conversion initialized');
}

// Show currency conversion panel
function showCurrencyConversionPanel() {
    const panel = document.getElementById('currency-conversion-panel');
    if (panel) {
        panel.classList.add('show');
        
        // Initialize values
        const targetCurrencySelect = document.getElementById('target-currency');
        const conversionRateInput = document.getElementById('conversion-rate');
        const rateDisplay = document.getElementById('rate-display');
        
        if (targetCurrencySelect) {
            targetCurrencySelect.value = 'USD';
        }
        
        if (conversionRateInput) {
            conversionRateInput.value = currencyRates.USD;
        }
        
        if (rateDisplay) {
            rateDisplay.textContent = currencyRates.USD.toFixed(2);
        }
    }
}

// Hide currency conversion panel
function hideCurrencyConversionPanel() {
    const panel = document.getElementById('currency-conversion-panel');
    if (panel) {
        panel.classList.remove('show');
    }
}

// Convert and update currency display
function convertAndUpdateCurrency(targetCurrency, symbol) {
    const monthlyCostCard = document.getElementById('overview-stat-monthly-cost');
    if (!monthlyCostCard) {
        console.error('Monthly cost card not found');
        return;
    }
    
    const originalValue = monthlyCostCard.getAttribute('data-metric');
    const currentRate = currencyRates[currentCurrency] || 1;
    const targetRate = currencyRates[targetCurrency] || 1;
    
    // Calculate converted value
    const convertedValue = (parseFloat(originalValue) * targetRate / currentRate).toFixed(0);
    
    // Update display
    const costValueElement = document.getElementById('overview-stat-cost-value');
    if (costValueElement) {
        costValueElement.textContent = `${symbol}${parseInt(convertedValue).toLocaleString()}`;
    }
    
    // Update current currency
    currentCurrency = targetCurrency;
    
    // Update card data attribute
    monthlyCostCard.setAttribute('data-currency', targetCurrency);
    
    console.log(`Band Details: Converted currency to ${targetCurrency} at rate ${targetRate}`);
}

// Get currency symbol
function getCurrencySymbol(currency) {
    const symbols = {
        'EUR': '€',
        'USD': '$',
        'GBP': '£',
        'AED': 'د.إ',
        'AUD': 'A$'
    };
    return symbols[currency] || currency;
}

// Refresh Overview
function refreshOverview() {
    console.log('Band Details: Refreshing overview data...');
    if (typeof showModalNotification === 'function') {
        showModalNotification('Refreshing overview data...', 'info');
    }
    
    // Simulate API call delay
    setTimeout(() => {
        updateOverviewStats();
        updateOverviewData();
        if (typeof showModalNotification === 'function') {
            showModalNotification('Overview data refreshed successfully!', 'success');
        }
    }, 800);
}

// Export Overview
function exportOverview() {
    console.log('Band Details: Exporting overview data...');
    
    // Create export data
    const exportData = {
        timestamp: new Date().toISOString(),
        customer: document.getElementById('overview-customer-select')?.value || 'All customers',
        account: document.getElementById('overview-account-select')?.value || 'hcl_abbvie',
        stats: {
            totalResources: 8,
            monthlyCost: 25420,
            utilization: 92,
            slaCompliance: 88
        }
    };
    
    // Create and trigger download
    const dataStr = JSON.stringify(exportData, null, 2);
    const dataUri = 'data:application/json;charset=utf-8,'+ encodeURIComponent(dataStr);
    
    const exportFileDefaultName = 'overview-export-' + new Date().toISOString().slice(0,10) + '.json';
    
    const linkElement = document.createElement('a');
    linkElement.setAttribute('href', dataUri);
    linkElement.setAttribute('download', exportFileDefaultName);
    linkElement.click();
    
    if (typeof showModalNotification === 'function') {
        showModalNotification('Overview data exported successfully!', 'success');
    }
}

// Update Overview Data based on filters
function updateOverviewData() {
    console.log('Band Details: Updating overview data based on filters...');
    
    const customerSelect = document.getElementById('overview-customer-select');
    const accountSelect = document.getElementById('overview-account-select');
    const ticketSelect = document.getElementById('overview-ticket-select');
    
    const customer = customerSelect ? customerSelect.value : 'All customers';
    const account = accountSelect ? accountSelect.value : 'hcl_abbvie';
    const ticket = ticketSelect ? ticketSelect.value : '';
    
    console.log(`Filters - Customer: ${customer}, Account: ${account}, Ticket: ${ticket}`);
    
    // In a real implementation, this would make an API call
    // For now, simulate data update
    if (overviewSearchActive && overviewSearchTerm) {
        // Re-apply search filter if search is active
        filterOverviewContent(overviewSearchTerm);
    }
}

// Overview Tab Search Functionality
function initializeOverviewSearch() {
    console.log('Band Details: Initializing overview search...');
    
    const searchInput = document.getElementById('overview-global-search');
    const searchClearBtn = document.getElementById('overview-search-clear');
    const suggestionsBtn = document.getElementById('overview-search-suggestions');
    const suggestionsContainer = document.getElementById('overview-search-suggestions-container');
    const suggestionTags = document.querySelectorAll('.suggestion-tag');
    
    if (!searchInput) {
        console.error('Band Details: Overview search input not found');
        return;
    }
    
    // Initialize clear button visibility
    if (searchClearBtn) {
        searchClearBtn.style.display = 'none';
    }
    
    // Real-time search filtering
    searchInput.addEventListener('input', function() {
        const searchTerm = this.value.toLowerCase().trim();
        overviewSearchTerm = searchTerm;
        
        if (searchTerm.length > 0) {
            overviewSearchActive = true;
            if (searchClearBtn) searchClearBtn.style.display = 'flex';
            filterOverviewContent(searchTerm);
            showSearchResultsInfo(searchTerm);
        } else {
            overviewSearchActive = false;
            if (searchClearBtn) searchClearBtn.style.display = 'none';
            resetOverviewContent();
            hideSearchResultsInfo();
        }
    });
    
    // Clear search
    if (searchClearBtn) {
        searchClearBtn.addEventListener('click', function() {
            searchInput.value = '';
            searchInput.focus();
            overviewSearchActive = false;
            overviewSearchTerm = '';
            this.style.display = 'none';
            resetOverviewContent();
            hideSearchResultsInfo();
        });
    }
    
    // Show/hide suggestions
    if (suggestionsBtn && suggestionsContainer) {
        suggestionsBtn.addEventListener('click', function(e) {
            e.stopPropagation();
            suggestionsContainer.classList.toggle('show');
            const icon = this.querySelector('i');
            if (icon) {
                icon.classList.toggle('fa-chevron-down');
                icon.classList.toggle('fa-chevron-up');
            }
        });
    }
    
    // Click on suggestion tags
    suggestionTags.forEach(tag => {
        tag.addEventListener('click', function() {
            const searchText = this.getAttribute('data-search');
            if (searchInput) {
                searchInput.value = searchText;
                searchInput.focus();
                overviewSearchTerm = searchText.toLowerCase();
                overviewSearchActive = true;
                
                // Trigger input event to apply filter
                const event = new Event('input', { bubbles: true });
                searchInput.dispatchEvent(event);
            }
            
            if (searchClearBtn) searchClearBtn.style.display = 'flex';
            
            if (suggestionsContainer) {
                suggestionsContainer.classList.remove('show');
                if (suggestionsBtn) {
                    const icon = suggestionsBtn.querySelector('i');
                    if (icon) {
                        icon.classList.remove('fa-chevron-up');
                        icon.classList.add('fa-chevron-down');
                    }
                }
            }
        });
    });
    
    // Close suggestions when clicking outside
    document.addEventListener('click', function(event) {
        if (suggestionsContainer && suggestionsBtn && searchInput) {
            if (!suggestionsContainer.contains(event.target) && 
                !suggestionsBtn.contains(event.target) && 
                !searchInput.contains(event.target)) {
                suggestionsContainer.classList.remove('show');
                const icon = suggestionsBtn.querySelector('i');
                if (icon) {
                    icon.classList.remove('fa-chevron-up');
                    icon.classList.add('fa-chevron-down');
                }
            }
        }
    });
    
    // Search on Enter key
    searchInput.addEventListener('keydown', function(e) {
        if (e.key === 'Enter') {
            e.preventDefault();
            const searchTerm = this.value.toLowerCase().trim();
            if (searchTerm) {
                overviewSearchTerm = searchTerm;
                overviewSearchActive = true;
                filterOverviewContent(searchTerm);
                showSearchResultsInfo(searchTerm);
                
                // Close suggestions if open
                if (suggestionsContainer) {
                    suggestionsContainer.classList.remove('show');
                    if (suggestionsBtn) {
                        const icon = suggestionsBtn.querySelector('i');
                        if (icon) {
                            icon.classList.remove('fa-chevron-up');
                            icon.classList.add('fa-chevron-down');
                        }
                    }
                }
            }
        }
        
        // Escape key clears search
        if (e.key === 'Escape') {
            if (this.value) {
                this.value = '';
                overviewSearchActive = false;
                overviewSearchTerm = '';
                if (searchClearBtn) searchClearBtn.style.display = 'none';
                resetOverviewContent();
                hideSearchResultsInfo();
                
                // Trigger input event
                const event = new Event('input', { bubbles: true });
                this.dispatchEvent(event);
            }
        }
    });
    
    // Focus styles
    searchInput.addEventListener('focus', function() {
        const parent = this.parentElement;
        if (parent) parent.classList.add('focused');
    });
    
    searchInput.addEventListener('blur', function() {
        const parent = this.parentElement;
        if (parent) parent.classList.remove('focused');
    });
    
    console.log('Band Details: Overview search initialized');
}

// Filter overview content based on search term
function filterOverviewContent(searchTerm) {
    console.log(`Band Details: Filtering overview with search term: "${searchTerm}"`);
    
    let visibleCount = 0;
    let totalCount = 0;
    
    // Filter stats cards
    const statCards = document.querySelectorAll('.overview-stats-grid .stat-card');
    statCards.forEach(card => {
        totalCount++;
        const cardText = card.textContent.toLowerCase();
        const isVisible = cardText.includes(searchTerm);
        
        if (isVisible) {
            card.style.display = 'flex';
            card.style.opacity = '1';
            card.style.order = '0';
            visibleCount++;
        } else {
            card.style.display = 'none';
            card.style.opacity = '0.3';
        }
    });
    
    // Filter action cards
    const actionCards = document.querySelectorAll('.overview-actions-grid .action-card');
    actionCards.forEach(card => {
        totalCount++;
        const cardText = card.textContent.toLowerCase();
        const isVisible = cardText.includes(searchTerm);
        
        if (isVisible) {
            card.style.display = 'flex';
            card.style.opacity = '1';
            card.style.order = '0';
            visibleCount++;
        } else {
            card.style.display = 'none';
            card.style.opacity = '0.3';
        }
    });
    
    // Filter activity items
    const activityItems = document.querySelectorAll('.activity-list .activity-item');
    activityItems.forEach(item => {
        totalCount++;
        const itemText = item.textContent.toLowerCase();
        const isVisible = itemText.includes(searchTerm);
        
        if (isVisible) {
            item.style.display = 'flex';
            item.style.opacity = '1';
            visibleCount++;
        } else {
            item.style.display = 'none';
            item.style.opacity = '0.3';
        }
    });
    
    // Highlight search term in content
    highlightSearchTerm(searchTerm);
    
    // Update search results info
    updateSearchResultsInfo(visibleCount, totalCount, searchTerm);
}

// Reset overview content after clearing search
function resetOverviewContent() {
    console.log('Band Details: Resetting overview content');
    
    // Reset stats cards
    const statCards = document.querySelectorAll('.overview-stats-grid .stat-card');
    statCards.forEach(card => {
        card.style.display = 'flex';
        card.style.opacity = '1';
        card.style.order = '';
    });
    
    // Reset action cards
    const actionCards = document.querySelectorAll('.overview-actions-grid .action-card');
    actionCards.forEach(card => {
        card.style.display = 'flex';
        card.style.opacity = '1';
        card.style.order = '';
    });
    
    // Reset activity items
    const activityItems = document.querySelectorAll('.activity-list .activity-item');
    activityItems.forEach(item => {
        item.style.display = 'flex';
        item.style.opacity = '1';
    });
    
    // Remove highlights
    removeSearchHighlights();
    
    // Hide search results info
    hideSearchResultsInfo();
}

// Highlight search term in content
function highlightSearchTerm(searchTerm) {
    if (!searchTerm || searchTerm.length < 2) return;
    
    // Remove existing highlights first
    removeSearchHighlights();
    
    try {
        // Escape special regex characters
        const escapedTerm = searchTerm.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
        const regex = new RegExp(`(${escapedTerm})`, 'gi');
        
        // Highlight in stat content
        const statContents = document.querySelectorAll('.stat-content');
        statContents.forEach(container => {
            highlightTextInElement(container, regex);
        });
        
        // Highlight in action content
        const actionContents = document.querySelectorAll('.action-content');
        actionContents.forEach(container => {
            highlightTextInElement(container, regex);
        });
        
        // Highlight in activity content
        const activityContents = document.querySelectorAll('.activity-content');
        activityContents.forEach(container => {
            highlightTextInElement(container, regex);
        });
    } catch (error) {
        console.error('Band Details: Error highlighting search term:', error);
    }
}

// Helper function to highlight text in an element
function highlightTextInElement(element, regex) {
    const walker = document.createTreeWalker(
        element,
        NodeFilter.SHOW_TEXT,
        null,
        false
    );
    
    const nodes = [];
    let node;
    while (node = walker.nextNode()) {
        nodes.push(node);
    }
    
    nodes.forEach(node => {
        if (node.parentNode.classList && node.parentNode.classList.contains('search-highlight')) {
            return; // Skip already highlighted nodes
        }
        
        const text = node.textContent;
        if (regex.test(text)) {
            regex.lastIndex = 0; // Reset regex
            const newHTML = text.replace(regex, '<span class="search-highlight">$1</span>');
            const span = document.createElement('span');
            span.innerHTML = newHTML;
            node.parentNode.replaceChild(span, node);
        }
    });
}

// Remove all search highlights
function removeSearchHighlights() {
    const highlightedElements = document.querySelectorAll('.search-highlight');
    highlightedElements.forEach(element => {
        const parent = element.parentNode;
        const text = document.createTextNode(element.textContent);
        parent.replaceChild(text, element);
        
        // If parent is a span that only contained the highlight, replace it with text
        if (parent.tagName === 'SPAN' && parent.classList.length === 1 && parent.classList.contains('search-highlight-wrapper')) {
            parent.parentNode.replaceChild(text, parent);
        }
    });
    
    // Normalize text nodes
    document.querySelectorAll('.stat-content, .action-content, .activity-content').forEach(el => {
        el.normalize();
    });
}

// Show search results info
function showSearchResultsInfo(searchTerm) {
    let infoContainer = document.getElementById('overview-search-results-info');
    
    if (!infoContainer) {
        infoContainer = document.createElement('div');
        infoContainer.id = 'overview-search-results-info';
        infoContainer.className = 'search-results-info';
        
        const searchSection = document.querySelector('.search-box-section');
        if (searchSection) {
            searchSection.parentNode.insertBefore(infoContainer, searchSection.nextSibling);
        }
        
        // Add styles for search results info
        const style = document.createElement('style');
        style.textContent = `
            .search-results-info {
                padding: 10px 15px;
                margin: 10px 0;
                border-radius: 6px;
                font-size: 0.9rem;
                display: none;
                align-items: center;
                gap: 10px;
                border: 1px solid transparent;
                transition: all 0.3s ease;
            }
            .search-results-info.show {
                display: flex;
            }
            .search-results-info i {
                font-size: 1rem;
            }
            .search-highlight {
                background-color: #ffeb3b;
                padding: 2px 0;
                border-radius: 2px;
                font-weight: bold;
            }
        `;
        document.head.appendChild(style);
    }
    
    infoContainer.classList.add('show');
}

// Update search results info
function updateSearchResultsInfo(visible, total, searchTerm) {
    const infoContainer = document.getElementById('overview-search-results-info');
    if (!infoContainer) return;
    
    if (visible === total) {
        infoContainer.innerHTML = `
            <i class="fas fa-check-circle"></i>
            <span>Showing all ${total} items for "${searchTerm}"</span>
        `;
        infoContainer.style.backgroundColor = '#f0f9f0';
        infoContainer.style.borderColor = '#2d6a2d';
        infoContainer.style.color = '#2d6a2d';
    } else if (visible > 0) {
        infoContainer.innerHTML = `
            <i class="fas fa-filter"></i>
            <span>Showing ${visible} of ${total} items for "${searchTerm}"</span>
        `;
        infoContainer.style.backgroundColor = '#f9f0e8';
        infoContainer.style.borderColor = '#b85c1e';
        infoContainer.style.color = '#b85c1e';
    } else {
        infoContainer.innerHTML = `
            <i class="fas fa-exclamation-circle"></i>
            <span>No results found for "${searchTerm}"</span>
        `;
        infoContainer.style.backgroundColor = '#f9e8e8';
        infoContainer.style.borderColor = '#a52a2a';
        infoContainer.style.color = '#a52a2a';
    }
}

// Hide search results info
function hideSearchResultsInfo() {
    const infoContainer = document.getElementById('overview-search-results-info');
    if (infoContainer) {
        infoContainer.classList.remove('show');
    }
}

// Show modal notification (fallback if global function doesn't exist)
function showModalNotification(message, type = 'info') {
    // Check if global function exists
    if (typeof window.showModalNotification === 'function') {
        window.showModalNotification(message, type);
        return;
    }
    
    // Create temporary notification
    const notification = document.createElement('div');
    notification.className = `temp-notification ${type}`;
    notification.innerHTML = `
        <i class="fas ${type === 'success' ? 'fa-check-circle' : type === 'error' ? 'fa-exclamation-circle' : 'fa-info-circle'}"></i>
        <span>${message}</span>
    `;
    
    // Style the notification
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        padding: 12px 20px;
        background: ${type === 'success' ? '#4caf50' : type === 'error' ? '#f44336' : '#2196f3'};
        color: white;
        border-radius: 6px;
        box-shadow: 0 4px 12px rgba(0,0,0,0.15);
        display: flex;
        align-items: center;
        gap: 10px;
        z-index: 100000;
        animation: slideInRight 0.3s ease-out;
        font-size: 14px;
    `;
    
    document.body.appendChild(notification);
    
    // Remove after 3 seconds
    setTimeout(() => {
        notification.style.animation = 'slideOutRight 0.3s ease-out';
        setTimeout(() => {
            notification.remove();
        }, 300);
    }, 3000);
}

// Update modal title (fallback)
function updateModalTitle() {
    if (typeof window.updateModalTitle === 'function') {
        window.updateModalTitle();
    }
}

// Update modal status (fallback)
function updateModalStatus(tabName) {
    if (typeof window.updateModalStatus === 'function') {
        window.updateModalStatus(tabName);
    }
}

// Switch modal tab (fallback)
function switchModalTab(tabName) {
    if (typeof window.switchModalTab === 'function') {
        window.switchModalTab(tabName);
    } else {
        console.log(`Switching to ${tabName} tab`);
        // Implement basic tab switching
        const tabs = document.querySelectorAll('.modal-tab');
        const tabContents = document.querySelectorAll('.modal-tab-content');
        
        tabs.forEach(tab => {
            if (tab.getAttribute('data-tab') === tabName) {
                tab.classList.add('active');
            } else {
                tab.classList.remove('active');
            }
        });
        
        tabContents.forEach(content => {
            if (content.id === `${tabName}-tab-content`) {
                content.classList.add('active');
            } else {
                content.classList.remove('active');
            }
        });
    }
}

// Auto-initialize when DOM is ready
document.addEventListener('DOMContentLoaded', function() {
    // Check if overview tab is active
    const overviewTab = document.getElementById('overview-tab-content');
    if (overviewTab && overviewTab.classList.contains('active')) {
        initializeOverviewTab();
    }
});

// Export functions for global access
if (typeof window !== 'undefined') {
    window.initializeOverviewTab = initializeOverviewTab;
    window.refreshOverview = refreshOverview;
    window.exportOverview = exportOverview;
    window.filterOverviewContent = filterOverviewContent;
    window.resetOverviewContent = resetOverviewContent;
    window.updateOverviewStats = updateOverviewStats;
    window.showStatDetails = showStatDetails;
    window.drillDownStat = drillDownStat;
    window.convertAndUpdateCurrency = convertAndUpdateCurrency;
}

console.log('Band Details: Overview tab functions loaded');