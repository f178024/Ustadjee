import AddQuiz from "../components/AddQuiz";
import Quizes from "../components/Quizes";
import TeacherDashboard from "../components/TeacherDashboard";

export default function Quiz(){
    return (
        <TeacherDashboard>
            <AddQuiz />
            <Quizes />
        </TeacherDashboard>
    )
}