import { application } from '../../environments/environment';
import { Order } from './order.model';

export interface Roles {
  admin: boolean;
}

export class User {
  public email: string;
  public photoURL?: string;
  public roles?: Roles;
  public firstName?: string;
  public lastName?: string;
  public password?: string;
  public orders?: object;
  public confirmPassword?: string;
  public uid?: string;
  public role?: string;
  public subscription?: string;
  public phoneNumber?: string;
  public address?: string;

  constructor(authData) {
    this.email = authData.email;
    this.firstName = authData.firstName ? authData.firstName : '';
    this.lastName = authData.lastName ? authData.lastName : '';
    this.photoURL = authData.photoURL ?  authData.photoURL : application.defaultUser;
    this.role = authData.role ? authData.role : '';
    this.subscription = authData.subscription ? authData.subscription : '';

    this.phoneNumber = authData.phoneNumber ? authData.phoneNumber : '';
    this.address = authData.address ? authData.address : '';

    this.roles = {
      admin: false
    };
  }
}
