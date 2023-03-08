import React, {useEffect, useState} from "react"
import {styles} from "/src/assets/theme/views/settings/profile"
import {
    Avatar,
    Box, Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, TextField, Typography
} from "@mui/material"

import UploadButton from "/src/assets/image/component/nftGenerator/UploadButton.svg"
import CloudUploadOutline from "/src/assets/image/component/nftGenerator/CloudUploadOutline.svg"
import {Stack} from "@mui/system"
import {useNavigate} from "react-router-dom"
import {useDispatch, useSelector} from "react-redux"

import {uploadLogo, updateUserData} from "/src/redux/actions/user"
import {notification} from "/src/utils/utility"
import {axiosServices} from "../../services";

const ProfileSettingCmp = () => {

    const navigate = useNavigate()
    const dispatch = useDispatch()

    const userData = useSelector(state => state.user)
    const [bucketUrl, setBucketUrl] = useState(userData?.profileUrl || '');
    const [profileImage, setProfileImage] = useState(null);
    const [verificationCode, setVerificationCode] = useState('');
    const [confirmMergeCode, setConfirmMergeCode] = useState('');
    const [openVerifyEmailDialog, setOpenVerifyEmailDialog] = useState(false);
    const [openConfirmMergeDialog, setOpenConfirmMergeDialog] = useState(false);
    const [profile, setProfile] = useState({
        username: userData?.user?.firstName,
        bio: "",
        email: userData?.user?.email,
        dName: "",
        link: ""
    })

    const handleChange = (event, type) => {
        setProfile({...profile, [type]: event.target.value})
    }

    const handleSkip = async () => {
        navigate("/")
    }

    const handleOpenConfirmMergeDialog = () => {
        const mergeBody = {
            email: profile?.email
        }

        axiosServices('user/merge', mergeBody, 'put').then(() => {
            setOpenConfirmMergeDialog(true);
        }).catch(err => {
            notification("Send verification code failed", "error");
        })
    }

    const handleCloseConfirmMergeDialog = () => {
        setOpenConfirmMergeDialog(false);
    }

    const handleOpenVerifyDialog = async () => {
        axiosServices('user/otp', null, 'get').then(() => {
            setOpenVerifyEmailDialog(true);
        }).catch(() => {
            notification("Send verification code failed", "error");
        })
    }

    const handleCloseVerifyDialog = (_, reason) => {
        if (reason === 'backdropClick') {
            return;
        }

        setOpenVerifyEmailDialog(false);
    }

    const handleVerifyEmail = (e) => {
        e.preventDefault();

        if (verificationCode) {
            axiosServices('user/verify-email?otp=' + verificationCode, null, 'get').then((res) => {
                if (res.status) {
                    setOpenVerifyEmailDialog(false);
                    dispatch({type: 'EMAIL_VERIFIED'});
                    notification(res?.data?.message ?? 'Email verified successfully', 'success')
                } else {
                    notification(res?.error?.response?.data?.message, 'error')
                }
            })
        }
    }
    const handleConfirmMerge = (e) => {
        e.preventDefault();

        if (confirmMergeCode) {
            axiosServices('user/verify-merge?otp=' + confirmMergeCode, null, 'get').then((res) => {
                if (res.status) {
                    setOpenConfirmMergeDialog(false);

                    const wallet = userData?.user?.wallets[0];

                    if (wallet) {
                        // login again after merge
                        axiosServices('user/signin', {
                            address: wallet.address,
                            walletName: wallet.name,
                            blockchain: wallet.blockchain
                        }, 'post')
                    }

                    notification(res?.data?.message ?? 'Merge is successful', 'success')
                } else {
                    notification(res?.error?.response?.data?.message ?? 'Merge failed', 'error')
                }
            })
        }
    }

    const handleContinue = async () => {
        const emailIsChanged = userData?.user?.email !== profile.image;

        const obj = {
            email: profile.email,
            displayName: profile.dName,
            userId: userData?.user?._id,
            bio: profile.bio,
            firstName: profile.username,
            profileUrl: bucketUrl,
            personalSite: profile.link,
        }
        const result = await dispatch(updateUserData(obj))

        if (result.status) {
            notification("Success", "success")

            if (profile.email && userData?.user?.emailVerified === 'false') {
                await handleOpenVerifyDialog();
            }

        } else if (result?.error?.response?.status === 409) {
            notification(result?.error?.response?.data.message, "error")
            notification(
                <div>
                    <p>Do you want to merge your accounts?</p>
                    <Button onClick={handleOpenConfirmMergeDialog} variant='outlined'>Merge</Button>
                </div>,
                "warning"
            )
        } else if (result.error) {
            notification(result?.error?.response?.message, "error")
        }
    }

    async function handleFile(files) {
        const imageUrl = await uploadLogo(files);
        setBucketUrl(imageUrl.bucketUrl);
    }

    const handleUploadFile = (e) => {
        handleFile(e.target.files);
        if (e.target.files && e.target.files[0]) {
            setProfileImage(URL.createObjectURL(e.target.files[0]))
        } else {
            console.log("error!")
        }
    }

    useEffect(() => {
        if (userData) {
            setProfile({
                username: userData?.user?.firstName ?? '',
                bio: userData?.user?.bio ?? '',
                email: userData?.user?.email ?? '',
                dName: userData?.user?.displayName ?? '',
                link: userData?.user?.personalSite ?? ''
            })
            setBucketUrl(userData?.user?.profileUrl)
        }
    }, [userData])

    return (
        <>
            <Box sx={styles.profileSection}>
                <Box mt={5} sx={styles.profileHeader}>
                    <Box component={"span"}>Profile Details</Box>
                </Box>
                <Box mt={4} sx={styles.profileUpload}>
                    {bucketUrl ? (
                        <Avatar
                            alt="User Profile"
                            src={bucketUrl}
                            sx={{width: 121, height: 121}}
                        />
                    ) : (
                        <Box component={"img"} src={UploadButton.src}/>
                    )}
                    <Box ml={2} sx={styles.profileUploadContent}>
                        <Box mb={1} component={"span"}>Profile Logo</Box>
                        <Button component="label" startIcon={<Box component={"img"} src={CloudUploadOutline.src}/>}
                                sx={styles.profileUploadButton}>
                            Upload
                            <input onChange={(e) => {
                                handleUploadFile(e)
                            }} hidden accept="image/*" multiple type="file"/>
                        </Button>
                    </Box>
                </Box>
                <Box mt={2} sx={styles.profileForm}>
                    <Box mb={2} sx={styles.profileFormControl}>
                        <Box mb={1} component={"label"}>User Name</Box>
                        <TextField value={profile.username} onChange={(e) => {
                            handleChange(e, "username")
                        }} sx={styles.profileFormTextField} placeholder="User Name" variant="outlined"/>
                    </Box>
                    <Box mb={2} sx={styles.profileFormControl}>
                        <Box mb={1} component={"label"}>Bio</Box>
                        <TextField value={profile.bio} onChange={(e) => {
                            handleChange(e, "bio")
                        }} multiline rows={3} sx={styles.profileFormTextField} placeholder="A short description"
                                   variant="outlined"/>
                    </Box>
                    <Box mb={2} sx={styles.profileFormControl}>
                        <Box mb={1} component={"label"}>Email</Box>
                        <TextField type={"email"} value={profile.email} onChange={(e) => {
                            handleChange(e, "email")
                        }} sx={styles.profileFormTextField} placeholder="john123@gmail.com" variant="outlined"/>
                    </Box>
                    <Box mb={2} sx={styles.profileFormControl}>
                        <Box mb={1} component={"label"}>Display Name</Box>
                        <TextField value={profile.dName} onChange={(e) => {
                            handleChange(e, "dName")
                        }} sx={styles.profileFormTextField} placeholder="Display Name" variant="outlined"/>
                    </Box>
                    <Box mb={2} sx={styles.profileFormControl}>
                        <Box mb={1} component={"label"}>Link</Box>
                        <TextField value={profile.link} onChange={(e) => {
                            handleChange(e, "link")
                        }} sx={styles.profileFormTextField} placeholder="https://" variant="outlined"/>
                    </Box>
                    <Stack mt={2} flexDirection={"row"} justifyContent={"space-between"}>
                        <Button onClick={() => handleSkip()} sx={styles.button} variant="contained"
                                color="primary">Skip</Button>
                        <Button onClick={() => handleContinue()} sx={styles.button} variant="contained"
                                color="primary">Continue</Button>
                    </Stack>
                </Box>
            </Box>

            <Dialog
                open={openVerifyEmailDialog}
                onClose={handleCloseVerifyDialog}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
            >
                <form onSubmit={handleVerifyEmail}>
                    <DialogTitle style={{color: 'black'}}>
                        Confirm Email
                    </DialogTitle>
                    <DialogContent>
                        <DialogContentText id="alert-dialog-description">
                            Please check your email for verification code
                        </DialogContentText>

                        <TextField
                            autoFocus
                            margin="dense"
                            id="verify-code"
                            label="Verification code"
                            type="text"
                            fullWidth
                            variant="standard"
                            required
                            onChange={(e) => setVerificationCode(e.target.value)}
                        />
                    </DialogContent>
                    <DialogActions>
                        <Button type='submit'>Verify</Button>
                        <Button onClick={() => handleCloseVerifyDialog()}>
                            Close
                        </Button>
                    </DialogActions>
                </form>
            </Dialog>

            <Dialog
                open={openConfirmMergeDialog}
                onClose={handleCloseConfirmMergeDialog}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
            >
                <form onSubmit={handleConfirmMerge}>
                    <DialogTitle style={{color: 'black'}}>
                        Confirm merge
                    </DialogTitle>
                    <DialogContent>
                        <DialogContentText id="alert-dialog-description">
                            Please check your email for verification code
                        </DialogContentText>

                        <TextField
                            autoFocus
                            margin="dense"
                            id="verify-code"
                            label="Verification code"
                            type="text"
                            fullWidth
                            variant="standard"
                            required
                            onChange={(e) => setConfirmMergeCode(e.target.value)}
                        />
                    </DialogContent>
                    <DialogActions>
                        <Button type='submit'>Verify</Button>
                        <Button onClick={() => handleCloseConfirmMergeDialog()}>
                            Close
                        </Button>
                    </DialogActions>
                </form>
            </Dialog>
        </>
    )
}

export default ProfileSettingCmp