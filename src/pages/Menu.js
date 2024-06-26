import React, { useState } from 'react';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import ListGroup from 'react-bootstrap/ListGroup';
import Modal from 'react-bootstrap/Modal';

// Mock data for recipes
const recipesData = [
  { id: 1, name: 'Ceviche', onMenu: false, image: require('../assets/images/ceviche.jpg'), steps: ['Step 1: Cut the fish', 'Step 2: Mix with lime', 'Step 3: Add onions', 'Step 4: Serve cold'] },
  { id: 2, name: 'Pico', onMenu: false, image: require('../assets/images/creme.jpg'), steps: ['Step 1: Mix ingredients', 'Step 2: Bake', 'Step 3: Cool down', 'Step 4: Serve with caramelized sugar on top'] },
  { id: 3, name: 'Lomo Saltado', onMenu: false, image: require('../assets/images/demi.jpg'), steps: ['Step 1: Roast bones', 'Step 2: Add vegetables', 'Step 3: Simmer', 'Step 4: Strain and reduce'] },
  { id: 4, name: 'Huancaína', onMenu: false, image: require('../assets/images/mashed.jpg'), steps: ['Step 1: Boil potatoes', 'Step 2: Drain water', 'Step 3: Mash potatoes', 'Step 4: Add butter and milk'] },
];

function Menu() {
    const [recipes, setRecipes] = useState(recipesData);
    const [searchTermRecipes, setSearchTermRecipes] = useState('');
    const [searchTermOnMenu, setSearchTermOnMenu] = useState('');
    const [show, setShow] = useState(false);
    const [selectedRecipe, setSelectedRecipe] = useState(null);

    // Toggle recipe presence on the menu
    const handleToggleMenu = (id) => {
        setRecipes(recipes.map(recipe =>
        recipe.id === id ? { ...recipe, onMenu: !recipe.onMenu } : recipe
        ));
    };

    const handleClose = () => setShow(false);
    const handleShow = (recipe) => {
      setSelectedRecipe(recipe);
      setShow(true);
    }

    // Assuming you want to filter recipes based on search term and onMenu status
    const filteredRecipes = recipes.filter(recipe =>
        recipe.name.toLowerCase().includes(searchTermRecipes.toLowerCase()) && !recipe.onMenu
    );

    const filteredOnMenu = recipes.filter(recipe =>
        recipe.name.toLowerCase().includes(searchTermOnMenu.toLowerCase()) && recipe.onMenu
    );

    return (
        <div className="container mt-3">
          <h1 className="text-center mb-4">Menu</h1>
          <div className="row">
            <div className="col-md-6">
              <h2>Recipes</h2>
              <Form.Control
                type="text"
                className="mb-3"
                placeholder="Search..."
                value={searchTermRecipes}
                onChange={(e) => setSearchTermRecipes(e.target.value)}
              />
              <ListGroup>
                {filteredRecipes.map(recipe => (
                  <ListGroup.Item key={recipe.id} className="d-flex justify-content-between align-items-center">
                    <Form.Check
                      type="checkbox"
                      checked={recipe.onMenu}
                      onChange={() => handleToggleMenu(recipe.id)}
                      label={recipe.name}
                    />
                    <Card.Img variant="top" src={recipe.image} alt={recipe.name} style={{width: '50px', height: '50px'}}/>
                    <Button variant="outline-primary" size="sm" onClick={() => handleShow(recipe)}>View Recipe</Button>
                  </ListGroup.Item>
                ))}
              </ListGroup>
            </div>

            <div className="col-md-6">
              <h2>On Menu</h2>
              <Form.Control
                type="text"
                className="mb-3"
                placeholder="Search..."
                value={searchTermOnMenu}
                onChange={(e) => setSearchTermOnMenu(e.target.value)}
              />
              <ListGroup>
                {filteredOnMenu.map(recipe => (
                  <ListGroup.Item key={recipe.id} className="d-flex justify-content-between align-items-center">
                    <Form.Check
                      type="checkbox"
                      checked={recipe.onMenu}
                      onChange={() => handleToggleMenu(recipe.id)}
                      label={recipe.name}
                    />
                    <Card.Img variant="top" src={recipe.image} alt={recipe.name} style={{width: '50px', height: '50px'}}/>
                    <Button variant="outline-primary" size="sm" onClick={() => handleShow(recipe)}>View Recipe</Button>
                  </ListGroup.Item>
                ))}
              </ListGroup>
            </div>
          </div>

          <Modal show={show} onHide={handleClose}>
            <Modal.Header closeButton>
              <Modal.Title>{selectedRecipe?.name}</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <Card.Img variant="top" src={selectedRecipe?.image} alt={selectedRecipe?.name} />
              <ListGroup className="mt-3">
                {selectedRecipe?.steps.map((step, index) => (
                  <ListGroup.Item key={index}>{step}</ListGroup.Item>
                ))}
              </ListGroup>
            </Modal.Body>
          </Modal>
        </div>
      );
    }

export default Menu;