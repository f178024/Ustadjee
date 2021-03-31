import CourseSummary from '../components/CourseSummary'
import TodaysActivity from '../components/TodaysActivity'
import TeacherDashboard from '../components/TeacherDashboard'
import {useEffect, useState} from "react";
import withSession from "../session/session";
import useDatabase from "../mongodb/mongodb";
import {ObjectId} from 'mongodb'

function home(props) {
    const {courses} = props
    let day = new Date().getDay()
    let data = courses.filter(item => item.times[day] !== "No Class").map(item => { return {name: item.title, time: item.times[day]} })

    return (
        <TeacherDashboard>
            <TodaysActivity classes={data}/>
            <CourseSummary />
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

    return {
        props: {
            courses
        }
    }
})