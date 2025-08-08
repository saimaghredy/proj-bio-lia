# Biolia HTML/CSS Static Website

This folder contains the static HTML/CSS version of the Biolia Bio-Organic Solutions website, converted from the original React project.

## 📁 Files Structure

```
html-css-version/
├── index.html          # Home page
├── products.html       # Products page
├── contact.html        # Contact page
├── farmer-form.html    # Farmer support form
├── styles.css          # All CSS styles
├── script.js           # JavaScript functionality
└── README.md           # This file
```

## 🚀 Features Included

### ✅ **Complete Pages**
- **Home Page** - Hero section, product showcase, package kits, FAQ, resources
- **Products Page** - Individual products, stage guide, package kits, recommendations
- **Contact Page** - Contact information, downloadable resources, contact form
- **Farmer Form** - Multi-step form for farm consultation requests

### ✅ **Responsive Design**
- Mobile-first approach
- Responsive navigation with mobile menu
- Flexible grid layouts
- Optimized for all screen sizes

### ✅ **Interactive Features**
- Mobile menu toggle
- Multi-step farmer form with validation
- Form field toggles (Other options)
- Smooth scrolling
- Hover effects and animations
- Form validation

### ✅ **Styling**
- Custom CSS with CSS variables
- Gradient backgrounds
- Modern card designs
- Consistent color scheme
- Typography using Google Fonts
- Smooth transitions and animations

## 🎨 Design System

### **Colors**
- **Sage Green**: Primary brand colors (#7a9f56, #94b876, #b5cfa1)
- **Earth Tones**: Supporting colors (#d9d2c4, #e8e4db, #f2f0eb)
- **Forest Green**: Text and accents (#2a362a, #334133, #3d4f3d)

### **Typography**
- **Primary**: Plus Jakarta Sans (sans-serif)
- **Headings**: Merriweather (serif)
- **Responsive font sizes** using clamp()

### **Layout**
- **Container**: Max-width 1200px
- **Grid**: CSS Grid and Flexbox
- **Spacing**: Consistent rem-based spacing
- **Border Radius**: Rounded corners (0.5rem to 1.5rem)

## 📱 Responsive Breakpoints

- **Desktop**: 1024px+
- **Tablet**: 768px - 1023px
- **Mobile**: 320px - 767px

## 🔧 JavaScript Functionality

### **Navigation**
- Mobile menu toggle
- Smooth scrolling for anchor links
- Active page highlighting

### **Forms**
- Multi-step farmer form navigation
- Form validation (required fields, phone numbers, email)
- Dynamic field toggles for "Other" options
- Success/error messaging

### **Animations**
- Scroll-triggered fade-in animations
- Hover effects
- Loading states for buttons

## 🌐 Usage Instructions

### **Local Development**
1. Download all files to a folder
2. Open `index.html` in a web browser
3. Navigate between pages using the menu

### **Web Hosting**
1. Upload all files to your web server
2. Ensure `index.html` is in the root directory
3. All pages will work with relative links

### **Customization**
- **Colors**: Modify CSS variables in `:root` section of `styles.css`
- **Content**: Edit HTML files directly
- **Styling**: Update `styles.css`
- **Functionality**: Modify `script.js`

## 📋 Form Functionality

### **Contact Form**
- Name, mobile, email, occupation, company, message fields
- Client-side validation
- Custom occupation input when "Other" selected

### **Farmer Form**
- **Step 1**: Contact details (name, mobile, location)
- **Step 2**: Farm details (size, farming type, crops, soil, purpose)
- Multi-select checkboxes with "Other" options
- Form validation and progress indicators

## 🎯 Key Features

### **Product Showcase**
- Individual product cards with specifications
- Package kit bundles with popularity badges
- Stage-wise application guide
- Crop-specific recommendations

### **Interactive Elements**
- Downloadable resource cards
- FAQ sections
- Trust indicators with statistics
- Call-to-action buttons throughout

### **Performance Optimized**
- Minimal JavaScript dependencies
- Optimized CSS with efficient selectors
- Fast loading times
- SEO-friendly structure

## 🔗 External Dependencies

- **Google Fonts**: Plus Jakarta Sans & Merriweather
- **No JavaScript frameworks** - Pure vanilla JS
- **No CSS frameworks** - Custom CSS only

## 📞 Support

This static version maintains all the visual design and functionality of the original React project while being completely self-contained and easy to host on any web server.

For any questions about customization or deployment, refer to the CSS comments and JavaScript function documentation within the files.