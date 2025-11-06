# Design Guidelines: To-Do List Web Application

## Design Approach
**Selected Approach:** Design System - Drawing from productivity tools like Todoist, Things, and Microsoft To-Do
**Rationale:** Utility-focused application prioritizing clarity, efficiency, and task management ease

## Typography Hierarchy
- **App Title/Header:** Text-2xl to text-3xl, font-semibold
- **Task Text:** Text-base, font-normal
- **Input Placeholder:** Text-sm, font-normal
- **Empty State:** Text-lg, font-medium

**Font Stack:** System fonts via Tailwind's font-sans (Inter, SF Pro, Segoe UI)

## Layout System
**Container Structure:**
- Main container: max-w-2xl, centered with mx-auto
- Vertical padding: py-12 for desktop, py-8 for mobile
- Horizontal padding: px-4 consistent across viewports

**Spacing Primitives:** Use Tailwind units of 2, 4, 6, and 8
- Component gaps: gap-4
- Section spacing: space-y-6
- Button padding: px-6 py-3
- Input padding: px-4 py-3

## Component Library

### Header Section
- App title centered at top
- Subtle divider below (border-b with minimal thickness)
- Spacing: mb-8

### Task Input Area
- Full-width input field with rounded corners (rounded-lg)
- Submit button adjacent (inline or below on mobile)
- Form layout: flex on desktop, stacked on mobile
- Input height: h-12 for comfortable touch targets

### Task List Container
- Vertical stack with consistent spacing (space-y-3)
- Each task item as individual card with subtle elevation
- Rounded corners (rounded-lg) for modern feel
- Padding per item: p-4

### Task Item Components
**Structure per task:**
- Checkbox (left): Large, clickable target (w-5 h-5)
- Task text (center): Flex-grow, truncate on overflow
- Delete button (right): Icon-based, compact
- Layout: Flex row with items-center, justify-between

**Interactive States:**
- Completed tasks: Line-through text decoration, reduced opacity
- Hover state: Subtle elevation increase on entire task card
- Delete button: Only visible on hover (desktop) or always shown (mobile)

### Empty State
- Centered content with icon suggestion
- Encouraging message: "No tasks yet. Add one above!"
- Vertical centering: min-h-[400px] with flex center

## Component Specifications

### Buttons
- Primary (Add Task): Rounded-lg, px-6 py-3, font-medium
- Delete: Icon-only, rounded-md, p-2, transition on hover

### Input Fields
- Border: Solid 2px with rounded-lg
- Focus: Ring treatment (ring-2, ring-offset-2)
- Height: h-12 minimum for accessibility

### Icons
**Library:** Heroicons (via CDN)
- Checkbox: Check icon when completed
- Delete: Trash or X icon
- Empty state: Clipboard or document icon
- Icon size: w-5 h-5 standard

## Accessibility Features
- Checkbox inputs with proper labels (visually hidden if needed)
- Focus indicators on all interactive elements
- Minimum touch target: 44x44px
- Semantic HTML: `<ul>`, `<li>` for task list
- ARIA labels for icon-only buttons

## Animations
**Minimal, purposeful motion:**
- Task add: Fade-in from top (duration-300)
- Task delete: Fade-out with slight slide (duration-200)
- Checkbox toggle: Quick scale animation on check icon
- No complex scroll animations

## Responsive Behavior
**Mobile (< 768px):**
- Single column layout
- Input and button stack vertically
- Full-width components
- Increased touch targets

**Desktop (≥ 768px):**
- Input and button in same row
- Max-width constraint for optimal reading
- Hover states active

## Images
**No images required** - This is a utility application focused on text-based task management. Icon library provides all necessary visual elements.