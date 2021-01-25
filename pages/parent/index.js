import ParentDashboard from '../../components/ParentDashboard'
import { useState } from 'react'
import ReactStars from 'react-stars'


function Child(props) {
    const {Name, Title, Subject} = props.child
    return (
        <div className="bg-white rounded-lg shadow inline-block">
            <div className="flex flex-col justify-end">
                <div className="bg-gray-400 h-24 w-full"/>
                <div className="p-4">
                <h1>Report</h1> 
                    <div className="flex flex-row items-center">
                    <div className="rounded-full w-6 h-6 bg-gray-400 mr-2"/>
                         <p>{Name}</p>
                    </div>
                    <p className="m-0 mt-2 text-md">{Title}</p>
                    <p className="m-0 text-sm text-gray-500">{Subject}</p>
                    <div className="mt-2">
                    </div>
                </div>
            </div>
        </div>
    )
}
export default function index() {
    const [report, setReport] = useState([
        {
            
            Name: 'Sinan',
            Title: 'C++ 4 lyfe',
            Subject: 'Computer Science',
        }

    ])   

    return (
        <div>
            <ParentDashboard>
                <div className="flex flex-row w-full justify-center">
                <h1>Parent's Dashboard</h1>
                </div>

                <div className="grid grid-cols-5 lg:grid-cols-3 md:grid-cols-2 sm:grid-cols-1 gap-4">
                {
                    report.map(item => {
                        return <Child child={item} />
                    })
                }
                </div>

            </ParentDashboard>
        </div>
    )


}
