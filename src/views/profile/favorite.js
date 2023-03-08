import React from 'react';
import { useFavorites } from "../settings/favorites/state";
import Grid from "@mui/material/Grid";
import { Typography } from "@mui/material";
import NFTCard from "../../components/nft-card/NFTCard";
import Loading from "../../components/loading/Loading";

const Favorites = () => {
    const { data, isSuccess, isLoading, isError } = useFavorites();

    return (
        <div style={{ padding: "0 100px" }}>
            {isSuccess &&
                <Grid item container spacing={3}>
                    {data && data.length === 0 && (
                        <Grid item>
                            <Typography>You have no Favorite item</Typography>
                        </Grid>
                    )}

                    {data && data?.map(nft => (
                        <Grid item>
                            <NFTCard item={nft} />
                        </Grid>
                    ))}
                </Grid>
            }

            {isError || isLoading &&
                <Grid item container alignItems='center' justifyContent='center'>
                    {isError && <Typography>Something went wrong</Typography>}
                    {isLoading && <Loading sx={{ p: 4 }} />}
                </Grid>
            }
        </div>
    );
};

export default Favorites;