
import { AddressDetails } from '../models/AddressDetails.interface';

export interface MemberDetails {
    id: number;
    title: string;
    givenName: string;
    surname: string;
    dateOfBirth: string;
    status: string;
    plan: string;
    email: string;
    address: AddressDetails;
    phoneNumber: string;
}


