import Button from "./Button"
import { useState, useEffect } from "react"
import { v4 as uuidv4 } from 'uuid'

const ManageUsers = () => {
    const [usersList, setUsersList] = useState([])
    const [userData, setUserData] = useState({id: '', firstname: '', lastname: '', email: '', age: 0, sex: ''})

    const [formErrors, setFormErrors] = useState({})
    const [isFormValid, setIsFormValid] = useState(false)

    const saveUser = e => {
        e.preventDefault()
        
        if (!userData.id){
        const user = {...userData, id: uuidv4()}
        setUsersList((prevUsersList) => [...prevUsersList, user])
        console.log(user)
        } else {
            setUserData(userData)
            const updatedlist = usersList.map(user => {
                if (user.id === userData.id) {
                    return {...userData};
                  }
                return user
            })
            setUsersList(updatedlist)
        }
        setUserData({id: '', firstname: '', lastname: '', email: '', age: 0, sex: ''})
    }

    const handleInputChange = e => {
        setUserData(prevUserData => {
            return {
                ...prevUserData,
                [e.target.name]: e.target.value,
            }
        }
    )}

    const editUser = (id) => {
        const editeduser = usersList.find(el => el.id === id)
        setUserData(editeduser)
    }

    const removeUser = (id) => {
        const updatedlist = usersList.filter(user => user.id !== id)
        setUsersList(updatedlist)
    }

    useEffect(() => {
        const timer = setTimeout(() => {
            const validationresult = validate(userData)
            //console.log('validationresult', validationresult)
            setFormErrors(validationresult)
            if (
                userData.firstname &&
                !validationresult.firstname &&
                userData.lastname &&
                !validationresult.lastname &&
                userData.email &&
                !validationresult.email &&
                userData.age &&
                !validationresult.age
            ) {
                setIsFormValid(true)
            } else {
                setIsFormValid(false)
            }
        }, 500)
        return () => {
            clearTimeout(timer)
        }
    }, [userData])

    const validate = (values) => {
        console.log('values are:', values)
        const errors = {}
        if (values.firstname && values.firstname.length < 4) {
            errors.firstname = 'სახელი უნდა შეიცავდეს არანაკლებ 4 სიმბოლოს!'
        }
        if (values.lastname && values.lastname.length < 4) {
            errors.lastname = 'გვარი უნდა შეიცავდეს არანაკლებ 4 სიმბოლოს!'
        }
        if (values.email && !values.email.includes('@gmail.com')) {
            errors.email = 'მეილი უნდა შეიცავდეს @gmail.com-ს'
        }
        if (values.age && values.age < 18) {
            errors.age = 'მინიმალური ასაკია 18 წელი'
        }
        return errors
    }

    return (
        <>
            <h2>Manage Users</h2>
            <form onSubmit={saveUser}>
                <div>
                    <label>
                    მიუთითეთ სახელი:
                        <input 
                            type="text"
                            name='firstname'
                            placeholder="Firstname"
                            value={userData.firstname}
                            onChange={handleInputChange}
                        />
                    </label>
                </div>
                {formErrors.firstname && <p style={{ fontWeight: 'bold', color: 'red' }}>{formErrors.firstname}</p>}

                <div>
                    <label>
                    მიუთითეთ გვარი:
                        <input
                            type="text"
                            name='lastname'
                            value={userData.lastname}
                            onChange={handleInputChange}
                        />
                    </label>
                </div>
                {formErrors.lastname && <p style={{ fontWeight: 'bold', color: 'red' }}>{formErrors.lastname}</p>}

                <div>
                    <label>
                    მიუთითეთ ელ. ფოსტა:
                        <input
                            type="text"
                            name='email'
                            value={userData.email}
                            onChange={handleInputChange}
                        />
                    </label>
                </div>
                {formErrors.email && <p style={{ fontWeight: 'bold', color: 'red' }}>{formErrors.email}</p>}

                <div>
                    <label>
                    მიუთითეთ ასაკი:
                        <input
                            type="number"
                            name='age'
                            value={userData.age}
                            onChange={handleInputChange}
                        />
                    </label>
                </div>
                {formErrors.age && <p style={{ fontWeight: 'bold', color: 'red' }}>{formErrors.age}</p>}

                <div>
                    <label>
                    მიუთითეთ სქესი:
                        <select name='sex' onChange={handleInputChange} defaultValue={'female'}>
                            <option value={'female'}>მდედრ.</option>
                            <option value={'male'}>მამრ.</option>
                        </select>
                    </label>
                </div>

                <Button disabled={!isFormValid}>შენახვა</Button>
            </form>
            <hr/>

            <ul>
                {usersList.map((elem) => {
                    return <li key={elem.id}>{elem.firstname} | {elem.lastname} | {elem.email} | {elem.age} | {elem.id} | {elem.sex} |
                        <Button onClick={() => editUser(elem.id)}>რედაქტირება</Button> | 
                        <Button onClick={() => removeUser(elem.id)}>წაშლა</Button>
                    </li>
                })}
            </ul>
        </>
    )
}

export default ManageUsers
