<p align="center">
  <img src="./img.png" alt="Project Banner" width="100%">
</p>

#SMARTHAL!

## Basic Details

### Team Name: [MESH]

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



## Project Documentation

### For Software:

#### Screenshots (Add at least 3)

![Screenshot1](Add screenshot 1 here with proper name)
*Add caption explaining what this shows*

![Screenshot2](Add screenshot 2 here with proper name)
*Add caption explaining what this shows*

![Screenshot3](Add screenshot 3 here with proper name)
*Add caption explaining what this shows*

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

![Workflow](```
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
```)
*An intelligent meal planning system that creates a personalized, nutritionally balanced weekly menu based on individual health conditions. It avoids repetition using a smart gap rule, ensures proper food combinations, and includes breakfast, lunch, and dinner planning. The system also supports meal prep reminders, grocery management, leftover tracking, and easy weekly resets for a healthier and more organized lifestyle.*

---



#### Build Photos

![Team](Add photo of your team here)

![Components](Add photo of your components here)
*List out all components shown*

![Build](Add photos of build process here)
*Explain the build steps*

![Final](Add photo of final product here)
*Explain the final build*

---

## Additional Documentation

### For Web Projects with Backend:

#### API Documentation

**Base URL:** `https://api.yourproject.com`

##### Endpoints

**GET /api/endpoint**
- **Description:** [What it does]
- **Parameters:**
  - `param1` (string): [Description]
  - `param2` (integer): [Description]
- **Response:**
```json
{
  "status": "success",
  "data": {}
}
```

**POST /api/endpoint**
- **Description:** [What it does]
- **Request Body:**
```json
{
  "field1": "value1",
  "field2": "value2"
}
```
- **Response:**
```json
{
  "status": "success",
  "message": "Operation completed"
}
```

[Add more endpoints as needed...]

---

### For Mobile Apps:

#### App Flow Diagram

![App Flow](docs/app-flow.png)
*Explain the user flow through your application*

#### Installation Guide

**For Android (APK):**
1. Download the APK from [Release Link]
2. Enable "Install from Unknown Sources" in your device settings:
   - Go to Settings > Security
   - Enable "Unknown Sources"
3. Open the downloaded APK file
4. Follow the installation prompts
5. Open the app and enjoy!

**For iOS (IPA) - TestFlight:**
1. Download TestFlight from the App Store
2. Open this TestFlight link: [Your TestFlight Link]
3. Click "Install" or "Accept"
4. Wait for the app to install
5. Open the app from your home screen

**Building from Source:**
```bash
# For Android
flutter build apk
# or
./gradlew assembleDebug

# For iOS
flutter build ios
# or
xcodebuild -workspace App.xcworkspace -scheme App -configuration Debug
```

---





---

### For Scripts/CLI Tools:

#### Command Reference

**Basic Usage:**
```bash
python script.py [options] [arguments]
```

**Available Commands:**
- `command1 [args]` - Description of what command1 does
- `command2 [args]` - Description of what command2 does
- `command3 [args]` - Description of what command3 does

**Options:**
- `-h, --help` - Show help message and exit
- `-v, --verbose` - Enable verbose output
- `-o, --output FILE` - Specify output file path
- `-c, --config FILE` - Specify configuration file
- `--version` - Show version information

**Examples:**

```bash
# Example 1: Basic usage
python script.py input.txt

# Example 2: With verbose output
python script.py -v input.txt

# Example 3: Specify output file
python script.py -o output.txt input.txt

# Example 4: Using configuration
python script.py -c config.json --verbose input.txt
```

#### Demo Output

**Example 1: Basic Processing**

**Input:**
```
This is a sample input file
with multiple lines of text
for demonstration purposes
```

**Command:**
```bash
python script.py sample.txt
```

**Output:**
```
Processing: sample.txt
Lines processed: 3
Characters counted: 86
Status: Success
Output saved to: output.txt
```

**Example 2: Advanced Usage**

**Input:**
```json
{
  "name": "test",
  "value": 123
}
```

**Command:**
```bash
python script.py -v --format json data.json
```

**Output:**
```
[VERBOSE] Loading configuration...
[VERBOSE] Parsing JSON input...
[VERBOSE] Processing data...
{
  "status": "success",
  "processed": true,
  "result": {
    "name": "test",
    "value": 123,
    "timestamp": "2024-02-07T10:30:00"
  }
}
[VERBOSE] Operation completed in 0.23s
```

---

## Project Demo

### Video
[Add your demo video link here - YouTube, Google Drive, etc.]

*Explain what the video demonstrates - key features, user flow, technical highlights*

### Additional Demos
[Add any extra demo materials/links - Live site, APK download, online demo, etc.]

---

## AI Tools Used (Optional - For Transparency Bonus)

If you used AI tools during development, document them here for transparency:

**Tool Used:** [e.g., GitHub Copilot, v0.dev, Cursor, ChatGPT, Claude]

**Purpose:** [What you used it for]
- Example: "Generated boilerplate React components"
- Example: "Debugging assistance for async functions"
- Example: "Code review and optimization suggestions"

**Key Prompts Used:**
- "Create a REST API endpoint for user authentication"
- "Debug this async function that's causing race conditions"
- "Optimize this database query for better performance"

**Percentage of AI-generated code:** [Approximately X%]

**Human Contributions:**
- Architecture design and planning
- Custom business logic implementation
- Integration and testing
- UI/UX design decisions

*Note: Proper documentation of AI usage demonstrates transparency and earns bonus points in evaluation!*

---

## Team Contributions

- [Name 1]: [Specific contributions - e.g., Frontend development, API integration, etc.]
- [Name 2]: [Specific contributions - e.g., Backend development, Database design, etc.]
- [Name 3]: [Specific contributions - e.g., UI/UX design, Testing, Documentation, etc.]

---

## License

This project is licensed under the [LICENSE_NAME] License - see the [LICENSE](LICENSE) file for details.

**Common License Options:**
- MIT License (Permissive, widely used)
- Apache 2.0 (Permissive with patent grant)
- GPL v3 (Copyleft, requires derivative works to be open source)

---

Made with ❤️ at TinkerHub
