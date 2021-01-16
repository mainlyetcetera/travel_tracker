import chai from 'chai';
import { testUsers } from '../test-data/user-test-data.js';

const expect = chai.expect;

describe('a User', () => {
  it('should be able to import testUsers', () => {
    expect(testUsers).to.be.an('Array');
  });
});