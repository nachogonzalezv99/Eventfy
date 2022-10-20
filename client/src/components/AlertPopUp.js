import { useAppContext } from "../context/appContext"
import { BsXLg, BsCheck } from 'react-icons/bs'
import { BiErrorCircle } from 'react-icons/bi'

const AlertPopUp = () => {
    const { alertType, alertText, clearAlert } = useAppContext()

    const handle = ()=>{
        clearAlert(0)
    }
    return (
        <div className={`alert alert-${alertType}`}>
            {alertType === 'success' ? (
                <BsCheck className="icon" />
            ) : (
                <BiErrorCircle className="icon" />
            )}
            {alertText}
            <button type='button' className="alert-close" onClick={handle}>
                <BsXLg />
            </button>


        </div>

    )
}

export default AlertPopUp