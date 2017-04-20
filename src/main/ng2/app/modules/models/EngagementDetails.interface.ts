export interface EngagementDetails {
    _id: string;
    memberId: number;
    csrId: string;
    notes: string;
    status: string; // TODO: ENUM: Verification / In Progress / Closing / Completed / Disconnected
    dateTimeCompleted: string; // TODO: date time type
    dateTimeInitiated: string;
    primaryTopic: string;
    secondaryTopic: [string];
    transcript: string;
    analysis: any;
}
