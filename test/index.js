import chai from 'chai';
import lookup from '../src/index';

const expect = chai.expect;

describe('Extract contact data from string', () => {
  it('Extract tel, email and web', (done) => {
    const input = `Air Conditioned, Power Steering, SUPER DOOPER LOW KLM's @ 78,238, SET AND FORGET REGO Until June 2016!!, Power Mirrors, Tinted Windows, Central Locking, CD Mp3/AUX/USB AM/FM Stereo, Bluetooth Connectivity, Partial Leather Interior, Dual SRS Air Bags, In Cabin Roll Bar, Rear Tow Bar Accessory, EFS Lift Kit Upgrade, Side Steps,  Added Essential Upgrades: - Shovel - Farm Jack - Sand Ladder - CB Radio (Oricom) - Brand New Mud Tyres with Sunraysia Rims - Dual Front ARB LED Spot Lights (2 x 185W) - Front Bull Bar - me@home.com Full Length Top Luggage Rack - Fire Extinguisher - Rear Cabin Cage - Genuine Snorkel - Fuel Cans A STEAL at This Price! What a GEM! This Is a Must See!!! Immaculate Condition Inside & Out, Nothing To Spend!!!  Enquire Today!! DO NOT MISS OUT! We offer: *5 Year Unlimited Klms Warranty Plus 24/7 Roadside Service Australia Wide (terms & conditions apply) *100% clear title includes -No Accident History (no written off) -No Encumbrance Owing (no money owing) *Trades-Ins & Test Drive Available *Extended Trading Hours: Open 7 Days A Week: -Mon-Fri 9am - 5:30 pm -Sat 9am- 5pm -Sun 10am - 4pm (after hour appointments available) *Contact Us For On +420 254 123 123 or (123) 456-789-012 + click to reveal *Website: http://www.stevesautoworld.com.au *Find Us On Facebook & Like Our Page, https://www.facebook.com/steves.autoworld`;

    lookup.get(input)
      .then((result) => {
        expect(result).to.be.an('object')
          .and.to.have.property('phoneNumbers')
          .and.to.be.an('array')
          .and.to.have.length(1);
        expect(result).to.be.an('object')
          .and.to.have.property('websites')
          .and.to.be.an('array')
          .and.to.have.length(2);
        expect(result).to.be.an('object')
          .and.to.have.property('emails')
          .and.to.be.an('array')
          .and.to.have.length(1);
        done();
      });
  });

  it('Extract web only', (done) => {
    const input = `Air Conditioned, Power Steering, SUPER DOOPER LOW KLM's @ 78,238, SET AND FORGET REGO Until June 2016!!, Power Mirrors, Tinted Windows, Central Locking, CD Mp3/AUX/USB AM/FM Stereo, Bluetooth Connectivity, Partial Leather Interior, Dual SRS Air Bags, In Cabin Roll Bar, Rear Tow Bar Accessory, EFS Lift Kit Upgrade, Side Steps,  Added Essential Upgrades: - Shovel - Farm Jack - Sand Ladder - CB Radio (Oricom) - Brand New Mud Tyres with Sunraysia Rims - Dual Front ARB LED Spot Lights (2 x 185W) - Front Bull Bar - me@home.com Full Length Top Luggage Rack - Fire Extinguisher - Rear Cabin Cage - Genuine Snorkel - Fuel Cans A STEAL at This Price! What a GEM! This Is a Must See!!! Immaculate Condition Inside & Out, Nothing To Spend!!!  Enquire Today!! DO NOT MISS OUT! We offer: *5 Year Unlimited Klms Warranty Plus 24/7 Roadside Service Australia Wide (terms & conditions apply) *100% clear title includes -No Accident History (no written off) -No Encumbrance Owing (no money owing) *Trades-Ins & Test Drive Available *Extended Trading Hours: Open 7 Days A Week: -Mon-Fri 9am - 5:30 pm -Sat 9am- 5pm -Sun 10am - 4pm (after hour appointments available) *Contact Us For On +420 254 123 123 or (123) 456-789-012 + click to reveal *Website: http://www.stevesautoworld.com.au *Find Us On Facebook & Like Our Page, https://www.facebook.com/steves.autoworld`;

    lookup.get(input, undefined, { phone: false, email: false })
      .then((result) => {
        expect(result).to.be.an('object')
          .and.to.have.property('phoneNumbers')
          .and.to.be.an('array')
          .and.to.have.length(0);
        expect(result).to.be.an('object')
          .and.to.have.property('websites')
          .and.to.be.an('array')
          .and.to.have.length(2);
        expect(result).to.be.an('object')
          .and.to.have.property('emails')
          .and.to.be.an('array')
          .and.to.have.length(0);
        done();
      });
  });

  it('Extract all types of tel number', (done) => {
    const input = 'This is the string +49 (0) 170 12345678 or 0049 170 23456789 or 4917013456789 or 0170/98765432';

    lookup.get(input)
      .then((result) => {
        expect(result).to.be.an('object')
          .and.to.have.property('phoneNumbers')
          .and.to.be.an('array')
          .and.to.have.length(4)
          .to.have.members([
            '+4917012345678',
            '+4917023456789',
            '+4917013456789',
            '+4917098765432']);
        done();
      });
  });

  it('Check wrong input type', (done) => {
    const input = true;

    lookup.get(input)
      .then(() => {
        done();
      })
      .catch(console.log);
  });
});
