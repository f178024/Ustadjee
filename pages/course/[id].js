import { useRouter } from 'next/router'
import AddAttendance from '../../components/AddAttendance'
import AddFile from '../../components/AddFile'
import Files from '../../components/FIles'
import TeacherDashboard from '../../components/TeacherDashboard'

const Post = () => {
  const router = useRouter()
  const { id } = router.query

  return (
      <TeacherDashboard>
          <h1>Information of course {id}</h1>
          <AddFile />
          <Files />
          <AddAttendance />
      </TeacherDashboard>
  )
}

export default Post