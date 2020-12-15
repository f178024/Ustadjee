import { useEffect, useState } from 'react'
import Card from './Card'
import axios from 'axios'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


function AddQualification(props) {
    const [degree, setDegree] = useState('')
    const [institute, setInstitute] = useState('')
    const [year, setYear] = useState('2020')
    function handleAddQualification() {
        axios.post('/api/user/qualification', {
            degree, institute, year
        }).then(result => {
            toast.success('Qualification Added!')
            props.onAdd(degree, institute, year)
        }).catch(err => {
            toast.error('Could not add qualification')
            console.log(err)
        })
    }

    return (
        <div>
            <input type="text" name="degree" placeholder="Degree" onChange={e => setDegree(e.target.value)} />
            <input type="text" name="institute" placeholder="Institute" onChange={e => setInstitute(e.target.value)} />
            <select name="" id="" onChange={e => setYear(e.target.value)}>
                <option selected>2020</option>
                <option>2019</option>
                <option>2018</option>
                <option>2017</option>
                <option>2016</option>
                <option>2015</option>
                <option>2014</option>
                <option>2013</option>
                <option>2012</option>
                <option>2011</option>
                <option>2010</option>
                <option>2009</option>
                <option>2008</option>
                <option>2007</option>
                <option>2006</option>
                <option>2005</option>
                <option>2004</option>
                <option>2003</option>
                <option>2002</option>
                <option>2001</option>
                <option>2000</option>
                <option>1999</option>
                <option>1998</option>
                <option>1997</option>
                <option>1996</option>
                <option>1995</option>
                <option>1994</option>
                <option>1993</option>
                <option>1992</option>
                <option>1991</option>
                <option>1990</option>
                <option>1989</option>
                <option>1988</option>
                <option>1987</option>
                <option>1986</option>
                <option>1985</option>
                <option>1984</option>
                <option>1983</option>
                <option>1982</option>
                <option>1981</option>
                <option>1980</option>
                <option>1979</option>
                <option>1978</option>
                <option>1977</option>
                <option>1976</option>
                <option>1975</option>
                <option>1974</option>
                <option>1973</option>
                <option>1972</option>
                <option>1971</option>
                <option>1970</option>
                <option>1969</option>
                <option>1968</option>
                <option>1967</option>
                <option>1966</option>
                <option>1965</option>
                <option>1964</option>
                <option>1963</option>
                <option>1962</option>
                <option>1961</option>
                <option>1960</option>
                <option>1959</option>
                <option>1958</option>
                <option>1957</option>
                <option>1956</option>
                <option>1955</option>
                <option>1954</option>
                <option>1953</option>
                <option>1952</option>
                <option>1951</option>
            </select>
            <input type="button" value="Add Qualification" onClick={handleAddQualification} />
            <ToastContainer />
        </div>
    )
}

export default function Qualification(props) {
    const [qualifications, setQualifications] = useState([])

    useEffect(() => {
        axios.get('/api/user/qualification').then(result => {
            setQualifications(result.data.qualification)
            console.log(result.data.qualification)
        }).catch(err => {
            console.log(err)
        })
    }, [])

    function handleAddQualification(degree, institute, year){
        setQualifications([...qualifications, {degree, institute, year}])
    }

    return (
        <div>
            <Card>
                {
                    qualifications.map(item => {
                        return (
                            <div className="mb-6">
                                <h2 className="py-0 my-0">{item.degree}</h2>
                                <p className="py-0 my-0">{item.institute} - {item.year}</p>
                            </div>
                        )
                    })
                }
                <AddQualification onAdd={handleAddQualification}/>
            </Card>
        </div>
    )
}