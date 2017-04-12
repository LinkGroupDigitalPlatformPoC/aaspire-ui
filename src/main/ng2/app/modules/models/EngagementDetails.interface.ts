export interface EngagementDetails {
    memberId: number;
    notes: string;
    status: string; // TODO: ENUM: Verification / In Progress / Closing / Completed / Disconnected
    dateTimeCompleted: string; // TODO: date time type
    dateTimeInitiated: string;
    engagementType: string; // TODO: ENUM: Call Centre / In Person / Video Call / Chat
}
