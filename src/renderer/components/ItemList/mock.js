export const mockUsers = (count) => {
  const users = [];
  for (let i = 0; i < count; i++) {
    users.push({
      id: i + 1,
      name: `User ${i + 1}`,
      email: `user${i + 1}@example.com`,
      status: Math.random() > 0.5 ? 'Active' : 'Inactive',
      createdAt: new Date().toISOString(),
    });
  }
  return users;
};
