import ParentDashboard from '../../components/ParentDashboard'
import { useState, useEffect } from 'react'
import ReactStars from 'react-stars'
import axios from 'axios'

function Course(props) {
    const { _id, username, title, subject, topic, rating, totalStudents, status, price, days } = props.course
    return (
       <div className="bg-white rounded-lg shadow inline-block">
           
            <div className="flex flex-col justify-end">
                <img src={"/api/course/image/" + _id} alt="" height={200} />

                <div className="p-4">
                    <div className="flex flex-row items-center">
                        {/* <img className="rounded-full w-6 h-6 bg-gray-400 mr-2" src={"/images/user/" + _id + ".png"} /> */}
                        <p>{username}</p>
                    </div>
                    {/* <a href={"/student/course/" + _id} className="m-0 mt-2 text-md">{title}</a> */}
                    <p>{title}</p>
                    <p className="m-0 text-sm text-black-500">{subject} - {topic}</p>
                    <p className="m-0 text-sm text-gray-500">Total Students: <b className={'text-red-500'}>{totalStudents}</b></p>
                    <p className="m-0 text-sm text-gray-500">Status: <b className={'text-red-500'}>{status}</b></p>
                    <div className="mt-2">
                        <ReactStars value={rating} />
                    </div>
                </div>
            </div>
        </div>
    )
}
// function Child(props) {
//     const {Name, Title, Subject} = props.child
//     return (
//         <div className="bg-white rounded-lg shadow inline-block">
//             <div className="flex flex-col justify-end">
//                 <div className="bg-gray-400 h-24 w-full"/>
//                 <div className="p-4">
//                 <h1>Report</h1> 
//                     <div className="flex flex-row items-center">
//                     <div className="rounded-full w-6 h-6 bg-gray-400 mr-2"/>
//                          <p>{Name}</p>
//                     </div>
//                     <p className="m-0 mt-2 text-md">{Title}</p>
//                     <p className="m-0 text-sm text-gray-500">{Subject}</p>
//                     <div className="mt-2">
//                     </div>
//                 </div>
//             </div>
//         </div>
//     )
// }
export default function index() {
    // const [report, setReport] = useState([
    //     {
            
    //         Name: 'Sinan',
    //         Title: 'C++ 4 lyfe',
    //         Subject: 'Computer Science',
    //     }

    // ])   

    const [courses, setCourses] = useState([])
    useEffect(() => {
        axios.get('/api/parent/searchtopthree').then(result => {
          setCourses(result.data)
             console.log(result.data)
          console.log("render")
      })

  }, [])

    return (
        <div>
            <ParentDashboard>
                <div className="flex flex-row w-full justify-center">
                <h1>Top Rated Courses!</h1>
                </div>

                <div className="grid grid-cols-5 lg:grid-cols-3 md:grid-cols-2 sm:grid-cols-1 gap-4">
                {
                   courses.map(item => {
                        return <Course course={item} />
                    })
                }
                </div>

            </ParentDashboard>
        </div>
    )


}
