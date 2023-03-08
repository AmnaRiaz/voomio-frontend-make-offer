import React, { useState, useEffect } from "react"
// @mui/material components
import { makeStyles } from "@mui/styles"
import Grid from "@mui/material/Grid"
// core components
import componentStyles from "../../assets/theme/views/collection/list";
import {
    Box,
    Pagination, Skeleton,
    Typography
} from "@mui/material"

import { Stack } from "@mui/system"

import CollectionCard from "../../components/collection-card/CollectionCard";
import { useAllCollections } from "./state";
import Loading from "../../components/loading/Loading";
import CollectionFilters from "../../components/collection-filters/collection-filters";

const useStyles = makeStyles(componentStyles)

const PAGE_SIZE = 20;

const Collections = () => {
    const classes = useStyles()

    const [page, setPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);

    const [filters, setFilters] = useState({
        category: 'all',
        blockchain: 'all',
        name: ''
    })

    const {
        data,
        isSuccess,
        isError,
        isLoading
    } = useAllCollections(page, PAGE_SIZE, filters.category, filters.blockchain, filters.name)


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
        <React.Fragment>
            {isError || isLoading &&
                <Grid item container alignItems='center' justifyContent='center'>
                    {isError && <Typography>Something went wrong</Typography>}
                    {isLoading && <Loading sx={{ p: 4 }} />}
                </Grid>
            }
            {
                isSuccess &&
                <>
                    <Grid item lg={12} md={12} sm={12} xs={12} sx={{ position: "relative" }}>
                        <Box className={classes.bannerbackgroundimg}></Box>
                        <Stack direction={"row"} spacing={5} paddingTop={5} sx={{ position: "absolute", zIndex: "1", top: "calc(50% + 65px)", left: "calc(50% - 490px)", paddingTop: "0px" }}>
                            <CollectionFilters filters={filters} setFilters={setFilters} />
                        </Stack>
                    </Grid>

                    <Grid item lg={12} md={12} sm={12} xs={12} className={classes.collectionexplore}>
                        <Box sx={{ paddingBottom: "50px", display: "flex", alignItems: "baseline", columnGap: "50px" }}>
                            <Typography className={classes.exploretitle}>Explore collections</Typography>
                            <Typography className={classes.total}>{data?.pagination?.total} results</Typography>
                        </Box>
                        <Grid container spacing={2}>
                            {isLoading && Array(PAGE_SIZE).fill(0).map((_, index) => (
                                <Grid item key={index} lg={3} md={4} sm={6} xs={12}>
                                    <Skeleton
                                        variant='rectangular'
                                        width='100%'
                                        height={300}
                                    />
                                </Grid>
                            ))}

                            {isSuccess && data?.collections?.map((item) => {
                                return (
                                    <Grid item key={item._id} lg={3} md={4} sm={6} xs={12}>
                                        <CollectionCard data={item} />
                                    </Grid>
                                )
                            })}
                        </Grid>

                        <Stack mt={3} flexDirection={"row"} justifyContent={"end"}>
                            <Pagination
                                onChange={handlePagination}
                                count={totalPages}
                            />
                        </Stack>
                    </Grid>
                </>
            }

        </React.Fragment>
    )
}

export default Collections