import main from '../assets/images/main.svg'
import Wrapper from '../assets/wrappers/LandingPage'
import { Logo } from '../components'
import { Link } from 'react-router-dom'

const Landing = () => {
    return (
        <Wrapper>
            <nav>
                <Logo />
            </nav>
            <div className='container page'>
                <div className='info'>
                    <h1>job <span>tracking</span> app</h1>
                    <p>
                        I'm baby food truck narwhal franzen chicharrones, celiac etsy gochujang roof party. Kombucha tumblr retro lumbersexual sriracha austin authentic gluten-free keytar. Wolf meh helvetica, pitchfork echo park raclette VHS artisan Brooklyn synth tumblr XOXO 3 wolf moon four loko.
                    </p>
                    <Link to="/register" className='btn btn-hero' >
                        Login/Register
                    </Link>
                </div>
                <img src={main} alt="job hunt" className='img main-img' />
            </div>
        </Wrapper>
    )
}

export default Landing