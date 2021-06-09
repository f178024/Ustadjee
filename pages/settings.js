import Axios from "axios";
import Card from "../components/Card";
import TeacherDashboard from "../components/TeacherDashboard";
import ChangePicture from "../components/ChangePicture";
import Qualifications from "../components/Qualifications";
import ExpertSubject from "../components/ExpertSubject";
import {toast} from "react-toastify";
import { useEffect, useState } from 'react'


export default function settings(){
    const [Subject, setSubject] = useState('')
    function handleLogout(){
        Axios.get('/api/logout').then(result => {
            window.location.href = '/signin'
        })
    }

    function handleChangePassword(){
        toast.success("Password Changed!")
    }

    function addSubject(){

        Axios.post('/api/expertSubject',{ subject: Subject }).then(response => {
            console.log(response.data)
            console.log("data Sent") 
        })  .catch(error => {
            console.log(error);
          });
    }

    return (
        <TeacherDashboard>
            <h1>Settings</h1>
            <h2>Profile Picture</h2>
            <ChangePicture />

            <h2>Qualifications</h2>
            <Qualifications />

            <h2>Expert Subject</h2>
            <ExpertSubject />
             
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
        </TeacherDashboard>
    )
}