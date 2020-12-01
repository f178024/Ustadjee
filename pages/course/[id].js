import { useRouter } from 'next/router'
import AddAttendance from '../../components/AddAttendance'
import CourseDetails from '../../components/CourseDetails'
import Files from '../../components/Files'
import TeacherDashboard from '../../components/TeacherDashboard'

const Post = () => {
  const router = useRouter()
  const { id } = router.query

  return (
      <TeacherDashboard>
          <h1>Information of course {id}</h1>
          <CourseDetails />
          
          <Files />
          <AddAttendance />
      </TeacherDashboard>
  )
}

export default Post