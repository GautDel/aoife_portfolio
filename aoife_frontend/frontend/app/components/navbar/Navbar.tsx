'use client'

import React, { useState } from 'react'

const Navbar = () => {
  const [toggle, setToggle] = useState(false)
  const [init, setInit] = useState(false)
  const siteName = 'Aoife M.'
  const navItems: string[] = ['home', 'projects', 'contact', 'about', 'portfolio']

  function manageAnim() {
    if (toggle) {
      return 'animate-open-menu origin-right'
    } else if (!toggle && init){
      return 'animate-close-menu'
    } else {
        return ''
      }

  }

  function genMobileNav(nav: string[]) {
    return nav.map((item, i) => (
      <li
        key={i}
        className={`${
          toggle ? 'animate-show-item' : 'animate-hide-item'
        } opacity-0`}
      >
        {item}
      </li>
    ))
  }

  function generateNav(nav: string[]) {
    return nav.map((item, i) => {
      if (i === nav.indexOf(nav[nav.length - 1])) {
        return (
          <li
            key={i}
            className={` cursor-pointer 
          relative
          after:w-0
          after:h-0.5
          after:bg-neutral-400 
          after:hover:w-10
          after:content[""] 
          after:absolute 
          after:bottom-0 
          after:transition-all 
          after:duration-500
          after:left-0`}
          >
            {item}
          </li>
        )
      } else {
        return (
          <li
            key={i}
            className={` cursor-pointer 
            relative
            after:w-0
            after:h-0.5
            after:bg-neutral-400 
            after:hover:w-10
            after:content[""] 
            after:absolute 
            after:bottom-0 
            after:transition-all 
            after:duration-500
            after:left-0`}
          >
            {item}
            <span className='ml-3 text-base text-neutral-400 leading-7'>|</span>
          </li>
        )
      }
    })
  }

  return (
    <nav className='relative h-16'>
      <div>
        <p className='absolute text-white left-3 top-6'>{siteName}</p>
      </div>

      <button
        className={`absolute h-8 right-8 top-4 w-8 cursor-pointer text-3xl md:hidden ${
          toggle ? 'toggle-btn' : ''
        }`}
      >
        <div
          onClick={() => (setInit(true), setToggle(!toggle))}
          className=" absolute 
                      top-4 
                      h-[3px] 
                      w-7 
                      rounded 
                      bg-white
                      transition-all 
                      duration-500 
                      before:absolute 
                      before:h-[3px] 
                      before:w-8 
                      before:-translate-x-4 
                      before:-translate-y-3 
                      before:rounded 
                      before:bg-white
                      before:transition-all 
                      before:duration-500 
                      before:content-[''] 
                      after:absolute 
                      after:h-[3px] 
                      after:w-8 
                      after:-translate-x-4 
                      after:translate-y-3 
                      after:rounded 
                      after:bg-white 
                      after:transition-all 
                      after:duration-500 
                      after:content-['']
        "
        ></div>
      </button>
      <div
        className={`origin-right 
        ${manageAnim()}
        menu 
        w-full
        absolute 
        left-0
        translate-x-full
        top-16 
        h-[calc(100vh-4rem)] 
        text-right 
        text-white`}
      >
        {/*Mobile Menu*/}
        <ul
          onClick={() => setToggle(false)}
          className={`w-0 
          h-full 
          w-full 
          pr-14 
          flex 
          flex-col 
          bg-neutral-800 
          justify-center 
          space-y-12 
          text-3xl`}
        >

          {genMobileNav(navItems)}
        </ul>
      </div>
      {/*Desktop menu*/}
      <ul
        className='absolute
        invisible
        md:visible
        pt-6
        pr-14 
        flex 
        space-x-3
        text-xl
        text-white
        right-0'
      >
        {generateNav(navItems)}
      </ul>
    </nav>
  )
}

export default Navbar
