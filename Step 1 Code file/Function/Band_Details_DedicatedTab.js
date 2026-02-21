/**
 * Band Details - Dedicated Tab Functionality
 * File: Band_Details_DedicatedTab.js
 */

// Dedicated Tab Variables
let dedicatedData = [];
let filteredDedicatedData = [];
let currentSortField = 'technician';
let currentSortOrder = 'asc';
let dedicatedSelectedRows = new Set();
let currencyRates = {
    EUR: 1,
    USD: 1.08,
    GBP: 0.85,
    ZAR: 20.2,
    AED: 4.02
};

// Initialize Dedicated Tab
function initializeDedicatedTab() {
    console.log('Band Details: Initializing Dedicated tab...');
    
    // Load sample data
    loadSampleDedicatedData();
    
    // Setup event listeners
    setupDedicatedEventListeners();
    
    // Render table
    renderDedicatedTable();
    
    // Update summary
    updateDedicatedSummary();
    
    console.log('Band Details: Dedicated tab initialized successfully');
}

/// Update the loadSampleDedicatedData function with all new fields
function loadSampleDedicatedData() {
    dedicatedData = [
        {
            id: 1,
            technicianName: "John Doe",
            country: "Germany",
            band: "2",
            variant: "With Backfill",
            monthlyRate: 3591.49,
            workingDays: 22,
            workedDays: 21,
            dailyRate: 163.25,
            actualCost: 3324.64,
            currency: "EUR",
            holidayDays: 1,
            totalCostExcel: 3324.64,
            slaPercentage: 100,
            slaMet: "Yes",
            serviceMonth: "Aug-25",
            remarks: "",
            convertedCurrency: "USD",
            conversionRate: 1.08,
            convertedMonthlyRate: 3878.81,
            convertedDailyRate: 176.31,
            convertedActualCost: 3590.61,
            adjustedWorkingDays: 21,
            adjustedDailyRate: 171.02,
            // New fields from your data
            otHours: 0,
            otPerHourRate: 0,
            otHoursCost: 0,
            weekendOtHours: 0,
            weekendRate: 0,
            weekendCost: 0,
            travelExtraCost: 0,
            taxPercentage: 0,
            taxCost: 0,
            totalCost: 3324.64,
            slaReason: "",
            attendanceApproved: "Yes",
            originalCurrency: "EUR"
        },
        {
            id: 2,
            technicianName: "Jane Smith",
            country: "South Africa",
            band: "1",
            variant: "Without Backfill",
            monthlyRate: 3162.50,
            workingDays: 22,
            workedDays: 21,
            dailyRate: 143.75,
            actualCost: 3021.75,
            currency: "ZAR",
            holidayDays: 0,
            totalCostExcel: 57678.28,
            slaPercentage: 100,
            slaMet: "Yes",
            serviceMonth: "Aug-25",
            remarks: "",
            convertedCurrency: "USD",
            conversionRate: 0.055,
            convertedMonthlyRate: 173.94,
            convertedDailyRate: 7.91,
            convertedActualCost: 166.11,
            adjustedWorkingDays: 22,
            adjustedDailyRate: 143.75,
            // New fields
            otHours: 0,
            otPerHourRate: 0,
            otHoursCost: 0,
            weekendOtHours: 0,
            weekendRate: 0,
            weekendCost: 0,
            travelExtraCost: 0,
            taxPercentage: 0,
            taxCost: 0,
            totalCost: 57678.28,
            slaReason: "",
            attendanceApproved: "Yes",
            originalCurrency: "ZAR"
        },
        {
            id: 3,
            technicianName: "Robert Johnson",
            country: "UK",
            band: "3",
            variant: "With Backfill",
            monthlyRate: 1208.92,
            workingDays: 22,
            workedDays: 21,
            dailyRate: 54.95,
            actualCost: 1119.10,
            currency: "EUR",
            holidayDays: 0,
            totalCostExcel: 1208.63,
            slaPercentage: 95,
            slaMet: "Yes",
            serviceMonth: "Aug-25",
            remarks: "Adding 8% sales tax from UK to Nigeria",
            convertedCurrency: "USD",
            conversionRate: 1.08,
            convertedMonthlyRate: 1305.63,
            convertedDailyRate: 59.35,
            convertedActualCost: 1208.63,
            adjustedWorkingDays: 22,
            adjustedDailyRate: 54.95,
            // New fields
            otHours: 0,
            otPerHourRate: 0,
            otHoursCost: 0,
            weekendOtHours: 0,
            weekendRate: 0,
            weekendCost: 0,
            travelExtraCost: 0,
            taxPercentage: 8,
            taxCost: 89.53,
            totalCost: 1208.63,
            slaReason: "UK to Nigeria sales tax",
            attendanceApproved: "Yes",
            originalCurrency: "EUR"
        },
        {
            id: 4,
            technicianName: "Alice Brown",
            country: "France",
            band: "2",
            variant: "Without Backfill",
            monthlyRate: 5572.40,
            workingDays: 22,
            workedDays: 21,
            dailyRate: 253.29,
            actualCost: 5158.37,
            currency: "EUR",
            holidayDays: 0,
            totalCostExcel: 5158.37,
            slaPercentage: 100,
            slaMet: "Yes",
            serviceMonth: "Aug-25",
            remarks: "",
            convertedCurrency: "USD",
            conversionRate: 1.08,
            convertedMonthlyRate: 6018.19,
            convertedDailyRate: 273.55,
            convertedActualCost: 5744.55,
            adjustedWorkingDays: 22,
            adjustedDailyRate: 253.29,
            // New fields
            otHours: 0,
            otPerHourRate: 0,
            otHoursCost: 0,
            weekendOtHours: 0,
            weekendRate: 0,
            weekendCost: 0,
            travelExtraCost: 0,
            taxPercentage: 0,
            taxCost: 0,
            totalCost: 5158.37,
            slaReason: "",
            attendanceApproved: "Yes",
            originalCurrency: "EUR"
        },
        {
            id: 5,
            technicianName: "Charlie Wilson",
            country: "Spain",
            band: "2",
            variant: "With Backfill",
            monthlyRate: 5572.40,
            workingDays: 22,
            workedDays: 21,
            dailyRate: 253.29,
            actualCost: 5158.37,
            currency: "EUR",
            holidayDays: 0,
            totalCostExcel: 5158.37,
            slaPercentage: 100,
            slaMet: "Yes",
            serviceMonth: "Sep-25",
            remarks: "Start date 2 Sept 25",
            convertedCurrency: "USD",
            conversionRate: 1.08,
            convertedMonthlyRate: 6018.19,
            convertedDailyRate: 273.55,
            convertedActualCost: 5744.55,
            adjustedWorkingDays: 22,
            adjustedDailyRate: 253.29,
            // New fields
            otHours: 0,
            otPerHourRate: 0,
            otHoursCost: 0,
            weekendOtHours: 0,
            weekendRate: 0,
            weekendCost: 0,
            travelExtraCost: 0,
            taxPercentage: 0,
            taxCost: 0,
            totalCost: 5158.37,
            slaReason: "",
            attendanceApproved: "Yes",
            originalCurrency: "EUR"
        },
        {
            id: 6,
            technicianName: "David Lee",
            country: "Italy",
            band: "3",
            variant: "Without Backfill",
            monthlyRate: 7819.56,
            workingDays: 22,
            workedDays: 21,
            dailyRate: 355.43,
            actualCost: 7222.85,
            currency: "EUR",
            holidayDays: 0,
            totalCostExcel: 7222.85,
            slaPercentage: 100,
            slaMet: "Yes",
            serviceMonth: "Aug-25",
            remarks: "",
            convertedCurrency: "USD",
            conversionRate: 1.08,
            convertedMonthlyRate: 8445.12,
            convertedDailyRate: 383.87,
            convertedActualCost: 7800.68,
            adjustedWorkingDays: 22,
            adjustedDailyRate: 355.43,
            // New fields
            otHours: 0,
            otPerHourRate: 0,
            otHoursCost: 0,
            weekendOtHours: 0,
            weekendRate: 0,
            weekendCost: 0,
            travelExtraCost: 0,
            taxPercentage: 0,
            taxCost: 0,
            totalCost: 7222.85,
            slaReason: "",
            attendanceApproved: "Yes",
            originalCurrency: "EUR"
        },
        {
            id: 7,
            technicianName: "Emma Garcia",
            country: "Netherlands",
            band: "3",
            variant: "With Backfill",
            monthlyRate: 7898.52,
            workingDays: 22,
            workedDays: 21,
            dailyRate: 359.02,
            actualCost: 7295.78,
            currency: "EUR",
            holidayDays: 0,
            totalCostExcel: 7295.78,
            slaPercentage: 100,
            slaMet: "Yes",
            serviceMonth: "Aug-25",
            remarks: "",
            convertedCurrency: "USD",
            conversionRate: 1.08,
            convertedMonthlyRate: 8530.40,
            convertedDailyRate: 387.75,
            convertedActualCost: 7881.44,
            adjustedWorkingDays: 22,
            adjustedDailyRate: 359.02,
            // New fields
            otHours: 0,
            otPerHourRate: 0,
            otHoursCost: 0,
            weekendOtHours: 0,
            weekendRate: 0,
            weekendCost: 0,
            travelExtraCost: 0,
            taxPercentage: 0,
            taxCost: 0,
            totalCost: 7295.78,
            slaReason: "",
            attendanceApproved: "Yes",
            originalCurrency: "EUR"
        },
        {
            id: 8,
            technicianName: "Frank Miller",
            country: "Belgium",
            band: "4",
            variant: "Without Backfill",
            monthlyRate: 8617.45,
            workingDays: 22,
            workedDays: 21,
            dailyRate: 391.70,
            actualCost: 7959.85,
            currency: "EUR",
            holidayDays: 0,
            totalCostExcel: 7959.85,
            slaPercentage: 100,
            slaMet: "Yes",
            serviceMonth: "Aug-25",
            remarks: "",
            convertedCurrency: "USD",
            conversionRate: 1.08,
            convertedMonthlyRate: 9306.84,
            convertedDailyRate: 423.04,
            convertedActualCost: 8596.64,
            adjustedWorkingDays: 22,
            adjustedDailyRate: 391.70,
            // New fields
            otHours: 0,
            otPerHourRate: 0,
            otHoursCost: 0,
            weekendOtHours: 0,
            weekendRate: 0,
            weekendCost: 0,
            travelExtraCost: 0,
            taxPercentage: 0,
            taxCost: 0,
            totalCost: 7959.85,
            slaReason: "",
            attendanceApproved: "Yes",
            originalCurrency: "EUR"
        },
        {
            id: 9,
            technicianName: "Grace Taylor",
            country: "Switzerland",
            band: "4",
            variant: "With Backfill",
            monthlyRate: 12499.98,
            workingDays: 22,
            workedDays: 21,
            dailyRate: 568.18,
            actualCost: 11546.11,
            currency: "EUR",
            holidayDays: 0,
            totalCostExcel: 11546.11,
            slaPercentage: 100,
            slaMet: "Yes",
            serviceMonth: "Aug-25",
            remarks: "",
            convertedCurrency: "USD",
            conversionRate: 1.08,
            convertedMonthlyRate: 13499.98,
            convertedDailyRate: 613.64,
            convertedActualCost: 12469.80,
            adjustedWorkingDays: 22,
            adjustedDailyRate: 568.18,
            // New fields
            otHours: 0,
            otPerHourRate: 0,
            otHoursCost: 0,
            weekendOtHours: 0,
            weekendRate: 0,
            weekendCost: 0,
            travelExtraCost: 0,
            taxPercentage: 0,
            taxCost: 0,
            totalCost: 11546.11,
            slaReason: "",
            attendanceApproved: "Yes",
            originalCurrency: "EUR"
        },
        {
            id: 10,
            technicianName: "Henry Clark",
            country: "UAE",
            band: "1",
            variant: "Without Backfill",
            monthlyRate: 1263.21,
            workingDays: 22,
            workedDays: 9,
            dailyRate: 57.42,
            actualCost: 4639.14,
            currency: "AED",
            holidayDays: 0,
            totalCostExcel: 4639.14,
            slaPercentage: 100,
            slaMet: "Yes",
            serviceMonth: "Aug-25",
            remarks: "Start date 19 Aug 25",
            convertedCurrency: "USD",
            conversionRate: 0.2723,
            convertedMonthlyRate: 343.92,
            convertedDailyRate: 15.63,
            convertedActualCost: 1263.21,
            adjustedWorkingDays: 9,
            adjustedDailyRate: 140.36,
            // New fields
            otHours: 0,
            otPerHourRate: 0,
            otHoursCost: 0,
            weekendOtHours: 0,
            weekendRate: 0,
            weekendCost: 0,
            travelExtraCost: 0,
            taxPercentage: 0,
            taxCost: 0,
            totalCost: 4639.14,
            slaReason: "",
            attendanceApproved: "Yes",
            originalCurrency: "AED"
        },
        {
            id: 11,
            technicianName: "Ian Parker",
            country: "UAE",
            band: "1",
            variant: "Gate Pass",
            monthlyRate: 70,
            workingDays: 0,
            workedDays: "NA",
            dailyRate: 0,
            actualCost: 257.08,
            currency: "AED",
            holidayDays: 0,
            totalCostExcel: 257.08,
            slaPercentage: 100,
            slaMet: "Yes",
            serviceMonth: "Aug-25",
            remarks: "Gate pass 6 months for Jebel freezone",
            convertedCurrency: "USD",
            conversionRate: 0.2723,
            convertedMonthlyRate: 19.06,
            convertedDailyRate: 0,
            convertedActualCost: 70,
            adjustedWorkingDays: 0,
            adjustedDailyRate: 0,
            // New fields
            otHours: 0,
            otPerHourRate: 0,
            otHoursCost: 0,
            weekendOtHours: 0,
            weekendRate: 0,
            weekendCost: 0,
            travelExtraCost: 0,
            taxPercentage: 0,
            taxCost: 0,
            totalCost: 257.08,
            slaReason: "",
            attendanceApproved: "Yes",
            originalCurrency: "AED"
        }
    ];
    
    filteredDedicatedData = [...dedicatedData];
    console.log('Band Details: Loaded sample data with', dedicatedData.length, 'records including new fields');
}

// Setup Dedicated Event Listeners
function setupDedicatedEventListeners() {
    console.log('Band Details: Setting up dedicated event listeners...');
    
    // Import CSV Button
    const importCsvBtn = document.getElementById('dedicated-import-csv-btn');
    if (importCsvBtn) {
        importCsvBtn.addEventListener('click', showUploadModal);
    }
    
    // Load Data Button
    const loadDataBtn = document.getElementById('dedicated-load-data-btn');
    if (loadDataBtn) {
        loadDataBtn.addEventListener('click', showVersionModal);
    }
    
    // Search Input
    const searchInput = document.getElementById('dedicated-search-input');
    if (searchInput) {
        searchInput.addEventListener('input', function() {
            filterDedicatedData(this.value);
        });
    }
    
    // Search Clear Button
    const searchClearBtn = document.getElementById('dedicated-search-clear');
    if (searchClearBtn) {
        searchClearBtn.addEventListener('click', function() {
            const searchInput = document.getElementById('dedicated-search-input');
            if (searchInput) {
                searchInput.value = '';
                filterDedicatedData('');
            }
        });
    }
    
    // Sort Dropdown Button
    const sortDropdownBtn = document.getElementById('dedicated-sort-dropdown-btn');
    const sortDropdownMenu = document.getElementById('dedicated-sort-dropdown-menu');
    
    if (sortDropdownBtn && sortDropdownMenu) {
        // Toggle dropdown
        sortDropdownBtn.addEventListener('click', function(e) {
            e.stopPropagation();
            sortDropdownMenu.classList.toggle('show');
            sortDropdownBtn.classList.toggle('active');
        });
        
        // Close dropdown when clicking outside
        document.addEventListener('click', function(e) {
            if (!sortDropdownBtn.contains(e.target) && !sortDropdownMenu.contains(e.target)) {
                sortDropdownMenu.classList.remove('show');
                sortDropdownBtn.classList.remove('active');
            }
        });
        
        // Handle sort option clicks
        const sortOptions = sortDropdownMenu.querySelectorAll('.dedicated-sort-option');
        sortOptions.forEach(option => {
            option.addEventListener('click', function(e) {
                e.preventDefault();
                currentSortField = this.getAttribute('data-sort');
                currentSortOrder = this.getAttribute('data-order');
                
                // Update button text
                const sortText = this.textContent;
                const icon = sortDropdownBtn.querySelector('i.fa-sort-amount-down-alt');
                sortDropdownBtn.innerHTML = `<i class="${icon.className}"></i> ${sortText} <i class="fas fa-chevron-down"></i>`;
                
                // Update active state
                sortOptions.forEach(opt => opt.classList.remove('active'));
                this.classList.add('active');
                
                // Sort and render
                sortDedicatedData();
                renderDedicatedTable();
                
                // Close dropdown
                sortDropdownMenu.classList.remove('show');
                sortDropdownBtn.classList.remove('active');
            });
        });
    }
    
    // Recalculate Button
    const recalcBtn = document.getElementById('dedicated-recalculate-btn');
    if (recalcBtn) {
        recalcBtn.addEventListener('click', recalculateDedicatedData);
    }
    
    // Validate Button
    const validateBtn = document.getElementById('dedicated-validate-btn');
    if (validateBtn) {
        validateBtn.addEventListener('click', validateDedicatedData);
    }
    
    // Export Button
    const exportBtn = document.getElementById('dedicated-export-btn');
    if (exportBtn) {
        exportBtn.addEventListener('click', exportDedicatedData);
    }
    
    // Customer Filter
    const customerFilter = document.getElementById('dedicated-customer-filter');
    if (customerFilter) {
        customerFilter.addEventListener('change', filterDedicatedByCustomer);
    }
    
    // Currency Filter
    const currencyFilter = document.getElementById('dedicated-currency-filter');
    if (currencyFilter) {
        currencyFilter.addEventListener('change', filterDedicatedByCurrency);
    }
    
    // Select All Checkbox
    const selectAllCheckbox = document.getElementById('dedicated-select-all');
    if (selectAllCheckbox) {
        selectAllCheckbox.addEventListener('change', function() {
            const checkboxes = document.querySelectorAll('#dedicated-table-body .dedicated-row-checkbox');
            checkboxes.forEach(checkbox => {
                checkbox.checked = this.checked;
                const rowId = parseInt(checkbox.getAttribute('data-row-id'));
                if (this.checked) {
                    dedicatedSelectedRows.add(rowId);
                } else {
                    dedicatedSelectedRows.delete(rowId);
                }
            });
            updateDedicatedSummary();
        });
    }
    
    // Setup version modal event listeners
    setupVersionModalListeners();
    
    // Setup upload modal event listeners
    setupUploadModalListeners();
    
    console.log('Band Details: Dedicated event listeners setup complete');
}

// Render Dedicated Table
function renderDedicatedTable() {
    const tableBody = document.getElementById('dedicated-table-body');
    if (!tableBody) {
        console.error('Dedicated table body not found');
        return;
    }
    
    tableBody.innerHTML = '';
    
    if (filteredDedicatedData.length === 0) {
        tableBody.innerHTML = `
            <tr>
                <td colspan="25" class="dedicated-empty-table-message">
                    <i class="fas fa-database"></i>
                    <p>No dedicated resources found</p>
                    <button class="btn btn-primary" onclick="showUploadModal()">
                        <i class="fas fa-file-import"></i> Import CSV to get started
                    </button>
                </td>
            </tr>
        `;
        return;
    }
    
    filteredDedicatedData.forEach(record => {
        const row = document.createElement('tr');
        row.className = getDedicatedRowClass(record);
        
        // Update the row HTML generation in renderDedicatedTable function
row.innerHTML = `
    <td>
        <input type="checkbox" class="dedicated-row-checkbox" data-row-id="${record.id}"
            ${dedicatedSelectedRows.has(record.id) ? 'checked' : ''}>
    </td>
    <td class="dedicated-editable" data-field="technicianName" data-id="${record.id}">
        ${record.technicianName}
    </td>
    <td class="dedicated-editable" data-field="country" data-id="${record.id}">
        ${record.country}
    </td>
    <td class="dedicated-editable" data-field="band" data-id="${record.id}">
        Band ${record.band}
    </td>
    <td class="dedicated-editable" data-field="variant" data-id="${record.id}">
        ${record.variant}
    </td>
    <td class="dedicated-editable dedicated-currency-cell" data-field="monthlyRate" data-id="${record.id}">
        ${formatCurrency(record.monthlyRate, record.currency)}
    </td>
    <td class="dedicated-editable" data-field="workingDays" data-id="${record.id}">
        ${record.workingDays}
    </td>
    <td class="dedicated-editable" data-field="workedDays" data-id="${record.id}">
        ${record.workedDays}
    </td>
    <td class="dedicated-calculated-cell">
        ${formatCurrency(record.dailyRate, record.currency)}
    </td>
    <td class="dedicated-calculated-cell dedicated-highlight-cell">
        ${formatCurrency(record.actualCost, record.currency)}
    </td>
    <td class="dedicated-editable" data-field="currency" data-id="${record.id}">
        ${record.currency}
    </td>
    <td class="dedicated-editable" data-field="convertedCurrency" data-id="${record.id}">
        ${record.convertedCurrency}
    </td>
    <td class="dedicated-editable" data-field="conversionRate" data-id="${record.id}">
        ${record.conversionRate}
    </td>
    <td class="dedicated-converted-cell">
        ${formatCurrency(record.convertedMonthlyRate, record.convertedCurrency)}
    </td>
    <td class="dedicated-converted-cell">
        ${formatCurrency(record.convertedDailyRate, record.convertedCurrency)}
    </td>
    <td class="dedicated-converted-cell dedicated-highlight-cell">
        ${formatCurrency(record.convertedActualCost, record.convertedCurrency)}
    </td>
    <td class="dedicated-editable" data-field="holidayDays" data-id="${record.id}">
        ${record.holidayDays}
    </td>
    <td class="dedicated-calculated-cell">
        ${record.adjustedWorkingDays}
    </td>
    <td class="dedicated-calculated-cell">
        ${formatCurrency(record.adjustedDailyRate, record.currency)}
    </td>
    <td class="dedicated-currency-cell">
        ${formatCurrency(record.totalCostExcel, record.currency)}
    </td>
    <!-- NEW FIELDS RENDERED BELOW -->
    <td class="dedicated-editable dedicated-ot-cell" data-field="otHours" data-id="${record.id}">
        ${record.otHours}
    </td>
    <td class="dedicated-editable dedicated-ot-cell" data-field="otPerHourRate" data-id="${record.id}">
        ${formatCurrency(record.otPerHourRate, record.currency)}
    </td>
    <td class="dedicated-calculated-cell dedicated-ot-cell">
        ${formatCurrency(record.otHoursCost, record.currency)}
    </td>
    <td class="dedicated-editable dedicated-weekend-cell" data-field="weekendOtHours" data-id="${record.id}">
        ${record.weekendOtHours}
    </td>
    <td class="dedicated-editable dedicated-weekend-cell" data-field="weekendRate" data-id="${record.id}">
        ${formatCurrency(record.weekendRate, record.currency)}
    </td>
    <td class="dedicated-calculated-cell dedicated-weekend-cell">
        ${formatCurrency(record.weekendCost, record.currency)}
    </td>
    <td class="dedicated-editable dedicated-currency-cell" data-field="travelExtraCost" data-id="${record.id}">
        ${formatCurrency(record.travelExtraCost, record.currency)}
    </td>
    <td class="dedicated-editable dedicated-tax-cell" data-field="taxPercentage" data-id="${record.id}">
        ${record.taxPercentage}%
    </td>
    <td class="dedicated-calculated-cell dedicated-tax-cell">
        ${formatCurrency(record.taxCost, record.currency)}
    </td>
    <td class="dedicated-total-cost-cell">
        ${formatCurrency(record.totalCost, record.currency)}
    </td>
    <td class="dedicated-editable" data-field="originalCurrency" data-id="${record.id}">
        ${record.originalCurrency}
    </td>
    <td class="dedicated-editable" data-field="slaPercentage" data-id="${record.id}">
        ${record.slaPercentage}%
    </td>
    <td>
        <span class="dedicated-sla-badge ${record.slaMet === 'Yes' ? 'dedicated-sla-met' : 'dedicated-sla-not-met'}">
            ${record.slaMet}
        </span>
    </td>
    <td class="dedicated-editable" data-field="slaReason" data-id="${record.id}">
        ${record.slaReason ? `<span class="dedicated-sla-reason">${record.slaReason}</span>` : '-'}
    </td>
    <td class="dedicated-attendance-cell">
        ${record.attendanceApproved}
    </td>
    <td class="dedicated-editable" data-field="serviceMonth" data-id="${record.id}">
        ${record.serviceMonth}
    </td>
    <td class="dedicated-editable" data-field="remarks" data-id="${record.id}">
        ${record.remarks || '-'}
    </td>
    <td>
        <div class="dedicated-action-buttons">
            <button class="dedicated-table-btn dedicated-edit-btn" 
                    onclick="editDedicatedRow(${record.id})">
                <i class="fas fa-edit"></i> Edit
            </button>
            <button class="dedicated-table-btn dedicated-validate-btn"
                    onclick="validateSingleRow(${record.id})">
                <i class="fas fa-check"></i> Validate
            </button>
            <button class="dedicated-table-btn dedicated-delete-btn"
                    onclick="deleteDedicatedRow(${record.id})">
                <i class="fas fa-trash"></i> Delete
            </button>
        </div>
    </td>
`;
        
        tableBody.appendChild(row);
    });
    
    // Add row checkbox listeners
    addRowCheckboxListeners();
    
    console.log('Band Details: Rendered dedicated table with', filteredDedicatedData.length, 'rows');
}

// Add Row Checkbox Listeners
function addRowCheckboxListeners() {
    const checkboxes = document.querySelectorAll('#dedicated-table-body .dedicated-row-checkbox');
    checkboxes.forEach(checkbox => {
        checkbox.addEventListener('change', function() {
            const rowId = parseInt(this.getAttribute('data-row-id'));
            if (this.checked) {
                dedicatedSelectedRows.add(rowId);
            } else {
                dedicatedSelectedRows.delete(rowId);
            }
            
            // Update select all checkbox state
            const selectAllCheckbox = document.getElementById('dedicated-select-all');
            if (selectAllCheckbox) {
                const allCheckboxes = document.querySelectorAll('#dedicated-table-body .dedicated-row-checkbox');
                const allChecked = Array.from(allCheckboxes).every(cb => cb.checked);
                selectAllCheckbox.checked = allChecked;
                selectAllCheckbox.indeterminate = !allChecked && dedicatedSelectedRows.size > 0;
            }
            
            updateDedicatedSummary();
        });
    });
}

// Get Row Class Based on Data
function getDedicatedRowClass(record) {
    const utilization = record.workedDays / record.workingDays * 100;
    
    if (utilization >= 90) {
        return 'dedicated-row-high-utilization';
    } else if (utilization >= 70) {
        return 'dedicated-row-medium-utilization';
    } else {
        return 'dedicated-row-low-utilization';
    }
}

// Format Currency
function formatCurrency(amount, currency) {
    const symbols = {
        'EUR': '€',
        'USD': '$',
        'GBP': '£',
        'ZAR': 'R',
        'AED': 'د.إ'
    };
    
    const symbol = symbols[currency] || currency;
    return `${symbol}${amount.toLocaleString('en-US', {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2
    })}`;
}

// Filter Dedicated Data
function filterDedicatedData(searchTerm) {
    if (!searchTerm.trim()) {
        filteredDedicatedData = [...dedicatedData];
    } else {
        const term = searchTerm.toLowerCase();
        filteredDedicatedData = dedicatedData.filter(record => {
            return record.technicianName.toLowerCase().includes(term) ||
                   record.country.toLowerCase().includes(term) ||
                   record.band.includes(term) ||
                   record.currency.toLowerCase().includes(term) ||
                   record.serviceMonth.toLowerCase().includes(term);
        });
    }
    
    sortDedicatedData();
    renderDedicatedTable();
    updateDedicatedSummary();
}

// Filter by Customer
function filterDedicatedByCustomer() {
    const customer = this.value;
    // In a real implementation, this would filter by customer
    // For now, just re-apply search filter
    const searchInput = document.getElementById('dedicated-search-input');
    if (searchInput) {
        filterDedicatedData(searchInput.value);
    }
}

// Filter by Currency
function filterDedicatedByCurrency() {
    const currency = this.value;
    if (!currency) {
        filteredDedicatedData = [...dedicatedData];
    } else {
        filteredDedicatedData = dedicatedData.filter(record => 
            record.currency === currency
        );
    }
    
    sortDedicatedData();
    renderDedicatedTable();
    updateDedicatedSummary();
}

// Sort Dedicated Data
function sortDedicatedData() {
    filteredDedicatedData.sort((a, b) => {
        let aValue, bValue;
        
        switch (currentSortField) {
            case 'technician':
                aValue = a.technicianName.toLowerCase();
                bValue = b.technicianName.toLowerCase();
                break;
            case 'country':
                aValue = a.country.toLowerCase();
                bValue = b.country.toLowerCase();
                break;
            case 'monthlyRate':
                aValue = a.monthlyRate;
                bValue = b.monthlyRate;
                break;
            case 'workedDays':
                aValue = a.workedDays;
                bValue = b.workedDays;
                break;
            default:
                aValue = a.technicianName.toLowerCase();
                bValue = b.technicianName.toLowerCase();
            
case 'totalCost':
    aValue = a.totalCost;
    bValue = b.totalCost;
    break;
case 'slaPercentage':
    aValue = a.slaPercentage;
    bValue = b.slaPercentage;
    break;
        }

        
        if (currentSortOrder === 'asc') {
            return aValue > bValue ? 1 : -1;
        } else {
            return aValue < bValue ? 1 : -1;
        }
    });
}

// Update Dedicated Summary
function updateDedicatedSummary() {
    const totalTechnicians = filteredDedicatedData.length;
    const totalMonthlyCost = filteredDedicatedData.reduce((sum, record) => 
        sum + record.monthlyRate, 0);
    const totalWorkedDays = filteredDedicatedData.reduce((sum, record) => 
        sum + record.workedDays, 0);
    const totalWorkingDays = filteredDedicatedData.reduce((sum, record) => 
        sum + record.workingDays, 0);
    const avgUtilization = totalWorkingDays > 0 ? 
        (totalWorkedDays / totalWorkingDays * 100) : 0;
    const totalHolidayImpact = filteredDedicatedData.reduce((sum, record) => 
        sum + (record.holidayDays * record.dailyRate), 0);
    
    // Update DOM elements
    const totalTechEl = document.getElementById('dedicated-total-technicians');
    const totalCostEl = document.getElementById('dedicated-total-monthly-cost');
    const avgUtilEl = document.getElementById('dedicated-avg-utilization');
    const holidayImpactEl = document.getElementById('dedicated-holiday-impact');
    
    if (totalTechEl) totalTechEl.textContent = totalTechnicians;
    if (totalCostEl) totalCostEl.textContent = formatCurrency(totalMonthlyCost, 'EUR');
    if (avgUtilEl) avgUtilEl.textContent = avgUtilization.toFixed(1) + '%';
    if (holidayImpactEl) holidayImpactEl.textContent = formatCurrency(totalHolidayImpact, 'EUR');
}

// Show Version Modal
function showVersionModal() {
    const overlay = document.getElementById('dedicated-version-modal-overlay');
    if (overlay) {
        overlay.classList.add('show');
        populateVersionSelect();
        document.body.style.overflow = 'hidden';
    }
}

// Populate Version Select
function populateVersionSelect() {
    const versionSelect = document.getElementById('dedicated-version-select');
    if (!versionSelect) return;
    
    // Sample versions with timestamps
    const versions = [
        {
            id: 'ver-001',
            name: 'v0.01 Band Rate Card',
            date: '2024-01-15',
            time: '10:30:00',
            customer: 'HCL',
            account: 'HCL_ABBVIE',
            ticket: 'TICKET-001',
            records: 10,
            uploadTimestamp: '2024-01-15 10:30:00'
        },
        {
            id: 'ver-002',
            name: 'v0.02 Updated Rates',
            date: '2024-01-20',
            time: '14:45:00',
            customer: 'HCL',
            account: 'HCL_ABBVIE_DSS',
            ticket: 'TICKET-002',
            records: 8,
            uploadTimestamp: '2024-01-20 14:45:00'
        },
        {
            id: 'ver-003',
            name: 'v0.03 Q1 2024 Final',
            date: '2024-03-31',
            time: '23:59:00',
            customer: 'HCL',
            account: 'HCL_ADIDAS',
            ticket: '',
            records: 15,
            uploadTimestamp: '2024-03-31 23:59:00'
        }
    ];
    
    versionSelect.innerHTML = '<option value="">-- Select a version --</option>' +
        versions.map(v => 
            `<option value="${v.id}">${v.name} (${v.date} ${v.time})</option>`
        ).join('');
}

// Setup Version Modal Listeners
function setupVersionModalListeners() {
    const overlay = document.getElementById('dedicated-version-modal-overlay');
    const closeBtn = document.getElementById('dedicated-close-version-modal');
    const cancelBtn = document.getElementById('dedicated-cancel-version-load');
    const setupBtn = document.getElementById('dedicated-setup-new-version');
    const confirmBtn = document.getElementById('dedicated-confirm-version-load');
    const versionSelect = document.getElementById('dedicated-version-select');
    
    if (closeBtn) {
        closeBtn.addEventListener('click', hideVersionModal);
    }
    
    if (cancelBtn) {
        cancelBtn.addEventListener('click', hideVersionModal);
    }
    
    if (overlay) {
        overlay.addEventListener('click', function(e) {
            if (e.target === overlay) {
                hideVersionModal();
            }
        });
    }
    
    if (setupBtn) {
        setupBtn.addEventListener('click', setupNewVersion);
    }
    
    if (confirmBtn) {
        confirmBtn.addEventListener('click', confirmVersionLoad);
    }
    
    if (versionSelect) {
        versionSelect.addEventListener('change', updateVersionDetails);
    }
}

// Hide Version Modal
function hideVersionModal() {
    const overlay = document.getElementById('dedicated-version-modal-overlay');
    if (overlay) {
        overlay.classList.remove('show');
        document.body.style.overflow = 'auto';
    }
}

// Update Version Details
function updateVersionDetails() {
    const versionId = this.value;
    const detailsContainer = document.getElementById('dedicated-version-details');
    const previewTable = document.getElementById('dedicated-version-preview-table');
    
    if (!versionId) {
        if (detailsContainer) detailsContainer.style.display = 'none';
        if (previewTable) previewTable.innerHTML = '';
        return;
    }
    
    // Sample version data
    const versionData = {
        'ver-001': {
            name: 'v0.01 Band Rate Card',
            date: '2024-01-15',
            time: '10:30:00',
            customer: 'HCL',
            account: 'HCL_ABBVIE',
            ticket: 'TICKET-001',
            records: 10,
            uploadTimestamp: '2024-01-15 10:30:00',
            preview: dedicatedData.slice(0, 3)
        },
        'ver-002': {
            name: 'v0.02 Updated Rates',
            date: '2024-01-20',
            time: '14:45:00',
            customer: 'HCL',
            account: 'HCL_ABBVIE_DSS',
            ticket: 'TICKET-002',
            records: 8,
            uploadTimestamp: '2024-01-20 14:45:00',
            preview: dedicatedData.slice(3, 6)
        },
        'ver-003': {
            name: 'v0.03 Q1 2024 Final',
            date: '2024-03-31',
            time: '23:59:00',
            customer: 'HCL',
            account: 'HCL_ADIDAS',
            ticket: '',
            records: 15,
            uploadTimestamp: '2024-03-31 23:59:00',
            preview: dedicatedData.slice(6, 9)
        }
    };
    
    const version = versionData[versionId];
    
    // Update details
    if (detailsContainer) {
        detailsContainer.innerHTML = `
            <h5>Version Details</h5>
            <div class="dedicated-version-detail-item">
                <strong>Version ID:</strong> ${versionId}
            </div>
            <div class="dedicated-version-detail-item">
                <strong>Name:</strong> ${version.name}
            </div>
            <div class="dedicated-version-detail-item">
                <strong>Upload Date:</strong> ${version.date}
            </div>
            <div class="dedicated-version-detail-item">
                <strong>Upload Time:</strong> ${version.time}
            </div>
            <div class="dedicated-version-detail-item">
                <strong>Customer:</strong> ${version.customer}
            </div>
            <div class="dedicated-version-detail-item">
                <strong>Account:</strong> ${version.account}
            </div>
            <div class="dedicated-version-detail-item">
                <strong>Ticket:</strong> ${version.ticket || 'N/A'}
            </div>
            <div class="dedicated-version-detail-item">
                <strong>Records:</strong> ${version.records}
            </div>
            <div class="dedicated-version-detail-item">
                <strong>Upload Timestamp:</strong> ${version.uploadTimestamp}
            </div>
        `;
        detailsContainer.classList.add('show');
    }
    
    // Update preview
    if (previewTable) {
        const previewHtml = `
            <table class="data-table">
                <thead>
                    <tr>
                        <th>Technician</th>
                        <th>Country</th>
                        <th>Band</th>
                        <th>Monthly Rate</th>
                        <th>Currency</th>
                    </tr>
                </thead>
                <tbody>
                    ${version.preview.map(record => `
                        <tr>
                            <td>${record.technicianName}</td>
                            <td>${record.country}</td>
                            <td>Band ${record.band}</td>
                            <td>${formatCurrency(record.monthlyRate, record.currency)}</td>
                            <td>${record.currency}</td>
                        </tr>
                    `).join('')}
                </tbody>
            </table>
        `;
        previewTable.innerHTML = previewHtml;
    }
}

// Setup New Version
function setupNewVersion() {
    const versionName = document.getElementById('dedicated-new-version-name').value;
    const customer = document.getElementById('dedicated-new-version-customer').value;
    const account = document.getElementById('dedicated-new-version-account').value;
    const ticket = document.getElementById('dedicated-new-version-ticket').value;
    
    if (!versionName || !customer || !account) {
        showModalNotification('Please fill all required fields', 'error');
        return;
    }
    
    showModalNotification(`Setting up new version: ${versionName}`, 'info');
    // In real implementation, this would save version setup
    hideVersionModal();
}

// Confirm Version Load
function confirmVersionLoad() {
    const versionSelect = document.getElementById('dedicated-version-select');
    if (!versionSelect || !versionSelect.value) {
        showModalNotification('Please select a version to load', 'error');
        return;
    }
    
    const versionId = versionSelect.value;
    showModalNotification(`Loading version ${versionId}...`, 'info');
    
    // Simulate loading
    setTimeout(() => {
        // In real implementation, this would load data from selected version
        showModalNotification('Version loaded successfully!', 'success');
        hideVersionModal();
    }, 1500);
}

// Show Upload Modal
function showUploadModal() {
    const overlay = document.getElementById('dedicated-upload-modal-overlay');
    if (overlay) {
        overlay.classList.add('show');
        document.body.style.overflow = 'hidden';
        resetUploadModal();
    }
}

// Setup Upload Modal Listeners
function setupUploadModalListeners() {
    const overlay = document.getElementById('dedicated-upload-modal-overlay');
    const closeBtn = document.getElementById('dedicated-close-upload-modal');
    const cancelBtn = document.getElementById('dedicated-cancel-upload');
    const confirmBtn = document.getElementById('dedicated-confirm-upload');
    const browseBtn = document.getElementById('dedicated-browse-files-btn');
    const fileInput = document.getElementById('dedicated-csv-file-input');
    const uploadArea = document.getElementById('dedicated-upload-area');
    
    if (closeBtn) {
        closeBtn.addEventListener('click', hideUploadModal);
    }
    
    if (cancelBtn) {
        cancelBtn.addEventListener('click', hideUploadModal);
    }
    
    if (overlay) {
        overlay.addEventListener('click', function(e) {
            if (e.target === overlay) {
                hideUploadModal();
            }
        });
    }
    
    if (browseBtn) {
        browseBtn.addEventListener('click', function() {
            fileInput.click();
        });
    }
    
    if (fileInput) {
        fileInput.addEventListener('change', handleFileSelect);
    }
    
    if (uploadArea) {
        uploadArea.addEventListener('click', function() {
            fileInput.click();
        });
        
        // Drag and drop
        uploadArea.addEventListener('dragover', function(e) {
            e.preventDefault();
            this.style.borderColor = '#a52a2a';
            this.style.background = '#f9f0f0';
        });
        
        uploadArea.addEventListener('dragleave', function(e) {
            e.preventDefault();
            this.style.borderColor = '#e0d0d0';
            this.style.background = '#f9f5f5';
        });
        
        uploadArea.addEventListener('drop', function(e) {
            e.preventDefault();
            this.style.borderColor = '#e0d0d0';
            this.style.background = '#f9f5f5';
            
            if (e.dataTransfer.files.length) {
                handleFileSelect({ target: { files: e.dataTransfer.files } });
            }
        });
    }
    
    if (confirmBtn) {
        confirmBtn.addEventListener('click', confirmFileUpload);
    }
}

// Hide Upload Modal
function hideUploadModal() {
    const overlay = document.getElementById('dedicated-upload-modal-overlay');
    if (overlay) {
        overlay.classList.remove('show');
        document.body.style.overflow = 'auto';
    }
}

// Reset Upload Modal
function resetUploadModal() {
    const fileInput = document.getElementById('dedicated-csv-file-input');
    const preview = document.getElementById('dedicated-upload-preview');
    const validation = document.getElementById('dedicated-upload-validation');
    const confirmBtn = document.getElementById('dedicated-confirm-upload');
    
    if (fileInput) fileInput.value = '';
    if (preview) preview.style.display = 'none';
    if (validation) validation.style.display = 'none';
    if (confirmBtn) confirmBtn.disabled = true;
}

// Handle File Select
function handleFileSelect(event) {
    const file = event.target.files[0];
    if (!file) return;
    
    if (!file.name.endsWith('.csv')) {
        showModalNotification('Please select a CSV file', 'error');
        return;
    }
    
    // Read file
    const reader = new FileReader();
    reader.onload = function(e) {
        processCSVData(e.target.result);
    };
    reader.readAsText(file);
}

// Process CSV Data
function processCSVData(csvText) {
    try {
        const rows = csvText.split('\n').map(row => row.split(','));
        const headers = rows[0];
        const data = rows.slice(1).filter(row => row.length === headers.length);
        
        // Show preview
        showCSVPreview(headers, data.slice(0, 5));
        
        // Run validation
        const validationResults = validateCSVData(headers, data);
        showValidationResults(validationResults);
        
        // Enable confirm button if validation passes
        const confirmBtn = document.getElementById('dedicated-confirm-upload');
        if (confirmBtn) {
            const hasErrors = validationResults.some(r => r.type === 'error');
            confirmBtn.disabled = hasErrors;
        }
        
    } catch (error) {
        showModalNotification('Error processing CSV file: ' + error.message, 'error');
    }
}

// Show CSV Preview
function showCSVPreview(headers, data) {
    const preview = document.getElementById('dedicated-upload-preview');
    const previewTable = document.getElementById('dedicated-preview-table');
    
    if (!preview || !previewTable) return;
    
    const tableHtml = `
        <table class="data-table">
            <thead>
                <tr>
                    ${headers.map(h => `<th>${h}</th>`).join('')}
                </tr>
            </thead>
            <tbody>
                ${data.map(row => `
                    <tr>
                        ${row.map(cell => `<td>${cell}</td>`).join('')}
                    </tr>
                `).join('')}
            </tbody>
        </table>
    `;
    
    previewTable.innerHTML = tableHtml;
    preview.style.display = 'block';
}

// Validate CSV Data
function validateCSVData(headers, data) {
    const results = [];
    const requiredHeaders = ['Technician Name', 'Country', 'Monthly Rate', 'Working Days', 'Worked Days'];
    
    // Check required headers
    requiredHeaders.forEach(required => {
        if (!headers.includes(required)) {
            results.push({
                type: 'error',
                message: `Missing required column: ${required}`
            });
        }
    });
    
    // Check data rows
    data.forEach((row, index) => {
        // Check for empty required fields
        requiredHeaders.forEach((required, colIndex) => {
            const headerIndex = headers.indexOf(required);
            if (headerIndex !== -1 && (!row[headerIndex] || row[headerIndex].trim() === '')) {
                results.push({
                    type: 'warning',
                    message: `Row ${index + 2}: Empty value for ${required}`
                });
            }
        });
        
        // Check numeric values
        const monthlyRateIndex = headers.indexOf('Monthly Rate');
        if (monthlyRateIndex !== -1) {
            const rate = parseFloat(row[monthlyRateIndex]);
            if (isNaN(rate) || rate < 0) {
                results.push({
                    type: 'error',
                    message: `Row ${index + 2}: Invalid monthly rate: ${row[monthlyRateIndex]}`
                });
            }
        }
    });
    
    // Add success if no errors
    if (!results.some(r => r.type === 'error')) {
        results.unshift({
            type: 'success',
            message: `CSV file validated successfully. Found ${data.length} valid records.`
        });
    }
    
    return results;
}

// Show Validation Results
function showValidationResults(results) {
    const validation = document.getElementById('dedicated-upload-validation');
    const resultsContainer = document.getElementById('dedicated-validation-results');
    
    if (!validation || !resultsContainer) return;
    
    const resultsHtml = results.map(result => `
        <div class="dedicated-validation-result-item dedicated-validation-${result.type}">
            <i class="fas fa-${result.type === 'success' ? 'check-circle' : 
                           result.type === 'warning' ? 'exclamation-triangle' : 
                           'times-circle'}"></i>
            <span>${result.message}</span>
        </div>
    `).join('');
    
    resultsContainer.innerHTML = resultsHtml;
    validation.style.display = 'block';
}

// Confirm File Upload
function confirmFileUpload() {
    showModalNotification('Importing CSV data...', 'info');
    
    // Simulate import process
    setTimeout(() => {
        showModalNotification('CSV data imported successfully!', 'success');
        hideUploadModal();
        
        // Refresh table with new data
        filterDedicatedData('');
    }, 2000);
}

// Update the recalculateDedicatedData function to calculate new fields
function recalculateDedicatedData() {
    console.log('Band Details: Recalculating dedicated data...');
    showModalNotification('Recalculating all rows...', 'info');
    
    setTimeout(() => {
        dedicatedData.forEach(record => {
            // Existing calculations
            record.dailyRate = record.monthlyRate / (record.workingDays || 1);
            record.actualCost = record.dailyRate * (isNaN(record.workedDays) ? 0 : record.workedDays);
            
            record.convertedMonthlyRate = record.monthlyRate * currencyRates[record.convertedCurrency];
            record.convertedDailyRate = record.dailyRate * currencyRates[record.convertedCurrency];
            record.convertedActualCost = record.actualCost * currencyRates[record.convertedCurrency];
            
            record.adjustedWorkingDays = record.workingDays - record.holidayDays;
            record.adjustedDailyRate = record.adjustedWorkingDays > 0 ? 
                record.monthlyRate / record.adjustedWorkingDays : 0;
            
            // New field calculations
            record.otHoursCost = record.otHours * record.otPerHourRate;
            record.weekendCost = record.weekendOtHours * record.weekendRate;
            
            // Calculate tax cost if tax percentage is applied
            const baseCost = record.actualCost + record.otHoursCost + record.weekendCost + record.travelExtraCost;
            if (record.taxPercentage > 0) {
                record.taxCost = baseCost * (record.taxPercentage / 100);
            } else {
                record.taxCost = 0;
            }
            
            // Recalculate total cost
            record.totalCost = baseCost + record.taxCost;
            record.totalCostExcel = record.totalCost; // Update Excel total as well
            
            // Update converted values for new costs
            record.convertedActualCost = record.actualCost * currencyRates[record.convertedCurrency];
        });
        
        filterDedicatedData(document.getElementById('dedicated-search-input')?.value || '');
        showModalNotification('Recalculation complete! All fields updated!', 'success');
    }, 1000);
}

function validateDedicatedData() {
    console.log('Band Details: Validating dedicated data...');
    showModalNotification('Validating data consistency...', 'info');
    
    const errors = [];
    const warnings = [];
    
    filteredDedicatedData.forEach(record => {
        if (record.monthlyRate < 0) errors.push(`Negative monthly rate for ${record.technicianName}`);
        if (record.workedDays < 0) errors.push(`Negative worked days for ${record.technicianName}`);
        
        if (record.workedDays > record.workingDays) {
            warnings.push(`${record.technicianName}: Worked days (${record.workedDays}) exceed working days (${record.workingDays})`);
        }
        
        if (!record.technicianName.trim()) errors.push(`Missing technician name for record ${record.id}`);
        if (!record.country.trim()) errors.push(`Missing country for ${record.technicianName}`);
        if (!record.currency.trim()) errors.push(`Missing currency for ${record.technicianName}`);
    });
    
    setTimeout(() => {
        let message = 'Validation complete. ';
        if (errors.length === 0 && warnings.length === 0) {
            message += 'No issues found.';
            showModalNotification(message, 'success');
        } else {
            message += `Found ${errors.length} errors and ${warnings.length} warnings.`;
            showModalNotification(message, warnings.length > 0 ? 'warning' : 'error');
        }
    }, 800);
}

// Update the exportDedicatedData function to include new fields
function exportDedicatedData() {
    console.log('Band Details: Exporting dedicated data with all fields...');
    
    const exportData = filteredDedicatedData.map(record => ({
        'Technician Name': record.technicianName,
        'Country': record.country,
        'Band': record.band,
        'Variant': record.variant,
        'Monthly Rate': record.monthlyRate,
        'Working Days': record.workingDays,
        'Worked Days': record.workedDays,
        'Daily Rate': record.dailyRate,
        'Actual Cost': record.actualCost,
        'Currency': record.currency,
        'Converted Currency': record.convertedCurrency,
        'Conversion Rate': record.conversionRate,
        'Converted Monthly Rate': record.convertedMonthlyRate,
        'Converted Daily Rate': record.convertedDailyRate,
        'Converted Actual Cost': record.convertedActualCost,
        'Holiday Days': record.holidayDays,
        'Adjusted Working Days': record.adjustedWorkingDays,
        'Adjusted Daily Rate': record.adjustedDailyRate,
        'Total Cost (Excel)': record.totalCostExcel,
        'OT Hours': record.otHours,
        'OT per Hour Rate': record.otPerHourRate,
        'OT Hours Cost': record.otHoursCost,
        'Weekend OT Hours': record.weekendOtHours,
        'Weekend Rate': record.weekendRate,
        'Weekend Cost': record.weekendCost,
        'Travel/Extra Cost': record.travelExtraCost,
        'Tax %': record.taxPercentage,
        'Tax Cost': record.taxCost,
        'Total Cost': record.totalCost,
        'Original Currency': record.originalCurrency,
        'SLA %': record.slaPercentage,
        'SLA Met': record.slaMet,
        'Reason for SLA not met': record.slaReason,
        'Attendance Approved': record.attendanceApproved,
        'Service Month': record.serviceMonth,
        'Remarks': record.remarks || ''
    }));
    
    const headers = Object.keys(exportData[0]);
    const csvRows = [
        headers.join(','),
        ...exportData.map(row => 
            headers.map(header => {
                const value = row[header];
                return typeof value === 'string' && value.includes(',') ? 
                    `"${value}"` : value;
            }).join(',')
        )
    ];
    
    const csvContent = csvRows.join('\n');
    const blob = new Blob([csvContent], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);
    
    const link = document.createElement('a');
    link.href = url;
    link.download = `dedicated-resources-full-${new Date().toISOString().slice(0,10)}.csv`;
    link.click();
    
    URL.revokeObjectURL(url);
    showModalNotification('All data exported successfully!', 'success');
}

function editDedicatedRow(id) {
    console.log('Band Details: Editing row', id);
    showModalNotification(`Editing technician ${id}`, 'info');
}

function validateSingleRow(id) {
    const record = dedicatedData.find(r => r.id === id);
    if (!record) return;
    
    const issues = [];
    
    if (record.workedDays > record.workingDays) {
        issues.push(`Worked days (${record.workedDays}) exceed working days (${record.workingDays})`);
    }
    
    if (record.slaPercentage < 95) {
        issues.push(`SLA (${record.slaPercentage}%) is below target (95%)`);
    }
    
    if (issues.length === 0) {
        showModalNotification(`${record.technicianName}: All validations passed`, 'success');
    } else {
        showModalNotification(`${record.technicianName}: ${issues.join(', ')}`, 'warning');
    }
}

function deleteDedicatedRow(id) {
    if (!confirm('Are you sure you want to delete this record?')) return;
    
    const index = dedicatedData.findIndex(r => r.id === id);
    if (index !== -1) {
        dedicatedData.splice(index, 1);
        filterDedicatedData(document.getElementById('dedicated-search-input')?.value || '');
        showModalNotification('Record deleted successfully', 'success');
    }
}

// Helper function for notifications
function showModalNotification(message, type = 'info') {
    // You can implement a notification system here
    console.log(`${type.toUpperCase()}: ${message}`);
    alert(`${type.toUpperCase()}: ${message}`);
}

// Export functions for global access
if (typeof window !== 'undefined') {
    window.initializeDedicatedTab = initializeDedicatedTab;
    window.showUploadModal = showUploadModal;
    window.showVersionModal = showVersionModal;
    window.editDedicatedRow = editDedicatedRow;
    window.validateSingleRow = validateSingleRow;
    window.deleteDedicatedRow = deleteDedicatedRow;
}

console.log('Band Details: Dedicated tab functions loaded');

