import { useEffect, useState } from "react"
import AnnounceList from "../announce/AnnounceLIst"
import Banner from "./Banner"
import { fetchAnnounces } from '../../redux/AnnounceReducer';
import { useDispatch, useSelector } from "react-redux";

const Home = () => {

    const allAnnounces = useSelector(i => i.announces.announces.announces);
    const [announces, setAnnounces] = useState([]);
    const dispatch = useDispatch()


    const [price, setPrice] = useState('Price range (any)')
    const [city, setCity] = useState('Location (any)')
    const [type, setType] = useState('property type (any)')



    useEffect(() => {
        if (allAnnounces) {
            console.log(allAnnounces)
            setAnnounces(allAnnounces);
        }
    }, [allAnnounces]);

    useEffect(() => {
        dispatch(fetchAnnounces());
    }, [])

    const handleFilter = () => {
        let updatedFilterValues = {};

        if (city.includes('(any)') && type.includes('(any)') && price.includes('(any)')) {
            setAnnounces(allAnnounces);
            return;
        }

        if (!city.includes('(any)')) {
            updatedFilterValues.city = city;
        }
        if (!type.includes('(any)')) {
            updatedFilterValues.type = type;
        }
        if (!price.includes('(any)')) {
            const minPrice = parseInt(price.split(' ')[0]);
            const maxPrice = parseInt(price.split(' ')[2]);
            updatedFilterValues.price = { minPrice, maxPrice };
        }

        const filteredAnnounces = allAnnounces.filter((announce) => {
            let passCityFilter = true;
            let passTypeFilter = true;
            let passPriceFilter = true;

            if (updatedFilterValues.city && announce.city !== updatedFilterValues.city) {
                passCityFilter = false;
            }
            if (updatedFilterValues.type && announce.type !== updatedFilterValues.type) {
                passTypeFilter = false;
            }
            if (updatedFilterValues.price && (announce.price < updatedFilterValues.price.minPrice || announce.price > updatedFilterValues.price.maxPrice)) {
                passPriceFilter = false;
            }

            return passCityFilter && passTypeFilter && passPriceFilter;
        });

        setAnnounces(filteredAnnounces);
    };

    return (
        <div className="bg-white mb-16">
            <Banner price={price} city={city} type={type} setPrice={setPrice} setCity={setCity} setType={setType} handleFilter={handleFilter} />
            <AnnounceList announces={announces} />
        </div>
    )
}

export default Home