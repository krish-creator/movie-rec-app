
import { NavLink } from 'react-router-dom';
import { Pagination, PaginationItem, PaginationLink } from 'reactstrap'
import './CollectionFooter.css'



const CollectionFooter = (props) => {

    const totalPages = []

    for (let i = 1; i <= props.totalPages; i++) {
        totalPages.push((i).toString())
    }

    const navLinkStyles = ({ isActive }) => {
        return {
            fontWeight: isActive ? '700' : '400',
            backgroundColor: isActive ? 'black' : 'white',
            color: isActive ? 'white' : 'red'
        }
    }

    const pages = totalPages ? totalPages : '1'

    const paginationEl = pages && pages.map(page => {
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

    const lastPage = pages[pages.length - 1]
    const firstPage = pages[0]
    const nextPage = (pageNo) => props.currentPage === lastPage ? lastPage : (parseInt(pageNo) + 1).toString()
    const prevPage = (pageNo) => props.currentPage === firstPage ? firstPage : (parseInt(pageNo) - 1).toString()
    const lastPageDisabled = props.currentPage === lastPage ? 'disabled' : {}
    const firstPageDisabled = props.currentPage === firstPage ? 'disabled' : {}

    return (
        <Pagination size='md' className="d-flex justify-content-center mb-3 " >

            <PaginationItem>
                <NavLink to={firstPage} className={`page-no ${firstPageDisabled}`} >
                    <PaginationLink className='page-no' first />
                </NavLink>
            </PaginationItem>

            <PaginationItem>
                <NavLink to={prevPage(props.currentPage)} className={`page-no ${firstPageDisabled}`}>
                    <PaginationLink className='page-no' previous />
                </NavLink>
            </PaginationItem>

            {paginationEl}

            <PaginationItem>
                <NavLink to={nextPage(props.currentPage)} className={`page-no ${lastPageDisabled}`} >
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