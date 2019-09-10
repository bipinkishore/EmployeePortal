import { IContact } from 'app/shared/model/contact.model';

export const enum GroupStatus {
    ACTIVE = 'ACTIVE',
    INACTIVE = 'INACTIVE'
}

export interface IGroup {
    id?: number;
    name?: string;
    status?: GroupStatus;
    login?: string;
    contacts?: IContact[];
}

export class Group implements IGroup {
    constructor(public id?: number, public name?: string, public status?: GroupStatus,public login?: string, public contacts?: IContact[]) {}
}
