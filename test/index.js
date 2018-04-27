import chai from 'chai';
import lookup from '../src/index';

require("babel-core/register");
require("babel-polyfill");

const expect = chai.expect;

describe('Extract contact data from string', () => {
  it('Extract tel, email and web', (done) => {
    lookup.lookup('dies ist 01706416991 ein me@home.place test www.test.de  +491706416991  wefwqefwqef 0049 170 6416991 https://www.test.de weqfwefqewfqwef 49 (0) 170 6416991')
      .then((d) => {
        console.log(d);
        done();
      });
  });
});
