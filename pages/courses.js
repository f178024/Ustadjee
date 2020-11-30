import {useState} from 'react'
import AddCourse from '../components/AddCourse'
import TeacherDashboard from '../components/TeacherDashboard'
import Course from '../components/Course'

function courses(){
    const [addCourse, setAddCourse] = useState(true)

    function handleAddCourse(){
        setAddCourse(true)
    }

    return (
        <TeacherDashboard>
            {/* <AddCourse /> */}
            <Course />
        </TeacherDashboard>
    )
}


export default courses