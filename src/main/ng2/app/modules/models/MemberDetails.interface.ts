
import { Address } from '../models/Address.interface';

export interface MemberDetails {
    id: string;
    title: string;
    givenName: string;
    surname: string;
    dateOfBirth: string;
    status: string;
    plan: string;
    email: string;
    address: Address;
    phoneNumber: string;
}


