
import { useEffect } from 'react';
import { useState } from 'react';
import { NavLink } from 'react-router-dom';
import { Pagination, PaginationItem, PaginationLink } from 'reactstrap'
import './CollectionFooter.css'



const CollectionFooter = (props) => {

    const { pageCount, currentPage } = props
    const [totalPages, setTotalPages] = useState([])
    const [lastPage, setLastPage] = useState('')
    const [firstPage, setFirstPage] = useState('')
    const [lastPageDisabled, setLastPageDisabled] = useState('')
    const [firstPageDisabled, setFirstPageDisabled] = useState('')

    useEffect(() => {
        const newTotalPages = []
        for (let i = 1; i <= pageCount; i++) {
            newTotalPages.push((i).toString())
        }

        if (newTotalPages) { setTotalPages(newTotalPages) }
        else { setTotalPages('1') }
    }, [pageCount])


    useEffect(() => {
        setLastPage(totalPages[totalPages.length - 1])
        setFirstPage(totalPages[0])
        // eslint-disable-next-line 
    }, [totalPages])

    useEffect(() => {
        setLastPageDisabled(currentPage === lastPage ? 'disabled' : {})
        setFirstPageDisabled(currentPage === firstPage ? 'disabled' : {})
        // eslint-disable-next-line 
    }, [currentPage])

    const navLinkStyles = ({ isActive }) => {
        return {
            fontWeight: isActive ? '700' : '400',
            backgroundColor: isActive ? 'black' : 'white',
            color: isActive ? 'white' : 'red'
        }
    }

    const nextPage = (pageNo) => {
        return currentPage === lastPage
            ? lastPage
            : (parseInt(pageNo) + 1).toString()
    }

    const prevPage = (pageNo) => {
        return currentPage === firstPage ?
            firstPage
            : (parseInt(pageNo) - 1).toString()
    }

    return (
        <Pagination size='md' className="d-flex justify-content-center mb-3 " >

            <PaginationItem>
                <NavLink to={firstPage} className={`page-no ${firstPageDisabled}`} >
                    <PaginationLink className='page-no' first />
                </NavLink>
            </PaginationItem>

            <PaginationItem>
                <NavLink to={prevPage(currentPage)} className={`page-no ${firstPageDisabled}`}>
                    <PaginationLink className='page-no' previous />
                </NavLink>
            </PaginationItem>

            {
                totalPages.length > 0 && totalPages.map(page => {
                    return (
                        <PaginationItem key={page}>
                            <NavLink to={page} className='page-no' style={navLinkStyles}>
                                <PaginationLink className='page-no active-page' id='page-btn'>
                                    {page}
                                </PaginationLink>
                            </NavLink>

                        </PaginationItem >
                    )
                })
            }

            <PaginationItem>
                <NavLink to={nextPage(currentPage)} className={`page-no ${lastPageDisabled}`} >
                    <PaginationLink className='page-no' next />
                </NavLink>
            </PaginationItem>

            <PaginationItem>
                <NavLink to={lastPage} className={`page-no ${lastPageDisabled}`} >
                    <PaginationLink className='page-no' last />
                </NavLink>
            </PaginationItem>

        </Pagination>
    )
}

export default CollectionFooter