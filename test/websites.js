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

  it('Check exclude email from website', (done) => {
    const input = 'Telefon: 01234/56789\r\nE-mail: me@gmail.com\r\nInternet: www.mywebsite.de';

    lookup.get(input)
      .then((result) => {
        expect(result.phoneNumbers).has.lengthOf(0);
        expect(result.websites).has.lengthOf(1);
        expect(result.websites[0]).to.be.equal('http://mywebsite.de');
        expect(result.emails).has.lengthOf(1);
        expect(result.emails[0]).to.be.equal('me@gmail.com');
        done();
      })
      .catch();
  });
});
