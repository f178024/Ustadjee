import {useEffect, useState} from 'react'
import Card from './Card'
import axios from "axios";

function TodaysActivity(props) {
    const { classes } = props

    return (
        <div>
            <h2>You have { classes.length } classes today</h2>
            <div className="flex flex-row sm:flex-col ">
                {
                    classes.map(function (item, index) {
                        return <div key={index.toString()} className="mx-4 sm:my-2">
                            <Card>
                                <p className="text-2xl">{item.name}</p>
                                <p className="text-lg text-gray-500">{item.time}</p>
                            </Card>
                        </div>
                    })
                }
            </div>
        </div>
    )
}

export default TodaysActivity;