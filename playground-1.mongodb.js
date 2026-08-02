// 1. Select / Create the database for your project
use('mern_db');

// 2. Clear out existing users (Optional: clean slate for testing)
db.getCollection('users').drop();

// 3. Insert sample seed data (matches your User schema with hashed passwords)
db.getCollection('users').insertMany([
  {
    email: 'admin@example.com',
    // Mock bcrypt hash for testing
    password: '$2a$10$e8.yXfO9iO2pT5/7jY7Axe9V/kGZ0QJ1G1q3wUvD2f4H5j6K7L8mO',
    createdAt: new Date()
  },
  {
    email: 'user1@example.com',
    password: '$2a$10$x8.aBcD1eF2gH3iJ4kL5mN6oP7qR8sT9uV0wX1yZ2aB3cD4eF5gH6',
    createdAt: new Date()
  }
]);

// 4. Create a Unique Index on 'email' (ensures no duplicate registration)
db.getCollection('users').createIndex({ email: 1 }, { unique: true });

// 5. Query all users to verify insertion
db.getCollection('users').find();