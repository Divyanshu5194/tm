import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router";
import { clearQuestionResponse, decrementQuestionId, endTest, incrementAndMark, incrementQuestionId, markQuestion, setQuestionId, startTest } from "../redux/examSlice";
import { useEffect, useState } from "react";
import { InlineMath } from "react-katex";

export default function Testpage() {
  
    const {questions,totalTime,timeElpased,currentQuestionId,testInterval,testisValid}=useSelector( (state) => state.exam)
    const [currentSubject,setCurrentSubject]=useState("Physics")
    const [optionId,setOptionId]=useState(null)
    const idOfSubject={
      Physics:1,
      Chemistry:46,
      Biology:91
    }
    useEffect(()=>{dispatch(setQuestionId(idOfSubject[currentSubject]))},[currentSubject])
    const questionToDisplay=questions.find((question)=>{return question.questionId==currentQuestionId})
    console.log({questionToDisplay})
    const navigate=useNavigate()
    const dispatch=useDispatch()
    if(!testisValid){
        navigate("/reasult")
    }
    console.log({timeElpased,testInterval})
    useEffect(()=>{dispatch(startTest())},[])
  return (
    <div className="flex flex-col h-screen font-sans text-sm bg-gray-50">
      <div className="bg-[#008B9C] text-white p-2 flex justify-between items-center shadow-sm">
        <h1 className="font-bold text-lg px-2">Neet Ug</h1>
        <span>Time Left: <span>{totalTime-timeElpased}</span></span>
      </div>

      <div className="flex bg-gray-100 border-b border-gray-300">
        <button className="bg-[#008B9C] text-white px-4 py-1.5 font-semibold flex items-center gap-1 btn" onClick={()=>{setCurrentSubject("Physics")}}>
          PHYSICS <span className="bg-white text-[#008B9C] rounded-full px-1 text-[10px]">i</span>
        </button>
        <button className="bg-[#FFA500] text-black px-4 py-1.5 font-semibold flex items-center gap-1 btn" onClick={()=>{setCurrentSubject("Chemistry")}}>
          CHEMISTRY <span className="bg-white text-[#FFA500] rounded-full px-1 text-[10px]">i</span>
        </button>
        <button className="bg-gray-200 text-gray-700 px-4 py-1.5 font-semibold border-r border-gray-300 btn"onClick={()=>{setCurrentSubject("Biology")}}>
          BIOLOGY
        </button>
      </div>

      <div className="flex items-center gap-4 p-2 bg-gray-50 border-b border-gray-200 text-xs">
        <div className="flex items-center gap-1">
          <span className="text-red-600 font-bold">Qus. No {questionToDisplay.questionId}</span>
        </div>
        <span>Qus. Type : <span className="font-bold">MCQ Single</span></span>
        <span>Marks : <span className="text-blue-600 font-bold">4</span></span>
        <span>Neg Marks : <span className="text-red-600 font-bold">1</span></span>
        <span>Subject : <span className="font-bold">{questionToDisplay.subject}</span></span>
      </div>

      <div className="flex-1 p-6 overflow-y-auto bg-white">
        <div className="mb-6">
          <p className="text-gray-800 mb-4">{questionToDisplay.statement}</p>
          {questionToDisplay.images.length>0  && <div className="max-w-md border border-dashed border-gray-300 p-8 text-center text-gray-400 italic">
            {questionToDisplay.images.map((source,index)=>{const imagePath=`../data/${source.replace("./","")}`;return <img key={index} src={imagePath}></img>})}
          </div>}
        </div>

        <div className="space-y-2">
          {questionToDisplay.options.map((optionsarray,index) => (
            <div key={index} className="flex items-center gap-3 p-2 border border-gray-200 hover:bg-gray-50 rounded-sm cursor-pointer" onClick={()=>{console.log({choosen:optionsarray[0]});setOptionId(optionsarray[0])}} >
              <input type="radio" className="w-4 h-4" checked={optionId==optionsarray[0] || optionsarray[0]==questionToDisplay.userSelected}/>
              <span className="text-gray-700 font-medium" ><InlineMath>{optionsarray[1].text}</InlineMath></span>
            </div>
          ))}
        </div>
      </div>

      <div className="border-t border-gray-300 bg-gray-100 p-3 flex justify-between items-center">
        <div className="flex gap-2">
          <button className="btn bg-gray-200 text-black font-semibold px-4 py-2 rounded-sm text-xs border border-gray-400" onClick={()=>{dispatch(clearQuestionResponse());setOptionId(null)}}>
            Clear Response
          </button>
          <button className="btn bg-gray-200 text-black font-semibold px-4 py-2 rounded-sm text-xs border border-gray-400" onClick={()=>{dispatch(decrementQuestionId());setOptionId(null)}}>
            Previous
          </button>
          <button className="btn bg-[#FFA500] text-gray-800 font-semibold px-4 py-2 rounded-sm text-xs border border-gray-400 shadow-inner" onClick={()=>{dispatch(incrementQuestionId());setOptionId(null)}}>
            Next
          </button>
          <button className="btn bg-[#28A745] text-gray-800 font-semibold px-4 py-2 rounded-sm text-xs border border-gray-400 shadow-inner" onClick={()=>{dispatch(markQuestion(optionId));setOptionId(null)}}>
            Save
          </button>
        </div>
        <button className="btn bg-[#28A745] text-white font-bold px-8 py-2 rounded-sm text-xs uppercase tracking-wider" onClick={()=>{dispatch(incrementAndMark(optionId));setOptionId(null)}}>
          Save & Next
        </button>
      </div>

      <div className="bg-[#28A745] text-white flex justify-end">
         <button className="btn bg-[#28A745] text-[10px] font-bold px-10 py-1 uppercase border-l border-white/20" onClick={()=>{dispatch(endTest());navigate("/reasult");console.log("Navigating...")}}>Submit Test</button>
      </div>
    </div>
  );
}