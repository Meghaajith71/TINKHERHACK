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

// Fruits pool to show below dinner each day
const fruitsPool = [
    "Apple",
    "Orange",
    "Pomegranate",
    "Grapes",
    "Kiwi",
    "Cherry",
    "Star Fruit",
    "Pineapple",
    "Guava",
    "Plum",
    "Dates",
    "Watermelon"
];

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
    document.getElementById("menuDisplay").innerHTML = menuHtml + confirmButton;
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
}

function resetMenu() {
    localStorage.removeItem(confirmedMenuKey);
    lastGeneratedMenuHtml = "";
    generateMenu();
}

function generateMenu() {

    const days = ["MONDAY", "TUESDAY", "WEDNESDAY", "THURSDAY", "FRIDAY", "SATURDAY"];
    
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
        ["carbohydrates", "protein", "vitamin_k"]    // Saturday
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

        // Pick fruits for the day (deterministic rotation to ensure variety)
        const fruit1 = fruitsPool[dayIndex % fruitsPool.length];
        const fruit2 = fruitsPool[(dayIndex + 3) % fruitsPool.length];
        const fruitList = fruit1 === fruit2 ? fruit1 : `${fruit1}, ${fruit2}`;

        weeklyMenu += `
            <div style="margin-bottom:20px;">
                <h3>${day} - ${dateLabel}</h3>
                <p><strong>Breakfast:</strong> ${breakfastDetails}</p>
                <p><strong>Lunch:</strong> ${lunch.join(", ")}</p>
                <p><strong>Dinner:</strong> ${dinnerDetails}</p>
                <p><strong>Fruits:</strong> ${fruitList}</p>
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