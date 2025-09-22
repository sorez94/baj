# Button Component

A comprehensive, accessible button component built with Material UI and full RTL support, designed specifically for the Bajet PWA application.

## Features

- **5 Material Design 3 Variants**: `filled`, `filled-tonal`, `outlined`, `text`, `elevated`
- **3 Sizes**: `sm`, `md`, `lg`
- **Loading State**: Built-in loading spinner with disabled state
- **Icon Support**: Left and right icons with RTL support
- **Auto-Circular**: Buttons automatically become circular when icon-only
- **Full Width**: Option to make buttons full width
- **Disabled State**: Proper disabled styling and behavior
- **RTL Support**: Full right-to-left language support
- **Theme Integration**: Uses CSS custom properties for theming
- **Accessibility**: Proper ARIA attributes and keyboard navigation

## Usage

### Basic Buttons

```tsx
import { Button } from '@/shared/components/Button';

// Primary button
<Button>Click me</Button>

// Button with variant
<Button variant="filled">Primary Action</Button>
<Button variant="outlined">Secondary Action</Button>
<Button variant="text">Text Button</Button>
```

### Icon Buttons

```tsx
// Icon-only buttons
<Button variant="icon" leftIcon={<PlusIcon />} />
<Button variant="icon" leftIcon={<SettingsIcon />} />
<Button variant="icon" leftIcon={<CloseIcon />} />

// Icon buttons with different variants
<Button variant="icon" variant="filled" leftIcon={<PlusIcon />} />
<Button variant="icon" variant="outlined" leftIcon={<SettingsIcon />} />
<Button variant="icon" variant="elevated" leftIcon={<CloseIcon />} />
```

### Buttons with Icons

```tsx
// Button with left icon
<Button leftIcon={<PlusIcon />}>Add Item</Button>

// Button with right icon
<Button rightIcon={<ArrowRightIcon />}>Continue</Button>

// Button with both icons
<Button leftIcon={<PlusIcon />} rightIcon={<ArrowRightIcon />}>
  Add and Continue
</Button>
```

## Loading State

The Button component includes a built-in loading state that shows a spinning indicator and disables the button:

```tsx
import { Button } from '@/shared/components/Button';

// Basic loading button
<Button loading>Loading...</Button>

// Loading with custom icon
<Button loading leftIcon={<PlusIcon />}>
  Add Item
</Button>

// Loading state with variant
<Button variant="filled" loading>
  Submit Form
</Button>
```

### Loading State Features

- **Spinning Indicator**: Shows a circular loading spinner in the start icon position
- **Disabled State**: Button is automatically disabled when loading
- **Visual Feedback**: Reduced opacity and cursor changes to indicate loading
- **Icon Replacement**: Loading spinner replaces the left icon when loading
- **RTL Support**: Loading spinner works correctly in right-to-left languages

### Disabled State

```tsx
// Disabled button
<Button disabled>Cannot Click</Button>

// Disabled with custom variant
<Button variant="success" disabled>Action Unavailable</Button>
```

### Full Width

```tsx
// Button that takes full container width
<Button fullWidth>Full Width Button</Button>
```

### RTL Support

The button automatically handles RTL layouts:

```tsx
// In RTL context (dir="rtl")
<div dir="rtl">
  <Button leftIcon={<HomeIcon />}>خانه</Button>
  {/* Icon appears on the right in RTL */}
</div>
```

## Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `variant` | `ButtonVariant` | `'primary'` | Visual style variant |
| `size` | `ButtonSize` | `'md'` | Button size |
| `shape` | `ButtonShape` | `'rounded'` | Border radius shape |
| `loading` | `boolean` | `false` | Shows loading spinner |
| `leftIcon` | `ReactNode` | `undefined` | Icon on left side |
| `rightIcon` | `ReactNode` | `undefined` | Icon on right side |
| `fullWidth` | `boolean` | `false` | Full container width |
| `disabled` | `boolean` | `false` | Disabled state |
| `children` | `ReactNode` | **required** | Button content |

## Button Variants

### Primary
- **Light Theme**: Blue background (`--color-primary-40`)
- **Dark Theme**: Light blue background (`--color-primary-80`)
- **Use Case**: Main actions, primary CTAs

### Secondary
- **Light Theme**: Green/Yellow background (`--color-secondary-40`)
- **Dark Theme**: Light green background (`--color-secondary-80`)
- **Use Case**: Secondary actions, alternative options

### Success
- **Light Theme**: Green background (`--color-success-40`)
- **Dark Theme**: Light green background (`--color-success-80`)
- **Use Case**: Confirmations, positive actions

### Error
- **Light Theme**: Red background (`--color-error-40`)
- **Dark Theme**: Light red background (`--color-error-80`)
- **Use Case**: Destructive actions, errors

### Warning
- **Light Theme**: Orange/Yellow background (`--color-warning-40`)
- **Dark Theme**: Light orange background (`--color-warning-80`)
- **Use Case**: Caution actions, warnings

### Outlined
- **Style**: Transparent background with colored border
- **Use Case**: Secondary importance actions

### Text
- **Style**: Transparent background, colored text only
- **Use Case**: Tertiary actions, minimal emphasis

### Ghost
- **Style**: Subtle background with surface colors
- **Use Case**: Background actions, subtle interactions

## Accessibility Features

- **Keyboard Navigation**: Tab, Enter, Space support
- **Focus Management**: Visible focus indicators
- **ARIA Labels**: Proper button semantics
- **Screen Reader Support**: Loading states announced
- **High Contrast**: Respects user contrast preferences

## Theme Integration

The button uses our custom CSS variables for consistent theming:

```scss
// Primary button colors
background-color: var(--color-primary-40);
color: var(--color-on-primary);

// Hover state
&:hover {
  background-color: var(--color-primary-30);
  box-shadow: var(--shadow-lg);
}

// Focus state
&:focus {
  outline: 2px solid var(--color-primary-40);
  outline-offset: 2px;
}
```

## Best Practices

1. **Use Primary for main actions** - Don't overuse primary buttons
2. **Consistent sizing** - Use the same size for related buttons
3. **Clear labeling** - Button text should clearly indicate the action
4. **Icon + Text** - Use icons to enhance understanding, not replace text
5. **Loading states** - Show loading for async operations
6. **RTL consideration** - Test in both LTR and RTL layouts

## Examples

### Form Actions
```tsx
<div style={{ display: 'flex', gap: '16px', justifyContent: 'flex-end' }}>
  <Button variant="outlined">Cancel</Button>
  <Button variant="primary">Save Changes</Button>
</div>
```

### Card Actions
```tsx
<Card>
  <CardContent>...</CardContent>
  <CardActions>
    <Button variant="text" size="sm">Learn More</Button>
    <Button variant="primary" size="sm">Get Started</Button>
  </CardActions>
</Card>
```

### Loading States
```tsx
const [isLoading, setIsLoading] = useState(false);

const handleSubmit = async () => {
  setIsLoading(true);
  try {
    await submitForm();
  } finally {
    setIsLoading(false);
  }
};

<Button loading={isLoading} onClick={handleSubmit}>
  {isLoading ? 'Submitting...' : 'Submit'}
</Button>
```

## Migration from Other Button Components

If you're migrating from other button components:

1. **Replace imports** with our Button component
2. **Map variants** to our supported variants
3. **Update icon props** to use `leftIcon`/`rightIcon`
4. **Test RTL layouts** to ensure proper icon positioning
5. **Verify accessibility** with screen readers

## Contributing

When adding new features to the Button component:

1. **Maintain consistency** with existing patterns
2. **Add proper TypeScript types** for new props
3. **Include RTL support** for new features
4. **Update documentation** and examples
5. **Test accessibility** with various tools 

## Icon Buttons

Icon buttons are circular buttons designed for icon-only content. They're perfect for compact UI elements like toolbars, navigation, or action buttons:

```tsx
import { Button } from '@/shared/components/Button';
import { PlusIcon, SettingsIcon, CloseIcon } from 'lucide-react';

// Basic icon button
<Button variant="icon" leftIcon={<PlusIcon />} />

// Icon button with different sizes
<Button variant="icon" size="sm" leftIcon={<SettingsIcon />} />
<Button variant="icon" size="lg" leftIcon={<CloseIcon />} />

// Icon button with variants
<Button variant="icon" leftIcon={<PlusIcon />} />
<Button variant="icon" variant="filled" leftIcon={<PlusIcon />} />
<Button variant="icon" variant="outlined" leftIcon={<PlusIcon />} />

// Icon button with loading state
<Button variant="icon" loading leftIcon={<PlusIcon />} />
```

### Icon Button Features

- **Circular Design**: Perfect circle shape for compact UI
- **Icon Only**: No text content, just the icon
- **Size Variants**: Small (32px), Medium (40px), Large (48px)
- **All Variants**: Can use any button variant (filled, outlined, etc.)
- **RTL Support**: Icons are properly centered in all languages
- **Loading State**: Loading spinner works in icon buttons 

## Icon-Only Buttons

Buttons automatically become circular when they only have an icon and no text content. This provides a clean, compact UI without needing a separate variant:

```tsx
import { Button } from '@/shared/components/Button';
import { PlusIcon, SettingsIcon, CloseIcon } from 'lucide-react';

// Icon-only buttons automatically become circular
<Button leftIcon={<PlusIcon />} />

// With different variants
<Button variant="filled" leftIcon={<PlusIcon />} />
<Button variant="outlined" leftIcon={<SettingsIcon />} />
<Button variant="text" leftIcon={<CloseIcon />} />

// With different sizes
<Button size="sm" leftIcon={<PlusIcon />} />
<Button size="lg" leftIcon={<PlusIcon />} />

// With loading state
<Button loading leftIcon={<PlusIcon />} />
```

### Auto-Circular Features

- **Automatic Detection**: Buttons detect when they only have icons and no text
- **Perfect Circle**: Automatically becomes circular with 50% border radius
- **Proper Sizing**: Width and height match the button size (32px, 40px, 48px)
- **Icon Centering**: Icons are perfectly centered in the circular button
- **All Variants**: Works with any button variant (filled, outlined, text, etc.)
- **RTL Support**: Maintains proper icon positioning in all languages 