/**
 * Band Details - Calendar Tab Functionality
 * File: Band_Details_CalendarTab.js
 */

// Calendar Tab Variables
let calendarData = [];
let holidays = [];
let technicians = [];
let countries = [];
let currentDate = new Date();
let currentView = 'month';
let selectedDate = null;
let selectedDates = new Set();
let isDragging = false;
let dragStartDate = null;
let dragEndDate = null;
let contextMenuDate = null;

// Initialize Calendar Tab
function initializeCalendarTab() {
    console.log('Band Details: Initializing Calendar tab...');
    
    // Load sample data
    loadSampleCalendarData();
    
    // Setup event listeners
    setupCalendarEventListeners();
    
    // Render calendar
    renderCalendar();
    
    // Update filters
    updateFilters();
    
    console.log('Band Details: Calendar tab initialized successfully');
}

// Load Sample Calendar Data
function loadSampleCalendarData() {
    // Sample technicians from dedicated data
    technicians = [
        { id: 1, name: "John Doe", country: "Germany" },
        { id: 2, name: "Jane Smith", country: "South Africa" },
        { id: 3, name: "Robert Johnson", country: "UK" },
        { id: 4, name: "Alice Brown", country: "France" },
        { id: 5, name: "Charlie Wilson", country: "Spain" },
        { id: 6, name: "David Lee", country: "Italy" },
        { id: 7, name: "Emma Garcia", country: "Netherlands" },
        { id: 8, name: "Frank Miller", country: "Belgium" },
        { id: 9, name: "Grace Taylor", country: "Switzerland" },
        { id: 10, name: "Henry Clark", country: "UAE" }
    ];
    
    // Extract unique countries
    countries = [...new Set(technicians.map(t => t.country))];
    
    // Sample holidays
    holidays = [
        {
            id: 1,
            name: "Christmas Day",
            type: "holiday",
            startDate: "2025-12-25",
            endDate: "2025-12-25",
            technicians: [1, 3, 4, 6, 7, 8, 9],
            country: null,
            notes: "Public holiday in most European countries"
        },
        {
            id: 2,
            name: "Boxing Day",
            type: "holiday",
            startDate: "2025-12-26",
            endDate: "2025-12-26",
            technicians: [1, 3, 4, 6, 7, 8, 9],
            country: null,
            notes: "Follow-up holiday to Christmas"
        },
        {
            id: 3,
            name: "New Year's Day",
            type: "holiday",
            startDate: "2026-01-01",
            endDate: "2026-01-01",
            technicians: "all",
            country: null,
            notes: "First day of the new year"
        },
        {
            id: 4,
            name: "Team Building Day",
            type: "partial",
            startDate: "2025-12-15",
            endDate: "2025-12-15",
            technicians: [1, 2, 3, 4, 5],
            country: null,
            notes: "Half-day team building activities"
        },
        {
            id: 5,
            name: "System Maintenance",
            type: "working",
            startDate: "2025-12-28",
            endDate: "2025-12-28",
            technicians: [6, 7, 8],
            country: null,
            notes: "Weekend maintenance work"
        },
        {
            id: 6,
            name: "German Unity Day",
            type: "holiday",
            startDate: "2025-12-31",
            endDate: "2025-12-31",
            technicians: [1],
            country: "Germany",
            notes: "Regional holiday in Germany"
        },
        {
            id: 7,
            name: "UAE National Day",
            type: "holiday",
            startDate: "2025-12-02",
            endDate: "2025-12-03",
            technicians: [10],
            country: "UAE",
            notes: "2-day holiday in UAE"
        }
    ];
    
    console.log('Band Details: Loaded calendar data with', holidays.length, 'holidays and', technicians.length, 'technicians');
}

// Setup Calendar Event Listeners
function setupCalendarEventListeners() {
    console.log('Band Details: Setting up calendar event listeners...');
    
    // Navigation buttons
    const prevBtn = document.getElementById('calendar-prev-month-btn');
    const nextBtn = document.getElementById('calendar-next-month-btn');
    const datePicker = document.getElementById('calendar-date-picker');
    
    if (prevBtn) {
        prevBtn.addEventListener('click', () => {
            navigateCalendar(-1);
        });
    }
    
    if (nextBtn) {
        nextBtn.addEventListener('click', () => {
            navigateCalendar(1);
        });
    }
    
    if (datePicker) {
        datePicker.addEventListener('change', function() {
            const [year, month] = this.value.split('-').map(Number);
            currentDate = new Date(year, month - 1, 1);
            renderCalendar();
        });
    }
    
    // View switcher
    const viewSwitcher = document.getElementById('calendar-view-switcher');
    if (viewSwitcher) {
        const viewButtons = viewSwitcher.querySelectorAll('button');
        viewButtons.forEach(btn => {
            btn.addEventListener('click', function() {
                const view = this.getAttribute('data-view');
                switchCalendarView(view);
            });
        });
    }
    
    // Filters
    const techFilter = document.getElementById('calendar-technician-filter');
    const countryFilter = document.getElementById('calendar-country-filter');
    
    if (techFilter) {
        techFilter.addEventListener('change', filterCalendar);
    }
    
    if (countryFilter) {
        countryFilter.addEventListener('change', filterCalendar);
    }
    
    // Action buttons
    const addHolidayBtn = document.getElementById('calendar-add-holiday-btn');
    const syncBtn = document.getElementById('calendar-sync-btn');
    const clearSelectionBtn = document.getElementById('clear-selection-btn');
    
    if (addHolidayBtn) {
        addHolidayBtn.addEventListener('click', showAddHolidayModal);
    }
    
    if (syncBtn) {
        syncBtn.addEventListener('click', syncHolidays);
    }
    
    if (clearSelectionBtn) {
        clearSelectionBtn.addEventListener('click', clearSelection);
    }
    
    // Setup modal listeners
    setupHolidayModalListeners();
    
    // Setup context menu listeners
    setupContextMenuListeners();
    
    // Setup drag and drop
    setupDragAndDrop();
    
    console.log('Band Details: Calendar event listeners setup complete');
}

// Navigate Calendar
function navigateCalendar(direction) {
    if (currentView === 'month') {
        currentDate.setMonth(currentDate.getMonth() + direction);
    } else if (currentView === 'week') {
        currentDate.setDate(currentDate.getDate() + (direction * 7));
    }
    
    renderCalendar();
    updateDatePicker();
}

// Switch Calendar View
function switchCalendarView(view) {
    currentView = view;
    
    // Update active button
    const viewSwitcher = document.getElementById('calendar-view-switcher');
    const buttons = viewSwitcher.querySelectorAll('button');
    buttons.forEach(btn => {
        if (btn.getAttribute('data-view') === view) {
            btn.classList.add('active');
        } else {
            btn.classList.remove('active');
        }
    });
    
    // Show/hide views
    const views = document.querySelectorAll('.calendar-view');
    views.forEach(viewEl => {
        if (viewEl.getAttribute('data-view') === currentView) {
            viewEl.style.display = 'block';
        } else {
            viewEl.style.display = 'none';
        }
    });
    
    // Update current month display
    updateCurrentMonthDisplay();
    
    // Re-render
    renderCalendar();
}

// Update Current Month Display
function updateCurrentMonthDisplay() {
    const monthElement = document.getElementById('calendar-current-month');
    if (!monthElement) return;
    
    if (currentView === 'month') {
        monthElement.textContent = currentDate.toLocaleDateString('en-US', {
            month: 'long',
            year: 'numeric'
        });
    } else if (currentView === 'week') {
        const weekStart = new Date(currentDate);
        const weekEnd = new Date(currentDate);
        weekEnd.setDate(weekEnd.getDate() + 6);
        
        monthElement.textContent = `${weekStart.toLocaleDateString('en-US', { month: 'short', day: 'numeric' })} - ${weekEnd.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}`;
    } else {
        monthElement.textContent = 'All Events';
    }
}

// Update Date Picker
function updateDatePicker() {
    const datePicker = document.getElementById('calendar-date-picker');
    if (datePicker) {
        const year = currentDate.getFullYear();
        const month = String(currentDate.getMonth() + 1).padStart(2, '0');
        datePicker.value = `${year}-${month}`;
    }
}

// Render Calendar
function renderCalendar() {
    if (currentView === 'month') {
        renderMonthView();
    } else if (currentView === 'week') {
        renderWeekView();
    } else if (currentView === 'list') {
        renderListView();
    }
    
    updateCurrentMonthDisplay();
    updateHolidayDetails();
}

// Render Month View
function renderMonthView() {
    const container = document.getElementById('calendar-grid-container');
    if (!container) return;
    
    container.innerHTML = '';
    
    const year = currentDate.getFullYear();
    const month = currentDate.getMonth();
    
    // Get first day of month and total days
    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);
    const totalDays = lastDay.getDate();
    
    // Get day of week for first day (0 = Sunday, 1 = Monday, etc.)
    let firstDayIndex = firstDay.getDay();
    firstDayIndex = firstDayIndex === 0 ? 6 : firstDayIndex - 1; // Adjust to Monday start
    
    // Add empty cells for days before first day
    for (let i = 0; i < firstDayIndex; i++) {
        const prevMonthDate = new Date(year, month, -i);
        const cell = createDayCell(prevMonthDate, true);
        container.appendChild(cell);
    }
    
    // Add cells for each day of the month
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    
    for (let day = 1; day <= totalDays; day++) {
        const date = new Date(year, month, day);
        const isToday = date.getTime() === today.getTime();
        const cell = createDayCell(date, false, isToday);
        container.appendChild(cell);
    }
    
    // Add empty cells for remaining spaces
    const totalCells = 42; // 6 weeks * 7 days
    const currentCellCount = firstDayIndex + totalDays;
    const remainingCells = totalCells - currentCellCount;
    
    for (let i = 1; i <= remainingCells; i++) {
        const nextMonthDate = new Date(year, month + 1, i);
        const cell = createDayCell(nextMonthDate, true);
        container.appendChild(cell);
    }
}

// Create Day Cell
function createDayCell(date, isOtherMonth, isToday = false) {
    const cell = document.createElement('div');
    cell.className = 'calendar-day-cell';
    cell.setAttribute('data-date', date.toISOString().split('T')[0]);
    
    // Set base classes
    const dayOfWeek = date.getDay();
    if (dayOfWeek === 0 || dayOfWeek === 6) {
        cell.classList.add('weekend');
    } else {
        cell.classList.add('working-day');
    }
    
    if (isOtherMonth) {
        cell.classList.add('other-month');
    }
    
    if (isToday) {
        cell.classList.add('today');
    }
    
    // Check if selected
    const dateStr = date.toISOString().split('T')[0];
    if (selectedDates.has(dateStr)) {
        cell.classList.add('selected');
    }
    
    // Check for holidays
    const dayHolidays = getHolidaysForDate(date);
    if (dayHolidays.length > 0) {
        const holidayTypes = dayHolidays.map(h => h.type);
        if (holidayTypes.includes('holiday')) {
            cell.classList.remove('working-day');
            cell.classList.add('holiday');
        } else if (holidayTypes.includes('partial')) {
            cell.classList.add('partial-work');
        } else if (holidayTypes.includes('working')) {
            cell.classList.add('working-day');
        }
    }
    
    // Day number
    const dayNumber = document.createElement('div');
    dayNumber.className = 'day-number';
    dayNumber.textContent = date.getDate();
    cell.appendChild(dayNumber);
    
    // Day type indicator
    const indicator = document.createElement('div');
    indicator.className = 'day-type-indicator';
    if (cell.classList.contains('holiday')) {
        indicator.classList.add('holiday');
    } else if (cell.classList.contains('partial-work')) {
        indicator.classList.add('partial-work');
    } else if (cell.classList.contains('weekend')) {
        indicator.classList.add('weekend');
    } else {
        indicator.classList.add('working-day');
    }
    cell.appendChild(indicator);
    
    // Day details
    const details = document.createElement('div');
    details.className = 'day-details';
    
    dayHolidays.forEach(holiday => {
        const technicianCount = holiday.technicians === 'all' ? technicians.length : holiday.technicians.length;
        const tech = document.createElement('div');
        tech.className = `day-technician ${holiday.type}`;
        tech.innerHTML = `<i class="fas fa-${holiday.type === 'holiday' ? 'umbrella-beach' : holiday.type === 'working' ? 'briefcase' : 'clock'}"></i> ${holiday.name} (${technicianCount})`;
        details.appendChild(tech);
    });
    
    cell.appendChild(details);
    
    // Event listeners
    cell.addEventListener('click', (e) => {
        if (e.shiftKey && selectedDate) {
            // Range selection
            selectDateRange(selectedDate, date);
        } else {
            // Single selection
            selectDate(date, e.ctrlKey || e.metaKey);
        }
        selectedDate = date;
    });
    
    cell.addEventListener('contextmenu', (e) => {
        e.preventDefault();
        showContextMenu(e, date);
    });
    
    cell.addEventListener('mouseenter', (e) => {
        if (isDragging && dragStartDate) {
            dragEndDate = date;
            updateDragSelection();
        }
    });
    
    // Tooltip
    cell.addEventListener('mouseenter', showDayTooltip);
    cell.addEventListener('mouseleave', hideDayTooltip);
    
    return cell;
}

// Render Week View
function renderWeekView() {
    const container = document.getElementById('calendar-week-grid');
    if (!container) return;
    
    container.innerHTML = '';
    
    const weekStart = new Date(currentDate);
    const dayOfWeek = weekStart.getDay();
    const diff = dayOfWeek === 0 ? -6 : 1 - dayOfWeek; // Adjust to Monday start
    weekStart.setDate(weekStart.getDate() + diff);
    
    for (let i = 0; i < 7; i++) {
        const date = new Date(weekStart);
        date.setDate(date.getDate() + i);
        
        const dayElement = document.createElement('div');
        dayElement.className = 'week-day';
        
        const header = document.createElement('div');
        header.className = 'week-day-header';
        header.innerHTML = `
            ${date.toLocaleDateString('en-US', { weekday: 'long' })}
            <br>
            <small>${date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}</small>
        `;
        
        const content = document.createElement('div');
        content.className = 'week-day-content';
        
        const holidays = getHolidaysForDate(date);
        if (holidays.length > 0) {
            holidays.forEach(holiday => {
                const holidayElement = document.createElement('div');
                holidayElement.className = `list-view-type ${holiday.type}`;
                holidayElement.textContent = holiday.name;
                content.appendChild(holidayElement);
            });
        } else {
            const noEvents = document.createElement('div');
            noEvents.className = 'calendar-empty-message';
            noEvents.textContent = 'No events';
            content.appendChild(noEvents);
        }
        
        dayElement.appendChild(header);
        dayElement.appendChild(content);
        container.appendChild(dayElement);
    }
}

// Render List View
function renderListView() {
    const container = document.getElementById('calendar-list-content');
    if (!container) return;
    
    container.innerHTML = '';
    
    // Get all unique dates with holidays from next 60 days
    const startDate = new Date();
    const endDate = new Date();
    endDate.setDate(endDate.getDate() + 60);
    
    const allEvents = [];
    
    for (const holiday of holidays) {
        const holidayStart = new Date(holiday.startDate);
        const holidayEnd = new Date(holiday.endDate);
        
        // Check if holiday overlaps with our date range
        if (holidayEnd >= startDate && holidayStart <= endDate) {
            // Add each day of the holiday
            const currentDate = new Date(holidayStart);
            while (currentDate <= holidayEnd) {
                if (currentDate >= startDate && currentDate <= endDate) {
                    allEvents.push({
                        date: new Date(currentDate),
                        holiday: holiday
                    });
                }
                currentDate.setDate(currentDate.getDate() + 1);
            }
        }
    }
    
    // Sort by date
    allEvents.sort((a, b) => a.date - b.date);
    
    // Group by date
    const eventsByDate = {};
    allEvents.forEach(event => {
        const dateStr = event.date.toISOString().split('T')[0];
        if (!eventsByDate[dateStr]) {
            eventsByDate[dateStr] = [];
        }
        eventsByDate[dateStr].push(event.holiday);
    });
    
    // Create list items
    Object.keys(eventsByDate).sort().forEach(dateStr => {
        const date = new Date(dateStr);
        const dateEvents = eventsByDate[dateStr];
        
        dateEvents.forEach(holiday => {
            const item = document.createElement('div');
            item.className = 'list-view-item';
            
            item.innerHTML = `
                <div class="list-view-date">
                    ${date.toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric' })}
                </div>
                <div class="list-view-type ${holiday.type}">
                    ${holiday.type.charAt(0).toUpperCase() + holiday.type.slice(1)}
                </div>
                <div class="list-view-details">
                    <strong>${holiday.name}</strong>
                    <div class="holiday-technicians">
                        ${getTechnicianNames(holiday.technicians).join(', ')}
                        ${holiday.country ? ` • ${holiday.country}` : ''}
                    </div>
                </div>
                <div class="holiday-actions">
                    <button class="btn btn-sm btn-secondary" onclick="editHoliday(${holiday.id})">
                        <i class="fas fa-edit"></i>
                    </button>
                </div>
            `;
            
            container.appendChild(item);
        });
    });
    
    if (Object.keys(eventsByDate).length === 0) {
        const empty = document.createElement('div');
        empty.className = 'calendar-empty-message';
        empty.textContent = 'No events in the next 60 days';
        container.appendChild(empty);
    }
}

// Get Holidays for Date
function getHolidaysForDate(date) {
    const dateStr = date.toISOString().split('T')[0];
    const selectedTechnician = document.getElementById('calendar-technician-filter')?.value;
    const selectedCountry = document.getElementById('calendar-country-filter')?.value;
    
    return holidays.filter(holiday => {
        // Check date range
        if (dateStr < holiday.startDate || dateStr > holiday.endDate) {
            return false;
        }
        
        // Filter by technician
        if (selectedTechnician && selectedTechnician !== '') {
            if (holiday.technicians === 'all') {
                // Check if this technician is included in 'all'
                const tech = technicians.find(t => t.id == selectedTechnician);
                if (!tech) return false;
                
                // If country filter is active, check country too
                if (selectedCountry && selectedCountry !== '') {
                    if (holiday.country && holiday.country !== selectedCountry) {
                        return false;
                    }
                    if (!holiday.country && tech.country !== selectedCountry) {
                        return false;
                    }
                }
            } else if (!holiday.technicians.includes(parseInt(selectedTechnician))) {
                return false;
            }
        }
        
        // Filter by country
        if (selectedCountry && selectedCountry !== '') {
            if (holiday.country && holiday.country !== selectedCountry) {
                return false;
            }
            if (!holiday.country && selectedTechnician) {
                // Check technician's country
                const tech = technicians.find(t => t.id == selectedTechnician);
                if (tech && tech.country !== selectedCountry) {
                    return false;
                }
            }
        }
        
        return true;
    });
}

// Get Technician Names
function getTechnicianNames(technicianIds) {
    if (technicianIds === 'all') {
        return ['All Technicians'];
    }
    
    return technicianIds.map(id => {
        const tech = technicians.find(t => t.id === id);
        return tech ? tech.name : `Technician ${id}`;
    });
}

// Update Filters
function updateFilters() {
    const techFilter = document.getElementById('calendar-technician-filter');
    const countryFilter = document.getElementById('calendar-country-filter');
    const holidayTechSelect = document.getElementById('holiday-technician-select');
    
    if (techFilter) {
        techFilter.innerHTML = '<option value="">All Technicians</option>' +
            technicians.map(tech => 
                `<option value="${tech.id}">${tech.name} (${tech.country})</option>`
            ).join('');
    }
    
    if (countryFilter) {
        countryFilter.innerHTML = '<option value="">All Countries</option>' +
            countries.map(country => 
                `<option value="${country}">${country}</option>`
            ).join('');
    }
    
    if (holidayTechSelect) {
        holidayTechSelect.innerHTML = '<option value="all">All Technicians</option>' +
            technicians.map(tech => 
                `<option value="${tech.id}">${tech.name} (${tech.country})</option>`
            ).join('');
    }
}

// Filter Calendar
function filterCalendar() {
    renderCalendar();
}

// Select Date
function selectDate(date, isMultiSelect = false) {
    const dateStr = date.toISOString().split('T')[0];
    
    if (!isMultiSelect) {
        selectedDates.clear();
    }
    
    if (selectedDates.has(dateStr)) {
        selectedDates.delete(dateStr);
    } else {
        selectedDates.add(dateStr);
    }
    
    renderCalendar();
}

// Select Date Range
function selectDateRange(startDate, endDate) {
    // Clear existing selection
    selectedDates.clear();
    
    // Ensure start is before end
    const start = startDate < endDate ? startDate : endDate;
    const end = startDate < endDate ? endDate : startDate;
    
    // Add all dates in range
    const current = new Date(start);
    while (current <= end) {
        selectedDates.add(current.toISOString().split('T')[0]);
        current.setDate(current.getDate() + 1);
    }
    
    renderCalendar();
}

// Clear Selection
function clearSelection() {
    selectedDates.clear();
    selectedDate = null;
    renderCalendar();
    updateHolidayDetails();
}

// Show Context Menu
function showContextMenu(event, date) {
    event.preventDefault();
    contextMenuDate = date;
    
    const menu = document.getElementById('calendar-context-menu');
    if (!menu) return;
    
    // Position menu
    menu.style.left = event.pageX + 'px';
    menu.style.top = event.pageY + 'px';
    menu.classList.add('show');
    
    // Close menu when clicking elsewhere
    const closeMenu = (e) => {
        if (!menu.contains(e.target)) {
            menu.classList.remove('show');
            document.removeEventListener('click', closeMenu);
        }
    };
    
    setTimeout(() => {
        document.addEventListener('click', closeMenu);
    }, 100);
}

// Setup Context Menu Listeners
function setupContextMenuListeners() {
    const menu = document.getElementById('calendar-context-menu');
    if (!menu) return;
    
    const items = menu.querySelectorAll('.context-menu-item');
    items.forEach(item => {
        item.addEventListener('click', (e) => {
            e.stopPropagation();
            const action = item.getAttribute('data-action');
            handleContextMenuAction(action);
            menu.classList.remove('show');
        });
    });
}

// Handle Context Menu Action
function handleContextMenuAction(action) {
    if (!contextMenuDate) return;
    
    const dateStr = contextMenuDate.toISOString().split('T')[0];
    
    switch (action) {
        case 'mark-working':
            updateDayType(dateStr, 'working');
            break;
        case 'mark-holiday':
            updateDayType(dateStr, 'holiday');
            break;
        case 'mark-partial':
            updateDayType(dateStr, 'partial');
            break;
        case 'add-technician':
            addTechnicianToDay(dateStr);
            break;
        case 'remove-technician':
            removeTechnicianFromDay(dateStr);
            break;
        case 'view-details':
            selectDate(contextMenuDate);
            break;
        case 'edit-holiday':
            editDayHoliday(dateStr);
            break;
        case 'delete-holiday':
            deleteDayHoliday(dateStr);
            break;
    }
}

// Update Day Type
function updateDayType(dateStr, type) {
    // Check if holiday already exists for this date
    const existingHoliday = holidays.find(h => 
        h.startDate <= dateStr && h.endDate >= dateStr
    );
    
    if (existingHoliday) {
        existingHoliday.type = type;
    } else {
        // Create new holiday
        const newHoliday = {
            id: Date.now(),
            name: type === 'holiday' ? 'Custom Holiday' : 
                  type === 'working' ? 'Working Day Override' : 
                  'Partial Work Day',
            type: type,
            startDate: dateStr,
            endDate: dateStr,
            technicians: 'all',
            country: null,
            notes: `Manually set as ${type}`
        };
        
        holidays.push(newHoliday);
    }
    
    renderCalendar();
    updateHolidayDetails();
    showModalNotification(`Day marked as ${type}`, 'success');
}

// Add Technician to Day
function addTechnicianToDay(dateStr) {
    // This would normally open a technician selection dialog
    showModalNotification('Add technician functionality would open here', 'info');
}

// Remove Technician from Day
function removeTechnicianFromDay(dateStr) {
    // This would normally open a technician removal dialog
    showModalNotification('Remove technician functionality would open here', 'info');
}

// Edit Day Holiday
function editDayHoliday(dateStr) {
    const holiday = holidays.find(h => 
        h.startDate <= dateStr && h.endDate >= dateStr
    );
    
    if (holiday) {
        // Populate and show edit modal
        showAddHolidayModal(holiday);
    } else {
        showModalNotification('No holiday found for this date', 'warning');
    }
}

// Delete Day Holiday
function deleteDayHoliday(dateStr) {
    if (!confirm('Are you sure you want to delete the holiday for this date?')) {
        return;
    }
    
    const holidayIndex = holidays.findIndex(h => 
        h.startDate <= dateStr && h.endDate >= dateStr
    );
    
    if (holidayIndex !== -1) {
        holidays.splice(holidayIndex, 1);
        renderCalendar();
        updateHolidayDetails();
        showModalNotification('Holiday deleted', 'success');
    }
}

// Setup Drag and Drop
function setupDragAndDrop() {
    const container = document.getElementById('calendar-grid-container');
    if (!container) return;
    
    container.addEventListener('mousedown', (e) => {
        const dayCell = e.target.closest('.calendar-day-cell');
        if (!dayCell) return;
        
        const dateStr = dayCell.getAttribute('data-date');
        if (!dateStr) return;
        
        isDragging = true;
        dragStartDate = new Date(dateStr);
        dragEndDate = dragStartDate;
        
        // Clear previous selection
        if (!e.ctrlKey && !e.metaKey && !e.shiftKey) {
            selectedDates.clear();
        }
        
        // Add drag selection class
        dayCell.classList.add('drag-selected');
    });
    
    document.addEventListener('mousemove', (e) => {
        if (!isDragging) return;
        e.preventDefault();
    });
    
    document.addEventListener('mouseup', (e) => {
        if (!isDragging) return;
        
        isDragging = false;
        
        // If we have a drag range, select it
        if (dragStartDate && dragEndDate && dragStartDate !== dragEndDate) {
            selectDateRange(dragStartDate, dragEndDate);
        } else if (dragStartDate) {
            // Single click
            selectDate(dragStartDate, e.ctrlKey || e.metaKey);
        }
        
        // Clear drag selection
        const dragSelected = document.querySelectorAll('.drag-selected');
        dragSelected.forEach(el => el.classList.remove('drag-selected'));
        
        dragStartDate = null;
        dragEndDate = null;
    });
}

// Update Drag Selection
function updateDragSelection() {
    if (!dragStartDate || !dragEndDate) return;
    
    // Clear previous drag selection
    const dragSelected = document.querySelectorAll('.drag-selected');
    dragSelected.forEach(el => el.classList.remove('drag-selected'));
    
    // Determine range
    const start = dragStartDate < dragEndDate ? dragStartDate : dragEndDate;
    const end = dragStartDate < dragEndDate ? dragEndDate : dragStartDate;
    
    // Add drag selection class to cells in range
    const current = new Date(start);
    while (current <= end) {
        const dateStr = current.toISOString().split('T')[0];
        const cell = document.querySelector(`[data-date="${dateStr}"]`);
        if (cell) {
            cell.classList.add('drag-selected');
        }
        current.setDate(current.getDate() + 1);
    }
}

// Show Day Tooltip
function showDayTooltip(e) {
    const cell = e.currentTarget;
    const dateStr = cell.getAttribute('data-date');
    const date = new Date(dateStr);
    
    const holidays = getHolidaysForDate(date);
    if (holidays.length === 0) return;
    
    // Create tooltip
    const tooltip = document.createElement('div');
    tooltip.className = 'calendar-tooltip';
    
    let html = `<strong>${date.toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric', year: 'numeric' })}</strong><br>`;
    
    holidays.forEach(holiday => {
        const techNames = getTechnicianNames(holiday.technicians);
        html += `<div style="margin-top: 4px;"><i class="fas fa-${holiday.type === 'holiday' ? 'umbrella-beach' : holiday.type === 'working' ? 'briefcase' : 'clock'}"></i> ${holiday.name} (${techNames.join(', ')})</div>`;
    });
    
    tooltip.innerHTML = html;
    
    // Position tooltip
    const rect = cell.getBoundingClientRect();
    tooltip.style.left = rect.left + rect.width / 2 + 'px';
    tooltip.style.top = rect.top - 10 + 'px';
    
    document.body.appendChild(tooltip);
    
    // Store reference for removal
    cell.tooltip = tooltip;
}

// Hide Day Tooltip
function hideDayTooltip(e) {
    const cell = e.currentTarget;
    if (cell.tooltip) {
        cell.tooltip.remove();
        cell.tooltip = null;
    }
}

// Update Holiday Details
function updateHolidayDetails() {
    const container = document.getElementById('holiday-details-content');
    if (!container) return;
    
    container.innerHTML = '';
    
    if (selectedDates.size === 0) {
        const empty = document.createElement('p');
        empty.className = 'calendar-empty-message';
        empty.textContent = 'Select a day or holiday to view details';
        container.appendChild(empty);
        return;
    }
    
    // Get unique holidays for selected dates
    const selectedHolidays = new Map();
    
    selectedDates.forEach(dateStr => {
        const date = new Date(dateStr);
        const dayHolidays = getHolidaysForDate(date);
        
        dayHolidays.forEach(holiday => {
            if (!selectedHolidays.has(holiday.id)) {
                selectedHolidays.set(holiday.id, {
                    holiday: holiday,
                    dates: new Set([dateStr])
                });
            } else {
                selectedHolidays.get(holiday.id).dates.add(dateStr);
            }
        });
    });
    
    if (selectedHolidays.size === 0) {
        const empty = document.createElement('div');
        empty.className = 'holiday-detail-item';
        empty.innerHTML = `
            <div class="holiday-date">${Array.from(selectedDates).join(', ')}</div>
            <div class="holiday-name">
                <strong>No Holidays</strong>
                <div class="holiday-technicians">Regular working days</div>
            </div>
        `;
        container.appendChild(empty);
        return;
    }
    
    // Display each holiday
    selectedHolidays.forEach(data => {
        const holiday = data.holiday;
        const dates = Array.from(data.dates).sort();
        
        const item = document.createElement('div');
        item.className = 'holiday-detail-item';
        
        item.innerHTML = `
            <div class="holiday-date">
                ${dates.length === 1 ? dates[0] : `${dates[0]} to ${dates[dates.length - 1]}`}
            </div>
            <div class="holiday-name">
                <strong>${holiday.name}</strong>
                <div class="holiday-technicians">
                    <i class="fas fa-${holiday.type === 'holiday' ? 'umbrella-beach' : holiday.type === 'working' ? 'briefcase' : 'clock'}"></i>
                    ${holiday.type.charAt(0).toUpperCase() + holiday.type.slice(1)} • 
                    ${getTechnicianNames(holiday.technicians).join(', ')}
                    ${holiday.country ? ` • ${holiday.country}` : ''}
                </div>
                ${holiday.notes ? `<div style="font-size: 12px; color: #7d7d8a; margin-top: 4px;">${holiday.notes}</div>` : ''}
            </div>
            <div class="holiday-actions">
                <button class="btn btn-sm btn-secondary" onclick="editHoliday(${holiday.id})">
                    <i class="fas fa-edit"></i>
                </button>
                <button class="btn btn-sm btn-danger" onclick="deleteHoliday(${holiday.id})">
                    <i class="fas fa-trash"></i>
                </button>
            </div>
        `;
        
        container.appendChild(item);
    });
}

// Show Add Holiday Modal
function showAddHolidayModal(holidayToEdit = null) {
    const overlay = document.getElementById('add-holiday-modal-overlay');
    const modal = document.getElementById('add-holiday-modal');
    
    if (!overlay || !modal) return;
    
    if (holidayToEdit) {
        // Edit mode
        document.getElementById('add-holiday-modal-header h3').innerHTML = '<i class="fas fa-calendar-edit"></i> Edit Holiday';
        document.getElementById('save-holiday').textContent = 'Update Holiday';
        
        // Populate fields
        document.getElementById('holiday-name').value = holidayToEdit.name;
        document.getElementById('holiday-type').value = holidayToEdit.type;
        document.getElementById('holiday-start-date').value = holidayToEdit.startDate;
        document.getElementById('holiday-end-date').value = holidayToEdit.endDate;
        document.getElementById('holiday-country').value = holidayToEdit.country || '';
        document.getElementById('holiday-notes').value = holidayToEdit.notes || '';
        
        // Set technicians
        const techSelect = document.getElementById('holiday-technician-select');
        Array.from(techSelect.options).forEach(option => {
            option.selected = false;
            if (holidayToEdit.technicians === 'all') {
                if (option.value === 'all') option.selected = true;
            } else if (holidayToEdit.technicians.includes(parseInt(option.value))) {
                option.selected = true;
            }
        });
        
        modal.dataset.editId = holidayToEdit.id;
    } else {
        // Add mode
        document.getElementById('add-holiday-modal-header h3').innerHTML = '<i class="fas fa-calendar-plus"></i> Add Holiday / Working Day';
        document.getElementById('save-holiday').textContent = 'Save Holiday';
        
        // Use selected dates if any
        if (selectedDates.size > 0) {
            const dates = Array.from(selectedDates).sort();
            document.getElementById('holiday-start-date').value = dates[0];
            document.getElementById('holiday-end-date').value = dates[dates.length - 1];
        } else {
            // Default to today
            const today = new Date().toISOString().split('T')[0];
            document.getElementById('holiday-start-date').value = today;
            document.getElementById('holiday-end-date').value = today;
        }
        
        delete modal.dataset.editId;
    }
    
    overlay.classList.add('show');
    document.body.style.overflow = 'hidden';
}

// Setup Holiday Modal Listeners
function setupHolidayModalListeners() {
    const overlay = document.getElementById('add-holiday-modal-overlay');
    const closeBtn = document.getElementById('close-holiday-modal');
    const cancelBtn = document.getElementById('cancel-holiday');
    const saveBtn = document.getElementById('save-holiday');
    
    if (closeBtn) {
        closeBtn.addEventListener('click', hideHolidayModal);
    }
    
    if (cancelBtn) {
        cancelBtn.addEventListener('click', hideHolidayModal);
    }
    
    if (saveBtn) {
        saveBtn.addEventListener('click', saveHoliday);
    }
    
    if (overlay) {
        overlay.addEventListener('click', function(e) {
            if (e.target === overlay) {
                hideHolidayModal();
            }
        });
    }
}

// Hide Holiday Modal
function hideHolidayModal() {
    const overlay = document.getElementById('add-holiday-modal-overlay');
    if (overlay) {
        overlay.classList.remove('show');
        document.body.style.overflow = 'auto';
    }
}

// Save Holiday
function saveHoliday() {
    const name = document.getElementById('holiday-name').value;
    const type = document.getElementById('holiday-type').value;
    const startDate = document.getElementById('holiday-start-date').value;
    const endDate = document.getElementById('holiday-end-date').value;
    const country = document.getElementById('holiday-country').value || null;
    const notes = document.getElementById('holiday-notes').value;
    
    const techSelect = document.getElementById('holiday-technician-select');
    const selectedTechs = Array.from(techSelect.selectedOptions).map(opt => opt.value);
    
    let technicians;
    if (selectedTechs.includes('all')) {
        technicians = 'all';
    } else {
        technicians = selectedTechs.map(id => parseInt(id));
    }
    
    if (!name || !startDate || !endDate) {
        showModalNotification('Please fill all required fields', 'error');
        return;
    }
    
    const modal = document.getElementById('add-holiday-modal');
    const isEdit = modal.dataset.editId;
    
    if (isEdit) {
        // Update existing holiday
        const holidayIndex = holidays.findIndex(h => h.id == isEdit);
        if (holidayIndex !== -1) {
            holidays[holidayIndex] = {
                ...holidays[holidayIndex],
                name,
                type,
                startDate,
                endDate,
                technicians,
                country,
                notes
            };
            
            showModalNotification('Holiday updated successfully!', 'success');
        }
    } else {
        // Add new holiday
        const newHoliday = {
            id: Date.now(),
            name,
            type,
            startDate,
            endDate,
            technicians,
            country,
            notes
        };
        
        holidays.push(newHoliday);
        showModalNotification('Holiday added successfully!', 'success');
    }
    
    hideHolidayModal();
    renderCalendar();
    updateHolidayDetails();
}

// Edit Holiday
function editHoliday(holidayId) {
    const holiday = holidays.find(h => h.id === holidayId);
    if (holiday) {
        showAddHolidayModal(holiday);
    }
}

// Delete Holiday
function deleteHoliday(holidayId) {
    if (!confirm('Are you sure you want to delete this holiday?')) {
        return;
    }
    
    const holidayIndex = holidays.findIndex(h => h.id === holidayId);
    if (holidayIndex !== -1) {
        holidays.splice(holidayIndex, 1);
        renderCalendar();
        updateHolidayDetails();
        showModalNotification('Holiday deleted successfully!', 'success');
    }
}

// Sync Holidays
function syncHolidays() {
    showModalNotification('Syncing holidays with external systems...', 'info');
    
    // Simulate API call
    setTimeout(() => {
        // Add some sample synced holidays
        const newHolidays = [
            {
                id: Date.now() + 1,
                name: "Synced: System Maintenance",
                type: "working",
                startDate: "2025-12-30",
                endDate: "2025-12-30",
                technicians: [1, 2, 3],
                country: null,
                notes: "Automatically synced from system calendar"
            },
            {
                id: Date.now() + 2,
                name: "Synced: Year-End Break",
                type: "holiday",
                startDate: "2025-12-31",
                endDate: "2026-01-02",
                technicians: "all",
                country: null,
                notes: "Synced from company holiday calendar"
            }
        ];
        
        holidays.push(...newHolidays);
        renderCalendar();
        showModalNotification('Holidays synced successfully! Added ' + newHolidays.length + ' new holidays.', 'success');
    }, 1500);
}

// Helper function for notifications
function showModalNotification(message, type = 'info') {
    console.log(`${type.toUpperCase()}: ${message}`);
    alert(`${type.toUpperCase()}: ${message}`);
}

// Export functions for global access
if (typeof window !== 'undefined') {
    window.initializeCalendarTab = initializeCalendarTab;
    window.showAddHolidayModal = showAddHolidayModal;
    window.editHoliday = editHoliday;
    window.deleteHoliday = deleteHoliday;
    window.syncHolidays = syncHolidays;
}

console.log('Band Details: Calendar tab functions loaded');