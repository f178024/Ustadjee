import StudentDashboard from '../../components/StudentDashboard'
import TodaysActivity from '../../components/TodaysActivity'
import { useEffect, useState } from "react";
import axios from "axios";
import Courses from "../../components/student/Courses";
import withSession from "../../session/session";
import useDatabase from "../../mongodb/mongodb";
import { ObjectId } from 'mongodb'
import Card from '../../components/Card'


export default function index(props) {
    const [classes, setClasses] = useState([])
    const [teacher, setTeacher] = useState('none')
    const {finaldays} = props
    const {finalTimes} = props
    const {subject} = props
    const {topic, days} = props

    let day_names = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday']


    useEffect(() => {
        axios.get("api/student/course/registeredCourses").then(result => {
            let day = new Date().getDay()

            let data = result.data.filter(item => item.times[day] !== "No Class" && item.status== "Current").map(item => { return { name: item.title, time: item.times[day] } })
            setClasses(data)
            console.log(data)

        })
        console.log(new Date().getDay())
    }, [])

    return (
        <StudentDashboard>
            <TodaysActivity classes={classes} />
            <Courses />


            {/* <Card>   <h3 className={'text-black'}>View Teachers Timetable</h3>   </Card> */}

            {/* <h3>Teachers:</h3>
            <select name="" id="" className="ml-4" onChange={e => setTeacher(e.target.value)}>

                <option value="" disabled selected>Select Teacher</option>
                {Teachers.map(function (item) {

                    return (
                        <option>{item._id}</option>
                    )

                })}
            </select> */}

            <Card className="bg-purple-200">

                <h2 >Your Timetable</h2>

            </Card>
            {/* this is the timetable's view */}

            
          <Card>
            {
                days.map((item, index) => {
                    return (
                        <div className={new Date().getDay() == index ? "bg-gray-200" : null}>
                            <h3>{day_names[index]}</h3>
                            {
                                item.map(item => {
                                    return (
                                        <div>
                                            {item.times[index]}: {item.subject} - {item.topic}
                                        </div>
                                    )
                                })
                            }
                        </div>
                    )
                })
            }

          </Card>

            {/* <Card className="bg-purple-150">

                <div className="bg-purple-200 rounded-lg shadow inline-block">
                    <p className="font-extrabold text-xl">Day</p>
                    {finaldays.map(function (item) {
                        return (
                            <p>{item}: </p>
                        )
                    })}
                </div>

                <div className="bg-purple-200 rounded-lg shadow inline-block ml-5">
                    <p className="font-extrabold text-xl">Time</p>
                    {finalTimes.map(function (item) {
                        return (
                            <p>{item}</p>
                        )
                    })}
                </div>

                <div className="bg-purple-200 rounded-lg shadow inline-block ml-5">
                    <p className="font-extrabold text-xl">Subject</p>
                    {subject.map(function (item) {
                        return (
                            <p>{item}</p>
                            
                        )
                    })}
                </div>


                <div className="bg-purple-200 rounded-lg shadow inline-block ml-5">
                    <p className="font-extrabold text-xl">Topic</p>
                    {topic.map(function (item) {
                        return (
                            <p>{item}</p>
                        )
                    })}
                </div>
            </Card> */}



        </StudentDashboard>
    )

}


export const getServerSideProps = withSession(async function (context) {
    const userId = context.req.session.get('id')
    let days = []

    const db = await useDatabase()

    // let Teachers = await db.collection("Users").aggregate([
    //     {
    //         '$match': {
    //             'type': 'Teacher'
    //         }
    //     }
    // ]).project({ _id: 1, username: 1 }).toArray()
    // console.log(Teachers)
    // Teachers = JSON.parse(JSON.stringify(Teachers))

    //Teacher's timetable
  var courseID= new Array()
  let studentCourses = await db.collection("Users").aggregate([
        {
            '$match': {
                '_id': ObjectId(userId)
            }
        }
    ]).project({ courses: 1, _id: 0 }).toArray()

    for (var i=0 ; i < studentCourses[0].courses.length; i++ )
    {
        courseID.push(studentCourses[0].courses[i])
    }
   
  //  console.log(studentCourses[0].courses.length)
   // console.log(courseID.length)

    let finalTimes = new Array()
    let finaldays = new Array()
    let subject = new Array()
    let topic = new Array()
 
    let times = []
    var x=0;
   while ( x < courseID.length) {
    console.log("hello")
    let _times = await db.collection("Courses").aggregate([
        {
            '$match': {
                '_id': ObjectId(courseID[x])
            }
        }
    ]).project({ times: 1, _id: 0, subject: 1, topic: 1 , status: 1 }).toArray()


    times.push(_times[0])



    for (var i = 0; i < times.length; i++) {
       
        if (times[i].status== "Current") {
        for (var j = 0; j < 7; j++) {

            if (times[i].times[j] != 'No Class') {
                if (j == 0)
                    finaldays.push("Sunday")
                else if (j == 1)
                    finaldays.push("Monday")
                else if (j == 2)
                    finaldays.push("Tuesday")
                else if (j == 3)
                    finaldays.push("Wednesday")
                else if (j == 4)
                    finaldays.push("Thursday")
                else if (j == 5)
                    finaldays.push("Friday")
                else if (j == 6)
                    finaldays.push("Saturday")
                finalTimes.push(times[i].times[j])
                subject.push(times[i].subject)
                topic.push(times[i].topic)

                // console.log(times[i].times[j])
            }
        }

    }

    
    }

    x = x + 1;
}
    //jis index pe day para hay ussi index pe finalTimes mein uska time hay 
    console.log("finaldays: " + finaldays)
    console.log("finaltimes: " + finalTimes)
    console.log("subject: " + subject)
    console.log("topic: " + topic)

    console.log(times)

    for(let i = 0; i < 7; i++){
        days.push(times.filter(item => item.times[i] !== 'No Class' && item.status === "Current"))
    }
    return {
        props: {
            finaldays, finalTimes, subject, topic, days
        }
    }
})