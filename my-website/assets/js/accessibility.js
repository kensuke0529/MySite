/**
 * Accessibility Enhancements for List Card Design System
 * Provides comprehensive accessibility features and ARIA support
 */

class AccessibilityEnhancer {
  constructor() {
    this.announcer = null;
    this.focusManager = null;
    this.keyboardNavigation = null;
    this.screenReaderSupport = null;
    
    this.init();
  }

  init() {
    this.createAnnouncer();
    this.setupFocusManagement();
    this.setupKeyboardNavigation();
    this.setupScreenReaderSupport();
    this.setupARIALabels();
    this.setupSkipLinks();
    this.setupHighContrastSupport();
    this.setupReducedMotionSupport();
  }

  createAnnouncer() {
    // Create live region for announcements
    this.announcer = document.createElement('div');
    this.announcer.setAttribute('aria-live', 'polite');
    this.announcer.setAttribute('aria-atomic', 'true');
    this.announcer.className = 'aria-live';
    this.announcer.id = 'announcer';
    document.body.appendChild(this.announcer);
  }

  announce(message, priority = 'polite') {
    if (this.announcer) {
      this.announcer.setAttribute('aria-live', priority);
      this.announcer.textContent = message;
      
      // Clear after announcement
      setTimeout(() => {
        this.announcer.textContent = '';
      }, 1000);
    }
  }

  setupFocusManagement() {
    // Track focus changes
    document.addEventListener('focusin', (e) => {
      this.handleFocusIn(e);
    });

    document.addEventListener('focusout', (e) => {
      this.handleFocusOut(e);
    });

    // Trap focus in modals/dropdowns
    this.setupFocusTrap();
  }

  handleFocusIn(e) {
    const element = e.target;
    
    // Announce focus changes for screen readers
    if (element.classList.contains('project-card')) {
      const title = element.querySelector('.card-title')?.textContent;
      const status = element.querySelector('.status-badge')?.textContent;
      const description = element.querySelector('.card-description')?.textContent;
      
      if (title) {
        this.announce(`Focused on project: ${title}. Status: ${status}. ${description}`, 'polite');
      }
    }
    
    // Update focus indicators
    this.updateFocusIndicators(element);
  }

  handleFocusOut(e) {
    // Clean up focus indicators
    this.cleanupFocusIndicators(e.target);
  }

  updateFocusIndicators(element) {
    // Add visual focus indicators
    element.classList.add('focused');
    
    // Update ARIA attributes
    if (element.classList.contains('project-card')) {
      element.setAttribute('aria-selected', 'true');
    }
  }

  cleanupFocusIndicators(element) {
    element.classList.remove('focused');
    
    if (element.classList.contains('project-card')) {
      element.setAttribute('aria-selected', 'false');
    }
  }

  setupFocusTrap() {
    // Focus trap for dropdowns and modals
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape') {
        this.closeAllDropdowns();
        this.closeAllModals();
      }
    });
  }

  setupKeyboardNavigation() {
    // Enhanced keyboard navigation
    document.addEventListener('keydown', (e) => {
      this.handleKeyboardNavigation(e);
    });

    // Arrow key navigation for cards
    this.setupArrowKeyNavigation();
  }

  handleKeyboardNavigation(e) {
    const { key, ctrlKey, altKey, shiftKey } = e;
    
    // Skip links
    if (key === 'Tab' && !shiftKey && document.activeElement === document.body) {
      this.focusFirstInteractiveElement();
    }

    // Card navigation
    if (key === 'ArrowDown' || key === 'ArrowUp') {
      e.preventDefault();
      this.navigateCards(key === 'ArrowDown' ? 'next' : 'previous');
    }

    // Card actions
    if (key === 'Enter' || key === ' ') {
      const focusedElement = document.activeElement;
      if (focusedElement.classList.contains('project-card')) {
        e.preventDefault();
        this.activateCard(focusedElement);
      }
    }

    // Quick actions
    if (key === 'f' && ctrlKey) {
      e.preventDefault();
      this.toggleFavorite();
    }

    if (key === 's' && ctrlKey) {
      e.preventDefault();
      this.toggleSelectionMode();
    }

    // Search
    if (key === '/' && !ctrlKey && !altKey) {
      e.preventDefault();
      this.focusSearch();
    }
  }

  setupArrowKeyNavigation() {
    const cards = document.querySelectorAll('.project-card');
    
    cards.forEach((card, index) => {
      card.addEventListener('keydown', (e) => {
        if (e.key === 'ArrowRight' || e.key === 'ArrowLeft') {
          e.preventDefault();
          const direction = e.key === 'ArrowRight' ? 'next' : 'previous';
          this.navigateCards(direction, index);
        }
      });
    });
  }

  navigateCards(direction, currentIndex = null) {
    const cards = Array.from(document.querySelectorAll('.project-card'));
    const currentCard = currentIndex !== null ? cards[currentIndex] : document.activeElement;
    const currentIndexActual = currentIndex !== null ? currentIndex : cards.indexOf(currentCard);
    
    let nextIndex;
    if (direction === 'next') {
      nextIndex = (currentIndexActual + 1) % cards.length;
    } else {
      nextIndex = currentIndexActual === 0 ? cards.length - 1 : currentIndexActual - 1;
    }
    
    if (cards[nextIndex]) {
      cards[nextIndex].focus();
      this.announce(`Navigated to ${cards[nextIndex].querySelector('.card-title')?.textContent}`, 'polite');
    }
  }

  activateCard(card) {
    const isExpanded = card.getAttribute('aria-expanded') === 'true';
    
    if (isExpanded) {
      this.collapseCard(card);
      this.announce('Card collapsed', 'polite');
    } else {
      this.expandCard(card);
      this.announce('Card expanded', 'polite');
    }
  }

  expandCard(card) {
    const expandable = card.querySelector('.card-expandable');
    card.setAttribute('aria-expanded', 'true');
    expandable.setAttribute('aria-hidden', 'false');
    expandable.classList.add('expanded');
  }

  collapseCard(card) {
    const expandable = card.querySelector('.card-expandable');
    card.setAttribute('aria-expanded', 'false');
    expandable.setAttribute('aria-hidden', 'true');
    expandable.classList.remove('expanded');
  }

  setupScreenReaderSupport() {
    // Add screen reader descriptions
    this.addScreenReaderDescriptions();
    
    // Setup landmark navigation
    this.setupLandmarkNavigation();
    
    // Setup heading navigation
    this.setupHeadingNavigation();
  }

  addScreenReaderDescriptions() {
    const cards = document.querySelectorAll('.project-card');
    
    cards.forEach(card => {
      const title = card.querySelector('.card-title')?.textContent;
      const status = card.querySelector('.status-badge')?.textContent;
      const description = card.querySelector('.card-description')?.textContent;
      const progress = card.querySelector('.progress-text')?.textContent;
      
      const srDescription = document.createElement('div');
      srDescription.className = 'sr-only';
      srDescription.textContent = `${title}. Status: ${status}. ${description}. Progress: ${progress}. Click to expand for more details.`;
      
      card.appendChild(srDescription);
    });
  }

  setupLandmarkNavigation() {
    // Add landmark roles
    const main = document.querySelector('main');
    if (main) {
      main.setAttribute('role', 'main');
    }

    const nav = document.querySelector('nav');
    if (nav) {
      nav.setAttribute('role', 'navigation');
    }

    const grid = document.querySelector('.project-cards-grid');
    if (grid) {
      grid.setAttribute('role', 'grid');
      grid.setAttribute('aria-label', 'Project cards grid');
    }
  }

  setupHeadingNavigation() {
    // Ensure proper heading hierarchy
    const cards = document.querySelectorAll('.project-card');
    
    cards.forEach((card, index) => {
      const title = card.querySelector('.card-title');
      if (title) {
        title.setAttribute('role', 'heading');
        title.setAttribute('aria-level', '3');
      }
    });
  }

  setupARIALabels() {
    // Add comprehensive ARIA labels
    this.addARIALabels();
    
    // Setup form labels
    this.setupFormLabels();
    
    // Setup button labels
    this.setupButtonLabels();
  }

  addARIALabels() {
    const cards = document.querySelectorAll('.project-card');
    
    cards.forEach(card => {
      // Main card attributes
      card.setAttribute('role', 'button');
      card.setAttribute('tabindex', '0');
      card.setAttribute('aria-expanded', 'false');
      
      // Status badges
      const statusBadges = card.querySelectorAll('.status-badge');
      statusBadges.forEach(badge => {
        badge.setAttribute('role', 'status');
        badge.setAttribute('aria-label', `Project status: ${badge.textContent}`);
      });
      
      // Progress bars
      const progressBars = card.querySelectorAll('.progress-bar');
      progressBars.forEach(bar => {
        const fill = bar.querySelector('.progress-fill');
        const percentage = fill.style.width;
        bar.setAttribute('role', 'progressbar');
        bar.setAttribute('aria-valuenow', percentage.replace('%', ''));
        bar.setAttribute('aria-valuemin', '0');
        bar.setAttribute('aria-valuemax', '100');
        bar.setAttribute('aria-label', `Progress: ${percentage}`);
      });
      
      // Action buttons
      const actionBtns = card.querySelectorAll('.action-btn');
      actionBtns.forEach((btn, index) => {
        const icon = btn.querySelector('i');
        const action = this.getActionFromIcon(icon);
        btn.setAttribute('aria-label', action);
        btn.setAttribute('title', action);
      });
      
      // Favorite buttons
      const favoriteBtns = card.querySelectorAll('.favorite-btn');
      favoriteBtns.forEach(btn => {
        const isActive = btn.classList.contains('active');
        btn.setAttribute('aria-label', isActive ? 'Remove from favorites' : 'Add to favorites');
        btn.setAttribute('aria-pressed', isActive.toString());
      });
    });
  }

  getActionFromIcon(icon) {
    const iconClass = icon.className;
    
    if (iconClass.includes('share')) return 'Share project';
    if (iconClass.includes('ellipsis')) return 'More options';
    if (iconClass.includes('star')) return 'Toggle favorite';
    if (iconClass.includes('eye')) return 'View project';
    if (iconClass.includes('external-link')) return 'Open demo';
    if (iconClass.includes('github')) return 'View on GitHub';
    
    return 'Action';
  }

  setupFormLabels() {
    // Filter controls
    const categoryFilter = document.getElementById('categoryFilter');
    const statusFilter = document.getElementById('statusFilter');
    
    if (categoryFilter) {
      categoryFilter.setAttribute('aria-label', 'Filter projects by category');
    }
    
    if (statusFilter) {
      statusFilter.setAttribute('aria-label', 'Filter projects by status');
    }
    
    // Search input
    const searchInput = document.getElementById('searchInput');
    if (searchInput) {
      searchInput.setAttribute('aria-label', 'Search projects');
      searchInput.setAttribute('aria-describedby', 'search-help');
    }
  }

  setupButtonLabels() {
    // Sort buttons
    const sortBtns = document.querySelectorAll('.sort-btn');
    sortBtns.forEach(btn => {
      const sortType = btn.getAttribute('data-sort');
      btn.setAttribute('aria-label', `Sort by ${sortType}`);
    });
    
    // Quick action buttons
    const quickActionBtns = document.querySelectorAll('.quick-action-btn');
    quickActionBtns.forEach(btn => {
      const text = btn.textContent.trim();
      btn.setAttribute('aria-label', text);
    });
  }

  setupSkipLinks() {
    // Add skip links
    const skipLink = document.createElement('a');
    skipLink.href = '#main-content';
    skipLink.className = 'skip-link';
    skipLink.textContent = 'Skip to main content';
    document.body.insertBefore(skipLink, document.body.firstChild);
    
    // Add main content ID
    const main = document.querySelector('main');
    if (main) {
      main.id = 'main-content';
    }
  }

  setupHighContrastSupport() {
    // Detect high contrast mode
    if (window.matchMedia('(prefers-contrast: high)').matches) {
      document.body.classList.add('high-contrast');
    }
    
    // Listen for changes
    window.matchMedia('(prefers-contrast: high)').addEventListener('change', (e) => {
      if (e.matches) {
        document.body.classList.add('high-contrast');
      } else {
        document.body.classList.remove('high-contrast');
      }
    });
  }

  setupReducedMotionSupport() {
    // Detect reduced motion preference
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      document.body.classList.add('reduced-motion');
    }
    
    // Listen for changes
    window.matchMedia('(prefers-reduced-motion: reduce)').addEventListener('change', (e) => {
      if (e.matches) {
        document.body.classList.add('reduced-motion');
      } else {
        document.body.classList.remove('reduced-motion');
      }
    });
  }

  // Utility methods
  focusFirstInteractiveElement() {
    const firstInteractive = document.querySelector('button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])');
    if (firstInteractive) {
      firstInteractive.focus();
    }
  }

  focusSearch() {
    const searchInput = document.getElementById('searchInput');
    if (searchInput) {
      searchInput.focus();
      this.announce('Search focused', 'polite');
    }
  }

  toggleFavorite() {
    const focusedCard = document.activeElement;
    if (focusedCard.classList.contains('project-card')) {
      const favoriteBtn = focusedCard.querySelector('.favorite-btn');
      if (favoriteBtn) {
        favoriteBtn.click();
      }
    }
  }

  toggleSelectionMode() {
    const selectionToggle = document.getElementById('selectionToggle');
    if (selectionToggle) {
      selectionToggle.click();
    }
  }

  closeAllDropdowns() {
    const dropdowns = document.querySelectorAll('.card-dropdown-menu');
    dropdowns.forEach(dropdown => dropdown.remove());
  }

  closeAllModals() {
    const modals = document.querySelectorAll('[role="dialog"]');
    modals.forEach(modal => {
      modal.setAttribute('aria-hidden', 'true');
      modal.style.display = 'none';
    });
  }

  // Public API
  announceCardAction(action, cardTitle) {
    this.announce(`${action}: ${cardTitle}`, 'polite');
  }

  announceFilterChange(filterType, value) {
    this.announce(`Filter changed to ${filterType}: ${value}`, 'polite');
  }

  announceSortChange(sortType) {
    this.announce(`Sorting by ${sortType}`, 'polite');
  }

  announceSelectionChange(count) {
    this.announce(`${count} projects selected`, 'polite');
  }
}

// Initialize accessibility enhancer
document.addEventListener('DOMContentLoaded', () => {
  window.accessibilityEnhancer = new AccessibilityEnhancer();
});

// Export for module usage
if (typeof module !== 'undefined' && module.exports) {
  module.exports = AccessibilityEnhancer;
}

