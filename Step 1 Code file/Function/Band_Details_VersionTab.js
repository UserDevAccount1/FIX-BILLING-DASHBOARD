// Band Data Version Management - Enhanced JavaScript
class BandDataVersionManager {
    constructor() {
        this.versions = [];
        this.currentPage = 1;
        this.pageSize = 10;
        this.totalVersions = 0;
        this.filteredVersions = [];
        this.selectedVersions = new Set();
        this.currentStep = 1;
        this.uploadFile = null;
        this.uploadData = null;
        this.currentComparison = { versionA: null, versionB: null };
        this.comparisonMode = 'side-by-side';
        
        this.initializeElements();
        this.loadEnhancedSampleData();
        this.setupEventListeners();
        this.renderVersionTable();
    }

    initializeElements() {
        // Main container
        this.container = document.getElementById('band-version-tab-content');
        
        // Table elements
        this.tableBody = document.getElementById('version-table-body');
        this.noResultsMessage = document.getElementById('no-versions-message');
        this.selectAllCheckbox = document.getElementById('select-all-versions');
        
        // Filter elements
        this.searchInput = document.getElementById('version-search-input');
        this.typeFilter = document.getElementById('version-type-filter');
        this.customerFilter = document.getElementById('version-customer-filter');
        this.statusFilter = document.getElementById('version-status-filter');
        
        // Control elements
        this.comparisonToggle = document.getElementById('version-comparison-toggle');
        this.uploadBtn = document.getElementById('version-upload-btn');
        this.refreshBtn = document.getElementById('version-refresh-btn');
        this.exportBtn = document.getElementById('version-export-btn');
        this.firstUploadBtn = document.getElementById('first-upload-btn');
        
        // Bulk action elements
        this.bulkActions = document.getElementById('version-bulk-actions');
        this.selectedCount = document.getElementById('selected-count');
        this.bulkCompareBtn = document.getElementById('bulk-compare-btn');
        this.bulkDeleteBtn = document.getElementById('bulk-delete-btn');
        this.clearSelectionBtn = document.getElementById('clear-selection-btn');
        
        // Pagination elements
        this.paginationStart = document.getElementById('pagination-start');
        this.paginationEnd = document.getElementById('pagination-end');
        this.paginationTotal = document.getElementById('pagination-total');
        this.pageSizeSelect = document.getElementById('page-size-select');
        this.paginationPages = document.getElementById('pagination-pages');
        this.paginationFirst = document.getElementById('pagination-first');
        this.paginationPrev = document.getElementById('pagination-prev');
        this.paginationNext = document.getElementById('pagination-next');
        this.paginationLast = document.getElementById('pagination-last');
        
        // Modals
        this.detailsModal = document.getElementById('version-details-modal-overlay');
        this.compareModal = document.getElementById('compare-versions-modal-overlay');
        this.uploadModal = document.getElementById('upload-version-modal-overlay');
        this.deleteModal = document.getElementById('delete-version-modal-overlay');
        this.successNotification = document.getElementById('upload-success-notification');
        
        // Details modal elements
        this.detailVersionId = document.getElementById('detail-modal-version-id');
        this.detailDataType = document.getElementById('detail-modal-data-type');
        this.detailStatus = document.getElementById('detail-modal-status');
        this.closeDetailsModal = document.getElementById('close-details-modal');
        this.closeDetailsBtn = document.getElementById('close-details-btn');
        
        // Tab elements
        this.tabButtons = document.querySelectorAll('.tab-btn');
        this.tabContents = document.querySelectorAll('.tab-content');
        
        // Data view elements
        this.dataViewSelect = document.getElementById('data-view-select');
        this.detailComparisonToggle = document.getElementById('detail-comparison-toggle');
        this.filterChangesBtn = document.getElementById('filter-changes-btn');
        this.downloadOriginalBtn = document.getElementById('download-original-btn');
        this.downloadCalculatedBtn = document.getElementById('download-calculated-btn');
        this.fullScreenDataBtn = document.getElementById('full-screen-data-btn');
        
        // Compare modal elements
        this.compareVersionA = document.getElementById('compare-version-a');
        this.compareVersionB = document.getElementById('compare-version-b');
        this.swapVersionsBtn = document.getElementById('swap-versions-btn');
        this.runCompareBtn = document.getElementById('run-compare');
        this.cancelCompareBtn = document.getElementById('cancel-compare');
        this.closeCompareModal = document.getElementById('close-compare-modal');
        this.exportCompareBtn = document.getElementById('export-comparison');
        this.compareMode = document.getElementById('compare-mode');
        this.showDifferences = document.getElementById('compare-show-differences');
        this.highlightChanges = document.getElementById('compare-highlight-changes');
        
        // Upload modal elements
        this.closeUploadModal = document.getElementById('close-upload-modal');
        this.cancelUploadBtn = document.getElementById('cancel-upload');
        this.prevStepBtn = document.getElementById('prev-step-btn');
        this.nextStepBtn = document.getElementById('next-step-btn');
        this.confirmUploadBtn = document.getElementById('confirm-upload');
        this.fileUploadArea = document.getElementById('file-upload-area');
        this.browseFileBtn = document.getElementById('browse-file-btn');
        this.uploadFileInput = document.getElementById('upload-file');
        this.fileInfo = document.getElementById('file-info');
        
        // Form elements
        this.uploadCustomer = document.getElementById('upload-customer');
        this.uploadAccount = document.getElementById('upload-account');
        this.uploadDataType = document.getElementById('upload-data-type');
        this.uploadTicket = document.getElementById('upload-ticket');
        this.uploadDescription = document.getElementById('upload-description');
        
        // Steps
        this.steps = document.querySelectorAll('.form-step');
        this.stepIndicators = document.querySelectorAll('.step');
        
        // Delete modal elements
        this.deleteVersionId = document.getElementById('delete-version-id');
        this.deleteFilename = document.getElementById('delete-filename');
        this.deleteCustomer = document.getElementById('delete-customer');
        this.deleteRecordCount = document.getElementById('delete-record-count');
        this.deleteUploadDate = document.getElementById('delete-upload-date');
        this.confirmDeleteBtn = document.getElementById('confirm-delete');
        this.cancelDeleteBtn = document.getElementById('cancel-delete');
        this.closeDeleteModal = document.getElementById('close-delete-modal');
        
        // Store currently viewed version for details modal
        this.currentViewVersion = null;
    }

    loadEnhancedSampleData() {
        // Generate enhanced sample data with realistic dedicated and project data
        this.versions = [
            {
                id: 'VER-001',
                customer: 'HCL',
                account: 'HCL_ABBVIE',
                fileName: 'dedicated_august_2025.csv',
                ticket: 'TKT-12345',
                uploadDate: '15/08/2025 14:30',
                loadDate: '15/08/2025 15:45',
                dataType: 'Dedicated',
                fileSize: '2.4 MB',
                records: 12,
                status: 'processed',
                adjustments: 'Tax +10% for Hungary, Overtime calculations added, Weekend rates applied',
                description: 'Original August dedicated data for HCL ABBVIE account',
                originalData: this.generateFullDedicatedData(),
                calculatedData: this.generateCalculatedDedicatedData(),
                calculations: [
                    {
                        title: 'Tax Adjustment for Hungary (+10%)',
                        description: 'Applied 10% tax increase for all Hungarian entries',
                        formula: 'New Tax = Original Tax × 1.10',
                        parameters: 'Affected countries: Hungary',
                        impact: 'All Hungarian entries updated with +10% tax'
                    },
                    {
                        title: 'Currency Conversion',
                        description: 'Converted all amounts to EUR using latest exchange rates',
                        formula: 'Amount EUR = Amount × Exchange Rate',
                        parameters: 'Exchange Rates: ZAR→EUR: 0.048, AED→EUR: 0.25, GBP→EUR: 1.17',
                        impact: 'All non-EUR amounts converted to EUR'
                    },
                    {
                        title: 'Overtime Calculations Added',
                        description: 'Added overtime calculations for applicable entries',
                        formula: 'OT Cost = OT Hours × OT Rate × 1.5',
                        parameters: 'OT Rate: Standard rates applied based on country',
                        impact: 'Overtime costs calculated for all eligible entries'
                    },
                    {
                        title: 'Weekend Work Rates',
                        description: 'Applied premium rates for weekend work hours',
                        formula: 'Weekend Cost = Weekend Hours × Weekend Rate × 2',
                        parameters: 'Weekend Rate: 200% of standard rate',
                        impact: 'Weekend costs calculated where applicable'
                    }
                ],
                metadata: {
                    fileFormat: 'CSV UTF-8',
                    delimiter: ',',
                    encoding: 'UTF-8',
                    headers: 42,
                    processedBy: 'System Auto-Processor v2.1',
                    validationStatus: 'Passed',
                    checksum: 'a1b2c3d4e5f6'
                }
            },
            {
                id: 'VER-002',
                customer: 'HCL',
                account: 'HCL_EUC_SUPPORT',
                fileName: 'project_august_2025.csv',
                ticket: 'SR-789',
                uploadDate: '10/09/2025 09:15',
                loadDate: '10/09/2025 10:30',
                dataType: 'Project',
                fileSize: '1.8 MB',
                records: 10,
                status: 'processed',
                adjustments: 'SLA adjustments, Technician replacements, Currency updates',
                description: 'Original August project support data for EUC',
                originalData: this.generateFullProjectData(),
                calculatedData: this.generateCalculatedProjectData(),
                calculations: [
                    {
                        title: 'SLA Adjustments Applied',
                        description: 'Updated SLA calculations based on new business rules',
                        formula: 'SLA % = (Worked Days ÷ Working Days) × 100',
                        parameters: 'New threshold: 95% compliance required',
                        impact: 'SLA percentages recalculated for all entries'
                    },
                    {
                        title: 'Technician Replacements',
                        description: 'Replaced outdated technician names with current assignments',
                        formula: 'Technician = Updated Technician List',
                        parameters: 'Updated from HR system as of 09/2025',
                        impact: '5 technician names updated'
                    },
                    {
                        title: 'Currency Updates',
                        description: 'Updated currency rates to latest values',
                        formula: 'New Amount = Original × Updated Rate',
                        parameters: 'Updated rates from financial system',
                        impact: 'All currency conversions updated'
                    },
                    {
                        title: 'Travel Cost Adjustments',
                        description: 'Adjusted travel costs based on new policies',
                        formula: 'Travel Cost = Base × Location Factor',
                        parameters: 'Location factors applied per country',
                        impact: 'Travel costs updated for all entries'
                    }
                ],
                metadata: {
                    fileFormat: 'CSV',
                    delimiter: ',',
                    encoding: 'UTF-8',
                    headers: 43,
                    processedBy: 'Project Processor v1.3',
                    validationStatus: 'Passed with warnings',
                    checksum: 'b2c3d4e5f6g7'
                }
            },
            {
                id: 'VER-003',
                customer: 'HCL',
                account: 'HCL_ABBVIE',
                fileName: 'dedicated_august_2025_calculated.csv',
                ticket: 'TKT-12346',
                uploadDate: '16/08/2025 11:20',
                loadDate: '16/08/2025 12:45',
                dataType: 'Dedicated',
                fileSize: '2.5 MB',
                records: 12,
                status: 'processed',
                adjustments: 'Calculated version with all adjustments applied',
                description: 'Calculated August dedicated data with tax, overtime, weekend rates',
                originalData: this.generateFullDedicatedData(),
                calculatedData: this.generateFullCalculatedDedicatedData(),
                calculations: [
                    {
                        title: 'Full Calculation Suite Applied',
                        description: 'All calculations including tax, overtime, weekend rates',
                        formula: 'Multiple calculations applied',
                        parameters: 'Complete calculation package',
                        impact: 'All 12 records updated with calculations'
                    }
                ],
                metadata: {
                    fileFormat: 'CSV UTF-8',
                    delimiter: ',',
                    encoding: 'UTF-8',
                    headers: 42,
                    processedBy: 'Calculation Engine v3.0',
                    validationStatus: 'Passed',
                    checksum: 'c3d4e5f6g7h8'
                }
            },
            {
                id: 'VER-004',
                customer: 'HCL',
                account: 'HCL_EUC_SUPPORT',
                fileName: 'project_august_2025_calculated.csv',
                ticket: 'SR-790',
                uploadDate: '11/09/2025 16:45',
                loadDate: '11/09/2025 17:30',
                dataType: 'Project',
                fileSize: '1.9 MB',
                records: 10,
                status: 'processed',
                adjustments: 'Calculated version with SLA and currency updates',
                description: 'Calculated August project data with all adjustments',
                originalData: this.generateFullProjectData(),
                calculatedData: this.generateFullCalculatedProjectData(),
                calculations: [
                    {
                        title: 'Project Calculations Complete',
                        description: 'All project-specific calculations applied',
                        formula: 'Multiple project calculations',
                        parameters: 'Project calculation suite',
                        impact: 'All 10 project records updated'
                    }
                ],
                metadata: {
                    fileFormat: 'CSV',
                    delimiter: ',',
                    encoding: 'UTF-8',
                    headers: 43,
                    processedBy: 'Project Calculator v2.0',
                    validationStatus: 'Passed',
                    checksum: 'd4e5f6g7h8i9'
                }
            },
            {
                id: 'VER-005',
                customer: 'HCL',
                account: 'HCL_ABBVIE',
                fileName: 'dedicated_september_2025.csv',
                ticket: 'TKT-12347',
                uploadDate: '05/09/2025 13:10',
                loadDate: '05/09/2025 14:25',
                dataType: 'Dedicated',
                fileSize: '2.6 MB',
                records: 14,
                status: 'processed',
                adjustments: 'September data with partial calculations',
                description: 'September dedicated data with some calculations applied',
                originalData: this.generateSeptemberDedicatedData(),
                calculatedData: this.generateSeptemberCalculatedDedicatedData(),
                calculations: [
                    {
                        title: 'September Calculations',
                        description: 'Partial calculations for September data',
                        formula: 'Selected calculations applied',
                        parameters: 'September-specific parameters',
                        impact: '14 September records processed'
                    }
                ],
                metadata: {
                    fileFormat: 'CSV UTF-8',
                    delimiter: ',',
                    encoding: 'UTF-8',
                    headers: 42,
                    processedBy: 'Monthly Processor v1.5',
                    validationStatus: 'Passed',
                    checksum: 'e5f6g7h8i9j0'
                }
            },
            {
                id: 'VER-006',
                customer: 'Acme Corp',
                account: 'ACME_PROJECTS',
                fileName: 'q3_project_data_v2.csv',
                ticket: 'TKT-67890',
                uploadDate: '05/09/2023 11:20',
                loadDate: '05/09/2023 12:45',
                dataType: 'Project',
                fileSize: '3.1 MB',
                records: 8,
                status: 'processing',
                adjustments: '',
                description: 'Q3 project data version 2'
            },
            {
                id: 'VER-007',
                customer: 'Tech Solutions',
                account: 'TECH_SUPPORT',
                fileName: 'support_projects_q3.csv',
                ticket: '',
                uploadDate: '20/09/2023 16:45',
                loadDate: '20/09/2023 17:30',
                dataType: 'Project',
                fileSize: '1.2 MB',
                records: 6,
                status: 'processed',
                adjustments: 'Fixed resource allocation calculations',
                description: 'Q3 support projects'
            },
            {
                id: 'VER-008',
                customer: 'Global Innovations',
                account: 'GLOBAL_INNOVATIONS_RND',
                fileName: 'rnd_projects_h2.csv',
                ticket: 'PRJ-2023-08',
                uploadDate: '25/08/2023 13:10',
                loadDate: '25/08/2023 14:25',
                dataType: 'Project',
                fileSize: '4.2 MB',
                records: 7,
                status: 'processed',
                adjustments: 'Applied R&D tax credits',
                description: 'H2 R&D projects data'
            },
            {
                id: 'VER-009',
                customer: 'HCL',
                account: 'HCL_ABBVIE_DSS',
                fileName: 'dispatch_data_august.csv',
                ticket: 'TKT-12348',
                uploadDate: '12/08/2025 09:30',
                loadDate: '12/08/2025 10:45',
                dataType: 'Project',
                fileSize: '1.5 MB',
                records: 8,
                status: 'processed',
                adjustments: 'Dispatch data with SLA calculations',
                description: 'August dispatch data with SLA metrics'
            },
            {
                id: 'VER-010',
                customer: 'HCL',
                account: 'HCL_EUC_SUPPORT',
                fileName: 'adhoc_projects_august.csv',
                ticket: 'SR-791',
                uploadDate: '18/08/2025 15:20',
                loadDate: '18/08/2025 16:35',
                dataType: 'Project',
                fileSize: '0.9 MB',
                records: 5,
                status: 'processed',
                adjustments: 'Adhoc projects with overtime calculations',
                description: 'August adhoc project data'
            }
        ];
        
        this.totalVersions = this.versions.length;
        this.filteredVersions = [...this.versions];
    }

    generateFullDedicatedData() {
        return [
            {
                "Site Category": "Dedicated",
                "Customer Name": "HCL",
                "Partner Name": "HCL Partner",
                "Country": "Hungary",
                "State": "Pest",
                "City": "Godollo",
                "Site Address": "Godollo - Gepyar",
                "Zip Code": "2100",
                "PO Number": "9200136102",
                "Technician name": "Mark Magyar",
                "Band": "Band 2",
                "Variant": "With Backfill",
                "Number of working days": 21,
                "Number of worked days": 21,
                "Monthly rate": 3591.49,
                "Daily rate": 0,
                "Actual Cost": 3324.64,
                "OT Hours": 0,
                "OT per Hour Rate": 25,
                "OT Hours cost": 0,
                "Weekened OT Hours": 0,
                "Weekend Rate": 50,
                "Weekend Cost": 0,
                "Travel/extra cost if applicable as per contract": 0,
                "Tax %": 0,
                "Tax cost": 0,
                "Total Cost": 3324.64,
                "Currency": "EUR",
                "SLA %": 100,
                "SLA Met": "Yes",
                "Reason for SLA not met(if applicable)": "",
                "Attendence approved by Delivery": "Yes",
                "Service Month (MM/YYYY)": "Aug-25",
                "Remarks": ""
            },
            {
                "Site Category": "Dedicated",
                "Customer Name": "HCL",
                "Partner Name": "HCL Partner",
                "Country": "South Africa",
                "State": "Gauteng",
                "City": "Kempton Park",
                "Site Address": "Kempton Park Site",
                "Zip Code": "1619",
                "PO Number": "9200135148",
                "Technician name": "Cleo Muchemwas",
                "Band": "Band 2",
                "Variant": "With Backfill",
                "Number of working days": 21,
                "Number of worked days": 21,
                "Monthly rate": 3162.5,
                "Daily rate": 0,
                "Actual Cost": 57678.28,
                "OT Hours": 0,
                "OT per Hour Rate": 150,
                "OT Hours cost": 0,
                "Weekened OT Hours": 0,
                "Weekend Rate": 300,
                "Weekend Cost": 0,
                "Travel/extra cost if applicable as per contract": 0,
                "Tax %": 0,
                "Tax cost": 0,
                "Total Cost": 57678.28,
                "Currency": "ZAR",
                "SLA %": 100,
                "SLA Met": "Yes",
                "Reason for SLA not met(if applicable)": "",
                "Attendence approved by Delivery": "Yes",
                "Service Month (MM/YYYY)": "Aug-25",
                "Remarks": ""
            },
            {
                "Site Category": "Dedicated",
                "Customer Name": "HCL",
                "Partner Name": "HCL Partner",
                "Country": "Nigeria",
                "State": "Rivers",
                "City": "Port Harcourt",
                "Site Address": "Port Harcourt Office",
                "Zip Code": "500001",
                "PO Number": "9200136102",
                "Technician name": "Wilson Adams",
                "Band": "Band 2",
                "Variant": "With Backfill",
                "Number of working days": 21,
                "Number of worked days": 21,
                "Monthly rate": 1208.92,
                "Daily rate": 0,
                "Actual Cost": 1119.1,
                "OT Hours": 0,
                "OT per Hour Rate": 20,
                "OT Hours cost": 0,
                "Weekened OT Hours": 0,
                "Weekend Rate": 40,
                "Weekend Cost": 0,
                "Travel/extra cost if applicable as per contract": 0,
                "Tax %": 8,
                "Tax cost": 89.53,
                "Total Cost": 1208.63,
                "Currency": "EUR",
                "SLA %": 95,
                "SLA Met": "Yes",
                "Reason for SLA not met(if applicable)": "UK to Nigeria sales tax",
                "Attendence approved by Delivery": "Yes",
                "Service Month (MM/YYYY)": "Aug-25",
                "Remarks": "Adding 8% sales tax from UK to Nigeria"
            },
            {
                "Site Category": "Dedicated",
                "Customer Name": "HCL",
                "Partner Name": "HCL Partner",
                "Country": "United Kingdom",
                "State": "Cambridgeshire",
                "City": "Peterborough",
                "Site Address": "Peterborough Site",
                "Zip Code": "PE1",
                "PO Number": "9200136102",
                "Technician name": "Divayansh Prabhker",
                "Band": "Band 2",
                "Variant": "With Backfill",
                "Number of working days": 21,
                "Number of worked days": 21,
                "Monthly rate": 5572.4,
                "Daily rate": 0,
                "Actual Cost": 5158.37,
                "OT Hours": 0,
                "OT per Hour Rate": 30,
                "OT Hours cost": 0,
                "Weekened OT Hours": 0,
                "Weekend Rate": 60,
                "Weekend Cost": 0,
                "Travel/extra cost if applicable as per contract": 0,
                "Tax %": 0,
                "Tax cost": 0,
                "Total Cost": 5158.37,
                "Currency": "EUR",
                "SLA %": 100,
                "SLA Met": "Yes",
                "Reason for SLA not met(if applicable)": "",
                "Attendence approved by Delivery": "Yes",
                "Service Month (MM/YYYY)": "Aug-25",
                "Remarks": ""
            }
        ];
    }

    generateCalculatedDedicatedData() {
        const original = this.generateFullDedicatedData();
        return original.map(row => {
            const calculated = {...row};
            
            // Apply tax +10% for Hungary
            if (row.Country === 'Hungary') {
                calculated["Tax %"] = 10;
                calculated["Tax cost"] = Math.round(row["Actual Cost"] * 0.10 * 100) / 100;
                calculated["Total Cost"] = Math.round((row["Actual Cost"] + calculated["Tax cost"]) * 100) / 100;
                calculated["Remarks"] = (row["Remarks"] ? row["Remarks"] + '; ' : '') + 'Hungary tax +10% applied';
            }
            
            // Add overtime calculations
            if (row["OT Hours"] > 0) {
                calculated["OT Hours cost"] = Math.round(row["OT Hours"] * row["OT per Hour Rate"] * 1.5 * 100) / 100;
                calculated["Total Cost"] = Math.round((calculated["Total Cost"] + calculated["OT Hours cost"]) * 100) / 100;
                calculated["Remarks"] = (calculated["Remarks"] ? calculated["Remarks"] + '; ' : '') + 'Overtime calculated';
            }
            
            // Add weekend rate calculations
            if (row["Weekened OT Hours"] > 0) {
                calculated["Weekend Cost"] = Math.round(row["Weekened OT Hours"] * row["Weekend Rate"] * 2 * 100) / 100;
                calculated["Total Cost"] = Math.round((calculated["Total Cost"] + calculated["Weekend Cost"]) * 100) / 100;
                calculated["Remarks"] = (calculated["Remarks"] ? calculated["Remarks"] + '; ' : '') + 'Weekend rates applied';
            }
            
            // Calculate daily rate
            if (row["Number of working days"] > 0) {
                calculated["Daily rate"] = Math.round(calculated["Monthly rate"] / row["Number of working days"] * 100) / 100;
            }
            
            return calculated;
        });
    }

    generateFullCalculatedDedicatedData() {
        const original = this.generateFullDedicatedData();
        return original.map(row => {
            const calculated = {...row};
            
            // Apply ALL calculations
            
            // Tax +10% for Hungary
            if (row.Country === 'Hungary') {
                calculated["Tax %"] = 10;
                calculated["Tax cost"] = Math.round(row["Actual Cost"] * 0.10 * 100) / 100;
                calculated["Total Cost"] = Math.round((row["Actual Cost"] + calculated["Tax cost"]) * 100) / 100;
                calculated["Remarks"] = (row["Remarks"] ? row["Remarks"] + '; ' : '') + 'Hungary tax +10% applied';
            }
            
            // Add sample overtime (simulate some overtime hours)
            if (row.Country === 'United Kingdom') {
                calculated["OT Hours"] = 5;
                calculated["OT Hours cost"] = Math.round(5 * row["OT per Hour Rate"] * 1.5 * 100) / 100;
                calculated["Total Cost"] = Math.round((calculated["Total Cost"] + calculated["OT Hours cost"]) * 100) / 100;
                calculated["Remarks"] = (calculated["Remarks"] ? calculated["Remarks"] + '; ' : '') + 'Overtime (5h) added';
            }
            
            // Add weekend rates for some entries
            if (row.Country === 'South Africa') {
                calculated["Weekened OT Hours"] = 3;
                calculated["Weekend Cost"] = Math.round(3 * row["Weekend Rate"] * 2 * 100) / 100;
                calculated["Total Cost"] = Math.round((calculated["Total Cost"] + calculated["Weekend Cost"]) * 100) / 100;
                calculated["Remarks"] = (calculated["Remarks"] ? calculated["Remarks"] + '; ' : '') + 'Weekend work (3h)';
            }
            
            // Calculate daily rate
            if (row["Number of working days"] > 0) {
                calculated["Daily rate"] = Math.round(calculated["Monthly rate"] / row["Number of working days"] * 100) / 100;
            }
            
            // Currency conversion for non-EUR
            if (row.Currency === 'ZAR') {
                // ZAR to EUR conversion (0.048)
                calculated["Monthly rate"] = Math.round(row["Monthly rate"] * 0.048);
                calculated["Actual Cost"] = Math.round(row["Actual Cost"] * 0.048);
                calculated["Total Cost"] = Math.round(row["Total Cost"] * 0.048);
                calculated.Currency = 'EUR';
                calculated["Remarks"] = (calculated["Remarks"] ? calculated["Remarks"] + '; ' : '') + 'Converted from ZAR to EUR';
            }
            
            return calculated;
        });
    }

    generateFullProjectData() {
        return [
            {
                "Site Category": "Dedicated",
                "Customer Name": "HCL",
                "Partner Name": "HCL Partner Ltd",
                "Project Name": "HCL EUC Support",
                "Project Start Date (MM/DD/YYYY)": "8/1/2025",
                "Project End Date (MM/DD/YYYY)": "8/31/2025",
                "Country": "HUNGARY",
                "State": "Pest",
                "City": "Nagytarcsa",
                "Site Address": "Szilas utca 4, 2142 Nagytarcsa",
                "Zip Code": "2142",
                "PO Number": "9200136102",
                "Technician name": "Janos Kovacs",
                "Band": "Band 2",
                "Variant": "With Backfill",
                "Number of working days": 22,
                "Number of worked days": 22,
                "Monthly rate": 3324.64,
                "Actual Cost": 3324.64,
                "OT Hours": 5,
                "OT per Hour Rate": 25,
                "OT Hours cost": 125,
                "Weekened OT Hours": 0,
                "Weekend Rate": 50,
                "Weekend Cost": 0,
                "Travel/extra cost if applicable as per contract": 0,
                "Tax %": 27,
                "Tax cost": 898.65,
                "Total Cost": 4348.29,
                "Currency": "EUR",
                "SLA %": 99,
                "SLA Met": "Yes",
                "Reason for SLA not met(if applicable)": "",
                "Attendence approved by Delivery": "Yes",
                "Service Month (MM/YYYY)": "Aug-25",
                "Remarks": ""
            },
            {
                "Site Category": "Dedicated",
                "Customer Name": "HCL",
                "Partner Name": "HCL Partner Ltd",
                "Project Name": "HCL EUC Support",
                "Project Start Date (MM/DD/YYYY)": "8/1/2025",
                "Project End Date (MM/DD/YYYY)": "8/31/2025",
                "Country": "SOUTH AFRICA",
                "State": "Gauteng",
                "City": "Boksburg",
                "Site Address": "Kempton Park",
                "Zip Code": "1619",
                "PO Number": "9200135148",
                "Technician name": "Sipho Dlamini",
                "Band": "Band 2",
                "Variant": "With Backfill",
                "Number of working days": 22,
                "Number of worked days": 21,
                "Monthly rate": 57678.28,
                "Actual Cost": 57678.28,
                "OT Hours": 10,
                "OT per Hour Rate": 150,
                "OT Hours cost": 1500,
                "Weekened OT Hours": 4,
                "Weekend Rate": 200,
                "Weekend Cost": 800,
                "Travel/extra cost if applicable as per contract": 0,
                "Tax %": 15,
                "Tax cost": 8875.24,
                "Total Cost": 68853.52,
                "Currency": "ZAR",
                "SLA %": 97,
                "SLA Met": "Yes",
                "Reason for SLA not met(if applicable)": "",
                "Attendence approved by Delivery": "Yes",
                "Service Month (MM/YYYY)": "Aug-25",
                "Remarks": ""
            },
            {
                "Site Category": "Dispatch",
                "Customer Name": "HCL",
                "Partner Name": "HCL Partner Ltd",
                "Project Name": "HCL Field Support",
                "Project Start Date (MM/DD/YYYY)": "8/1/2025",
                "Project End Date (MM/DD/YYYY)": "8/31/2025",
                "Country": "POLAND",
                "State": "Silesia",
                "City": "Sosnowiec",
                "Site Address": "Sosnowiec Site",
                "Zip Code": "41-200",
                "PO Number": "9200135685",
                "Technician name": "Piotr Nowak",
                "Band": "Band 2",
                "Variant": "With Backfill",
                "Number of working days": 20,
                "Number of worked days": 18,
                "Monthly rate": 609.05,
                "Actual Cost": 609.05,
                "OT Hours": 12,
                "OT per Hour Rate": 25,
                "OT Hours cost": 300,
                "Weekened OT Hours": 2,
                "Weekend Rate": 40,
                "Weekend Cost": 80,
                "Travel/extra cost if applicable as per contract": 0,
                "Tax %": 23,
                "Tax cost": 228.08,
                "Total Cost": 1217.13,
                "Currency": "GBP",
                "SLA %": 92,
                "SLA Met": "No",
                "Reason for SLA not met(if applicable)": "Resource shortage",
                "Attendence approved by Delivery": "Yes",
                "Service Month (MM/YYYY)": "Aug-25",
                "Remarks": ""
            },
            {
                "Site Category": "Dispatch",
                "Customer Name": "HCL",
                "Partner Name": "HCL Partner Ltd",
                "Project Name": "HCL Field Support",
                "Project Start Date (MM/DD/YYYY)": "8/1/2025",
                "Project End Date (MM/DD/YYYY)": "8/31/2025",
                "Country": "UNITED KINGDOM",
                "State": "Aberdeenshire",
                "City": "Aberdeen",
                "Site Address": "Aberdeen Hub",
                "Zip Code": "AB10",
                "PO Number": "9200135685",
                "Technician name": "Alan McGregor",
                "Band": "Band 2",
                "Variant": "With Backfill",
                "Number of working days": 20,
                "Number of worked days": 20,
                "Monthly rate": 2344.02,
                "Actual Cost": 2344.02,
                "OT Hours": 15,
                "OT per Hour Rate": 35,
                "OT Hours cost": 525,
                "Weekened OT Hours": 3,
                "Weekend Rate": 60,
                "Weekend Cost": 180,
                "Travel/extra cost if applicable as per contract": 120,
                "Tax %": 20,
                "Tax cost": 633.8,
                "Total Cost": 3802.82,
                "Currency": "GBP",
                "SLA %": 98,
                "SLA Met": "Yes",
                "Reason for SLA not met(if applicable)": "",
                "Attendence approved by Delivery": "Yes",
                "Service Month (MM/YYYY)": "Aug-25",
                "Remarks": "all dispatch Aug 25"
            }
        ];
    }

    generateCalculatedProjectData() {
        const original = this.generateFullProjectData();
        return original.map(row => {
            const calculated = {...row};
            
            // Apply SLA adjustments
            if (row["SLA %"] < 95) {
                calculated["SLA Met"] = "No";
                if (!row["Reason for SLA not met(if applicable)"]) {
                    calculated["Reason for SLA not met(if applicable)"] = "SLA below 95% threshold";
                }
            } else if (row["SLA %"] >= 95) {
                calculated["SLA Met"] = "Yes";
            }
            
            // Technician replacements
            if (row["Technician name"] === "Sipho Dlamini") {
                calculated["Technician name"] = "Thabo Mbeki";
                calculated["Remarks"] = (row["Remarks"] ? row["Remarks"] + '; ' : '') + 'Technician replaced';
            }
            
            // Currency updates (GBP to EUR)
            if (row.Currency === 'GBP') {
                const exchangeRate = 1.17;
                calculated["Monthly rate"] = Math.round(row["Monthly rate"] * exchangeRate);
                calculated["Actual Cost"] = Math.round(row["Actual Cost"] * exchangeRate);
                calculated["OT Hours cost"] = Math.round(row["OT Hours cost"] * exchangeRate);
                calculated["Weekend Cost"] = Math.round(row["Weekend Cost"] * exchangeRate);
                calculated["Tax cost"] = Math.round(row["Tax cost"] * exchangeRate);
                calculated["Total Cost"] = Math.round(row["Total Cost"] * exchangeRate);
                calculated.Currency = 'EUR';
                calculated["Remarks"] = (calculated["Remarks"] ? calculated["Remarks"] + '; ' : '') + 'Converted from GBP to EUR';
            }
            
            // Travel cost adjustments
            if (row["Travel/extra cost if applicable as per contract"] > 0) {
                calculated["Travel/extra cost if applicable as per contract"] = Math.round(row["Travel/extra cost if applicable as per contract"] * 1.1);
                calculated["Total Cost"] = calculated["Total Cost"] + (calculated["Travel/extra cost if applicable as per contract"] - row["Travel/extra cost if applicable as per contract"]);
                calculated["Remarks"] = (calculated["Remarks"] ? calculated["Remarks"] + '; ' : '') + 'Travel cost +10%';
            }
            
            return calculated;
        });
    }

    generateFullCalculatedProjectData() {
        const original = this.generateFullProjectData();
        return original.map(row => {
            const calculated = {...row};
            
            // Apply ALL project calculations
            
            // SLA adjustments
            calculated["SLA %"] = Math.min(100, Math.round(row["SLA %"] * 1.02));
            if (calculated["SLA %"] < 95) {
                calculated["SLA Met"] = "No";
                if (!row["Reason for SLA not met(if applicable)"]) {
                    calculated["Reason for SLA not met(if applicable)"] = "Adjusted SLA below threshold";
                }
            }
            
            // Technician replacements
            if (row["Technician name"] === "Janos Kovacs") {
                calculated["Technician name"] = "Istvan Nagy";
            }
            if (row["Technician name"] === "Sipho Dlamini") {
                calculated["Technician name"] = "Thabo Mbeki";
            }
            if (row["Technician name"] === "Piotr Nowak") {
                calculated["Technician name"] = "Jan Kowalski";
            }
            
            // Currency updates
            if (row.Currency === 'ZAR') {
                const exchangeRate = 0.048;
                calculated["Monthly rate"] = Math.round(row["Monthly rate"] * exchangeRate);
                calculated["Actual Cost"] = Math.round(row["Actual Cost"] * exchangeRate);
                calculated["OT Hours cost"] = Math.round(row["OT Hours cost"] * exchangeRate);
                calculated["Weekend Cost"] = Math.round(row["Weekend Cost"] * exchangeRate);
                calculated["Tax cost"] = Math.round(row["Tax cost"] * exchangeRate);
                calculated["Total Cost"] = Math.round(row["Total Cost"] * exchangeRate);
                calculated.Currency = 'EUR';
            } else if (row.Currency === 'GBP') {
                const exchangeRate = 1.17;
                calculated["Monthly rate"] = Math.round(row["Monthly rate"] * exchangeRate);
                calculated["Actual Cost"] = Math.round(row["Actual Cost"] * exchangeRate);
                calculated["OT Hours cost"] = Math.round(row["OT Hours cost"] * exchangeRate);
                calculated["Weekend Cost"] = Math.round(row["Weekend Cost"] * exchangeRate);
                calculated["Tax cost"] = Math.round(row["Tax cost"] * exchangeRate);
                calculated["Total Cost"] = Math.round(row["Total Cost"] * exchangeRate);
                calculated.Currency = 'EUR';
            }
            
            // Travel cost adjustments
            if (row["Travel/extra cost if applicable as per contract"] > 0) {
                calculated["Travel/extra cost if applicable as per contract"] = Math.round(row["Travel/extra cost if applicable as per contract"] * 1.15);
            }
            
            // Recalculate total cost
            calculated["Total Cost"] = calculated["Actual Cost"] + 
                                     calculated["OT Hours cost"] + 
                                     calculated["Weekend Cost"] + 
                                     calculated["Travel/extra cost if applicable as per contract"] + 
                                     calculated["Tax cost"];
            
            // Add remarks
            calculated["Remarks"] = (row["Remarks"] ? row["Remarks"] + '; ' : '') + 'Full calculations applied: SLA, Tech replacements, Currency, Travel';
            
            return calculated;
        });
    }

    generateSeptemberDedicatedData() {
        const data = this.generateFullDedicatedData();
        return data.map(row => ({
            ...row,
            "Service Month (MM/YYYY)": "Sep-25",
            "Monthly rate": Math.round(row["Monthly rate"] * 1.05),
            "Actual Cost": Math.round(row["Actual Cost"] * 1.05),
            "Total Cost": Math.round(row["Total Cost"] * 1.05)
        }));
    }

    generateSeptemberCalculatedDedicatedData() {
        const data = this.generateSeptemberDedicatedData();
        return this.generateCalculatedDedicatedData.call({ generateFullDedicatedData: () => data });
    }

    setupEventListeners() {
        // Search and filter events
        this.searchInput.addEventListener('input', () => this.filterVersions());
        this.typeFilter.addEventListener('change', () => this.filterVersions());
        this.customerFilter.addEventListener('change', () => this.filterVersions());
        this.statusFilter.addEventListener('change', () => this.filterVersions());
        
        // Button events
        this.uploadBtn.addEventListener('click', () => this.openUploadModal());
        this.firstUploadBtn.addEventListener('click', () => this.openUploadModal());
        this.refreshBtn.addEventListener('click', () => this.refreshVersions());
        this.exportBtn.addEventListener('click', () => this.exportVersionList());
        
        // Bulk action events
        this.selectAllCheckbox.addEventListener('change', (e) => this.toggleSelectAll(e.target.checked));
        this.bulkCompareBtn.addEventListener('click', () => this.openCompareModalForSelected());
        this.bulkDeleteBtn.addEventListener('click', () => this.openDeleteModalForSelected());
        this.clearSelectionBtn.addEventListener('click', () => this.clearSelection());
        
        // Pagination events
        this.pageSizeSelect.addEventListener('change', () => this.changePageSize());
        this.paginationFirst.addEventListener('click', () => this.goToPage(1));
        this.paginationPrev.addEventListener('click', () => this.goToPage(this.currentPage - 1));
        this.paginationNext.addEventListener('click', () => this.goToPage(this.currentPage + 1));
        this.paginationLast.addEventListener('click', () => this.goToLastPage());
        
        // Modal close events
        this.closeDetailsModal.addEventListener('click', () => this.closeDetailsModalFunc());
        this.closeDetailsBtn.addEventListener('click', () => this.closeDetailsModalFunc());
        this.closeCompareModal.addEventListener('click', () => this.closeCompareModalFunc());
        this.cancelCompareBtn.addEventListener('click', () => this.closeCompareModalFunc());
        this.closeUploadModal.addEventListener('click', () => this.closeUploadModalFunc());
        this.cancelUploadBtn.addEventListener('click', () => this.closeUploadModalFunc());
        this.closeDeleteModal.addEventListener('click', () => this.closeDeleteModalFunc());
        this.cancelDeleteBtn.addEventListener('click', () => this.closeDeleteModalFunc());
        
        // Tab events
        this.setupTabListeners();
        
        // Data view events
        this.dataViewSelect.addEventListener('change', () => this.updateDataView());
        this.downloadOriginalBtn.addEventListener('click', () => this.downloadOriginalCSV());
        this.downloadCalculatedBtn.addEventListener('click', () => this.downloadCalculatedCSV());
        this.fullScreenDataBtn.addEventListener('click', () => this.toggleFullScreen());
        this.filterChangesBtn.addEventListener('click', () => this.toggleFilterChanges());
        
        // Compare modal events
        this.swapVersionsBtn.addEventListener('click', () => this.swapVersions());
        this.runCompareBtn.addEventListener('click', () => this.runComparison());
        this.compareVersionA.addEventListener('change', () => this.updateVersionInfo('A'));
        this.compareVersionB.addEventListener('change', () => this.updateVersionInfo('B'));
        this.compareMode.addEventListener('change', (e) => {
            this.comparisonMode = e.target.value;
            if (this.currentComparison.versionA && this.currentComparison.versionB) {
                this.renderComparisonResults();
            }
        });
        
        // Delete modal events
        this.confirmDeleteBtn.addEventListener('click', () => this.deleteVersion());
        
        // Close notification
        const closeNotificationBtn = document.getElementById('close-notification');
        if (closeNotificationBtn) {
            closeNotificationBtn.addEventListener('click', () => {
                this.successNotification.classList.add('hidden');
            });
        }
        
        // Keyboard shortcuts
        document.addEventListener('keydown', (e) => this.handleKeyboardShortcuts(e));
    }

    setupTabListeners() {
        this.tabButtons.forEach(btn => {
            btn.addEventListener('click', (e) => {
                e.preventDefault();
                this.switchTab(btn.dataset.tab);
            });
        });
    }

    renderVersionTable() {
        const start = (this.currentPage - 1) * this.pageSize;
        const end = start + this.pageSize;
        const versionsToShow = this.filteredVersions.slice(start, end);
        
        if (versionsToShow.length === 0) {
            this.tableBody.innerHTML = '';
            this.noResultsMessage.classList.remove('hidden');
            this.bulkActions.classList.remove('show');
            return;
        }
        
        this.noResultsMessage.classList.add('hidden');
        this.tableBody.innerHTML = '';
        
        versionsToShow.forEach(version => {
            const row = document.createElement('tr');
            row.dataset.versionId = version.id;
            
            if (this.selectedVersions.has(version.id)) {
                row.classList.add('selected');
            }
            
            const statusIcon = this.getStatusIcon(version.status);
            const statusText = this.capitalizeFirst(version.status);
            
            row.innerHTML = `
                <td class="select-column">
                    <input type="checkbox" class="version-select" data-version="${version.id}" 
                           ${this.selectedVersions.has(version.id) ? 'checked' : ''}>
                </td>
                <td>
                    <div class="version-badge">${version.id}</div>
                </td>
                <td>${version.customer}</td>
                <td>${version.account}</td>
                <td>${version.fileName}</td>
                <td>${version.ticket || '-'}</td>
                <td>${version.uploadDate}</td>
                <td>${version.loadDate}</td>
                <td>
                    <div class="data-type-badge ${version.dataType.toLowerCase()}">
                        ${version.dataType}
                    </div>
                </td>
                <td>${version.fileSize}</td>
                <td>${version.records} rows</td>
                <td>
                    <div class="status-badge ${version.status}">
                        ${statusIcon} ${statusText}
                    </div>
                </td>
                <td>
                    <div class="action-buttons-cell">
                        <button class="action-btn view-btn" data-version="${version.id}" title="View Details">
                            <i class="fas fa-eye"></i>
                        </button>
                        <button class="action-btn compare-btn" data-version="${version.id}" title="Compare">
                            <i class="fas fa-code-compare"></i>
                        </button>
                        <button class="action-btn delete-btn" data-version="${version.id}" title="Delete">
                            <i class="fas fa-trash"></i>
                        </button>
                    </div>
                </td>
            `;
            
            this.tableBody.appendChild(row);
        });
        
        this.addTableRowEventListeners();
        this.updatePaginationInfo();
        this.updateBulkActions();
    }

    addTableRowEventListeners() {
        this.tableBody.addEventListener('click', (e) => {
            const target = e.target;
            
            const viewBtn = target.closest('.view-btn');
            if (viewBtn) {
                e.preventDefault();
                e.stopPropagation();
                const versionId = viewBtn.dataset.version;
                this.openDetailsModal(versionId);
                return;
            }
            
            const compareBtn = target.closest('.compare-btn');
            if (compareBtn) {
                e.preventDefault();
                e.stopPropagation();
                const versionId = compareBtn.dataset.version;
                this.openCompareModalWithVersion(versionId);
                return;
            }
            
            const deleteBtn = target.closest('.delete-btn');
            if (deleteBtn) {
                e.preventDefault();
                e.stopPropagation();
                const versionId = deleteBtn.dataset.version;
                this.openDeleteModal(versionId);
                return;
            }
            
            const checkbox = target.closest('input[type="checkbox"].version-select');
            if (checkbox) {
                e.stopPropagation();
                const versionId = checkbox.dataset.version;
                const row = checkbox.closest('tr');
                
                if (checkbox.checked) {
                    this.selectedVersions.add(versionId);
                    row.classList.add('selected');
                } else {
                    this.selectedVersions.delete(versionId);
                    row.classList.remove('selected');
                }
                this.updateBulkActions();
                this.updateSelectAllCheckbox();
                return;
            }
            
            const row = target.closest('tr[data-version-id]');
            if (row && !target.closest('.action-buttons-cell')) {
                const versionId = row.dataset.versionId;
                const checkbox = row.querySelector('.version-select');
                
                if (checkbox) {
                    checkbox.checked = !checkbox.checked;
                    const event = new Event('change', { bubbles: true });
                    checkbox.dispatchEvent(event);
                }
            }
        });
    }

    openDetailsModal(versionId) {
        const version = this.versions.find(v => v.id === versionId);
        if (!version) return;
        
        this.currentViewVersion = version;
        
        this.detailVersionId.textContent = version.id;
        this.detailDataType.textContent = version.dataType;
        this.detailDataType.className = `data-type-badge ${version.dataType.toLowerCase()}`;
        this.detailStatus.textContent = `${this.getStatusIcon(version.status)} ${this.capitalizeFirst(version.status)}`;
        this.detailStatus.className = `status-badge ${version.status}`;
        
        document.getElementById('detail-modal-title').textContent = `${version.id} - ${version.fileName}`;
        
        this.loadDataTab(version);
        this.loadCalculationsTab(version);
        this.loadMetadataTab(version);
        
        this.detailsModal.classList.remove('hidden');
        document.body.style.overflow = 'hidden';
        
        this.switchTab('data-tab');
    }

    loadDataTab(version) {
        const container = document.getElementById('detail-data-container');
        if (!container) return;
        
        const viewMode = this.dataViewSelect.value;
        const showComparison = this.detailComparisonToggle.checked;
        
        if (viewMode === 'original') {
            this.renderDataTable(container, version.originalData, 'Original Data', 'original');
        } else if (viewMode === 'calculated') {
            const data = version.calculatedData || version.originalData;
            this.renderDataTable(container, data, 'Calculated Data', 'calculated');
        } else if (viewMode === 'side-by-side') {
            this.renderSideBySideComparison(container, version.originalData, version.calculatedData || version.originalData);
        }
    }

    renderDataTable(container, data, title, type) {
        container.innerHTML = '';
        
        if (!data || data.length === 0) {
            container.innerHTML = '<div class="empty-state"><i class="fas fa-database"></i><p>No data available.</p></div>';
            return;
        }
        
        const table = document.createElement('div');
        table.className = 'comparison-grid';
        
        const column = document.createElement('div');
        column.className = 'comparison-column';
        
        const header = document.createElement('div');
        header.className = 'column-header';
        header.innerHTML = `<strong>${title}</strong>`;
        
        const content = document.createElement('div');
        content.className = 'column-content';
        
        const tableEl = document.createElement('table');
        tableEl.className = 'data-table';
        
        const headers = Object.keys(data[0]);
        
        let thead = '<thead><tr>';
        headers.forEach(header => {
            thead += `<th>${this.formatHeader(header)}</th>`;
        });
        thead += '</tr></thead>';
        
        let tbody = '<tbody>';
        data.forEach((row, rowIndex) => {
            tbody += '<tr>';
            headers.forEach(header => {
                const value = row[header];
                let cellClass = '';
                let displayValue = this.formatValue(value, header);
                
                // Add highlighting for calculated data
                if (type === 'calculated' && this.shouldHighlight(value, header, row)) {
                    cellClass = 'highlight-calculated';
                }
                
                tbody += `<td${cellClass ? ` class="${cellClass}"` : ''}>${displayValue}</td>`;
            });
            tbody += '</tr>';
        });
        tbody += '</tbody>';
        
        tableEl.innerHTML = thead + tbody;
        content.appendChild(tableEl);
        column.appendChild(header);
        column.appendChild(content);
        table.appendChild(column);
        
        container.appendChild(table);
    }

    renderSideBySideComparison(container, originalData, calculatedData) {
        container.innerHTML = '';
        
        if (!originalData || !calculatedData) {
            container.innerHTML = '<div class="empty-state"><i class="fas fa-code-compare"></i><p>Comparison data not available.</p></div>';
            return;
        }
        
        const table = document.createElement('div');
        table.className = 'comparison-grid';
        
        // Original Data Column
        const columnA = document.createElement('div');
        columnA.className = 'comparison-column';
        columnA.innerHTML = `
            <div class="column-header">
                <strong>Original Data</strong>
                <span class="column-version-info">Before calculations</span>
            </div>
            <div class="column-content">
                ${this.generateDataTableHTML(originalData, 'original')}
            </div>
        `;
        
        // Divider
        const divider = document.createElement('div');
        divider.className = 'comparison-divider';
        divider.innerHTML = '<i class="fas fa-arrows-alt-h"></i>';
        
        // Calculated Data Column
        const columnB = document.createElement('div');
        columnB.className = 'comparison-column';
        columnB.innerHTML = `
            <div class="column-header">
                <strong>Calculated Data</strong>
                <span class="column-version-info">After calculations</span>
            </div>
            <div class="column-content">
                ${this.generateDataTableHTML(calculatedData, 'calculated')}
            </div>
        `;
        
        table.appendChild(columnA);
        table.appendChild(divider);
        table.appendChild(columnB);
        container.appendChild(table);
    }

    generateDataTableHTML(data, type) {
        if (!data || data.length === 0) return '<div class="empty-state">No data</div>';
        
        const headers = Object.keys(data[0]);
        let html = '<table class="data-table">';
        
        // Header
        html += '<thead><tr>';
        headers.forEach(header => {
            html += `<th>${this.formatHeader(header)}</th>`;
        });
        html += '</tr></thead>';
        
        // Body
        html += '<tbody>';
        data.forEach((row, rowIndex) => {
            html += '<tr>';
            headers.forEach(header => {
                const value = row[header];
                let cellClass = '';
                let displayValue = this.formatValue(value, header);
                
                // Add highlighting based on type
                if (type === 'calculated' && this.shouldHighlight(value, header, row)) {
                    cellClass = 'highlight-calculated';
                }
                
                html += `<td${cellClass ? ` class="${cellClass}"` : ''}>${displayValue}</td>`;
            });
            html += '</tr>';
        });
        html += '</tbody></table>';
        
        return html;
    }

    shouldHighlight(value, header, row) {
        // Highlight cells that would typically be calculated
        const calculatedFields = [
            'Total Cost',
            'Tax cost',
            'OT Hours cost',
            'Weekend Cost',
            'Daily rate',
            'SLA %',
            'SLA Met'
        ];
        
        if (calculatedFields.includes(header)) {
            return true;
        }
        
        // Highlight if value is numeric and potentially calculated
        if (typeof value === 'number' && value !== 0) {
            const numericFields = [
                'Monthly rate',
                'Actual Cost',
                'OT per Hour Rate',
                'Weekend Rate',
                'Tax %'
            ];
            
            if (numericFields.includes(header)) {
                return true;
            }
        }
        
        return false;
    }

    loadCalculationsTab(version) {
        const container = document.getElementById('calculations-list');
        if (!container) return;
        
        if (!version.calculations || version.calculations.length === 0) {
            container.innerHTML = '<div class="empty-state"><i class="fas fa-calculator"></i><p>No calculations applied.</p></div>';
            return;
        }
        
        let html = '';
        version.calculations.forEach(calc => {
            html += `
                <div class="calculation-item">
                    <div class="calculation-header">
                        <div class="calculation-title">
                            <i class="fas fa-calculator"></i>
                            ${calc.title}
                        </div>
                        <div class="calculation-meta">
                            <i class="fas fa-bolt"></i> Applied
                        </div>
                    </div>
                    <div class="calculation-description">
                        ${calc.description}
                    </div>
                    <div class="calculation-details">
                        <div class="detail-item">
                            <label>Formula:</label>
                            <span>${calc.formula}</span>
                        </div>
                        <div class="detail-item">
                            <label>Parameters:</label>
                            <span>${calc.parameters}</span>
                        </div>
                        <div class="detail-item">
                            <label>Impact:</label>
                            <span>${calc.impact}</span>
                        </div>
                    </div>
                </div>
            `;
        });
        
        container.innerHTML = html;
    }

    loadMetadataTab(version) {
        // File Information
        document.getElementById('meta-filename').textContent = version.fileName;
        document.getElementById('meta-filesize').textContent = version.fileSize;
        document.getElementById('meta-recordcount').textContent = `${version.records} records`;
        document.getElementById('meta-format').textContent = version.metadata?.fileFormat || 'CSV';
        
        // Customer Information
        document.getElementById('meta-customer').textContent = version.customer;
        document.getElementById('meta-account').textContent = version.account;
        document.getElementById('meta-datatype').textContent = version.dataType;
        document.getElementById('meta-ticket').textContent = version.ticket || '-';
        
        // Timeline
        document.getElementById('meta-uploaddate').textContent = version.uploadDate;
        document.getElementById('meta-loaddate').textContent = version.loadDate;
        document.getElementById('meta-processingtime').textContent = '15 minutes';
        document.getElementById('meta-lastaccessed').textContent = 'Today';
        
        // Processing Information
        document.getElementById('meta-processstatus').textContent = this.capitalizeFirst(version.status);
        document.getElementById('meta-calccount').textContent = version.calculations?.length || 0;
        document.getElementById('meta-modifiedrows').textContent = version.records || 0;
        document.getElementById('meta-errors').textContent = '0';
        
        // Processing Log
        const logContainer = document.getElementById('processing-log-entries');
        if (logContainer) {
            const logs = [
                { time: '14:30:00', message: 'File uploaded successfully', type: 'success' },
                { time: '14:31:15', message: 'File validation passed', type: 'success' },
                { time: '14:32:45', message: 'Data parsing completed', type: 'info' },
                { time: '14:35:20', message: 'Calculations applied: Tax, Overtime, Weekend rates', type: 'info' },
                { time: '14:40:10', message: 'Currency conversions completed', type: 'info' },
                { time: '14:45:30', message: 'Version processing completed successfully', type: 'success' }
            ];
            
            let logHtml = '';
            logs.forEach(log => {
                logHtml += `
                    <div class="log-entry ${log.type}">
                        <div class="log-time">${log.time}</div>
                        <div class="log-message">${log.message}</div>
                    </div>
                `;
            });
            
            logContainer.innerHTML = logHtml;
        }
    }

    openCompareModalWithVersion(versionId) {
        this.openCompareModal();
        this.compareVersionA.value = versionId;
        this.updateVersionInfo('A');
        this.updateCompareButtonState();
    }

    openCompareModalForSelected() {
        if (this.selectedVersions.size !== 2) {
            alert('Please select exactly 2 versions to compare.');
            return;
        }
        
        const [id1, id2] = Array.from(this.selectedVersions);
        this.openCompareModal();
        this.compareVersionA.value = id1;
        this.compareVersionB.value = id2;
        this.updateVersionInfo('A');
        this.updateVersionInfo('B');
        this.updateCompareButtonState();
    }

    openCompareModal() {
        this.populateCompareDropdowns();
        this.compareModal.classList.remove('hidden');
        document.body.style.overflow = 'hidden';
    }

    populateCompareDropdowns() {
        this.compareVersionA.innerHTML = '<option value="">Select Version A</option>';
        this.compareVersionB.innerHTML = '<option value="">Select Version B</option>';
        
        this.versions.forEach(version => {
            const optionA = document.createElement('option');
            optionA.value = version.id;
            optionA.textContent = `${version.id} - ${version.customer} - ${version.fileName}`;
            this.compareVersionA.appendChild(optionA.cloneNode(true));
            
            const optionB = document.createElement('option');
            optionB.value = version.id;
            optionB.textContent = `${version.id} - ${version.customer} - ${version.fileName}`;
            this.compareVersionB.appendChild(optionB.cloneNode(true));
        });
    }

    updateVersionInfo(column) {
        const selectElement = column === 'A' ? this.compareVersionA : this.compareVersionB;
        const infoElement = document.getElementById(`version-${column.toLowerCase()}-info`);
        const versionId = selectElement.value;
        
        if (!versionId) {
            infoElement.classList.remove('show');
            this.updateCompareButtonState();
            return;
        }
        
        const version = this.versions.find(v => v.id === versionId);
        if (!version) return;
        
        infoElement.innerHTML = `
            <div><strong>Type:</strong> ${version.dataType}</div>
            <div><strong>Records:</strong> ${version.records}</div>
            <div><strong>Uploaded:</strong> ${version.uploadDate}</div>
            ${version.ticket ? `<div><strong>Ticket:</strong> ${version.ticket}</div>` : ''}
        `;
        infoElement.classList.add('show');
        
        this.currentComparison[`version${column}`] = version;
        this.updateCompareButtonState();
    }

    updateCompareButtonState() {
        const versionA = this.compareVersionA.value;
        const versionB = this.compareVersionB.value;
        
        if (!versionA || !versionB || versionA === versionB) {
            this.runCompareBtn.disabled = true;
            return;
        }
        
        const versionAObj = this.versions.find(v => v.id === versionA);
        const versionBObj = this.versions.find(v => v.id === versionB);
        
        if (versionAObj && versionBObj && versionAObj.dataType !== versionBObj.dataType) {
            this.runCompareBtn.disabled = true;
            this.runCompareBtn.title = 'Cannot compare different data types';
        } else {
            this.runCompareBtn.disabled = false;
            this.runCompareBtn.title = '';
        }
    }

    switchTab(tabId) {
        this.tabButtons.forEach(btn => {
            btn.classList.remove('active');
            if (btn.dataset.tab === tabId) {
                btn.classList.add('active');
            }
        });
        
        this.tabContents.forEach(content => {
            content.classList.remove('active');
            if (content.id === tabId) {
                content.classList.add('active');
            }
        });
        
        if (tabId === 'data-tab' && this.currentViewVersion) {
            this.loadDataTab(this.currentViewVersion);
        }
    }

    runComparison() {
        const versionA = this.currentComparison.versionA;
        const versionB = this.currentComparison.versionB;
        
        if (!versionA || !versionB || versionA.dataType !== versionB.dataType) return;
        
        this.renderComparisonResults();
        this.exportCompareBtn.disabled = false;
    }

    renderComparisonResults() {
        const resultsContainer = document.getElementById('compare-results');
        const versionA = this.currentComparison.versionA;
        const versionB = this.currentComparison.versionB;
        
        if (this.comparisonMode === 'side-by-side') {
            resultsContainer.innerHTML = this.generateSideBySideComparisonView(versionA, versionB);
        } else if (this.comparisonMode === 'unified') {
            resultsContainer.innerHTML = this.generateUnifiedComparisonView(versionA, versionB);
        } else if (this.comparisonMode === 'summary') {
            resultsContainer.innerHTML = this.generateSummaryComparisonView(versionA, versionB);
        }
        
        this.updateComparisonStats(versionA, versionB);
    }

    generateSideBySideComparisonView(versionA, versionB) {
        const dataA = versionA.originalData || [];
        const dataB = versionB.originalData || [];
        const showOnlyDifferences = this.showDifferences.checked;
        const highlightChanges = this.highlightChanges.checked;
        
        if (dataA.length === 0 || dataB.length === 0) {
            return '<div class="comparison-placeholder"><i class="fas fa-code-compare"></i><p>No data to compare</p></div>';
        }
        
        const headers = Object.keys(dataA[0] || dataB[0]);
        
        let html = `
            <div class="comparison-grid">
                <div class="comparison-column">
                    <div class="column-header">
                        <strong>${versionA.id}</strong>
                        <span class="column-version-info">${versionA.fileName}</span>
                    </div>
                    <div class="column-content">
                        <table class="side-by-side-table">
                            <thead>
                                <tr>
                                    ${headers.map(h => `<th>${this.formatHeader(h)}</th>`).join('')}
                                </tr>
                            </thead>
                            <tbody>
        `;
        
        // Version A rows
        dataA.forEach((row, rowIndex) => {
            const rowB = dataB[rowIndex] || {};
            let rowHasDifferences = false;
            
            if (showOnlyDifferences) {
                rowHasDifferences = headers.some(h => {
                    const valA = row[h];
                    const valB = rowB[h];
                    return JSON.stringify(valA) !== JSON.stringify(valB);
                });
                
                if (!rowHasDifferences) return;
            }
            
            html += '<tr>';
            headers.forEach(header => {
                const value = row[header];
                const compareValue = rowB[header];
                const isDifferent = JSON.stringify(value) !== JSON.stringify(compareValue);
                
                let cellClass = '';
                if (highlightChanges && isDifferent) {
                    cellClass = 'highlight-removed';
                }
                
                html += `<td${cellClass ? ` class="${cellClass}"` : ''}>${this.formatValue(value, header)}</td>`;
            });
            html += '</tr>';
        });
        
        html += `
                            </tbody>
                        </table>
                    </div>
                </div>
                
                <div class="comparison-column">
                    <div class="column-header">
                        <strong>${versionB.id}</strong>
                        <span class="column-version-info">${versionB.fileName}</span>
                    </div>
                    <div class="column-content">
                        <table class="side-by-side-table">
                            <thead>
                                <tr>
                                    ${headers.map(h => `<th>${this.formatHeader(h)}</th>`).join('')}
                                </tr>
                            </thead>
                            <tbody>
        `;
        
        // Version B rows
        dataB.forEach((row, rowIndex) => {
            const rowA = dataA[rowIndex] || {};
            let rowHasDifferences = false;
            
            if (showOnlyDifferences) {
                rowHasDifferences = headers.some(h => {
                    const valA = rowA[h];
                    const valB = row[h];
                    return JSON.stringify(valA) !== JSON.stringify(valB);
                });
                
                if (!rowHasDifferences) return;
            }
            
            html += '<tr>';
            headers.forEach(header => {
                const value = row[header];
                const compareValue = rowA[header];
                const isDifferent = JSON.stringify(value) !== JSON.stringify(compareValue);
                
                let cellClass = '';
                if (highlightChanges && isDifferent) {
                    cellClass = 'highlight-added';
                }
                
                html += `<td${cellClass ? ` class="${cellClass}"` : ''}>${this.formatValue(value, header)}</td>`;
            });
            html += '</tr>';
        });
        
        html += `
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        `;
        
        return html;
    }

    generateUnifiedComparisonView(versionA, versionB) {
        const dataA = versionA.originalData || [];
        const dataB = versionB.originalData || [];
        
        if (dataA.length === 0 || dataB.length === 0) {
            return '<div class="comparison-placeholder"><i class="fas fa-code-compare"></i><p>No data to compare</p></div>';
        }
        
        const headers = Object.keys(dataA[0] || dataB[0]);
        const maxRows = Math.max(dataA.length, dataB.length);
        
        let html = `
            <div class="unified-view">
                <table class="data-table">
                    <thead>
                        <tr>
                            <th>Status</th>
                            ${headers.map(h => `<th>${this.formatHeader(h)}</th>`).join('')}
                        </tr>
                    </thead>
                    <tbody>
        `;
        
        for (let i = 0; i < maxRows; i++) {
            const rowA = dataA[i] || {};
            const rowB = dataB[i] || {};
            
            // Check for differences
            const differences = headers.filter(h => 
                JSON.stringify(rowA[h]) !== JSON.stringify(rowB[h])
            );
            
            const hasDifferences = differences.length > 0;
            const rowClass = hasDifferences ? 'highlight-modified' : '';
            
            if (this.showDifferences.checked && !hasDifferences) continue;
            
            // Row A (if different or showing all)
            if (hasDifferences || !this.showDifferences.checked) {
                html += `<tr class="${rowClass}">`;
                html += `<td class="diff-indicator"><i class="fas fa-minus-circle"></i> Version A</td>`;
                headers.forEach(header => {
                    const value = rowA[header];
                    const isDiff = differences.includes(header);
                    const cellClass = isDiff ? 'highlight-removed' : '';
                    html += `<td${cellClass ? ` class="${cellClass}"` : ''}>${this.formatValue(value, header)}</td>`;
                });
                html += '</tr>';
            }
            
            // Row B (if different or showing all)
            if (hasDifferences || !this.showDifferences.checked) {
                html += `<tr class="${rowClass}">`;
                html += `<td class="diff-indicator"><i class="fas fa-plus-circle"></i> Version B</td>`;
                headers.forEach(header => {
                    const value = rowB[header];
                    const isDiff = differences.includes(header);
                    const cellClass = isDiff ? 'highlight-added' : '';
                    html += `<td${cellClass ? ` class="${cellClass}"` : ''}>${this.formatValue(value, header)}</td>`;
                });
                html += '</tr>';
            }
        }
        
        html += `
                    </tbody>
                </table>
            </div>
        `;
        
        return html;
    }

    generateSummaryComparisonView(versionA, versionB) {
        const dataA = versionA.originalData || [];
        const dataB = versionB.originalData || [];
        
        const stats = {
            totalRecords: { a: dataA.length, b: dataB.length },
            uniqueCountries: {
                a: new Set(dataA.map(d => d.Country)).size,
                b: new Set(dataB.map(d => d.Country)).size
            },
            totalCost: {
                a: dataA.reduce((sum, d) => sum + (d['Total Cost'] || 0), 0),
                b: dataB.reduce((sum, d) => sum + (d['Total Cost'] || 0), 0)
            },
            avgSLA: {
                a: dataA.length ? dataA.reduce((sum, d) => sum + (d['SLA %'] || 0), 0) / dataA.length : 0,
                b: dataB.length ? dataB.reduce((sum, d) => sum + (d['SLA %'] || 0), 0) / dataB.length : 0
            }
        };
        
        let html = `
            <div class="summary-view">
                <div class="summary-stats">
                    <div class="stat-item">
                        <div class="value">${stats.totalRecords.a} vs ${stats.totalRecords.b}</div>
                        <div class="label">Total Records</div>
                        <div class="diff">${stats.totalRecords.b - stats.totalRecords.a > 0 ? '+' : ''}${stats.totalRecords.b - stats.totalRecords.a}</div>
                    </div>
                    <div class="stat-item">
                        <div class="value">${stats.uniqueCountries.a} vs ${stats.uniqueCountries.b}</div>
                        <div class="label">Unique Countries</div>
                        <div class="diff">${stats.uniqueCountries.b - stats.uniqueCountries.a > 0 ? '+' : ''}${stats.uniqueCountries.b - stats.uniqueCountries.a}</div>
                    </div>
                    <div class="stat-item">
                        <div class="value">${this.formatCurrency(stats.totalCost.a)} vs ${this.formatCurrency(stats.totalCost.b)}</div>
                        <div class="label">Total Cost</div>
                        <div class="diff">${stats.totalCost.b - stats.totalCost.a > 0 ? '+' : ''}${this.formatCurrency(stats.totalCost.b - stats.totalCost.a)}</div>
                    </div>
                    <div class="stat-item">
                        <div class="value">${stats.avgSLA.a.toFixed(1)}% vs ${stats.avgSLA.b.toFixed(1)}%</div>
                        <div class="label">Average SLA</div>
                        <div class="diff">${stats.avgSLA.b - stats.avgSLA.a > 0 ? '+' : ''}${(stats.avgSLA.b - stats.avgSLA.a).toFixed(1)}%</div>
                    </div>
                </div>
                
                <div class="changes-list">
                    <h4>Key Changes Detected</h4>
        `;
        
        // Find key changes
        const changes = [];
        const maxRows = Math.max(dataA.length, dataB.length);
        
        for (let i = 0; i < maxRows; i++) {
            const rowA = dataA[i] || {};
            const rowB = dataB[i] || {};
            
            if (JSON.stringify(rowA) !== JSON.stringify(rowB)) {
                const techA = rowA['Technician name'] || 'N/A';
                const techB = rowB['Technician name'] || 'N/A';
                
                if (!techA && techB) {
                    changes.push({
                        type: 'added',
                        message: `Added technician: ${techB} (${rowB.Country})`
                    });
                } else if (techA && !techB) {
                    changes.push({
                        type: 'removed',
                        message: `Removed technician: ${techA} (${rowA.Country})`
                    });
                } else if (techA !== techB) {
                    changes.push({
                        type: 'modified',
                        message: `Technician changed: ${techA} → ${techB}`
                    });
                }
                
                // Check for cost changes
                const costA = rowA['Total Cost'] || 0;
                const costB = rowB['Total Cost'] || 0;
                if (Math.abs(costB - costA) > 1) {
                    changes.push({
                        type: 'modified',
                        message: `Cost changed: ${this.formatCurrency(costA)} → ${this.formatCurrency(costB)}`
                    });
                }
            }
        }
        
        if (changes.length > 0) {
            changes.forEach(change => {
                html += `
                    <div class="change-item">
                        <div class="change-icon ${change.type}">
                            <i class="fas fa-${change.type === 'added' ? 'plus' : change.type === 'removed' ? 'minus' : 'edit'}"></i>
                        </div>
                        <div class="change-text">${change.message}</div>
                    </div>
                `;
            });
        } else {
            html += '<div class="no-changes">No significant changes detected between versions.</div>';
        }
        
        html += `
                </div>
            </div>
        `;
        
        return html;
    }

    updateComparisonStats(versionA, versionB) {
        const statsContainer = document.getElementById('comparison-stats');
        if (!statsContainer) return;
        
        const dataA = versionA.originalData || [];
        const dataB = versionB.originalData || [];
        
        const recordDiff = dataB.length - dataA.length;
        const totalCostA = dataA.reduce((sum, d) => sum + (d['Total Cost'] || 0), 0);
        const totalCostB = dataB.reduce((sum, d) => sum + (d['Total Cost'] || 0), 0);
        const costDiff = totalCostB - totalCostA;
        
        statsContainer.innerHTML = `
            <div class="stat-badge">
                <i class="fas fa-database"></i>
                ${dataA.length} vs ${dataB.length} records
                ${recordDiff !== 0 ? `(${recordDiff > 0 ? '+' : ''}${recordDiff})` : ''}
            </div>
            <div class="stat-badge">
                <i class="fas fa-euro-sign"></i>
                ${this.formatCurrency(totalCostA)} vs ${this.formatCurrency(totalCostB)}
                ${costDiff !== 0 ? `(${costDiff > 0 ? '+' : ''}${this.formatCurrency(costDiff)})` : ''}
            </div>
        `;
    }

    // Utility methods
    formatHeader(header) {
        if (!header) return '';
        return header
            .replace(/([A-Z])/g, ' $1')
            .replace(/^./, str => str.toUpperCase())
            .replace(/_/g, ' ')
            .replace(/\bMm\b/, 'MM')
            .replace(/\bYyyy\b/, 'YYYY');
    }

    formatValue(value, field) {
        if (value === null || value === undefined || value === '' || value === 'NA') {
            return '<span class="empty-value">-</span>';
        }
        
        if (typeof value === 'number') {
            if (field && (field.toLowerCase().includes('rate') || 
                field.toLowerCase().includes('cost') ||
                field.toLowerCase().includes('amount') ||
                field.toLowerCase().includes('price'))) {
                return this.formatCurrency(value, 'EUR');
            }
            return value.toLocaleString();
        }
        
        return String(value);
    }

    formatCurrency(amount, currency = 'EUR') {
        if (typeof amount !== 'number') return amount;
        
        const symbols = {
            'EUR': '€',
            'USD': '$',
            'GBP': '£',
            'ZAR': 'R',
            'AED': 'د.إ'
        };
        
        const symbol = symbols[currency] || currency;
        return `${symbol}${amount.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
    }

    getStatusIcon(status) {
        switch (status) {
            case 'processed': return '✅';
            case 'processing': return '⏳';
            case 'failed': return '❌';
            default: return '❓';
        }
    }

    capitalizeFirst(str) {
        if (!str) return '';
        return str.charAt(0).toUpperCase() + str.slice(1);
    }

    filterVersions() {
        const searchTerm = this.searchInput.value.toLowerCase();
        const typeFilter = this.typeFilter.value;
        const customerFilter = this.customerFilter.value;
        const statusFilter = this.statusFilter.value;
        
        this.filteredVersions = this.versions.filter(version => {
            // Search term
            if (searchTerm) {
                const searchFields = [
                    version.id,
                    version.customer,
                    version.account,
                    version.fileName,
                    version.ticket
                ].join(' ').toLowerCase();
                if (!searchFields.includes(searchTerm)) {
                    return false;
                }
            }
            
            // Type filter
            if (typeFilter && version.dataType !== typeFilter) {
                return false;
            }
            
            // Customer filter
            if (customerFilter && version.customer !== customerFilter) {
                return false;
            }
            
            // Status filter
            if (statusFilter && version.status !== statusFilter) {
                return false;
            }
            
            return true;
        });
        
        this.totalVersions = this.filteredVersions.length;
        this.currentPage = 1;
        this.selectedVersions.clear();
        this.renderVersionTable();
    }

    getTotalPages() {
        return Math.ceil(this.totalVersions / this.pageSize);
    }

    goToPage(page) {
        if (page < 1 || page > this.getTotalPages()) return;
        
        this.currentPage = page;
        this.renderVersionTable();
    }

    goToLastPage() {
        this.goToPage(this.getTotalPages());
    }

    changePageSize() {
        this.pageSize = parseInt(this.pageSizeSelect.value);
        this.currentPage = 1;
        this.renderVersionTable();
    }

    toggleSelectAll(checked) {
        const start = (this.currentPage - 1) * this.pageSize;
        const end = start + this.pageSize;
        const visibleVersions = this.filteredVersions.slice(start, end);
        
        visibleVersions.forEach(version => {
            if (checked) {
                this.selectedVersions.add(version.id);
            } else {
                this.selectedVersions.delete(version.id);
            }
        });
        
        document.querySelectorAll('.version-select').forEach(checkbox => {
            checkbox.checked = checked;
        });
        
        this.updateBulkActions();
    }

    updateSelectAllCheckbox() {
        const start = (this.currentPage - 1) * this.pageSize;
        const end = start + this.pageSize;
        const visibleVersions = this.filteredVersions.slice(start, end);
        const visibleIds = new Set(visibleVersions.map(v => v.id));
        
        let allChecked = true;
        let someChecked = false;
        
        for (const id of visibleIds) {
            if (this.selectedVersions.has(id)) {
                someChecked = true;
            } else {
                allChecked = false;
            }
        }
        
        this.selectAllCheckbox.checked = allChecked;
        this.selectAllCheckbox.indeterminate = someChecked && !allChecked;
    }

    updateBulkActions() {
        const count = this.selectedVersions.size;
        this.selectedCount.textContent = count;
        
        if (count > 0) {
            this.bulkActions.classList.add('show');
            this.bulkCompareBtn.disabled = count !== 2;
            this.bulkDeleteBtn.disabled = false;
        } else {
            this.bulkActions.classList.remove('show');
        }
    }

    clearSelection() {
        this.selectedVersions.clear();
        document.querySelectorAll('.version-select').forEach(checkbox => {
            checkbox.checked = false;
        });
        this.selectAllCheckbox.checked = false;
        this.selectAllCheckbox.indeterminate = false;
        this.updateBulkActions();
    }

    swapVersions() {
        const temp = this.compareVersionA.value;
        this.compareVersionA.value = this.compareVersionB.value;
        this.compareVersionB.value = temp;
        this.updateVersionInfo('A');
        this.updateVersionInfo('B');
        this.updateCompareButtonState();
    }

    // Modal close functions
    closeDetailsModalFunc() {
        this.detailsModal.classList.add('hidden');
        document.body.style.overflow = '';
        this.currentViewVersion = null;
    }
    
    closeCompareModalFunc() {
        this.compareModal.classList.add('hidden');
        document.body.style.overflow = '';
        this.currentComparison = { versionA: null, versionB: null };
    }
    
    closeUploadModalFunc() {
        this.uploadModal.classList.add('hidden');
        document.body.style.overflow = '';
    }
    
    closeDeleteModalFunc() {
        this.deleteModal.classList.add('hidden');
        document.body.style.overflow = '';
    }

    // Data view controls
    updateDataView() {
        if (this.currentViewVersion) {
            this.loadDataTab(this.currentViewVersion);
        }
    }

    downloadOriginalCSV() {
        if (!this.currentViewVersion) return;
        alert('Downloading original CSV...');
    }

    downloadCalculatedCSV() {
        if (!this.currentViewVersion) return;
        alert('Downloading calculated CSV...');
    }

    toggleFullScreen() {
        const container = document.getElementById('detail-data-container');
        if (!container) return;
        
        if (!document.fullscreenElement) {
            container.requestFullscreen().catch(err => {
                console.log('Error attempting to enable fullscreen:', err);
            });
        } else {
            document.exitFullscreen();
        }
    }

    toggleFilterChanges() {
        alert('Filter changes feature would be implemented here');
    }

    // Stub methods for unimplemented features
    openUploadModal() {
        alert('Upload modal would open here');
    }

    refreshVersions() {
        alert('Refreshing versions...');
        this.renderVersionTable();
    }

    exportVersionList() {
        alert('Exporting version list...');
    }

    openDeleteModal(versionId) {
        const version = this.versions.find(v => v.id === versionId);
        if (!version) return;
        
        this.deleteVersionId.textContent = version.id;
        this.deleteFilename.textContent = version.fileName;
        this.deleteCustomer.textContent = version.customer;
        this.deleteRecordCount.textContent = version.records;
        this.deleteUploadDate.textContent = version.uploadDate;
        
        this.deleteModal.classList.remove('hidden');
        document.body.style.overflow = 'hidden';
    }

    deleteVersion() {
        const versionId = this.deleteVersionId.textContent;
        this.versions = this.versions.filter(v => v.id !== versionId);
        this.filteredVersions = this.filteredVersions.filter(v => v.id !== versionId);
        this.selectedVersions.delete(versionId);
        this.closeDeleteModalFunc();
        this.renderVersionTable();
        alert(`Version ${versionId} deleted successfully.`);
    }

    updatePaginationInfo() {
        const start = (this.currentPage - 1) * this.pageSize + 1;
        const end = Math.min(this.currentPage * this.pageSize, this.totalVersions);
        
        this.paginationStart.textContent = start;
        this.paginationEnd.textContent = end;
        this.paginationTotal.textContent = this.totalVersions;
        
        // Update pagination buttons
        this.paginationFirst.disabled = this.currentPage === 1;
        this.paginationPrev.disabled = this.currentPage === 1;
        this.paginationNext.disabled = this.currentPage === this.getTotalPages();
        this.paginationLast.disabled = this.currentPage === this.getTotalPages();
        
        // Update page buttons
        this.paginationPages.innerHTML = '';
        const totalPages = this.getTotalPages();
        const maxPagesToShow = 5;
        let startPage = Math.max(1, this.currentPage - Math.floor(maxPagesToShow / 2));
        let endPage = Math.min(totalPages, startPage + maxPagesToShow - 1);
        
        if (endPage - startPage + 1 < maxPagesToShow) {
            startPage = Math.max(1, endPage - maxPagesToShow + 1);
        }
        
        for (let i = startPage; i <= endPage; i++) {
            const pageBtn = document.createElement('button');
            pageBtn.className = `page-btn ${i === this.currentPage ? 'active' : ''}`;
            pageBtn.textContent = i;
            pageBtn.addEventListener('click', () => this.goToPage(i));
            this.paginationPages.appendChild(pageBtn);
        }
    }

    handleKeyboardShortcuts(e) {
        if (e.key === 'Escape') {
            if (!this.detailsModal.classList.contains('hidden')) {
                this.closeDetailsModalFunc();
            } else if (!this.compareModal.classList.contains('hidden')) {
                this.closeCompareModalFunc();
            } else if (!this.uploadModal.classList.contains('hidden')) {
                this.closeUploadModalFunc();
            } else if (!this.deleteModal.classList.contains('hidden')) {
                this.closeDeleteModalFunc();
            }
        }
    }
}

// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    window.bandDataVersionManager = new BandDataVersionManager();
});