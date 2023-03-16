import {Entity, hasMany, model, property} from '@loopback/repository';
import {User} from './user.model';

@model()
export class Role extends Entity {
  @property({
    type: 'number',
    id: true,
    generated: true,
  })
  id?: number;

  @property({
    type: 'string',
    required: true,
  })
  name: string;

  @property({
    type: 'string',
    required: true,
    jsonSchema: {
      enum: ['SuperAdmin', 'Admin', 'Subscriber']
    }
  })
  key: string;

  @property({
    type: 'string',
  })
  description?: string;

  @hasMany(() => User, {keyTo: 'roleid', })
  users: User[];

  constructor(data?: Partial<Role>) {
    super(data);
  }
}

export interface RoleRelations {
  // describe navigational properties here
}

export type RoleWithRelations = Role & RoleRelations;
