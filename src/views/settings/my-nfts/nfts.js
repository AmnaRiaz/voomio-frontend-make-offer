import React, {useEffect, useState} from 'react';
import {Pagination, Typography} from "@mui/material";
import Grid from "@mui/material/Grid";
import {useMyNFTs} from "./state";
import NFTCard from "../../../components/nft-card/NFTCard";
import Loading from "../../../components/loading/Loading";

const Nfts = () => {
    const [page, setPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);

    const {data, isLoading, isError, isSuccess} = useMyNFTs(
        page,
        10,
        '',
        '',
        ''
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
            <Pagination
                sx={{pb: 4}}
                page={page}
                onChange={handlePagination}
                count={totalPages}
            />

            {isSuccess &&
                <Grid item container spacing={3}>
                    {data && data.nfts.length === 0 && (
                        <Grid item>
                            <Typography>You have no NFTs</Typography>
                        </Grid>
                    )}

                    {data && data?.nfts?.map(nft => (
                        <Grid item>
                            <NFTCard item={nft} hideActionButtons/>
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
};

export default Nfts;