import { useEffect, useState } from 'react'
import StudentDashboard from '../../components/ParentDashboard'
import ReactStars from 'react-stars'
import axios from 'axios'
import React from 'react'

function Course(props) {
    const { _id, username, email, subject, phone, rating } = props.course
    return (
        <div className="bg-white rounded-lg shadow inline-block">
            <div className="flex flex-col justify-end">
                <img src={"/images/user/" + _id + ".png"} alt="" height={200} />

                <div className="p-4">
                    <div className="flex flex-row items-center">
                        <a href={"/parent/searchTeacherid/" + _id}><p>{username}</p></a>
                    </div>
                    {/* <a href={"/student/course/" + _id} className="m-0 mt-2 text-md">{title}</a> */}
                    <p className="m-0 text-sm text-gray-500">Expert In: <b>{subject}</b></p>
                    <p className="m-0 text-sm text-gray-500">Email: <b>{email}</b></p>
                    <p className="m-0 text-sm text-gray-500">Contact No:  <b>{phone}</b></p>
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

    const sendData = (e) => {
        e.preventDefault()

        let formData = new FormData(e.target)
        let name = formData.get("name")

        axios.post('/api/parent/searchteacher', { subject: name }).then(response => {
            console.log(response.data)
            setCourses(response.data)
            console.log("data Sent")
        }).catch(error => {
            console.log(error);
        });
    }

    useEffect(() => {
        axios.get('/api/parent/searchallteachers').then(result => {
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
                {/* 
                  <div className="flex flex-row w-full justify-center">
                    <input type="text" placeholder="Enter Expert Subject" onChange={e => setName(e.target.value)} value={name} /> 
                    <input type="submit" value="Submit" onClick={() => { sendData() }} />
                
                </div>             */}
                {/* </form> */}

                <form action="" method="" className="flex justify-center" onSubmit={sendData}>

                    <div className="flex w-1/2">
                        <input type="text" placeholder="Enter Subject" name="name" />
                        <input type="submit" value="Submit" className="w-16" />

                    </div>
                </form>

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
