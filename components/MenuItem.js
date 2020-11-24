import {useState} from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

export default function MenuItem(props){
    const {name, link, icon} = props

    return (
        <li className="list-none flex flex-col justify-center items-center mb-10">
            <FontAwesomeIcon icon={icon} size={"2x"} className="mb-2"/>
            <a href={link} >{name}</a>          
        </li>
    )
}