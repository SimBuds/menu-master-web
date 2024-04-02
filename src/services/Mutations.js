// Users Api and Mutators
// Login
export async function loginUser({ username, password }) {
    const response = await fetch(`${process.env.REACT_APP_API_URL}/user/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ username, password }),
    });
  
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
  
    return response.json();
  }

// Get All Users
export async function getUsers() {
    const response = await fetch(`${process.env.REACT_APP_API_URL}/user`);
    if (!response.ok) {
        throw new Error('Network response was not ok');
    }
    return response.json();
}

// Register User
export async function registerUser(userData) {
    const response = await fetch(`${process.env.REACT_APP_API_URL}/user/register`, {
        method: 'POST',
        headers: {
        'Content-Type': 'application/json',
        },
        body: JSON.stringify(userData),
    });

    if (!response.ok) {
        throw new Error('Failed to register user');
    }

    return response.json();
}

// Menu Api and Mutators
// Get Menu by ID
export async function getMenuById(menuId) {
    try {
        const response = await fetch(`${process.env.REACT_APP_API_URL}/menu/${menuId}`);
        const responseData = await response.json();

        if (!response.ok) {
            console.error('An error occurred while fetching the menu:', response.statusText);
            throw new Error('Failed to fetch menu');
        }

        return responseData;
    } catch (error) {
        console.error("An error occurred while fetching the menu:", error);
        throw error;
    }
}

// Update Menu
export async function updateMenu({ menuId, menuData }) {
    const url = `${process.env.REACT_APP_API_URL}/menu/${menuId}`;

    try {
        const response = await fetch(url, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(menuData),
        });

        const responseData = await response.json();

        if (responseData.data === null) {
            console.error('An error occurred while updating the menu: Data is null');
            throw new Error(responseData.message || 'Failed to update menu: Data is null');
        }

        return responseData;
    } catch (error) {
        console.error("An error occurred while updating the menu:", error);
        throw error;
    }
}

// Recipe Api and Mutators
// Get Recipes
export async function getAllRecipes() {
    try {
        const response = await fetch(`${process.env.REACT_APP_API_URL}/recipe/`);
        const responseData = await response.json();

        if (!Array.isArray(responseData.data)) {
            throw new Error(responseData.message || 'Failed to fetch recipes: Data is not an array');
        }

        return responseData;
    } catch (error) {
        console.error("An error occurred while fetching the recipes:", error);
        throw error;
    }
}

// Create Recipes
export async function createRecipe(recipeData) {
    const response = await fetch(`${process.env.REACT_APP_API_URL}/recipe/`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(recipeData),
    });

    const responseData = await response.json();

    if (!response.ok) {
        throw new Error(responseData.message || `Failed to create recipe: HTTP status ${response.status}`);
    }

    return responseData;
}


// Update Recipes
export async function updateRecipe(recipeId, recipeData) {
    const encodedRecipeId = encodeURIComponent(recipeId);
    const url = `${process.env.REACT_APP_API_URL}/recipe/${encodedRecipeId}`;

    const response = await fetch(url, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(recipeData),
    });

    const responseData = await response.json();

    if (!response.ok) {
        throw new Error(responseData.message || `Failed to update recipe: HTTP status ${response.status}`);
    }

    return responseData;
}

// Delete Recipes
export async function deleteRecipe(recipeId) {
    const encodedRecipeId = encodeURIComponent(recipeId);
    const url = `${process.env.REACT_APP_API_URL}/recipe/${encodedRecipeId}`;

    const response = await fetch(url, {
        method: 'DELETE'
    });

    const responseData = await response.json();

    if (!response.ok) {
        throw new Error(responseData.message || `Failed to delete recipe: HTTP status ${response.status}`);
    }

    return responseData;
}

// Invetory Api and Mutators
// Get Inventory by ID
export async function getAllInventory() {
    const response = await fetch(`${process.env.REACT_APP_API_URL}/inventory/`);
    if (!response.ok) {
        throw new Error(`Failed to fetch inventory: HTTP status ${response.status}`);
    }
    
    return response.json();
}

// Create New Inventory
export async function createInventory(inventoryData) {
    const response = await fetch(`${process.env.REACT_APP_API_URL}/inventory`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(inventoryData),
    });

    if (!response.ok) {
        throw new Error(`Failed to create inventory: HTTP status ${response.status}`);
    }

    return response.json();
}

// Update Inventory
export async function updateInventory(inventoryData) {
    const url = `${process.env.REACT_APP_API_URL}/inventory/${inventoryData._id}`;

    const response = await fetch(url, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(inventoryData),
    });

    const responseData = await response.json();

    if (!response.ok) {
        throw new Error(responseData.message || `Failed to update inventory: HTTP status ${response.status}`);
    }

    return responseData;
}

// Delete Inventory
export async function deleteInventory(inventoryId) {
    const encodedInventoryId = encodeURIComponent(inventoryId);
    const response = await fetch(`${process.env.REACT_APP_API_URL}/inventory/${encodedInventoryId}`, {
        method: 'DELETE',
    });

    if (!response.ok) {
        throw new Error(`Failed to delete inventory: HTTP status ${response.status}`);
    }

    return response.json();
}
