import { RiMapPinLine, RiArrowDownSLine, RiArrowUpSLine } from 'react-icons/ri'
import Cities from '../../Cities.json'
import { Menu } from '@headlessui/react';
import { useEffect, useState } from 'react';

const City = ({ city, setCity }) => {
  
  // const houses = useSelector(i => i.announces.announces.announces);
  const [cities, setCities] = useState(['Location (any)', ...Cities]);
  const [isOpen, setIsOpen] = useState(false);

  // useEffect(() => {
  //   console.log(houses)
  //   if (houses) {
  //     const allCities = houses.map(house => house.city);
  //     const uniqueCities = ['Location (any)', ...new Set(allCities)];
  //     setCities(uniqueCities);
  //   }
  // }, [houses]);

  return (
    <Menu as='div' className='dropdown relative'>
      <Menu.Button onClick={() => setIsOpen(!isOpen)} className='dropdown-btn w-full text-left'>
        <RiMapPinLine className='dropdown-icon-primary' />
        <div>
          <div className='text-[15px] font-bold leading-tight'>{city || 'Location (any)'}</div>
          <div className='text-[13px]'>Select your place</div>
        </div>
        {isOpen ? <RiArrowUpSLine className='dropdown-icon-secondary' /> : <RiArrowDownSLine className='dropdown-icon-secondary' />}
      </Menu.Button>
      <Menu.Items className='dropdown-menu h-48 overflow-auto'>
        {cities.map((city, index) => (
          <Menu.Item onClick={() => setCity(city)} className='cursor-pointer hover:text-violet-700 transition' as='li' key={index}>
            {city}
          </Menu.Item>
        ))}
      </Menu.Items>
    </Menu>
  );
};



export default City;
