import React from 'react';
import FavoriteIcon from "@mui/icons-material/Favorite";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import { Stack } from "@mui/material";
import { useAddToFavorites } from "./state";

const AddToFavorites = ({ nftID, initialState }) => {
    const { isFavorite, add, remove } = useAddToFavorites(nftID, initialState);
    console.log(isFavorite)
    return (
        <Stack direction={"row"} spacing={1}>
            {isFavorite ? (
                <FavoriteIcon sx={{ color: "red" }} onClick={remove} />
            ) : (
                <FavoriteBorderIcon onClick={add} />
            )}
        </Stack>
    );
};

export default AddToFavorites;