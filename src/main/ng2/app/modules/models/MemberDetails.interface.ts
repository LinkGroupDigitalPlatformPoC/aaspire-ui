
import { AddressDetails } from '../models/AddressDetails.interface';
import { IdentityVerification } from '../models/IdentityVerification.interface';

export interface MemberDetails {
    accountBalance: number;
    address: AddressDetails;
    dateOfBirth: string;
    email: string;
    givenName: string;
    id: number;
    identities: [IdentityVerification];
    lastEmployer: string;
    phoneNumber: string;
    plan: string;
    status: string;
    surname: string;
    title: string;
}


