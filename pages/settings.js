import Card from "../components/Card";
import TeacherDashboard from "../components/TeacherDashboard";

export default function settings(){
    return (
        <TeacherDashboard>
            <h1>Settings</h1>
            <h2>Reset Password</h2>
            <Card>
                <div className="pt-4">
                    <input type="password" placeholder="Old Password"/>
                    <input type="password" placeholder="New Password"/>
                    <input type="password" placeholder="Re-enter new password"/>
                    <input type="submit"/>
                </div>
            </Card>
            <h2>Logout</h2>
            <Card>
                <div className="pt-4">
                    <input type="button" value="Logout" className="bg-red-500"/>
                </div>
            </Card>
        </TeacherDashboard>
    )
}