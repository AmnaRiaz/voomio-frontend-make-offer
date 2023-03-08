import React from 'react';
import {useFormik} from "formik";
import {TextField, Box, Stack, Typography, Button, CircularProgress} from "@mui/material";
import {makeStyles} from "@mui/styles";
import BtncomponentStyles from "../../assets/theme/components/button";
import {useBetaCollectionMinting} from "./state";

const buttonuseStyles = makeStyles(BtncomponentStyles)

const BetaCollectionMinting = () => {
    const btnclasses = buttonuseStyles();

    const {mutate: submit, isLoading} = useBetaCollectionMinting();

    const {values, handleSubmit, handleReset, getFieldProps} = useFormik({
        initialValues: {
            nickName: '',
            twitterHandle: '',
            projectTwitterHandle: '',
            discordId: '',
            ssn: '',
            projectName: '',
            projectDescription: '',
            remarks: ''
        },
        onSubmit: (values, formikHelpers) => {
            console.log(values)
            submit(values, {
                onSuccess: () => formikHelpers.resetForm()
            });
        }
    })

    return (
        <Box pt={6} width='100%' maxWidth='800px' m='auto'>
            <Typography mb={4} fontSize={30} fontWeight='bold' component='h1'>Beta Collection Minting</Typography>
            <form onSubmit={handleSubmit} onReset={handleReset}>
                <Stack spacing={3}>
                    <TextField
                        variant='outlined'
                        value={values.nickName}
                        label='Nickname'
                        {...getFieldProps('nickName')}
                    />
                    <TextField
                        variant='outlined'
                        value={values.twitterHandle}
                        label='Twitter handle'
                        required
                        {...getFieldProps('twitterHandle')}
                    />
                    <TextField
                        variant='outlined'
                        value={values.projectTwitterHandle}
                        label='Project twitter handle'
                        required
                        {...getFieldProps('projectTwitterHandle')}
                    />
                    <TextField
                        variant='outlined'
                        value={values.discordId}
                        label='Discord id'
                        required
                        {...getFieldProps('discordId')}
                    />
                    <TextField
                        variant='outlined'
                        value={values.ssn}
                        label='SSN'
                        required
                        {...getFieldProps('ssn')}
                    />
                    <TextField
                        variant='outlined'
                        value={values.projectName}
                        label='Project name'
                        required
                        {...getFieldProps('projectName')}
                    />
                    <TextField
                        variant='outlined'
                        value={values.projectDescription}
                        label='Project description'
                        required
                        {...getFieldProps('projectDescription')}
                    />
                    <TextField
                        variant='outlined'
                        value={values.remarks}
                        label='Remarks'
                        required
                        {...getFieldProps('remarks')}
                    />
                </Stack>
                <Button
                    classes={{root: btnclasses.buttonFillPrimary}}
                    sx={{mt: 3, borderRadius: 6, width: 100}}
                    type='submit'
                    variant='contained'
                >
                    {isLoading ? <CircularProgress size={20}/> : 'Create'}
                </Button>
            </form>
        </Box>
    );
};

export default BetaCollectionMinting;