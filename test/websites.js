import { expect } from 'chai';

import lookup from '../src/index';

describe('Extract contact data from string', () => {
  it('Check wrong input type', (done) => {
    const input = 'mmm-aaaaaa.ch';

    lookup.get(input)
      .then((result) => {
        console.log({ result });
        done();
      })
      .catch();
  });
});
