import React, {useEffect, useState} from "react"
// @mui/material components
// core components
import {
    Box,
    Pagination,
    Typography
} from "@mui/material"
import {useMyCollections} from "./state";
import Grid from "@mui/material/Grid";
import CollectionCard from "../../../components/collection-card/CollectionCard";
import CollectionFilters from "../../../components/collection-filters/collection-filters";
import Loading from "../../../components/loading/Loading";

const CollectionCmp = () => {
    const [page, setPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);

    const [filters, setFilters] = useState({
        category: 'all',
        blockchain: 'all',
        name: ''
    })

    const {data, isLoading, isError, isSuccess} = useMyCollections(
        page,
        10,
        filters.blockchain,
        filters.category,
        filters.name
    )

    const handlePagination = (_, pageNum) => {
        setPage(pageNum)
    }

    // update number of pages when data changed
    useEffect(() => {
        if (data) {
            setTotalPages(Math.ceil(data?.pagination?.total / data?.pagination?.items))
        }
    }, [data])

    return (
        <>
            <Box pb={2}>
                <CollectionFilters filters={filters} setFilters={setFilters}/>
            </Box>

            <Pagination
                sx={{pb: 4}}
                page={page}
                onChange={handlePagination}
                count={totalPages}
            />

            {isSuccess &&
                <Grid item container spacing={3}>
                    {data && data?.collections?.map(collection => (
                        <Grid item key={collection._id}>
                            <CollectionCard data={collection}/>
                        </Grid>
                    ))}
                </Grid>
            }

            {isError || isLoading &&
                <Grid item container alignItems='center' justifyContent='center'>
                    {isError && <Typography>Something went wrong</Typography>}
                    {isLoading && <Loading sx={{p: 4}}/>}
                </Grid>
            }
        </>
    )
}

export default CollectionCmp