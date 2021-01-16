import chai from 'chai';
import { testUsers } from '../test-data/traveler-test-data.js';

const expect = chai.expect;

describe('a Traveler', () => {
  it('should be able to import testUsers', () => {
    expect(testUsers).to.be.an('Array');
  });
});