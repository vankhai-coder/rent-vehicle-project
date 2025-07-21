# Responsive Design Guide - V5 Rental App

## Tổng quan

Dự án đã được cập nhật với responsive design hoàn chỉnh cho tất cả các thiết bị từ mobile đến desktop.

## Breakpoints được sử dụng

- **Mobile**: < 640px (sm)
- **Tablet**: 640px - 1024px (md)
- **Desktop**: > 1024px (lg)
- **Large Desktop**: > 1280px (xl)

## Components đã được responsive

### 1. Header Component (`/src/components/customer/Header.jsx`)

- **Mobile**: Menu hamburger với dropdown
- **Desktop**: Navigation ngang với tất cả links
- **Features**:
  - Mobile menu toggle với icon hamburger
  - Responsive avatar và user info
  - Adaptive button sizes
  - Mobile-friendly popover content

### 2. Home Page (`/src/pages/customer/Home.jsx`)

- **Hero Section**:
  - Mobile: Stacked layout (text + form)
  - Desktop: Side-by-side layout
- **Features Section**:
  - Mobile: Single column
  - Desktop: Three columns
- **Content Sections**: Responsive text sizes và spacing

### 3. MotobikeList Component (`/src/components/customer/MotobikeList.jsx`)

- **Grid Layout**:
  - Mobile: 1 column
  - Tablet: 2 columns
  - Desktop: 3 columns
- **Card Design**: Responsive padding và text sizes

### 4. Footer Component (`/src/components/customer/Footer.jsx`)

- Responsive height và padding
- Mobile-friendly spacing

### 5. FactInNumber Component (`/src/components/customer/FactInNumber.jsx`)

- **Grid Layout**:
  - Mobile: 2 columns
  - Desktop: 4 columns
- Responsive text sizes và icon sizes

### 6. DownloadApp Component (`/src/components/customer/DownLoadApp.jsx`)

- **Layout**:
  - Mobile: Stacked (text + images)
  - Desktop: Side-by-side
- Responsive image sizes và text

### 7. SearchDistrict Component (`/src/components/customer/SearchDistrict.jsx`)

- **Search Form**:
  - Mobile: Stacked input + button
  - Desktop: Inline layout
- Responsive text và spacing

### 8. Login Page (`/src/pages/customer/Login.jsx`)

- **Form Layout**: Responsive padding và spacing
- **OAuth Buttons**: Adaptive sizes cho mobile
- **Text Sizes**: Responsive typography

## CSS Utilities đã thêm

### Responsive Text Classes

```css
.text-responsive-xs    /* xs → sm → base */
/* xs → sm → base */
.text-responsive-sm    /* sm → base → lg */
.text-responsive-base  /* base → lg → xl */
.text-responsive-lg    /* lg → xl → 2xl */
.text-responsive-xl    /* xl → 2xl → 3xl */
.text-responsive-2xl; /* 2xl → 3xl → 4xl */
```

### Responsive Spacing Classes

```css
.space-responsive      /* space-y-4 → 6 → 8 */
/* space-y-4 → 6 → 8 */
.gap-responsive        /* gap-4 → 6 → 8 */
.p-responsive          /* p-4 → 6 → 8 */
.px-responsive         /* px-4 → 6 → 8 */
.py-responsive; /* py-4 → 6 → 8 */
```

### Responsive Layout Classes

```css
.grid-responsive       /* 1 → 2 → 3 → 4 cols */
/* 1 → 2 → 3 → 4 cols */
.flex-responsive       /* col → row */
.w-responsive          /* full → auto */
.h-responsive; /* auto → full */
```

## Mobile-First Features

### 1. Touch-Friendly Elements

- Minimum 44px touch targets cho buttons
- Font size 16px cho inputs (tránh zoom trên iOS)
- Adequate spacing giữa interactive elements

### 2. Performance Optimizations

- Smooth transitions cho responsive changes
- Optimized image loading
- Efficient CSS classes

### 3. Accessibility

- Proper contrast ratios
- Screen reader friendly
- Keyboard navigation support

## Testing Checklist

### Mobile (< 640px)

- [ ] Header menu hoạt động đúng
- [ ] Forms dễ sử dụng trên touch
- [ ] Text readable không cần zoom
- [ ] Buttons đủ lớn để touch
- [ ] Navigation intuitive

### Tablet (640px - 1024px)

- [ ] Layout adapts properly
- [ ] Grid systems work correctly
- [ ] Typography scales appropriately
- [ ] Interactive elements accessible

### Desktop (> 1024px)

- [ ] Full navigation visible
- [ ] Optimal use of screen space
- [ ] Hover states work
- [ ] Performance smooth

## Best Practices đã áp dụng

1. **Mobile-First Approach**: Bắt đầu với mobile, sau đó scale up
2. **Progressive Enhancement**: Core functionality works trên mọi device
3. **Flexible Grids**: Sử dụng CSS Grid và Flexbox
4. **Responsive Images**: Images scale properly
5. **Touch-Friendly**: Adequate touch targets
6. **Performance**: Optimized cho mobile networks

## Cách sử dụng Responsive Classes

### Trong Components

```jsx
// Responsive text
<h1 className="text-responsive-2xl">Title</h1>

// Responsive spacing
<div className="space-responsive">
  <div>Content 1</div>
  <div>Content 2</div>
</div>

// Responsive grid
<div className="grid-responsive gap-responsive">
  {items.map(item => <Card key={item.id} />)}
</div>

// Responsive flex
<div className="flex-responsive items-center">
  <div>Left content</div>
  <div>Right content</div>
</div>
```

### Custom Responsive Values

```jsx
// Tailwind responsive prefixes
<div className="w-full md:w-1/2 lg:w-1/3">
  Content
</div>

// Responsive padding
<div className="p-4 md:p-6 lg:p-8">
  Content
</div>
```

## Maintenance

### Khi thêm component mới

1. Sử dụng mobile-first approach
2. Test trên multiple screen sizes
3. Sử dụng responsive utilities classes
4. Đảm bảo touch-friendly trên mobile

### Khi update existing components

1. Maintain responsive behavior
2. Test trên mobile devices
3. Check performance impact
4. Update documentation nếu cần

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)
- Mobile browsers (iOS Safari, Chrome Mobile)

## Performance Notes

- CSS transitions được optimize cho smooth animations
- Images được optimize cho mobile loading
- Critical CSS được inline để improve First Paint
- Non-critical CSS được lazy loaded
