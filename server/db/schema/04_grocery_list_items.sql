DROP TABLE IF EXISTS grocery_list_items CASCADE;
CREATE TABLE grocery_list_items (
  id SERIAL PRIMARY KEY NOT NULL,
  meal_list_id INTEGER REFERENCES meal_lists(id) ON DELETE CASCADE,
  user_id INTEGER REFERENCES users(id) ON DELETE CASCADE,
  item_name VARCHAR(255) NOT NULL,
  quantity INTEGER DEFAULT 0
);
