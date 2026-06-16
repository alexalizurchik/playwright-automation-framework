const textBoxUser = {
  name: process.env.USER_NAME || 'John Doe',
  email: process.env.USER_EMAIL || 'john.doe@example.com',
  address: process.env.USER_ADDRESS || '221B Baker Street'
};

const practiceFormUser = {
  firstName: 'John',
  lastName: 'Doe',
  email: 'john.doe@example.com',
  mobileNumber: '1234567890',
  address: 'someAddress USA',
  gender: 'Male',
  dateOfBirth: {
    day: '15',
    month: 'May',
    year: '1990'
  },
  subjects: 'Maths',
  hobbies: ['Sports', 'Reading'],
  picture: 'test-image.png',
  state: 'NCR',
  city: 'Delhi'
};

const webTableUser = {
  firstName: 'John',
  lastName: 'Doe',
  email: 'john.doe@example.com',
  age: 30,
  salary: 50000,
  department: 'IT'
};

const updatedWebTableUser = {
  firstName: 'Johnny',
  salary: 60000
};

module.exports = {
  textBoxUser,
  practiceFormUser,
  webTableUser,
  updatedWebTableUser
};
