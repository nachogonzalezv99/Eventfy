import styled from 'styled-components'

const Wrapper = styled.aside`
 .activity-card {
    grid-column: span 1;
    overflow: hidden;
    border: 1px solid rgb(215, 215, 215);
    border-radius: 8px;
    background-color: white;
    cursor: pointer;
    height: 340px;
}

.dark .activity-card {
    background-color: rgb(29, 29, 29);
    color: white;
    border: 1px solid rgb(50, 50, 50);
}

.activity-card:hover {
    box-shadow: 0px 0px 7px rgb(113, 113, 113, .35);
    transform: scale(1.01);
    transition: all .2s ease;
}

.activity-card__img {
    width: 100%;
    object-fit: cover;
    height: 180px;
}

.activity-card__content {
    padding: 20px;
    display: flex;
    height: 160px;
    flex-direction: column;
    justify-content: space-between;
}

.activity-card__info {
    display: flex;
    justify-content: space-between;
    align-items: center;
}

.stars-container {
    display: flex;
    align-items: center;

}

.stars-container .star-icon {
    font-size: 20px;
    display: flex;
}

.stars-container:hover .star-outline,
.stars-container .star-full{
    display: none;
}

.stars-container:hover .star-full {
    display: flex;
}

.stars-container p {
    margin-left: 5px;
}

.activity-card__content button {
    padding: 8px 14px;
    background-color: var(--primary-500);
    border: none;
    color: white;
    font-weight: 600;
    border-radius: 8px;
    cursor: pointer;
}

@media only screen and (max-width: 600px) {

    .activity-card__content {
        height: 150px;
    }

}

`
export default Wrapper
