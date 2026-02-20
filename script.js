// ================= WEEKLY MENU =================
let lastGeneratedMenuHtml = "";
const confirmedMenuKey = "confirmedMenu";

// Health Condition Mapping for Foods
const healthConditionFoodsMap = {
    "": { // No specific condition - all foods available
        breakfast: ["Dosa", "Idli", "Upma", "Oats", "Chappathi", "Appam", "Puttu"],
        lunch: ["Cabbage thoran", "Pappadam", "Fish curry", "Soya fry", "Chicken curry", "Aviyal", "Beans thoran"],
        dinner: ["Chappathi", "Kappa", "Sweet Potato", "Oats"],
        curry: ["Vegetable kuruma", "Chicken curry", "Egg curry", "Kadala curry", "Sambaar", "Fish curry"]
    },
    "Diabetic": {
        breakfast: ["Upma", "Oats", "Chappathi"],
        lunch: ["Cabbage thoran", "Soya fry", "Chicken curry", "Aviyal", "Beans thoran"],
        dinner: ["Chappathi", "Sweet Potato", "Oats"],
        curry: ["Vegetable kuruma", "Chicken curry", "Egg curry", "Kadala curry", "Sambaar"]
    },
    "Anemia": {
        breakfast: ["Oats", "Chappathi"],
        lunch: ["Cabbage thoran", "Soya fry", "Chicken curry", "Aviyal", "Beans thoran"],
        dinner: ["Sweet Potato", "Oats"],
        curry: ["Vegetable kuruma", "Chicken curry", "Egg curry", "Kadala curry", "Sambaar"]
    },
    "Weight Loss": {
        breakfast: ["Upma", "Oats", "Chappathi"],
        lunch: ["Cabbage thoran", "Soya fry", "Chicken curry", "Aviyal", "Beans thoran"],
        dinner: ["Chappathi", "Sweet Potato", "Oats"],
        curry: ["Vegetable kuruma", "Chicken curry", "Egg curry", "Kadala curry", "Sambaar"]
    },
    "High Protein": {
        breakfast: ["Oats", "Chappathi"],
        lunch: ["Soya fry", "Chicken curry", "Beans thoran"],
        dinner: ["Chappathi", "Oats"],
        curry: ["Chicken curry", "Egg curry", "Kadala curry", "Soya fry"]
    }
};

window.addEventListener("load", () => {
    localStorage.removeItem(confirmedMenuKey);
});

function getWeekKey(date) {
    const weekStart = new Date(date);
    const dayIndex = (weekStart.getDay() + 6) % 7; // Monday = 0
    weekStart.setDate(weekStart.getDate() - dayIndex);
    weekStart.setHours(0, 0, 0, 0);
    const year = weekStart.getFullYear();
    const month = String(weekStart.getMonth() + 1).padStart(2, "0");
    const day = String(weekStart.getDate()).padStart(2, "0");
    return `${year}-${month}-${day}`;
}

function getConfirmedMenu() {
    const data = JSON.parse(localStorage.getItem(confirmedMenuKey)) || null;
    return data && data.weekKey && data.menuHtml ? data : null;
}

function renderMenuWithConfirm(menuHtml, isConfirmed) {
    const buttonLabel = isConfirmed ? "Confirmed" : "Confirm Menu";
    const disabledAttr = isConfirmed ? "disabled" : "";
    const confirmButton = `
        <div style="text-align:center; margin-top:15px;">
            <button ${disabledAttr} onclick="confirmMenu()">${buttonLabel}</button>
            <div style="margin-top:8px;">
                <button onclick="resetMenu()">Reset Menu</button>
            </div>
        </div>
    `;
    
    // Get meal prep alerts and prepend to menu
    const alerts = getMealPrepAlerts();
    let alertsHtml = "";
    
    if (alerts.length > 0) {
        alertsHtml = `
            <div style="margin-bottom: 20px; padding: 15px; background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); border-radius: 12px; box-shadow: 0 4px 15px rgba(0,0,0,0.2);">
                <div style="text-align: center; margin-bottom: 15px;">
                    <h3 style="color: white; margin: 0; font-size: 18px;">⏰ Tomorrow's Meal Prep Reminders</h3>
                    <p style="color: rgba(255,255,255,0.9); margin: 5px 0 0 0; font-size: 12px;">Get ready for tomorrow's meals</p>
                </div>
                <div style="display: grid; gap: 12px;">
        `;
        
        alerts.forEach(alert => {
            alertsHtml += `
                <div style="background: rgba(255,255,255,0.95); padding: 12px; border-radius: 8px; border-left: 4px solid #FF6B6B;">
                    <div style="display: flex; align-items: center; gap: 10px;">
                        <span style="font-size: 24px;">${alert.icon}</span>
                        <div>
                            <p style="margin: 0; font-weight: bold; color: #333; font-size: 14px;">${alert.title}</p>
                            <p style="margin: 3px 0 0 0; color: #666; font-size: 13px;">${alert.message}</p>
                        </div>
                    </div>
                </div>
            `;
        });
        
        alertsHtml += `
                </div>
            </div>
        `;
    }
    
    document.getElementById("menuDisplay").innerHTML = alertsHtml + menuHtml + confirmButton;
}

function confirmMenu() {
    if (!lastGeneratedMenuHtml) {
        return;
    }
    const weekKey = getWeekKey(new Date());
    const payload = {
        weekKey,
        menuHtml: lastGeneratedMenuHtml
    };
    localStorage.setItem(confirmedMenuKey, JSON.stringify(payload));
    renderMenuWithConfirm(lastGeneratedMenuHtml, true);
    
    // Show meal prep alerts after a short delay
    setTimeout(() => {
        displayMealPrepAlertsAsPopup();
    }, 500);
}

function resetMenu() {
    localStorage.removeItem(confirmedMenuKey);
    lastGeneratedMenuHtml = "";
    generateMenu();
}

function generateMenu() {

    const days = ["MONDAY", "TUESDAY", "WEDNESDAY", "THURSDAY", "FRIDAY", "SATURDAY", "SUNDAY"];
    
    // Get user's health condition
    const profileData = JSON.parse(localStorage.getItem("profileData")) || {};
    const userHealthCondition = profileData.healthCondition || "";
    const healthFoods = healthConditionFoodsMap[userHealthCondition] || healthConditionFoodsMap[""];
    
    const breakfastItems = healthFoods.breakfast;
    const extraLunchItems = healthFoods.lunch;
    const dinnerItems = healthFoods.dinner;

    // Nutrition mapping for food items
    const nutrients = {
        "dosa": ["carbohydrates", "vitamin_a"],
        "idli": ["carbohydrates"],
        "upma": ["carbohydrates", "fibre"],
        "oats": ["carbohydrates", "fibre", "protein"],
        "chappathi": ["carbohydrates", "fibre"],
        "appam": ["carbohydrates"],
        "puttu": ["carbohydrates", "fibre"],
        "kappa": ["carbohydrates", "fibre"],
        "sweet potato": ["carbohydrates", "vitamin_a"],
        "vegetable kuruma": ["vitamin_a", "vitamin_c", "vitamin_k", "fibre"],
        "chicken curry": ["protein", "zinc"],
        "egg curry": ["protein", "zinc"],
        "kadala curry": ["protein", "iron", "fibre"],
        "sambaar": ["vitamin_a", "fibre"],
        "pappadam": ["protein"],
        "fish curry": ["protein", "zinc"],
        "cabbage thoran": ["vitamin_c", "fibre"],
        "soya fry": ["protein", "iron"],
        "aviyal": ["vitamin_a", "vitamin_c", "vitamin_k", "fibre"],
        "beans thoran": ["protein", "fibre"],
        "rice": ["carbohydrates"]
    };

    // Daily nutrition plan
    const dailyNutritionPlan = [
        ["carbohydrates", "vitamin_a", "vitamin_c"], // Monday
        ["carbohydrates", "protein", "iron"],        // Tuesday
        ["carbohydrates", "fibre", "vitamin_c"],     // Wednesday
        ["carbohydrates", "protein", "zinc"],        // Thursday
        ["carbohydrates", "vitamin_a", "fibre"],     // Friday
        ["carbohydrates", "protein", "vitamin_k"],   // Saturday
        ["carbohydrates", "fibre", "iron"]           // Sunday
    ];

    function getNutrients(item) {
        return nutrients[item.toLowerCase()] || [];
    }

    function hasNutrients(items, requiredNutrients) {
        const allNutrients = new Set();
        items.forEach(item => {
            getNutrients(item).forEach(nut => allNutrients.add(nut));
        });
        return requiredNutrients.every(nut => allNutrients.has(nut));
    }

    function normalizeKey(item) {
        return item.toLowerCase();
    }

    function isTooSoon(item, dayIndex, lastDayByItem) {
        const key = normalizeKey(item);
        const lastDay = lastDayByItem[key];
        return lastDay !== undefined && dayIndex - lastDay < 3;
    }

    function pickFromList(options, dayIndex, lastDayByItem) {
        const available = options.filter(item => !isTooSoon(item, dayIndex, lastDayByItem));
        const pool = available.length > 0 ? available : options;
        return pool[Math.floor(Math.random() * pool.length)];
    }

    function pickPreferred(options, dayIndex, lastDayByItem) {
        const available = options.find(item => !isTooSoon(item, dayIndex, lastDayByItem));
        return available || options[0];
    }

    const groceries = JSON.parse(localStorage.getItem("groceries")) || [];
    const today = new Date();
    const weekKey = getWeekKey(today);
    const confirmedMenu = getConfirmedMenu();

    if (confirmedMenu && confirmedMenu.weekKey === weekKey) {
        lastGeneratedMenuHtml = confirmedMenu.menuHtml;
        renderMenuWithConfirm(confirmedMenu.menuHtml, true);
        return;
    }

    if (confirmedMenu && confirmedMenu.weekKey !== weekKey) {
        localStorage.removeItem(confirmedMenuKey);
    }
    const todayMidnight = new Date(today);
    todayMidnight.setHours(0, 0, 0, 0);
    const expiringItems = groceries
        .filter(item => item.expiryDate)
        .map(item => {
            const expiryDate = new Date(item.expiryDate);
            const expiryMidnight = new Date(expiryDate);
            expiryMidnight.setHours(0, 0, 0, 0);
            const diffTime = expiryMidnight - todayMidnight;
            const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
            return { ...item, diffDays };
        })
        .filter(item => item.diffDays >= 0 && item.diffDays <= days.length - 1);

    let weeklyMenu = "";
    const lastDayByItem = {};

    // Add health condition header if selected
    if (userHealthCondition) {
        weeklyMenu = `<div style="text-align:center; background:rgba(76, 175, 80, 0.2); padding:15px; border-radius:10px; margin-bottom:20px;"><h3 style="color: #4CAF50; margin:0;">💊 Health-Customized Menu for: ${userHealthCondition}</h3></div>`;
    }

    days.forEach((day, dayIndex) => {
        const currentDate = new Date(today);
        currentDate.setDate(today.getDate() + dayIndex);
        const dateLabel = currentDate.toDateString();

        let breakfast = pickFromList(breakfastItems, dayIndex, lastDayByItem);
        let breakfastCurry = "";

        // Rule 1: Appam curry should be vegetable kuruma or chicken curry or egg curry
        if (breakfast === "Appam") {
            const appamCurries = ["Vegetable kuruma", "Chicken curry", "Egg curry"].filter(c => healthFoods.curry.includes(c));
            breakfastCurry = appamCurries.length > 0 ? pickFromList(appamCurries, dayIndex, lastDayByItem) : healthFoods.curry[0];
        }
        // Rule 3: Puttu curry should be pappadam or kadala curry or egg curry
        else if (breakfast === "Puttu") {
            const puttuCurries = ["Pappadam", "Kadala curry", "Egg curry"].filter(c => healthFoods.curry.includes(c));
            breakfastCurry = puttuCurries.length > 0 ? pickFromList(puttuCurries, dayIndex, lastDayByItem) : healthFoods.curry[0];
        }
        // For Chappathi, curry should not be Pappadam
        else if (breakfast === "Chappathi") {
            const chappathiCurries = ["Sambaar", "Vegetable kuruma", "Chicken curry", "Egg curry"].filter(c => healthFoods.curry.includes(c));
            breakfastCurry = chappathiCurries.length > 0 ? pickFromList(chappathiCurries, dayIndex, lastDayByItem) : healthFoods.curry[0];
        }
        // Default cases
        else if (breakfast === "Dosa" || breakfast === "Idli") {
            const sambarList = healthFoods.curry.includes("Sambaar") ? ["Sambaar"] : [healthFoods.curry[0]];
            breakfastCurry = pickFromList(sambarList, dayIndex, lastDayByItem);
        } else {
            const pappadamList = healthFoods.curry.includes("Pappadam") ? ["Pappadam"] : [healthFoods.curry[0]];
            breakfastCurry = pickFromList(pappadamList, dayIndex, lastDayByItem);
        }

        let lunch = [];
        if (!isTooSoon("Rice", dayIndex, lastDayByItem)) {
            lunch.push("Rice");
        }
        let breakfastExtras = [];
        let dinnerExtras = [];

        const requiredItems = expiringItems
            .filter(item => dayIndex <= item.diffDays)
            .map(item => item.name);

        // Add Sambaar or curry to lunch
        let sambaarinaAdded = false;
        if (breakfastCurry === "Sambaar") {
            if (!isTooSoon("Sambaar", dayIndex, lastDayByItem)) {
                lunch.push("Sambaar");
                sambaarinaAdded = true;
            }
        } else if (Math.random() > 0.5) {
            if (!isTooSoon("Sambaar", dayIndex, lastDayByItem)) {
                lunch.push("Sambaar");
                sambaarinaAdded = true;
            }
        }

        // Add lunch items to reach at least 2 food items
        let lunchItemsNeeded = 2;
        let addedCount = lunch.length;
        let attempts = 0;
        const maxAttempts = extraLunchItems.length * 2;

        while (addedCount < lunchItemsNeeded && attempts < maxAttempts) {
            const candidate = extraLunchItems[Math.floor(Math.random() * extraLunchItems.length)];
            const alreadyInLunch = lunch.some(item => item.toLowerCase() === candidate.toLowerCase());
            
            if (!alreadyInLunch) {
                const tooSoon = isTooSoon(candidate, dayIndex, lastDayByItem);
                
                if (!tooSoon) {
                    lunch.push(candidate);
                    addedCount++;
                }
            }
            attempts++;
        }

        // If still not enough items, add without checking "too soon" rule
        while (addedCount < lunchItemsNeeded && extraLunchItems.length > 0) {
            const candidate = extraLunchItems[Math.floor(Math.random() * extraLunchItems.length)];
            const alreadyInLunch = lunch.some(item => item.toLowerCase() === candidate.toLowerCase());
            
            if (!alreadyInLunch) {
                lunch.push(candidate);
                addedCount++;
            }
        }

        // Final fallback: ensure at least 2 items
        if (lunch.length < 2 && extraLunchItems.length > 0) {
            const fallbackItem = extraLunchItems[Math.floor(Math.random() * extraLunchItems.length)];
            if (!lunch.some(item => item.toLowerCase() === fallbackItem.toLowerCase())) {
                lunch.push(fallbackItem);
            }
        }

        requiredItems.forEach(itemName => {
            const itemKey = itemName.toLowerCase();
            const isMilk = itemKey === "Milk";

            if (isMilk) {
                // Milk should only be in breakfast or dinner, not lunch
                const alreadyInBreakfast = breakfastExtras.some(item => item.toLowerCase() === itemKey);
                const alreadyInDinner = dinnerExtras.some(item => item.toLowerCase() === itemKey);
                
                if (!alreadyInBreakfast && !alreadyInDinner && !isTooSoon(itemName, dayIndex, lastDayByItem)) {
                    // Alternate between breakfast and dinner
                    if (Math.random() > 0.5) {
                        breakfastExtras.push(itemName);
                    } else {
                        dinnerExtras.push(itemName);
                    }
                }
                return;
            }

            const exists = lunch.some(item => item.toLowerCase() === itemKey);
            const tooSoon = isTooSoon(itemName, dayIndex, lastDayByItem);

            if (!exists && !tooSoon) {
                lunch.push(itemName);
            }
        });

        // Ensure milk is never in lunch
        lunch = lunch.filter(item => item.toLowerCase() !== "milk");

        let dinnerOptions = dinnerItems;
        if (breakfastCurry === "Chicken curry" && isTooSoon("Chicken curry", dayIndex, lastDayByItem)) {
            const filtered = dinnerItems.filter(item => item !== "Chappathi" && item !== "Kappa");
            dinnerOptions = filtered.length > 0 ? filtered : dinnerItems;
        }
        let dinner = pickFromList(dinnerOptions, dayIndex, lastDayByItem);
        let dinnerCurry = "";

        // Rule 4: If breakfast contains chicken curry and if dinner contains chappathi or kappa then curry should be chicken curry
        if (breakfastCurry === "Chicken curry" && (dinner === "Chappathi" || dinner === "Kappa")) {
            dinnerCurry = healthFoods.curry.includes("Chicken curry") ? "Chicken curry" : healthFoods.curry[0];
        }
        // Rule 2: If breakfast contains chicken curry then lunch or dinner should alternatively contain chicken curry
        else if (breakfastCurry === "Chicken curry") {
            // If lunch doesn't have chicken curry, dinner can have it; otherwise use alternatives
            const hasChickenInLunch = lunch.includes("Chicken curry");
            const baseOptions = hasChickenInLunch
                ? ["Fish curry", "Egg curry", "Vegetable kuruma"]
                : ["Chicken curry", "Fish curry", "Egg curry", "Vegetable kuruma"];
            const options = baseOptions.filter(c => healthFoods.curry.includes(c));
            dinnerCurry = options.length > 0 ? pickPreferred(options, dayIndex, lastDayByItem) : healthFoods.curry[0];
        }
        // Default dinner curry logic
        else {
            const baseOptions = lunch.includes("Fish curry")
                ? ["Fish curry", "Egg curry"]
                : (dinner === "Chappathi" ? ["Egg curry", "Fish curry"] : ["Fish curry", "Egg curry"]);
            const options = baseOptions.filter(c => healthFoods.curry.includes(c));
            dinnerCurry = options.length > 0 ? pickPreferred(options, dayIndex, lastDayByItem) : healthFoods.curry[0];
        }

        const usedToday = new Set();
        const trackUsed = (item) => {
            if (!item) {
                return;
            }
            usedToday.add(normalizeKey(item));
        };

        trackUsed(breakfast);
        trackUsed(breakfastCurry);
        lunch.forEach(trackUsed);
        trackUsed(dinner);
        trackUsed(dinnerCurry);
        breakfastExtras.forEach(trackUsed);
        dinnerExtras.forEach(trackUsed);

        usedToday.forEach(key => {
            lastDayByItem[key] = dayIndex;
        });

        // Collect all day nutrients
        const dayNutrients = new Set();
        [breakfast, breakfastCurry].forEach(item => {
            getNutrients(item).forEach(nut => dayNutrients.add(nut));
        });
        lunch.forEach(item => {
            getNutrients(item).forEach(nut => dayNutrients.add(nut));
        });
        [dinner, dinnerCurry].forEach(item => {
            getNutrients(item).forEach(nut => dayNutrients.add(nut));
        });

        const dayNutrientsList = Array.from(dayNutrients).map(nut => nut.replace(/_/g, " ").toUpperCase()).join(", ");

        const breakfastDetails = breakfastExtras.length > 0
            ? `${breakfast} - ${breakfastCurry}, ${breakfastExtras.join(", ")}`
            : `${breakfast} - ${breakfastCurry}`;

        const dinnerDetails = dinnerExtras.length > 0
            ? `${dinner} - ${dinnerCurry}, ${dinnerExtras.join(", ")}`
            : `${dinner} - ${dinnerCurry}`;

        weeklyMenu += `
            <div style="margin-bottom:20px;">
                <h3>${day} - ${dateLabel}</h3>
                <p><strong>Breakfast:</strong> ${breakfastDetails}</p>
                <p><strong>Lunch:</strong> ${lunch.join(", ")}</p>
                <p><strong>Dinner:</strong> ${dinnerDetails}</p>
                <p style="color: #FFD700; font-size: 12px;"><strong>Nutrients:</strong> ${dayNutrientsList}</p>
            </div>
        `;
    });

    lastGeneratedMenuHtml = weeklyMenu;
    renderMenuWithConfirm(weeklyMenu, false);
}


// ================= RECIPE SECTION =================

function showRecipeOptions() {
    document.getElementById("menuDisplay").innerHTML = `
        <button onclick="showAddRecipe()">Add Recipe</button>
        <button onclick="viewRecipes()">View Recipes</button>
    `;
}


// -------- Add Recipe --------
function showAddRecipe(editIndex = null) {

    let recipe = { name: "", ingredients: "", steps: "" };

    if (editIndex !== null) {
        let recipes = JSON.parse(localStorage.getItem("recipes")) || [];
        recipe = recipes[editIndex];
    }

    document.getElementById("menuDisplay").innerHTML = `
        <form onsubmit="saveRecipe(event, ${editIndex})">
            <input type="text" id="recipeName" placeholder="Recipe Name" value="${recipe.name}" required>
            <textarea id="ingredients" placeholder="Ingredients" required>${recipe.ingredients}</textarea>
            <textarea id="steps" placeholder="Preparation Steps" required>${recipe.steps}</textarea>
            <button type="submit">${editIndex !== null ? "Update" : "Save"} Recipe</button>
        </form>
    `;
}


// -------- Save / Update --------
function saveRecipe(event, editIndex) {
    event.preventDefault();

    const name = document.getElementById("recipeName").value;
    const ingredients = document.getElementById("ingredients").value;
    const steps = document.getElementById("steps").value;

    let recipes = JSON.parse(localStorage.getItem("recipes")) || [];

    if (editIndex !== null && editIndex !== undefined) {
        recipes[editIndex] = { name, ingredients, steps };
    } else {
        recipes.push({ name, ingredients, steps });
    }

    localStorage.setItem("recipes", JSON.stringify(recipes));

    viewRecipes();
}


// -------- View Recipes (Alphabetical + Click to View) --------
function viewRecipes() {

    let recipes = JSON.parse(localStorage.getItem("recipes")) || [];

    if (recipes.length === 0) {
        document.getElementById("menuDisplay").innerHTML = "<p>No recipes added yet.</p>";
        return;
    }

    // Sort alphabetically
    recipes.sort((a, b) => a.name.localeCompare(b.name));

    let output = `
        <input type="text" class="searchBox" placeholder="Search recipe..." onkeyup="searchRecipe(this.value)">
        <div id="recipeList"></div>
    `;

    document.getElementById("menuDisplay").innerHTML = output;

    displayRecipeNames(recipes);
}


// -------- Display Only Names --------
function displayRecipeNames(recipes) {

    let listHTML = "";

    recipes.forEach((recipe, index) => {
        listHTML += `
            <div class="recipe-name" onclick="showFullRecipe('${recipe.name}')">
                ${recipe.name}
            </div>
        `;
    });

    document.getElementById("recipeList").innerHTML = listHTML;
}


function editRecipeByName(name) {
    let recipes = JSON.parse(localStorage.getItem("recipes")) || [];
    const index = recipes.findIndex(r => r.name === name);

    if (index === -1) {
        document.getElementById("menuDisplay").innerHTML = "<p>Recipe not found.</p>";
        return;
    }

    showAddRecipe(index);
}


function deleteRecipeByName(name) {
    let recipes = JSON.parse(localStorage.getItem("recipes")) || [];
    const index = recipes.findIndex(r => r.name === name);

    if (index === -1) {
        document.getElementById("menuDisplay").innerHTML = "<p>Recipe not found.</p>";
        return;
    }

    recipes.splice(index, 1);
    localStorage.setItem("recipes", JSON.stringify(recipes));
    viewRecipes();
}


// -------- Show Full Recipe --------
function showFullRecipe(name) {

    let recipes = JSON.parse(localStorage.getItem("recipes")) || [];

    let recipe = recipes.find(r => r.name === name);

    document.getElementById("menuDisplay").innerHTML = `
        <button onclick="viewRecipes()">BACK</button>
        <div style="margin-top:15px;">
            <h2>${recipe.name}</h2>
            <p><strong>Ingredients:</strong> ${recipe.ingredients}</p>
            <p><strong>Steps:</strong> ${recipe.steps}</p>
            <div style="margin-top:15px;">
                <button onclick="editRecipeByName('${recipe.name}')">Edit</button>
                <button onclick="deleteRecipeByName('${recipe.name}')">Delete</button>
            </div>
        </div>
    `;
}


// -------- Search --------
function searchRecipe(query) {

    let recipes = JSON.parse(localStorage.getItem("recipes")) || [];

    recipes = recipes
        .filter(recipe => recipe.name.toLowerCase().includes(query.toLowerCase()))
        .sort((a, b) => a.name.localeCompare(b.name));

    displayRecipeNames(recipes);
}
function goToGroceries() {
    window.location.href = "groceries.html";
}


// ================= MEAL PREP ALERTS =================

function getMealPrepAlerts() {
    const confirmedMenu = getConfirmedMenu();
    
    if (!confirmedMenu || !confirmedMenu.menuHtml) {
        return [];
    }

    const alerts = [];
    
    // Extract tomorrow's breakfast from the menu HTML
    const menuHtml = confirmedMenu.menuHtml;
    const tomorrowBreakfast = getTomorrowsBreakfast(menuHtml);
    
    if (!tomorrowBreakfast) {
        return alerts;
    }

    const breakfast = tomorrowBreakfast.toLowerCase();

    // Check conditions and add alerts
    if (breakfast.includes("idli") || breakfast.includes("dosa")) {
        alerts.push({
            type: "prep",
            icon: "🍚",
            title: "Batter Preparation",
            message: "Soak rice, uzhunnu for preparing batter for tomorrow's breakfast"
        });
    }

    if (breakfast.includes("kadala curry")) {
        alerts.push({
            type: "prep",
            icon: "🫘",
            title: "Kadala Soak",
            message: "Soak kadala for tomorrow's breakfast preparation"
        });
    }

    if (breakfast.includes("chicken curry") || breakfast.includes("fish curry")) {
        const protein = breakfast.includes("chicken") ? "Chicken" : "Fish";
        alerts.push({
            type: "prep",
            icon: "🍗",
            title: "Marinate Protein",
            message: `Marinate ${protein} for tomorrow's breakfast`
        });
    }

    if (breakfast.includes("appam")) {
        alerts.push({
            type: "prep",
            icon: "🍞",
            title: "Appam Batter",
            message: "Soak rice for appam batter preparation"
        });
    }

    return alerts;
}

function getTomorrowsBreakfast(menuHtml) {
    const days = ["MONDAY", "TUESDAY", "WEDNESDAY", "THURSDAY", "FRIDAY", "SATURDAY", "SUNDAY"];
    const today = new Date();
    const tomorrow = new Date(today);
    tomorrow.setDate(today.getDate() + 1);
    
    const tomorrowIndex = (tomorrow.getDay() + 6) % 7; // Monday = 0
    
    // Map day index to day name
    const dayNames = ["MONDAY", "TUESDAY", "WEDNESDAY", "THURSDAY", "FRIDAY", "SATURDAY", "SUNDAY"];
    let tomorrowDayName = dayNames[tomorrowIndex];
    
    // If tomorrow is beyond Sunday, return null
    if (tomorrowIndex > 6) {
        return null;
    }

    // Parse the HTML to find tomorrow's breakfast
    // Look for the day name followed by breakfast content
    const breakfastRegex = new RegExp(`<h3>${tomorrowDayName}[^<]*<\\/h3>.*?<p><strong>Breakfast:<\\/strong>\\s*([^<]+)<\\/p>`, 'is');
    const match = menuHtml.match(breakfastRegex);
    
    if (match && match[1]) {
        return match[1].trim();
    }

    return null;
}

// Display alerts as popup after confirming
function displayMealPrepAlertsAsPopup() {
    const alerts = getMealPrepAlerts();
    
    if (alerts.length === 0) {
        return;
    }

    // Show popup in the page with overlay
    let alertsHtml = `
        <div id="popupOverlay" style="position: fixed; top: 0; left: 0; width: 100%; height: 100%; background: rgba(0,0,0,0.5); z-index: 9999; display: flex; align-items: center; justify-content: center;">
            <div style="background: white; padding: 30px; border-radius: 15px; box-shadow: 0 10px 40px rgba(0,0,0,0.3); max-width: 500px; max-height: 80vh; overflow-y: auto; border: 3px solid black;">
                <div style="text-align: center; margin-bottom: 20px; padding-bottom: 15px; border-bottom: 2px solid black;">
                    <h2 style="color: black; margin: 0; font-size: 22px;">⏰ Tomorrow's Meal Prep Reminders</h2>
                    <p style="color: #333; margin: 10px 0 0 0; font-size: 14px;">Get ready for tomorrow's meals</p>
                </div>
                <div style="display: grid; gap: 15px; margin-bottom: 20px;">
    `;

    alerts.forEach(alert => {
        alertsHtml += `
            <div style="background: #f5f5f5; padding: 15px; border-radius: 10px; border-left: 4px solid black;">
                <div style="display: flex; align-items: flex-start; gap: 12px;">
                    <span style="font-size: 28px; line-height: 1;">${alert.icon}</span>
                    <div>
                        <p style="margin: 0; font-weight: bold; color: black; font-size: 15px;">${alert.title}</p>
                        <p style="margin: 5px 0 0 0; color: #333; font-size: 13px; line-height: 1.4;">${alert.message}</p>
                    </div>
                </div>
            </div>
        `;
    });

    alertsHtml += `
                </div>
                <button onclick="closeMealPrepPopup()" style="width: 100%; padding: 12px; background: black; color: white; border: 2px solid black; border-radius: 8px; font-weight: bold; cursor: pointer; font-size: 14px;">Got it! Let's Cook 👨‍🍳</button>
            </div>
        </div>
    `;

    // Create a container for the popup
    let popupContainer = document.getElementById("mealPrepPopup");
    if (!popupContainer) {
        popupContainer = document.createElement("div");
        popupContainer.id = "mealPrepPopup";
        document.body.appendChild(popupContainer);
    }
    
    popupContainer.innerHTML = alertsHtml;
}

function closeMealPrepPopup() {
    const popupContainer = document.getElementById("mealPrepPopup");
    if (popupContainer) {
        popupContainer.innerHTML = "";
        popupContainer.remove();
    }
}