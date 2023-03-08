import React, { useEffect, useState } from "react"
import { styles } from "/src/assets/theme/views/verifyuser/index"
import {
    Avatar,
    Box, Button, TextField
} from "@mui/material"

import UploadButton from "/src/assets/image/component/nftGenerator/UploadButton.svg"
import CloudUploadOutline from "/src/assets/image/component/nftGenerator/CloudUploadOutline.svg"
import { Stack } from "@mui/system"
import { useNavigate } from "react-router-dom"
import { useDispatch, useSelector } from "react-redux"

import { uploadLogo, updateUserData } from "/src/redux/actions/user"

const VerifyUserCmp = () => {

    const navigate = useNavigate()
    const dispatch = useDispatch()

    const userData = useSelector(state => state.user)
    const [bucketUrl, setBucketUrl] = useState(userData?.profileImage || '');
    const [profileImage, setProfileImage] = useState(null)
    const [profile, setProfile] = useState({
        username: "",
        bio: "",
        email: "",
        dName: "",
        link: ""
    })

    const handleChange = (event, type) => {
        setProfile({ ...profile, [type]: event.target.value })
    }

    const handleSkip = async () => {
        navigate("/")
    }

    const handleContinue = async () => {
        const obj = {
            email: profile.email,
            displayName: profile.dName,
            userId: userData?.user?._id,
            bio: profile.bio,
            firstName: profile.username,
            profileImage: bucketUrl,
            personalSite: profile.link,
        }
        await dispatch(updateUserData(obj))
        navigate("/")
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
                username: userData.firstName,
                bio: userData.bio,
                email: userData.email,
                dName: userData.displayName,
                link: userData.personalSite
            })
            setBucketUrl(userData.profileImage)
        }
    }, [userData])

    return (
        <Box sx={styles.profileSection}>
            <Box mt={5} sx={styles.profileHeader}>
                <Box component={"span"}>Profile Details</Box>
            </Box>
            <Box mt={4} sx={styles.profileUpload}>
                {bucketUrl ? (
                    <Avatar
                        alt="User Profile"
                        src={bucketUrl}
                        sx={{ width: 121, height: 121 }}
                    />
                ) : (
                    <img src={UploadButton} />
                )}
                <Box ml={2} sx={styles.profileUploadContent}>
                    <Box mb={1} component={"span"}>Profile Logo</Box>
                    <Button component="label" startIcon={<img src={CloudUploadOutline} />} sx={styles.profileUploadButton}>
                        Upload
                        <input onChange={(e) => { handleUploadFile(e) }} hidden accept="image/*" multiple type="file" />
                    </Button>
                </Box>
            </Box>
            <Box mt={2} sx={styles.profileForm}>
                <Box mb={2} sx={styles.profileFormControl}>
                    <Box mb={1} component={"label"}>User Name</Box>
                    <TextField value={profile.username} onChange={(e) => { handleChange(e, "username") }} sx={styles.profileFormTextField} placeholder="User Name" variant="outlined" />
                </Box>
                <Box mb={2} sx={styles.profileFormControl}>
                    <Box mb={1} component={"label"}>Bio</Box>
                    <TextField value={profile.bio} onChange={(e) => { handleChange(e, "bio") }} multiline rows={3} sx={styles.profileFormTextField} placeholder="A short description" variant="outlined" />
                </Box>
                <Box mb={2} sx={styles.profileFormControl}>
                    <Box mb={1} component={"label"}>Email</Box>
                    <TextField type={"email"} value={profile.email} onChange={(e) => { handleChange(e, "email") }} sx={styles.profileFormTextField} placeholder="john123@gmail.com" variant="outlined" />
                </Box>
                <Box mb={2} sx={styles.profileFormControl}>
                    <Box mb={1} component={"label"}>Display Name</Box>
                    <TextField value={profile.dName} onChange={(e) => { handleChange(e, "dName") }} sx={styles.profileFormTextField} placeholder="Display Name" variant="outlined" />
                </Box>
                <Box mb={2} sx={styles.profileFormControl}>
                    <Box mb={1} component={"label"}>Link</Box>
                    <TextField value={profile.link} onChange={(e) => { handleChange(e, "link") }} sx={styles.profileFormTextField} placeholder="https://" variant="outlined" />
                </Box>
                <Stack mt={2} flexDirection={"row"} justifyContent={"space-between"}>
                    <Button onClick={() => handleSkip()} sx={styles.button} variant="contained" color="primary">Skip</Button>
                    <Button onClick={() => handleContinue()} sx={styles.button} variant="contained" color="primary">Continue</Button>
                </Stack>
            </Box>
        </Box>
    )
}

export default VerifyUserCmp