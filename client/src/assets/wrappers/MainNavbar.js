import styled from 'styled-components'

const Wrapper = styled.aside`
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
    background: var(--primary-500);
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
  .btn-sm {
  cursor: pointer;
  color: var(--white);
  background: var(--primary-500);
  border: transparent;
  border-radius: var(--borderRadius);
  letter-spacing: var(--letterSpacing);
  padding: 0.375rem 0.75rem;
  box-shadow: var(--shadow-2);
  transition: var(--transition);
  text-transform: capitalize;
  display: flex;
  gap: 0 0.5rem;
  margin-left: 20px;
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
    margin-bottom: 20px;
    transition: all .3s ease;
    max-height: 300px;
  
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
.nav {
    position: fixed;
    width: 100%;
    background-color: rgb(255, 255, 255, .8);
    color: black;
    z-index: 10;
}

@media only screen and (max-width: 700px) { 
  .card {
    max-height: 100%;
  
  }
}

@media only screen and (max-width: 600px) { 
.logo{
  height: 30px;
}
}

.dark .logo {
    color: white;
}

.menu__list {
    margin-left: 20px;
    cursor: pointer;
    font-weight: 500;
}

.colorMode {
    display: flex;
    font-size: 12px;
    align-items: center;
    margin-left: 35px;
    margin-right: 35px;
}

.colorMode__lightText {
    font-weight: 700;
}

.colorMode__darkText {
    font-weight: light;
    color: grey;
}

.colorMode__button {
    width: 33px;
    height: 16px;
    border: 2px solid rgb(185, 185, 185);
    background-color: black;
    margin: 0 10px;
    border-radius: 10px;
    position: relative;
    cursor: pointer;
}

.colorMode__button__check {
    width: 16px;
    height: 15px;
    border: 2px solid rgb(185, 185, 185);
    background-color: white;
    margin: 0 10px;
    border-radius: 10px;
    position: absolute;
    top: -1px;
    left: -11px;
    transition: all .4s ease;
}

.profile {
    display: flex;
    align-items: center;
}

.profile-icon {
    background-color: rgb(236, 236, 236);
    width: 40px;
    height: 40px;
    display: flex;
    justify-content: center;
    align-items: center;
    border-radius: 50%;
    margin-right: -3px;
}
.profile-icon:hover {
    background-color: rgb(170, 170, 170);

}

.profile-logout {
    background-color: rgb(236, 236, 236);
    height: 25px;
    border: none;
    cursor: pointer;
    left: 35px;
    border-radius: 0 10px 10px 0;
}

.profile-logout:hover {
    background-color: rgb(170, 170, 170);

}

.login {
    background-color: rgb(236, 236, 236);
    border-radius: 10px;
    padding: 5px 10px;
}

.login:hover {
    cursor: pointer;
    background-color: rgb(170, 170, 170);
}





.dark .nav {
    background-color: rgb(0, 0, 0, 0.8);
    color: white;
}

.dark .colorMode {
    font-weight: light;
    color: rgb(255, 255, 255);
}

.dark .colorMode__lightText {
    font-weight: 400;
    color: grey;
}

.dark .colorMode__darkText {
    font-weight: 700;
    color: white;
}

.dark .colorMode__button {
    border: 2px solid rgb(185, 185, 185);
    background-color: white;
}

.dark .colorMode__button__check {
    background-color: rgb(14, 13, 13);
    top: -1px;
    left: 4px;
    transition: all .4s ease;
}
.activities-container {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(260px, 1fr));
    gap: 20px;
    margin-bottom: 20px;
  }
  .categories-container {
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
}

.category {
    background-color: yellow;
    padding: 12px 25px;
    border-radius: 130px;
    background-color: var(--primary-500);
    color: white;
    font-weight: 500;
    cursor: pointer;
    margin: 9px 14px;
    transition: all .2s ease;

}

.category:hover {
    transform: scale(1.1);
    box-shadow: 0px 0px 8px rgb(32, 32, 32, .45);

}
.full-width {
    width: 100%;
    display: grid;
    grid-template-columns: 250px 1fr;
    padding-top: 55px;
    margin: 0 auto;

}

.dark .full-width {
    background-color: rgb(9, 9, 9);
    color: white;
}

.top {
    grid-column: 2 / -1;
}

.aside {
    grid-column: 1 / 2;
    padding: 30px 0 30px 50px;
}

.content {
    grid-column: 2 / -1;
    padding: 30px 50px 30px 30px;
}

@media only screen and (max-width: 900px) {
    .top {
        grid-column: 1 / -1;
        text-align: center;
    }
    .aside {
        grid-column: 1 / -1;
        width: 100%;
        padding: 30px;
    }
    .filters-group{
      display: flex;
      background-color: red;
      align-content: stretch;
}

    .content {
        grid-column: 1 / -1;
        padding: 30px 30px;
    }

    .options {
        display: flex;
        width: 100%;
        flex-wrap: wrap;
    }
    input, textarea {
    padding: 10px 10px;
    border: 1px solid rgb(215, 215, 215);
    border-radius: 8px;
    background-color: white;

}
}

.checkbox-container {
    display: block;
    position: relative;
    padding-left: 32px;
    margin-bottom: 12px;
    cursor: pointer;
    -webkit-user-select: none;
    -moz-user-select: none;
    -ms-user-select: none;
    user-select: none;
    margin-right: 20px;

}

.checkbox {
    position: absolute;
    opacity: 0;
    cursor: pointer;
    height: 0;
    width: 0;
}

.checkmark {
    position: absolute;
    top: 0;
    left: 0;
    align-items: center;
    height: 25px;
    width: 25px;
    border: 1px solid rgb(215, 215, 215);
    border-radius: 8px;
    background-color: white;
}

/* On mouse-over, add a grey background color */
.checkbox-container:hover input~.checkmark {
    background-color: #ccc;
}

/* When the checkbox is checked, add a blue background */
.checkbox-container input:checked~.checkmark {
    background-color: var(--primary-500);
}

/* Create the checkmark/indicator (hidden when not checked) */
.checkmark:after {
    content: "";
    position: absolute;
    display: none;
}

/* Show the checkmark when checked */
.checkbox-container input:checked~.checkmark:after {
    display: block;
}

/* Style the checkmark/indicator */
.checkbox-container .checkmark:after {
    left: 8px;
    top: 4px;
    width: 5px;
    height: 10px;
    border: solid white;
    border-width: 0 3px 3px 0;
    -webkit-transform: rotate(45deg);
    -ms-transform: rotate(45deg);
    transform: rotate(45deg);
}



.checkmark-radio {
    position: absolute;
    top: 0;
    left: 0;
    align-items: center;
    height: 25px;
    width: 25px;
    border: 1px solid rgb(215, 215, 215);
    border-radius: 50%;
    background-color: white;
}

/* On mouse-over, add a grey background color */
.checkbox-container:hover input~.checkmark-radio {
    background-color: #ccc;
}

/* When the checkbox is checked, add a blue background */
.checkbox-container input:checked~.checkmark-radio {
    background-color: var(--primary-500);
}

/* Create the checkmark/indicator (hidden when not checked) */
.checkmark-radio:after {
    content: "";
    position: absolute;
    display: none;
}

/* Show the checkmark when checked */
.checkbox-container input:checked~.checkmark-radio:after {
    display: block;
}

/* Style the checkmark/indicator */
.checkbox-container .checkmark-radio:after {
    top: 7px;
    left: 7px;
    width: 9px;
    height: 9px;
    border-radius: 50%;
    background: white;
}

`
export default Wrapper
