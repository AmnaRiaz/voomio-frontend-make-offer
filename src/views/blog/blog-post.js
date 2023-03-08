import React from 'react';
import {useParams} from "react-router-dom";
import {useBlogPost} from "./state";
import {Typography, Box, Stack} from "@mui/material";
import {Edit} from "@mui/icons-material";
import Head from "next/head";

const BlogPost = () => {
    const {url} = useParams();

    const {data} = useBlogPost(url);

    return (
        <>
            <Head>
                <meta name="description" content={data?.seoDescription}/>
                <meta name="keywords" content={data?.seoKeywords}/>
                <meta name="author" content={data?.author}/>
                <title>{data?.seoTitle}</title>
            </Head>
            <Box pt={6} width='100%' maxWidth='1200px' m='auto'>
                <Stack direction='row' spacing={2} alignItems='baseline'>
                    <Typography mb={4} component='h1' fontSize={36} fontWeight='bold'>{data?.title}</Typography>
                    <Stack direction='row' alignItems='center' spacing={1}>
                        <Typography variant='caption'>
                            {data?.author}
                        </Typography>
                        <Edit color='disabled' fontSize='14px'/>
                    </Stack>
                </Stack>

                <img src={data?.photo} alt={data?.title} width='100%'/>

                <Box pt={6}>
                    <article dangerouslySetInnerHTML={{__html: data?.body}}/>
                </Box>
            </Box>
        </>
    );
};

export default BlogPost;