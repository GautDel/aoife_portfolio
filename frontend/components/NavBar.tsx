interface Page {
    ID: string,
    Name: string,
    TabColor: string,
    ItemOrder: number
}


export default function NavBar({pages}:{pages: Page[]}) {

    pages.sort((a, b) => a.ItemOrder - b.ItemOrder)
       
    function render() {
        return pages.map((page: Page, i: number) => {
            return (
                <a className={`${i === 0 ? "translate-x-[6rem] relative z-40" : null }
                    ${i === 1 ? "translate-x-[4rem] relative z-30" : null }
                    ${i === 2 ? "translate-x-[2rem] relative z-20" : null }
                    ${i === 3 ? " relative z-10" : null }`}
                    key={i} href="">
                    <p style={{backgroundColor: page.TabColor}} 
                    className={`${page.TabColor} 
                    text-white lg:text-sm font-bold capitalize px-8 xl:px-10 
                    py-2 rounded-tl-2xl rounded-tr-2xl brighten`}>
                    <span className={`${i === 2 ? "ml-4" : null }
                    ${i === 3 ? "ml-4" : null }
                    ${i === 1 ? "ml-4" : null }
                    `}>{page.Name}</span>
                    </p>
                </a>
            ) 

        })
    }

    return(
        <nav className="hidden lg:flex justify-self-end">
            <ul className="flex absolute bottom-0 right-0">
            {render()}
            </ul>
        </nav>
    )
}
