import { IGroup } from 'app/shared/model//group.model';

export const enum ContactStatus {
    ACTIVE = 'ACTIVE',
    INACTIVE = 'INACTIVE'
}

export interface IContact {
    id?: number;
    name?: string;
    email?: string;
    status?: ContactStatus;
    mobileNumber?: number;
    group?: IGroup;
}

export class Contact implements IContact {
    constructor(
        public id?: number,
        public name?: string,
        public email?: string,
        public status?: ContactStatus,
        public mobileNumber?: number,
        public group?: IGroup
    ) {}
}
