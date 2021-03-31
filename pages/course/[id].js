import { useRouter } from 'next/router'
import { useState, useEffect } from 'react'
import axios from 'axios'
import AddAttendance from '../../components/AddAttendance'
import CourseDetails from '../../components/CourseDetails'
import Files from '../../components/Files'
import TeacherDashboard from '../../components/TeacherDashboard'
import AddQuiz from "../../components/AddQuiz";
import Quizes from "../../components/Quizes";
import useDatabase from "../../mongodb/mongodb";
import { ObjectId } from 'mongodb'

export default function Post(props) {
  const router = useRouter()
  const {students} = props

  const [course, setCourse] = useState({
    title: '',
    description: '',
    topic: '',
    subject: '',
    files: [],
    quizes: []
  })

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
  }, [router]);

  function handleDeleteFile(index){
    let temp = {...course}
    temp.files.splice(index, 1)
    setCourse(temp)
  }

  return (
    <TeacherDashboard>
      <h1>Information of {course.title}</h1>
      <img src={'/api/course/image/' + course._id} alt="" width="300"/>
      <CourseDetails course={course} />

      <Files files={course.files} id={id} onDelete={handleDeleteFile}/>
      <AddQuiz courseId={id}/>
      <Quizes quizes={course.quizes}/>
      <AddAttendance students={students} courseId={id} />
    </TeacherDashboard>
  )
}

export async function getServerSideProps(context){
  let {id} = context.params
  let db = await useDatabase()

  let students = await db.collection('Users').find({
    courses: ObjectId(id)
  }).toArray()
  students = JSON.parse(JSON.stringify(students))

  return {
    props: {
      students
    }
  }
}