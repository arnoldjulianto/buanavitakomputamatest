
import Collapse from 'react-bootstrap/Collapse'
import loadingImg from '../assets/icon/loading.gif'
import noImg from '../assets/icon/no_image.png'
import InfiniteScroll from 'react-infinite-scroll-component';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCircleChevronRight, faCircleChevronLeft, faSearch, faStar as faStarSolid } from '@fortawesome/free-solid-svg-icons'
import RenderStar from './renderStar.js'
import RenderOrigin from './renderOrigin.js'
import RenderPersonality from './renderPersonality.js'

const catList = (props) => {
    return(
        <section className="content">
        {props.loadingVisible && props.showCatList &&
          <div className="text-center">
            <img src={loadingImg} className="rounded" style={{width:100, height:100}} ></img>
          </div>
        }

        {!props.loadingVisible && props.showCatList &&
          <InfiniteScroll
            dataLength={props.catList.length} //This is important field to render the next data
            next={props.getCatData}
            hasMore={props.hasMoreItems}
            scrollThreshold={"200px"}
            loader={
              <div className="text-center">
                <img src={loadingImg} className="rounded" style={{width:100, height:100}} ></img>
              </div>
            }>

            <div className="gx-5 row wrapper" >
                {
                  props.catList.map( (value, idx) => 
                    <div className="mb-4 col-md-6 col-sm-12 " key={idx}>
                      <div className="card content-wrapper ">
                          <div className="row card-body">
                                <div className={`col-md-`+props.imgConfig[idx].size}>
                                  {value.reference_image_id && 
                                    <img src={"https://cdn2.thecatapi.com/images/"+value.reference_image_id+props.imgConfig[idx].ext} className="card-img-top mb-2 mt-1 rounded mx-auto " alt={""} style={{height:300, objectFit:'contain'}} onError={(e) => {
                                      if(props.imgConfig[idx].ext == ".jpg" ){
                                        const data = [...props.imgConfig];
                                        data[idx].ext = ".png";
                                        props.setImgConfig(data);
                                      }
                                      else if(props.imgConfig[idx].ext == ".png" ){
                                        const data = [...props.imgConfig];
                                        data[idx].ext = ".jpg";
                                        props.setImgConfig(data);
                                      }
                                      e.target.onerror = null;
                                    }} ></img>
                                  }

                                  {!value.reference_image_id && 
                                    <img src={noImg} className="card-img-top mb-2 mt-1 rounded mx-auto " alt={""} style={{height:300, objectFit:'contain'}} ></img>
                                  }
                                  <h4 className="card-title text-center">{value.name}</h4>
                                </div>  

                                <div className="col-md-7 text-center px-0">
                                    <Collapse in={props.openDetail[idx].status} dimension={"width"} >
                                        <div id={"example-collapse-text"+idx} className="text-start content-item" >
                                          <h6 className="mt-4 mb-4">
                                              <RenderOrigin origin = {value.origin} country_code = {value.country_code} />
                                              <RenderPersonality text = {value.experimental > 0 ? "Experimental" : value.hairless > 0 ? "Hairless" : value.natural > 0 ? "Natural" : value.rare > 0 ? "Rare" : value.rex > 0 ? "Rex" : value.suppressed_tail > 0 ? "Suppressed Tail" : value.short_legs > 0 ? "Short Legs"  : value.hypoallergenic > 0 ? "Hypoallergenic" : ""} />
                                          </h6>     
                                          <p>{value.description}</p>
                                          <hr style={{borderWidth:2, borderColor:'black'}}/>
                                          <p style={{fontSize:15, fontStyle:'italic'}}>{value.temperament}</p>
                                          <hr style={{borderWidth:2, borderColor:'black'}}/>
                                          <table style={{fontSize:15}} className="table table-borderless">
                                            <tbody>                                    
                                              {
                                                value.alt_names != "" && 
                                                <tr>
                                                  <td>Alternate Name</td>
                                                  <td>:</td>
                                                  <td>{value.alt_names}</td>
                                                </tr>
                                              }

                                              {value.weight &&
                                              <tr>
                                                <td>Weight</td>
                                                <td>:</td>
                                                <td>{value.weight.metric} Kg  </td>
                                              </tr>
                                              }

                                              <tr>
                                                <td>Life Span</td>
                                                <td>:</td>
                                                <td>{value.life_span} Kg  </td>
                                              </tr>
                                            </tbody>
                                          </table>
                                          
                                          <hr style={{borderWidth:2, borderColor:'black'}}/>

                                          <ul className="p-0">
                                            <li >
                                              <h6>Affection Level</h6>
                                              <RenderStar value={value.affection_level} />
                                            </li>

                                            <li>
                                              <h6>Adaptability</h6>
                                              <RenderStar value={value.adaptability} />
                                            </li>

                                            <li>
                                              <h6>Child Friendly</h6>
                                              <RenderStar value={value.child_friendly} />
                                            </li>

                                            <li>
                                              <h6>Dog Friendly</h6>
                                              <RenderStar value={value.dog_friendly} />
                                            </li>

                                            <li>
                                              <h6>Energy Level</h6>
                                              <RenderStar value={value.energy_level} />
                                            </li>

                                            <li>
                                              <h6>Grooming</h6>
                                              <RenderStar value={value.grooming} />
                                            </li>

                                            <li>
                                              <h6>Helath Issues</h6>
                                              <RenderStar value={value.health_issues} />
                                            </li>

                                            <li>
                                              <h6>Intelligence</h6>
                                              <RenderStar value={value.intelligence} />
                                            </li>
                                            
                                            <li>
                                              <h6>Shedding Level</h6>
                                              <RenderStar value={value.shedding_level} />
                                            </li>

                                            <li>
                                              <h6>Social Needs</h6>
                                              <RenderStar value={value.social_needs} />
                                            </li>

                                            <li>
                                              <h6>Stranger Friendly</h6>
                                              <RenderStar value={value.stranger_friendly} />
                                            </li>

                                            <li>
                                              <h6>Vocalisation</h6>
                                              <RenderStar value={value.vocalisation} />
                                            </li>
                                          </ul>

                                        </div>
                                    </Collapse>
                                </div> 
                          </div>

                            <div className="card-footer text-end">
                                <button type="button" 
                                    className={`btn ${props.openDetail[idx].bg} btn-sm mx-auto `} 
                                    onClick={() => {
                                      const data =  [...props.openDetail];
                                      const data1 = [...props.imgConfig];
                                      data[idx].status = !data[idx].status;
                                      if(data[idx].status){
                                        data[idx].text = "Hide Detail";
                                        data[idx].bg = "btn-danger";
                                        data[idx].icon = faCircleChevronLeft;
                                        data1[idx].size = "5";
                                      }
                                      else{
                                        data[idx].text = "Show Detail";
                                        data[idx].bg = "btn-dark";
                                        data[idx].icon = faCircleChevronRight;
                                        data1[idx].size = "12";
                                      }
                                      props.setOpenDetail(data);
                                      props.setImgConfig(data1);
                                    }}  
                                    aria-controls={"example-collapse-text"+idx}
                                    aria-expanded={props.openDetail[idx].status}
                                >{props.openDetail[idx].text}
                                  <FontAwesomeIcon icon={props.openDetail[idx].icon} className="ms-2" />
                                </button>
                            </div>
                        </div>
                    </div>
                  )
                }
            </div> 
          </InfiniteScroll>
        } 
      </section>
    )
}

export default catList;