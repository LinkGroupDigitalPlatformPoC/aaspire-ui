/*
 API - Engagement - new Engagement
 body for API call
 */

export interface EngagementBody {
    memberId: string;
    dateTimeInitiated: string;
    dateTimeCompleted: string;
    notes: string;
    primaryTopic: string;
    secondaryTopic: Array<string>;
    status: string;
    csrId: string;
}