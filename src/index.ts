import { getProductboardNotes } from './lib/notes';

export class Productboard {
  private apiKey: string;

  constructor(apiKey: string) {
    this.apiKey = apiKey;
  }

  note = {
    list: async () => {
      return await getProductboardNotes(this.apiKey);
    },
  };
}
