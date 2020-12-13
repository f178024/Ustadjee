import { useEffect, useState } from 'react'
import axios from 'axios'


function Topbar(){
    const [email, setEmail] = useState('')

    useEffect(() => {
        axios.post('/api/user').then(result => {
            setEmail(result.data.email)
        }).catch(err => {
            console.log(err)
        })
    });

    return (
        <div className="flex h-16 justify-end items-center px-10">
            <div className="px-5">{email}</div>
            <div className="bg-gray-400 h-10 w-10 rounded-full"></div>
        </div>
    )
}


export default Topbar