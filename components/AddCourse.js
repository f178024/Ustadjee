import Card from '../components/Card'
import { toast } from 'react-toastify';
import { useState } from 'react'
import axios from 'axios'

var arr0 = [' ']
var arr1 = [' ']
var arr2 = [' ']
var arr3 = [' ']
var arr4 = [' ']
var arr5 = [' ']
var arr6 = [' ']
function TimeDropdown(props) {
    const times = ["No Class", "08:00 am", "09:00 am", "10:00 am", "11:00 am", "12:00 pm", "01:00 pm", "02:00 pm", "03:00 pm", "04:00 pm", "05:00 pm", "06:00 pm", "07:00 pm", "08:00 pm"]
    bookedTimes()

    if (props.day == 'Sunday') {
        const sundayTimes = ["No Class", "08:00 am", "09:00 am", "10:00 am", "11:00 am", "12:00 pm", "01:00 pm", "02:00 pm", "03:00 pm", "04:00 pm", "05:00 pm", "06:00 pm", "07:00 pm", "08:00 pm"]
        // console.log(arr0)
        var lengthminus = 0; //final length except no class
        for (var i = 0; i < arr0.length; i++) {
            if (arr0[i] != 'No Class') {
                lengthminus++;
            }

        }

     //   console.log(arr0[0])

        for (var i = 1; i < 14; i++) {
            for (var j = 0; j < arr0.length; j++) {
                if (sundayTimes[i] === arr0[j]) {

                    sundayTimes.splice(i, 1);
                    console.log("Deleted")
                }
            }
        }

      //  console.log(sundayTimes)

        return (
            <div>
                <select name="" id="" className="ml-4" onChange={e => props.onChange(props.day, e.target.value)}>

                    {sundayTimes.map(function (item) {
                        return (
                            <option>{item}</option>
                        )
                    })}
                </select>
            </div>
        )

    }

    if (props.day == 'Monday') {
        const mondayTimes = ["No Class", "08:00 am", "09:00 am", "10:00 am", "11:00 am", "12:00 pm", "01:00 pm", "02:00 pm", "03:00 pm", "04:00 pm", "05:00 pm", "06:00 pm", "07:00 pm", "08:00 pm"]

        //  console.log(arr1[0])

        for (var i = 1; i < 14; i++) {
            for (var j = 0; j < arr1.length; j++) {
                if (mondayTimes[i] === arr1[j]) {

                    mondayTimes.splice(i, 1);
                    console.log("Deleted")
                }
            }
        }

     //   console.log(mondayTimes)

        return (
            <div>
                <select name="" id="" className="ml-4" onChange={e => props.onChange(props.day, e.target.value)}>

                    {mondayTimes.map(function (item) {
                        return (
                            <option>{item}</option>
                        )
                    })}
                </select>
            </div>
        )

    }


    if (props.day == 'Tuesday') {
        const tuesdayTimes = ["No Class", "08:00 am", "09:00 am", "10:00 am", "11:00 am", "12:00 pm", "01:00 pm", "02:00 pm", "03:00 pm", "04:00 pm", "05:00 pm", "06:00 pm", "07:00 pm", "08:00 pm"]

        //  console.log(arr1[0])

        for (var i = 1; i < 14; i++) {
            for (var j = 0; j < arr2.length; j++) {
                if (tuesdayTimes[i] === arr2[j]) {

                    tuesdayTimes.splice(i, 1);
                    console.log("Deleted")
                }
            }
        }

      //  console.log(tuesdayTimes)

        return (
            <div>
                <select name="" id="" className="ml-4" onChange={e => props.onChange(props.day, e.target.value)}>

                    {tuesdayTimes.map(function (item) {
                        return (
                            <option>{item}</option>
                        )
                    })}
                </select>
            </div>
        )

    }


    if (props.day == 'Wednesday') {
        const wednesdayTimes = ["No Class", "08:00 am", "09:00 am", "10:00 am", "11:00 am", "12:00 pm", "01:00 pm", "02:00 pm", "03:00 pm", "04:00 pm", "05:00 pm", "06:00 pm", "07:00 pm", "08:00 pm"]

        //  console.log(arr1[0])

        for (var i = 1; i < 14; i++) {
            for (var j = 0; j < arr3.length; j++) {
                if (wednesdayTimes[i] === arr3[j]) {

                    wednesdayTimes.splice(i, 1);
                    console.log("Deleted")
                }
            }
        }

     //   console.log("wednesdayTimes:" + wednesdayTimes)

        return (
            <div>
                <select name="" id="" className="ml-4" onChange={e => props.onChange(props.day, e.target.value)}>

                    {wednesdayTimes.map(function (item) {
                        return (
                            <option>{item}</option>
                        )
                    })}
                </select>
            </div>
        )

    }


    if (props.day == 'Thursday') {
        const thursdayTimes = ["No Class", "08:00 am", "09:00 am", "10:00 am", "11:00 am", "12:00 pm", "01:00 pm", "02:00 pm", "03:00 pm", "04:00 pm", "05:00 pm", "06:00 pm", "07:00 pm", "08:00 pm"]

        //  console.log(arr1[0])

        for (var i = 1; i < 14; i++) {
            for (var j = 0; j < arr4.length; j++) {
                if (thursdayTimes[i] === arr4[j]) {

                    thursdayTimes.splice(i, 1);
                    console.log("Deleted")
                }
            }
        }

     //   console.log("thursdayTimes:" + thursdayTimes)

        return (
            <div>
                <select name="" id="" className="ml-4" onChange={e => props.onChange(props.day, e.target.value)}>

                    {thursdayTimes.map(function (item) {
                        return (
                            <option>{item}</option>
                        )
                    })}
                </select>
            </div>
        )

    }


    if (props.day == 'Friday') {
        const fridayTimes = ["No Class", "08:00 am", "09:00 am", "10:00 am", "11:00 am", "12:00 pm", "01:00 pm", "02:00 pm", "03:00 pm", "04:00 pm", "05:00 pm", "06:00 pm", "07:00 pm", "08:00 pm"]

        //  console.log(arr1[0])

        for (var i = 1; i < 14; i++) {
            for (var j = 0; j < arr5.length; j++) {
                if (fridayTimes[i] === arr5[j]) {

                    fridayTimes.splice(i, 1);
                    console.log("Deleted")
                }
            }
        }

    //    console.log("fridayTimes:" + fridayTimes)

        return (
            <div>
                <select name="" id="" className="ml-4" onChange={e => props.onChange(props.day, e.target.value)}>

                    {fridayTimes.map(function (item) {
                        return (
                            <option>{item}</option>
                        )
                    })}
                </select>
            </div>
        )

    }


    if (props.day == 'Saturday') {
        const saturdayTimes = ["No Class", "08:00 am", "09:00 am", "10:00 am", "11:00 am", "12:00 pm", "01:00 pm", "02:00 pm", "03:00 pm", "04:00 pm", "05:00 pm", "06:00 pm", "07:00 pm", "08:00 pm"]

        //  console.log(arr1[0])

        for (var i = 1; i < 14; i++) {
            for (var j = 0; j < arr6.length; j++) {
                if (saturdayTimes[i] === arr6[j]) {

                    saturdayTimes.splice(i, 1);
                    console.log("Deleted")
                }
            }
        }

   //     console.log("saturdayTimes:" + saturdayTimes)

        return (
            <div>
                <select name="" id="" className="ml-4" onChange={e => props.onChange(props.day, e.target.value)}>

                    {saturdayTimes.map(function (item) {
                        return (
                            <option>{item}</option>
                        )
                    })}
                </select>
            </div>
        )

    }
}

function bookedTimes() {
    axios.get('/api/getclasstimes').then(result => {
        // console.log(result.data)
        //  console.log(result.data[0].times[2])

        for (var i = 0; i < result.data.length; i++) {

            arr0[i] = result.data[i].times[0]

        }


        for (var i = 0; i < result.data.length; i++) {

            arr1[i] = result.data[i].times[1]

        }

        for (var i = 0; i < result.data.length; i++) {

            arr2[i] = result.data[i].times[2]

        }

        for (var i = 0; i < result.data.length; i++) {

            arr3[i] = result.data[i].times[3]

        }

        for (var i = 0; i < result.data.length; i++) {

            arr4[i] = result.data[i].times[4]

        }

        for (var i = 0; i < result.data.length; i++) {

            arr5[i] = result.data[i].times[5]

        }

        for (var i = 0; i < result.data.length; i++) {

            arr6[i] = result.data[i].times[6]

        }
        //console.log(arr0)

    }).catch(err => {
        console.log(err)
    })

}
export default function AddCourse() {
    const days = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"]
    const [title, setTitle] = useState('')
    const [description, setDescription] = useState('')
    const [subject, setSubject] = useState('Subject')
    const [topic, setTopic] = useState('')
    const [file, setFile] = useState(null)
    const [paid, setPaid] = useState('')
    const [price, setPrice] = useState(0)
    const [times, setTimes] = useState(['No Class', 'No Class', 'No Class', 'No Class', 'No Class', 'No Class', 'No Class'])
    const topics = {
        Subject: [],
        Physics: ["Forces", "Motion", "Electricity"],
        Chemistry: ["Bonds", "Atomic Structure", "Compounds", "Acids and Bases"],
        Maths: ["Algebra", "Trigonometry", "Calculus"],
        English: ["Grammar", "Tenses", "Essay Writing"],
        Computer: ["Programming", "Hardware", "Networking"]
    }

    function handleAddCourse(e) {
        e.preventDefault()

        let oTimes = {}
        times.forEach((time, index) => {
            oTimes[index] = time
        });

        let formData = new FormData()
        formData.append('title', title)
        formData.append('description', description)
        formData.append('subject', subject)
        formData.append('topic', topic)
        formData.append('times', JSON.stringify(oTimes))
        formData.append('file', file)
        formData.append('payment', paid)
        formData.append('price',price)


        axios.post('/api/addcourse', formData).then(result => {
            if (!result.data.err) {
                toast.success('✔ Course Added')

            } else {
                toast.error('Could not process your request')
            }
        }).then(result => {
            console.log(result)
        })

        //location.reload();

    }

    function handleTimeChange(day, time) {
        const index = days.indexOf(day)
        let temp = [...times]
        temp.splice(index, 1, time)
        setTimes(temp)
    }

    return (
        <div>
            <Card>
                <form className="py-4" onSubmit={handleAddCourse}>
                    <input type="text" name="title" id="title" placeholder="Title" onChange={event => setTitle(event.target.value)} minLength="5" required /><br />
                    <select name="" id="" onChange={e => setSubject(e.target.value)} required>
                        <option value="" selected disabled>Subject</option>
                        <option>Physics</option>
                        <option>Maths</option>
                        <option>Chemistry</option>
                        <option>English</option>
                        <option>Computer</option>
                    </select>
                    <select name="" id="" onChange={e => setTopic(e.target.value)} required>
                        <option value="" selected disabled>Topic</option>
                        {
                            topics[subject].map(item => {
                                return <option>{item}</option>
                            })
                        }
                    </select>
                    <br />
                    <table>
                        {days.map(function (item) {
                            return (
                                <tr>
                                    <td>
                                        <label>{item}</label>
                                    </td>
                                    <td className="flex justify-center items-center">
                                        <TimeDropdown day={item} onChange={handleTimeChange} />
                                    </td>
                                </tr>
                            )
                        })}
                    </table>
                    <input type="file" name="" onChange={e => setFile(e.target.files[0])} />
                    <br />
                    <br />
                    <textarea name="description" id="" cols="50" rows="8" placeholder="Description" onChange={event => setDescription(event.target.value)} required></textarea><br />

                    <select name="" id="payment" onChange={e => setPaid(e.target.value)} required>
                        <option value="" selected disabled>Payment</option>
                        <option>Paid</option>
                        <option>Free</option>
                    </select>
                    {
                        paid !== "Free" ?
                        <input type="number" placeholder="$" onChange={e => setPrice(e.target.value)} />
                        :
                        null
                    }
                    <br /><br />
                    <input type="submit" value="Add Course" />
                </form>
            </Card>
        </div>
    )

}

