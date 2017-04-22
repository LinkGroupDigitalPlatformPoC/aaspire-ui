import {EngagementDetails} from './EngagementDetails.interface';

export class CallGridRow {

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
    transcriptIcon: string;
    sentimentIcon: string;
    className: string;

    constructor(call: EngagementDetails) {
        var callSentimentScore: string;
        var callSentimentIcon: string;

        if (call.analysis != undefined) {
            callSentimentScore = call.analysis.sentiment.score;
            callSentimentIcon = this.findSentimentIcon(callSentimentScore);
        }

        for(var k in call) {
            this[k]=call[k];
        }

        this.transcriptIcon = call.transcript ? 'wrap_text' : '';
        this.sentimentIcon = call.analysis? callSentimentIcon : '';
        this.className = call.analysis? 'material-icons ' + callSentimentIcon : '';
    }

    private findSentimentIcon(score) {
        if (score <= -0.5){
            return 'sentiment_very_dissatisfied';
        } 
        else if(score > -0.5 && score <= -0.1) {
            return 'sentiment_dissatisfied';
        } 
        else if(score > -0.1 && score <= 0.1) {
            return 'sentiment_neutral';
        } 
        else if(score > 0.2 && score <= 0.5) {
            return 'sentiment_satisfied';
        } 
        else {
            return 'sentiment_very_satisfied';
        }
    }
}
