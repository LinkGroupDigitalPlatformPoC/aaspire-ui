export class EmotionChartModel {
    
    radarChartData: any ;
    options: any;
   
    constructor(emo: {sadness: number, joy: number, fear: number, disgust: number, anger: number}) {
        const emoData = [emo.sadness, emo.joy, emo.fear, emo.disgust, emo.anger]

        this.options={
            legend: { display: false },
            scale: {
                ticks: {
                    min: 0,
                    max: 1,
                    stepSize: 0.2
                }
            }
        };

        this.radarChartData = {
            legend: { display: false },
            labels: ['Sadness', 'Joy', 'Fear', 'Disgust', 'Anger'],
            datasets: [
                {
                    label: null,
                    backgroundColor: 'rgba(179,181,198,0.2)',
                    borderColor: 'rgba(179,181,198,1)',
                    pointBackgroundColor: 'rgba(179,181,198,1)',
                    pointBorderColor: '#fff',
                    pointHoverBackgroundColor: '#fff',
                    pointHoverBorderColor: 'rgba(179,181,198,1)',
                    data: emoData
                }
            ]
        };
    }

}