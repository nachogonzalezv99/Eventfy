import { AiOutlineStar } from "react-icons/ai"
import { AiFillStar } from "react-icons/ai"
import Wrapper from "../assets/wrappers/ActivityCard"


function ActivityCard({ name, img, category  }) {

    return (
        <Wrapper>
            <div className="activity-card">
                <img className="activity-card__img" src={img} />
                <div className="activity-card__content">
                    <p>{name}</p>
                    <div className="activity-card__info">
                        <div className="stars-container">
                            <div href="#" className="star-icon">
                                <AiOutlineStar className="star-outline" />
                                <AiFillStar className="star-full" />
                            </div>

                            <p>{0}</p>
                        </div>
                        <button>{category}</button>
                    </div>
                </div>
            </div>
        </Wrapper>

    )
}
export default ActivityCard