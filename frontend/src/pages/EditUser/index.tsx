import { useEffect, useState } from 'react'
import api from '../../services/api'

import Header from '../../components/Header/index'
import avatar from '../../assets/avatar.png'

import { toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.min.css'

import { FiUpload } from 'react-icons/fi'

import { UserType } from '../../types'

import './edituser.scss'

export default function EditUser() {
  const [user, setUser] = useState({} as UserType)
  const [preview, setPreview] = useState()
  const [loading, setLoading] = useState(false)
  const [token] = useState(localStorage.getItem('token') || '')

  useEffect(() => {
    api
      .get('/users/checkuser', {
        headers: {
          Authorization: `Bearer ${JSON.parse(token)} `,
        },
      })
      .then((response) => {
        setUser(response.data)
        console.log(response.data)
      })
  }, [token])

  function handleChange(e: any) {
    setUser({ ...user, [e.target.name]: e.target.value })
  }

  function onFileChange(e: any) {
    setPreview(e.target.files[0])
    setUser({ ...user, [e.target.name]: e.target.files[0] })
  }

  const handleSubmit = async (e: any) => {
    setLoading(true)
    e.preventDefault()

    const formData = new FormData()

    const userFormData = Object.keys(user).forEach((key) =>
      formData.append(key, user[key])
    )

    formData.append('user', JSON.stringify(userFormData))
    console.log(userFormData)

    await api
      .patch(`/users/edit/${user._id}`, formData, {
        headers: {
          Authorization: `Bearer ${JSON.parse(token)}`,
          'Content-Type': 'multipart/form-data',
        },
      })
      .then((response) => {
        toast.success(JSON.stringify(response.data.message))
        console.log(response.data)
        setLoading(false)
        return response.data
      })

      .catch((error) => {
        toast.error(JSON.stringify(error.response.data.message))
        console.log(error)
        setLoading(false)
        return error.response.data
      })
  }

  return (
    <div>
      <Header />
      <div className='formUser'>
        <div>
          <h1>Edit Profile</h1>
          <div>
            {user.image || preview ? (
              <img
                className='editUser'
                src={
                  preview
                    ? URL.createObjectURL(preview)
                    : `${process.env.REACT_APP_API}/images/users/${user.image}`
                }
                alt={user.name}
              />
            ) : (
              <img src={avatar} alt='Avatar' />
            )}
          </div>

          <form className='edit' onSubmit={handleSubmit}>
            <label>
              <span>
                <FiUpload color='#FFF' size={30} />
              </span>
              <input name='image' type='file' onChange={onFileChange} />
            </label>
            <input
              name='name'
              value={user.name || ''}
              type='text'
              placeholder='name'
              onChange={handleChange}
            />
            <input
              name='username'
              value={user.username || ''}
              type='text'
              placeholder='username'
              onChange={handleChange}
            />
            <input
              name='email'
              value={user.email || ''}
              type='email'
              placeholder='email'
              onChange={handleChange}
            />
            <input
              name='password'
              type='password'
              placeholder='password'
              onChange={handleChange}
            />
            <input
              name='confirmpassword'
              type='password'
              placeholder='confirm your password'
              onChange={handleChange}
            />
            <input type='submit' value={loading ? 'Loading...' : 'Submit'} />
          </form>
        </div>
      </div>
    </div>
  )
}
