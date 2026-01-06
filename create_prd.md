# Product Requirements Document (PRD)
## Dhamma Visualizer - Interactive Buddhist Philosophy Learning Platform

---

## 1. Project Name
**Dhamma Visualizer V2** (6 Căn 6 Trần Interactive Learning Application)

---

## 2. Problem Statement

### Current Challenge
Buddhist teachings, particularly the concepts of the **Twelve Āyatana (12 Xứ)** and **Dependent Origination (12 Duyên Khởi)**, are abstract and difficult to grasp for learners. Traditional text-based resources make it challenging to:
- Visualize the interconnected relationships between concepts
- Understand the dynamic flow of dependent origination
- Apply meditation formulas to different sense bases
- See the breaking point in the cycle of suffering

### Solution
Create an interactive, visual web application that brings Buddhist philosophy to life through:
- Dynamic circular visualization of the 12 links of Dependent Origination
- Interactive formula builder for the 6 Internal Bases (Senses) and 6 External Bases (Objects)
- Real-time visualization of mindfulness intervention points
- Personalized learning with customizable formula ordering

---

## 3. User Stories

### Primary Users: Buddhist Practitioners & Students
- **As a meditation student**, I want to visualize how each sense base interacts with its corresponding objects, so I can understand the arising of consciousness and contact.
- **As a Dhamma teacher**, I want to demonstrate the breaking point in the cycle of suffering (Thọ → Ái transition), so students can see where mindfulness can interrupt the cycle.
- **As a learner**, I want to apply different meditation formulas to various sense bases, so I can customize my practice based on my current experience.
- **As a practitioner**, I want to see the forward and backward flow of dependent origination, so I can understand both how suffering arises and ceases.

### Secondary Users: Researchers & Educators
- **As a Buddhist scholar**, I want to reference authentic Pali scripture alongside visualizations, so I can verify the accuracy of teachings.
- **As an educator**, I want to save my preferred formula ordering, so I can create consistent lesson plans.

---

## 4. Core Features

### 4.1 Twelve Āyatana (12 Xứ) Module
**Purpose**: Interactive exploration of the 6 Internal Bases and 6 External Bases

#### Key Components:
1. **Sense Base Selector**
   - 6 sense organs with icons: Eye (Mắt), Ear (Tai), Nose (Mũi), Tongue (Lưỡi), Body (Thân), Mind (Ý)
   - Toggle between Internal (Căn) and External (Cảnh) bases
   - Dynamic content updates based on selection

2. **Formula Library (8 Meditation Formulas)**
   - **Tam Tướng** (Three Characteristics): Anicca → Dukkha → Anattā reasoning
   - **Ba Thời** (Three Times): Past, Present, Future contemplation
   - **Ưa Thích** (Delight & Suffering): Cause-effect of attachment
   - **Sanh Khởi** (Arising): Understanding emergence and cessation
   - **Không Tư Lường** (Not Conceiving): Removing mental fabrications
   - **Phải Bị** (Must Be...): Inevitable characteristics of conditioned phenomena
   - **Vị Ngọt** (Gratification, Danger, Escape): Three aspects analysis
   - **Lửa** (Fire Sermon): All is burning with greed, hatred, delusion

3. **Interactive Flowchart Builder**
   - Step-by-step visualization of each formula's logic
   - Color-coded node types: Input, Process, Wisdom, Danger, Result
   - Real-time content interpolation based on selected sense base
   - Dynamic text sizing and responsive layout

4. **Scripture Reference Panel**
   - Full Pali Canon references for each formula
   - Contextual scripture display based on selected sense + formula
   - Vietnamese translations included

5. **Customization Features**
   - Drag-and-drop formula reordering
   - Persistent storage of user preferences (localStorage)
   - Resizable panels (sidebar, scripture, flowchart) with min/max constraints
   - Visual drag indicators and hover states

### 4.2 Twelve Paṭicca-samuppāda (12 Duyên Khởi) Module
**Purpose**: Circular visualization of Dependent Origination cycle

#### Key Components:
1. **Circular Diagram**
   - 12 nodes representing the links: Avijjā → Saṅkhāra → Viññāṇa → ... → Jarāmaraṇa
   - Directional arrows showing forward causation
   - Visual "breaking point" between Vedanā (Thọ) and Taṇhā (Ái)

2. **Parallel Nodes System**
   - Three defilements at the Vedanā stage:
     - **Taṇhā** (Ái - Craving): From pleasant feelings
     - **Dosa** (Sân - Aversion): From unpleasant feelings
     - **Moha** (Si - Delusion): From neutral feelings
   - Multi-radius positioning for visual clarity

3. **Mindfulness Intervention Toggle**
   - Checkbox to activate "Thiết lập Chánh Niệm" (Establish Mindfulness)
   - Highlights the critical intervention points: Xúc (Contact), Thọ (Feeling), Ái (Craving)
   - Shows where practitioners can break the cycle

4. **Interactive Tooltips**
   - Hover to reveal descriptions for each link
   - Click to pin tooltip (especially for Vedanā node)
   - Shows Pali terms, Vietnamese names, and explanations

5. **Visual Feedback**
   - Broken lines indicating cessation path
   - Color-coded nodes by type (defilements vs neutral links)
   - Dynamic hover and click states

### 4.3 Navigation & State Management
1. **Main Menu Toggle**
   - Switch between 12 Xứ and 12 Duyên Khởi modules
   - Persistent state saved to localStorage
   - Gradient design with visual indicators

2. **Responsive Layout**
   - Mobile-friendly design with stacked controls
   - Desktop three-panel layout with resizable sections
   - Hidden scrollbars for clean interface

### 4.4 Data Persistence
- localStorage integration for:
  - Active menu selection
  - Formula ordering preferences
  - Panel width customizations
  - Last selected sense base and formula

---

## 5. Tech Stack

### Frontend
- **Framework**: React 19.2.0 with Hooks (useState, useEffect, useRef)
- **Build Tool**: Vite 7.2.4 (fast HMR, modern dev experience)
- **Styling**: Tailwind CSS 3.4.19 (utility-first, responsive design)
- **Icons**: Lucide React 0.562.0 (lightweight, customizable icons)
- **Language**: JavaScript (ES6+ modules)

### Development Tools
- **Linting**: ESLint 9.39.1 with React plugins
- **CSS Processing**: PostCSS 8.5.6 + Autoprefixer 10.4.23
- **Version Control**: Git/GitHub

### Deployment
- **Hosting**: GitHub Pages (gh-pages 6.3.0)
- **Build Output**: Static SPA (dist/)
- **Browser Compatibility**: Modern browsers (ES6+ support)

### Architecture Pattern
- **Component-Based**: Modular React components
- **State Management**: React Context + Local Storage
- **Styling Strategy**: Tailwind utility classes + custom CSS for animations
- **Data Flow**: Unidirectional (props down, events up)

---

## 6. Non-Functional Requirements

### 6.1 Performance
- **Initial Load Time**: < 2 seconds on 3G connection
- **Interaction Response**: < 100ms for UI updates
- **Bundle Size**: < 500KB (production build)
- **Lazy Loading**: Consider code-splitting for future expansion

### 6.2 Usability
- **Accessibility**: 
  - Keyboard navigation support
  - Semantic HTML structure
  - ARIA labels for interactive elements (to be improved)
- **Responsive Design**: 
  - Mobile (320px - 768px): Stacked layout
  - Tablet (768px - 1024px): Hybrid layout
  - Desktop (1024px+): Full three-panel layout
- **Visual Feedback**: Hover states, active indicators, smooth transitions

### 6.3 Localization
- **Primary Language**: Vietnamese
- **Pali Terms**: Included for authenticity
- **Future Consideration**: Multi-language support (English, Thai, etc.)

### 6.4 Browser Support
- **Target**: Chrome 90+, Firefox 88+, Safari 14+, Edge 90+
- **Progressive Enhancement**: Graceful degradation for older browsers

### 6.5 Reliability
- **Data Loss Prevention**: localStorage backup for all user preferences
- **Error Boundaries**: (To be implemented) Catch React errors gracefully
- **Offline Support**: (Future) Service Worker for offline access

### 6.6 Maintainability
- **Code Organization**: Separate components for each major feature
- **Naming Conventions**: Clear, descriptive component and variable names
- **Documentation**: Inline comments for complex logic
- **Testing**: (Future) Unit tests for core logic, E2E tests for critical paths

### 6.7 Security
- **XSS Prevention**: React's built-in escaping for user data
- **No Backend**: Client-side only, no server vulnerabilities
- **No PII Collection**: No user registration or data transmission

### 6.8 Scalability
- **Content Expansion**: Easily add new formulas or links
- **Module Addition**: Plugin architecture for future Dhamma concepts
- **Data Structure**: JSON-based formula definitions for easy updates

---

## 7. Design Specifications

### 7.1 Color System
- **Primary Blues**: `blue-50` to `blue-700` (Āyatana module)
- **Primary Indigos**: `indigo-50` to `indigo-700` (Paṭicca-samuppāda module)
- **Semantic Colors**:
  - Success/Wisdom: `emerald-50` to `emerald-800`
  - Danger/Warning: `red-500` to `orange-700`
  - Neutral: `slate-50` to `slate-800`
- **Formula-Specific**: Each formula has unique color theme (blue, indigo, rose, orange, violet, amber, red)

### 7.2 Typography
- **Base Font**: System sans-serif stack (font-sans)
- **Sizes**: 
  - Headers: `text-xl` (20px), `text-lg` (18px)
  - Body: `text-sm` (14px)
  - Labels: `text-xs` (12px)
- **Weights**: Regular (400), Medium (500), Bold (700)

### 7.3 Spacing & Layout
- **Container Padding**: `px-6 py-4` (24px horizontal, 16px vertical)
- **Gap Sizes**: `gap-2` to `gap-6` (8px to 24px)
- **Border Radius**: `rounded-lg` (8px), `rounded-xl` (12px)
- **Shadow Layers**: `shadow-sm`, `shadow-md` for depth

### 7.4 Interactive Elements
- **Buttons**: Rounded, with icons, hover scale effects
- **Toggles**: Custom checkbox styling with focus rings
- **Drag Handles**: Vertical grip icon with subtle hover effect
- **Resize Handles**: 6px invisible handle with visual feedback on hover

---

## 8. Success Metrics

### 8.1 User Engagement
- **Time on Site**: Average session > 5 minutes
- **Feature Usage**: > 70% users interact with both modules
- **Return Rate**: > 40% users return within 7 days

### 8.2 Educational Impact
- **Formula Exploration**: Average 4+ formulas explored per session
- **Sense Base Coverage**: Users explore at least 3 different sense bases
- **Mindfulness Feature**: > 50% activation rate for breaking cycle visualization

### 8.3 Technical Performance
- **Load Time**: < 2 seconds for 90th percentile
- **Error Rate**: < 0.5% of user sessions
- **Cross-browser Support**: > 95% compatibility across target browsers

### 8.4 User Satisfaction (Future Survey)
- **Ease of Use**: > 4.0/5.0 rating
- **Educational Value**: > 4.2/5.0 rating
- **Visual Clarity**: > 4.5/5.0 rating

---

## 9. Future Enhancements

### 9.1 Content Expansion
- Add more meditation suttas (Satipatthana, Four Noble Truths)
- Include audio guidance for each formula
- Animated transitions between dependent origination states

### 9.2 User Features
- User accounts with cloud sync
- Custom formula creation
- Sharing configuration via URL parameters
- Dark mode support

### 9.3 Educational Tools
- Progress tracking for students
- Quiz mode to test understanding
- Guided meditation timers
- Teacher dashboard for classroom use

### 9.4 Technical Improvements
- TypeScript migration for type safety
- Comprehensive test coverage
- Progressive Web App (PWA) with offline support
- Performance monitoring (Web Vitals)

### 9.5 Internationalization
- English translations
- Thai, Chinese, Japanese language packs
- RTL language support

---

## 10. Project Timeline (Retrospective)

### Phase 1: Core Infrastructure (Completed)
- ✅ Vite + React setup
- ✅ Tailwind CSS configuration
- ✅ Component structure planning

### Phase 2: Āyatana Module (Completed)
- ✅ Sense base selector
- ✅ Formula library implementation
- ✅ Interactive flowchart builder
- ✅ Scripture reference panel
- ✅ Drag-and-drop reordering
- ✅ Resizable panels

### Phase 3: Paṭicca-samuppāda Module (Completed)
- ✅ Circular diagram with 12 links
- ✅ Parallel nodes for three defilements
- ✅ Mindfulness intervention toggle
- ✅ Interactive tooltips
- ✅ Breaking cycle visualization

### Phase 4: Polish & Deployment (Completed)
- ✅ Responsive design refinement
- ✅ localStorage persistence
- ✅ GitHub Pages setup
- ✅ Performance optimization

### Phase 5: Future Iterations (Planned)
- 🔲 User testing & feedback collection
- 🔲 Accessibility improvements
- 🔲 Content expansion
- 🔲 Analytics integration

---

## 11. Appendix

### 11.1 Key Terms Glossary
- **Āyatana (Xứ)**: Sense base - internal (senses) and external (objects)
- **Paṭicca-samuppāda (Duyên Khởi)**: Dependent Origination - the 12-link chain of causation
- **Vedanā (Thọ)**: Feeling/sensation - the critical intervention point
- **Taṇhā (Ái)**: Craving - arises from pleasant feelings
- **Dosa (Sân)**: Aversion - arises from unpleasant feelings
- **Moha (Si)**: Delusion - arises from neutral feelings
- **Sati (Chánh Niệm)**: Mindfulness - the tool to break the cycle

### 11.2 File Structure
```
my-react-app/
├── public/                  # Static assets
├── src/
│   ├── main.jsx            # Application entry point
│   ├── App.jsx             # Main component with menu routing
│   ├── App.css             # Global styles
│   ├── index.css           # Tailwind imports
│   ├── components/
│   │   ├── TwelveAyatana.jsx      # 12 Xứ module (526 lines)
│   │   └── DuyenKhoiCircle.jsx    # 12 Duyên Khởi module (508 lines)
│   └── assets/             # Images, icons
├── index.html              # HTML template
├── package.json            # Dependencies
├── vite.config.js          # Vite configuration
├── tailwind.config.js      # Tailwind customization
├── postcss.config.js       # PostCSS plugins
└── eslint.config.js        # Linting rules
```

### 11.3 References
- **Saḷāyatana Saṃyutta** (SN 35): Collection on the Six Sense Bases
- **Nidāna Saṃyutta** (SN 12): Collection on Dependent Origination
- **Ādittapariyāya Sutta** (SN 35.28): The Fire Sermon
- **Paṭisambhidāmagga**: Path of Discrimination (analytical texts)

---

## Document Information
- **Version**: 1.0
- **Date**: January 2, 2026
- **Author**: Product Management Team
- **Status**: Living Document - Updated Post-Development
- **Next Review**: Upon user feedback collection

---

*This PRD captures the as-built state of Dhamma Visualizer V2 and provides a roadmap for future enhancements. The application successfully transforms abstract Buddhist concepts into an engaging, interactive learning experience.*
