import styled from 'styled-components'

const Wrapper = styled.main`
  * {
    box-sizing: border-box;
  }
  
  html,
  body {
    margin: 0;
    padding: 0;
    height: 100vh;
    
  }
  #root {
    height: 100vh;
  }
  body {
    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen',
      'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue',
      sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    background-color: rgb(236, 236, 236);
  }
  
  
  code {
    font-family: source-code-pro, Menlo, Monaco, Consolas, 'Courier New',
      monospace;
  }
  
  section {
    padding: 25px 0;
    display: flex;
    flex-direction: column;
  }
  
  h1,
  h2,
  h3,
  p {
    margin: 0;
  }
  
  li {
    display: inline;
  }
  
  a {
    text-decoration: none;
    color: black;
  }
  
  input {
    margin-right: 10px;
  }
  
  
  .bold {
    font-weight: 700;
  }
  
  .flex {
    display: flex;
    align-items: center;
  }
  
  .flex-r {
    margin-left: auto;
    display: flex;
    align-items: center;
  }
  
  .btn {
    background-color: var(--primary-500);
    color: white;
    border-radius: 200px;
    padding: 1em 2.2em;
    text-transform: uppercase;
    font-size: 0.9rem;
    font-weight: 600;
    border: 0;
    letter-spacing: 1px;
    transition: all .2s ease;
    cursor: pointer;
    border: 2px solid var(--primary-500);
  }
  
  .center {
    margin: 0 auto;
  }
  
  .btn:hover {
    background-color: white;
    color: #a62929;
  }
  
  .dark .btn:hover {
    background-color: rgb(9, 9, 9);
    color: var(--primary-500);
  }
  
  
  .icon {
    margin-left: 10px;
  }
  
  .hero {
    background-color: rgb(152, 45, 45);
    background-image: url("./img/hero2.jpg");
    height: 100vh;
    background-position: top center;
    background-size: cover;
    display: flex;
    flex-direction: column;
  }
  
  .dark .hero {
    background-image: url("./img/hero.jpg");
  }
  
  .container {
    width: 90%;
    max-width: 1000px;
    margin: 0 auto;
    display: flex;
    flex-direction: column;
  }
  
  .hero-container {
    width: 390px;
    margin-top: 170px;
    margin-left: 180px;
  }
  
  .hero__text,
  .hero__title {
    text-shadow: 0px 0px 2px white;
  }
  
  .hero__title {
    font-size: 40px;
  }
  
  .hero__text {
    padding-right: 90px;
    font-size: 20px;
  }
  
  .main {
    padding: 30px 0;
  }
  
  .dark .main {
    background-color: rgb(9, 9, 9);
    color: white;
  }
  
  .title {
    margin-bottom: 20px;
  }
  
  
  @media only screen and (max-width: 900px) {
    .hero-container {
      margin-left: auto;
      margin-right: auto;
    }
  
    .hero {
      background-position: 20% center;
    }
  
  }
  
  
  
  
  .card {
    display: flex;
    background-color: white;
    border-radius: 8px;
    overflow: hidden;
    border: 1px solid rgb(215, 215, 215);
    height: 250px;
    margin-bottom: 20px;
    transition: all .3s ease;
  
  }
  
  .dark .card {
    background-color: rgb(29, 29, 29);
    color: white;
    border: 1px solid rgb(50, 50, 50);
  }
  
  .event-container__img {
    width: 400px;
  }
  
  .event-content {
    padding: 30px;
  }
  
  
  
`

export default Wrapper
