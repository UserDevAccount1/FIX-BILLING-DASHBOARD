/**
 * Band Details - Project Tab Functionality
 * File: Band_Details_ProjectTab.js
 */

// Project Tab Variables
let projectData = [];
let filteredProjectData = [];
let projectCurrentSortField = 'projectName';
let projectCurrentSortOrder = 'asc';
let projectSelectedRows = new Set();
let projectCurrencyRates = {
    EUR: 1,
    USD: 1.08,
    GBP: 0.85,
    ZAR: 20.2,
    AED: 4.02
};

// Initialize Project Tab
function initializeProjectTab() {
    console.log('Band Details: Initializing Project tab...');
    
    // Load sample data
    loadSampleProjectData();
    
    // Setup event listeners
    setupProjectEventListeners();
    
    // Render table
    renderProjectTable();
    
    // Update summary
    updateProjectSummary();
    
    console.log('Band Details: Project tab initialized successfully');
}

// Load Sample Project Data
function loadSampleProjectData() {
    projectData = [
        {
            id: 1,
            projectName: "ABBVIE Data Migration",
            technician: "John Doe",
            startDate: "2024-01-01",
            endDate: "2024-03-31",
            duration: "Long Term",
            projectMonths: 3,
            country: "Germany",
            band: "2",
            monthlyRate: 3591.49,
            estimatedTotalCost: 10774.47,
            convertedCurrency: "USD",
            conversionRate: 1.08,
            convertedMonthlyRate: 3878.81,
            convertedDailyRate: 176.31,
            otRatePerHour: 24.5,
            otCost: 1225.00,
            weekendOtHours: 8,
            weekendOtRate: 36.75,
            weekendOtCost: 294.00,
            travelExtraCost: 500.00,
            taxPercentage: 19,
            taxCost: 2289.65,
            totalCost: 15083.12,
            slaPercentage: 95,
            slaMet: "Yes",
            serviceMonth: "Jan-24",
            remarks: "Data migration project for Q1 2024",
            originalCurrency: "EUR",
            status: "completed"
        },
        {
            id: 2,
            projectName: "HCL Cloud Implementation",
            technician: "Jane Smith",
            startDate: "2024-02-15",
            endDate: "2024-05-15",
            duration: "Medium Term",
            projectMonths: 3,
            country: "South Africa",
            band: "1",
            monthlyRate: 3162.50,
            estimatedTotalCost: 9487.50,
            convertedCurrency: "USD",
            conversionRate: 0.055,
            convertedMonthlyRate: 173.94,
            convertedDailyRate: 7.91,
            otRatePerHour: 18.5,
            otCost: 740.00,
            weekendOtHours: 12,
            weekendOtRate: 27.75,
            weekendOtCost: 333.00,
            travelExtraCost: 750.00,
            taxPercentage: 15,
            taxCost: 1695.38,
            totalCost: 13100.88,
            slaPercentage: 100,
            slaMet: "Yes",
            serviceMonth: "Feb-24",
            remarks: "Cloud migration with 3 months implementation",
            originalCurrency: "ZAR",
            status: "active"
        },
        {
            id: 3,
            projectName: "UK Tax System Upgrade",
            technician: "Robert Johnson",
            startDate: "2024-03-01",
            endDate: "2024-04-30",
            duration: "Short Term",
            projectMonths: 2,
            country: "UK",
            band: "3",
            monthlyRate: 1208.92,
            estimatedTotalCost: 2417.84,
            convertedCurrency: "USD",
            conversionRate: 1.08,
            convertedMonthlyRate: 1305.63,
            convertedDailyRate: 59.35,
            otRatePerHour: 16.8,
            otCost: 504.00,
            weekendOtHours: 6,
            weekendOtRate: 25.2,
            weekendOtCost: 151.20,
            travelExtraCost: 250.00,
            taxPercentage: 20,
            taxCost: 662.81,
            totalCost: 3985.85,
            slaPercentage: 90,
            slaMet: "Partially",
            serviceMonth: "Mar-24",
            remarks: "Tax system upgrade with compliance requirements",
            originalCurrency: "EUR",
            status: "active"
        },
        {
            id: 4,
            projectName: "French Banking Integration",
            technician: "Alice Brown",
            startDate: "2024-04-01",
            endDate: "2024-06-30",
            duration: "Medium Term",
            projectMonths: 3,
            country: "France",
            band: "2",
            monthlyRate: 5572.40,
            estimatedTotalCost: 16717.20,
            convertedCurrency: "USD",
            conversionRate: 1.08,
            convertedMonthlyRate: 6018.19,
            convertedDailyRate: 273.55,
            otRatePerHour: 31.2,
            otCost: 1560.00,
            weekendOtHours: 10,
            weekendOtRate: 46.8,
            weekendOtCost: 468.00,
            travelExtraCost: 600.00,
            taxPercentage: 20,
            taxCost: 3850.64,
            totalCost: 24195.84,
            slaPercentage: 100,
            slaMet: "Yes",
            serviceMonth: "Apr-24",
            remarks: "Banking system integration project",
            originalCurrency: "EUR",
            status: "upcoming"
        },
        {
            id: 5,
            projectName: "Spanish Retail Platform",
            technician: "Charlie Wilson",
            startDate: "2024-05-15",
            endDate: "2024-08-15",
            duration: "Long Term",
            projectMonths: 3,
            country: "Spain",
            band: "2",
            monthlyRate: 5572.40,
            estimatedTotalCost: 16717.20,
            convertedCurrency: "USD",
            conversionRate: 1.08,
            convertedMonthlyRate: 6018.19,
            convertedDailyRate: 273.55,
            otRatePerHour: 31.2,
            otCost: 1560.00,
            weekendOtHours: 8,
            weekendOtRate: 46.8,
            weekendOtCost: 374.40,
            travelExtraCost: 400.00,
            taxPercentage: 21,
            taxCost: 3886.51,
            totalCost: 22937.11,
            slaPercentage: 95,
            slaMet: "Yes",
            serviceMonth: "May-24",
            remarks: "Retail platform development",
            originalCurrency: "EUR",
            status: "upcoming"
        },
        {
            id: 6,
            projectName: "Italian Healthcare System",
            technician: "David Lee",
            startDate: "2024-01-10",
            endDate: "2024-04-10",
            duration: "Medium Term",
            projectMonths: 3,
            country: "Italy",
            band: "3",
            monthlyRate: 7819.56,
            estimatedTotalCost: 23458.68,
            convertedCurrency: "USD",
            conversionRate: 1.08,
            convertedMonthlyRate: 8445.12,
            convertedDailyRate: 383.87,
            otRatePerHour: 44.8,
            otCost: 2240.00,
            weekendOtHours: 15,
            weekendOtRate: 67.2,
            weekendOtCost: 1008.00,
            travelExtraCost: 800.00,
            taxPercentage: 22,
            taxCost: 5901.71,
            totalCost: 33408.39,
            slaPercentage: 100,
            slaMet: "Yes",
            serviceMonth: "Jan-24",
            remarks: "Healthcare system implementation",
            originalCurrency: "EUR",
            status: "completed"
        },
        {
            id: 7,
            projectName: "Dutch Logistics Platform",
            technician: "Emma Garcia",
            startDate: "2024-02-20",
            endDate: "2024-03-20",
            duration: "Short Term",
            projectMonths: 1,
            country: "Netherlands",
            band: "3",
            monthlyRate: 7898.52,
            estimatedTotalCost: 7898.52,
            convertedCurrency: "USD",
            conversionRate: 1.08,
            convertedMonthlyRate: 8530.40,
            convertedDailyRate: 387.75,
            otRatePerHour: 45.2,
            otCost: 904.00,
            weekendOtHours: 5,
            weekendOtRate: 67.8,
            weekendOtCost: 339.00,
            travelExtraCost: 300.00,
            taxPercentage: 21,
            taxCost: 1938.83,
            totalCost: 11380.35,
            slaPercentage: 100,
            slaMet: "Yes",
            serviceMonth: "Feb-24",
            remarks: "Logistics platform upgrade",
            originalCurrency: "EUR",
            status: "completed"
        },
        {
            id: 8,
            projectName: "Belgian Telecom Project",
            technician: "Frank Miller",
            startDate: "2024-03-01",
            endDate: "2024-06-01",
            duration: "Medium Term",
            projectMonths: 3,
            country: "Belgium",
            band: "4",
            monthlyRate: 8617.45,
            estimatedTotalCost: 25852.35,
            convertedCurrency: "USD",
            conversionRate: 1.08,
            convertedMonthlyRate: 9306.84,
            convertedDailyRate: 423.04,
            otRatePerHour: 52.4,
            otCost: 2620.00,
            weekendOtHours: 12,
            weekendOtRate: 78.6,
            weekendOtCost: 943.20,
            travelExtraCost: 700.00,
            taxPercentage: 21,
            taxCost: 6194.46,
            totalCost: 36409.01,
            slaPercentage: 98,
            slaMet: "Yes",
            serviceMonth: "Mar-24",
            remarks: "Telecom infrastructure upgrade",
            originalCurrency: "EUR",
            status: "active"
        },
        {
            id: 9,
            projectName: "Swiss Financial System",
            technician: "Grace Taylor",
            startDate: "2024-04-01",
            endDate: "2024-09-30",
            duration: "Long Term",
            projectMonths: 6,
            country: "Switzerland",
            band: "4",
            monthlyRate: 12499.98,
            estimatedTotalCost: 74999.88,
            convertedCurrency: "USD",
            conversionRate: 1.08,
            convertedMonthlyRate: 13499.98,
            convertedDailyRate: 613.64,
            otRatePerHour: 75.6,
            otCost: 7560.00,
            weekendOtHours: 20,
            weekendOtRate: 113.4,
            weekendOtCost: 2268.00,
            travelExtraCost: 1200.00,
            taxPercentage: 8.1,
            taxCost: 6938.69,
            totalCost: 92966.57,
            slaPercentage: 100,
            slaMet: "Yes",
            serviceMonth: "Apr-24",
            remarks: "Financial system implementation for Swiss bank",
            originalCurrency: "EUR",
            status: "upcoming"
        },
        {
            id: 10,
            projectName: "UAE E-commerce Platform",
            technician: "Henry Clark",
            startDate: "2024-01-01",
            endDate: "2024-02-28",
            duration: "Short Term",
            projectMonths: 2,
            country: "UAE",
            band: "1",
            monthlyRate: 1263.21,
            estimatedTotalCost: 2526.42,
            convertedCurrency: "USD",
            conversionRate: 0.2723,
            convertedMonthlyRate: 343.92,
            convertedDailyRate: 15.63,
            otRatePerHour: 8.4,
            otCost: 420.00,
            weekendOtHours: 4,
            weekendOtRate: 12.6,
            weekendOtCost: 50.40,
            travelExtraCost: 200.00,
            taxPercentage: 5,
            taxCost: 159.84,
            totalCost: 3356.66,
            slaPercentage: 100,
            slaMet: "Yes",
            serviceMonth: "Jan-24",
            remarks: "E-commerce platform launch",
            originalCurrency: "AED",
            status: "completed"
        }
    ];
    
    filteredProjectData = [...projectData];
    console.log('Band Details: Loaded sample project data with', projectData.length, 'records');
}

// Setup Project Event Listeners
function setupProjectEventListeners() {
    console.log('Band Details: Setting up project event listeners...');
    
    // Import CSV Button
    const importCsvBtn = document.getElementById('project-import-csv-btn');
    if (importCsvBtn) {
        importCsvBtn.addEventListener('click', showProjectUploadModal);
    }
    
    // Load Data Button
    const loadDataBtn = document.getElementById('project-load-data-btn');
    if (loadDataBtn) {
        loadDataBtn.addEventListener('click', showProjectVersionModal);
    }
    
    // Search Input
    const searchInput = document.getElementById('project-search-input');
    if (searchInput) {
        searchInput.addEventListener('input', function() {
            filterProjectData(this.value);
        });
    }
    
    // Search Clear Button
    const searchClearBtn = document.getElementById('project-search-clear');
    if (searchClearBtn) {
        searchClearBtn.addEventListener('click', function() {
            const searchInput = document.getElementById('project-search-input');
            if (searchInput) {
                searchInput.value = '';
                filterProjectData('');
            }
        });
    }
    
    // Sort Dropdown Button
    const sortDropdownBtn = document.getElementById('project-sort-dropdown-btn');
    const sortDropdownMenu = document.getElementById('project-sort-dropdown-menu');
    
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
        const sortOptions = sortDropdownMenu.querySelectorAll('.project-sort-option');
        sortOptions.forEach(option => {
            option.addEventListener('click', function(e) {
                e.preventDefault();
                projectCurrentSortField = this.getAttribute('data-sort');
                projectCurrentSortOrder = this.getAttribute('data-order');
                
                // Update button text
                const sortText = this.textContent;
                const icon = sortDropdownBtn.querySelector('i.fa-sort-amount-down-alt');
                sortDropdownBtn.innerHTML = `<i class="${icon.className}"></i> ${sortText} <i class="fas fa-chevron-down"></i>`;
                
                // Update active state
                sortOptions.forEach(opt => opt.classList.remove('active'));
                this.classList.add('active');
                
                // Sort and render
                sortProjectData();
                renderProjectTable();
                
                // Close dropdown
                sortDropdownMenu.classList.remove('show');
                sortDropdownBtn.classList.remove('active');
            });
        });
    }
    
    // Recalculate Button
    const recalcBtn = document.getElementById('project-recalculate-btn');
    if (recalcBtn) {
        recalcBtn.addEventListener('click', recalculateProjectData);
    }
    
    // Validate Button
    const validateBtn = document.getElementById('project-validate-btn');
    if (validateBtn) {
        validateBtn.addEventListener('click', validateProjectData);
    }
    
    // Export Button
    const exportBtn = document.getElementById('project-export-btn');
    if (exportBtn) {
        exportBtn.addEventListener('click', exportProjectData);
    }
    
    // Duration Filter
    const durationFilter = document.getElementById('project-duration-filter');
    if (durationFilter) {
        durationFilter.addEventListener('change', filterProjectByDuration);
    }
    
    // Status Filter
    const statusFilter = document.getElementById('project-status-filter');
    if (statusFilter) {
        statusFilter.addEventListener('change', filterProjectByStatus);
    }
    
    // Currency Filter
    const currencyFilter = document.getElementById('project-currency-filter');
    if (currencyFilter) {
        currencyFilter.addEventListener('change', filterProjectByCurrency);
    }
    
    // SLA Filter
    const slaFilter = document.getElementById('project-sla-filter');
    if (slaFilter) {
        slaFilter.addEventListener('change', filterProjectBySLA);
    }
    
    // Select All Checkbox
    const selectAllCheckbox = document.getElementById('project-select-all');
    if (selectAllCheckbox) {
        selectAllCheckbox.addEventListener('change', function() {
            const checkboxes = document.querySelectorAll('#project-table-body .project-row-checkbox');
            checkboxes.forEach(checkbox => {
                checkbox.checked = this.checked;
                const rowId = parseInt(checkbox.getAttribute('data-row-id'));
                if (this.checked) {
                    projectSelectedRows.add(rowId);
                } else {
                    projectSelectedRows.delete(rowId);
                }
            });
            updateProjectSummary();
        });
    }
    
    // Setup version modal event listeners
    setupProjectVersionModalListeners();
    
    // Setup upload modal event listeners
    setupProjectUploadModalListeners();
    
    console.log('Band Details: Project event listeners setup complete');
}

// Render Project Table
function renderProjectTable() {
    const tableBody = document.getElementById('project-table-body');
    if (!tableBody) {
        console.error('Project table body not found');
        return;
    }
    
    tableBody.innerHTML = '';
    
    if (filteredProjectData.length === 0) {
        tableBody.innerHTML = `
            <tr>
                <td colspan="29" class="project-empty-table-message">
                    <i class="fas fa-project-diagram"></i>
                    <p>No projects found</p>
                    <button class="btn btn-primary" onclick="showProjectUploadModal()">
                        <i class="fas fa-file-import"></i> Import CSV to get started
                    </button>
                </td>
            </tr>
        `;
        return;
    }
    
    filteredProjectData.forEach(record => {
        const row = document.createElement('tr');
        row.className = getProjectRowClass(record);
        
        // Calculate days between dates
        const startDate = new Date(record.startDate);
        const endDate = new Date(record.endDate);
        const daysDuration = Math.ceil((endDate - startDate) / (1000 * 60 * 60 * 24));
        
        row.innerHTML = `
            <td>
                <input type="checkbox" class="project-row-checkbox" data-row-id="${record.id}"
                    ${projectSelectedRows.has(record.id) ? 'checked' : ''}>
            </td>
            <td class="project-editable" data-field="projectName" data-id="${record.id}">
                ${record.projectName}
            </td>
            <td class="project-editable" data-field="technician" data-id="${record.id}">
                ${record.technician}
            </td>
            <td class="project-editable" data-field="startDate" data-id="${record.id}">
                ${formatDate(record.startDate)}
            </td>
            <td class="project-editable" data-field="endDate" data-id="${record.id}">
                ${formatDate(record.endDate)}
            </td>
            <td class="project-duration-cell">
                <span class="project-duration-badge ${record.duration.toLowerCase().includes('short') ? 'project-duration-short' : 'project-duration-long'}">
                    ${record.duration}
                </span>
            </td>
            <td class="project-editable" data-field="projectMonths" data-id="${record.id}">
                ${record.projectMonths} months
            </td>
            <td class="project-editable" data-field="country" data-id="${record.id}">
                ${record.country}
            </td>
            <td class="project-editable" data-field="band" data-id="${record.id}">
                Band ${record.band}
            </td>
            <td class="project-editable project-currency-cell" data-field="monthlyRate" data-id="${record.id}">
                ${formatCurrency(record.monthlyRate, record.originalCurrency)}
            </td>
            <td class="project-estimated-cell">
                ${formatCurrency(record.estimatedTotalCost, record.originalCurrency)}
            </td>
            <td class="project-editable" data-field="convertedCurrency" data-id="${record.id}">
                ${record.convertedCurrency}
            </td>
            <td class="project-editable" data-field="conversionRate" data-id="${record.id}">
                ${record.conversionRate}
            </td>
            <td class="project-converted-cell">
                ${formatCurrency(record.convertedMonthlyRate, record.convertedCurrency)}
            </td>
            <td class="project-converted-cell">
                ${formatCurrency(record.convertedDailyRate, record.convertedCurrency)}
            </td>
            <td class="project-editable project-ot-cell" data-field="otRatePerHour" data-id="${record.id}">
                ${formatCurrency(record.otRatePerHour, record.originalCurrency)}
            </td>
            <td class="project-calculated-cell project-ot-cell">
                ${formatCurrency(record.otCost, record.originalCurrency)}
            </td>
            <td class="project-editable project-weekend-cell" data-field="weekendOtHours" data-id="${record.id}">
                ${record.weekendOtHours}
            </td>
            <td class="project-editable project-weekend-cell" data-field="weekendOtRate" data-id="${record.id}">
                ${formatCurrency(record.weekendOtRate, record.originalCurrency)}
            </td>
            <td class="project-calculated-cell project-weekend-cell">
                ${formatCurrency(record.weekendOtCost, record.originalCurrency)}
            </td>
            <td class="project-editable project-currency-cell" data-field="travelExtraCost" data-id="${record.id}">
                ${formatCurrency(record.travelExtraCost, record.originalCurrency)}
            </td>
            <td class="project-editable project-tax-cell" data-field="taxPercentage" data-id="${record.id}">
                ${record.taxPercentage}%
            </td>
            <td class="project-calculated-cell project-tax-cell">
                ${formatCurrency(record.taxCost, record.originalCurrency)}
            </td>
            <td class="project-total-cost-cell">
                ${formatCurrency(record.totalCost, record.originalCurrency)}
            </td>
            <td class="project-editable" data-field="slaPercentage" data-id="${record.id}">
                ${record.slaPercentage}%
            </td>
            <td>
                <span class="project-sla-badge ${record.slaMet === 'Yes' ? 'project-sla-met' : record.slaMet === 'Partially' ? 'project-sla-partial' : 'project-sla-not-met'}">
                    ${record.slaMet}
                </span>
            </td>
            <td class="project-editable" data-field="serviceMonth" data-id="${record.id}">
                ${record.serviceMonth}
            </td>
            <td class="project-editable" data-field="remarks" data-id="${record.id}">
                ${record.remarks || '-'}
            </td>
            <td>
                <div class="project-action-buttons">
                    <button class="project-table-btn project-edit-btn" 
                            onclick="editProjectRow(${record.id})">
                        <i class="fas fa-edit"></i> Edit
                    </button>
                    <button class="project-table-btn project-validate-btn"
                            onclick="validateSingleProject(${record.id})">
                        <i class="fas fa-check"></i> Validate
                    </button>
                    <button class="project-table-btn project-delete-btn"
                            onclick="deleteProjectRow(${record.id})">
                        <i class="fas fa-trash"></i> Delete
                    </button>
                </div>
            </td>
        `;
        
        tableBody.appendChild(row);
    });
    
    // Add row checkbox listeners
    addProjectRowCheckboxListeners();
    
    console.log('Band Details: Rendered project table with', filteredProjectData.length, 'rows');
}

// Add Project Row Checkbox Listeners
function addProjectRowCheckboxListeners() {
    const checkboxes = document.querySelectorAll('#project-table-body .project-row-checkbox');
    checkboxes.forEach(checkbox => {
        checkbox.addEventListener('change', function() {
            const rowId = parseInt(this.getAttribute('data-row-id'));
            if (this.checked) {
                projectSelectedRows.add(rowId);
            } else {
                projectSelectedRows.delete(rowId);
            }
            
            // Update select all checkbox state
            const selectAllCheckbox = document.getElementById('project-select-all');
            if (selectAllCheckbox) {
                const allCheckboxes = document.querySelectorAll('#project-table-body .project-row-checkbox');
                const allChecked = Array.from(allCheckboxes).every(cb => cb.checked);
                selectAllCheckbox.checked = allChecked;
                selectAllCheckbox.indeterminate = !allChecked && projectSelectedRows.size > 0;
            }
            
            updateProjectSummary();
        });
    });
}

// Get Project Row Class Based on Status
function getProjectRowClass(record) {
    switch (record.status) {
        case 'completed':
            return 'project-row-completed';
        case 'active':
            return 'project-row-active';
        case 'upcoming':
            return 'project-row-upcoming';
        default:
            return '';
    }
}

// Format Date
function formatDate(dateString) {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'short',
        day: 'numeric'
    });
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

// Filter Project Data
function filterProjectData(searchTerm) {
    if (!searchTerm.trim()) {
        filteredProjectData = [...projectData];
    } else {
        const term = searchTerm.toLowerCase();
        filteredProjectData = projectData.filter(record => {
            return record.projectName.toLowerCase().includes(term) ||
                   record.technician.toLowerCase().includes(term) ||
                   record.country.toLowerCase().includes(term) ||
                   record.band.includes(term) ||
                   record.serviceMonth.toLowerCase().includes(term);
        });
    }
    
    sortProjectData();
    renderProjectTable();
    updateProjectSummary();
}

// Filter by Duration
function filterProjectByDuration() {
    const duration = this.value;
    if (!duration) {
        filteredProjectData = [...projectData];
    } else {
        filteredProjectData = projectData.filter(record => 
            record.duration.toLowerCase().includes(duration)
        );
    }
    
    sortProjectData();
    renderProjectTable();
    updateProjectSummary();
}

// Filter by Status
function filterProjectByStatus() {
    const status = this.value;
    if (!status) {
        filteredProjectData = [...projectData];
    } else {
        filteredProjectData = projectData.filter(record => 
            record.status === status
        );
    }
    
    sortProjectData();
    renderProjectTable();
    updateProjectSummary();
}

// Filter by Currency
function filterProjectByCurrency() {
    const currency = this.value;
    if (!currency) {
        filteredProjectData = [...projectData];
    } else {
        filteredProjectData = projectData.filter(record => 
            record.originalCurrency === currency
        );
    }
    
    sortProjectData();
    renderProjectTable();
    updateProjectSummary();
}

// Filter by SLA
function filterProjectBySLA() {
    const sla = this.value;
    if (!sla) {
        filteredProjectData = [...projectData];
    } else {
        if (sla === 'met') {
            filteredProjectData = projectData.filter(record => record.slaMet === 'Yes');
        } else if (sla === 'not-met') {
            filteredProjectData = projectData.filter(record => record.slaMet === 'No');
        } else if (sla === 'partial') {
            filteredProjectData = projectData.filter(record => record.slaMet === 'Partially');
        }
    }
    
    sortProjectData();
    renderProjectTable();
    updateProjectSummary();
}

// Sort Project Data
function sortProjectData() {
    filteredProjectData.sort((a, b) => {
        let aValue, bValue;
        
        switch (projectCurrentSortField) {
            case 'projectName':
                aValue = a.projectName.toLowerCase();
                bValue = b.projectName.toLowerCase();
                break;
            case 'startDate':
                aValue = new Date(a.startDate);
                bValue = new Date(b.startDate);
                break;
            case 'endDate':
                aValue = new Date(a.endDate);
                bValue = new Date(b.endDate);
                break;
            case 'totalCost':
                aValue = a.totalCost;
                bValue = b.totalCost;
                break;
            case 'duration':
                const aStart = new Date(a.startDate);
                const aEnd = new Date(a.endDate);
                const bStart = new Date(b.startDate);
                const bEnd = new Date(b.endDate);
                aValue = (aEnd - aStart);
                bValue = (bEnd - bStart);
                break;
            default:
                aValue = a.projectName.toLowerCase();
                bValue = b.projectName.toLowerCase();
        }
        
        if (projectCurrentSortOrder === 'asc') {
            return aValue > bValue ? 1 : -1;
        } else {
            return aValue < bValue ? 1 : -1;
        }
    });
}

// Update Project Summary
function updateProjectSummary() {
    const totalProjects = filteredProjectData.length;
    const totalCost = filteredProjectData.reduce((sum, record) => 
        sum + record.totalCost, 0);
    
    // Calculate average duration in days
    let totalDurationDays = 0;
    filteredProjectData.forEach(record => {
        const startDate = new Date(record.startDate);
        const endDate = new Date(record.endDate);
        totalDurationDays += Math.ceil((endDate - startDate) / (1000 * 60 * 60 * 24));
    });
    const avgDuration = totalProjects > 0 ? Math.round(totalDurationDays / totalProjects) : 0;
    
    const totalOTImpact = filteredProjectData.reduce((sum, record) => 
        sum + record.otCost + record.weekendOtCost, 0);
    
    // Update DOM elements
    const totalProjectsEl = document.getElementById('project-total-projects');
    const totalCostEl = document.getElementById('project-total-cost');
    const avgDurationEl = document.getElementById('project-avg-duration');
    const otImpactEl = document.getElementById('project-ot-impact');
    
    if (totalProjectsEl) totalProjectsEl.textContent = totalProjects;
    if (totalCostEl) totalCostEl.textContent = formatCurrency(totalCost, 'EUR');
    if (avgDurationEl) avgDurationEl.textContent = avgDuration + ' days';
    if (otImpactEl) otImpactEl.textContent = formatCurrency(totalOTImpact, 'EUR');
}

// Show Project Version Modal
function showProjectVersionModal() {
    const overlay = document.getElementById('project-version-modal-overlay');
    if (overlay) {
        overlay.classList.add('show');
        populateProjectVersionSelect();
        document.body.style.overflow = 'hidden';
    }
}

// Setup Project Version Modal Listeners
function setupProjectVersionModalListeners() {
    const overlay = document.getElementById('project-version-modal-overlay');
    const closeBtn = document.getElementById('project-close-version-modal');
    const cancelBtn = document.getElementById('project-cancel-version-load');
    const setupBtn = document.getElementById('project-setup-new-version');
    const confirmBtn = document.getElementById('project-confirm-version-load');
    const versionSelect = document.getElementById('project-version-select');
    
    if (closeBtn) {
        closeBtn.addEventListener('click', hideProjectVersionModal);
    }
    
    if (cancelBtn) {
        cancelBtn.addEventListener('click', hideProjectVersionModal);
    }
    
    if (overlay) {
        overlay.addEventListener('click', function(e) {
            if (e.target === overlay) {
                hideProjectVersionModal();
            }
        });
    }
    
    if (setupBtn) {
        setupBtn.addEventListener('click', setupNewProjectVersion);
    }
    
    if (confirmBtn) {
        confirmBtn.addEventListener('click', confirmProjectVersionLoad);
    }
    
    if (versionSelect) {
        versionSelect.addEventListener('change', updateProjectVersionDetails);
    }
}

// Hide Project Version Modal
function hideProjectVersionModal() {
    const overlay = document.getElementById('project-version-modal-overlay');
    if (overlay) {
        overlay.classList.remove('show');
        document.body.style.overflow = 'auto';
    }
}

// Populate Project Version Select
function populateProjectVersionSelect() {
    const versionSelect = document.getElementById('project-version-select');
    if (!versionSelect) return;
    
    // Sample project versions
    const versions = [
        {
            id: 'proj-ver-001',
            name: 'v0.01 Project Rate Card',
            date: '2024-01-10',
            time: '09:30:00',
            client: 'ABBVIE',
            account: 'ABBVIE_HCL',
            project: 'PROJ-001',
            records: 10
        },
        {
            id: 'proj-ver-002',
            name: 'v0.02 Q1 Projects',
            date: '2024-02-15',
            time: '11:45:00',
            client: 'HCL',
            account: 'HCL_ADIDAS',
            project: 'PROJ-002',
            records: 8
        },
        {
            id: 'proj-ver-003',
            name: 'v0.03 Cloud Projects',
            date: '2024-03-20',
            time: '16:20:00',
            client: 'Adidas',
            account: 'ADIDAS_HCL',
            project: '',
            records: 12
        }
    ];
    
    versionSelect.innerHTML = '<option value="">-- Select a version --</option>' +
        versions.map(v => 
            `<option value="${v.id}">${v.name} (${v.date} ${v.time})</option>`
        ).join('');
}

// Update Project Version Details
function updateProjectVersionDetails() {
    const versionId = this.value;
    const detailsContainer = document.getElementById('project-version-details');
    const previewTable = document.getElementById('project-version-preview-table');
    
    if (!versionId) {
        if (detailsContainer) detailsContainer.style.display = 'none';
        if (previewTable) previewTable.innerHTML = '';
        return;
    }
    
    // Sample version data
    const versionData = {
        'proj-ver-001': {
            name: 'v0.01 Project Rate Card',
            date: '2024-01-10',
            time: '09:30:00',
            client: 'ABBVIE',
            account: 'ABBVIE_HCL',
            project: 'PROJ-001',
            records: 10,
            uploadTimestamp: '2024-01-10 09:30:00',
            preview: projectData.slice(0, 3)
        }
    };
    
    const version = versionData[versionId] || versionData['proj-ver-001'];
    
    // Update details
    if (detailsContainer) {
        detailsContainer.innerHTML = `
            <h5>Version Details</h5>
            <div class="project-version-detail-item">
                <strong>Version ID:</strong> ${versionId}
            </div>
            <div class="project-version-detail-item">
                <strong>Name:</strong> ${version.name}
            </div>
            <div class="project-version-detail-item">
                <strong>Upload Date:</strong> ${version.date}
            </div>
            <div class="project-version-detail-item">
                <strong>Upload Time:</strong> ${version.time}
            </div>
            <div class="project-version-detail-item">
                <strong>Client:</strong> ${version.client}
            </div>
            <div class="project-version-detail-item">
                <strong>Account:</strong> ${version.account}
            </div>
            <div class="project-version-detail-item">
                <strong>Project:</strong> ${version.project || 'N/A'}
            </div>
            <div class="project-version-detail-item">
                <strong>Records:</strong> ${version.records}
            </div>
            <div class="project-version-detail-item">
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
                        <th>Project Name</th>
                        <th>Technician</th>
                        <th>Start Date</th>
                        <th>Duration</th>
                        <th>Total Cost</th>
                    </tr>
                </thead>
                <tbody>
                    ${version.preview.map(record => `
                        <tr>
                            <td>${record.projectName}</td>
                            <td>${record.technician}</td>
                            <td>${formatDate(record.startDate)}</td>
                            <td>${record.duration}</td>
                            <td>${formatCurrency(record.totalCost, record.originalCurrency)}</td>
                        </tr>
                    `).join('')}
                </tbody>
            </table>
        `;
        previewTable.innerHTML = previewHtml;
    }
}

// Setup New Project Version
function setupNewProjectVersion() {
    const versionName = document.getElementById('project-new-version-name').value;
    const client = document.getElementById('project-new-version-client').value;
    const account = document.getElementById('project-new-version-account').value;
    const project = document.getElementById('project-new-version-project').value;
    
    if (!versionName || !client || !account) {
        showModalNotification('Please fill all required fields', 'error');
        return;
    }
    
    showModalNotification(`Setting up new project version: ${versionName}`, 'info');
    hideProjectVersionModal();
}

// Confirm Project Version Load
function confirmProjectVersionLoad() {
    const versionSelect = document.getElementById('project-version-select');
    if (!versionSelect || !versionSelect.value) {
        showModalNotification('Please select a version to load', 'error');
        return;
    }
    
    const versionId = versionSelect.value;
    showModalNotification(`Loading project version ${versionId}...`, 'info');
    
    setTimeout(() => {
        showModalNotification('Project version loaded successfully!', 'success');
        hideProjectVersionModal();
    }, 1500);
}

// Show Project Upload Modal
function showProjectUploadModal() {
    const overlay = document.getElementById('project-upload-modal-overlay');
    if (overlay) {
        overlay.classList.add('show');
        document.body.style.overflow = 'hidden';
        resetProjectUploadModal();
    }
}

// Setup Project Upload Modal Listeners
function setupProjectUploadModalListeners() {
    const overlay = document.getElementById('project-upload-modal-overlay');
    const closeBtn = document.getElementById('project-close-upload-modal');
    const cancelBtn = document.getElementById('project-cancel-upload');
    const confirmBtn = document.getElementById('project-confirm-upload');
    const browseBtn = document.getElementById('project-browse-files-btn');
    const fileInput = document.getElementById('project-csv-file-input');
    const uploadArea = document.getElementById('project-upload-area');
    
    if (closeBtn) {
        closeBtn.addEventListener('click', hideProjectUploadModal);
    }
    
    if (cancelBtn) {
        cancelBtn.addEventListener('click', hideProjectUploadModal);
    }
    
    if (overlay) {
        overlay.addEventListener('click', function(e) {
            if (e.target === overlay) {
                hideProjectUploadModal();
            }
        });
    }
    
    if (browseBtn) {
        browseBtn.addEventListener('click', function() {
            fileInput.click();
        });
    }
    
    if (fileInput) {
        fileInput.addEventListener('change', handleProjectFileSelect);
    }
    
    if (uploadArea) {
        uploadArea.addEventListener('click', function() {
            fileInput.click();
        });
        
        // Drag and drop
        uploadArea.addEventListener('dragover', function(e) {
            e.preventDefault();
            this.style.borderColor = '#2aa5a5';
            this.style.background = '#f0f9f9';
        });
        
        uploadArea.addEventListener('dragleave', function(e) {
            e.preventDefault();
            this.style.borderColor = '#d0e0e0';
            this.style.background = '#f5f9f9';
        });
        
        uploadArea.addEventListener('drop', function(e) {
            e.preventDefault();
            this.style.borderColor = '#d0e0e0';
            this.style.background = '#f5f9f9';
            
            if (e.dataTransfer.files.length) {
                handleProjectFileSelect({ target: { files: e.dataTransfer.files } });
            }
        });
    }
    
    if (confirmBtn) {
        confirmBtn.addEventListener('click', confirmProjectFileUpload);
    }
}

// Hide Project Upload Modal
function hideProjectUploadModal() {
    const overlay = document.getElementById('project-upload-modal-overlay');
    if (overlay) {
        overlay.classList.remove('show');
        document.body.style.overflow = 'auto';
    }
}

// Reset Project Upload Modal
function resetProjectUploadModal() {
    const fileInput = document.getElementById('project-csv-file-input');
    const preview = document.getElementById('project-upload-preview');
    const validation = document.getElementById('project-upload-validation');
    const confirmBtn = document.getElementById('project-confirm-upload');
    
    if (fileInput) fileInput.value = '';
    if (preview) preview.style.display = 'none';
    if (validation) validation.style.display = 'none';
    if (confirmBtn) confirmBtn.disabled = true;
}

// Handle Project File Select
function handleProjectFileSelect(event) {
    const file = event.target.files[0];
    if (!file) return;
    
    if (!file.name.endsWith('.csv')) {
        showModalNotification('Please select a CSV file', 'error');
        return;
    }
    
    const reader = new FileReader();
    reader.onload = function(e) {
        processProjectCSVData(e.target.result);
    };
    reader.readAsText(file);
}

// Process Project CSV Data
function processProjectCSVData(csvText) {
    try {
        const rows = csvText.split('\n').map(row => row.split(','));
        const headers = rows[0];
        const data = rows.slice(1).filter(row => row.length === headers.length);
        
        showProjectCSVPreview(headers, data.slice(0, 5));
        
        const validationResults = validateProjectCSVData(headers, data);
        showProjectValidationResults(validationResults);
        
        const confirmBtn = document.getElementById('project-confirm-upload');
        if (confirmBtn) {
            const hasErrors = validationResults.some(r => r.type === 'error');
            confirmBtn.disabled = hasErrors;
        }
        
    } catch (error) {
        showModalNotification('Error processing CSV file: ' + error.message, 'error');
    }
}

// Show Project CSV Preview
function showProjectCSVPreview(headers, data) {
    const preview = document.getElementById('project-upload-preview');
    const previewTable = document.getElementById('project-preview-table');
    
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

// Validate Project CSV Data
function validateProjectCSVData(headers, data) {
    const results = [];
    const requiredHeaders = ['Project Name', 'Technician', 'Start Date', 'End Date', 'Monthly Rate'];
    
    requiredHeaders.forEach(required => {
        if (!headers.includes(required)) {
            results.push({
                type: 'error',
                message: `Missing required column: ${required}`
            });
        }
    });
    
    data.forEach((row, index) => {
        requiredHeaders.forEach((required, colIndex) => {
            const headerIndex = headers.indexOf(required);
            if (headerIndex !== -1 && (!row[headerIndex] || row[headerIndex].trim() === '')) {
                results.push({
                    type: 'warning',
                    message: `Row ${index + 2}: Empty value for ${required}`
                });
            }
        });
        
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
    
    if (!results.some(r => r.type === 'error')) {
        results.unshift({
            type: 'success',
            message: `CSV file validated successfully. Found ${data.length} valid records.`
        });
    }
    
    return results;
}

// Show Project Validation Results
function showProjectValidationResults(results) {
    const validation = document.getElementById('project-upload-validation');
    const resultsContainer = document.getElementById('project-validation-results');
    
    if (!validation || !resultsContainer) return;
    
    const resultsHtml = results.map(result => `
        <div class="project-validation-result-item project-validation-${result.type}">
            <i class="fas fa-${result.type === 'success' ? 'check-circle' : 
                           result.type === 'warning' ? 'exclamation-triangle' : 
                           'times-circle'}"></i>
            <span>${result.message}</span>
        </div>
    `).join('');
    
    resultsContainer.innerHTML = resultsHtml;
    validation.style.display = 'block';
}

// Confirm Project File Upload
function confirmProjectFileUpload() {
    showModalNotification('Importing project CSV data...', 'info');
    
    setTimeout(() => {
        showModalNotification('Project CSV data imported successfully!', 'success');
        hideProjectUploadModal();
        filterProjectData('');
    }, 2000);
}

// Recalculate Project Data
function recalculateProjectData() {
    console.log('Band Details: Recalculating project data...');
    showModalNotification('Recalculating all projects...', 'info');
    
    setTimeout(() => {
        projectData.forEach(record => {
            // Calculate OT costs
            record.otCost = record.otHours * record.otRatePerHour || 0;
            record.weekendOtCost = record.weekendOtHours * record.weekendOtRate || 0;
            
            // Calculate base costs
            const baseCost = record.monthlyRate * record.projectMonths + 
                           record.otCost + record.weekendOtCost + 
                           (record.travelExtraCost || 0);
            
            // Calculate tax
            if (record.taxPercentage > 0) {
                record.taxCost = baseCost * (record.taxPercentage / 100);
            } else {
                record.taxCost = 0;
            }
            
            // Calculate total
            record.totalCost = baseCost + record.taxCost;
            record.estimatedTotalCost = record.monthlyRate * record.projectMonths;
            
            // Update converted values
            record.convertedMonthlyRate = record.monthlyRate * projectCurrencyRates[record.convertedCurrency];
            record.convertedDailyRate = record.convertedMonthlyRate / 22; // Assuming 22 working days per month
            
            // Update status based on dates
            const today = new Date();
            const startDate = new Date(record.startDate);
            const endDate = new Date(record.endDate);
            
            if (today > endDate) {
                record.status = 'completed';
            } else if (today >= startDate && today <= endDate) {
                record.status = 'active';
            } else {
                record.status = 'upcoming';
            }
        });
        
        filterProjectData(document.getElementById('project-search-input')?.value || '');
        showModalNotification('Project recalculation complete!', 'success');
    }, 1000);
}

// Validate Project Data
function validateProjectData() {
    console.log('Band Details: Validating project data...');
    showModalNotification('Validating project consistency...', 'info');
    
    const errors = [];
    const warnings = [];
    
    filteredProjectData.forEach(record => {
        // Check for negative values
        if (record.monthlyRate < 0) errors.push(`Negative monthly rate for ${record.projectName}`);
        if (record.totalCost < 0) errors.push(`Negative total cost for ${record.projectName}`);
        
        // Check date logic
        const startDate = new Date(record.startDate);
        const endDate = new Date(record.endDate);
        if (endDate < startDate) {
            errors.push(`${record.projectName}: End date is before start date`);
        }
        
        // Check for missing required fields
        if (!record.projectName.trim()) errors.push(`Missing project name for record ${record.id}`);
        if (!record.technician.trim()) errors.push(`Missing technician for ${record.projectName}`);
        if (!record.startDate) errors.push(`Missing start date for ${record.projectName}`);
        if (!record.endDate) errors.push(`Missing end date for ${record.projectName}`);
        
        // Check SLA
        if (record.slaPercentage < 90) {
            warnings.push(`${record.projectName}: SLA (${record.slaPercentage}%) is below 90% threshold`);
        }
    });
    
    setTimeout(() => {
        let message = 'Validation complete. ';
        if (errors.length === 0 && warnings.length === 0) {
            message += 'All projects are valid.';
            showModalNotification(message, 'success');
        } else {
            message += `Found ${errors.length} errors and ${warnings.length} warnings.`;
            showModalNotification(message, warnings.length > 0 ? 'warning' : 'error');
        }
    }, 800);
}

// Export Project Data
function exportProjectData() {
    console.log('Band Details: Exporting project data...');
    
    const exportData = filteredProjectData.map(record => ({
        'Project Name': record.projectName,
        'Technician': record.technician,
        'Start Date': record.startDate,
        'End Date': record.endDate,
        'Project Duration': record.duration,
        'Project Months': record.projectMonths,
        'Country': record.country,
        'Band': record.band,
        'Monthly Rate': record.monthlyRate,
        'Estimated Total Cost': record.estimatedTotalCost,
        'Converted Currency': record.convertedCurrency,
        'Conversion Rate': record.conversionRate,
        'Converted Monthly Rate': record.convertedMonthlyRate,
        'Converted Daily Rate': record.convertedDailyRate,
        'OT Rate per Hour': record.otRatePerHour,
        'OT Cost': record.otCost,
        'Weekend OT Hours': record.weekendOtHours,
        'Weekend OT Rate': record.weekendOtRate,
        'Weekend OT Cost': record.weekendOtCost,
        'Travel/Extra Cost': record.travelExtraCost,
        'Tax %': record.taxPercentage,
        'Tax Cost': record.taxCost,
        'Total Cost': record.totalCost,
        'SLA %': record.slaPercentage,
        'SLA Met': record.slaMet,
        'Service Month': record.serviceMonth,
        'Remarks': record.remarks || '',
        'Status': record.status,
        'Original Currency': record.originalCurrency
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
    link.download = `projects-${new Date().toISOString().slice(0,10)}.csv`;
    link.click();
    
    URL.revokeObjectURL(url);
    showModalNotification('Project data exported successfully!', 'success');
}

// Edit Project Row
function editProjectRow(id) {
    console.log('Band Details: Editing project', id);
    showModalNotification(`Editing project ${id}`, 'info');
}

// Validate Single Project
function validateSingleProject(id) {
    const record = projectData.find(r => r.id === id);
    if (!record) return;
    
    const issues = [];
    
    const startDate = new Date(record.startDate);
    const endDate = new Date(record.endDate);
    if (endDate < startDate) {
        issues.push(`End date is before start date`);
    }
    
    if (record.slaPercentage < 90) {
        issues.push(`SLA (${record.slaPercentage}%) is below 90% threshold`);
    }
    
    if (record.totalCost > record.estimatedTotalCost * 1.2) {
        issues.push(`Total cost exceeds estimate by more than 20%`);
    }
    
    if (issues.length === 0) {
        showModalNotification(`${record.projectName}: All validations passed`, 'success');
    } else {
        showModalNotification(`${record.projectName}: ${issues.join(', ')}`, 'warning');
    }
}

// Delete Project Row
function deleteProjectRow(id) {
    if (!confirm('Are you sure you want to delete this project?')) return;
    
    const index = projectData.findIndex(r => r.id === id);
    if (index !== -1) {
        projectData.splice(index, 1);
        filterProjectData(document.getElementById('project-search-input')?.value || '');
        showModalNotification('Project deleted successfully', 'success');
    }
}

// Helper function for notifications
function showModalNotification(message, type = 'info') {
    console.log(`${type.toUpperCase()}: ${message}`);
    alert(`${type.toUpperCase()}: ${message}`);
}

// Export functions for global access
if (typeof window !== 'undefined') {
    window.initializeProjectTab = initializeProjectTab;
    window.showProjectUploadModal = showProjectUploadModal;
    window.showProjectVersionModal = showProjectVersionModal;
    window.editProjectRow = editProjectRow;
    window.validateSingleProject = validateSingleProject;
    window.deleteProjectRow = deleteProjectRow;
}

console.log('Band Details: Project tab functions loaded');