import { useSelector} from "react-redux"
import Homepage from "./pages/homePage"
import {BrowserRouter, Navigate} from "react-router"
import {Routes,Route} from "react-router"
import Testpage from "./pages/testPage"
import Reasultpage from "./pages/reasultPage"

export default function App(){
    const {totalTime,timeElpased,currentQuestionId,testInterval,testisValid,testStarted,testEnded}=useSelector( (state) => state.exam)

    console.log({testEnded,testStarted})
    return (
        
            <BrowserRouter>
                <Routes>
                    <Route path="/reasult" element={(testEnded)?(<Reasultpage></Reasultpage>):(<Navigate to={"/"}></Navigate>)}> </Route>
                    <Route path="/" element={<Homepage></Homepage>}> </Route>
                    <Route path="/test" element={ (testStarted)?(<Testpage></Testpage>):(<Navigate to={"/"}></Navigate>) }> </Route>
                </Routes>
            </BrowserRouter>
        
    )
}

//(testEnded)?(<Reasultpage></Reasultpage>):(<Navigate to={"/"}></Navigate>)