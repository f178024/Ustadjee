import { useState } from 'react'
import {useRouter} from 'next/router'
import MenuItem from './MenuItem'

export default function Menu(props) {
    const {items} = props
    const router = useRouter()

    return (
        <div>
            <nav className="h-full">
                <ul className="p-0 m-0 w-20 h-full flex flex-col pt-32 bg-gray-800 sm:flex-row sm:w-full sm:h-auto sm:pt-0">
                    {
                        items.map(
                            (item, index) => <MenuItem key={index.toString()} name={item.name} link={item.link} icon={item.icon} active={router.pathname == item.link}/>
                            )
                        }
                </ul>
            </nav>
        </div>
    )
}