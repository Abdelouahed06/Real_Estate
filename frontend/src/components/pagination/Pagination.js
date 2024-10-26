import { useEffect, useState } from "react";


const Pagination = ({currentPage, setCurrentPage, totalPages}) => {

    // useEffect(()=>{
    //     console.log(currentPage)
    // },[currentPage])
    const prevPage = () => {
        setCurrentPage(currentPage-1)
    }

    const nextPage = () => {
        setCurrentPage(currentPage+1)
    }

    const handlePageClick = (page) => {
        setCurrentPage(page);
    };

    return (

        

        <>
            <div className="flex items-center gap-1 text-sm mb-8">
                {/* Previous Item */}
                { currentPage !== 1 && <div onClick={prevPage} className="flex items-center justify-center w-12 h-12 rounded-full border boder-solid border-gray-900 hover:bg-gray-200 cursor-pointer">
                        <svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 16 16">
                            <path fill="currentColor" d="M10.843 13.069L6.232 8.384a.546.546 0 0 1 0-.768l4.61-4.685a.552.552 0 0 0 0-.771a.53.53 0 0 0-.759 0l-4.61 4.684a1.65 1.65 0 0 0 0 2.312l4.61 4.684a.53.53 0 0 0 .76 0a.552.552 0 0 0 0-.771"></path>
                        </svg>
                    </div>
                }

                {/* Items */}
                {Array.from({ length: totalPages }, (_, index) => (
                    <div onClick={() => handlePageClick(index+1)} key={index} className={`flex items-center justify-center w-12 h-12 rounded-full ${currentPage === index+1 ? "bg-blue-600" : "border boder-solid border-gray-900 hover:bg-gray-200"} cursor-pointer`}>
                        <span className={currentPage === index+1 ? "text-white" : "text-gray-900"}>{index+1}</span>
                    </div>
                )) }

                {/* Next Item */}
                { currentPage <= totalPages && <div onClick={nextPage} className="flex items-center justify-center w-12 h-12 rounded-full border boder-solid border-gray-900 hover:bg-gray-200 cursor-pointer">
                        <svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 16 16">
                            <path fill="currentColor" d="m5.157 13.069l4.611-4.685a.546.546 0 0 0 0-.768L5.158 2.93a.552.552 0 0 1 0-.771a.53.53 0 0 1 .759 0l4.61 4.684a1.65 1.65 0 0 1 0 2.312l-4.61 4.684a.53.53 0 0 1-.76 0a.552.552 0 0 1 0-.771"></path>
                        </svg>
                    </div>
                }   
            </div>

            
            


        </>
    )
}

export default Pagination