const parseArguments = (args: string[]) =>{
    if(args.length < 4) throw new Error('Not enough arguments');
    if(args.length > 4) throw new Error('Too many arguments');
    if(!isNaN(Number(args[2])) && !isNaN(Number(args[3]))){
        return {
            peso: Number(args[2]),
            altura: Number(args[3])
        };
    } else {
        throw new Error('Provided values were not numbers!');
    }   
};

export const bmiCalculator = (peso: number, altura: number) =>{
    const alturaMetro = altura / 100;
    const result = peso/Math.pow(alturaMetro,2);

    if(result < 16){
        return "Severely underweight";
    }else if (result >= 16 && result <= 16.9){
        return "Underweight";
    }else if( result >= 17 && result <= 18.4){
        return "Slightly underweight";
    }else if( result >= 18.5 && result <= 24.9){
        return "Normal (healthy weight)";
    }else if( result >= 25 && result <= 29.9){
        return "Overweight";
    }else if( result >= 30 && result <= 34.9){
        return "Obese Class I";
    }else if ( result >= 35 && result <= 39.9){
        return "Obese Class II";
    }else if( result >= 40){
        return "Obese Class III";
    }
    return "Valid Params";
};
if (require.main === module){
    try {
        const { peso , altura } = parseArguments(process.argv);
        bmiCalculator(peso, altura);
    } catch (error: unknown) {
        let errorMessage = 'Something bad happened.';
        if (error instanceof Error) {
            errorMessage += ' Error: ' + error.message;
        }
        console.log(errorMessage);
    }
}