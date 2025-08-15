interface Result{
    periodLength: number,
    trainingDays: number,
    success: boolean,
    rating: number,
    ratingDescription: string,
    target: number,
    average: number
}

const parseArguments = (args: string[]) =>{
    if(args.length < 4) throw new Error('Not enough arguments');
    
    const arrayArguments: number[] = [];
    for(let i = 2; i < args.length; i++){
        if(!isNaN(Number(args[i]))){
            arrayArguments.push(Number(args[i]));
        }else{
            throw new Error('Not a number');
        }
    }
    return arrayArguments;
};

export const calculateExercises = (target: number, period: number[]): Result =>{
    const periodLength =  period.length;
    const trainingDays = period.filter(hour => hour > 0 ).length;
    const totalHours = period.reduce((sum, hour)=> sum + hour, 0);
    const average = totalHours / periodLength;
    let rating = 0;
    let ratingDescription = '';
    
    if(average <= target * 0.5 ){
        rating = 1;
        ratingDescription = 'Low perfomance';
    }else if( average > target * 0.5 && average < target * 1){
        rating = 2;
        ratingDescription = 'Medium perfomance';
    }else if( average >= target * 1){
        rating = 3;
        ratingDescription = 'High perfomance';
    }

    return{
        periodLength,
        trainingDays,
        success: average >= target,
        rating,
        ratingDescription,
        target,
        average
    };
};
if (require.main === module){
try {
    const allArgs = parseArguments(process.argv);
    const target = allArgs[0];
    if (target === undefined) throw new Error('Target value is missing');
    const period = allArgs.slice(1);
    console.log(calculateExercises(target,period));
} catch (error: unknown) {
    if(error instanceof Error){
        console.log(error.message);
    }
}}