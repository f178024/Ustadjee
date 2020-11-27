import {useState} from 'react'

import Menu from '../components/Menu'
import Topbar from '../components/Topbar'
import ContentArea from '../components/ContentArea'
import AddCourse from '../components/AddCourse'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {faPlus} from '@fortawesome/free-solid-svg-icons'

function courses(){
    const [addCourse, setAddCourse] = useState(true)

    function handleAddCourse(){
        setAddCourse(true)
    }

    return (
        <div>
            <Topbar />
            <div className="flex flex-row">
                <Menu />
                <ContentArea>
                    <h1>Courses</h1>
                    <button className="px-4 py-2" onClick={handleAddCourse}><FontAwesomeIcon icon={faPlus} className="mr-2" />Add Course</button>
                    <div className="fixed top-2 left-auto right-auto">
                    { addCourse ? <AddCourse /> : null}
                    </div>
                    
                </ContentArea>
            </div>
        </div>
    )
}


export default courses