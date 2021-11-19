DROP TABLE IF EXISTS pantry_ingredients CASCADE;
CREATE TABLE pantry_ingredients (
  id SERIAL PRIMARY KEY NOT NULL,
  item_name VARCHAR(255) NOT NULL,
  user_id INTEGER REFERENCES users(id) ON DELETE CASCADE,
  spoonacular_ingredient_id INTEGER NOT NULL,
  quantity INTEGER DEFAULT 0,
  measure VARCHAR(255)
);
