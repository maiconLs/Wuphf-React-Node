import { useCallback, useEffect, useState } from 'react'
import { FiX } from 'react-icons/fi'
import { Slide } from 'react-slideshow-image'
import 'react-slideshow-image/dist/styles.css'
import { IPostModel } from '../../lib/post/interfaces/IPostModel'
import { PostService } from '../../services/PostService'
import { UserType } from '../../types'
import '../CreatePosts/CreatePosts.scss'
import '../styleSlide/slide.scss'

export default function ShowPost({ close, postId, userId }: any) {
  const [user, setUser] = useState({} as UserType)
  const [post, setPost] = useState<IPostModel>()
  const [token] = useState(localStorage.getItem('token') || '')

  const getPost = useCallback(() => {
    PostService.getPostById(token, postId)
      .then(setPost)
      .catch(error => alert("Erro ao buscar post by id"));
  }, [token, postId]);

  useEffect(() => {
    getPost();
  }, [getPost])

  const fadeProperties = {
    transitionDuration: 200,
    pauseOnHover: true,
    autoplay: false,
    indicators: true,
  }
  return (
    <article className='modal'>
      <button className='close' onClick={close}>
        <FiX size={30} color='#FFF' />
      </button>
      {post && <section className='container_home'>
        <div>
          {post.images.length > 1 && (
            <Slide {...fadeProperties}>
              {post.images.map((currentImage, index) => (
                <div key={index}>
                  <img
                    src={`${process.env.REACT_APP_API}/images/posts/${currentImage}`}
                    alt='publicação do usuário'
                  />
                </div>
              ))}
            </Slide>
          )}
          {post.images.length === 1 && (
            <div key={post._id}>
              <img
                src={`${process.env.REACT_APP_API}/images/posts/${post.images}`}
                alt='publicação do usuário'
              />
            </div>
          )}
        </div>
        <div>
          <h3>{user.name}</h3>
          <p>{post.subtitle}</p>
          <div>
            {post.comments
              ? post.comments.map((comment, index) => (
                  <>
                    <div>
                      <p key={index}>{comment.user + ": " + comment.text}</p>
                    </div>
                  </>
                ))
              : ''}
          </div>
        </div>
      </section>}
    </article>
  )
}
