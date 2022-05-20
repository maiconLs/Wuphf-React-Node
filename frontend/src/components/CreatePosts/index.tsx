import api from '../../services/api'

import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

import { toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.min.css'

import { FiUpload } from 'react-icons/fi'
import { FiX } from 'react-icons/fi'
import { CgProfile } from 'react-icons/cg'

import { Slide } from 'react-slideshow-image'
import 'react-slideshow-image/dist/styles.css'
import '../styleSlide/slide.scss'

import './CreatePosts.scss'

interface IPost {
  subtitle: string
  _id: string
  image: string
  [key: string]: any
}

interface IUser {
  name: string
  username: string
  email: string
  _id: string
  image?: string
  [key: string]: any
}

export default function CreatePosts({ close }: any) {
  const [user, setUser] = useState({} as IUser)
  const [loading, setLoading] = useState(false)
  const [post, setPost] = useState([] as unknown as IPost)
  const [preview, setPreview] = useState([] as any)
  const [token] = useState(localStorage.getItem('token') || '')
  const navigate = useNavigate()

  useEffect(() => {
    api
      .get('/users/checkuser', {
        headers: {
          Authorization: `Bearer ${JSON.parse(token)} `,
        },
      })
      .then((response) => {
        setUser(response.data)
      })
  }, [token])

  function onFileChange(e: any) {
    setPreview(Array.from(e.target.files))
    setPost({ ...post, images: [...e.target.files] })
    console.log(Array.from(e.target.files))
  }

  function handleChange(e: any) {
    setPost({ ...post, [e.target.name]: e.target.value })
    console.log(post)
  }

  async function handleSubmit(e: any) {
    e.preventDefault()
    const formData = new FormData()

    const postFormData = Object.keys(post).forEach((key) => {
      if (key === 'images') {
        for (let i = 0; i < post[key].length; i++) {
          formData.append(`images`, post[key][i])
        }
      } else {
        formData.append(key, post[key])
      }
    })

    formData.append('posts', JSON.stringify(postFormData))

    await api
      .post(`/posts/createpost`, formData, {
        headers: {
          Authorization: `Bearer ${JSON.parse(token)}`,
          'Content-Type': 'multipart/form-data',
        },
      })
      .then((response) => {
        navigate('/')
        close()
        toast.success('Post cadastrado com sucesso')
        console.log(response.data)
        return response.data
      })
      .catch((err) => {
        toast.error(JSON.stringify(err.response.data.message))
        return err.response.data
      })
  }
  const fadeProperties = {
    transitionDuration: 200,
    pauseOnHover: true,
    autoplay: false,
    indicators: true,
  }

  return (
    <div className='modal'>
      <button className='close' onClick={close}>
        <FiX size={30} color='#FFF' />
      </button>
      <section className='container_home'>
        <div className='title'>
          <h3>Create new post</h3>
        </div>
        <article>
          <div className='image'>
            <div>
              {preview.length === 0 || preview.length === 1 ? (
                <div>
                  {preview.map((image: Blob | MediaSource, index: any) => (
                    <img
                      src={URL.createObjectURL(image)}
                      alt={post.name}
                      key={`${post.name}+${index}`}
                    />
                  ))}
                </div>
              ) : (
                <Slide {...fadeProperties}>
                  {preview.map((image: Blob | MediaSource, index: any) => (
                    <img
                      src={URL.createObjectURL(image)}
                      alt={post.name}
                      key={`${post.name}+${index}`}
                    />
                  ))}
                </Slide>
              )}
            </div>
          </div>

          <form onSubmit={handleSubmit}>
            <label>
              <span>
                <FiUpload color='#ccc' size={50} />
              </span>
              <input
                type='file'
                name='images'
                multiple
                onChange={onFileChange}
              />
            </label>

            <div>
              {user.image ? (
                <img
                  className='avatar'
                  src={`${process.env.REACT_APP_API}/images/users/${user.image}`}
                  alt='avatar'
                />
              ) : (
                <CgProfile className='avatar' size={25} />
              )}
              <strong>{user.username}</strong>
            </div>

            <textarea
              name='subtitle'
              value={post.subtitle}
              onChange={handleChange}
              placeholder='Add a subtitle...'
            />

            {preview.length !== 0 ? (
              <button type='submit'>
                <strong>Publish</strong>
              </button>
            ) : (
              <button disabled type='submit'>
                <strong>Publish</strong>
              </button>
            )}
          </form>
        </article>
      </section>
    </div>
  )
}
