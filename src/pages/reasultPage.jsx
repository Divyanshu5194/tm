import { useSelector } from 'react-redux';

const ResultPage = () => {
    const stats = {
        totalMarks:720,
        obtainedMarks:0,
        correct:0,
        incorrect:0,
        skipped:0,
        timeTaken:0
    };

    const {totalTime,timeElpased,currentQuestionId,testInterval,testisValid,testStarted,testEnded,questions}=useSelector( (state) => state.exam)
    
    questions.forEach(question => {
        if (question.userSelected){
            if(question.userSelected==question.answer){
                stats.correct+=1,
                stats.obtainedMarks+=4
            }
            else if(question.userSelected!=question.answer){
                stats.incorrect+=1,
                stats.obtainedMarks-=1
            }
        }
        else{
            stats.skipped+=1
            stats.obtainedMarks+=0
        }
        question.useSelector=null
    });

    

    return (
        <div>
            <p>Attempted: {stats.correct+stats.incorrect}</p>
            <p>Correct: {stats.correct}</p>
            <p>INcorrect : {stats.incorrect}</p>
            <p>Skipped: {stats.skipped}</p>
            <p>Obtained Marks : {stats.obtainedMarks}</p>
        </div>
);
}

export default ResultPage;