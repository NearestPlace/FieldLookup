import extractor from 'phonenumbers-extractor';
import PhoneNumber from 'awesome-phonenumber';
import getUrls from 'get-urls';
import getEmails from 'get-emails';

export default {
  async phone(input, country = 'DE') {
    const numbers = await extractor.extractNumbers(input, 5);
    const validNumbers = [];
    numbers.forEach((number) => {
      const checkNr = (number.originalFormat[0] === '+') ? `+${number.filteredFormat}` : `${number.filteredFormat}`;
      const tel = new PhoneNumber(checkNr, country);
      if (tel.isValid()) validNumbers.push(tel.toJSON());
    });
    return validNumbers;
  },

  get(input = '', country = 'DE', options = {}) {
    return new Promise(async (resolve) => {
      if (!input) {
        resolve({
          phoneNumbers: [],
          websites: [],
          emails: [],
        });
        return;
      }
      const checkInput = input.toString();
      const phoneNumbers = (options.phone !== false) ? await this.phone(checkInput, country) : [];
      const websites = (options.website !== false) ? [...getUrls(checkInput)] : [];
      const emails = (options.email !== false) ? [...getEmails(checkInput)] : [];
      resolve({
        phoneNumbers: phoneNumbers.map(num => num.number.e164),
        websites,
        emails,
      });
    });
  },

};
