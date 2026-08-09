import { recipesData } from "../data/recipesData";

// =========================
// Get Recipes
// =========================
export const getRecipes = async (pageNumber = 1, pageSize = 10) => {
  // Simulate API delay
  await new Promise((resolve) => setTimeout(resolve, 400));

  const startIndex = (pageNumber - 1) * pageSize;
  const endIndex = startIndex + pageSize;

  const items = recipesData.slice(startIndex, endIndex);

  return {
    items,
    totalCount: recipesData.length,
    pageNumber,
    pageSize,
    totalPages: Math.ceil(recipesData.length / pageSize),
  };
};

// =========================
// Get Recipe By ID
// =========================
export const getRecipeById = async (id) => {
  await new Promise((resolve) => setTimeout(resolve, 300));

  const recipe = recipesData.find(
    (item) => String(item.id) === String(id)
  );

  if (!recipe) {
    throw new Error("Recipe not found.");
  }

  return {
    ...recipe,

    description:
      "A delicious and healthy meal made with fresh ingredients and packed with protein and nutrients.",

    youTubeUrl: null,

    protein: 35,
    carbs: 45,
    fat: 15,

    ingredients: [
      {
        id: 1,
        name: "Chicken Breast",
        amount: "200",
        unit: "g",
      },
      {
        id: 2,
        name: "Quinoa",
        amount: "1",
        unit: "cup",
      },
      {
        id: 3,
        name: "Cherry Tomatoes",
        amount: "100",
        unit: "g",
      },
      {
        id: 4,
        name: "Cucumber",
        amount: "1",
        unit: "medium",
      },
      {
        id: 5,
        name: "Avocado",
        amount: "1/2",
        unit: "whole",
      },
      {
        id: 6,
        name: "Feta Cheese",
        amount: "50",
        unit: "g",
      },
      {
        id: 7,
        name: "Olive Oil",
        amount: "2",
        unit: "tbsp",
      },
      {
        id: 8,
        name: "Lemon Juice",
        amount: "1",
        unit: "tbsp",
      },
    ],

    steps: [
      {
        id: 1,
        title: "Prep the Chicken",
        instructions: [
          "Remove the chicken from packaging and place it on your cutting board.",
          "Pat the chicken thoroughly inside and out with paper towels.",
          "Use kitchen shears to trim any excess fat or skin around the cavity.",
          "Score the skin lightly with your knife for even cooking.",
        ],
        tip: "Patting the chicken dry helps the skin become golden and crispy.",
        durationMinutes: 5,
        ingredients: [
          {
            id: 101,
            name: "Chicken Breast",
            amount: "200",
            unit: "g",
          },
          {
            id: 102,
            name: "Paper Towels",
            amount: "1",
            unit: "sheet",
          },
          {
            id: 103,
            name: "Chef's Knife",
            amount: "1",
            unit: "pc",
          },
        ],
      },

      {
        id: 2,
        title: "Season the Chicken",
        instructions: [
          "Pat the chicken completely dry with paper towels.",
          "Drizzle olive oil over all surfaces of the chicken.",
          "Rub in paprika and garlic powder evenly.",
          "Season generously with salt and black pepper.",
        ],
        tip: "Season generously so the chicken stays flavorful after cooking.",
        durationMinutes: 10,
        ingredients: [
          {
            id: 201,
            name: "Olive Oil",
            amount: "2",
            unit: "tbsp",
          },
          {
            id: 202,
            name: "Garlic Powder",
            amount: "1",
            unit: "tsp",
          },
          {
            id: 203,
            name: "Smoked Paprika",
            amount: "1",
            unit: "tsp",
          },
          {
            id: 204,
            name: "Sea Salt",
            amount: "1/2",
            unit: "tsp",
          },
          {
            id: 205,
            name: "Black Pepper",
            amount: "1/2",
            unit: "tsp",
          },
        ],
      },

      {
        id: 3,
        title: "Cook the Quinoa",
        instructions: [
          "Rinse the quinoa thoroughly under cold water.",
          "Add quinoa and water to a saucepan.",
          "Bring to a boil and reduce heat.",
          "Cover and simmer until the quinoa is fluffy.",
        ],
        tip: "Let the quinoa rest for a few minutes before fluffing it.",
        durationMinutes: 15,
        ingredients: [
          {
            id: 301,
            name: "Quinoa",
            amount: "1",
            unit: "cup",
          },
          {
            id: 302,
            name: "Water",
            amount: "2",
            unit: "cups",
          },
        ],
      },

      {
        id: 4,
        title: "Prepare the Salad",
        instructions: [
          "Wash and chop the vegetables.",
          "Slice the avocado.",
          "Add tomatoes, cucumber and mixed greens to a large bowl.",
          "Add the cooked quinoa and toss everything together.",
        ],
        tip: "Add the avocado just before serving to keep it fresh.",
        durationMinutes: 10,
        ingredients: [
          {
            id: 401,
            name: "Cherry Tomatoes",
            amount: "100",
            unit: "g",
          },
          {
            id: 402,
            name: "Cucumber",
            amount: "1",
            unit: "medium",
          },
          {
            id: 403,
            name: "Avocado",
            amount: "1/2",
            unit: "whole",
          },
          {
            id: 404,
            name: "Mixed Greens",
            amount: "2",
            unit: "cups",
          },
        ],
      },

      {
        id: 5,
        title: "Serve the Chicken Salad",
        instructions: [
          "Slice the cooked chicken into thin strips.",
          "Add the chicken on top of the quinoa salad.",
          "Drizzle with lemon juice and olive oil.",
          "Serve immediately.",
        ],
        tip: "Serve immediately for the best texture and freshness.",
        durationMinutes: 5,
        ingredients: [
          {
            id: 501,
            name: "Cooked Chicken",
            amount: "200",
            unit: "g",
          },
          {
            id: 502,
            name: "Lemon Juice",
            amount: "1",
            unit: "tbsp",
          },
          {
            id: 503,
            name: "Olive Oil",
            amount: "1",
            unit: "tbsp",
          },
        ],
      },
    ],
  };
};

// =========================
// Categories
// =========================
export const getCategories = async () => {
  return [
    "Healthy & Light",
    "Egyptian & Traditional",
    "Mediterranean",
    "Mexican",
    "Vegetarian",
    "High Protein",
    "Quick Meals",
  ];
};

// =========================
// Ingredients
// =========================
export const getIngredients = async () => {
  return [
    "Chicken Breast",
    "Quinoa",
    "Cherry Tomatoes",
    "Cucumber",
    "Avocado",
    "Feta Cheese",
    "Olive Oil",
    "Lemon Juice",
  ];
};

// =========================
// Format minutes
// =========================
export function formatMinutes(minutes) {
  if (minutes === null || minutes === undefined) return "";

  if (minutes < 60) {
    return `${minutes} min`;
  }

  const hours = Math.floor(minutes / 60);
  const remainder = minutes % 60;

  return remainder ? `${hours}h ${remainder}m` : `${hours}h`;
}
