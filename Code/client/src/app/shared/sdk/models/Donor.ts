/* tslint:disable */

declare var Object: any;
export interface DonorInterface {
  "firstName": any;
  "lastName"?: any;
  "contactNumber": any;
  "email": any;
  "bloodGroup": any;
  "ip"?: any;
  "address"?: any;
  "location": any;
  "id"?: any;
}

export class Donor implements DonorInterface {
  "firstName": any;
  "lastName": any;
  "contactNumber": any;
  "email": any;
  "bloodGroup": any;
  "ip": any;
  "address": any;
  "location": any;
  "id": any;
  constructor(data?: DonorInterface) {
    Object.assign(this, data);
  }
  /**
   * The name of the model represented by this $resource,
   * i.e. `Donor`.
   */
  public static getModelName() {
    return "Donor";
  }
  /**
  * @method factory
  * @author Jonathan Casarrubias
  * @license MIT
  * This method creates an instance of Donor for dynamic purposes.
  **/
  public static factory(data: DonorInterface): Donor{
    return new Donor(data);
  }
  /**
  * @method getModelDefinition
  * @author Julien Ledun
  * @license MIT
  * This method returns an object that represents some of the model
  * definitions.
  **/
  public static getModelDefinition() {
    return {
      name: 'Donor',
      plural: 'Donors',
      properties: {
        "firstName": {
          name: 'firstName',
          type: 'any'
        },
        "lastName": {
          name: 'lastName',
          type: 'any'
        },
        "contactNumber": {
          name: 'contactNumber',
          type: 'any'
        },
        "email": {
          name: 'email',
          type: 'any'
        },
        "bloodGroup": {
          name: 'bloodGroup',
          type: 'any'
        },
        "ip": {
          name: 'ip',
          type: 'any'
        },
        "address": {
          name: 'address',
          type: 'any'
        },
        "location": {
          name: 'location',
          type: 'any'
        },
        "id": {
          name: 'id',
          type: 'any'
        },
      },
      relations: {
      }
    }
  }
}
