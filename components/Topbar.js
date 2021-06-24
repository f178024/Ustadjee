import { useEffect, useState } from 'react'
import Axios from 'axios'

function handleLogout() {
    Axios.get('/api/logout').then(result => {
        window.location.href = '/signin'
    })
}


function Topbar(props) {
    let { email, picture } = props.user
    if(typeof picture === "undefined") picture = "/images/user/placeholder.png"
    return (
        <div className="flex h-16 justify-between items-center pr-10">
            <div className="bg-primary w-32 h-full flex justify-center items-center">
                <img src="/images/logo.png" alt="" className="h-12" />

                
            </div>
            <div className="flex flex-row items-center">
                <div className="px-5">{email}</div>
                <div className="bg-gray-400 h-10 w-10 rounded-full">
                    <img src={picture} className="h-10 w-10 rounded-full" alt="" />

                </div>

                <div class="dropdown">
                    <i class="dropbtn fa fa-align-justify"></i>
                    <div class="dropdown-content">
                        <a onClick={handleLogout}>Logout</a>     
                    </div>
                </div>

                
            </div>
        </div>
    )
}


export default Topbar