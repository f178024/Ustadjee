import TeacherDashboard from '../components/TeacherDashboard'
import Card from '../components/Card'
import withSession from "../session/session";
import useDatabase from "../mongodb/mongodb";
import {ObjectId} from 'mongodb'


function courses(props){

    const {courses2} = props
    return (
        <TeacherDashboard>

   <Card>   <h1>Select the course to Start the Class</h1>   </Card>

         <h3>Courses:</h3>
         <select name="" id="" className="ml-4">

{courses2.map(function (item) {
    return (
        <option>{item.subject} - {item.topic} </option>
    )
})}
</select>

 <button>Start Class</button>
        </TeacherDashboard>
    )
}


export default courses

export const getServerSideProps = withSession(async function (context){
    const userId = context.req.session.get('id')

    const db = await useDatabase()
    let courses2 = await db.collection("Courses").aggregate([
        { '$match' : { 
            'id' : ObjectId(userId)
        } 
    },

    { '$sort' : { 'rating' : -1 } } 
  
    ]).project({ subject: 1, topic: 1 , _id: 0 }).toArray()


     console.log(courses2)
   //  courses2 = JSON.parse(JSON.stringify(courses2))
    return {
        props: {
           courses2
        } 
    }
})

