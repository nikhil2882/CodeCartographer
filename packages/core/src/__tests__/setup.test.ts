describe('Core Package Setup', () => {
  it('should be able to run tests', () => {
    expect(true).toBe(true);
  });

  it('should have access to Babel parser', () => {
    const parser = require('@babel/parser');
    expect(parser).toBeDefined();
    expect(typeof parser.parse).toBe('function');
  });
});
