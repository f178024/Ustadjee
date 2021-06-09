import StudentDashboard from '../../components/ParentDashboard'
import Card from '../../components/Card'
import ChangePicture from '../../components/ChangePicture'
import Axios from "axios";
import {toast} from "react-toastify";

export default function settings(){
    function handleLogout(){
        Axios.get('/api/logout').then(result => {
            window.location.href = '/signin'
        })
    }

    function handleChangePassword(){
        toast.success("Password Changed!")
    }

    return (
        <StudentDashboard>
            <h1>Settings</h1>
            <h2>Profile Picture</h2>
            <ChangePicture />

            <h2>Reset Password</h2>
            <Card>
                <div className="pt-4">
                    <input type="password" placeholder="Old Password"/>
                    <input type="password" placeholder="New Password"/>
                    <input type="password" placeholder="Re-enter new password"/>
                    <input type="submit" onClick={handleChangePassword}/>
                </div>
            </Card>
            <h2>Logout</h2>
            <Card>
                <div className="pt-4">
                    <input type="button" value="Logout" className="bg-red-500" onClick={handleLogout}/>
                </div>
            </Card>
        </StudentDashboard>
    )
}