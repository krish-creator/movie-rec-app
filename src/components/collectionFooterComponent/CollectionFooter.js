
import { Pagination, PaginationItem, PaginationLink } from 'reactstrap'



const CollectionFooter = (props) => {

    const pages = props.pages ? props.pages : [1]

    const paginationEl = pages && pages.map(page => {
        return (
            <PaginationItem key={page}>
                <PaginationLink href="#">
                    {page}
                </PaginationLink>
            </PaginationItem>
        )
    })

    return (
        <Pagination className="d-flex justify-content-center mb-3">
            <PaginationItem>
                <PaginationLink
                    first
                    href="#"
                />
            </PaginationItem>
            <PaginationItem>
                <PaginationLink
                    href="#"
                    previous
                />
            </PaginationItem>
            {paginationEl}
            <PaginationItem>
                <PaginationLink
                    href="#"
                    next
                />
            </PaginationItem>
            <PaginationItem>
                <PaginationLink
                    href="#"
                    last
                />
            </PaginationItem>
        </Pagination>
    )
}

export default CollectionFooter