function Header() {

    return (
      <div className='bg-slate-800'>
         <div className='text-white 
                         flex
                         px-8
                         justify-between
                         py-4 
                         font-semibold 
                         uppercase 
                         tracking-wider'>
           <p>Admin Panel</p>
           <p className="cursor-pointer">Logout</p>
         </div>

      </div>
    )
}

export default Header
