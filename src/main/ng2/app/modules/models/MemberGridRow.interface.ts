import { MemberDetails } from './MemberDetails.interface';

import { AddressDetails } from '../models/AddressDetails.interface';
import { MemberAnalysis } from '../models/MemberAnalysis.interface';
import { IdentityVerification } from '../models/IdentityVerification.interface';

export class MemberGridRow {

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
    analysis: MemberAnalysis;

    name: string;
    dob: string;
    icon: string;
    className: string;

    constructor(member: MemberDetails){
        for(var k in member) {
            this[k]=member[k];
        }

        const sentimentScore = member.analysis.sentiment.score;
        const icon = this.sentimentIcon(sentimentScore);

        this.name = member.title + " " + member.givenName + " " + member.surname,
        this.dob = member.dateOfBirth;
        this.icon = icon;
        this.className = "material-icons " + icon;
    }

    private sentimentIcon(score) {
        if (score <= -0.5){
            return 'sentiment_very_dissatisfied';
        } else if(score > -0.5 && score <= -0.1) {
            return 'sentiment_dissatisfied';
        } else if(score > -0.1 && score <= 0.1) {
            return 'sentiment_neutral';
        } else if(score > 0.2 && score <= 0.5) {
            return 'sentiment_satisfied';
        } else {
            return 'sentiment_very_satisfied';
        }
    }
}
