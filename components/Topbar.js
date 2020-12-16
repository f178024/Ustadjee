import { useEffect, useState } from 'react'
import axios from 'axios'


function Topbar(props){
    const {email, picture} = props.user

    return (
        <div className="flex h-16 justify-between items-center pr-10">
            <div className="bg-primary w-20 h-full flex justify-center items-center">
                <img src="/images/logo.png" alt="" className="h-12"/>
            </div>
            <div className="flex flex-row items-center">
            <div className="px-5">{email}</div>
            <div className="bg-gray-400 h-10 w-10 rounded-full">
                <img src={picture} className="h-10 w-10 rounded-full" alt=""/>
            </div>
            </div>
        </div>
    )
}


export default Topbar