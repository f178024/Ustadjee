import {useState} from 'react'
import AddCourse from '../components/AddCourse'
import TeacherDashboard from '../components/TeacherDashboard'

function courses(){
    const [addCourse, setAddCourse] = useState(true)

    function handleAddCourse(){
        setAddCourse(true)
    }

    return (
        <TeacherDashboard>
            <AddCourse />
        </TeacherDashboard>
    )
}


export default courses