import StudentDashboard from '../../components/StudentDashboard'
import TodaysActivity from '../../components/TodaysActivity'
import {useEffect, useState} from "react";
import axios from "axios";
import Courses from "../../components/student/Courses";

export default function index(props) {
    const [classes, setClasses] = useState([])

    useEffect(() => {
        axios.get("api/student/course/registeredCourses").then(result => {
            let day = new Date().getDay()

            let data = result.data.filter(item => item.times[day] !== "No Class").map(item => { return {name: item.title, time: item.times[day]} })
            setClasses(data)
            console.log(data)

        })
        console.log(new Date().getDay())
    }, [])

    return (
        <StudentDashboard>
            <TodaysActivity classes={classes}/>
            <Courses />
        </StudentDashboard>
    )

}