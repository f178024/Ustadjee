import { useEffect, useState } from 'react'
import StudentDashboard from '../../components/StudentDashboard'
import ReactStars from 'react-stars'
import axios from 'axios'
import React from 'react'

function Course(props) {
    const { _id, user, title, subject, topic, rating } = props.course
    return (
        <div className="bg-white rounded-lg shadow inline-block">
            <div className="flex flex-col justify-end">
                <img src={"/api/course/image/" + _id} alt="" height={200} />

                <div className="p-4">
                    <div className="flex flex-row items-center">
                        <img className="rounded-full w-6 h-6 bg-gray-400 mr-2" src={"/images/user/" + user._id + ".png"} />
                        <p>{user.username}</p>
                    </div>
                    <a href={"/student/course/" + _id} className="m-0 mt-2 text-md">{title}</a>
                    <p className="m-0 text-sm text-gray-500">{subject} - {topic}</p>
                    <div className="mt-2">
                        <ReactStars value={rating} />
                    </div>
                </div>
            </div>
        </div>
    )
}
export default function index() {
    const [courses, setCourses] = useState([])
    const [name, setName] = useState('')
    const [choice, setChoice] = useState('')
    
    const sendData = () =>{
        axios.post('/api/student/course/searchSubject',{ subject: name }).then(response => {
            console.log(response.data)
            setCourses(response.data)
            console.log("data Sent") 
        })  .catch(error => {
            console.log(error);
          });
       }
   
    useEffect(() => {
          axios.get('/api/student/course/search').then(result => {
            setCourses(result.data)
            console.log(result.data)
            console.log("render")
        })

    }, [])


  //  module.exports= {subject : name}

    return (
        <div>
            <StudentDashboard>
                {/* <form action="" method="" onSubmit={submitValue()}> */}

                  <div className="flex flex-row w-full justify-center">
                    <input type="text" placeholder="Enter Subject" onChange={e => setName(e.target.value)} value={name} /> 
                    <input type="submit" value="Submit" onClick={() => { sendData() }} />
                
                </div>
  
              
                {/* </form> */}
                <div className="grid grid-cols-5 lg:grid-cols-3 md:grid-cols-2 sm:grid-cols-1 gap-4">
                    {
                        courses.map(item => {
                            return <Course course={item} />
                        })
                    }
                </div>

            </StudentDashboard>
        </div>
    )
}
