import CourseSummary from '../components/CourseSummary'
import TodaysActivity from '../components/TodaysActivity'
import TeacherDashboard from '../components/TeacherDashboard'
import {useEffect, useState} from "react";
import withSession from "../session/session";
import useDatabase from "../mongodb/mongodb";
import {ObjectId} from 'mongodb'
import ReactStars from 'react-stars'
import axios from 'axios'
import Card from '../components/Card'
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


function home(props) {

    const {courses} = props
    let day = new Date().getDay()
    let data = courses.filter(item => item.times[day] !== "No Class" && item.status=="Current").map(item => { return {name: item.title, time: item.times[day]} })
   const {courses2} = props
   const {finaldays} = props
   const {finalTimes} = props
   const {subject} = props
   const {topic, days} = props

    let data2 = courses2.map(item => {
        return <Course course={item} />
    })

    let day_names = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday']


    return (
        <TeacherDashboard>
            <TodaysActivity classes={data}/>
           
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
           <p>{ item}</p>
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


           
            <CourseSummary  />
           <Card className="bg-gray-300">
            <div className="grid grid-cols-5 lg:grid-cols-3 md:grid-cols-2 sm:grid-cols-1 gap-4">
                    {
                        courses2.map(item => {
                            return <Course course={item} />
                        })
                    }
                </div>

                </Card>
        </TeacherDashboard>
    )
}

export default home

export const getServerSideProps = withSession(async function (context){
    const userId = context.req.session.get('id')

    const db = await useDatabase()

    let courses = await db.collection('Courses').find({
        id: ObjectId(userId)
    }, {
        projection: {
            quizes: 0,
            files: 0
        }
    }).toArray()

    courses = JSON.parse(JSON.stringify(courses))


    let courses2 = await db.collection("Courses").aggregate([
        { '$match' : { 
            'id' : ObjectId(userId)
        } 
    },

    { '$sort' : { 'rating' : -1 , 'totalStudents' : -1} } , 

    { '$limit' :  5 } , 
     
    ]).toArray()


     console.log(courses2)
     courses2 = JSON.parse(JSON.stringify(courses2))



     //Teacher's timetable
     let times = await db.collection("Courses").aggregate([
        { '$match' : { 
            'id' : ObjectId(userId)
        } 
    }  
    ]).project({ times: 1, _id: 0 , subject: 1, topic: 1 , status : 1 }).toArray()

    let days = []

    for(let i = 0; i < 7; i++){
        days.push(times.filter(item => item.times[i] !== 'No Class' && item.status === "Current"))
    }

    console.log(days)

    let finalTimes = new Array()
    let finaldays = new Array()
    let subject = new Array()
    let topic = new Array()
    for (var i=0 ; i < times.length; i++)
    {
        if (times[i].status == 'Current') {
        for (var j=0 ; j<7 ; j++)
        {

            if (times[i].times[j]!='No Class')
            {
                if ( j == 0)
                finaldays.push("Sunday") 
                else if ( j == 1)
                finaldays.push("Monday") 
                else if ( j == 2)
                finaldays.push("Tuesday") 
                else if ( j == 3)
                finaldays.push("Wednesday") 
                else if ( j == 4)
                finaldays.push("Thursday") 
                else if ( j == 5)
                finaldays.push("Friday") 
                else if ( j == 6)
                finaldays.push("Saturday")
                finalTimes.push(times[i].times[j])
                subject.push(times[i].subject)
                topic.push(times[i].topic)

               // console.log(times[i].times[j])
            }
        }

    }
    }

     //jis index pe day para hay ussi index pe finalTimes mein uska time hay 
    console.log("finaldays: " + finaldays)
    console.log("finaltimes: " + finalTimes)
    console.log("subject: " + subject)
    console.log("topic: " + topic)


    return {
        props: {
            courses , courses2, finaldays, finalTimes, subject, topic, days
        } 
    }
})