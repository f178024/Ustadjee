import { useRouter } from 'next/router'
import { useState, useEffect } from 'react'
import axios from 'axios'
import CourseDetails from '../../../components/CourseDetails'
import Files2 from '../../../components/Files2'
import TeacherDashboard from '../../../components/TeacherDashboard'
import Quizes from "../../../components/student/Quizes";
import StudentDashboard from "../../../components/StudentDashboard";
import ReactStars from 'react-stars'
import { loadStripe } from '@stripe/stripe-js';
import { toast } from 'react-toastify';


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

    async function registerCourse(){
        if(typeof course.payment === "undefined" || course.payment !== "Paid"){
            axios.post('/api/student/course/registerCourse', {courseId: id}).then(result => {
                console.log(result.data.status)
                location.reload()
            }).catch(err => {
                console.log(err)
            })
        } else {
            try {
                // Get Stripe.js instance
                const stripe = await loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY)
                                
                // Call your backend to create the Checkout Session
                const response = await axios.post('/api/stripe/checkout', {courseName: course.title, price: course.price, courseId: id});

                const session = response.data;

                // When the customer clicks on the button, redirect them to Checkout.
                const result = await stripe.redirectToCheckout({
                    sessionId: session.id,
                });
            } catch(error){
                toast.error('Could not connect to Stripe')
            }
            
        }
            
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
      
            <CourseDetails course={course} />

            {
                !isRegistered() ? (<button className={'mt-4'} onClick={registerCourse}>Register Course</button>) : null
            }

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