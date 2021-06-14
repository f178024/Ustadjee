import CourseSummary from '../components/CourseSummary'
import TodaysActivity from '../components/TodaysActivity'
import TeacherDashboard from '../components/TeacherDashboard'
import {useEffect, useState} from "react";
import withSession from "../session/session";
import useDatabase from "../mongodb/mongodb";
import {ObjectId} from 'mongodb'
import ReactStars from 'react-stars'
import axios from 'axios'
function Course(props) {
    const { _id, username, title, subject, topic, rating, totalStudents } = props.course
    return (
       
       <div className="bg-white rounded-lg shadow inline-block">
           
            <div className="flex flex-col justify-end">
                <img src={"/api/course/image/" + _id} alt="" height={200} />

                <div className="p-4">
                    <div className="flex flex-row items-center">
                        <img className="rounded-full w-6 h-6 bg-gray-400 mr-2" src={"/images/user/" + _id + ".png"} />
                        <p>{username}</p>
                    </div>
                    {/* <a href={"/student/course/" + _id} className="m-0 mt-2 text-md">{title}</a> */}
                    <p>{title}</p>
                    <p className="m-0 text-sm text-gray-500">{subject} - {topic}</p>
                    <p className="m-0 text-sm text-gray-500">Total Students: <b>{totalStudents}</b></p>
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
    let data = courses.filter(item => item.times[day] !== "No Class").map(item => { return {name: item.title, time: item.times[day]} })
   const {courses2} = props
    let data2 =   courses2.map(item => {
        return <Course course={item} />
    })

    return (
        <TeacherDashboard>
            <TodaysActivity classes={data}/>
            <CourseSummary  />
            <div className="grid grid-cols-5 lg:grid-cols-3 md:grid-cols-2 sm:grid-cols-1 gap-4">
                    {
                        courses2.map(item => {
                            return <Course course={item} />
                        })
                    }
                </div>

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

    { '$limit' :  3 } , 
     
    ]).toArray()


     console.log(courses2)
     courses2 = JSON.parse(JSON.stringify(courses2))
    return {
        props: {
            courses , courses2
        } 
    }
})