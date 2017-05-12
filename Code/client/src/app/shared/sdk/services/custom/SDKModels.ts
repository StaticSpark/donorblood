/* tslint:disable */
import { Injectable } from '@angular/core';
import { Todo } from '../../models/Todo';
import { Donor } from '../../models/Donor';

export interface Models { [name: string]: any }

@Injectable()
export class SDKModels {

  private models: Models = {
    Todo: Todo,
    Donor: Donor,
    
  };

  public get(modelName: string): any {
    return this.models[modelName];
  }

  public getAll(): Models {
    return this.models;
  }

  public getModelNames(): string[] {
    return Object.keys(this.models);
  }
}
