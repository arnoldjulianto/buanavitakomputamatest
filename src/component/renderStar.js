import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCircleChevronRight, faCircleChevronLeft, faSearch, faStar as faStarSolid } from '@fortawesome/free-solid-svg-icons'
import { faStar as faStarRegular } from '@fortawesome/free-regular-svg-icons'

const RenderStar = (props) => {
    return(
      <div>
        {(() => {
          const star = [];

          for (let i = 0; i < 5; i++) {
            star.push(<FontAwesomeIcon key={i} icon={i < props.value ? faStarSolid : faStarRegular} className="text-danger me-2" />);
          }

          return star;
        })()}
      </div>
    )
}

export default RenderStar;