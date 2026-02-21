// =============================================
// COMPLETE FIXED JAVASCRIPT FOR FILE MANAGER
// =============================================

// Enhanced sample data with file management integration
const steps = [
    { 
        id: 1, 
        name: 'Ticket Match', 
        icon: 'fas fa-ticket-alt', 
        status: 'completed', 
        timestamp: '2024-01-15 09:00:00',
        manualCounterpart: {
            name: 'Ticket Data Distribution',
            description: 'Ticket Data Upload (Regional Stage) - Upload ticket file per region (Excel/CSV), Validate columns & ticket details, Mark upload as Validated',
            requiredControls: ['Data Upload Tracker Table', 'Notification Toggle'],
            workflowDetails: `Ticket Data Upload (Regional Stage) (SDM Users, Admin Oversight)
            1. Upload ticket file per region (Excel/CSV)
            2. Validate columns & ticket details
            3. Mark upload as Validated
            4. Mandatory: Data Upload Tracker Table, Notification Toggle`
        }
    },
    { 
        id: 2, 
        name: 'Rate Match', 
        icon: 'fas fa-exchange-alt', 
        status: 'in-progress', 
        timestamp: '2024-01-15 09:02:00',
        manualCounterpart: {
            name: 'Rate Card Assignment',
            description: 'Select appropriate rate card. Admin reviews and approves.',
            requiredControls: ['Rate Card Management Table', 'Approval Button', 'Change Log Panel'],
            workflowDetails: `Rate Card Assignment (FSO, Verified by Admin)
            1. Select appropriate rate card
            2. Admin reviews and approves
            3. Mandatory: Rate Card Management Table, Approval Button, Change Log Panel`
        }
    },
    { 
        id: 3, 
        name: 'File Gen', 
        icon: 'fas fa-file-export', 
        status: 'pending', 
        timestamp: null
    },
    { 
        id: 4, 
        name: 'Consolidate', 
        icon: 'fas fa-compress-arrows-alt', 
        status: 'pending', 
        timestamp: null,
        manualCounterpart: {
            name: 'Consolidation & Upload to HCL',
            description: 'Merge regional files. Validate currency and totals. Upload to HCL FSO Portal and log reference.',
            requiredControls: ['File Merge Tool', 'Currency Validator', 'Upload Button', 'Upload Log Table'],
            workflowDetails: `Consolidation & Upload to HCL (Admin)
            1. Merge regional files
            2. Validate currency and totals
            3. Upload to HCL FSO Portal and log reference
            4. Mandatory: File Merge Tool, Currency Validator, Upload Button, Upload Log Table`
        }
    },
    { 
        id: 5, 
        name: 'Upload', 
        icon: 'fas fa-cloud-upload-alt', 
        status: 'pending', 
        timestamp: null
    },
    { 
        id: 6, 
        name: 'Approval', 
        icon: 'fas fa-thumbs-up', 
        status: 'pending', 
        timestamp: null,
        manualCounterpart: {
            name: 'Review & Monitoring',
            description: 'Monitor HCL feedback. Update record status manually. Notify SDM via Teams.',
            requiredControls: ['Review Tracker Table', 'Notify SDM Button', 'Summary Graph'],
            workflowDetails: `Review & Monitoring (Admin & FSO)
            1. Monitor HCL feedback
            2. Update record status manually
            3. Notify SDM via Teams
            4. Mandatory: Review Tracker Table, Notify SDM Button, Summary Graph`
        }
    },
    { 
        id: 7, 
        name: 'Invoice', 
        icon: 'fas fa-file-invoice-dollar', 
        status: 'pending', 
        timestamp: null,
        manualCounterpart: {
            name: 'Final Approval & Invoice Preparation',
            description: 'Review all regions marked "Approved". Click "Generate Invoice Summary". Export report for Finance Team.',
            requiredControls: ['Invoice Summary Table', 'Export Controls', 'Cycle Close Control'],
            workflowDetails: `Final Approval & Invoice Preparation (Admin)
            1. Review all regions marked "Approved"
            2. Click "Generate Invoice Summary"
            3. Export report for Finance Team
            4. Mandatory: Invoice Summary Table, Export Controls, Cycle Close Control`
        }
    }
];

// Enhanced File Manager Data with more files for all categories
const ticketFiles = [
    {
        id: 'FILE-001',
        name: 'HCL_Tickets_Jan2024_v1.0.xlsx',
        version: 'v1.0',
        uploadDate: '2024-01-15 09:00:00',
        lastCalcDate: '2024-01-25',
        ticketCount: 125,
        status: 'available',
        files: {
            calculation: [
                { name: 'calc_results_v1.0.xlsx', version: 'v1.0', date: '2024-01-15 11:30:00', size: '2.4 MB', generatedBy: 'System' },
                { name: 'calc_report_v1.0.pdf', version: 'v1.0', date: '2024-01-15 11:35:00', size: '1.1 MB', generatedBy: 'System' }
            ],
            approval: [
                { name: 'approval_v1.0.pdf', version: 'v1.0', date: '2024-01-16 14:20:00', size: '0.8 MB', approvedBy: 'Admin' }
            ],
            invoice: []
        },
        calculatedFile: 'HCL_Calculated_Jan2024_v1.0.xlsx',
        calculationDate: '2024-01-15 11:30:00',
        ticketsProcessed: 125,
        approvalFile: 'HCL_Approval_Jan2024_v1.0.pdf',
        approvalDate: '2024-01-16 14:20:00',
        approvedBy: 'Admin',
        approvalStatus: 'approved',
        invoiceNumber: 'INV-2024-001',
        invoiceDate: '2024-01-18 11:00:00',
        invoiceAmount: '$15,750.00',
        invoiceStatus: 'paid'
    },
    {
        id: 'FILE-002',
        name: 'Acme_Tickets_Jan2024_v1.1.xlsx',
        version: 'v1.1',
        uploadDate: '2024-01-15 10:30:00',
        lastCalcDate: '2024-01-25',
        ticketCount: 89,
        status: 'available',
        files: {
            calculation: [],
            approval: [],
            invoice: []
        }
    },
    {
        id: 'FILE-003',
        name: 'Wayne_Tickets_Jan2024_v2.0.xlsx',
        version: 'v2.0',
        uploadDate: '2024-01-15 08:15:00',
        lastCalcDate: '2024-01-25',
        ticketCount: 67,
        status: 'calculated',
        files: {
            calculation: [
                { name: 'calc_results_v2.0.xlsx', version: 'v2.0', date: '2024-01-15 10:15:00', size: '1.8 MB', generatedBy: 'System' }
            ],
            approval: [],
            invoice: []
        },
        calculatedFile: 'Wayne_Calculated_Jan2024_v2.0.xlsx',
        calculationDate: '2024-01-15 10:15:00',
        ticketsProcessed: 67
    },
    {
        id: 'FILE-004',
        name: 'Stark_Tickets_Jan2024_v1.0.xlsx',
        version: 'v1.0',
        uploadDate: '2024-01-15 09:45:00',
        lastCalcDate: '2024-01-25',
        ticketCount: 42,
        status: 'approval',
        files: {
            calculation: [
                { name: 'calc_results_v1.0.xlsx', version: 'v1.0', date: '2024-01-15 12:20:00', size: '1.2 MB', generatedBy: 'System' },
                { name: 'calc_report_v1.0.pdf', version: 'v1.0', date: '2024-01-15 12:25:00', size: '0.9 MB', generatedBy: 'System' }
            ],
            approval: [
                { name: 'approval_v1.0.pdf', version: 'v1.0', date: '2024-01-17 09:30:00', size: '0.7 MB', approvedBy: 'Manager' },
                { name: 'approval_notes_v1.0.txt', version: 'v1.0', date: '2024-01-17 09:35:00', size: '0.1 MB', approvedBy: 'Manager' }
            ],
            invoice: []
        },
        calculatedFile: 'Stark_Calculated_Jan2024_v1.0.xlsx',
        calculationDate: '2024-01-15 12:20:00',
        ticketsProcessed: 42,
        approvalFile: 'Stark_Approval_Jan2024_v1.0.pdf',
        approvalDate: '2024-01-17 09:30:00',
        approvedBy: 'Manager',
        approvalStatus: 'pending'
    },
    {
        id: 'FILE-005',
        name: 'Umbrella_Tickets_Jan2024_v3.0.xlsx',
        version: 'v3.0',
        uploadDate: '2024-01-15 11:20:00',
        lastCalcDate: '2024-01-25',
        ticketCount: 31,
        status: 'invoice',
        files: {
            calculation: [
                { name: 'calc_results_v3.0.xlsx', version: 'v3.0', date: '2024-01-15 14:30:00', size: '1.1 MB', generatedBy: 'System' }
            ],
            approval: [
                { name: 'approval_v3.0.pdf', version: 'v3.0', date: '2024-01-16 10:15:00', size: '0.6 MB', approvedBy: 'Finance' }
            ],
            invoice: [
                { name: 'invoice_v3.0.pdf', version: 'v3.0', date: '2024-01-17 09:00:00', size: '1.3 MB', generatedBy: 'Finance' }
            ]
        },
        calculatedFile: 'Umbrella_Calculated_Jan2024_v3.0.xlsx',
        calculationDate: '2024-01-15 14:30:00',
        ticketsProcessed: 31,
        approvalFile: 'Umbrella_Approval_Jan2024_v3.0.pdf',
        approvalDate: '2024-01-16 10:15:00',
        approvedBy: 'Finance',
        approvalStatus: 'approved',
        invoiceNumber: 'INV-2024-002',
        invoiceDate: '2024-01-17 09:00:00',
        invoiceAmount: '$4,250.00',
        invoiceStatus: 'sent'
    },
    {
        id: 'FILE-006',
        name: 'LexCorp_Tickets_Jan2024_v2.1.xlsx',
        version: 'v2.1',
        uploadDate: '2024-01-16 09:30:00',
        lastCalcDate: '2024-01-26',
        ticketCount: 156,
        status: 'available',
        files: {
            calculation: [],
            approval: [],
            invoice: []
        }
    },
    {
        id: 'FILE-007',
        name: 'Oscorp_Tickets_Jan2024_v1.2.xlsx',
        version: 'v1.2',
        uploadDate: '2024-01-16 10:45:00',
        lastCalcDate: '2024-01-26',
        ticketCount: 94,
        status: 'available',
        files: {
            calculation: [],
            approval: [],
            invoice: []
        }
    },
    {
        id: 'FILE-008',
        name: 'DailyPlanet_Tickets_Jan2024_v1.0.xlsx',
        version: 'v1.0',
        uploadDate: '2024-01-16 13:20:00',
        lastCalcDate: '2024-01-26',
        ticketCount: 78,
        status: 'available',
        files: {
            calculation: [],
            approval: [],
            invoice: []
        }
    },
    {
        id: 'FILE-009',
        name: 'Krypton_Tickets_Jan2024_v3.1.xlsx',
        version: 'v3.1',
        uploadDate: '2024-01-16 15:00:00',
        lastCalcDate: '2024-01-26',
        ticketCount: 112,
        status: 'calculated',
        files: {
            calculation: [
                { name: 'calc_results_v3.1.xlsx', version: 'v3.1', date: '2024-01-16 16:30:00', size: '2.1 MB', generatedBy: 'System' }
            ],
            approval: [],
            invoice: []
        },
        calculatedFile: 'Krypton_Calculated_Jan2024_v3.1.xlsx',
        calculationDate: '2024-01-16 16:30:00',
        ticketsProcessed: 112
    },
    {
        id: 'FILE-010',
        name: 'Metropolis_Tickets_Jan2024_v2.0.xlsx',
        version: 'v2.0',
        uploadDate: '2024-01-16 16:15:00',
        lastCalcDate: '2024-01-26',
        ticketCount: 203,
        status: 'available',
        files: {
            calculation: [],
            approval: [],
            invoice: []
        }
    }
];

// Enhanced cycles data with file references
const cycles = [
    {
        cycleId: '2024-01',
        customer: 'Acme Corp',
        region: 'EMEA',
        status: 'In Progress',
        currentStep: 'Rate Match',
        processed: 125,
        errors: 3,
        lastAction: '2024-01-15 09:10:00 (System)',
        uploadRef: 'UPL-00123',
        slaTimer: '02:30:15',
        slaFlag: 'warning',
        sourceFile: {
            id: 'FILE-001',
            name: 'HCL_Tickets_Jan2024_v1.0.xlsx',
            version: 'v1.0',
            uploadDate: '2024-01-15 09:00:00',
            isActive: true
        },
        files: {
            calculation: ['calc_results_v1.0.xlsx', 'calc_report_v1.0.pdf'],
            approval: ['approval_v1.0.pdf'],
            invoice: []
        },
        manualIntervention: {
            required: true,
            step: 'Rate Card Assignment',
            startedAt: '2024-01-15 09:10:00',
            assignedTo: 'FSO User',
            dueBy: '2024-01-15 17:00:00',
            status: 'manual-pending',
            details: {
                ticketCount: 3,
                issueType: 'Rate mismatch',
                affectedTickets: ['TKT-001', 'TKT-003', 'TKT-007']
            }
        },
        details: {
            startedAt: '2024-01-15 09:00:00',
            recordsTotal: 125,
            recordsProcessed: 122,
            successRate: '97.6%'
        }
    },
    {
        cycleId: '2024-01',
        customer: 'Globex Corporation',
        region: 'APAC',
        status: 'Completed',
        currentStep: 'Invoice',
        processed: 89,
        errors: 0,
        lastAction: '2024-01-15 08:45:00 (Admin)',
        uploadRef: 'UPL-00122',
        slaTimer: '04:15:30',
        slaFlag: 'success',
        sourceFile: {
            id: 'FILE-002',
            name: 'Acme_Tickets_Jan2024_v1.1.xlsx',
            version: 'v1.1',
            uploadDate: '2024-01-15 10:30:00',
            isActive: true
        },
        files: {
            calculation: [],
            approval: [],
            invoice: []
        },
        manualIntervention: {
            required: false,
            step: null,
            startedAt: null,
            assignedTo: null,
            dueBy: null,
            status: null,
            details: null
        },
        details: {
            startedAt: '2024-01-15 08:00:00',
            recordsTotal: 89,
            recordsProcessed: 89,
            successRate: '100%'
        }
    },
    {
        cycleId: '2024-01',
        customer: 'Wayne Enterprises',
        region: 'NA',
        status: 'Validation Failed',
        currentStep: 'Ticket Match',
        processed: 67,
        errors: 12,
        lastAction: '2024-01-15 09:05:00 (System)',
        uploadRef: null,
        slaTimer: '01:45:20',
        slaFlag: 'error',
        sourceFile: {
            id: 'FILE-003',
            name: 'Wayne_Tickets_Jan2024_v2.0.xlsx',
            version: 'v2.0',
            uploadDate: '2024-01-15 08:15:00',
            isActive: true
        },
        files: {
            calculation: ['calc_results_v2.0.xlsx'],
            approval: [],
            invoice: []
        },
        manualIntervention: {
            required: true,
            step: 'Ticket Data Distribution',
            startedAt: '2024-01-15 09:05:00',
            assignedTo: 'SDM User',
            dueBy: '2024-01-15 14:00:00',
            status: 'manual-in-progress',
            details: {
                ticketCount: 12,
                issueType: 'Validation errors',
                affectedTickets: ['TKT-101', 'TKT-102', 'TKT-103']
            }
        },
        details: {
            startedAt: '2024-01-15 08:30:00',
            recordsTotal: 67,
            recordsProcessed: 55,
            successRate: '82.1%'
        }
    },
    {
        cycleId: '2024-01',
        customer: 'Stark Industries',
        region: 'EU',
        status: 'Paused',
        currentStep: 'File Gen',
        processed: 42,
        errors: 1,
        lastAction: '2024-01-15 09:15:00 (Admin)',
        uploadRef: null,
        slaTimer: '03:20:45',
        slaFlag: 'warning',
        sourceFile: {
            id: 'FILE-004',
            name: 'Stark_Tickets_Jan2024_v1.0.xlsx',
            version: 'v1.0',
            uploadDate: '2024-01-15 09:45:00',
            isActive: true
        },
        files: {
            calculation: ['calc_results_v1.0.xlsx', 'calc_report_v1.0.pdf'],
            approval: ['approval_v1.0.pdf', 'approval_notes_v1.0.txt'],
            invoice: []
        },
        manualIntervention: {
            required: true,
            step: 'Rate Card Assignment',
            startedAt: '2024-01-15 09:15:00',
            assignedTo: 'FSO User',
            dueBy: '2024-01-15 18:00:00',
            status: 'manual-in-progress',
            details: {
                ticketCount: 1,
                issueType: 'Complex calculation required',
                affectedTickets: ['TKT-201']
            }
        },
        details: {
            startedAt: '2024-01-15 08:45:00',
            recordsTotal: 42,
            recordsProcessed: 41,
            successRate: '97.6%'
        }
    },
    {
        cycleId: '2024-01',
        customer: 'Umbrella Corp',
        region: 'LATAM',
        status: 'In Progress',
        currentStep: 'Ticket Match',
        processed: 31,
        errors: 0,
        lastAction: '2024-01-15 09:18:00 (System)',
        uploadRef: null,
        slaTimer: '00:45:10',
        slaFlag: 'success',
        sourceFile: {
            id: 'FILE-005',
            name: 'Umbrella_Tickets_Jan2024_v3.0.xlsx',
            version: 'v3.0',
            uploadDate: '2024-01-15 11:20:00',
            isActive: true
        },
        files: {
            calculation: [],
            approval: [],
            invoice: []
        },
        manualIntervention: {
            required: false,
            step: null,
            startedAt: null,
            assignedTo: null,
            dueBy: null,
            status: null,
            details: null
        },
        details: {
            startedAt: '2024-01-15 09:00:00',
            recordsTotal: 31,
            recordsProcessed: 31,
            successRate: '100%'
        }
    }
];

const stepLogs = {
    1: [
        { time: '09:00:00', message: 'Ticket matching started', type: 'info' },
        { time: '09:05:00', message: 'Found 122 matching tickets', type: 'success' },
        { time: '09:08:00', message: '3 tickets require manual review', type: 'warning' }
    ],
    2: [
        { time: '09:10:00', message: 'Rate matching started for 125 records', type: 'info' },
        { time: '09:10:15', message: 'Found 122 matching rate entries', type: 'success' },
        { time: '09:10:30', message: '3 records missing rate matches', type: 'warning' },
        { time: '09:11:00', message: 'Applied fallback rates for 2 records', type: 'info' },
        { time: '09:11:30', message: '1 record requires manual intervention - Rate Card Assignment needed', type: 'manual' }
    ]
};

// Table configuration
const tableConfig = {
    columns: [
        { id: 'cycleId', label: 'Cycle ID', visible: true, sortable: true },
        { id: 'customer', label: 'Customer', visible: true, sortable: true },
        { id: 'region', label: 'Region', visible: true, sortable: true },
        { id: 'status', label: 'Status', visible: true, sortable: true },
        { id: 'currentStep', label: 'Current Step', visible: true, sortable: true },
        { id: 'processed', label: 'Processed', visible: true, sortable: true },
        { id: 'errors', label: 'Errors', visible: true, sortable: true },
        { id: 'lastAction', label: 'Last Action', visible: true, sortable: true },
        { id: 'uploadRef', label: 'Upload Ref', visible: true, sortable: true },
        { id: 'slaTimer', label: 'SLA Timer', visible: true, sortable: true },
        { id: 'manualIntervention', label: 'Manual Intervention', visible: true, sortable: false },
        { id: 'manualStep', label: 'Manual Step', visible: true, sortable: false },
        { id: 'sourceFile', label: 'Source File', visible: true, sortable: false },
        { id: 'files', label: 'Files', visible: true, sortable: false },
        { id: 'actions', label: 'Actions', visible: true, sortable: false }
    ],
    pageSize: 10,
    currentPage: 1,
    sortColumn: 'lastAction',
    sortDirection: 'desc'
};

let currentStep = 2;
let advancedFilters = [];
let filteredCycles = [...cycles];
let activeFile = null;
let fileLogs = [];

// ==================== FILE MANAGER FUNCTIONS ====================

// Initialize Redesigned File Manager
function initRedesignedFileManager() {
    const modal = document.getElementById('fileManagerModal');
    const openBtn = document.getElementById('openFileManagerBtn');
    const closeBtn = document.getElementById('closeFileManagerModal');
    const closeBtn2 = document.getElementById('closeFileManager');
    
    if (!modal || !openBtn) {
        console.error('File Manager elements not found!');
        return;
    }
    
    openBtn.addEventListener('click', () => {
        modal.classList.add('active');
        loadAvailableFiles();
        loadCalculatedFiles();
        loadApprovalFiles();
        loadInvoiceFiles();
        updateFileStats();
    });
    
    if (closeBtn) {
        closeBtn.addEventListener('click', () => {
            modal.classList.remove('active');
        });
    }
    
    if (closeBtn2) {
        closeBtn2.addEventListener('click', () => {
            modal.classList.remove('active');
        });
    }
    
    // Initialize 4-way tabs
    initFourWayTabs();
    
    // Initialize filters for each tab
    initAvailableFilters();
    initCalculatedFilters();
    initApprovalFilters();
    initInvoiceFilters();
    
    // Initialize action buttons for each tab
    initAvailableActions();
    initCalculatedActions();
    initApprovalActions();
    initInvoiceActions();
    
    // Initialize file selection for each tab
    setTimeout(() => {
        setupTabFileSelection();
    }, 500);
}

// Initialize 4-way tabs
function initFourWayTabs() {
    const tabButtons = document.querySelectorAll('#fileManagerModal .file-manager-tabs .tab-btn');
    const tabContents = document.querySelectorAll('#fileManagerModal .file-manager-tabs .tab-content');
    
    tabButtons.forEach(button => {
        button.addEventListener('click', () => {
            const tabId = button.getAttribute('data-tab');
            
            tabButtons.forEach(btn => btn.classList.remove('active'));
            tabContents.forEach(content => content.classList.remove('active'));
            
            button.classList.add('active');
            const tabElement = document.getElementById(tabId + '-tab');
            if (tabElement) {
                tabElement.classList.add('active');
            }
        });
    });
}

// Load Available Files
function loadAvailableFiles() {
    const tbody = document.getElementById('availableFilesBody');
    if (!tbody) return;
    
    const availableFiles = ticketFiles.filter(f => f.status === 'available');
    
    tbody.innerHTML = '';
    
    if (availableFiles.length === 0) {
        tbody.innerHTML = '<tr><td colspan="8" style="text-align: center; padding: 40px;">No available files found</td></tr>';
        return;
    }
    
    availableFiles.forEach(file => {
        const row = document.createElement('tr');
        row.dataset.fileId = file.id;
        
        const uploadDate = new Date(file.uploadDate);
        const formattedDate = uploadDate.toLocaleDateString() + ' ' + uploadDate.toLocaleTimeString();
        
        row.innerHTML = `
            <td><input type="radio" name="availableFile" value="${file.id}" class="available-selector"></td>
            <td><span class="file-name" style="border-left-color: #3b82f6"><i class="fas fa-file-excel"></i> ${file.name}</span></td>
            <td><span class="status-badge status-info">${file.version}</span></td>
            <td>${formattedDate}</td>
            <td>${file.lastCalcDate}</td>
            <td><span class="status-badge status-success">${file.ticketCount}</span></td>
            <td><span class="status-badge status-info">AVAILABLE</span></td>
            <td>
                <div class="inline-actions">
                    <button class="action-btn btn-view" onclick="previewFileDirect('${file.id}')" title="Preview">
                        <i class="fas fa-eye"></i>
                    </button>
                    <button class="action-btn btn-download" onclick="downloadFileDirect('${file.id}')" title="Download">
                        <i class="fas fa-download"></i>
                    </button>
                    <button class="action-btn btn-calc" onclick="calculateFileDirect('${file.id}')" title="Calculate">
                        <i class="fas fa-calculator"></i>
                    </button>
                    <button class="action-btn btn-load" onclick="loadFileDirect('${file.id}')" title="Load Tickets">
                        <i class="fas fa-file-import"></i>
                    </button>
                </div>
            </td>
        `;
        
        tbody.appendChild(row);
    });
}

// Load Calculated Files
function loadCalculatedFiles() {
    const tbody = document.getElementById('calculatedFilesBody');
    if (!tbody) return;
    
    const calculatedFiles = ticketFiles.filter(f => f.status === 'calculated');
    
    tbody.innerHTML = '';
    
    if (calculatedFiles.length === 0) {
        tbody.innerHTML = '<tr><td colspan="7" style="text-align: center; padding: 40px;">No calculated files found</td></tr>';
        return;
    }
    
    calculatedFiles.forEach(file => {
        const row = document.createElement('tr');
        row.dataset.fileId = file.id;
        
        const calcDate = new Date(file.calculationDate);
        const formattedDate = calcDate.toLocaleDateString() + ' ' + calcDate.toLocaleTimeString();
        
        row.innerHTML = `
            <td><input type="radio" name="calculatedFile" value="${file.id}" class="calculated-selector"></td>
            <td><span class="file-name"><i class="fas fa-file-excel"></i> ${file.name}</span></td>
            <td><span class="file-name"><i class="fas fa-file-calc"></i> ${file.calculatedFile || 'N/A'}</span></td>
            <td><span class="status-badge status-info">${file.version}</span></td>
            <td>${formattedDate}</td>
            <td><span class="status-badge status-success">${file.ticketsProcessed || file.ticketCount}</span></td>
            <td>
                <div class="inline-actions">
                    <button class="action-btn btn-view" onclick="viewResultsDirect('${file.id}')" title="View Results">
                        <i class="fas fa-chart-line"></i>
                    </button>
                    <button class="action-btn btn-export" onclick="exportResultsDirect('${file.id}')" title="Export">
                        <i class="fas fa-file-export"></i>
                    </button>
                    <button class="action-btn btn-download" onclick="downloadCalculatedDirect('${file.id}')" title="Download">
                        <i class="fas fa-download"></i>
                    </button>
                    <button class="action-btn btn-send" onclick="sendForApprovalDirect('${file.id}')" title="Send for Approval">
                        <i class="fas fa-paper-plane"></i>
                    </button>
                </div>
            </td>
        `;
        
        tbody.appendChild(row);
    });
}

// Load Approval Files
function loadApprovalFiles() {
    const tbody = document.getElementById('approvalFilesBody');
    if (!tbody) return;
    
    const approvalFiles = ticketFiles.filter(f => f.status === 'approval');
    
    tbody.innerHTML = '';
    
    if (approvalFiles.length === 0) {
        tbody.innerHTML = '<tr><td colspan="7" style="text-align: center; padding: 40px;">No approval files found</td></tr>';
        return;
    }
    
    approvalFiles.forEach(file => {
        const row = document.createElement('tr');
        row.dataset.fileId = file.id;
        
        const approvalDate = new Date(file.approvalDate);
        const formattedDate = approvalDate.toLocaleDateString() + ' ' + approvalDate.toLocaleTimeString();
        
        let statusClass = file.approvalStatus === 'approved' ? 'status-success' : 'status-warning';
        let statusText = file.approvalStatus === 'approved' ? 'APPROVED' : 'PENDING';
        
        row.innerHTML = `
            <td><input type="radio" name="approvalFile" value="${file.id}" class="approval-selector"></td>
            <td><span class="file-name"><i class="fas fa-file-pdf"></i> ${file.approvalFile || 'N/A'}</span></td>
            <td><span class="status-badge status-info">${file.version}</span></td>
            <td>${formattedDate}</td>
            <td><span class="status-badge status-success">${file.approvedBy || 'Pending'}</span></td>
            <td><span class="status-badge ${statusClass}">${statusText}</span></td>
            <td>
                <div class="inline-actions">
                    <button class="action-btn btn-view" onclick="viewApprovalDirect('${file.id}')" title="View">
                        <i class="fas fa-file-pdf"></i>
                    </button>
                    <button class="action-btn btn-success" onclick="approveFileDirect('${file.id}')" title="Approve">
                        <i class="fas fa-check-circle"></i>
                    </button>
                    <button class="action-btn btn-download" onclick="downloadApprovalDirect('${file.id}')" title="Download">
                        <i class="fas fa-download"></i>
                    </button>
                    <button class="action-btn btn-warning" onclick="rejectFileDirect('${file.id}')" title="Reject">
                        <i class="fas fa-times-circle"></i>
                    </button>
                </div>
            </td>
        `;
        
        tbody.appendChild(row);
    });
}

// Load Invoice Files
function loadInvoiceFiles() {
    const tbody = document.getElementById('invoiceFilesBody');
    if (!tbody) return;
    
    const invoiceFiles = ticketFiles.filter(f => f.status === 'invoice');
    
    tbody.innerHTML = '';
    
    if (invoiceFiles.length === 0) {
        tbody.innerHTML = '<tr><td colspan="7" style="text-align: center; padding: 40px;">No invoice files found</td></tr>';
        return;
    }
    
    invoiceFiles.forEach(file => {
        const row = document.createElement('tr');
        row.dataset.fileId = file.id;
        
        const invoiceDate = new Date(file.invoiceDate);
        const formattedDate = invoiceDate.toLocaleDateString();
        
        let statusClass = file.invoiceStatus === 'paid' ? 'status-success' : 
                         file.invoiceStatus === 'sent' ? 'status-info' : 'status-warning';
        
        row.innerHTML = `
            <td><input type="radio" name="invoiceFile" value="${file.id}" class="invoice-selector"></td>
            <td><span class="file-name"><i class="fas fa-file-invoice"></i> ${file.invoiceNumber || 'N/A'}</span></td>
            <td><span class="file-name"><i class="fas fa-file-excel"></i> ${file.name}</span></td>
            <td>${formattedDate}</td>
            <td><span class="status-badge status-success">${file.invoiceAmount || '$0.00'}</span></td>
            <td><span class="status-badge ${statusClass}">${file.invoiceStatus ? file.invoiceStatus.toUpperCase() : 'N/A'}</span></td>
            <td>
                <div class="inline-actions">
                    <button class="action-btn btn-view" onclick="viewInvoiceDirect('${file.id}')" title="View Invoice">
                        <i class="fas fa-file-pdf"></i>
                    </button>
                    <button class="action-btn btn-download" onclick="downloadInvoiceDirect('${file.id}')" title="Download">
                        <i class="fas fa-download"></i>
                    </button>
                    <button class="action-btn btn-email" onclick="emailInvoiceDirect('${file.id}')" title="Email">
                        <i class="fas fa-envelope"></i>
                    </button>
                    <button class="action-btn btn-print" onclick="printInvoiceDirect('${file.id}')" title="Print">
                        <i class="fas fa-print"></i>
                    </button>
                </div>
            </td>
        `;
        
        tbody.appendChild(row);
    });
}

// Initialize Available Filters
function initAvailableFilters() {
    const searchInput = document.getElementById('availableFileSearch');
    const versionFilter = document.getElementById('availableVersionFilter');
    const dateFilter = document.getElementById('availableDateFilter');
    const clearBtn = document.getElementById('clearAvailableFilters');
    
    if (searchInput) searchInput.addEventListener('input', filterAvailableFiles);
    if (versionFilter) versionFilter.addEventListener('change', filterAvailableFiles);
    if (dateFilter) dateFilter.addEventListener('change', filterAvailableFiles);
    if (clearBtn) clearBtn.addEventListener('click', clearAvailableFilters);
}

// Filter Available Files
function filterAvailableFiles() {
    const searchTerm = document.getElementById('availableFileSearch')?.value.toLowerCase() || '';
    const version = document.getElementById('availableVersionFilter')?.value || '';
    const dateFilter = document.getElementById('availableDateFilter')?.value || '';
    
    const rows = document.querySelectorAll('#availableFilesBody tr');
    
    rows.forEach(row => {
        if (row.cells.length < 2) return;
        
        let show = true;
        const fileName = row.cells[1]?.textContent.toLowerCase() || '';
        const fileVersion = row.cells[2]?.textContent || '';
        const fileDate = row.cells[3]?.textContent || '';
        
        if (searchTerm && !fileName.includes(searchTerm)) show = false;
        if (version && fileVersion !== version) show = false;
        
        if (dateFilter && show) {
            const today = new Date();
            const fileDateObj = new Date(fileDate);
            
            switch(dateFilter) {
                case 'today':
                    if (fileDateObj.toDateString() !== today.toDateString()) show = false;
                    break;
                case 'yesterday':
                    const yesterday = new Date(today);
                    yesterday.setDate(yesterday.getDate() - 1);
                    if (fileDateObj.toDateString() !== yesterday.toDateString()) show = false;
                    break;
                case 'thisweek':
                    const weekAgo = new Date(today);
                    weekAgo.setDate(weekAgo.getDate() - 7);
                    if (fileDateObj < weekAgo) show = false;
                    break;
                case 'thismonth':
                    if (fileDateObj.getMonth() !== today.getMonth() || fileDateObj.getFullYear() !== today.getFullYear()) show = false;
                    break;
            }
        }
        
        row.style.display = show ? '' : 'none';
    });
}

// Clear Available Filters
function clearAvailableFilters() {
    const searchInput = document.getElementById('availableFileSearch');
    const versionFilter = document.getElementById('availableVersionFilter');
    const dateFilter = document.getElementById('availableDateFilter');
    
    if (searchInput) searchInput.value = '';
    if (versionFilter) versionFilter.value = '';
    if (dateFilter) dateFilter.value = '';
    
    filterAvailableFiles();
}

// Initialize Calculated Filters
function initCalculatedFilters() {
    const searchInput = document.getElementById('calculatedFileSearch');
    const versionFilter = document.getElementById('calculatedVersionFilter');
    const dateFilter = document.getElementById('calculatedDateFilter');
    const clearBtn = document.getElementById('clearCalculatedFilters');
    
    if (searchInput) searchInput.addEventListener('input', filterCalculatedFiles);
    if (versionFilter) versionFilter.addEventListener('change', filterCalculatedFiles);
    if (dateFilter) dateFilter.addEventListener('change', filterCalculatedFiles);
    if (clearBtn) clearBtn.addEventListener('click', clearCalculatedFilters);
}

// Filter Calculated Files
function filterCalculatedFiles() {
    const searchTerm = document.getElementById('calculatedFileSearch')?.value.toLowerCase() || '';
    const version = document.getElementById('calculatedVersionFilter')?.value || '';
    const dateFilter = document.getElementById('calculatedDateFilter')?.value || '';
    
    const rows = document.querySelectorAll('#calculatedFilesBody tr');
    
    rows.forEach(row => {
        if (row.cells.length < 2) return;
        
        let show = true;
        const fileName = row.cells[1]?.textContent.toLowerCase() || '';
        const fileVersion = row.cells[3]?.textContent || '';
        const fileDate = row.cells[4]?.textContent || '';
        
        if (searchTerm && !fileName.includes(searchTerm)) show = false;
        if (version && fileVersion !== version) show = false;
        
        if (dateFilter && show) {
            const today = new Date();
            const fileDateObj = new Date(fileDate);
            
            switch(dateFilter) {
                case 'today':
                    if (fileDateObj.toDateString() !== today.toDateString()) show = false;
                    break;
                case 'yesterday':
                    const yesterday = new Date(today);
                    yesterday.setDate(yesterday.getDate() - 1);
                    if (fileDateObj.toDateString() !== yesterday.toDateString()) show = false;
                    break;
                case 'thisweek':
                    const weekAgo = new Date(today);
                    weekAgo.setDate(weekAgo.getDate() - 7);
                    if (fileDateObj < weekAgo) show = false;
                    break;
                case 'thismonth':
                    if (fileDateObj.getMonth() !== today.getMonth() || fileDateObj.getFullYear() !== today.getFullYear()) show = false;
                    break;
            }
        }
        
        row.style.display = show ? '' : 'none';
    });
}

// Clear Calculated Filters
function clearCalculatedFilters() {
    const searchInput = document.getElementById('calculatedFileSearch');
    const versionFilter = document.getElementById('calculatedVersionFilter');
    const dateFilter = document.getElementById('calculatedDateFilter');
    
    if (searchInput) searchInput.value = '';
    if (versionFilter) versionFilter.value = '';
    if (dateFilter) dateFilter.value = '';
    
    filterCalculatedFiles();
}

// Initialize Approval Filters
function initApprovalFilters() {
    const searchInput = document.getElementById('approvalFileSearch');
    const versionFilter = document.getElementById('approvalVersionFilter');
    const dateFilter = document.getElementById('approvalDateFilter');
    const clearBtn = document.getElementById('clearApprovalFilters');
    
    if (searchInput) searchInput.addEventListener('input', filterApprovalFiles);
    if (versionFilter) versionFilter.addEventListener('change', filterApprovalFiles);
    if (dateFilter) dateFilter.addEventListener('change', filterApprovalFiles);
    if (clearBtn) clearBtn.addEventListener('click', clearApprovalFilters);
}

// Filter Approval Files
function filterApprovalFiles() {
    const searchTerm = document.getElementById('approvalFileSearch')?.value.toLowerCase() || '';
    const version = document.getElementById('approvalVersionFilter')?.value || '';
    const dateFilter = document.getElementById('approvalDateFilter')?.value || '';
    
    const rows = document.querySelectorAll('#approvalFilesBody tr');
    
    rows.forEach(row => {
        if (row.cells.length < 2) return;
        
        let show = true;
        const fileName = row.cells[1]?.textContent.toLowerCase() || '';
        const fileVersion = row.cells[2]?.textContent || '';
        const fileDate = row.cells[3]?.textContent || '';
        
        if (searchTerm && !fileName.includes(searchTerm)) show = false;
        if (version && fileVersion !== version) show = false;
        
        if (dateFilter && show) {
            const today = new Date();
            const fileDateObj = new Date(fileDate);
            
            switch(dateFilter) {
                case 'today':
                    if (fileDateObj.toDateString() !== today.toDateString()) show = false;
                    break;
                case 'yesterday':
                    const yesterday = new Date(today);
                    yesterday.setDate(yesterday.getDate() - 1);
                    if (fileDateObj.toDateString() !== yesterday.toDateString()) show = false;
                    break;
                case 'thisweek':
                    const weekAgo = new Date(today);
                    weekAgo.setDate(weekAgo.getDate() - 7);
                    if (fileDateObj < weekAgo) show = false;
                    break;
                case 'thismonth':
                    if (fileDateObj.getMonth() !== today.getMonth() || fileDateObj.getFullYear() !== today.getFullYear()) show = false;
                    break;
            }
        }
        
        row.style.display = show ? '' : 'none';
    });
}

// Clear Approval Filters
function clearApprovalFilters() {
    const searchInput = document.getElementById('approvalFileSearch');
    const versionFilter = document.getElementById('approvalVersionFilter');
    const dateFilter = document.getElementById('approvalDateFilter');
    
    if (searchInput) searchInput.value = '';
    if (versionFilter) versionFilter.value = '';
    if (dateFilter) dateFilter.value = '';
    
    filterApprovalFiles();
}

// Initialize Invoice Filters
function initInvoiceFilters() {
    const searchInput = document.getElementById('invoiceFileSearch');
    const versionFilter = document.getElementById('invoiceVersionFilter');
    const dateFilter = document.getElementById('invoiceDateFilter');
    const clearBtn = document.getElementById('clearInvoiceFilters');
    
    if (searchInput) searchInput.addEventListener('input', filterInvoiceFiles);
    if (versionFilter) versionFilter.addEventListener('change', filterInvoiceFiles);
    if (dateFilter) dateFilter.addEventListener('change', filterInvoiceFiles);
    if (clearBtn) clearBtn.addEventListener('click', clearInvoiceFilters);
}

// Filter Invoice Files
function filterInvoiceFiles() {
    const searchTerm = document.getElementById('invoiceFileSearch')?.value.toLowerCase() || '';
    const version = document.getElementById('invoiceVersionFilter')?.value || '';
    const dateFilter = document.getElementById('invoiceDateFilter')?.value || '';
    
    const rows = document.querySelectorAll('#invoiceFilesBody tr');
    
    rows.forEach(row => {
        if (row.cells.length < 2) return;
        
        let show = true;
        const invoiceNum = row.cells[1]?.textContent.toLowerCase() || '';
        const fileName = row.cells[2]?.textContent.toLowerCase() || '';
        const fileDate = row.cells[3]?.textContent || '';
        
        if (searchTerm && !invoiceNum.includes(searchTerm) && !fileName.includes(searchTerm)) show = false;
        
        if (dateFilter && show) {
            const today = new Date();
            const fileDateObj = new Date(fileDate);
            
            switch(dateFilter) {
                case 'today':
                    if (fileDateObj.toDateString() !== today.toDateString()) show = false;
                    break;
                case 'yesterday':
                    const yesterday = new Date(today);
                    yesterday.setDate(yesterday.getDate() - 1);
                    if (fileDateObj.toDateString() !== yesterday.toDateString()) show = false;
                    break;
                case 'thisweek':
                    const weekAgo = new Date(today);
                    weekAgo.setDate(weekAgo.getDate() - 7);
                    if (fileDateObj < weekAgo) show = false;
                    break;
                case 'thismonth':
                    if (fileDateObj.getMonth() !== today.getMonth() || fileDateObj.getFullYear() !== today.getFullYear()) show = false;
                    break;
            }
        }
        
        row.style.display = show ? '' : 'none';
    });
}

// Clear Invoice Filters
function clearInvoiceFilters() {
    const searchInput = document.getElementById('invoiceFileSearch');
    const versionFilter = document.getElementById('invoiceVersionFilter');
    const dateFilter = document.getElementById('invoiceDateFilter');
    
    if (searchInput) searchInput.value = '';
    if (versionFilter) versionFilter.value = '';
    if (dateFilter) dateFilter.value = '';
    
    filterInvoiceFiles();
}

// Setup Tab File Selection
function setupTabFileSelection() {
    // Available tab selection
    document.querySelectorAll('.available-selector').forEach(selector => {
        selector.addEventListener('change', function() {
            const selectedId = this.value;
            const file = ticketFiles.find(f => f.id === selectedId);
            
            const infoEl = document.getElementById('availableSelectedInfo');
            if (infoEl) {
                infoEl.innerHTML = file ? `<i class="fas fa-file-excel"></i> ${file.name} (${file.ticketCount} tickets)` : 'No file selected';
            }
            
            const loadBtn = document.getElementById('availableLoadBtn');
            const calcBtn = document.getElementById('availableCalculateBtn');
            const downloadBtn = document.getElementById('availableDownloadBtn');
            const previewBtn = document.getElementById('availablePreviewBtn');
            
            if (loadBtn) loadBtn.disabled = !file;
            if (calcBtn) calcBtn.disabled = !file;
            if (downloadBtn) downloadBtn.disabled = !file;
            if (previewBtn) previewBtn.disabled = !file;
        });
    });
    
    // Calculated tab selection
    document.querySelectorAll('.calculated-selector').forEach(selector => {
        selector.addEventListener('change', function() {
            const selectedId = this.value;
            const file = ticketFiles.find(f => f.id === selectedId);
            
            const infoEl = document.getElementById('calculatedSelectedInfo');
            if (infoEl) {
                infoEl.innerHTML = file ? `<i class="fas fa-file-calc"></i> ${file.calculatedFile || file.name}` : 'No file selected';
            }
            
            const viewBtn = document.getElementById('calculatedViewBtn');
            const exportBtn = document.getElementById('calculatedExportBtn');
            const downloadBtn = document.getElementById('calculatedDownloadBtn');
            
            if (viewBtn) viewBtn.disabled = !file;
            if (exportBtn) exportBtn.disabled = !file;
            if (downloadBtn) downloadBtn.disabled = !file;
        });
    });
    
    // Approval tab selection
    document.querySelectorAll('.approval-selector').forEach(selector => {
        selector.addEventListener('change', function() {
            const selectedId = this.value;
            const file = ticketFiles.find(f => f.id === selectedId);
            
            const infoEl = document.getElementById('approvalSelectedInfo');
            if (infoEl) {
                infoEl.innerHTML = file ? `<i class="fas fa-file-pdf"></i> ${file.approvalFile || 'Approval File'}` : 'No file selected';
            }
            
            const viewBtn = document.getElementById('approvalViewBtn');
            const approveBtn = document.getElementById('approvalApproveBtn');
            const downloadBtn = document.getElementById('approvalDownloadBtn');
            const rejectBtn = document.getElementById('approvalRejectBtn');
            
            if (viewBtn) viewBtn.disabled = !file;
            if (approveBtn) approveBtn.disabled = !file;
            if (downloadBtn) downloadBtn.disabled = !file;
            if (rejectBtn) rejectBtn.disabled = !file;
        });
    });
    
    // Invoice tab selection
    document.querySelectorAll('.invoice-selector').forEach(selector => {
        selector.addEventListener('change', function() {
            const selectedId = this.value;
            const file = ticketFiles.find(f => f.id === selectedId);
            
            const infoEl = document.getElementById('invoiceSelectedInfo');
            if (infoEl) {
                infoEl.innerHTML = file ? `<i class="fas fa-file-invoice"></i> ${file.invoiceNumber || 'Invoice'} (${file.invoiceAmount || '$0'})` : 'No file selected';
            }
            
            const viewBtn = document.getElementById('invoiceViewBtn');
            const downloadBtn = document.getElementById('invoiceDownloadBtn');
            const emailBtn = document.getElementById('invoiceEmailBtn');
            
            if (viewBtn) viewBtn.disabled = !file;
            if (downloadBtn) downloadBtn.disabled = !file;
            if (emailBtn) emailBtn.disabled = !file;
        });
    });
}

// Initialize Available Actions
function initAvailableActions() {
    const loadBtn = document.getElementById('availableLoadBtn');
    const calcBtn = document.getElementById('availableCalculateBtn');
    const downloadBtn = document.getElementById('availableDownloadBtn');
    const previewBtn = document.getElementById('availablePreviewBtn');
    
    if (loadBtn) {
        loadBtn.addEventListener('click', () => {
            const selected = document.querySelector('.available-selector:checked');
            if (selected) loadFileDirect(selected.value);
        });
    }
    
    if (calcBtn) {
        calcBtn.addEventListener('click', () => {
            const selected = document.querySelector('.available-selector:checked');
            if (selected) calculateFileDirect(selected.value);
        });
    }
    
    if (downloadBtn) {
        downloadBtn.addEventListener('click', () => {
            const selected = document.querySelector('.available-selector:checked');
            if (selected) downloadFileDirect(selected.value);
        });
    }
    
    if (previewBtn) {
        previewBtn.addEventListener('click', () => {
            const selected = document.querySelector('.available-selector:checked');
            if (selected) previewFileDirect(selected.value);
        });
    }
}

// Initialize Calculated Actions
function initCalculatedActions() {
    const viewBtn = document.getElementById('calculatedViewBtn');
    const exportBtn = document.getElementById('calculatedExportBtn');
    const downloadBtn = document.getElementById('calculatedDownloadBtn');
    
    if (viewBtn) {
        viewBtn.addEventListener('click', () => {
            const selected = document.querySelector('.calculated-selector:checked');
            if (selected) viewResultsDirect(selected.value);
        });
    }
    
    if (exportBtn) {
        exportBtn.addEventListener('click', () => {
            const selected = document.querySelector('.calculated-selector:checked');
            if (selected) exportResultsDirect(selected.value);
        });
    }
    
    if (downloadBtn) {
        downloadBtn.addEventListener('click', () => {
            const selected = document.querySelector('.calculated-selector:checked');
            if (selected) downloadCalculatedDirect(selected.value);
        });
    }
}

// Initialize Approval Actions
function initApprovalActions() {
    const viewBtn = document.getElementById('approvalViewBtn');
    const approveBtn = document.getElementById('approvalApproveBtn');
    const downloadBtn = document.getElementById('approvalDownloadBtn');
    const rejectBtn = document.getElementById('approvalRejectBtn');
    
    if (viewBtn) {
        viewBtn.addEventListener('click', () => {
            const selected = document.querySelector('.approval-selector:checked');
            if (selected) viewApprovalDirect(selected.value);
        });
    }
    
    if (approveBtn) {
        approveBtn.addEventListener('click', () => {
            const selected = document.querySelector('.approval-selector:checked');
            if (selected) approveFileDirect(selected.value);
        });
    }
    
    if (downloadBtn) {
        downloadBtn.addEventListener('click', () => {
            const selected = document.querySelector('.approval-selector:checked');
            if (selected) downloadApprovalDirect(selected.value);
        });
    }
    
    if (rejectBtn) {
        rejectBtn.addEventListener('click', () => {
            const selected = document.querySelector('.approval-selector:checked');
            if (selected) rejectFileDirect(selected.value);
        });
    }
}

// Initialize Invoice Actions
function initInvoiceActions() {
    const viewBtn = document.getElementById('invoiceViewBtn');
    const downloadBtn = document.getElementById('invoiceDownloadBtn');
    const emailBtn = document.getElementById('invoiceEmailBtn');
    
    if (viewBtn) {
        viewBtn.addEventListener('click', () => {
            const selected = document.querySelector('.invoice-selector:checked');
            if (selected) viewInvoiceDirect(selected.value);
        });
    }
    
    if (downloadBtn) {
        downloadBtn.addEventListener('click', () => {
            const selected = document.querySelector('.invoice-selector:checked');
            if (selected) downloadInvoiceDirect(selected.value);
        });
    }
    
    if (emailBtn) {
        emailBtn.addEventListener('click', () => {
            const selected = document.querySelector('.invoice-selector:checked');
            if (selected) emailInvoiceDirect(selected.value);
        });
    }
}

// Direct Action Functions
function loadFileDirect(fileId) {
    const file = ticketFiles.find(f => f.id === fileId);
    if (!file) return;
    
    activeFile = file;
    
    // Update cycles data
    cycles.forEach(cycle => {
        if (cycle.customer.toLowerCase().includes(file.name.split('_')[0].toLowerCase())) {
            cycle.sourceFile = {
                id: file.id,
                name: file.name,
                version: file.version,
                uploadDate: file.uploadDate,
                isActive: true
            };
        }
    });
    
    filteredCycles = [...cycles];
    updateTable();
    
    const activeFileNameEl = document.getElementById('activeFileName');
    if (activeFileNameEl) {
        activeFileNameEl.innerHTML = `
            <span style="color: var(--primary-color); font-weight: 700;">
                <i class="fas fa-file-excel"></i> ${file.name} (v${file.version})
            </span>
        `;
    }
    
    addFileLog('info', `Loaded tickets from ${file.name} (${file.ticketCount} tickets)`);
    showNotification(`✅ Loaded: ${file.name}`, 'success');
}

function calculateFileDirect(fileId) {
    const file = ticketFiles.find(f => f.id === fileId);
    if (!file) return;
    
    // Update file status
    file.status = 'calculated';
    file.calculatedFile = file.name.replace('.xlsx', '_Calculated.xlsx');
    file.calculationDate = new Date().toISOString();
    file.ticketsProcessed = file.ticketCount;
    
    // Refresh tables
    loadAvailableFiles();
    loadCalculatedFiles();
    updateFileStats();
    
    addFileLog('success', `Calculated ${file.name} (${file.ticketCount} tickets)`);
    showNotification(`✅ Calculation completed for ${file.name}`, 'success');
}

function downloadFileDirect(fileId) {
    const file = ticketFiles.find(f => f.id === fileId);
    if (!file) return;
    
    showNotification(`📥 Downloading ${file.name}...`, 'info');
    addFileLog('info', `Downloaded file: ${file.name}`);
}

function previewFileDirect(fileId) {
    const file = ticketFiles.find(f => f.id === fileId);
    if (!file) return;
    
    showNotification(`👁️ Previewing ${file.name}`, 'info');
}

function viewResultsDirect(fileId) {
    const file = ticketFiles.find(f => f.id === fileId);
    if (!file) return;
    
    showNotification(`📊 Viewing results for ${file.calculatedFile || file.name}`, 'info');
}

function exportResultsDirect(fileId) {
    const file = ticketFiles.find(f => f.id === fileId);
    if (!file) return;
    
    showNotification(`📤 Exporting results for ${file.calculatedFile || file.name}`, 'info');
}

function downloadCalculatedDirect(fileId) {
    const file = ticketFiles.find(f => f.id === fileId);
    if (!file) return;
    
    showNotification(`📥 Downloading ${file.calculatedFile || file.name}`, 'info');
}

function sendForApprovalDirect(fileId) {
    const file = ticketFiles.find(f => f.id === fileId);
    if (!file) return;
    
    file.status = 'approval';
    file.approvalFile = file.name.replace('.xlsx', '_Approval.pdf');
    file.approvalDate = new Date().toISOString();
    file.approvalStatus = 'pending';
    file.approvedBy = 'Pending';
    
    loadCalculatedFiles();
    loadApprovalFiles();
    updateFileStats();
    
    showNotification(`✉️ Sent ${file.calculatedFile || file.name} for approval`, 'success');
    addFileLog('info', `Sent for approval: ${file.name}`);
}

function viewApprovalDirect(fileId) {
    const file = ticketFiles.find(f => f.id === fileId);
    if (!file) return;
    
    showNotification(`👁️ Viewing ${file.approvalFile || 'approval file'}`, 'info');
}

function approveFileDirect(fileId) {
    const file = ticketFiles.find(f => f.id === fileId);
    if (!file) return;
    
    file.approvalStatus = 'approved';
    
    loadApprovalFiles();
    updateFileStats();
    
    showNotification(`✅ Approved ${file.approvalFile || 'approval file'}`, 'success');
    addFileLog('success', `Approved file: ${file.approvalFile}`);
}

function downloadApprovalDirect(fileId) {
    const file = ticketFiles.find(f => f.id === fileId);
    if (!file) return;
    
    showNotification(`📥 Downloading ${file.approvalFile || 'approval file'}`, 'info');
}

function rejectFileDirect(fileId) {
    const file = ticketFiles.find(f => f.id === fileId);
    if (!file) return;
    
    if (confirm(`Reject ${file.approvalFile || 'this approval file'}?`)) {
        file.approvalStatus = 'rejected';
        loadApprovalFiles();
        showNotification(`❌ Rejected ${file.approvalFile || 'approval file'}`, 'warning');
        addFileLog('warning', `Rejected file: ${file.approvalFile}`);
    }
}

function viewInvoiceDirect(fileId) {
    const file = ticketFiles.find(f => f.id === fileId);
    if (!file) return;
    
    showNotification(`👁️ Viewing invoice ${file.invoiceNumber || ''}`, 'info');
}

function downloadInvoiceDirect(fileId) {
    const file = ticketFiles.find(f => f.id === fileId);
    if (!file) return;
    
    showNotification(`📥 Downloading invoice ${file.invoiceNumber || ''}`, 'info');
}

function emailInvoiceDirect(fileId) {
    const file = ticketFiles.find(f => f.id === fileId);
    if (!file) return;
    
    showNotification(`✉️ Email dialog opened for invoice ${file.invoiceNumber || ''}`, 'info');
}

function printInvoiceDirect(fileId) {
    const file = ticketFiles.find(f => f.id === fileId);
    if (!file) return;
    
    showNotification(`🖨️ Printing invoice ${file.invoiceNumber || ''}`, 'info');
}

// Update File Statistics
function updateFileStats() {
    const available = ticketFiles.filter(f => f.status === 'available').length;
    const calculated = ticketFiles.filter(f => f.status === 'calculated').length;
    const approval = ticketFiles.filter(f => f.status === 'approval').length;
    const invoice = ticketFiles.filter(f => f.status === 'invoice').length;
    
    const availableEl = document.getElementById('totalAvailableFiles');
    const calculatedEl = document.getElementById('totalCalculatedFiles');
    const approvalEl = document.getElementById('totalApprovalFiles');
    const invoiceEl = document.getElementById('totalInvoiceFiles');
    
    if (availableEl) availableEl.textContent = `Available: ${available}`;
    if (calculatedEl) calculatedEl.textContent = `Calculated: ${calculated}`;
    if (approvalEl) approvalEl.textContent = `Approval: ${approval}`;
    if (invoiceEl) invoiceEl.textContent = `Invoice: ${invoice}`;
}

// Show Notification
function showNotification(message, type = 'info') {
    const existingNotifications = document.querySelectorAll('.notification');
    existingNotifications.forEach(notif => notif.remove());
    
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    
    let icon = 'fa-info-circle';
    if (type === 'success') icon = 'fa-check-circle';
    if (type === 'warning') icon = 'fa-exclamation-triangle';
    if (type === 'error') icon = 'fa-times-circle';
    
    notification.innerHTML = `
        <i class="fas ${icon}"></i>
        <span>${message}</span>
    `;
    
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        padding: 15px 25px;
        background: ${type === 'success' ? '#10b981' : type === 'warning' ? '#f59e0b' : type === 'error' ? '#ef4444' : '#3b82f6'};
        color: white;
        border-radius: 12px;
        box-shadow: 0 10px 25px rgba(0,0,0,0.2);
        z-index: 100000;
        animation: slideInRight 0.3s ease;
        display: flex;
        align-items: center;
        gap: 10px;
        font-weight: 500;
        font-size: 14px;
        min-width: 300px;
    `;
    
    document.body.appendChild(notification);
    
    setTimeout(() => {
        notification.style.animation = 'slideOutRight 0.3s ease';
        setTimeout(() => notification.remove(), 300);
    }, 3000);
}

// Add File Log
function addFileLog(type, message) {
    const logEntry = {
        time: new Date().toLocaleTimeString(),
        message: message,
        type: type
    };
    
    fileLogs.unshift(logEntry);
    
    if (fileLogs.length > 20) fileLogs.pop();
    
    if (currentStep === 1 || currentStep === 2) {
        if (!stepLogs[currentStep]) stepLogs[currentStep] = [];
        stepLogs[currentStep].push(logEntry);
        
        if (stepLogs[currentStep].length > 10) stepLogs[currentStep].shift();
        
        updateStepPanel(currentStep);
    }
}

// Add animation keyframes
const style = document.createElement('style');
style.textContent = `
    @keyframes slideInRight {
        from {
            transform: translateX(100%);
            opacity: 0;
        }
        to {
            transform: translateX(0);
            opacity: 1;
        }
    }
    
    @keyframes slideOutRight {
        from {
            transform: translateX(0);
            opacity: 1;
        }
        to {
            transform: translateX(100%);
            opacity: 0;
        }
    }
    
    .inline-actions {
        display: flex;
        gap: 5px;
        justify-content: center;
        flex-wrap: wrap;
    }
    
    .action-btn {
        width: 32px;
        height: 32px;
        border-radius: 6px;
        border: none;
        display: inline-flex;
        align-items: center;
        justify-content: center;
        cursor: pointer;
        transition: all 0.2s;
        font-size: 14px;
        background: white;
        border: 1px solid #e2e8f0;
        color: #64748b;
    }
    
    .action-btn:hover {
        transform: translateY(-2px);
        box-shadow: 0 4px 8px rgba(0,0,0,0.1);
    }
    
    .action-btn.btn-view:hover {
        background-color: #dbeafe;
        color: #1e40af;
        border-color: #1e40af;
    }
    
    .action-btn.btn-download:hover {
        background-color: #d1fae5;
        color: #065f46;
        border-color: #065f46;
    }
    
    .action-btn.btn-calc {
        background: linear-gradient(135deg, #10b981, #059669);
        color: white;
        border: none;
    }
    
    .action-btn.btn-load {
        background: linear-gradient(135deg, #8b5cf6, #7c3aed);
        color: white;
        border: none;
    }
    
    .action-btn.btn-export {
        background: linear-gradient(135deg, #f59e0b, #d97706);
        color: white;
        border: none;
    }
    
    .action-btn.btn-send {
        background: linear-gradient(135deg, #3b82f6, #2563eb);
        color: white;
        border: none;
    }
    
    .action-btn.btn-success {
        background: linear-gradient(135deg, #10b981, #059669);
        color: white;
        border: none;
    }
    
    .action-btn.btn-warning {
        background: linear-gradient(135deg, #ef4444, #dc2626);
        color: white;
        border: none;
    }
    
    .action-btn.btn-email {
        background: linear-gradient(135deg, #ec4899, #db2777);
        color: white;
        border: none;
    }
    
    .action-btn.btn-print {
        background: linear-gradient(135deg, #64748b, #475569);
        color: white;
        border: none;
    }
    
    .status-badge.status-primary {
        background: linear-gradient(135deg, #3b82f6, #2563eb);
        color: white;
    }
    
    .file-name {
        display: flex;
        align-items: center;
        gap: 8px;
        font-weight: 500;
    }
    
    .file-name i {
        color: #3b82f6;
        font-size: 1.1rem;
    }
`;
document.head.appendChild(style);

// ==================== EXISTING FUNCTIONS ====================

// Initialize step tracker
function initStepTracker() {
    const tracker = document.getElementById('stepTracker');
    if (!tracker) return;
    
    tracker.innerHTML = '';
    
    steps.forEach((step, index) => {
        const stepEl = document.createElement('div');
        const hasManual = step.manualCounterpart ? 'requires-manual' : '';
        stepEl.className = `step ${step.status} ${hasManual} ${step.id === currentStep ? 'active' : ''}`;
        stepEl.dataset.stepId = step.id;
        
        let manualIndicator = '';
        if (step.manualCounterpart) {
            manualIndicator = '<div class="step-manual-indicator"><i class="fas fa-user"></i></div>';
        }
        
        stepEl.innerHTML = `
            <div class="step-icon">
                <i class="${step.icon}"></i>
                ${manualIndicator}
            </div>
            <div class="step-label">${step.name}</div>
            <div class="step-status ${step.status}">${step.status}</div>
        `;
        
        if (step.manualCounterpart) {
            stepEl.title = `Manual workflow: ${step.manualCounterpart.name}`;
        }
        
        stepEl.addEventListener('click', () => selectStep(step.id));
        tracker.appendChild(stepEl);
    });
}

// Initialize column visibility
function initColumnVisibility() {
    const columnsMenu = document.getElementById('columnsMenu');
    if (!columnsMenu) return;
    
    columnsMenu.innerHTML = '';
    
    tableConfig.columns.forEach(column => {
        const item = document.createElement('div');
        item.className = 'columns-menu-item';
        item.innerHTML = `
            <input type="checkbox" id="col-${column.id}" ${column.visible ? 'checked' : ''}>
            <label for="col-${column.id}">${column.label}</label>
        `;
        
        item.querySelector('input').addEventListener('change', (e) => {
            column.visible = e.target.checked;
            saveTablePreferences();
            updateTable();
        });
        
        columnsMenu.appendChild(item);
    });
    
    const actions = document.createElement('div');
    actions.className = 'columns-menu-actions';
    actions.innerHTML = `
        <button class="control-btn" id="selectAllColumns" style="padding: 4px 8px; font-size: 12px;">Select All</button>
        <button class="control-btn" id="deselectAllColumns" style="padding: 4px 8px; font-size: 12px;">Deselect All</button>
        <button class="control-btn" id="resetColumns" style="padding: 4px 8px; font-size: 12px;">Reset</button>
    `;
    columnsMenu.appendChild(actions);
    
    document.getElementById('selectAllColumns')?.addEventListener('click', () => {
        tableConfig.columns.forEach(col => col.visible = true);
        updateColumnCheckboxes();
        saveTablePreferences();
        updateTable();
    });
    
    document.getElementById('deselectAllColumns')?.addEventListener('click', () => {
        tableConfig.columns.forEach(col => col.visible = false);
        updateColumnCheckboxes();
        saveTablePreferences();
        updateTable();
    });
    
    document.getElementById('resetColumns')?.addEventListener('click', () => {
        resetTablePreferences();
        updateColumnCheckboxes();
        updateTable();
    });
}

function updateColumnCheckboxes() {
    tableConfig.columns.forEach(column => {
        const checkbox = document.getElementById(`col-${column.id}`);
        if (checkbox) {
            checkbox.checked = column.visible;
        }
    });
}

// Initialize management table
function initManagementTable() {
    updateTable();
    initColumnVisibility();
    initPagination();
}

function updateTable() {
    const tableBody = document.getElementById('tableBody');
    const thead = document.querySelector('#managementTable thead tr');
    
    if (!tableBody || !thead) return;
    
    thead.innerHTML = '';
    tableConfig.columns.forEach(column => {
        if (!column.visible) return;
        
        const th = document.createElement('th');
        th.textContent = column.label;
        th.dataset.column = column.id;
        
        if (column.sortable) {
            th.className = 'sortable';
            if (tableConfig.sortColumn === column.id) {
                th.classList.add(tableConfig.sortDirection);
            }
            th.addEventListener('click', () => sortTable(column.id));
        }
        
        thead.appendChild(th);
    });
    
    const startIndex = (tableConfig.currentPage - 1) * tableConfig.pageSize;
    const endIndex = startIndex + tableConfig.pageSize;
    const pageData = filteredCycles.slice(startIndex, endIndex);
    
    tableBody.innerHTML = '';
    
    pageData.forEach(cycle => {
        const row = document.createElement('tr');
        if (cycle.manualIntervention?.required) {
            row.classList.add('requires-manual');
        }
        
        let statusClass = 'status-info';
        if (cycle.status.includes('Completed')) statusClass = 'status-success';
        if (cycle.status.includes('Failed')) statusClass = 'status-error';
        if (cycle.status === 'Paused') statusClass = 'status-warning';
        
        let slaClass = 'status-success';
        if (cycle.slaFlag === 'warning') slaClass = 'status-warning';
        if (cycle.slaFlag === 'error') slaClass = 'status-error';
        
        let manualBadge = '<span class="status-badge status-success">No</span>';
        let manualStep = '-';
        
        if (cycle.manualIntervention?.required) {
            manualBadge = `<span class="status-badge status-manual">Yes</span>`;
            manualStep = cycle.manualIntervention.step;
        }
        
        let sourceFileInfo = '-';
        if (cycle.sourceFile) {
            sourceFileInfo = `
                <div class="source-file-info">
                    <span class="file-version" style="color: ${cycle.sourceFile.isActive ? '#10b981' : '#64748b'}">
                        <i class="fas fa-file-excel"></i> ${cycle.sourceFile.name}
                    </span>
                    <small>v${cycle.sourceFile.version} | ${new Date(cycle.sourceFile.uploadDate).toLocaleDateString()}</small>
                </div>
            `;
        }
        
        let fileButtons = '<div class="file-buttons">';
        
        const calcCount = cycle.files?.calculation?.length || 0;
        fileButtons += `
            <button class="file-btn calc-btn" onclick="openFileViewer('${cycle.cycleId}', '${cycle.customer}', 'calculation')" title="Calculation Files (${calcCount})">
                <i class="fas fa-calculator"></i>
                ${calcCount > 0 ? `<span class="file-count">${calcCount}</span>` : ''}
            </button>
        `;
        
        const approvalCount = cycle.files?.approval?.length || 0;
        fileButtons += `
            <button class="file-btn approval-btn" onclick="openFileViewer('${cycle.cycleId}', '${cycle.customer}', 'approval')" title="Approval Files (${approvalCount})">
                <i class="fas fa-check-circle"></i>
                ${approvalCount > 0 ? `<span class="file-count">${approvalCount}</span>` : ''}
            </button>
        `;
        
        const invoiceCount = cycle.files?.invoice?.length || 0;
        fileButtons += `
            <button class="file-btn invoice-btn" onclick="openFileViewer('${cycle.cycleId}', '${cycle.customer}', 'invoice')" title="Invoice Files (${invoiceCount})">
                <i class="fas fa-file-invoice"></i>
                ${invoiceCount > 0 ? `<span class="file-count">${invoiceCount}</span>` : ''}
            </button>
        `;
        
        fileButtons += '</div>';
        
        tableConfig.columns.forEach(column => {
            if (!column.visible) return;
            
            const td = document.createElement('td');
            
            switch(column.id) {
                case 'cycleId':
                    td.innerHTML = `<strong>${cycle.cycleId}</strong>`;
                    break;
                case 'customer':
                    td.textContent = cycle.customer;
                    break;
                case 'region':
                    td.textContent = cycle.region;
                    break;
                case 'status':
                    td.innerHTML = `<span class="status-badge ${statusClass}">${cycle.status}</span>`;
                    break;
                case 'currentStep':
                    td.textContent = cycle.currentStep;
                    break;
                case 'processed':
                    td.textContent = cycle.processed;
                    break;
                case 'errors':
                    td.innerHTML = `<span class="${cycle.errors > 0 ? 'status-error' : 'status-success'}" style="font-weight:bold;">${cycle.errors}</span>`;
                    break;
                case 'lastAction':
                    td.innerHTML = `<small>${cycle.lastAction}</small>`;
                    break;
                case 'uploadRef':
                    td.textContent = cycle.uploadRef || '-';
                    break;
                case 'slaTimer':
                    td.innerHTML = `<span class="status-badge ${slaClass}">${cycle.slaTimer}</span>`;
                    break;
                case 'manualIntervention':
                    td.innerHTML = manualBadge;
                    break;
                case 'manualStep':
                    td.textContent = manualStep;
                    break;
                case 'sourceFile':
                    td.innerHTML = sourceFileInfo;
                    break;
                case 'files':
                    td.innerHTML = fileButtons;
                    break;
                case 'actions':
                    td.innerHTML = `
                        <div class="action-buttons">
                            <button class="action-btn btn-view" title="View Details" onclick="viewCycleDetails('${cycle.cycleId}', '${cycle.customer}')">
                                <i class="fas fa-eye"></i>
                            </button>
                            <button class="action-btn btn-retry" title="Retry Step" onclick="retryCycleStep('${cycle.cycleId}', '${cycle.customer}')">
                                <i class="fas fa-redo"></i>
                            </button>
                            <button class="action-btn btn-pause" title="Pause Cycle" onclick="pauseCycle('${cycle.cycleId}', '${cycle.customer}')">
                                <i class="fas fa-pause"></i>
                            </button>
                            ${cycle.manualIntervention?.required ? 
                                `<button class="action-btn btn-manual" title="Manual Workflow" onclick="openManualWorkflow('${cycle.cycleId}', '${cycle.customer}')">
                                    <i class="fas fa-hands-helping"></i>
                                </button>` : ''
                            }
                            <button class="action-btn btn-ai" title="AI-Fix" onclick="openAIFix('${cycle.cycleId}', '${cycle.customer}')">
                                <i class="fas fa-robot"></i>
                            </button>
                            <button class="action-btn btn-override" title="Manual Override" onclick="openExceptionEditor('${cycle.cycleId}', '${cycle.customer}')">
                                <i class="fas fa-user-edit"></i>
                            </button>
                        </div>
                    `;
                    break;
            }
            
            row.appendChild(td);
        });
        
        tableBody.appendChild(row);
    });
    
    updatePagination();
}

// Initialize pagination
function initPagination() {
    updatePagination();
}

function updatePagination() {
    const paginationControls = document.getElementById('paginationControls');
    if (!paginationControls) return;
    
    const totalPages = Math.ceil(filteredCycles.length / tableConfig.pageSize);
    
    if (filteredCycles.length <= tableConfig.pageSize) {
        paginationControls.innerHTML = `
            <div class="pagination-info">
                Showing ${filteredCycles.length} of ${filteredCycles.length} records
            </div>
        `;
        return;
    }
    
    const startRecord = (tableConfig.currentPage - 1) * tableConfig.pageSize + 1;
    const endRecord = Math.min(tableConfig.currentPage * tableConfig.pageSize, filteredCycles.length);
    
    let pageButtons = '';
    const maxVisiblePages = 5;
    let startPage = Math.max(1, tableConfig.currentPage - Math.floor(maxVisiblePages / 2));
    let endPage = Math.min(totalPages, startPage + maxVisiblePages - 1);
    
    if (endPage - startPage + 1 < maxVisiblePages) {
        startPage = Math.max(1, endPage - maxVisiblePages + 1);
    }
    
    pageButtons += `
        <button class="page-btn ${tableConfig.currentPage === 1 ? 'disabled' : ''}" 
                onclick="changePage(${tableConfig.currentPage - 1})" 
                ${tableConfig.currentPage === 1 ? 'disabled' : ''}>
            <i class="fas fa-chevron-left"></i>
        </button>
    `;
    
    if (startPage > 1) {
        pageButtons += `<button class="page-btn" onclick="changePage(1)">1</button>`;
        if (startPage > 2) {
            pageButtons += `<span style="padding: 0 8px;">...</span>`;
        }
    }
    
    for (let i = startPage; i <= endPage; i++) {
        pageButtons += `
            <button class="page-btn ${i === tableConfig.currentPage ? 'active' : ''}" 
                    onclick="changePage(${i})">
                ${i}
            </button>
        `;
    }
    
    if (endPage < totalPages) {
        if (endPage < totalPages - 1) {
            pageButtons += `<span style="padding: 0 8px;">...</span>`;
        }
        pageButtons += `<button class="page-btn" onclick="changePage(${totalPages})">${totalPages}</button>`;
    }
    
    pageButtons += `
        <button class="page-btn ${tableConfig.currentPage === totalPages ? 'disabled' : ''}" 
                onclick="changePage(${tableConfig.currentPage + 1})" 
                ${tableConfig.currentPage === totalPages ? 'disabled' : ''}>
            <i class="fas fa-chevron-right"></i>
        </button>
    `;
    
    paginationControls.innerHTML = `
        <div class="pagination-info">
            Showing ${startRecord}-${endRecord} of ${filteredCycles.length} records
        </div>
        <div class="pagination-buttons">
            ${pageButtons}
            <div class="page-size-selector">
                <select id="pageSizeSelect" onchange="changePageSize(this.value)">
                    <option value="10" ${tableConfig.pageSize === 10 ? 'selected' : ''}>10</option>
                    <option value="25" ${tableConfig.pageSize === 25 ? 'selected' : ''}>25</option>
                    <option value="50" ${tableConfig.pageSize === 50 ? 'selected' : ''}>50</option>
                    <option value="100" ${tableConfig.pageSize === 100 ? 'selected' : ''}>100</option>
                </select>
            </div>
        </div>
    `;
}

function changePage(page) {
    if (page < 1 || page > Math.ceil(filteredCycles.length / tableConfig.pageSize)) return;
    tableConfig.currentPage = page;
    updateTable();
}

function changePageSize(size) {
    tableConfig.pageSize = parseInt(size);
    tableConfig.currentPage = 1;
    saveTablePreferences();
    updateTable();
}

function sortTable(columnId) {
    if (tableConfig.sortColumn === columnId) {
        tableConfig.sortDirection = tableConfig.sortDirection === 'asc' ? 'desc' : 'asc';
    } else {
        tableConfig.sortColumn = columnId;
        tableConfig.sortDirection = 'asc';
    }
    
    filteredCycles.sort((a, b) => {
        let aValue = a[columnId];
        let bValue = b[columnId];
        
        if (columnId === 'slaTimer') {
            aValue = convertTimeToSeconds(aValue);
            bValue = convertTimeToSeconds(bValue);
        }
        
        if (typeof aValue === 'string' && typeof bValue === 'string') {
            return tableConfig.sortDirection === 'asc' 
                ? aValue.localeCompare(bValue)
                : bValue.localeCompare(aValue);
        }
        
        return tableConfig.sortDirection === 'asc' 
            ? (aValue < bValue ? -1 : 1)
            : (bValue < aValue ? -1 : 1);
    });
    
    saveTablePreferences();
    updateTable();
}

function convertTimeToSeconds(timeString) {
    const parts = timeString.split(':');
    if (parts.length === 3) {
        return parseInt(parts[0]) * 3600 + parseInt(parts[1]) * 60 + parseInt(parts[2]);
    }
    return 0;
}

function saveTablePreferences() {
    const preferences = {
        columns: tableConfig.columns.map(col => ({ id: col.id, visible: col.visible })),
        pageSize: tableConfig.pageSize,
        sortColumn: tableConfig.sortColumn,
        sortDirection: tableConfig.sortDirection
    };
    localStorage.setItem('dashboardTablePrefs', JSON.stringify(preferences));
}

function loadTablePreferences() {
    const saved = localStorage.getItem('dashboardTablePrefs');
    if (saved) {
        try {
            const preferences = JSON.parse(saved);
            
            preferences.columns.forEach(savedCol => {
                const column = tableConfig.columns.find(col => col.id === savedCol.id);
                if (column) {
                    column.visible = savedCol.visible;
                }
            });
            
            tableConfig.pageSize = preferences.pageSize || tableConfig.pageSize;
            tableConfig.sortColumn = preferences.sortColumn || tableConfig.sortColumn;
            tableConfig.sortDirection = preferences.sortDirection || tableConfig.sortDirection;
        } catch (e) {
            console.error('Error loading table preferences:', e);
        }
    }
}

function resetTablePreferences() {
    localStorage.removeItem('dashboardTablePrefs');
    tableConfig.columns.forEach(col => col.visible = true);
    tableConfig.pageSize = 10;
    tableConfig.sortColumn = 'lastAction';
    tableConfig.sortDirection = 'desc';
}

function selectStep(stepId) {
    steps.forEach(step => {
        if (step.id === currentStep) {
            const stepEl = document.querySelector(`.step[data-step-id="${step.id}"]`);
            if (stepEl) stepEl.classList.remove('active');
        }
        if (step.id === stepId) {
            const stepEl = document.querySelector(`.step[data-step-id="${step.id}"]`);
            if (stepEl) stepEl.classList.add('active');
        }
    });
    
    currentStep = stepId;
    updateStepPanel(stepId);
}

function updateStepPanel(stepId) {
    const step = steps.find(s => s.id === stepId);
    if (!step) return;
    
    const panelStepName = document.getElementById('panelStepName');
    const panelStepStatus = document.getElementById('panelStepStatus');
    
    if (panelStepName) panelStepName.textContent = step.name;
    if (panelStepStatus) {
        panelStepStatus.textContent = step.status;
        panelStepStatus.className = `status-badge status-${step.status === 'in-progress' ? 'info' : step.status}`;
    }
    
    if (stepId === currentStep) {
        const cycle = cycles.find(c => c.currentStep === step.name);
        if (cycle) {
            const startedAtEl = document.getElementById('panelStartedAt');
            const durationEl = document.getElementById('panelDuration');
            const recordsEl = document.getElementById('panelRecords');
            const successRateEl = document.getElementById('panelSuccessRate');
            
            if (startedAtEl) startedAtEl.textContent = cycle.details?.startedAt || '-';
            if (durationEl) durationEl.textContent = cycle.slaTimer || '-';
            if (recordsEl) recordsEl.textContent = cycle.details ? `${cycle.details.recordsProcessed}/${cycle.details.recordsTotal}` : '-';
            if (successRateEl) successRateEl.textContent = cycle.details?.successRate || '-';
        }
    }
    
    const manualSection = document.getElementById('manualWorkflowSection');
    const manualActionsContainer = document.getElementById('manualWorkflowActions');
    
    if (step.manualCounterpart && manualSection && manualActionsContainer) {
        manualSection.style.display = 'block';
        
        const manualStepNameEl = document.getElementById('manualStepName');
        const manualStepDescEl = document.getElementById('manualStepDescription');
        const manualRequiredEl = document.getElementById('manualRequiredActions');
        
        if (manualStepNameEl) manualStepNameEl.textContent = step.manualCounterpart.name;
        if (manualStepDescEl) manualStepDescEl.textContent = step.manualCounterpart.description;
        if (manualRequiredEl) manualRequiredEl.textContent = step.manualCounterpart.requiredControls.join(', ');
        
        manualActionsContainer.innerHTML = '';
        
        const actionButtons = [
            { icon: 'fa-table', label: 'Open Tracker', action: 'tracker' },
            { icon: 'fa-tasks', label: 'Review Data', action: 'review' },
            { icon: 'fa-check-circle', label: 'Approve', action: 'approve' },
            { icon: 'fa-upload', label: 'Upload Files', action: 'upload' }
        ];
        
        actionButtons.forEach(btn => {
            const button = document.createElement('button');
            button.className = 'manual-action-btn';
            button.innerHTML = `<i class="fas ${btn.icon}"></i> ${btn.label}`;
            button.onclick = () => handleManualAction(btn.action, step.manualCounterpart.name);
            manualActionsContainer.appendChild(button);
        });
    } else if (manualSection) {
        manualSection.style.display = 'none';
    }
    
    const logsContainer = document.getElementById('stepLogs');
    if (logsContainer) {
        logsContainer.innerHTML = '';
        
        if (fileLogs.length > 0 && (stepId === 1 || stepId === 2)) {
            fileLogs.slice(0, 5).forEach(log => {
                const logEl = document.createElement('div');
                logEl.className = `log-item ${log.type}`;
                logEl.innerHTML = `
                    <div class="log-time">${log.time}</div>
                    <div class="log-message">${log.message}</div>
                `;
                logsContainer.appendChild(logEl);
            });
        }
        
        if (stepLogs[stepId]) {
            stepLogs[stepId].forEach(log => {
                const logEl = document.createElement('div');
                logEl.className = `log-item ${log.type}`;
                logEl.innerHTML = `
                    <div class="log-time">${log.time}</div>
                    <div class="log-message">${log.message}</div>
                `;
                logsContainer.appendChild(logEl);
            });
        }
        
        if (logsContainer.children.length === 0) {
            logsContainer.innerHTML = '<div class="log-item">No logs available for this step.</div>';
        }
    }
}

function handleManualAction(action, manualStep) {
    switch(action) {
        case 'tracker':
            alert(`Opening ${manualStep} Tracker...`);
            break;
        case 'review':
            alert(`Reviewing data for ${manualStep}...`);
            break;
        case 'approve':
            alert(`Approving ${manualStep}...`);
            break;
        case 'upload':
            alert(`Uploading files for ${manualStep}...`);
            break;
    }
}

function openManualWorkflow(cycleId, customer) {
    const cycle = cycles.find(c => c.cycleId === cycleId && c.customer === customer);
    if (cycle && cycle.manualIntervention?.required) {
        const step = steps.find(s => s.name === cycle.currentStep);
        if (step && step.manualCounterpart) {
            selectStep(step.id);
            alert(`Opening manual workflow for ${customer}: ${step.manualCounterpart.name}`);
        }
    }
}

function initAdvancedSearch() {
    const modal = document.getElementById('advancedSearchModal');
    const conditionsContainer = document.getElementById('searchConditions');
    
    if (!modal || !conditionsContainer) return;
    
    addSearchCondition();
    
    document.getElementById('addCondition')?.addEventListener('click', addSearchCondition);
    document.getElementById('clearAllConditions')?.addEventListener('click', clearAllConditions);
    document.getElementById('applyAdvancedSearch')?.addEventListener('click', applyAdvancedSearch);
    
    function addSearchCondition() {
        const condition = document.createElement('div');
        condition.className = 'search-condition';
        condition.innerHTML = `
            <select class="condition-column">
                <option value="customer">Customer</option>
                <option value="region">Region</option>
                <option value="status">Status</option>
                <option value="currentStep">Current Step</option>
                <option value="errors">Errors</option>
                <option value="slaTimer">SLA Timer</option>
            </select>
            <select class="condition-operator">
                <option value="contains">contains</option>
                <option value="equals">equals</option>
                <option value="greater">greater than</option>
                <option value="less">less than</option>
            </select>
            <input type="text" class="condition-value" placeholder="Value...">
            <button class="remove-condition" type="button">&times;</button>
        `;
        
        condition.querySelector('.remove-condition').addEventListener('click', () => {
            condition.remove();
        });
        
        conditionsContainer.appendChild(condition);
    }
    
    function clearAllConditions() {
        conditionsContainer.innerHTML = '';
        addSearchCondition();
    }
    
    function applyAdvancedSearch() {
        const conditions = [];
        const conditionElements = conditionsContainer.querySelectorAll('.search-condition');
        
        conditionElements.forEach(element => {
            const column = element.querySelector('.condition-column').value;
            const operator = element.querySelector('.condition-operator').value;
            const value = element.querySelector('.condition-value').value;
            
            if (value.trim()) {
                conditions.push({ column, operator, value });
            }
        });
        
        const logic = document.getElementById('filterLogic').value;
        advancedFilters = { conditions, logic };
        
        applyFilters();
        modal.classList.remove('active');
    }
}

function applyFilters() {
    filteredCycles = [...cycles];
    
    const regionFilter = document.getElementById('regionFilter')?.value;
    const customerFilter = document.getElementById('customerFilter')?.value;
    const accountFilter = document.getElementById('accountFilter')?.value;
    const searchTerm = document.getElementById('searchInput')?.value.toLowerCase();
    
    if (regionFilter) {
        filteredCycles = filteredCycles.filter(cycle => cycle.region === regionFilter);
    }
    
    if (customerFilter) {
        filteredCycles = filteredCycles.filter(cycle => cycle.customer === customerFilter);
    }
    
    if (searchTerm) {
        filteredCycles = filteredCycles.filter(cycle => 
            cycle.cycleId.toLowerCase().includes(searchTerm) ||
            cycle.customer.toLowerCase().includes(searchTerm) ||
            (cycle.uploadRef && cycle.uploadRef.toLowerCase().includes(searchTerm))
        );
    }
    
    if (advancedFilters.conditions && advancedFilters.conditions.length > 0) {
        filteredCycles = filteredCycles.filter(cycle => {
            const results = advancedFilters.conditions.map(condition => {
                const value = cycle[condition.column];
                const filterValue = condition.value.toLowerCase();
                
                switch(condition.operator) {
                    case 'contains':
                        return value.toString().toLowerCase().includes(filterValue);
                    case 'equals':
                        return value.toString().toLowerCase() === filterValue;
                    case 'greater':
                        return parseFloat(value) > parseFloat(filterValue);
                    case 'less':
                        return parseFloat(value) < parseFloat(filterValue);
                    default:
                        return true;
                }
            });
            
            return advancedFilters.logic === 'AND' 
                ? results.every(r => r)
                : results.some(r => r);
        });
    }
    
    tableConfig.currentPage = 1;
    updateTable();
}

function openAIFix(cycleId, customer) {
    const modal = document.getElementById('aiFixModal');
    if (modal) modal.classList.add('active');
}

function openExceptionEditor(cycleId, customer) {
    const modal = document.getElementById('exceptionModal');
    const modalBody = modal.querySelector('.modal-body');
    
    modalBody.innerHTML = `
        <h3>Manual Override for ${customer} - ${cycleId}</h3>
        <div style="margin: 20px 0; padding: 15px; background: #f8fafc; border-radius: 8px;">
            <h4>⚠️ Records Requiring Attention (3)</h4>
            <ul style="margin: 10px 0 20px 20px;">
                <li>Ticket TKT-001: Rate mismatch (Consulting - EMEA)</li>
                <li>Ticket TKT-003: Missing travel charge</li>
                <li>Ticket TKT-007: Invalid currency conversion</li>
            </ul>
        </div>
        
        <div style="margin: 20px 0;">
            <h4>Edit Record</h4>
            <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 16px; margin: 16px 0;">
                <div>
                    <label style="display: block; margin-bottom: 8px; font-weight: 600;">Rate Type</label>
                    <select style="width: 100%; padding: 10px; border: 1px solid #e2e8f0; border-radius: 8px;">
                        <option>Hourly</option>
                        <option>Fixed</option>
                        <option>Daily</option>
                        <option>Monthly</option>
                    </select>
                </div>
                <div>
                    <label style="display: block; margin-bottom: 8px; font-weight: 600;">Rate Value</label>
                    <input type="number" style="width: 100%; padding: 10px; border: 1px solid #e2e8f0; border-radius: 8px;" value="120">
                </div>
                <div>
                    <label style="display: block; margin-bottom: 8px; font-weight: 600;">Currency</label>
                    <select style="width: 100%; padding: 10px; border: 1px solid #e2e8f0; border-radius: 8px;">
                        <option>USD</option>
                        <option>EUR</option>
                        <option>GBP</option>
                        <option>JPY</option>
                    </select>
                </div>
                <div>
                    <label style="display: block; margin-bottom: 8px; font-weight: 600;">Travel Charge</label>
                    <input type="number" style="width: 100%; padding: 10px; border: 1px solid #e2e8f0; border-radius: 8px;" value="50">
                </div>
            </div>
            
            <div style="margin: 20px 0;">
                <label style="display: block; margin-bottom: 8px; font-weight: 600;">Override Reason</label>
                <textarea style="width: 100%; padding: 12px; border: 1px solid #e2e8f0; border-radius: 8px; min-height: 100px;" placeholder="Describe why this override is necessary..."></textarea>
            </div>
        </div>
    `;
    
    modal.classList.add('active');
}

function viewCycleDetails(cycleId, customer) {
    alert(`Viewing details for ${customer} - ${cycleId}\n\nThis would open a detailed view with timeline, files, and audit log.`);
}

function retryCycleStep(cycleId, customer) {
    if (confirm(`Retry current step for ${customer}?`)) {
        alert(`Retrying step for ${customer}...`);
    }
}

function pauseCycle(cycleId, customer) {
    if (confirm(`Pause processing for ${customer}?`)) {
        alert(`Paused ${customer} cycle.`);
    }
}

function openFileViewer(cycleId, customer, fileType) {
    const cycle = cycles.find(c => c.cycleId === cycleId && c.customer === customer);
    if (!cycle || !cycle.sourceFile) {
        alert('No source file found for this cycle.');
        return;
    }
    
    const file = ticketFiles.find(f => f.id === cycle.sourceFile.id);
    if (!file) {
        alert('Source file details not found.');
        return;
    }
    
    showFileDetails(file);
}

function initQuickSetupModal() {
    const modal = document.getElementById('quickSetupModal');
    const openBtn = document.getElementById('quickSetupBtn');
    const closeBtn = document.getElementById('closeQuickSetupModal');
    const cancelBtn = document.getElementById('cancelQuickSetup');
    const saveBtn = document.getElementById('saveQuickSetup');
    const applyBtn = document.getElementById('applyQuickSetup');
    
    if (!modal || !openBtn) return;
    
    openBtn.addEventListener('click', () => {
        modal.classList.add('active');
    });
    
    if (closeBtn) {
        closeBtn.addEventListener('click', () => {
            modal.classList.remove('active');
        });
    }
    
    if (cancelBtn) {
        cancelBtn.addEventListener('click', () => {
            modal.classList.remove('active');
            alert('Quick setup configuration cancelled.');
        });
    }
    
    if (saveBtn) {
        saveBtn.addEventListener('click', () => {
            alert('Quick setup configuration saved.');
        });
    }
    
    if (applyBtn) {
        applyBtn.addEventListener('click', () => {
            alert('Quick setup configuration applied!');
            modal.classList.remove('active');
        });
    }
}

function simulateUpdates() {
    setInterval(() => {
        const randomStep = Math.floor(Math.random() * steps.length);
        const statuses = ['pending', 'in-progress', 'completed', 'failed'];
        const newStatus = statuses[Math.floor(Math.random() * statuses.length)];
        
        if (steps[randomStep].status !== 'completed' && steps[randomStep].status !== 'failed') {
            steps[randomStep].status = newStatus;
            
            const stepEl = document.querySelector(`.step[data-step-id="${steps[randomStep].id}"]`);
            if (stepEl) {
                stepEl.className = `step ${newStatus} ${steps[randomStep].manualCounterpart ? 'requires-manual' : ''} ${steps[randomStep].id === currentStep ? 'active' : ''}`;
                const statusEl = stepEl.querySelector('.step-status');
                if (statusEl) {
                    statusEl.className = `step-status ${newStatus}`;
                    statusEl.textContent = newStatus;
                }
            }
        }
    }, 30000);
}

// DOM Content Loaded Event
document.addEventListener('DOMContentLoaded', () => {
    loadTablePreferences();
    initStepTracker();
    initManagementTable();
    updateStepPanel(currentStep);
    initAdvancedSearch();
    initQuickSetupModal();
    initRedesignedFileManager();
    
    document.querySelectorAll('.modal').forEach(modal => {
        modal.addEventListener('click', (e) => {
            if (e.target === modal) {
                modal.classList.remove('active');
            }
        });
    });
    
    document.addEventListener('click', (e) => {
        const columnsMenu = document.getElementById('columnsMenu');
        const toggleBtn = document.getElementById('toggleColumns');
        
        if (columnsMenu && toggleBtn && !columnsMenu.contains(e.target) && !toggleBtn.contains(e.target)) {
            columnsMenu.classList.remove('active');
        }
    });
    
    const toggleColumnsBtn = document.getElementById('toggleColumns');
    if (toggleColumnsBtn) {
        toggleColumnsBtn.addEventListener('click', (e) => {
            e.stopPropagation();
            const columnsMenu = document.getElementById('columnsMenu');
            if (columnsMenu) columnsMenu.classList.toggle('active');
        });
    }
    
    const advancedSearchBtn = document.getElementById('advancedSearchBtn');
    if (advancedSearchBtn) {
        advancedSearchBtn.addEventListener('click', () => {
            const modal = document.getElementById('advancedSearchModal');
            if (modal) modal.classList.add('active');
        });
    }
    
    const regionFilter = document.getElementById('regionFilter');
    const customerFilter = document.getElementById('customerFilter');
    const accountFilter = document.getElementById('accountFilter');
    const searchInput = document.getElementById('searchInput');
    
    if (regionFilter) regionFilter.addEventListener('change', applyFilters);
    if (customerFilter) customerFilter.addEventListener('change', applyFilters);
    if (accountFilter) accountFilter.addEventListener('change', applyFilters);
    if (searchInput) searchInput.addEventListener('input', applyFilters);
    
    const closeAIFixModal = document.getElementById('closeAIFixModal');
    if (closeAIFixModal) {
        closeAIFixModal.addEventListener('click', () => {
            const modal = document.getElementById('aiFixModal');
            if (modal) modal.classList.remove('active');
        });
    }

    const closeExceptionModal = document.getElementById('closeExceptionModal');
    if (closeExceptionModal) {
        closeExceptionModal.addEventListener('click', () => {
            const modal = document.getElementById('exceptionModal');
            if (modal) modal.classList.remove('active');
        });
    }

    const closeAdvancedSearchModal = document.getElementById('closeAdvancedSearchModal');
    if (closeAdvancedSearchModal) {
        closeAdvancedSearchModal.addEventListener('click', () => {
            const modal = document.getElementById('advancedSearchModal');
            if (modal) modal.classList.remove('active');
        });
    }

    const closeQuickSetupModal = document.getElementById('closeQuickSetupModal');
    if (closeQuickSetupModal) {
        closeQuickSetupModal.addEventListener('click', () => {
            const modal = document.getElementById('quickSetupModal');
            if (modal) modal.classList.remove('active');
        });
    }

    const applyAIFix = document.getElementById('applyAIFix');
    if (applyAIFix) {
        applyAIFix.addEventListener('click', () => {
            alert('AI suggestion applied. Workflow will continue automatically.');
            const modal = document.getElementById('aiFixModal');
            if (modal) modal.classList.remove('active');
        });
    }

    const rejectAIFix = document.getElementById('rejectAIFix');
    if (rejectAIFix) {
        rejectAIFix.addEventListener('click', () => {
            alert('AI suggestion rejected. Please use manual override if needed.');
            const modal = document.getElementById('aiFixModal');
            if (modal) modal.classList.remove('active');
        });
    }

    const playPipeline = document.getElementById('playPipeline');
    if (playPipeline) {
        playPipeline.addEventListener('click', () => {
            const availableFiles = ticketFiles.filter(f => f.status === 'available');
            if (availableFiles.length === 0) {
                alert('No files are available for processing. Please upload files first.');
                return;
            }
            showNotification(`Pipeline started with ${availableFiles.length} available files`, 'success');
            addFileLog('info', `Pipeline started with ${availableFiles.length} files`);
        });
    }

    const pausePipeline = document.getElementById('pausePipeline');
    if (pausePipeline) {
        pausePipeline.addEventListener('click', () => {
            alert('Pipeline paused. No new processing will start.');
        });
    }

    const runSelectedStage = document.getElementById('runSelectedStage');
    if (runSelectedStage) {
        runSelectedStage.addEventListener('click', () => {
            const step = steps.find(s => s.id === currentStep);
            alert(`Running ${step.name} stage for all eligible cycles.`);
        });
    }

    const cancelCycle = document.getElementById('cancelCycle');
    if (cancelCycle) {
        cancelCycle.addEventListener('click', () => {
            if (confirm('Cancel current billing cycle? This will stop all processing.')) {
                alert('Billing cycle cancelled. All workflows stopped.');
            }
        });
    }

    const createIncident = document.getElementById('createIncident');
    if (createIncident) {
        createIncident.addEventListener('click', () => {
            alert('Incident ticket created in ops queue. Team has been notified.');
        });
    }

    const exportData = document.getElementById('exportData');
    if (exportData) {
        exportData.addEventListener('click', () => {
            const visibleColumns = tableConfig.columns.filter(col => col.visible);
            alert(`Exporting ${visibleColumns.length} visible columns to CSV...`);
        });
    }

    const refreshTable = document.getElementById('refreshTable');
    if (refreshTable) {
        refreshTable.addEventListener('click', () => {
            initManagementTable();
            alert('Table data refreshed.');
        });
    }

    const groupByRegion = document.getElementById('groupByRegion');
    if (groupByRegion) {
        groupByRegion.addEventListener('click', () => {
            alert('Grouping table by region...');
        });
    }
    
    simulateUpdates();
});