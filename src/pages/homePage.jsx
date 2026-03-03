import { useDispatch } from "react-redux"
import { startTest } from "../redux/examSlice"
import { useNavigate } from "react-router"

export default function Homepage(){
    const dispatch=useDispatch()
    const navigate=useNavigate()
    return (
        <>
            <div className="h-screen w-screen flex bg-blue-500 justify-center align-middle">
                <button className="btn bg-green-500" onClick={()=>{dispatch(startTest());navigate("/test")}}>Begin Test</button>
            </div>
        </>
    )
}