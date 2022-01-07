import Header from '../../components/Header'

import avatar from '../../assets/avatar.png'
import './profile.scss'

export default function Profile(){
  return(
    <div>
      <Header/>
      <section className="container_profile">
        <div>
          <div>
            <img src={avatar} alt="avatar"/>
          </div>
          <section>
            <div>
              
            </div>
          </section>
        </div>

        <div></div>
        <div></div>
      </section>
    
      
    </div>
  )
}