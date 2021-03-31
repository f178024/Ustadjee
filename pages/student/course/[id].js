import { useRouter } from 'next/router'
import { useState, useEffect } from 'react'
import axios from 'axios'
import CourseDetails from '../../../components/CourseDetails'
import Files from '../../../components/Files'
import TeacherDashboard from '../../../components/TeacherDashboard'
import Quizes from "../../../components/student/Quizes";
import StudentDashboard from "../../../components/StudentDashboard";

const Post = () => {
    const router = useRouter()

    const [course, setCourse] = useState({
        title: '',
        description: '',
        topic: '',
        subject: '',
        files: [],
        quizes: []
    })
    const [registeredCourses, setRegisteredCourses] = useState([])

    const [id, setId] = useState('')

    useEffect(() => {
        const { id } = router.query
        if(id == null) return
        setId(id)

        axios.get('/api/course/' + id).then(result => {
            setCourse(result.data)
            console.log(result.data)
        }).catch(err => {
            console.log(err)
        })

        axios.post('/api/student/course/registeredCourses', {courseId: id}).then(result => {
            let data = result.data.map(item => item._id)
            setRegisteredCourses(data)
            console.log("registered courses")
            console.log(data)
        }).catch(err => {
            console.log(err)
        })

    }, [router]);

    function handleDeleteFile(index){
        let temp = {...course}
        temp.files.splice(index, 1)
        setCourse(temp)
    }

    function isRegistered(){
        return registeredCourses.indexOf(id) !== -1
    }

    function registerCourse(){
        axios.post('/api/student/course/registerCourse', {courseId: id}).then(result => {
            console.log(result.data)
            location.reload()
        }).catch(err => {
            console.log(err)
        })
    }

    return (
        <StudentDashboard>
            <h1>Information of {course.title}</h1>
            <img src={'/api/course/image/' + course._id} alt="" width="280"/> <br/>
            {
                !isRegistered() ? (<button onClick={registerCourse}>Register Course</button>) : null
            }
            <CourseDetails course={course} />

            {
                 isRegistered() ? (
                    <div>
                        <Files files={course.files} id={id} onDelete={handleDeleteFile}/>
                        <Quizes quizes={course.quizes}/>
                    </div>

                    ) : null
            }

        </StudentDashboard>
    )
}
export default Post