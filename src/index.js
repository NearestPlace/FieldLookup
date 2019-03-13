import extractor from 'phonenumbers-extractor';
import PhoneNumber from 'awesome-phonenumber';
import getUrls from 'get-urls';
import getEmails from 'get-emails';

export default {
  async phone(input, country = 'DE') {
    const numbers = await extractor.extractNumbers(input, 5);
    const validNumbers = [];
    numbers.forEach((number) => {
      const checkNr = (number.originalFormat[0] === '+') ?
        `+${number.filteredFormat}` : `${number.filteredFormat}`;
      const tel = new PhoneNumber(checkNr, country);
      if (tel.isValid()) validNumbers.push(tel.toJSON());
    });
    return validNumbers;
  },

  async get(input = '', country = 'DE') {
    if (!input) {
      return {
        phoneNumbers: [],
        websites: [],
        emails: [],
      };
    }
    const checkInput = input.toString();
    const phoneNumbers = await this.phone(checkInput, country);
    return {
      phoneNumbers: phoneNumbers.map(num => num.number.e164),
      websites: [...getUrls(checkInput)],
      emails: [...getEmails(checkInput)],
    };
  },

};
