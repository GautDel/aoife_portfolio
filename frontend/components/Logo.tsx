import Image from 'next/image'
 
export default function Logo() {
  return (
    <Image
      className='absolute left-1/2 translate-x-1/2 lg:-translate-x-1/2  lg:left-1/2 top-1 translate-y-1/2 '
      src="/logo.png"
      width={30}
      height={30}
      alt="Website Logo"
    />
  )
}

