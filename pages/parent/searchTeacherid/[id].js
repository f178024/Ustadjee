import { useRouter } from 'next/router'
import { useState, useEffect } from 'react'
import axios from 'axios'
import StudentDashboard from "../../../components/ParentDashboard";
import ReactStars from 'react-stars'

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
                  {/* <a href={"/student/course/" + _id} className="m-0 mt-2 text-md">{title}</a> */}
                  <p className="m-0 mt-2 text-md">{title}</p>
                  <p className="m-0 text-sm text-gray-500">{subject} - {topic}</p>
                  <div className="mt-2">
                      <ReactStars value={rating} />
                  </div>
              </div>
          </div>
      </div>
  )
}

const Post = () => {

    const router = useRouter()
    const [courses, setCourses] = useState([])
    const [id, setId] = useState('')
    const [username, setUsername] = useState('')
    useEffect(() => {
        const { id } = router.query
        if(id == null) return
        setId(id)

        axios.post('/api/student/course/searchteacherCourses',{ teacherid: id }).then(response => {
       //   console.log(response.data)
         setUsername(response.data[0].user.username)
          setCourses(response.data)
          console.log("data Sent") 
      })  .catch(error => {
          console.log(error);
        });
    } , [router]);

if (courses.length== 0) {
return (

  <StudentDashboard>
 <div className="alert alert-warning">
 <h1><strong>No Course Found!</strong></h1> 
</div>
    </StudentDashboard>
  )
}

else {
return (
  <StudentDashboard>
    
  
  <h2>Courses Offered by, <b>{username}</b></h2>
  <div className="grid grid-cols-5 lg:grid-cols-3 md:grid-cols-2 sm:grid-cols-1 gap-4">
                    {
                        courses.map(item => {
                            return <Course course={item} />
                        })
                    }
                </div>

  </StudentDashboard>

)
                  }
}

export default Post 