import Menu from '../components/Menu'
import Topbar from '../components/Topbar'
import ContentArea from '../components/ContentArea'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {faPlus} from '@fortawesome/free-solid-svg-icons'

function courses(){
    return (
        <div>
            <Topbar />
            <div className="flex flex-row">
                <Menu />
                <ContentArea>
                    <h1>Courses</h1>
                    <button className="px-4 py-2"><FontAwesomeIcon icon={faPlus} className="mr-2" />Add Course</button>
                </ContentArea>
            </div>
        </div>
    )
}


export default courses