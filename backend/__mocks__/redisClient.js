module.exports = {
  get: jest.fn().mockResolvedValue(null),
  setEx: jest.fn().mockResolvedValue(true),
};
