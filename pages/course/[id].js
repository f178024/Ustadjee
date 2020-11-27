import { useRouter } from 'next/router'
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
      </TeacherDashboard>
  )
}

export default Post