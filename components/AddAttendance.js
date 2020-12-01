import { useState } from 'react'
import Card from "./Card";

export default function AddAttendance() {
    const [attendances, setAttendances] = useState([
        {
            name: "Sinan",
            status: "Absent"
        },
        {
            name: "Sinan",
            status: "Present"
        },
        {
            name: "Sinan",
            status: "N/A"
        },
    ])
    return (
        <div>
            <h2>Attendance</h2>
            <Card>
                <table className="w-full">
                    <tr>
                        <th className="text-left">Name</th>
                        <th className="text-left">Status</th>
                    </tr>
                    {
                        attendances.map(function (item) {
                            return <tr>
                                <td>{item.name}</td>
                                <td>
                                    <select defaultValue={item.status}>
                                        <option>Present</option>
                                        <option>Absent</option>
                                        <option>N/A</option>
                                    </select>
                                </td>
                            </tr>
                        })
                    }
                </table>
            </Card>
        </div>
    )
}