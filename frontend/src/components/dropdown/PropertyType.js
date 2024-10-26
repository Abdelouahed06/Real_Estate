import { RiHome5Line, RiArrowDownSLine, RiArrowUpSLine } from 'react-icons/ri'
import { Menu } from '@headlessui/react';
// import { useSelector } from 'react-redux'
import { useEffect, useState } from 'react';

const PropertyType = ({ type, setType }) => {

  const [types, setTypes] = useState(['property type (any)', 'house', 'apartment','villa']);
  const [isOpen, setIsOpen] = useState(false)

  return (
    <Menu as='div' className='dropdown relative'>
      <Menu.Button onClick={() => setIsOpen(!isOpen)} className='dropdown-btn w-full text-left'>
        <RiHome5Line className='dropdown-icon-primary' />
        <div>
          <div className='text-[15px] font-bold leading-tight'>{ type }</div>
          <div className='text-[13px]'>Select your place</div>
        </div>
        {isOpen ? (
          <RiArrowUpSLine className='dropdown-icon-secondary' />
        ) : (
          <RiArrowDownSLine className='dropdown-icon-secondary' />
        )}
      </Menu.Button>
      <Menu.Items className='dropdown-menu'>
        {types.map((type, index) => (
          <Menu.Item onClick={() => setType(type)} className='cursor-pointer hover:text-violet-700 transition' as='li' key={index}>
            {type}
          </Menu.Item>
        ))}
      </Menu.Items>
    </Menu>
  )
};

export default PropertyType;
