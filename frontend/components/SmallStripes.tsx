export default function SmallStripes() {
    return(
        <div className="absolute -top-4 -left-32 rotate-[30deg]">
            <div>
                <div className="w-24 h-2 bg-red-200 absolute left-5"></div>
                <div className="w-24 h-2 bg-red-200 absolute left-40"></div>
            </div>
            <div className="w-72 h-2 bg-transparent  mt-4 left-40"></div>


            <div className="w-56 h-2 bg-blue-200  absolute left-0"></div>

            <div className="flex mt-6 mb-6">
                <div className="w-32 h-2 bg-violet-200 absolute left-6"></div>
                <div className="w-10 h-2 bg-violet-200 absolute right-12"></div>
            </div>

            <div className="w-72 h-2 bg-transparent mt-4 left-40 lg:hidden"></div>
            <div className="flex my-4">
                <div className="w-16 h-2  bg-orange-200 absolute left-10"></div>
                <div className="w-32 h-2  bg-orange-200 absolute right-7"></div>
            </div>
            </div>
    )
}
