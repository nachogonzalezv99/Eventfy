import styled from 'styled-components'

const Wrapper = styled.main`
 

.card-btn:hover {
    cursor: pointer;
    box-shadow: 0px 0px 7px rgb(113, 113, 113, .35);
    transform: scale(1.01);


}


.card-image__container{
    width: 35%;
    background-color: red;
}
.card__img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    object-position: center;
    

}


.card__content {
    padding: 25px;
    width: 65%;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    background-color: white;
    border-left: 1px solid rgb(215,215,215);
}

.card__top {
    display: flex;
    justify-content: space-between;
    width: 100%;
}

.card__company {
    margin-left: 10px;
    color: grey;
}

.card__right {
    text-align: right;
    margin-left: 42px;
}
.card__title {
    font-size: 27px;
}

.card__text {
    width: 420px;
}


.card__bottom {
    margin-left: auto;
    text-align: right;
}

@media only screen and (max-width: 900px) {
    .card-image__container{
        width: 25%;
    }
    .card__content{
            width: 100%;
        }
}

@media only screen and (max-width: 700px) {
        .card {
            flex-direction: column;
            height: 100%;
        }
        .card-image__container{
            height: 200px;
            width: 100%;
        }
        .card__content{
            width: 100%;
        }
        .card__text, .card__right {
            display: none;
        }
        .card__title, .card__company {
            text-align: center;
            margin-bottom: 15px;
        }
        .card__bottom{
            margin-left: 0;
            text-align: center;
        }
}
`

export default Wrapper
