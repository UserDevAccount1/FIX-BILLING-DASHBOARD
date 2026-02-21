/**
 * Band Details Data - Sample Data for Band Details Modal
 * Contains sample versioning data, dedicated data, and project data
 */

const BandDetailsData = {
    // Current settings
    currentVersion: 'v1.0.0',
    
    // Sample versions data (5 versions with details)
    versions: [
        {
            id: 'VER001',
            name: 'v1.0.1 Band Rate Card Jan 2025',
            type: 'dedicated',
            customer: 'HCL',
            account: 'HCL_ABBVIE',
            ticket: 'TICKET-2025-001',
            fileName: 'band_rate_card_jan_2025.csv',
            uploadDate: '2025-01-15 10:30:00',
            loadedDate: '2025-01-15 11:00:00',
            records: 15,
            description: 'Initial band rate card for January 2025 with EUR rates',
            calculations: {
                before: {
                    totalMonthlyCost: 25420,
                    averageUtilization: 88,
                    totalRecords: 12
                },
                after: {
                    totalMonthlyCost: 25420,
                    averageUtilization: 92,
                    totalRecords: 15,
                    adjustments: [
                        'Fixed daily rate calculations',
                        'Updated holiday days',
                        'Applied currency conversions'
                    ]
                }
            },
            dedicatedData: [
                {
                    technicianName: 'Mark Magyar',
                    country: 'Hungary',
                    band: '2',
                    variant: 'Without Backfill',
                    monthlyRate: 3591.49,
                    workingDays: 22,
                    workedDays: 21,
                    holidayDays: 1,
                    currency: 'EUR',
                    slaPercentage: 100,
                    slaMet: 'Yes',
                    serviceMonth: '2025-01'
                },
                // Add 9 more sample records...
            ]
        },
        {
            id: 'VER002',
            name: 'v1.0.2 Project Update Feb 2025',
            type: 'project',
            customer: 'HCL',
            account: 'HCL_ABBVIE_DSS',
            ticket: 'TICKET-2025-002',
            fileName: 'project_update_feb_2025.csv',
            uploadDate: '2025-02-10 14:45:00',
            loadedDate: '2025-02-10 15:30:00',
            records: 8,
            description: 'Project data update with OT calculations',
            projectData: [
                {
                    projectName: 'HCL EUC Support',
                    technicianName: 'John Smith',
                    startDate: '2025-02-01',
                    endDate: '2025-04-30',
                    country: 'UK',
                    band: '3',
                    monthlyRate: 5572.40,
                    workingDays: 22,
                    workedDays: 21,
                    otHours: 10,
                    otRate: 45,
                    currency: 'EUR',
                    serviceMonth: '2025-02'
                },
                // Add 7 more sample records...
            ]
        },
        // Add 3 more versions...
    ],
    
    // Current dedicated data
    currentDedicatedData: [
        {
            id: 'DED001',
            technicianName: 'Mark Magyar',
            country: 'Hungary',
            band: '2',
            variant: 'Without Backfill',
            monthlyRate: 3591.49,
            workingDays: 22,
            workedDays: 21,
            dailyRate: 163.25,
            actualCost: 3428.25,
            currency: 'EUR',
            convertedCurrency: 'USD',
            conversionRate: 1.08,
            convertedMonthlyRate: 3878.81,
            convertedDailyRate: 176.31,
            convertedActualCost: 3702.51,
            holidayDays: 1,
            adjustedWorkingDays: 21,
            adjustedDailyRate: 171.02,
            slaPercentage: 100,
            slaMet: 'Yes',
            serviceMonth: '2025-01',
            remarks: 'Full attendance'
        },
        // Add more sample data...
    ],
    
    // Current project data
    currentProjectData: [
        {
            id: 'PROJ001',
            projectName: 'HCL EUC Support',
            technicianName: 'John Smith',
            startDate: '2025-02-01',
            endDate: '2025-04-30',
            projectDuration: 89,
            projectType: 'Long Term',
            country: 'UK',
            band: '3',
            monthlyRate: 5572.40,
            workingDays: 22,
            workedDays: 21,
            dailyRate: 253.29,
            actualMonthlyCost: 5319.09,
            currency: 'EUR',
            convertedCurrency: 'USD',
            conversionRate: 1.08,
            convertedMonthlyRate: 6018.19,
            convertedDailyRate: 273.55,
            otHours: 10,
            otRate: 45,
            otCost: 450,
            weekendOtHours: 0,
            weekendOtRate: 67.5,
            weekendOtCost: 0,
            travelCost: 0,
            taxPercentage: 8,
            taxCost: 461.53,
            totalCost: 6230.62,
            slaPercentage: 95,
            slaMet: 'Yes',
            serviceMonth: '2025-02',
            remarks: 'On schedule'
        },
        // Add more sample data...
    ],
    
    // Holiday data
    holidays: [
        {
            id: 'HOL001',
            date: '2025-01-01',
            name: 'New Year\'s Day',
            country: 'All',
            type: 'Public Holiday',
            technicianIds: []
        },
        // Add more holidays...
    ],
    
    // Currency exchange rates
    exchangeRates: {
        EUR: {
            USD: 1.08,
            GBP: 0.85,
            AED: 4.02,
            AUD: 1.64,
            ZAR: 20.15,
            SGD: 1.46,
            JPY: 161.23,
            CNY: 7.83,
            INR: 90.45
        }
    },
    
    // Calculation rules
    calculationRules: {
        penaltyPercentage: 10,
        slaBonus: 2,
        otMultiplier: 1.5,
        weekendOtMultiplier: 2.0,
        defaultWorkingDays: 22
    },
    
    // Methods to get data
    getVersions: function(type = 'all') {
        if (type === 'all') return this.versions;
        return this.versions.filter(v => v.type === type);
    },
    
    getDedicatedData: function() {
        return this.currentDedicatedData;
    },
    
    getProjectData: function() {
        return this.currentProjectData;
    },
    
    addVersion: function(versionData) {
        this.versions.unshift(versionData);
        return versionData;
    },
    
    updateDedicatedData: function(newData) {
        this.currentDedicatedData = newData;
        return this.currentDedicatedData;
    },
    
    updateProjectData: function(newData) {
        this.currentProjectData = newData;
        return this.currentProjectData;
    },
    
    // Calculation methods
    calculateDailyRate: function(monthlyRate, workingDays) {
        return monthlyRate / workingDays;
    },
    
    calculateActualCost: function(dailyRate, workedDays) {
        return dailyRate * workedDays;
    },
    
    calculateWithHolidays: function(monthlyRate, workingDays, holidayDays, workedDays) {
        const adjustedWorkingDays = workingDays - holidayDays;
        const adjustedDailyRate = monthlyRate / adjustedWorkingDays;
        const actualCost = adjustedDailyRate * workedDays;
        
        return {
            adjustedWorkingDays,
            adjustedDailyRate,
            actualCost
        };
    },
    
    convertCurrency: function(amount, fromCurrency, toCurrency) {
        if (fromCurrency === toCurrency) return amount;
        if (!this.exchangeRates[fromCurrency] || !this.exchangeRates[fromCurrency][toCurrency]) {
            return amount;
        }
        return amount * this.exchangeRates[fromCurrency][toCurrency];
    },
    
    calculateProjectCost: function(projectData) {
        const dailyRate = this.calculateDailyRate(projectData.monthlyRate, projectData.workingDays);
        const actualMonthlyCost = this.calculateActualCost(dailyRate, projectData.workedDays);
        const otCost = projectData.otHours * projectData.otRate;
        const weekendOtCost = projectData.weekendOtHours * projectData.weekendOtRate;
        const subtotal = actualMonthlyCost + otCost + weekendOtCost + (projectData.travelCost || 0);
        const taxCost = subtotal * (projectData.taxPercentage / 100);
        const totalCost = subtotal + taxCost;
        
        return {
            dailyRate,
            actualMonthlyCost,
            otCost,
            weekendOtCost,
            taxCost,
            totalCost
        };
    }
};

// Initialize sample data
function initializeSampleData() {
    // Add more sample versions
    for (let i = 3; i <= 5; i++) {
        BandDetailsData.versions.push({
            id: `VER00${i}`,
            name: `v1.0.${i} Update March 2025`,
            type: i % 2 === 0 ? 'project' : 'dedicated',
            customer: 'HCL',
            account: i % 2 === 0 ? 'HCL_ABBVIE_DSS' : 'HCL_ABBVIE',
            ticket: `TICKET-2025-00${i}`,
            fileName: `update_march_2025_v${i}.csv`,
            uploadDate: `2025-03-${10 + i} 09:${15 + i}:00`,
            loadedDate: `2025-03-${10 + i} 10:${30 + i}:00`,
            records: 10 + i,
            description: `Data update for March 2025 - version ${i}`
        });
    }
    
    // Add more dedicated data
    for (let i = 2; i <= 10; i++) {
        BandDetailsData.currentDedicatedData.push({
            id: `DED00${i}`,
            technicianName: `Technician ${i}`,
            country: i % 2 === 0 ? 'Hungary' : 'UK',
            band: (i % 3) + 1,
            variant: i % 2 === 0 ? 'With Backfill' : 'Without Backfill',
            monthlyRate: 3000 + (i * 500),
            workingDays: 22,
            workedDays: 20 + (i % 3),
            dailyRate: 0,
            actualCost: 0,
            currency: i % 2 === 0 ? 'EUR' : 'USD',
            convertedCurrency: 'USD',
            conversionRate: 1.08,
            convertedMonthlyRate: 0,
            convertedDailyRate: 0,
            convertedActualCost: 0,
            holidayDays: i % 4,
            adjustedWorkingDays: 0,
            adjustedDailyRate: 0,
            slaPercentage: 90 + (i % 10),
            slaMet: (90 + (i % 10)) >= 95 ? 'Yes' : 'No',
            serviceMonth: '2025-01',
            remarks: `Sample technician ${i}`
        });
    }
    
    // Add more project data
    for (let i = 2; i <= 8; i++) {
        BandDetailsData.currentProjectData.push({
            id: `PROJ00${i}`,
            projectName: `Project ${i}`,
            technicianName: `Tech ${i}`,
            startDate: `2025-0${(i % 3) + 1}-01`,
            endDate: `2025-0${(i % 3) + 3}-30`,
            projectDuration: 60 + (i * 10),
            projectType: (60 + (i * 10)) > 90 ? 'Long Term' : 'Short Term',
            country: i % 2 === 0 ? 'UK' : 'Hungary',
            band: (i % 3) + 1,
            monthlyRate: 4000 + (i * 600),
            workingDays: 22,
            workedDays: 20 + (i % 3),
            dailyRate: 0,
            actualMonthlyCost: 0,
            currency: i % 2 === 0 ? 'EUR' : 'USD',
            convertedCurrency: 'USD',
            conversionRate: 1.08,
            convertedMonthlyRate: 0,
            convertedDailyRate: 0,
            otHours: i * 2,
            otRate: 40 + (i * 2),
            otCost: 0,
            weekendOtHours: i % 3,
            weekendOtRate: 60 + (i * 3),
            weekendOtCost: 0,
            travelCost: i % 4 === 0 ? 500 : 0,
            taxPercentage: i % 2 === 0 ? 8 : 10,
            taxCost: 0,
            totalCost: 0,
            slaPercentage: 85 + (i * 2),
            slaMet: (85 + (i * 2)) >= 90 ? 'Yes' : 'No',
            serviceMonth: `2025-0${(i % 3) + 1}`,
            remarks: `Sample project ${i}`
        });
    }
    
    // Calculate all rates
    BandDetailsData.currentDedicatedData.forEach(item => {
        item.dailyRate = BandDetailsData.calculateDailyRate(item.monthlyRate, item.workingDays);
        item.actualCost = BandDetailsData.calculateActualCost(item.dailyRate, item.workedDays);
        item.convertedMonthlyRate = BandDetailsData.convertCurrency(item.monthlyRate, item.currency, item.convertedCurrency);
        item.convertedDailyRate = BandDetailsData.calculateDailyRate(item.convertedMonthlyRate, item.workingDays);
        item.convertedActualCost = BandDetailsData.calculateActualCost(item.convertedDailyRate, item.workedDays);
        item.adjustedWorkingDays = item.workingDays - item.holidayDays;
        item.adjustedDailyRate = item.monthlyRate / item.adjustedWorkingDays;
    });
    
    BandDetailsData.currentProjectData.forEach(item => {
        const calculations = BandDetailsData.calculateProjectCost(item);
        item.dailyRate = calculations.dailyRate;
        item.actualMonthlyCost = calculations.actualMonthlyCost;
        item.otCost = calculations.otCost;
        item.weekendOtCost = calculations.weekendOtCost;
        item.taxCost = calculations.taxCost;
        item.totalCost = calculations.totalCost;
        item.convertedMonthlyRate = BandDetailsData.convertCurrency(item.monthlyRate, item.currency, item.convertedCurrency);
        item.convertedDailyRate = BandDetailsData.calculateDailyRate(item.convertedMonthlyRate, item.workingDays);
    });
}

// Initialize on load
document.addEventListener('DOMContentLoaded', initializeSampleData);

// Export the data object
if (typeof module !== 'undefined' && module.exports) {
    module.exports = BandDetailsData;
} else {
    window.BandDetailsData = BandDetailsData;
}