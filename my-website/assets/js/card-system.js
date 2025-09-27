/**
 * List Card Design System - Interactive JavaScript
 * Provides enhanced interactions, animations, and functionality for project list cards
 */

class CardSystem {
  constructor() {
    this.cards = document.querySelectorAll('.project-card');
    this.grid = document.getElementById('projectCardsGrid');
    this.filters = {
      category: 'all',
      status: 'all',
      search: ''
    };
    this.sortBy = 'date';
    this.selectionMode = false;
    this.selectedCards = new Set();
    
    this.init();
  }

  init() {
    this.setupEventListeners();
    this.setupKeyboardNavigation();
    this.setupAccessibility();
    this.initializeCards();
  }

  setupEventListeners() {
    // Card interactions
    this.cards.forEach(card => this.setupCardEvents(card));
    
    // Filter controls
    this.setupFilterControls();
    
    // Sort controls
    this.setupSortControls();
    
    // Search functionality
    this.setupSearch();
    
    // Selection mode
    this.setupSelectionMode();
  }

  setupCardEvents(card) {
    // Main card click for expand/collapse
    card.addEventListener('click', (e) => {
      if (this.isActionElement(e.target)) return;
      this.toggleCardExpansion(card);
    });

    // Favorite toggle
    const favoriteBtn = card.querySelector('.favorite-btn');
    if (favoriteBtn) {
      favoriteBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        this.toggleFavorite(card, favoriteBtn);
      });
    }

    // Action buttons
    const actionBtns = card.querySelectorAll('.action-btn');
    actionBtns.forEach(btn => {
      btn.addEventListener('click', (e) => {
        e.stopPropagation();
        this.handleActionClick(card, btn);
      });
    });

    // Hover effects
    card.addEventListener('mouseenter', () => this.onCardHover(card));
    card.addEventListener('mouseleave', () => this.onCardLeave(card));
  }

  setupFilterControls() {
    const categoryFilter = document.getElementById('categoryFilter');
    const statusFilter = document.getElementById('statusFilter');

    if (categoryFilter) {
      categoryFilter.addEventListener('change', (e) => {
        this.filters.category = e.target.value;
        this.applyFilters();
      });
    }

    if (statusFilter) {
      statusFilter.addEventListener('change', (e) => {
        this.filters.status = e.target.value;
        this.applyFilters();
      });
    }
  }

  setupSortControls() {
    const sortBtns = document.querySelectorAll('.sort-btn');
    
    sortBtns.forEach(btn => {
      btn.addEventListener('click', () => {
        // Update active state
        sortBtns.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        
        this.sortBy = btn.getAttribute('data-sort');
        this.applySorting();
      });
    });
  }

  setupSearch() {
    // Add search input if it doesn't exist
    if (!document.getElementById('searchInput')) {
      this.createSearchInput();
    }
    
    const searchInput = document.getElementById('searchInput');
    if (searchInput) {
      searchInput.addEventListener('input', (e) => {
        this.filters.search = e.target.value.toLowerCase();
        this.applyFilters();
      });
    }
  }

  setupSelectionMode() {
    // Add selection mode toggle if it doesn't exist
    if (!document.getElementById('selectionToggle')) {
      this.createSelectionToggle();
    }
    
    const selectionToggle = document.getElementById('selectionToggle');
    if (selectionToggle) {
      selectionToggle.addEventListener('click', () => {
        this.toggleSelectionMode();
      });
    }
  }

  setupKeyboardNavigation() {
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape') {
        this.exitSelectionMode();
        this.closeAllExpandedCards();
      }
      
      if (e.key === 'Enter' || e.key === ' ') {
        const focusedCard = document.activeElement;
        if (focusedCard.classList.contains('project-card')) {
          e.preventDefault();
          this.toggleCardExpansion(focusedCard);
        }
      }
    });
  }

  setupAccessibility() {
    this.cards.forEach(card => {
      // Ensure proper ARIA attributes
      card.setAttribute('role', 'button');
      card.setAttribute('tabindex', '0');
      card.setAttribute('aria-expanded', 'false');
      
      // Add screen reader descriptions
      const title = card.querySelector('.card-title');
      const description = card.querySelector('.card-description');
      if (title && description) {
        card.setAttribute('aria-label', `${title.textContent}. ${description.textContent}`);
      }
    });
  }

  initializeCards() {
    // Add loading animation
    this.cards.forEach((card, index) => {
      card.style.opacity = '0';
      card.style.transform = 'translateY(20px)';
      
      setTimeout(() => {
        card.style.transition = 'all 0.3s ease';
        card.style.opacity = '1';
        card.style.transform = 'translateY(0)';
      }, index * 100);
    });
  }

  // Card interaction methods
  toggleCardExpansion(card) {
    const isExpanded = card.getAttribute('aria-expanded') === 'true';
    const expandable = card.querySelector('.card-expandable');
    
    if (isExpanded) {
      this.collapseCard(card, expandable);
    } else {
      this.expandCard(card, expandable);
    }
  }

  expandCard(card, expandable) {
    card.setAttribute('aria-expanded', 'true');
    expandable.setAttribute('aria-hidden', 'false');
    expandable.classList.add('expanded');
    
    // Smooth scroll to card if needed
    this.scrollToCard(card);
  }

  collapseCard(card, expandable) {
    card.setAttribute('aria-expanded', 'false');
    expandable.setAttribute('aria-hidden', 'true');
    expandable.classList.remove('expanded');
  }

  toggleFavorite(card, favoriteBtn) {
    const isActive = favoriteBtn.classList.contains('active');
    const icon = favoriteBtn.querySelector('i');
    
    if (isActive) {
      favoriteBtn.classList.remove('active');
      icon.className = 'far fa-star';
      favoriteBtn.title = 'Add to favorites';
      this.showNotification('Removed from favorites', 'info');
    } else {
      favoriteBtn.classList.add('active');
      icon.className = 'fas fa-star';
      favoriteBtn.title = 'Remove from favorites';
      this.showNotification('Added to favorites', 'success');
    }
  }

  handleActionClick(card, btn) {
    const action = btn.querySelector('i').className;
    
    if (action.includes('share')) {
      this.shareCard(card);
    } else if (action.includes('ellipsis')) {
      this.showCardMenu(card, btn);
    }
  }

  onCardHover(card) {
    if (!this.selectionMode) {
      card.style.transform = 'translateY(-2px)';
    }
  }

  onCardLeave(card) {
    if (!this.selectionMode) {
      card.style.transform = 'translateY(0)';
    }
  }

  // Filter and sort methods
  applyFilters() {
    this.cards.forEach(card => {
      const cardCategory = card.getAttribute('data-category');
      const cardStatus = card.getAttribute('data-status');
      const cardTitle = card.querySelector('.card-title').textContent.toLowerCase();
      const cardDescription = card.querySelector('.card-description').textContent.toLowerCase();
      
      const categoryMatch = this.filters.category === 'all' || 
        cardCategory.includes(this.filters.category);
      const statusMatch = this.filters.status === 'all' || 
        cardStatus === this.filters.status;
      const searchMatch = this.filters.search === '' || 
        cardTitle.includes(this.filters.search) || 
        cardDescription.includes(this.filters.search);
      
      if (categoryMatch && statusMatch && searchMatch) {
        this.showCard(card);
      } else {
        this.hideCard(card);
      }
    });
    
    this.updateSummary();
  }

  applySorting() {
    const cardsArray = Array.from(this.cards);
    
    cardsArray.sort((a, b) => {
      switch (this.sortBy) {
        case 'name':
          return a.querySelector('.card-title').textContent.localeCompare(
            b.querySelector('.card-title').textContent
          );
        case 'priority':
          const priorityOrder = { high: 3, medium: 2, low: 1 };
          const aPriority = a.getAttribute('data-priority');
          const bPriority = b.getAttribute('data-priority');
          return priorityOrder[bPriority] - priorityOrder[aPriority];
        case 'date':
        default:
          // Sort by last updated (mock data)
          return Math.random() - 0.5;
      }
    });
    
    // Reorder cards with animation
    cardsArray.forEach((card, index) => {
      setTimeout(() => {
        this.grid.appendChild(card);
      }, index * 50);
    });
  }

  showCard(card) {
    card.style.display = '';
    card.style.opacity = '0';
    card.style.transform = 'translateY(20px)';
    
    setTimeout(() => {
      card.style.transition = 'all 0.3s ease';
      card.style.opacity = '1';
      card.style.transform = 'translateY(0)';
    }, 10);
  }

  hideCard(card) {
    card.style.display = 'none';
  }

  // Selection mode methods
  toggleSelectionMode() {
    this.selectionMode = !this.selectionMode;
    const container = document.querySelector('.project-list-container');
    
    if (this.selectionMode) {
      container.classList.add('selection-mode');
      this.addSelectionCheckboxes();
      this.showSelectionToolbar();
    } else {
      this.exitSelectionMode();
    }
  }

  exitSelectionMode() {
    this.selectionMode = false;
    this.selectedCards.clear();
    const container = document.querySelector('.project-list-container');
    container.classList.remove('selection-mode');
    this.removeSelectionCheckboxes();
    this.hideSelectionToolbar();
  }

  addSelectionCheckboxes() {
    this.cards.forEach(card => {
      const checkbox = document.createElement('input');
      checkbox.type = 'checkbox';
      checkbox.className = 'card-checkbox';
      checkbox.addEventListener('change', (e) => {
        if (e.target.checked) {
          this.selectedCards.add(card);
        } else {
          this.selectedCards.delete(card);
        }
        this.updateSelectionToolbar();
      });
      card.appendChild(checkbox);
    });
  }

  removeSelectionCheckboxes() {
    const checkboxes = document.querySelectorAll('.card-checkbox');
    checkboxes.forEach(checkbox => checkbox.remove());
  }

  showSelectionToolbar() {
    const toolbar = document.createElement('div');
    toolbar.className = 'selection-toolbar';
    toolbar.innerHTML = `
      <div class="selection-info">
        <span id="selectionCount">0 selected</span>
      </div>
      <div class="selection-actions">
        <button class="selection-btn" id="selectAll">Select All</button>
        <button class="selection-btn" id="deselectAll">Deselect All</button>
        <button class="selection-btn danger" id="deleteSelected">Delete</button>
        <button class="selection-btn" id="closeSelection">Close</button>
      </div>
    `;
    
    document.querySelector('.project-list-container').appendChild(toolbar);
    
    // Add event listeners
    document.getElementById('selectAll').addEventListener('click', () => this.selectAll());
    document.getElementById('deselectAll').addEventListener('click', () => this.deselectAll());
    document.getElementById('deleteSelected').addEventListener('click', () => this.deleteSelected());
    document.getElementById('closeSelection').addEventListener('click', () => this.exitSelectionMode());
  }

  hideSelectionToolbar() {
    const toolbar = document.querySelector('.selection-toolbar');
    if (toolbar) toolbar.remove();
  }

  updateSelectionToolbar() {
    const count = this.selectedCards.size;
    const countElement = document.getElementById('selectionCount');
    if (countElement) {
      countElement.textContent = `${count} selected`;
    }
  }

  selectAll() {
    this.cards.forEach(card => {
      const checkbox = card.querySelector('.card-checkbox');
      if (checkbox && !checkbox.checked) {
        checkbox.checked = true;
        this.selectedCards.add(card);
      }
    });
    this.updateSelectionToolbar();
  }

  deselectAll() {
    this.cards.forEach(card => {
      const checkbox = card.querySelector('.card-checkbox');
      if (checkbox) checkbox.checked = false;
    });
    this.selectedCards.clear();
    this.updateSelectionToolbar();
  }

  deleteSelected() {
    if (this.selectedCards.size === 0) return;
    
    if (confirm(`Are you sure you want to delete ${this.selectedCards.size} project(s)?`)) {
      this.selectedCards.forEach(card => {
        card.style.transition = 'all 0.3s ease';
        card.style.opacity = '0';
        card.style.transform = 'translateX(-100%)';
        
        setTimeout(() => {
          card.remove();
        }, 300);
      });
      
      this.selectedCards.clear();
      this.updateSummary();
      this.showNotification('Projects deleted', 'success');
    }
  }

  // Utility methods
  isActionElement(element) {
    return element.closest('.card-actions') || 
           element.closest('.card-footer') || 
           element.closest('.action-btn') ||
           element.closest('.favorite-btn');
  }

  scrollToCard(card) {
    const cardRect = card.getBoundingClientRect();
    const viewportHeight = window.innerHeight;
    
    if (cardRect.bottom > viewportHeight || cardRect.top < 0) {
      card.scrollIntoView({ 
        behavior: 'smooth', 
        block: 'center' 
      });
    }
  }

  shareCard(card) {
    const title = card.querySelector('.card-title').textContent;
    const url = window.location.href;
    
    if (navigator.share) {
      navigator.share({
        title: title,
        url: url
      });
    } else {
      // Fallback to clipboard
      navigator.clipboard.writeText(url);
      this.showNotification('Link copied to clipboard', 'success');
    }
  }

  showCardMenu(card, btn) {
    // Create dropdown menu
    const menu = document.createElement('div');
    menu.className = 'card-dropdown-menu';
    menu.innerHTML = `
      <div class="menu-item" data-action="edit">
        <i class="fas fa-edit"></i>
        Edit
      </div>
      <div class="menu-item" data-action="duplicate">
        <i class="fas fa-copy"></i>
        Duplicate
      </div>
      <div class="menu-item" data-action="archive">
        <i class="fas fa-archive"></i>
        Archive
      </div>
      <div class="menu-item danger" data-action="delete">
        <i class="fas fa-trash"></i>
        Delete
      </div>
    `;
    
    // Position menu
    const btnRect = btn.getBoundingClientRect();
    menu.style.position = 'fixed';
    menu.style.top = `${btnRect.bottom + 5}px`;
    menu.style.left = `${btnRect.left}px`;
    menu.style.zIndex = '1000';
    
    document.body.appendChild(menu);
    
    // Handle menu clicks
    menu.addEventListener('click', (e) => {
      const action = e.target.closest('.menu-item')?.getAttribute('data-action');
      if (action) {
        this.handleMenuAction(card, action);
      }
      menu.remove();
    });
    
    // Close menu on outside click
    setTimeout(() => {
      document.addEventListener('click', () => {
        menu.remove();
      }, { once: true });
    }, 0);
  }

  handleMenuAction(card, action) {
    switch (action) {
      case 'edit':
        this.showNotification('Edit functionality coming soon', 'info');
        break;
      case 'duplicate':
        this.duplicateCard(card);
        break;
      case 'archive':
        this.archiveCard(card);
        break;
      case 'delete':
        this.deleteCard(card);
        break;
    }
  }

  duplicateCard(card) {
    const newCard = card.cloneNode(true);
    const title = newCard.querySelector('.card-title');
    title.textContent = `${title.textContent} (Copy)`;
    
    this.grid.appendChild(newCard);
    this.setupCardEvents(newCard);
    this.showNotification('Card duplicated', 'success');
  }

  archiveCard(card) {
    card.style.transition = 'all 0.3s ease';
    card.style.opacity = '0.5';
    card.style.transform = 'scale(0.95)';
    this.showNotification('Card archived', 'info');
  }

  deleteCard(card) {
    if (confirm('Are you sure you want to delete this project?')) {
      card.style.transition = 'all 0.3s ease';
      card.style.opacity = '0';
      card.style.transform = 'translateX(-100%)';
      
      setTimeout(() => {
        card.remove();
        this.updateSummary();
      }, 300);
      
      this.showNotification('Project deleted', 'success');
    }
  }

  createSearchInput() {
    const searchContainer = document.createElement('div');
    searchContainer.className = 'filter-group';
    searchContainer.innerHTML = `
      <label class="filter-label" for="searchInput">Search</label>
      <input type="text" id="searchInput" class="filter-select" placeholder="Search projects...">
    `;
    
    document.querySelector('.filter-controls').appendChild(searchContainer);
  }

  createSelectionToggle() {
    const toggleBtn = document.createElement('button');
    toggleBtn.id = 'selectionToggle';
    toggleBtn.className = 'btn btn-secondary';
    toggleBtn.innerHTML = '<i class="fas fa-check-square"></i> Select Mode';
    
    document.querySelector('.project-list-header').appendChild(toggleBtn);
  }

  updateSummary() {
    const visibleCards = Array.from(this.cards).filter(card => 
      card.style.display !== 'none'
    );
    
    const activeCount = visibleCards.filter(card => 
      card.getAttribute('data-status') === 'active'
    ).length;
    
    const progressCount = visibleCards.filter(card => 
      card.getAttribute('data-status') === 'progress'
    ).length;
    
    const completedCount = visibleCards.filter(card => 
      card.getAttribute('data-status') === 'completed'
    ).length;
    
    // Update summary display
    const summaryItems = document.querySelectorAll('.summary-item span');
    if (summaryItems[0]) summaryItems[0].textContent = `${visibleCards.length} projects active`;
    if (summaryItems[1]) summaryItems[1].textContent = `${progressCount} in progress`;
    if (summaryItems[2]) summaryItems[2].textContent = `${completedCount} completed`;
  }

  closeAllExpandedCards() {
    this.cards.forEach(card => {
      if (card.getAttribute('aria-expanded') === 'true') {
        this.collapseCard(card, card.querySelector('.card-expandable'));
      }
    });
  }

  showNotification(message, type = 'info') {
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.textContent = message;
    
    notification.style.cssText = `
      position: fixed;
      top: 20px;
      right: 20px;
      padding: 12px 20px;
      border-radius: 6px;
      color: white;
      font-weight: 500;
      z-index: 10000;
      transform: translateX(100%);
      transition: transform 0.3s ease;
    `;
    
    if (type === 'success') {
      notification.style.background = '#10B981';
    } else if (type === 'error') {
      notification.style.background = '#EF4444';
    } else {
      notification.style.background = '#3B82F6';
    }
    
    document.body.appendChild(notification);
    
    setTimeout(() => {
      notification.style.transform = 'translateX(0)';
    }, 10);
    
    setTimeout(() => {
      notification.style.transform = 'translateX(100%)';
      setTimeout(() => notification.remove(), 300);
    }, 3000);
  }
}

// Initialize the card system when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
  new CardSystem();
});

// Export for module usage
if (typeof module !== 'undefined' && module.exports) {
  module.exports = CardSystem;
}

