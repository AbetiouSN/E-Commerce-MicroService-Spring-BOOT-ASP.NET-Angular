import {User} from "./user.model";

export class Customer {
  id: string = '';
  nom: string = '';
  cne: string = '';
  prenom: string = '';
  user : User = new User;
}
