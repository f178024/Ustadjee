import { useRouter } from 'next/router'
import { useState, useEffect } from 'react'
import axios from 'axios'
import CourseDetails from '../../../components/CourseDetails'
import Files2 from '../../../components/Files2'
import TeacherDashboard from '../../../components/TeacherDashboard'
import Quizes from "../../../components/student/Quizes";
import StudentDashboard from "../../../components/StudentDashboard";
import ReactStars from 'react-stars'

const Post = () => {
    const router = useRouter()
    const [status, setStatus]= useState('')
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

        // let status= "try"
        // //to take the current status//
      
            axios.post('/api/student/course/courseStatus', {courseId: id}).then(result => {
               console.log(result.data)
               setStatus(result.data)
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
            console.log(result.data.status)
            location.reload()
        }).catch(err => {
            console.log(err)
        })
    }
    var saveRating;
    const ratingChanged = (newRating) => {
        console.log(newRating)
        saveRating=newRating
        console.log( "saveRating: " + saveRating)

      }

      const addRating = () => 
      {
        axios.post('/api/student/course/addRating', {courseId: id, rate: saveRating, sub: course.subject}).then(result => {
            console.log(result.data)
        }).catch(err => {
            console.log(err)
        })

      }

    //  console.log("Status: " + status)
      if(status == "Current") {
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
                        <Files2 files={course.files} id={id} onDelete={handleDeleteFile}/>
                        <Quizes quizes={course.quizes}/>
                    
                       
                    </div>

                    ) : null
            }

        </StudentDashboard>
    )

        }
        else {
            return (  <StudentDashboard>
                
                <h1>Your Feedback is Important for us!</h1>
           
                            
                            <div>
                            <button onClick={addRating}>Add Rating</button>
    
                            <ReactStars value={0} onChange={ratingChanged} />
                            </div>
                           
                     
    
            </StudentDashboard>)
        }
}

export default Post