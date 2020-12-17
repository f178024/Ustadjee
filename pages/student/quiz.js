import StudentDashboard from '../../components/StudentDashboard'
import Card from '../../components/Card'

export default function page() {

    return (
        <StudentDashboard>
            <Card>
                <table classNmae="w-full">
                    <tr>
                        <td><a href="/student/quiz/1">Java Quiz</a></td>
                        <td>2 Days Remaining</td>
                    </tr>

                </table>
            </Card>

        </StudentDashboard>
    )

}