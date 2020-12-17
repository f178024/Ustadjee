import { useRouter } from 'next/router'
import { useState, useEffect } from 'react'
import axios from 'axios'
import AddAttendance from '../../components/AddAttendance'
import CourseDetails from '../../components/CourseDetails'
import Files from '../../components/Files'
import TeacherDashboard from '../../components/TeacherDashboard'

const Post = () => {
  const router = useRouter()

  const [course, setCourse] = useState({
    title: '',
    description: '',
    topic: '',
    subject: '',
    files: []
  })

  const [id, setId] = useState('')


  useEffect(() => {
    const { id } = router.query
    if(id == null) return
    setId(id)

    axios.get('/api/course/' + id).then(result => {
      setCourse(result.data)
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
      <img src={'/api/course/image/' + course._id} alt=""/>
      <CourseDetails course={course} />

      <Files files={course.files} id={id} onDelete={handleDeleteFile}/>
      <AddAttendance />
    </TeacherDashboard>
  )
}
export default Post