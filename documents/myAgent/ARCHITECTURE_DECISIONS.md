# Bajet PWA - Architecture Decisions & Implementation Guide

## 🚨 **MANDATORY RULE FOR AI ASSISTANT**
**BEFORE making ANY architectural decisions or implementing ANY features, the AI assistant MUST:**
1. **READ this entire document first**
2. **FOLLOW all established patterns exactly**
3. **REFERENCE the key files mentioned**
4. **MAINTAIN consistency with our decisions**
5. **NOT suggest approaches that contradict our architecture**

**This document is the single source of truth for all project decisions.**

---

## 📋 **Project Overview**
**Bajet PWA** is a Next.js 15 banking application with complex feature journeys, state management, and a design system.

---

## 🏗️ **Core Architecture Decisions**

### **1. State-Based Screen Management (NOT Route-Based)**
**Decision**: Use Redux state to control which screen is displayed instead of creating routes for every screen.

**Why This Approach:**
- ✅ **Single URL** - User stays on `/cheque` throughout the journey
- ✅ **Better UX** - No page reloads, smooth transitions
- ✅ **Easier State Persistence** - All journey data stays in Redux
- ✅ **Simpler Navigation** - Just change state, not URL structure
- ✅ **Better for Mobile** - Feels like a native app experience

**Example Journey Flow:**
```
/cheque (URL stays the same)
├── Start Screen (state: 'start')
├── Bank Selection (state: 'bank-selection') 
├── Document Upload (state: 'document-upload')
├── Verification (state: 'verification')
└── Confirmation (state: 'confirmation')
```

### **2. Redux as Single Source of Truth**
**Decision**: Redux handles ALL application state, including:
- Journey state (current step, progress, data)
- Screen state (what to display, loading states, errors)
- Form data (user inputs across all steps)
- Navigation logic (can go next/back, validation)
- API state (loading, success, error states)

---

## 🎨 **Design System Decisions**

### **3. CSS Variables from theme.scss (NOT semanticColors)**
**Decision**: Use CSS variables from `src/shared/theme/theme.scss` instead of JavaScript semanticColors.

**CSS Variables Used:**
```scss
// Colors
--color-primary, --color-text-secondary, --color-card, --color-border
--color-background, --color-secondary, --color-error

// Spacing
--spacing-1 (4px), --spacing-2 (8px), --spacing-4 (16px)
--spacing-6 (24px), --spacing-8 (32px), --spacing-12 (48px), --spacing-16 (64px)

// Typography
--font-size-sm (14px), --font-size-lg (18px), --font-size-xl (20px)
--font-weight-normal (400), --font-weight-bold (700)

// Shadows & Borders
--shadow-md, --radius-lg (12px)
```

### **4. Shared Components First, Then HTML**
**Decision**: Always check if we have a shared component first, only use HTML when no component exists.

**Component Hierarchy:**
```
MainLayout (hasThemeToggle: true)
├── Header (hasThemeToggle: true)
│   ├── Theme Toggle Button (sun/moon icon)
│   ├── Back Button
│   ├── Title
│   └── Support Button
└── Content
    ├── Helper Text (HTML div - no component needed)
    ├── Card Component (our shared component)
    │   ├── Typography Component (our shared component)
    │   └── SVG icons (HTML - no component needed)
    └── Card Component (our shared component)
        ├── Typography Component (our shared component)
        └── SVG icons (HTML - no component needed)
```

---

## 📁 **Project Structure**

### **Directory Organization:**
```
src/
├── app/                    # Next.js App Router pages
├── features/              # Feature-based modules
│   ├── cheque/           # Cheque feature
│   ├── auth/             # Authentication
│   ├── loan/             # Loan feature
│   ├── card/             # Card feature
│   └── ...
├── shared/               # Shared components & utilities
│   ├── components/       # Reusable components
│   ├── theme/           # Design system
│   ├── utils/           # Utility functions
│   └── ...
├── store/               # Redux store & slices
├── styles/              # Global styles
└── types/               # TypeScript types
```

### **Image Asset Structure:**
```
public/images/
├── logos/               # Company & bank logos
├── cards/               # Card images
├── icons/               # UI icons
├── backgrounds/         # Background patterns
├── avatars/            # User avatars
├── banners/            # Marketing banners
└── illustrations/      # Feature illustrations
```

---

## 🔧 **Technical Implementation Rules**

### **5. Component Creation Rules:**
1. **Always check shared components first**
2. **Use our Typography component** for all text
3. **Use our Card component** for containers
4. **Use CSS variables** from theme.scss
5. **Only use HTML when no component exists**

### **6. State Management Rules:**
1. **Redux handles ALL state** - no local component state for business logic
2. **Journey state** controls which screen is displayed
3. **Screen state** controls loading, errors, success states
4. **Form data** persists across screen changes

### **7. Styling Rules:**
1. **Use CSS variables** from theme.scss
2. **No hardcoded colors** - use `var(--color-primary)`
3. **No hardcoded spacing** - use `var(--spacing-4)`
4. **Responsive design** using Material-UI breakpoints

---

## 🚀 **Feature Implementation Pattern**

### **Standard Feature Structure:**
```typescript
// features/cheque/
├── components/
│   ├── ChequeJourney.tsx     # Main container (switches screens)
│   ├── screens/              # Individual screen components
│   │   ├── StartScreen.tsx
│   │   ├── BankSelectionScreen.tsx
│   │   └── ...
│   └── navigation/           # Journey navigation components
├── store/
│   └── chequeSlice.ts        # Feature-specific Redux slice
└── types/
    └── cheque.types.ts       # Feature TypeScript types
```

### **Screen Component Pattern:**
```typescript
export default function SomeScreen() {
  const { currentScreen, canGoNext } = useSelector(selectJourney);
  
  return (
    <MainLayout title="Screen Title" hasBack hasSupport hasThemeToggle>
      {/* Screen content using shared components */}
      <Card variant="outlined" padding="md">
        <Typography variant="h6" weight="medium">
          Screen Title
        </Typography>
        {/* Screen-specific content */}
      </Card>
    </MainLayout>
  );
}
```

---

## 📱 **Navigation & UX Patterns**

### **8. Header Configuration:**
- **hasBack**: Show back button (default: true)
- **hasSupport**: Show support button (default: true)
- **hasThemeToggle**: Show theme toggle (default: true)
- **hasLogo**: Show Bajet logo (default: false)
- **hasNotif**: Show notifications (default: false)
- **hasProfile**: Show user profile (default: false)

### **9. Journey Navigation:**
- **Progress indicator** showing current step
- **Navigation buttons** (Back/Next) based on state
- **Validation** prevents moving to next step
- **Auto-save** form data between steps

---

## 🎯 **Current Implementation Status**

### **✅ Completed:**
- Basic project structure
- Shared components (Typography, Card, Header, MainLayout)
- Theme system with CSS variables
- Basic cheque feature with start screen
- Redux store with UI slice
- Image asset organization

### **🔄 Next Steps:**
1. Implement journey state management in Redux
2. Create screen state management
3. Build cheque journey with multiple screens
4. Add form data persistence
5. Implement navigation between screens

---

## 📚 **Key Files to Reference:**

- **Theme**: `src/shared/theme/theme.scss`
- **Shared Components**: `src/shared/components/index.ts`
- **Redux Store**: `src/store/index.ts`
- **Fonts**: `src/shared/utils/fonts.ts`
- **Images**: `src/shared/utils/images.ts`

---

## ⚠️ **CRITICAL REMINDERS FOR AI ASSISTANT:**

1. **🚨 ALWAYS read this document first** before making ANY architectural decisions
2. **🚨 Follow the established patterns exactly** - don't reinvent the wheel
3. **🚨 Use shared components** before creating new ones
4. **🚨 Use CSS variables** from theme.scss
5. **🚨 Redux handles ALL state** - no local component state for business logic
6. **🚨 State-based screen management** - not route-based
7. **🚨 This document is MANDATORY** - ignore at your own risk!

---

*Last Updated: [Current Date]*
*Version: 1.0*
*AI Assistant Rule: MUST READ AND FOLLOW THIS DOCUMENT* 