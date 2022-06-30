import axios from "axios";
import { useEffect, useState } from "react";
import './App.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCircleChevronRight, faSearch} from '@fortawesome/free-solid-svg-icons'
import CatList from './component/catList.js'
import CatListSearch from './component/catListSearch.js'

function App() {
  const [catList, setCatList] = useState([]);
  const [showCatList, setShowCatList] = useState(true);
  const [catListSearch, setCatListSearch] = useState([]);
  const [openDetail, setOpenDetail] = useState([]);
  const [imgConfig, setImgConfig] = useState([]);
  const [openDetailSearch, setOpenDetailSearch] = useState([]);
  const [imgConfigSearch, setImgConfigSearch] = useState([]);
  const [query, setQuery] = useState("");
  const [page, setPage] = useState(0);
  const [hasMoreItems, setHasMoreItems] = useState(true);
  const [lastData, setLastData] = useState(false);
  const [loadingVisible, setLoadingVisible] = useState(true);

  useEffect(()=> {
    setLoadingVisible(true);
    getCatData();
  },[])

  useEffect(()=> {
    
  },[query])

  const getCatData = async () => {
    const params = {
      limit:10,
      page,
      order:'Asc'
    };

    const config = {
      headers: {
        'x-api-key': 'c15df3e0-9427-4db9-af72-29b7485cc2ed'
      },
      params
    }
    await axios.get('https://api.thecatapi.com/v1/breeds', config)
    .then( (response) => {
        const data1 = [...imgConfig];
        response.data.forEach(() => {
          data1.push({ size : "12" ,ext : ".jpg"});
        })
        setImgConfig(data1);
        
        const data = [...openDetail];
        response.data.forEach(() => {
            data.push({text : "Show Detail" , icon : faCircleChevronRight, bg : "btn-dark", status : false});
        })
        setOpenDetail(data);
        
        const newList = catList.concat(response.data);
        setCatList(newList);

        if(response.data.length === 0){
          setLastData(true);
          setHasMoreItems(false);
        }
        setLoadingVisible(false);
    });
    setPage(page+1);
  }

  const searchCatData = async (query) => {
    const params = {
      id:query,
      name:query,
      description:query,
      temperament:query,
      life_span:query,
      alt_names:query,
      wikipedia_url:query,
      origin:query,
      weight_imperial:query,
      country_code:query,
      experimental:parseInt(query),
      hairless:parseInt(query),
      natural:parseInt(query),
      rare:parseInt(query),
      rex:parseInt(query),
      suppress_tail:parseInt(query),
      short_legs:parseInt(query),
      hypoallergenic:parseInt(query),
      adaptability:parseInt(query),
      affection_level:parseInt(query),
      child_friendly:parseInt(query),
      dog_friendly:parseInt(query),
      energy_level:parseInt(query),
      grooming:parseInt(query),
      health_issues:parseInt(query),
      intelligence:parseInt(query),
      shedding_level:parseInt(query),
      social_needs:parseInt(query),
      stranger_friendly:parseInt(query),
      vocalisation:parseInt(query),
    };

    const config = {
      headers: {
        'x-api-key': 'c15df3e0-9427-4db9-af72-29b7485cc2ed'
      },
      params
    }
    await axios.get('https://api.thecatapi.com/v1/breeds/search', config)
    .then( (response) => {
        const data1 = [...imgConfig];
        response.data.forEach(() => {
          data1.push({ size : "12" ,ext : ".jpg"});
        })
        setImgConfigSearch(data1);
        
        const data = [...openDetail];
        response.data.forEach(() => {
            data.push({text : "Show Detail" , icon : faCircleChevronRight, bg : "btn-dark", status : false});
        })
        setOpenDetailSearch(data);

        const newList = response.data;
        setCatListSearch(newList);
        setLoadingVisible(false);
    });
  }

  const handleSearch = (value) => {
    if(value != "") {
      setLoadingVisible(true);
      setShowCatList(false);
      setHasMoreItems(false);
      searchCatData(value)
    }
    else{
      setShowCatList(true);
      setHasMoreItems(true);
      setLoadingVisible(false);
    }
  }
  
  return (
    <div className="px-5 mt-1">
      <section className="header">
          <div >
            <h2 className="header-title">Cute Cats From All Over The World !
              <span className="header-logo" >&#128568;</span>
            </h2>
          </div>
          <div className="searchBar">
                <label className="col-form-label col-form-label-sm"></label>
                <div className="input-group ">
                  <span className="input-group-text h-100 btn btn-danger text-white" ><FontAwesomeIcon icon={faSearch} /></span>
                  <input type="text" className="form-control border border-danger mb-3 text-sm-start"  placeholder="Search Some Cute Cats Here" value={query} onInput={(e) => {
                      setCatListSearch([]);
                      setQuery(e.target.value)
                      handleSearch(e.target.value)
                  }} />
                </div>
          </div> 
      </section>
      
      <CatList 
        getCatData = {getCatData} 
        searchCatData = {searchCatData} 
        showCatList = {showCatList} 
        hasMoreItems = {hasMoreItems} 
        loadingVisible = {loadingVisible} 
        catList = {catList} 
        openDetail = {openDetail} 
        setOpenDetail = {setOpenDetail} 
        imgConfig = {imgConfig} 
        setImgConfig = {setImgConfig}
      />

      <CatListSearch 
        getCatData = {getCatData} 
        searchCatData = {searchCatData} 
        showCatList = {showCatList} 
        hasMoreItems = {hasMoreItems} 
        loadingVisible = {loadingVisible} 
        catListSearch = {catListSearch} 
        openDetailSearch = {openDetailSearch} 
        setOpenDetailSearch = {setOpenDetailSearch} 
        imgConfigSearch = {imgConfigSearch} 
        setImgConfigSearch = {setImgConfigSearch} 
      />
           
    </div>
  );
}

export default App;
