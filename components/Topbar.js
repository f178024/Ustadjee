import { useEffect, useState } from 'react'
import axios from 'axios'


function Topbar(props){
    const {email, picture} = props.user

    return (
        <div className="flex h-16 justify-end items-center px-10">
            <div className="px-5">{email}</div>
            <div className="bg-gray-400 h-10 w-10 rounded-full">
                <img src={picture} className="h-10 w-10 rounded-full" alt=""/>
            </div>
        </div>
    )
}


export default Topbar