import CourseSummary from '../components/CourseSummary'
import TodaysActivity from '../components/TodaysActivity'
import TeacherDashboard from '../components/TeacherDashboard'

function home() {
    return (
        <TeacherDashboard>
            <TodaysActivity />
            <CourseSummary />
        </TeacherDashboard>
    )
}


export default home