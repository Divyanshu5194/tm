import {createSlice} from "@reduxjs/toolkit"
import testQuestions from "../../public/data/questions"



const examSlice=createSlice({
    name:"exam",
    initialState:{
        questions:testQuestions,
        totalTime:3*60*60-1,
        timeElpased:0,
        currentQuestionId:1,
        testInterval:null,
        testisValid:true,
        testStarted:false,
        testEnded:false
    },
    reducers:{
        setQuestionId:(state,action)=>{
            state.currentQuestionId=action.payload
        },
        startTestTimer:(state,action)=>{
            state.testInterval=setInterval(()=>{
                state.timeElpased+=1
                console.log({timeElpased})
            },1000)
        },
        endTest:(state,action)=>{
            clearInterval(state.testInterval)
            state.testStarted=false
            state.testEnded=true
        },
        incrementQuestionId:(state,action)=>{
            if(state.currentQuestionId<180)(state.currentQuestionId+=1)
        },
        decrementQuestionId:(state,action)=>{
            if(state.currentQuestionId>1){state.currentQuestionId-=1}
        },
        clearQuestionResponse:(state,action)=>{
            const currentQuestion=state.questions.find((question)=>question.questionId==state.currentQuestionId)
            currentQuestion.status="not Attempted"
            currentQuestion.userSelected=null
        },
        markQuestion:(state,action)=>{
            console.log({Action_Payload:action.payload})
            const currentQuestion=state.questions.find((question)=>question.questionId==state.currentQuestionId)
            currentQuestion.status="Attempted"
            currentQuestion.userSelected=action.payload
        },
        incrementAndMark:(state,action)=>{
            const currentQuestion=state.questions.find((question)=>question.questionId==state.currentQuestionId)
            currentQuestion.status="Attempted"
            currentQuestion.userSelected=action.payload
            state.currentQuestionId+=1
        },
        setTestInvalid:(state)=>{
            state.testisValid=false
        },
        startTest:(state)=>{
            state.testStarted=true
        }
    }
})
const examSliceReducer =examSlice.reducer

export const {setQuestionId,startTestTimer,endTest,incrementQuestionId,decrementQuestionId,clearQuestionResponse,markQuestion,incrementAndMark,startTest} = examSlice.actions
export default examSliceReducer