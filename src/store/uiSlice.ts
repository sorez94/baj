import { createSlice, PayloadAction } from '@reduxjs/toolkit';

// Types
export type ThemeMode = 'light' | 'dark' | 'system';

export interface UIState {
  // Theme
  theme: {
    mode: ThemeMode;
    isDark: boolean;
  };

  back : {
    actionType?: string;
    payload?: any;
  }

  container : {
    maxWidth: 'xs' | 'sm' | 'md' | 'lg' | 'xl';
  }
  
  // Sidebar/Navigation
  sidebar: {
    isOpen: boolean;
    isCollapsed: boolean;
    activeItem: string;
  };
  
  // Modals
  modals: {
    isAnyOpen: boolean;
    activeModals: string[];
  };
  
  // Notifications
  notifications: {
    isVisible: boolean;
    type: 'success' | 'error' | 'warning' | 'info';
    message: string;
    duration: number;
  };
  
  // Loading States
  loading: {
    isGlobalLoading: boolean;
    loadingStates: Record<string, boolean>;
  };
  
  // Toast Messages
  toasts: Array<{
    id: string;
    type: 'success' | 'error' | 'warning' | 'info';
    title: string;
    message?: string;
    duration: number;
    isVisible: boolean;
  }>;
  
  // Drawer
  drawer: {
    isOpen: boolean;
    position: 'left' | 'right' | 'top' | 'bottom';
    size: 'sm' | 'md' | 'lg' | 'xl' | 'full';
  };
  
  // Search
  search: {
    isOpen: boolean;
    query: string;
    results: any[];
    isSearching: boolean;
  };
  
  // Filters
  filters: {
    isVisible: boolean;
    activeFilters: Record<string, any>;
  };
  
  // Pagination
  pagination: {
    currentPage: number;
    pageSize: number;
    totalItems: number;
  };
  
  // Sort
  sort: {
    field: string;
    direction: 'asc' | 'desc';
  };
  
  // View Mode
  viewMode: 'grid' | 'list' | 'table' | 'card';
  
  // Language/Locale
  locale: {
    language: string;
    direction: 'ltr' | 'rtl';
    currency: string;
    timezone: string;
  };
  
  // Accessibility
  accessibility: {
    highContrast: boolean;
    reducedMotion: boolean;
    fontSize: 'small' | 'medium' | 'large';
    screenReader: boolean;
  };
  
  // Responsive
  responsive: {
    isMobile: boolean;
    isTablet: boolean;
    isDesktop: boolean;
    breakpoint: string;
  };
}

// Initial State
const initialState: UIState = {
  theme: {
    mode: 'system',
    isDark: false,
  },

  back: {
    actionType: undefined,
    payload: undefined,
  },

  container: {
    maxWidth: 'md',
  },
  
  sidebar: {
    isOpen: false,
    isCollapsed: false,
    activeItem: '',
  },
  
  modals: {
    isAnyOpen: false,
    activeModals: [],
  },
  
  notifications: {
    isVisible: false,
    type: 'info',
    message: '',
    duration: 5000,
  },
  
  loading: {
    isGlobalLoading: false,
    loadingStates: {},
  },
  
  toasts: [],
  
  drawer: {
    isOpen: false,
    position: 'right',
    size: 'md',
  },
  
  search: {
    isOpen: false,
    query: '',
    results: [],
    isSearching: false,
  },
  
  filters: {
    isVisible: false,
    activeFilters: {},
  },
  
  pagination: {
    currentPage: 1,
    pageSize: 10,
    totalItems: 0,
  },
  
  sort: {
    field: '',
    direction: 'asc',
  },
  
  viewMode: 'grid',
  
  locale: {
    language: 'fa',
    direction: 'rtl',
    currency: 'IRR',
    timezone: 'Asia/Tehran',
  },
  
  accessibility: {
    highContrast: false,
    reducedMotion: false,
    fontSize: 'medium',
    screenReader: false,
  },
  
  responsive: {
    isMobile: false,
    isTablet: false,
    isDesktop: false,
    breakpoint: 'lg',
  },
};

// UI Slice
const uiSlice = createSlice({
  name: 'ui',
  initialState,
  reducers: {
    // Theme Actions
    setThemeMode: (state, action: PayloadAction<ThemeMode>) => {
      state.theme.mode = action.payload;
      
      // Determine if dark mode should be active
      if (action.payload === 'system') {
        const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
        state.theme.isDark = prefersDark;
      } else {
        state.theme.isDark = action.payload === 'dark';
      }
    },
    
    toggleTheme: (state) => {
      if (state.theme.mode === 'system') {
        state.theme.mode = 'light';
        state.theme.isDark = false;
      } else if (state.theme.mode === 'light') {
        state.theme.mode = 'dark';
        state.theme.isDark = true;
      } else {
        state.theme.mode = 'light';
        state.theme.isDark = false;
      }
    },


    setBackAction: (state, action: PayloadAction<{actionType: string; payload?: any} | undefined>) => {
      if (action.payload) {
        state.back.actionType = action.payload.actionType;
        state.back.payload = action.payload.payload;
      } else {
        state.back.actionType = undefined;
        state.back.payload = undefined;
      }
    },
    clearBackAction: (state) => {
      state.back.actionType = undefined;
      state.back.payload = undefined;
    },
    

    updateContainer: (state, action: PayloadAction<{ maxWidth: 'xs' | 'sm' | 'md' | 'lg' | 'xl' }>) => {
      state.container.maxWidth = action.payload.maxWidth;
    },
    
    updateSystemTheme: (state, action: PayloadAction<boolean>) => {
      if (state.theme.mode === 'system') {
        state.theme.isDark = action.payload;
      }
    },
    
    // Sidebar Actions
    toggleSidebar: (state) => {
      state.sidebar.isOpen = !state.sidebar.isOpen;
    },
    
    setSidebarOpen: (state, action: PayloadAction<boolean>) => {
      state.sidebar.isOpen = action.payload;
    },
    
    toggleSidebarCollapsed: (state) => {
      state.sidebar.isCollapsed = !state.sidebar.isCollapsed;
    },
    
    setSidebarActiveItem: (state, action: PayloadAction<string>) => {
      state.sidebar.activeItem = action.payload;
    },
    
    // Modal Actions
    openModal: (state, action: PayloadAction<string>) => {
      if (!state.modals.activeModals.includes(action.payload)) {
        state.modals.activeModals.push(action.payload);
        state.modals.isAnyOpen = true;
      }
    },
    
    closeModal: (state, action: PayloadAction<string>) => {
      state.modals.activeModals = state.modals.activeModals.filter(
        modal => modal !== action.payload
      );
      state.modals.isAnyOpen = state.modals.activeModals.length > 0;
    },
    
    closeAllModals: (state) => {
      state.modals.activeModals = [];
      state.modals.isAnyOpen = false;
    },
    
    // Notification Actions
    showNotification: (state, action: PayloadAction<{
      type: 'success' | 'error' | 'warning' | 'info';
      message: string;
      duration?: number;
    }>) => {
      state.notifications.isVisible = true;
      state.notifications.type = action.payload.type;
      state.notifications.message = action.payload.message;
      if (action.payload.duration) {
        state.notifications.duration = action.payload.duration;
      }
    },
    
    hideNotification: (state) => {
      state.notifications.isVisible = false;
    },
    
    // Loading Actions
    setGlobalLoading: (state, action: PayloadAction<boolean>) => {
      state.loading.isGlobalLoading = action.payload;
    },
    
    setLoadingState: (state, action: PayloadAction<{
      key: string;
      isLoading: boolean;
    }>) => {
      state.loading.loadingStates[action.payload.key] = action.payload.isLoading;
    },
    
    clearLoadingStates: (state) => {
      state.loading.loadingStates = {};
    },
    
    // Toast Actions
    addToast: (state, action: PayloadAction<{
      type: 'success' | 'error' | 'warning' | 'info';
      title: string;
      message?: string;
      duration?: number;
    }>) => {
      const id = Date.now().toString();
      const toast = {
        id,
        type: action.payload.type,
        title: action.payload.title,
        message: action.payload.message,
        duration: action.payload.duration || 5000,
        isVisible: true,
      };
      state.toasts.push(toast);
    },
    
    removeToast: (state, action: PayloadAction<string>) => {
      state.toasts = state.toasts.filter(toast => toast.id !== action.payload);
    },
    
    hideToast: (state, action: PayloadAction<string>) => {
      const toast = state.toasts.find(t => t.id === action.payload);
      if (toast) {
        toast.isVisible = false;
      }
    },
    
    // Drawer Actions
    openDrawer: (state, action: PayloadAction<{
      position?: 'left' | 'right' | 'top' | 'bottom';
      size?: 'sm' | 'md' | 'lg' | 'xl' | 'full';
    }>) => {
      state.drawer.isOpen = true;
      if (action.payload.position) {
        state.drawer.position = action.payload.position;
      }
      if (action.payload.size) {
        state.drawer.size = action.payload.size;
      }
    },
    
    closeDrawer: (state) => {
      state.drawer.isOpen = false;
    },
    
    // Search Actions
    openSearch: (state) => {
      state.search.isOpen = true;
    },
    
    closeSearch: (state) => {
      state.search.isOpen = false;
      state.search.query = '';
      state.search.results = [];
    },
    
    setSearchQuery: (state, action: PayloadAction<string>) => {
      state.search.query = action.payload;
    },
    
    setSearchResults: (state, action: PayloadAction<any[]>) => {
      state.search.results = action.payload;
    },
    
    setSearching: (state, action: PayloadAction<boolean>) => {
      state.search.isSearching = action.payload;
    },
    
    // Filter Actions
    toggleFilters: (state) => {
      state.filters.isVisible = !state.filters.isVisible;
    },
    
    setFilter: (state, action: PayloadAction<{
      key: string;
      value: any;
    }>) => {
      state.filters.activeFilters[action.payload.key] = action.payload.value;
    },
    
    clearFilter: (state, action: PayloadAction<string>) => {
      delete state.filters.activeFilters[action.payload];
    },
    
    clearAllFilters: (state) => {
      state.filters.activeFilters = {};
    },
    
    // Pagination Actions
    setCurrentPage: (state, action: PayloadAction<number>) => {
      state.pagination.currentPage = action.payload;
    },
    
    setPageSize: (state, action: PayloadAction<number>) => {
      state.pagination.pageSize = action.payload;
      state.pagination.currentPage = 1; // Reset to first page
    },
    
    setTotalItems: (state, action: PayloadAction<number>) => {
      state.pagination.totalItems = action.payload;
    },
    
    // Sort Actions
    setSort: (state, action: PayloadAction<{
      field: string;
      direction: 'asc' | 'desc';
    }>) => {
      state.sort.field = action.payload.field;
      state.sort.direction = action.payload.direction;
    },
    
    toggleSort: (state, action: PayloadAction<string>) => {
      if (state.sort.field === action.payload) {
        state.sort.direction = state.sort.direction === 'asc' ? 'desc' : 'asc';
      } else {
        state.sort.field = action.payload;
        state.sort.direction = 'asc';
      }
    },
    
    // View Mode Actions
    setViewMode: (state, action: PayloadAction<'grid' | 'list' | 'table' | 'card'>) => {
      state.viewMode = action.payload;
    },
    
    // Locale Actions
    setLanguage: (state, action: PayloadAction<string>) => {
      state.locale.language = action.payload;
    },
    
    setDirection: (state, action: PayloadAction<'ltr' | 'rtl'>) => {
      state.locale.direction = action.payload;
    },
    
    setCurrency: (state, action: PayloadAction<string>) => {
      state.locale.currency = action.payload;
    },
    
    setTimezone: (state, action: PayloadAction<string>) => {
      state.locale.timezone = action.payload;
    },
    
    // Accessibility Actions
    toggleHighContrast: (state) => {
      state.accessibility.highContrast = !state.accessibility.highContrast;
    },
    
    toggleReducedMotion: (state) => {
      state.accessibility.reducedMotion = !state.accessibility.reducedMotion;
    },
    
    setFontSize: (state, action: PayloadAction<'small' | 'medium' | 'large'>) => {
      state.accessibility.fontSize = action.payload;
    },
    
    toggleScreenReader: (state) => {
      state.accessibility.screenReader = !state.accessibility.screenReader;
    },
    
    // Responsive Actions
    updateResponsive: (state, action: PayloadAction<{
      isMobile: boolean;
      isTablet: boolean;
      isDesktop: boolean;
      breakpoint: string;
    }>) => {
      state.responsive = action.payload;
    },
    
    // Reset Actions
    resetUI: (state) => {
      return { ...initialState, theme: state.theme }; // Keep theme preference
    },
    
    resetTheme: (state) => {
      state.theme = initialState.theme;
    },
  },
});

// Export actions
export const {
  // Theme
  setThemeMode,
  toggleTheme,
  updateSystemTheme,

  // Back
  setBackAction,
  clearBackAction,

  // Container
  updateContainer,
  
  // Sidebar
  toggleSidebar,
  setSidebarOpen,
  toggleSidebarCollapsed,
  setSidebarActiveItem,
  
  // Modals
  openModal,
  closeModal,
  closeAllModals,
  
  // Notifications
  showNotification,
  hideNotification,
  
  // Loading
  setGlobalLoading,
  setLoadingState,
  clearLoadingStates,
  
  // Toasts
  addToast,
  removeToast,
  hideToast,
  
  // Drawer
  openDrawer,
  closeDrawer,
  
  // Search
  openSearch,
  closeSearch,
  setSearchQuery,
  setSearchResults,
  setSearching,
  
  // Filters
  toggleFilters,
  setFilter,
  clearFilter,
  clearAllFilters,
  
  // Pagination
  setCurrentPage,
  setPageSize,
  setTotalItems,
  
  // Sort
  setSort,
  toggleSort,
  
  // View Mode
  setViewMode,
  
  // Locale
  setLanguage,
  setDirection,
  setCurrency,
  setTimezone,
  
  // Accessibility
  toggleHighContrast,
  toggleReducedMotion,
  setFontSize,
  toggleScreenReader,
  
  // Responsive
  updateResponsive,
  
  // Reset
  resetUI,
  resetTheme,

} = uiSlice.actions;

// Export reducer
export default uiSlice.reducer;

// Export selectors
export const selectTheme = (state: { ui: UIState }) => state.ui.theme;
export const selectThemeMode = (state: { ui: UIState }) => state.ui.theme.mode;
export const selectIsDark = (state: { ui: UIState }) => state.ui.theme.isDark;

export const selectContainer = (state: { ui: UIState }) => state.ui.container;
export const selectContainerMaxWidth = (state: { ui: UIState }) => state.ui.container.maxWidth;

export const selectSidebar = (state: { ui: UIState }) => state.ui.sidebar;
export const selectSidebarOpen = (state: { ui: UIState }) => state.ui.sidebar.isOpen;
export const selectSidebarCollapsed = (state: { ui: UIState }) => state.ui.sidebar.isCollapsed;

export const selectModals = (state: { ui: UIState }) => state.ui.modals;
export const selectIsAnyModalOpen = (state: { ui: UIState }) => state.ui.modals.isAnyOpen;

export const selectNotifications = (state: { ui: UIState }) => state.ui.notifications;

export const selectLoading = (state: { ui: UIState }) => state.ui.loading;
export const selectGlobalLoading = (state: { ui: UIState }) => state.ui.loading.isGlobalLoading;

export const selectToasts = (state: { ui: UIState }) => state.ui.toasts;

export const selectDrawer = (state: { ui: UIState }) => state.ui.drawer;

export const selectSearch = (state: { ui: UIState }) => state.ui.search;

export const selectFilters = (state: { ui: UIState }) => state.ui.filters;

export const selectPagination = (state: { ui: UIState }) => state.ui.pagination;

export const selectSort = (state: { ui: UIState }) => state.ui.sort;

export const selectViewMode = (state: { ui: UIState }) => state.ui.viewMode;

export const selectLocale = (state: { ui: UIState }) => state.ui.locale;

export const selectAccessibility = (state: { ui: UIState }) => state.ui.accessibility;

export const selectResponsive = (state: { ui: UIState }) => state.ui.responsive; 