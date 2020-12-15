import { useState } from 'react'
import Link from 'next/link'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

export default function MenuItem(props) {
    const { name, link, icon, active } = props

    return (

        <li className={"list-none flex flex-col justify-center items-center py-6 w-100 sm:flex-1" + (active ? " bg-white" : "")}>
            <Link href={link}>
            <a>
                <FontAwesomeIcon icon={icon} size={"lg"} className={"text-gray-500" + (active ? " text-primary" : "")} />
                {/* <a href={link} >{name}</a>  */}
            </a>
            </Link>
        </li>
    )
}