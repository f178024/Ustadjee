import { useState } from 'react'
import Card from './Card'

function TodaysActivity() {
    const [classes, setClasses] = useState([
        {
            name: "C++",
            time: "08:00am"
        },
        {
            name: "C++",
            time: "08:00am"
        },
        {
            name: "C++",
            time: "08:00am"
        }
    ])

    return (
        <div>
            <h2>You have { classes.length } classes today</h2>
            <div className="flex flex-row sm:flex-col">
                {
                    classes.map(function (item) {
                        return <div className="mx-4 sm:my-2">
                            <Card>
                                <p className="text-2xl">{item.name}</p>
                                <p className="text-lg">{item.time}</p>
                            </Card>
                        </div>
                    })
                }
            </div>
        </div>
    )
}

export default TodaysActivity;