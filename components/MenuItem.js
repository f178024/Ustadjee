import { useState } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

export default function MenuItem(props) {
    const { name, link, icon, active } = props

    return (

        <li className={"list-none flex flex-col justify-center items-center py-6 w-100 sm:flex-1" + (active ? " bg-white" : "")}>
            <a href={link}>
                <FontAwesomeIcon icon={icon} size={"lg"} className={"text-gray-500" + (active ? " text-primary" : "")} />
                {/* <a href={link} >{name}</a>  */}
            </a>
        </li>
    )
}