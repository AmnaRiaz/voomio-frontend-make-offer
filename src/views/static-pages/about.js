import React from 'react';
import {Box, Typography} from "@mui/material";
import {usePageData} from "./state";
import Head from "next/head";

const About = () => {
    const {data} = usePageData('about')

    return (
        <>
            <Head>
                <meta name="description" content={data?.seoDescription}/>
                <meta name="keywords" content={data?.seoKeywords}/>
                <meta name="author" content={data?.author}/>
                <title>{data?.seoTitle}</title>
            </Head>
            <Box pt={6} width='100%' maxWidth='1200px' m='auto'>
                <Typography mb={6} component='h1' fontSize={32}>{data?.title}</Typography>
                {data && <article dangerouslySetInnerHTML={{__html: data.body}}/>}
            </Box>
        </>
    );
};

export default About;