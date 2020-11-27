import {useState} from 'react'

import Menu from '../components/Menu'
import Topbar from '../components/Topbar'
import ContentArea from '../components/ContentArea'
import Files from '../components/Files'
import AddFile from '../components/AddFile'

import AddCourse from '../components/AddCourse'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {faPlus} from '@fortawesome/free-solid-svg-icons'

function TeacherDashboard(props){
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
                    {
                        props.children
                    }
                </ContentArea>
            </div>
        </div>
    )
}


export default TeacherDashboard