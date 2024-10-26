import { RiWallet3Line, RiArrowDownSLine, RiArrowUpSLine } from 'react-icons/ri'
import { Menu } from '@headlessui/react';
import { useContext, useState } from 'react';


const Price = ({ price, setPrice }) => {

  const [isOpen, setIsOpen] = useState(false)

  const prices = [
    {
      value: 'Price range (any)'
    },
    {
      value: '10000 - 20000'
    },
    {
      value: '20000 - 30000'
    },
    {
      value: '30000 - 40000'
    },
    {
      value: '40000 - 50000'
    },
  ]
  return (
    <Menu as='div' className='dropdown relative'>
      <Menu.Button onClick={() => setIsOpen(!isOpen)} className='dropdown-btn w-full text-left'>
        <RiWallet3Line className='dropdown-icon-primary' />
        <div>
          <div className='text-[15px] font-bold leading-tight'>{price}</div>
          <div className='text-[13px]'>Choose price range</div>
        </div>
        {isOpen ? (
          <RiArrowUpSLine className='dropdown-icon-secondary' />
        ) : (
          <RiArrowDownSLine RiArrowUpSLine className='dropdown-icon-secondary' />
        )}
      </Menu.Button>
      <Menu.Items className='dropdown-menu'>
        {prices.map((price, index) => (
          <Menu.Item onClick={() => setPrice(price.value)} className='cursor-pointer hover:text-violet-700 transition' as='li' key={index}>
            {price.value}
          </Menu.Item>
        ))}
      </Menu.Items>
    </Menu>
  )
};

export default Price
