import React, {useState} from 'react';
import {useBlogList} from "./state";
import {useNavigate} from "react-router-dom";
import {Box, Card, Skeleton, Typography} from "@mui/material";
import {Stack} from "@mui/system";
import {makeStyles} from "@mui/styles";
import {componentStyles} from "../../assets/theme/components/collection-card";
import Grid from "@mui/material/Grid";

const useStyles = makeStyles(componentStyles)
const BlogCard = ({data}) => {
    const [imageIsLoaded, setImageIsLoaded] = useState(false);

    const navigate = useNavigate();

    const gotoCollectionDetails = () => {
        navigate("/blog/" + data.url)
    }

    const classes = useStyles()

    return (
        <Card className={classes.collectionCard} onClick={gotoCollectionDetails}>
            {!imageIsLoaded &&
                <Skeleton
                    width='100%'
                    height='100%'
                    sx={{pb: '100%'}}
                    variant='rectangular'
                />
            }

            <Box
                hidden={!imageIsLoaded}
                key={data._id}
                loading="eager"
                component="img"
                className={classes.cardimggroup}
                src={data.photo}
                onLoad={() => setImageIsLoaded(true)}
            />

            <Stack
                sx={{
                    position: "absolute",
                    width: "100%",
                    bottom: "0px",
                    background: "#FFFFFF",
                    padding: "20px",
                }}
                direction={"row"}>
                {/* <CardHeader
                    avatar={
                        <Avatar className={classes.cardavatar} aria-label="recipe">
                            <Box className={classes.cardimggroup} sx={{background: randomColor()}}></Box>
                        </Avatar>
                    }
                    className={classes.cardheader}
                /> */}
                <Stack>
                    <Typography className={classes.doodles}>{data.title}</Typography>
                    <Typography>{data.description}</Typography>
                </Stack>
            </Stack>
        </Card>
    )
}

const BlogList = () => {
    const [page, setPage] = useState(1)

    const {data, isLoading, isError, isSuccess} = useBlogList(page);

    console.log(data);

    return (
        <Box pt={6} width='100%' maxWidth='1200px' m='auto'>
            <Typography pb={4} fontSize={28} fontWeight='bold' component='h1'>Blog</Typography>

            <Grid container spacing={2}>
                {isLoading && Array(10).fill(0).map((_, index) => (
                    <Grid item key={index} lg={4} md={5} sm={6} xs={12}>
                        <Skeleton
                            variant='rectangular'
                            width='100%'
                            height={300}
                        />
                    </Grid>
                ))}

                {isSuccess && data?.blogs?.map((item) => {
                    return (
                        <Grid item key={item._id} lg={4} md={5} sm={6} xs={12}>
                            <BlogCard data={item}/>
                        </Grid>
                    )
                })}
            </Grid>
        </Box>
    );
};

export default BlogList;