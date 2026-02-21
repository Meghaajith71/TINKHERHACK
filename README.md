<p align="center">
  <img src="./img.png" alt="Project Banner" width="100%">
</p>

#SMARTHAL!

## Basic Details

### Team Name: MESH

### Team Members
- Member 1: Megha Ajith - College of Engineering, Kallooppara
- Member 2: Anju Prakash - College of Engineering, Kallooppara

### Hosted Project Link
https://meghaajith71.github.io/TINKHERHACK/

### Project Description
MealsReady is an intelligent weekly meal planning application that helps families plan balanced meals while respecting health conditions, managing grocery expiry dates, and organizing recipes. With automatic meal prep reminders and leftover tracking, it simplifies meal planning and reduces food waste

### The Problem statement
Families face multiple challenges in meal planning:
Difficulty planning nutritionally balanced meals for the entire week
Managing dietary restrictions due to health conditions
Tracking grocery items and their expiry dates to prevent wastage
Forgetting meal preparation steps resulting in last-minute stress
Managing leftover items efficiently

### The Solution
MealsReady solves these by:
Automatically generating intelligent 7-day menus respecting health conditions
Ensuring nutritional balance with daily nutrient tracking
Detecting and alerting for items expiring soon
Providing meal prep reminders before meals
Integrating leftovers into breakfast automatically with smart "Set" functionality
Storing recipes for future reference and planning
Supporting Traditional Festival Menu Mode

---

## Technical Details

### Technologies/Components Used

**For Software:**
- Languages used: HTML5, CSS3, JavaScript (Vanilla JS)
- Frameworks used: None (Pure Vanilla JavaScript)
- Libraries used: Browser APIs only (localStorage, DOM, Regex)
- Tools used: VS Code, Git, Local Server (Node.js / Python http-server)



## Features

List the key features of your project:
- Feature 1: **🗓️ Intelligent 7-Day Menu Generation**
Automatic weekly meal planning (Monday–Sunday)
Enforces 3-day minimum gap between repeated foods
Minimum 2 curries per lunch with no back-to-back repetition
Rice mandatory in lunch daily
Nutritional balance tracking per day
- Feature 2: - **💊 Health-Based Customization**
  - 5 personalized profiles: Diabetic, Anemia, Weight Loss, High Protein, Default
  - Food filtering based on selected health condition
  - Customized curry recommendations per item
  - Smart fallback system for menu generation
- Feature 3: - **🛒 Advanced Grocery Management**
  - Add grocery items with specific expiry dates
  - Automatic expiry date calculation (days until expiry)
  - Integration with meal plan for relevant items
  - Real-time expiry alerts in meal prep reminders
- Feature 4: - **♻️ Leftover Management System**
  - Add, edit, and delete leftover items
  - Integrated leftover manager with status indicators
  - Smart "Set" button to apply leftover to tomorrow's breakfast
  - Automatic curry pairing for leftover items
  - Preserves confirmed menu when setting leftovers
- Feature 5: - **⏰ Intelligent Meal Prep Alerts**
  - Batter preparation reminders for Idli/Dosa (rice + uzhunnu soaking)
  - Kadala curry soaking instructions
  - Protein marination alerts (Chicken/Fish)
  - Appam batter preparation reminders
  - Grocery expiry warnings (items expiring tomorrow)
  - Black and white popup notifications post-confirmation
- Feature 6: - **📖 Complete Recipe Management**
  - Add, edit, and delete recipes
  - Alphabetical recipe sorting
  - Quick search functionality
  - Store ingredients and preparation steps
  - Persistent recipe database
- Feature 7: - **📊 Nutritional Tracking**
  - Daily nutrient coverage display
  - Track: Carbohydrates, Protein, Fiber, Iron, Zinc, Vitamins A/C/K
  - Nutrient-based food selection algorithm
  - Visual nutrient summary for each day
 -Feature 8: -- **🎉 Festive Mode Support**
  - Onam special meal planning
  - Christmas festive menus
  - Ramadan meal options
  - Health-customized festive meals
---

## Implementation

### For Software:

#### Installation
```bash
npm install -g http-server
```

#### Run
```bash
http://localhost:8080/index.html
```




#### Screenshots (Add at least 3)

![Menu Generation](<img width="1898" height="831" alt="image" src="https://github.com/user-attachments/assets/ae1b00d1-eb4b-44e0-a7ad-8a7792f859f9" />
)
*Intelligent 7-day menu with nutritional balance, health customization, and curry variety*

![Health Customization](<img width="1903" height="841" alt="image" src="https://github.com/user-attachments/assets/591010cd-0e9b-44ae-9915-b0de9a9a25c2" />
)
*Select from 5 health conditions: Default, Diabetic, Anemia, Weight Loss, High Protein*

![Grocery Management](<img width="1910" height="831" alt="image" src="https://github.com/user-attachments/assets/6090b524-9b2e-43c9-93ad-577608cbc60c" />
)
*Grocery items adding*

![Grocery Management](<img width="1900" height="843" alt="image" src="https://github.com/user-attachments/assets/dcd9d304-7229-4700-ac78-ada73a2a18cf" />
)
*Track grocery items with price, quantity and expiry dates*

![Grocery Management](<img width="1906" height="828" alt="image" src="https://github.com/user-attachments/assets/7801cd5c-895b-44ff-a134-62a12569128e" />
)
*Track grocery items based on expiry dates*

![Leftover Manager](<img width="1903" height="827" alt="image" src="https://github.com/user-attachments/assets/fef1098e-d447-4312-9754-8f4dde0a025d" />
)
*Manage leftovers - Add, Edit, Delete, and Set for tomorrow's breakfast*

![Meal Prep Alerts](<img width="1901" height="831" alt="image" src="https://github.com/user-attachments/assets/f6de8a10-955c-41d6-b924-ffb8c0265646" />
)
*Black and white popup alerts for meal prep tasks and grocery expiry warnings*

![Recipe Database](<img width="1892" height="829" alt="image" src="https://github.com/user-attachments/assets/32896a83-b647-41f4-8fd6-718abd174a87" />
)
*Store, search, and manage recipes with ingredients and preparation steps*

#### Diagrams

**System Architecture:**

![Architecture Diagram](─────────────────────────────────────────────┐
│        MealsReady Application               │
├─────────────────────────────────────────────┤
│                                             │
│  ┌─────────────────────────────────────┐   │
│  │   User Interface (HTML)             │   │
│  │  - Sidebar Navigation               │   │
│  │  - Main Content Area                │   │
│  │  - Modal Popups                     │   │
│  └──────────────┬──────────────────────┘   │
│                 │                           │
│  ┌──────────────▼──────────────────────┐   │
│  │   Core Application Logic (JS)       │   │
│  │  - Menu Generation Engine           │   │
│  │  - Health Condition Mapping         │   │
│  │  - Leftover Management              │   │
│  │  - Grocery Tracking                 │   │
│  │  - Meal Prep Alerts                 │   │
│  │  - Recipe Manager                   │   │
│  └──────────────┬──────────────────────┘   │
│                 │                           │
│  ┌──────────────▼──────────────────────┐   │
│  │   Styling & Presentation (CSS)      │   │
│  │  - Responsive Design                │   │
│  │  - Color Scheme                     │   │
│  │  - Button Styling                   │   │
│  └──────────────┬──────────────────────┘   │
│                 │                           │
│  ┌──────────────▼──────────────────────┐   │
│  │   Data Persistence (localStorage)   │   │
│  │  - Profile Data                     │   │
│  │  - Confirmed Menu                   │   │
│  │  - Groceries List                   │   │
│  │  - Recipes Database                 │   │
│  │  - Leftovers List                   │   │
│  └─────────────────────────────────────┘   │
│                                             │
└─────────────────────────────────────────────┘)
*Explain your system architecture - components, data flow, tech stack interaction*

**Application Workflow:**

![Workflow]
START
  ↓
Create/Edit Profile
  ↓
Select Health Condition
  ↓
Generate 7-Day Menu
  ├─ Apply health restrictions
  ├─ Enforce 3-day gap rule
  ├─ Select nutritionally balanced foods
  ├─ Add 2 curries to lunch
  └─ Generate breakfast, lunch, dinner for 7 days
  ↓
Display Menu with Options
  ↓
Confirm Menu? 
  ├─ YES → Store in localStorage
  │       ↓
  │   Show Meal Prep Alerts (500ms delay)
  │       ↓
  │   Add Groceries
  │       ↓
  │   Add Leftovers (Optional)
  │       ↓
  │   Set Leftover (Optional)
  │       ↓
  │   Track Recipes
  │       ↓
  │   Next Week → Reset Menu
  │
  └─ NO → Regenerate Menu
*An intelligent meal planning system that creates a personalized, nutritionally balanced weekly menu based on individual health conditions. It avoids repetition using a smart gap rule, ensures proper food combinations, and includes breakfast, lunch, and dinner planning. The system also supports meal prep reminders, grocery management, leftover tracking, and easy weekly resets for a healthier and more organized lifestyle.*

---



## Team Contributions

- **Megha Ajith:** Frontend development, Menu generation algorithm, Health customization, UI design, Project documentation
- **Anju Prakash:** Grocery management system, Leftover manager, Meal prep alerts, Recipe database
- 
---

## License

This project is licensed under the [LICENSE_NAME] License - see the [LICENSE](LICENSE) file for details.

**Common License Options:**
- MIT License (Permissive, widely used)
- Apache 2.0 (Permissive with patent grant)
- GPL v3 (Copyleft, requires derivative works to be open source)

---

Made with ❤️ at TinkerHub
