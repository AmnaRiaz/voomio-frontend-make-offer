import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { useNavigate } from "react-router-dom"

// @material-ui/core components
import { makeStyles } from '@mui/styles'
import componentStyles, { styles } from "/src/assets/theme/views/nftgenerator/upload"
import {
    Box,
    Tab,
    Grid,
    Menu,
    Stack,
    Avatar,
    Dialog,
    Select,
    Button,
    MenuItem,
    TextField,
    Container,
    IconButton,
    createTheme,
    ThemeProvider,
    DialogContent,
    InputAdornment,
    CircularProgress,
} from "@mui/material"
import TabContext from '@mui/lab/TabContext'
import TabList from '@mui/lab/TabList'
import TabPanel from '@mui/lab/TabPanel'
import { ExpandMore, Close, MoreVert, Add, Circle, MoreHoriz, Delete, CheckCircle, Check, Percent, Numbers } from "@mui/icons-material"
import Wave from "react-wavify";

import CardanoModule from '../../cardano';

import DeleteIcon from "/src/assets/image/component/nftGenerator/DeleteIcon.svg"
import ShuffleIcon from "/src/assets/image/component/nftGenerator/shuffle1.svg"
import UploadButton from "/src/assets/image/component/nftGenerator/UploadButton.svg"
import EyeOutlineIcon from "/src/assets/image/component/nftGenerator/EyeOutline.svg"
import CogOutlineIcon from "/src/assets/image/component/nftGenerator/CogOutline.svg"
import CheckCircleIcon from "/src/assets/image/component/nftGenerator/CheckCircle.svg"
import UploadOutlineIcon from "/src/assets/image/component/nftGenerator/UploadOutline.svg"
import CloudUploadOutline from "/src/assets/image/component/nftGenerator/CloudUploadOutline.svg"
import DragHandleBlueIcon from "/src/assets/image/component/nftGenerator/DragHandleBlue.svg"
import SparklesOutlineIcon from "/src/assets/image/component/nftGenerator/SparklesOutline.svg"
import DragHandleWhiteIcon from "/src/assets/image/component/nftGenerator/DragHandleWhite.svg"
import SparklesOutlineWIcon from "/src/assets/image/component/nftGenerator/SparklesOutlineW.svg"
import PricingFooterItemIcon1 from "/src/assets/image/component/nftGenerator/pricingFooterItemIcon1.svg"
import PricingFooterItemIcon2 from "/src/assets/image/component/nftGenerator/pricingFooterItemIcon2.svg"

import ClothesItem1Image from "/src/assets/image/component/nftGenerator/Clothes_0000_Layer-6.png"
import ClothesItem2Image from "/src/assets/image/component/nftGenerator/Clothes_0003_Layer-2.png"
import ClothesItem3Image from "/src/assets/image/component/nftGenerator/Clothes_0004_Layer-1.png"
import PreviewUploadImage from "/src/assets/image/component/nftGenerator/PreviewUploadImage.png"
import TokenGalleryCardImage from "/src/assets/image/component/nftGenerator/TokenGalleryCardImage.png"
import TokenDialogContentImage from "/src/assets/image/component/nftGenerator/TokenDialogContentImage.png"
import DefaultTokenGalleryCardImage from "/src/assets/image/component/nftGenerator/DefaultTokenGalleryCardImage.png"

import { uploadLogo } from "../../redux/actions/user"
import { uploadImageToIpfs, addCollection } from "../../redux/actions/main"

import { notification } from "/src/utils/utility"

import CreateCmp from "./create"
import MintCmp from "./mint"

const useStyles = makeStyles(componentStyles)

const NftGenerator = () => {
    const classes = useStyles()

    const walletData = useSelector(state => state.wallet)
    const [mintLoading, setMintLoading] = useState(false)
    const [tab, setTab] = useState(0)
    const [subUploadTab, setSubUploadTab] = useState(0)
    const [previewTabValue, setPreviewTabValue] = useState('1')
    const [manageTabValue, setManageTabValue] = useState('1')
    const [tokenModalOpen, setTokenModalOpen] = useState(false)
    const [generateModalOpenValue, setGenerateModalOpenValue] = useState(false)
    const [componentsFilterValue, setComponentsFilterValue] = useState(1)
    const [selectNetworkValue, setSelectNetworkValue] = useState(1)
    const [previewCreateRuleState, setPreviewCreateRuleState] = useState(false)
    const [layersVisible, setLayersVisible] = useState(false)
    const [anchorEl, setAnchorEl] = useState(null)
    const moreItemModalOpen = Boolean(anchorEl)

    const [newNftItem, setNewNftItem] = useState({
        name: "",
        description: "",
        imageUrl: "",
        collectionId: "",
        collectionAddress: "",
        attributes: [{ type: "", value: "" }],
        blockchain: walletData.network.toLowerCase(),
        website: ""
    })
    const [shuffleList, setShuffleList] = useState([
        { name: "Body - Lorem", index: 0 },
        { name: "Clothes - Lorem", index: 1 },
        { name: "Color Background", index: 2 },
        { name: "Eyes", index: 3 },
        { name: "Hair", index: 4 },
        { name: "Mouth", index: 5 },
        { name: "Texture", index: 6 },
    ])

    const fromHex = (hex) => Buffer.from(hex, 'hex')

    const handleUploadFile = async (e) => {
        if (e.target.files && e.target.files[0]) {
            setSubUploadTab(1)
            const uploadImage = await uploadImageToIpfs(e.target.files[0])
            setNewNftItem({
                ...newNftItem,
                imageUrl: uploadImage.bucketUrl,
                cid: uploadImage.cid,
                ipfsUrl: uploadImage.ipfsUrl,
                bucketUrl: uploadImage.bucketUrl,
            })
            setSubUploadTab(2)
        } else {
            console.log("error!")
        }
    }

    const handleMoreItemClick = (event) => {
        setAnchorEl(event.currentTarget)
    }
    const handleMoreItemModalClose = () => {
        setAnchorEl(null)
    }

    const toggleTab = (index) => {
        setSubUploadTab(0)
        setTab(index)
    }

    const handleComponentsFilterChange = (event) => {
        setComponentsFilterValue(event.target.value)
    }

    const onSelectNetworkValue = (event) => {
        setSelectNetworkValue(event.target.value)
    }

    const handlePreviewTabChange = (event, newValue) => {
        setPreviewTabValue(newValue)
    }

    const handleManageTabChange = (event, newValue) => {
        setManageTabValue(newValue)
    }

    const handlePreviewCreateRule = (value) => {
        setPreviewCreateRuleState(value)
    }

    const handleTokenModalOpen = () => setTokenModalOpen(true)
    const handleTokenModalClose = () => setTokenModalOpen(false)

    const handleGenerateModalOpen = () => setGenerateModalOpenValue(true)
    const handleGenerateModalClose = () => setGenerateModalOpenValue(false)

    const goToNext = (data) => {
        setNewNftItem({ ...newNftItem, ...data })
        setSubUploadTab(3)
    }

    const goToBack = (data) => {
        setNewNftItem({ ...newNftItem, attributes: data })
        setSubUploadTab(2)
    }

    const handleShuffle = async () => {
        const list = await shuffleFunc(shuffleList)
        setShuffleList([...list])
    }

    function shuffleFunc(arra1) {
        let ctr = arra1.length, temp, index
        while (ctr > 0) {
            index = Math.floor(Math.random() * ctr)
            ctr--
            temp = arra1[ctr]
            arra1[ctr] = arra1[index]
            arra1[index] = temp
        }
        return arra1
    }

    const theme = createTheme({
        components: {
            MuiList: {
                styleOverrides: {
                    root: {
                        padding: '0px'
                    }
                }
            },
            MuiPaper: {
                styleOverrides: {
                    root: {
                        background: "transparent",
                        // background: "linear-gradient(white, white) padding-box, linear-gradient(93.69deg, #7B61FF 0%, #00DAD9 107.12%) border-box",
                        // border: "2px solid transparent",
                        borderRadius: "11px !important"
                    }
                }
            }
        }
    })

    return (
        <Container maxWidth="xl" className={classes.container}>
            <Dialog sx={styles.mintLoadingDialog} open={mintLoading}>
                <Box sx={styles.mintLoadingTitle} component={"span"}>Please wait</Box>
                <Box sx={styles.mintLoadingBox}>
                    <CircularProgress />
                </Box>
            </Dialog>
            <Box>
                <Grid container direction="row" justify="center" alignItems="center">
                    <Grid item xl={4} lg={4} md={5} sm={12} xs={12}>
                        <Box>
                            <h1 className={classes.pageHeaderTitle}>NFT Generator</h1>
                            <p className={classes.pageHeaderSubTitle}>Current NFT</p>
                            <span className={classes.pageHeaderText}>Single-item</span>
                        </Box>
                    </Grid>
                    <Grid item xl={8} lg={8} md={7} sm={12} xs={12}>
                        <Box display="flex" justifyContent="space-between" flexWrap={{ sm: "nowrap", xs: "wrap" }}>
                            {/* <Box className={classes.uploadStepButton}>
                                <Box component={"img"} src={UploadOutlineIcon.src} />
                                <span>Upload</span>
                            </Box> */}
                            {/* <Box className={classes.disabledUploadStepButton}>
                                <Box component={"img"} src={EyeOutlineIcon.src} />
                                <span>Preview</span>
                            </Box> */}
                            <Button onClick={(e) => toggleTab(0)} className={tab === 0 ? classes.uploadStepButton : classes.disabledUploadStepButton}>
                                <Box component={"img"} src={UploadOutlineIcon.src} />
                                <span>Upload</span>
                            </Button>
                            <Button onClick={(e) => toggleTab(1)} className={tab === 1 ? classes.uploadStepButton : classes.disabledUploadStepButton}>
                                <Box component={"img"} src={EyeOutlineIcon.src} />
                                <span>Preview</span>
                            </Button>
                            <Button onClick={(e) => toggleTab(2)} className={tab === 2 ? classes.uploadStepButton : classes.disabledUploadStepButton}>
                                <Box component={"img"} src={CogOutlineIcon.src} />
                                <span>Manage</span>
                            </Button>
                            <Button onClick={(e) => toggleTab(3)} className={tab === 3 ? classes.uploadStepButton : classes.disabledUploadStepButton}>
                                <Box component={"img"} src={SparklesOutlineIcon.src} />
                                <span>Generate</span>
                            </Button>
                        </Box>
                    </Grid>
                </Grid>
            </Box>
            <Box mt={{ xl: 4, xs: 2 }}>
                <Grid container direction="row">
                    <Grid item xl={2} lg={12} md={12} sm={12} xs={12}>
                        <Box mt={{ xl: 15 }}>
                            <p className={classes.pageHeaderSubTitle}>Settings</p>
                            <Box display="flex" flexDirection={{ xl: "column", lg: "row", md: "row", sm: "row", xs: "row" }}>
                                <Box onClick={(e) => toggleTab(5)} component="span" mx={{ xl: 0, xs: 2 }} className={classes.pageHeaderText}>
                                    {tab === 5 ? (
                                        <Circle sx={{ fontSize: "10px", marginRight: "10px" }} />
                                    ) : ""}
                                    Layers
                                </Box>
                                <Box onClick={(e) => toggleTab(6)} component="span" mx={{ xl: 0, xs: 2 }} className={classes.pageHeaderText}>
                                    {tab === 6 ? (
                                        <Circle sx={{ fontSize: "10px", marginRight: "10px" }} />
                                    ) : ""}
                                    Rules
                                </Box>
                            </Box>
                        </Box>
                    </Grid>
                    <Grid item xl={10} lg={12} md={12} sm={12} xs={12}>
                        {tab === 0 ? (
                            <Box className={classes.uploadSection}>
                                {
                                    subUploadTab === 0 ? (
                                        <Box mt={3} className={classes.dropzone} display="flex" flexDirection="column" justifyContent="center" alignItems="center">
                                            <p className={classes.dropzoneText}>Drag and drop or browse to choose your collection folder</p>
                                            {/* <Button size="large" className={classes.chooseFileButton} variant="contained" color="primary" onClick={() => setSubUploadTab(1)} > */}
                                            <Button size="large" component="label" className={classes.chooseFileButton} variant="contained" color="primary">
                                                Choose file...
                                                <input hidden onChange={(e) => { handleUploadFile(e) }} accept="image/*" type="file" />
                                            </Button>
                                        </Box>
                                    ) : subUploadTab === 1 ? (
                                        <Box mt={3} className={classes.uploadingDropzone}>
                                            <Wave fill="url(#gradient)" className={classes.uploadWave} options={{
                                                height: 30,
                                                amplitude: 60,
                                                speed: 0.3,
                                                points: 2
                                            }}>
                                                <defs>
                                                    <linearGradient id="gradient" gradientTransform="rotate(90)">
                                                        <stop offset="0%" stopColor="#00DAD9" />
                                                        <stop offset="107%" stopColor="#7B61FF" />
                                                    </linearGradient>
                                                </defs>
                                            </Wave>
                                            <Wave fill="url(#gradient)" className={classes.uploadWave1} options={{
                                                height: 30,
                                                amplitude: 60,
                                                speed: 0.3,
                                                points: 2
                                            }}>
                                                <defs>
                                                    <linearGradient id="gradient" gradientTransform="rotate(90)">
                                                        <stop offset="0%" stopColor="#00DAD9" />
                                                        <stop offset="107%" stopColor="#7B61FF" />
                                                    </linearGradient>
                                                </defs>
                                            </Wave>
                                            <Box component={"span"} sx={styles.uploadingDropzoneText}>Uploading...</Box>
                                        </Box>
                                    ) : subUploadTab === 2 ? (
                                        <Box mt={{ xl: 0, xs: 3 }} className={classes.successDropzone} >
                                            <Stack>
                                                <Box mb={{ md: 8, xs: 5 }} mt={10} sx={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
                                                    <Box><Box component={"img"} src={CheckCircleIcon.src} /></Box>
                                                    <Box component={"span"} className={classes.successDropzoneText}>Success!</Box>
                                                    <Box component={"span"} className={classes.successDropzoneDescription}>Your upload has completed.</Box>
                                                    <Box mt={{ md: 8, xs: 3 }} textAlign={"center"} >
                                                        <CreateCmp newNftItem={newNftItem} onNext={goToNext} />
                                                        {/* <Button sx={styles.successDropzoneButton} variant="outlined" color="primary" onClick={() => setSubUploadTab(0)} >Upload More</Button>
                                                    <Button onClick={() => { setLayersVisible(!layersVisible) }} endIcon={<Box component={"img"} src={DragHandleWhiteIcon.src} />} sx={layersVisible ? styles.selectedSuccessDropzoneButton : styles.successDropzoneButton} variant="outlined" color="primary">Sort Layers</Button> */}
                                                    </Box>
                                                </Box>
                                                {layersVisible === true ? (
                                                    <Box mb={{ md: 8, xs: 5 }} sx={styles.uploadPreviewContent}>
                                                        <Box mr={{ md: 5, xs: 0 }} sx={{ padding: { md: "0px", xs: "10px" } }}>
                                                            <Box component="h1" className={classes.previewHeaderText}>Preview</Box>
                                                            <Box component="img" sx={styles.previewImage} src={newNftItem.imageUrl ? newNftItem.imageUrl : PreviewUploadImage.src} />
                                                            <Box my={3}>
                                                                <Button onClick={() => { handleShuffle() }} endIcon={<Box component={"img"} src={ShuffleIcon.src} width="1em" height="1em" />} sx={styles.shuffleOrderButton} variant="outlined" color="primary">Shuffle Order</Button>
                                                            </Box>
                                                            <Box my={3}>
                                                                <Button onClick={() => { onNextStep() }} sx={styles.shuffleOrderButton} variant="outlined" color="primary">Next step</Button>
                                                            </Box>
                                                        </Box>
                                                        <Box>
                                                            <Box component="h1" className={classes.attributesHeaderText}>Attributes Order</Box>
                                                            <Box display="flex" flexDirection="column">
                                                                {shuffleList.map((item, index) => {
                                                                    return (
                                                                        <Button key={index} endIcon={<Box component={"img"} src={DragHandleBlueIcon.src} />} classes={{ root: classes.attributesOrderButton }} variant="outlined" color="primary">
                                                                            {item.name}
                                                                        </Button>
                                                                    )
                                                                })}
                                                            </Box>
                                                        </Box>
                                                    </Box>
                                                ) : ""}
                                            </Stack>
                                        </Box>
                                    ) : (
                                        <Box mt={{ xl: 0, xs: 3 }} className={classes.successDropzone}>
                                            <MintCmp
                                                newNftItem={newNftItem}
                                                goToBack={goToBack}
                                                getCardanoPolicyScript={getCardanoPolicyScript}
                                            />
                                        </Box>
                                    )
                                }
                            </Box>
                        ) : tab === 1 ? (
                            <Box className={classes.previewSection}>
                                <TabContext value={previewTabValue}>
                                    <Box sx={styles.previewTabBar}>
                                        <TabList sx={styles.previewTabList} onChange={handlePreviewTabChange}>
                                            <Tab sx={styles.previewTabButton} label="Token Gallery" value="1" />
                                            <Tab sx={styles.previewTabButton} label="Metadata" value="2" />
                                        </TabList>
                                    </Box>
                                    <TabPanel value="1" sx={{ padding: "24px 0px" }}>
                                        <Box my={3} sx={styles.tokenGalleryTabPanel}>
                                            <Grid container>
                                                <Grid item xl={3} lg={4} md={12} sm={12} xs={12}>
                                                    <Box sx={styles.tokenGallerySideBar}>
                                                        <Box m={0} component="h2">Tokens</Box>
                                                        <Box mt={3}>
                                                            <Button sx={styles.regenerateTokenButton} startIcon={<Box component={"img"} src={SparklesOutlineWIcon.src} />}>Regenerate Tokens</Button>
                                                        </Box>
                                                        <Box mt={7} component="h2">Filters</Box>
                                                        <Box sx={styles.tokenGalleryFilter}>
                                                            <Button sx={styles.tokenGalleryFilterButton} endIcon={<ExpandMore />}>Body - Lorem</Button>
                                                            <Button sx={styles.tokenGalleryFilterButton} endIcon={<ExpandMore />}>Clothes - Lorem</Button>
                                                            <Button sx={styles.tokenGalleryFilterButton} endIcon={<ExpandMore />}>Color Background</Button>
                                                            <Button sx={styles.tokenGalleryFilterButton} endIcon={<ExpandMore />}>Eyes</Button>
                                                            <Button sx={styles.tokenGalleryFilterButton} endIcon={<ExpandMore />}>Hair</Button>
                                                            <Button sx={styles.tokenGalleryFilterButton} endIcon={<ExpandMore />}>Mouth</Button>
                                                            <Button sx={styles.tokenGalleryFilterButton} endIcon={<ExpandMore />}>Texture</Button>
                                                        </Box>
                                                    </Box>
                                                </Grid>
                                                <Grid item xl={9} lg={8} md={12} sm={12} xs={12}>
                                                    <Box sx={styles.tokenGalleryCotent}>
                                                        <Grid container spacing={2}>
                                                            <Grid item xl={3} lg={4} md={6} sm={12} xs={12}>
                                                                <Stack onClick={() => handleTokenModalOpen()} sx={styles.tokenGalleryCard}>
                                                                    <Box sx={styles.tokenGalleryCardContent} component="img" src={TokenGalleryCardImage.src} />
                                                                    <Box sx={styles.tokenGalleryCardFooter} component="span">#1</Box>
                                                                </Stack>
                                                                {/* <Box onClick={() => handleTokenModalOpen()} sx={styles.tokenGalleryCard}>
                                                                    <Stack>
                                                                    </Stack>
                                                                    <Box sx={styles.tokenGalleryCardContent} component="img" src={TokenGalleryCardImage} >
                                                                    </Box>
                                                                    <Box sx={styles.tokenGalleryCardFooter} component="span">
                                                                        #1
                                                                    </Box>
                                                                </Box> */}
                                                            </Grid>
                                                            <Grid item xl={3} lg={4} md={6} sm={12} xs={12}>
                                                                <Stack onClick={() => handleTokenModalOpen()} sx={styles.tokenGalleryCard}>
                                                                    <Box sx={styles.tokenGalleryCardContent} component="img" src={DefaultTokenGalleryCardImage.src} />
                                                                    <Box sx={styles.tokenGalleryCardFooter} component="span">#1</Box>
                                                                </Stack>
                                                            </Grid>
                                                            <Grid item xl={3} lg={4} md={6} sm={12} xs={12}>
                                                                <Stack onClick={() => handleTokenModalOpen()} sx={styles.tokenGalleryCard}>
                                                                    <Box sx={styles.tokenGalleryCardContent} component="img" src={DefaultTokenGalleryCardImage.src} />
                                                                    <Box sx={styles.tokenGalleryCardFooter} component="span">#1</Box>
                                                                </Stack>
                                                            </Grid>
                                                            <Grid item xl={3} lg={4} md={6} sm={12} xs={12}>
                                                                <Stack onClick={() => handleTokenModalOpen()} sx={styles.tokenGalleryCard}>
                                                                    <Box sx={styles.tokenGalleryCardContent} component="img" src={DefaultTokenGalleryCardImage.src} />
                                                                    <Box sx={styles.tokenGalleryCardFooter} component="span">#1</Box>
                                                                </Stack>
                                                            </Grid>
                                                            <Grid item xl={3} lg={4} md={6} sm={12} xs={12}>
                                                                <Stack onClick={() => handleTokenModalOpen()} sx={styles.tokenGalleryCard}>
                                                                    <Box sx={styles.tokenGalleryCardContent} component="img" src={DefaultTokenGalleryCardImage.src} />
                                                                    <Box sx={styles.tokenGalleryCardFooter} component="span">#1</Box>
                                                                </Stack>
                                                            </Grid>
                                                        </Grid>
                                                    </Box>
                                                </Grid>
                                            </Grid>
                                        </Box>
                                        <Dialog open={tokenModalOpen} onClose={handleTokenModalClose} sx={styles.tokenDialog} >
                                            {/* <Stack> */}
                                            <IconButton
                                                aria-label="close"
                                                onClick={handleTokenModalClose}
                                                sx={styles.tokenDialogCloseButton}
                                            >
                                                <Close />
                                            </IconButton>
                                            <Box sx={styles.previewTokenModal}>
                                                <Box component={"span"} sx={styles.tokenDialogHeader}>
                                                    #1267
                                                    <IconButton size="small">
                                                        <MoreVert />
                                                    </IconButton>
                                                </Box>
                                                <Box sx={styles.tokenDialogContent}>
                                                    <Grid container spacing={3}>
                                                        <Grid item xl={6} lg={6} md={6} sm={12} xs={12}>
                                                            <Box component={"img"} width="100%" src={TokenDialogContentImage.src} />
                                                        </Grid>
                                                        <Grid item xl={6} lg={6} md={6} sm={12} xs={12}>
                                                            <Box sx={styles.tokenDialogAttributes}>
                                                                <Box sx={styles.tokenDialogAttributesText} component={"span"}>Attributes</Box>
                                                                <Box sx={styles.tokenDialogAttributesList}>
                                                                    <Box component={"span"}>Clothes</Box>
                                                                    <Box component={"span"}>Lorem Ipsum</Box>
                                                                </Box>
                                                                <Box sx={styles.tokenDialogAttributesList}>
                                                                    <Box component={"span"}>Hair</Box>
                                                                    <Box component={"span"}>Lorem Ipsum</Box>
                                                                </Box>
                                                                <Box sx={styles.tokenDialogAttributesList}>
                                                                    <Box component={"span"}>Texture</Box>
                                                                    <Box component={"span"}>Lorem Ipsum</Box>
                                                                </Box>
                                                                <Box sx={styles.tokenDialogAttributesList}>
                                                                    <Box component={"span"}>Eyes</Box>
                                                                    <Box component={"span"}>Lorem Ipsum</Box>
                                                                </Box>
                                                                <Box sx={styles.tokenDialogAttributesList}>
                                                                    <Box component={"span"}>Mouth</Box>
                                                                    <Box component={"span"}>Lorem Ipsum</Box>
                                                                </Box>
                                                                <Box sx={styles.tokenDialogAttributesList}>
                                                                    <Box component={"span"}>Color Background</Box>
                                                                    <Box component={"span"}>Lorem Ipsum</Box>
                                                                </Box>
                                                                <Box sx={styles.tokenDialogAttributesList}>
                                                                    <Box component={"span"}>Body</Box>
                                                                    <Box component={"span"}>Lorem Ipsum</Box>
                                                                </Box>
                                                            </Box>
                                                        </Grid>
                                                    </Grid>
                                                </Box>
                                                <Box sx={styles.tokenDialogFooter}>
                                                    {previewCreateRuleState === false ? (
                                                        <Button onClick={() => { handlePreviewCreateRule(true) }} sx={styles.createRuleButton} startIcon={<Add />}>
                                                            Create Rule
                                                        </Button>
                                                    ) : (
                                                        <Button onClick={() => { handlePreviewCreateRule(false) }} sx={styles.cancelRuleButton} startIcon={<Close />}>
                                                            Cancel
                                                        </Button>
                                                    )}
                                                </Box>
                                            </Box>
                                            {
                                                previewCreateRuleState === true ? (
                                                    <Box sx={styles.createRuleContent}>
                                                        <Box sx={styles.createRuleHeader} component={"span"}>Create A Rule</Box>
                                                        <Box sx={styles.createRuleDescription} component={"p"}>After you create a rule any existing tokens will be regenerated.</Box>
                                                        <Stack sx={styles.createRuleSelect}>
                                                            <Button sx={styles.createRuleSelectButton} endIcon={<ExpandMore />}>Cowboy vest</Button>
                                                            <Button sx={styles.createRuleSelectButton} endIcon={<ExpandMore />}>Doesn't mix with</Button>
                                                            <Button sx={styles.createRuleSelectButton} endIcon={<ExpandMore />}>Captain Hat</Button>
                                                        </Stack>
                                                        <Box sx={styles.createRuleFooter}>
                                                            <Button sx={styles.createRuleButton} startIcon={<Add />}>
                                                                Create Rule
                                                            </Button>
                                                        </Box>
                                                    </Box>
                                                ) : ""
                                            }
                                            {/* </Stack> */}
                                        </Dialog>
                                    </TabPanel>
                                    <TabPanel value="2">
                                        <Stack>Metadata</Stack>
                                    </TabPanel>
                                </TabContext>
                            </Box>
                        ) : tab === 2 ? (
                            <Box className={classes.manageSection}>
                                <TabContext value={manageTabValue}>
                                    <Box sx={styles.manageTabBar}>
                                        <TabList sx={styles.manageTabList} onChange={handleManageTabChange}>
                                            <Tab sx={styles.manageTabButton} label="Components" value="1" />
                                            <Tab sx={styles.manageTabButton} label="One-of-Ones" value="2" />
                                        </TabList>
                                    </Box>
                                    <TabPanel value="1" sx={styles.componentsTabPanel}>
                                        <Box sx={styles.componentsTabContent}>
                                            <Box sx={styles.componentsFilter}>
                                                <ThemeProvider theme={theme}>
                                                    <Select value={componentsFilterValue}
                                                        onChange={handleComponentsFilterChange}
                                                        displayEmpty
                                                        sx={styles.selectButton}
                                                    >
                                                        <MenuItem disabled sx={styles.selectMenuItem} value={0}>
                                                            <Stack component="span">Sort by</Stack>
                                                            <ExpandMore />
                                                        </MenuItem>
                                                        <MenuItem sx={styles.selectMenuItem} value={1}>By design</MenuItem>
                                                        <MenuItem sx={styles.selectMenuItem} value={2}>A to Z</MenuItem>
                                                        <MenuItem sx={styles.selectMenuItem} value={3}>Last edit</MenuItem>
                                                    </Select>
                                                </ThemeProvider>
                                            </Box>
                                            <Box mt={6} sx={styles.componentsContent}>
                                                <Box sx={styles.clothesSection}>
                                                    <Box sx={styles.clothesSectionHeader}>
                                                        <Box component={"span"}>Clothes</Box>
                                                        <IconButton>
                                                            <MoreVert />
                                                        </IconButton>
                                                    </Box>
                                                    <Box mt={4} sx={styles.clothesSectionContent}>
                                                        <Grid spacing={3} container sx={{ overflowX: "scroll", flexWrap: "nowrap" }} >
                                                            <Grid item xl={4} lg={4} md={6} sm={12} xs={12} >
                                                                <Box sx={styles.clothesItem}>
                                                                    <Box sx={styles.clothesItemContent}>
                                                                        <Box sx={styles.clothesItemImage} component={"img"} src={ClothesItem1Image.src}></Box>
                                                                    </Box>
                                                                    <Box mt={3} mb={1} sx={styles.clothesItemFooter}>
                                                                        <Box component={"span"}>Lorem Ipsum</Box>
                                                                        <Box sx={styles.clothesItemFooterIcons}>
                                                                            <Box>
                                                                                <Circle sx={styles.clothesItemCircleBIcon} />
                                                                                <Circle sx={styles.clothesItemCircleBIcon} />
                                                                                <Circle sx={styles.clothesItemCircleBIcon} />
                                                                                <Circle sx={styles.clothesItemCircleWIcon} />
                                                                                <Circle sx={styles.clothesItemCircleWIcon} />
                                                                            </Box>
                                                                            <Box>
                                                                                <IconButton onClick={handleMoreItemClick}>
                                                                                    <MoreHoriz />
                                                                                </IconButton>
                                                                                <Menu
                                                                                    anchorEl={anchorEl}
                                                                                    open={moreItemModalOpen}
                                                                                    onClose={handleMoreItemModalClose}
                                                                                >
                                                                                    <MenuItem onClick={handleMoreItemModalClose}>
                                                                                        <Stack sx={styles.moreMenuItem} flexDirection={"row"} alignItems={"center"}>
                                                                                            <Circle sx={{ color: "#000000", fontSize: "18px", marginRight: "10px" }} />
                                                                                            <Stack mr={2} component={"span"}>Set Rarity</Stack>
                                                                                            <Check sx={{ color: "#6549F6" }} />
                                                                                        </Stack>
                                                                                    </MenuItem>
                                                                                    <MenuItem onClick={handleMoreItemModalClose}>
                                                                                        <Stack sx={styles.moreMenuItem} flexDirection={"row"} alignItems={"center"}>
                                                                                            <Numbers sx={{ color: "#000000", fontSize: "18px", marginRight: "10px" }} />
                                                                                            <Stack mr={2} component={"span"}>Set Quantity</Stack>
                                                                                        </Stack>
                                                                                    </MenuItem>
                                                                                    <MenuItem onClick={handleMoreItemModalClose}>
                                                                                        <Stack sx={styles.moreMenuItem} flexDirection={"row"} alignItems={"center"}>
                                                                                            <Percent sx={{ color: "#000000", fontSize: "18px", marginRight: "10px" }} />
                                                                                            <Stack mr={2} component={"span"}>Set Percentage</Stack>
                                                                                        </Stack>
                                                                                    </MenuItem>
                                                                                </Menu>
                                                                            </Box>
                                                                        </Box>
                                                                    </Box>
                                                                </Box>
                                                            </Grid>
                                                            <Grid item xl={4} lg={4} md={6} sm={12} xs={12} >
                                                                <Box sx={styles.clothesItem}>
                                                                    <Box sx={styles.clothesItemContent}>
                                                                        <Box sx={styles.clothesItemImage} component={"img"} src={ClothesItem2Image.src}></Box>
                                                                    </Box>
                                                                    <Box mt={3} mb={1} sx={styles.clothesItemFooter}>
                                                                        <Box component={"span"}>Lorem Ipsum</Box>
                                                                        <Box sx={styles.clothesItemFooterIcons}>
                                                                            <Box>
                                                                                <Circle sx={styles.clothesItemCircleBIcon} />
                                                                                <Circle sx={styles.clothesItemCircleBIcon} />
                                                                                <Circle sx={styles.clothesItemCircleBIcon} />
                                                                                <Circle sx={styles.clothesItemCircleWIcon} />
                                                                                <Circle sx={styles.clothesItemCircleWIcon} />
                                                                            </Box>
                                                                            <Box>
                                                                                <IconButton
                                                                                    onClick={handleMoreItemClick}
                                                                                >
                                                                                    <MoreHoriz />
                                                                                </IconButton>
                                                                                <Menu
                                                                                    anchorEl={anchorEl}
                                                                                    open={moreItemModalOpen}
                                                                                    onClose={handleMoreItemModalClose}
                                                                                >
                                                                                    <MenuItem onClick={handleMoreItemModalClose}>
                                                                                        <Stack sx={styles.moreMenuItem} flexDirection={"row"} alignItems={"center"}>
                                                                                            <Circle sx={{ color: "#000000", fontSize: "18px", marginRight: "10px" }} />
                                                                                            <Stack mr={2} component={"span"}>Set Rarity</Stack>
                                                                                            <Check sx={{ color: "#6549F6" }} />
                                                                                        </Stack>
                                                                                    </MenuItem>
                                                                                    <MenuItem onClick={handleMoreItemModalClose}>
                                                                                        <Stack sx={styles.moreMenuItem} flexDirection={"row"} alignItems={"center"}>
                                                                                            <Numbers sx={{ color: "#000000", fontSize: "18px", marginRight: "10px" }} />
                                                                                            <Stack mr={2} component={"span"}>Set Quantity</Stack>
                                                                                        </Stack>
                                                                                    </MenuItem>
                                                                                    <MenuItem onClick={handleMoreItemModalClose}>
                                                                                        <Stack sx={styles.moreMenuItem} flexDirection={"row"} alignItems={"center"}>
                                                                                            <Percent sx={{ color: "#000000", fontSize: "18px", marginRight: "10px" }} />
                                                                                            <Stack mr={2} component={"span"}>Set Percentage</Stack>
                                                                                        </Stack>
                                                                                    </MenuItem>
                                                                                </Menu>
                                                                            </Box>
                                                                        </Box>
                                                                    </Box>
                                                                </Box>
                                                            </Grid>
                                                            <Grid item xl={4} lg={4} md={6} sm={12} xs={12} >
                                                                <Box sx={styles.clothesItem}>
                                                                    <Box sx={styles.clothesItemContent}>
                                                                        <Box sx={styles.clothesItemImage} component={"img"} src={ClothesItem3Image.src}></Box>
                                                                    </Box>
                                                                    <Box mt={3} mb={1} sx={styles.clothesItemFooter}>
                                                                        <Box component={"span"}>Lorem Ipsum</Box>
                                                                        <Box sx={styles.clothesItemFooterIcons}>
                                                                            <Box>
                                                                                <Circle sx={styles.clothesItemCircleBIcon} />
                                                                                <Circle sx={styles.clothesItemCircleBIcon} />
                                                                                <Circle sx={styles.clothesItemCircleBIcon} />
                                                                                <Circle sx={styles.clothesItemCircleWIcon} />
                                                                                <Circle sx={styles.clothesItemCircleWIcon} />
                                                                            </Box>
                                                                            <Box>
                                                                                <IconButton
                                                                                    onClick={handleMoreItemClick}
                                                                                >
                                                                                    <MoreHoriz />
                                                                                </IconButton>
                                                                                <Menu
                                                                                    anchorEl={anchorEl}
                                                                                    open={moreItemModalOpen}
                                                                                    onClose={handleMoreItemModalClose}
                                                                                >
                                                                                    <MenuItem onClick={handleMoreItemModalClose}>
                                                                                        <Stack sx={styles.moreMenuItem} flexDirection={"row"} alignItems={"center"}>
                                                                                            <Circle sx={{ color: "#000000", fontSize: "18px", marginRight: "10px" }} />
                                                                                            <Stack mr={2} component={"span"}>Set Rarity</Stack>
                                                                                            <Check sx={{ color: "#6549F6" }} />
                                                                                        </Stack>
                                                                                    </MenuItem>
                                                                                    <MenuItem onClick={handleMoreItemModalClose}>
                                                                                        <Stack sx={styles.moreMenuItem} flexDirection={"row"} alignItems={"center"}>
                                                                                            <Numbers sx={{ color: "#000000", fontSize: "18px", marginRight: "10px" }} />
                                                                                            <Stack mr={2} component={"span"}>Set Quantity</Stack>
                                                                                        </Stack>
                                                                                    </MenuItem>
                                                                                    <MenuItem onClick={handleMoreItemModalClose}>
                                                                                        <Stack sx={styles.moreMenuItem} flexDirection={"row"} alignItems={"center"}>
                                                                                            <Percent sx={{ color: "#000000", fontSize: "18px", marginRight: "10px" }} />
                                                                                            <Stack mr={2} component={"span"}>Set Percentage</Stack>
                                                                                        </Stack>
                                                                                    </MenuItem>
                                                                                </Menu>
                                                                            </Box>
                                                                        </Box>
                                                                    </Box>
                                                                </Box>
                                                            </Grid>
                                                            <Grid item xl={4} lg={4} md={6} sm={12} xs={12} >
                                                                <Box sx={styles.clothesItem}>
                                                                    <Box sx={styles.clothesItemContent}>
                                                                        <Box sx={styles.clothesItemImage} component={"img"} src={ClothesItem1Image.src}></Box>
                                                                    </Box>
                                                                    <Box mt={3} mb={1} sx={styles.clothesItemFooter}>
                                                                        <Box component={"span"}>Lorem Ipsum</Box>
                                                                        <Box sx={styles.clothesItemFooterIcons}>
                                                                            <Box>
                                                                                <Circle sx={styles.clothesItemCircleBIcon} />
                                                                                <Circle sx={styles.clothesItemCircleBIcon} />
                                                                                <Circle sx={styles.clothesItemCircleBIcon} />
                                                                                <Circle sx={styles.clothesItemCircleWIcon} />
                                                                                <Circle sx={styles.clothesItemCircleWIcon} />
                                                                            </Box>
                                                                            <Box>
                                                                                <IconButton
                                                                                    onClick={handleMoreItemClick}
                                                                                >
                                                                                    <MoreHoriz />
                                                                                </IconButton>
                                                                                <Menu
                                                                                    anchorEl={anchorEl}
                                                                                    open={moreItemModalOpen}
                                                                                    onClose={handleMoreItemModalClose}
                                                                                >
                                                                                    <MenuItem onClick={handleMoreItemModalClose}>
                                                                                        <Stack sx={styles.moreMenuItem} flexDirection={"row"} alignItems={"center"}>
                                                                                            <Circle sx={{ color: "#000000", fontSize: "18px", marginRight: "10px" }} />
                                                                                            <Stack mr={2} component={"span"}>Set Rarity</Stack>
                                                                                            <Check sx={{ color: "#6549F6" }} />
                                                                                        </Stack>
                                                                                    </MenuItem>
                                                                                    <MenuItem onClick={handleMoreItemModalClose}>
                                                                                        <Stack sx={styles.moreMenuItem} flexDirection={"row"} alignItems={"center"}>
                                                                                            <Numbers sx={{ color: "#000000", fontSize: "18px", marginRight: "10px" }} />
                                                                                            <Stack mr={2} component={"span"}>Set Quantity</Stack>
                                                                                        </Stack>
                                                                                    </MenuItem>
                                                                                    <MenuItem onClick={handleMoreItemModalClose}>
                                                                                        <Stack sx={styles.moreMenuItem} flexDirection={"row"} alignItems={"center"}>
                                                                                            <Percent sx={{ color: "#000000", fontSize: "18px", marginRight: "10px" }} />
                                                                                            <Stack mr={2} component={"span"}>Set Percentage</Stack>
                                                                                        </Stack>
                                                                                    </MenuItem>
                                                                                </Menu>
                                                                            </Box>
                                                                        </Box>
                                                                    </Box>
                                                                </Box>
                                                            </Grid>
                                                        </Grid>
                                                    </Box>
                                                </Box>
                                                <Box mt={6} sx={styles.clothesSection}>
                                                    <Box sx={styles.clothesSectionHeader}>
                                                        <Box component={"span"}>Backgrounds</Box>
                                                        <IconButton>
                                                            <MoreVert />
                                                        </IconButton>
                                                    </Box>
                                                    <Box mt={4} sx={styles.clothesSectionContent}>
                                                        <Grid spacing={3} container sx={{ overflowX: "scroll", flexWrap: "nowrap" }} >
                                                            <Grid item xl={4} lg={4} md={6} sm={12} xs={12} >
                                                                <Box sx={styles.clothesItem}>
                                                                    <Box sx={{
                                                                        height: "150px",
                                                                        display: "flex",
                                                                        border: "2px solid #6549F6",
                                                                        borderRadius: "10px",
                                                                        padding: "50px 50px 0px 50px",
                                                                        background: "#FFA629"
                                                                    }}>
                                                                        <Box sx={{ background: "black" }}></Box>
                                                                    </Box>
                                                                    <Box mt={3} mb={1} sx={styles.clothesItemFooter}>
                                                                        <Box component={"span"}>Lorem Ipsum</Box>
                                                                        <Box sx={styles.clothesItemFooterIcons}>
                                                                            <Box>
                                                                                <Circle sx={styles.clothesItemCircleBIcon} />
                                                                                <Circle sx={styles.clothesItemCircleBIcon} />
                                                                                <Circle sx={styles.clothesItemCircleBIcon} />
                                                                                <Circle sx={styles.clothesItemCircleWIcon} />
                                                                                <Circle sx={styles.clothesItemCircleWIcon} />
                                                                            </Box>
                                                                            <Box>
                                                                                <IconButton
                                                                                    onClick={handleMoreItemClick}
                                                                                >
                                                                                    <MoreHoriz />
                                                                                </IconButton>
                                                                                <Menu
                                                                                    anchorEl={anchorEl}
                                                                                    open={moreItemModalOpen}
                                                                                    onClose={handleMoreItemModalClose}
                                                                                >
                                                                                    <MenuItem onClick={handleMoreItemModalClose}>
                                                                                        <Stack sx={styles.moreMenuItem} flexDirection={"row"} alignItems={"center"}>
                                                                                            <Circle sx={{ color: "#000000", fontSize: "18px", marginRight: "10px" }} />
                                                                                            <Stack mr={2} component={"span"}>Set Rarity</Stack>
                                                                                            <Check sx={{ color: "#6549F6" }} />
                                                                                        </Stack>
                                                                                    </MenuItem>
                                                                                    <MenuItem onClick={handleMoreItemModalClose}>
                                                                                        <Stack sx={styles.moreMenuItem} flexDirection={"row"} alignItems={"center"}>
                                                                                            <Numbers sx={{ color: "#000000", fontSize: "18px", marginRight: "10px" }} />
                                                                                            <Stack mr={2} component={"span"}>Set Quantity</Stack>
                                                                                        </Stack>
                                                                                    </MenuItem>
                                                                                    <MenuItem onClick={handleMoreItemModalClose}>
                                                                                        <Stack sx={styles.moreMenuItem} flexDirection={"row"} alignItems={"center"}>
                                                                                            <Percent sx={{ color: "#000000", fontSize: "18px", marginRight: "10px" }} />
                                                                                            <Stack mr={2} component={"span"}>Set Percentage</Stack>
                                                                                        </Stack>
                                                                                    </MenuItem>
                                                                                </Menu>
                                                                            </Box>
                                                                        </Box>
                                                                    </Box>
                                                                </Box>
                                                            </Grid>
                                                            <Grid item xl={4} lg={4} md={6} sm={12} xs={12} >
                                                                <Box sx={styles.clothesItem}>
                                                                    <Box sx={{
                                                                        height: "150px",
                                                                        display: "flex",
                                                                        border: "2px solid #6549F6",
                                                                        borderRadius: "10px",
                                                                        padding: "50px 50px 0px 50px",
                                                                        background: "#4CFFBF"
                                                                    }}>
                                                                        <Box sx={{ background: "black" }}></Box>
                                                                    </Box>
                                                                    <Box mt={3} mb={1} sx={styles.clothesItemFooter}>
                                                                        <Box component={"span"}>Lorem Ipsum</Box>
                                                                        <Box sx={styles.clothesItemFooterIcons}>
                                                                            <Box>
                                                                                <Circle sx={styles.clothesItemCircleBIcon} />
                                                                                <Circle sx={styles.clothesItemCircleBIcon} />
                                                                                <Circle sx={styles.clothesItemCircleBIcon} />
                                                                                <Circle sx={styles.clothesItemCircleWIcon} />
                                                                                <Circle sx={styles.clothesItemCircleWIcon} />
                                                                            </Box>
                                                                            <Box>
                                                                                <IconButton
                                                                                    onClick={handleMoreItemClick}
                                                                                >
                                                                                    <MoreHoriz />
                                                                                </IconButton>
                                                                                <Menu
                                                                                    anchorEl={anchorEl}
                                                                                    open={moreItemModalOpen}
                                                                                    onClose={handleMoreItemModalClose}
                                                                                >
                                                                                    <MenuItem onClick={handleMoreItemModalClose}>
                                                                                        <Stack sx={styles.moreMenuItem} flexDirection={"row"} alignItems={"center"}>
                                                                                            <Circle sx={{ color: "#000000", fontSize: "18px", marginRight: "10px" }} />
                                                                                            <Stack mr={2} component={"span"}>Set Rarity</Stack>
                                                                                            <Check sx={{ color: "#6549F6" }} />
                                                                                        </Stack>
                                                                                    </MenuItem>
                                                                                    <MenuItem onClick={handleMoreItemModalClose}>
                                                                                        <Stack sx={styles.moreMenuItem} flexDirection={"row"} alignItems={"center"}>
                                                                                            <Numbers sx={{ color: "#000000", fontSize: "18px", marginRight: "10px" }} />
                                                                                            <Stack mr={2} component={"span"}>Set Quantity</Stack>
                                                                                        </Stack>
                                                                                    </MenuItem>
                                                                                    <MenuItem onClick={handleMoreItemModalClose}>
                                                                                        <Stack sx={styles.moreMenuItem} flexDirection={"row"} alignItems={"center"}>
                                                                                            <Percent sx={{ color: "#000000", fontSize: "18px", marginRight: "10px" }} />
                                                                                            <Stack mr={2} component={"span"}>Set Percentage</Stack>
                                                                                        </Stack>
                                                                                    </MenuItem>
                                                                                </Menu>
                                                                            </Box>
                                                                        </Box>
                                                                    </Box>
                                                                </Box>
                                                            </Grid>
                                                            <Grid item xl={4} lg={4} md={6} sm={12} xs={12} >
                                                                <Box sx={styles.clothesItem}>
                                                                    <Box sx={{
                                                                        height: "150px",
                                                                        display: "flex",
                                                                        border: "2px solid #6549F6",
                                                                        borderRadius: "10px",
                                                                        padding: "50px 50px 0px 50px",
                                                                        background: "#FF0000"

                                                                    }}>
                                                                        <Box sx={{ background: "black" }}></Box>
                                                                    </Box>
                                                                    <Box mt={3} mb={1} sx={styles.clothesItemFooter}>
                                                                        <Box component={"span"}>Lorem Ipsum</Box>
                                                                        <Box sx={styles.clothesItemFooterIcons}>
                                                                            <Box>
                                                                                <Circle sx={styles.clothesItemCircleBIcon} />
                                                                                <Circle sx={styles.clothesItemCircleBIcon} />
                                                                                <Circle sx={styles.clothesItemCircleBIcon} />
                                                                                <Circle sx={styles.clothesItemCircleWIcon} />
                                                                                <Circle sx={styles.clothesItemCircleWIcon} />
                                                                            </Box>
                                                                            <Box>
                                                                                <IconButton>
                                                                                    <MoreHoriz />
                                                                                </IconButton>
                                                                            </Box>
                                                                        </Box>
                                                                    </Box>
                                                                </Box>
                                                            </Grid>
                                                            <Grid item xl={4} lg={4} md={6} sm={12} xs={12} >
                                                                <Box sx={styles.clothesItem}>
                                                                    <Box sx={{
                                                                        height: "150px",
                                                                        display: "flex",
                                                                        border: "2px solid #6549F6",
                                                                        borderRadius: "10px",
                                                                        padding: "50px 50px 0px 50px",
                                                                        background: "#6549F6"

                                                                    }}>
                                                                        <Box sx={{ background: "black" }}></Box>
                                                                    </Box>
                                                                    <Box mt={3} mb={1} sx={styles.clothesItemFooter}>
                                                                        <Box component={"span"}>Lorem Ipsum</Box>
                                                                        <Box sx={styles.clothesItemFooterIcons}>
                                                                            <Box>
                                                                                <Circle sx={styles.clothesItemCircleBIcon} />
                                                                                <Circle sx={styles.clothesItemCircleBIcon} />
                                                                                <Circle sx={styles.clothesItemCircleBIcon} />
                                                                                <Circle sx={styles.clothesItemCircleWIcon} />
                                                                                <Circle sx={styles.clothesItemCircleWIcon} />
                                                                            </Box>
                                                                            <Box>
                                                                                <IconButton>
                                                                                    <MoreHoriz />
                                                                                </IconButton>
                                                                            </Box>
                                                                        </Box>
                                                                    </Box>
                                                                </Box>
                                                            </Grid>
                                                        </Grid>
                                                    </Box>
                                                </Box>
                                            </Box>
                                        </Box>
                                    </TabPanel>
                                    <TabPanel value="2">
                                        <Box my={5} sx={styles.onesTabPanel}>
                                            <Box component={"span"} sx={styles.onesHeader}>Manage</Box>
                                            <Box mt={10} display="flex" flexDirection="column" alignItems="center" sx={styles.onesContent}>
                                                <Button endIcon={<ExpandMore />} sx={styles.onesManageButton} variant="outlined" color="primary">
                                                    Body - Lorem
                                                </Button>
                                                <Button endIcon={<ExpandMore />} sx={styles.onesManageButton} variant="outlined" color="primary">
                                                    Clothes - Lorem
                                                </Button>
                                                <Button endIcon={<ExpandMore />} sx={styles.onesManageButton} variant="outlined" color="primary">
                                                    Eyes
                                                </Button>
                                                <Button endIcon={<ExpandMore />} sx={styles.onesManageButton} variant="outlined" color="primary">
                                                    Hair
                                                </Button>
                                                <Button endIcon={<ExpandMore />} sx={styles.onesManageButton} variant="outlined" color="primary">
                                                    Mouth
                                                </Button>
                                                <Button endIcon={<ExpandMore />} sx={styles.onesManageButton} variant="outlined" color="primary">
                                                    Texture
                                                </Button>
                                            </Box>
                                        </Box>
                                    </TabPanel>
                                </TabContext>
                            </Box>
                        ) : tab === 3 ? (
                            <Box className={classes.generateSection} mt={{ md: 0, xs: 5 }}>
                                <Box sx={styles.generateHeader}>
                                    <Box sx={styles.generateHeaderText} component={"h1"}>Generate Tokens</Box>
                                    <Box sx={styles.generateHeaderDescription} component={"span"}>Ready to generate your assets? Let's get started!</Box>
                                </Box>
                                <Box mt={10} sx={styles.generateContent}>
                                    <Grid container spacing={5}>
                                        <Grid item lg={6} md={6} sm={6} xs={12} display="flex">
                                            <Box className={classes.footerItem}>
                                                <Box>
                                                    <Box className={classes.footerItemIcon}><Box component={"img"} src={PricingFooterItemIcon1.src} /></Box>
                                                    <Box mt={5} className={classes.footerItemContent}>
                                                        <Box className={classes.footerItemContentHeader} component="span">Generate From Preview</Box >
                                                        <Box component="p" className={classes.footerItemContentText}>This will generate a tokenset based on the preview you have seen in the gallery. What you've seen is what you get. Voomio adds randomization to the token number.</Box>
                                                    </Box>
                                                </Box>
                                                <Box sx={styles.footerItemActions}>
                                                    <Button onClick={() => { handleGenerateModalOpen() }} className={classes.footerItemButton} variant="contained" color="primary">Generate Preview Set</Button>
                                                    <Button className={classes.footerItemViewButton} variant="contained" color="primary">View Preview</Button>
                                                </Box>
                                            </Box>
                                        </Grid>
                                        <Grid item lg={6} md={6} sm={6} xs={12} display="flex">
                                            <Box className={classes.footerItem}>
                                                <Box>
                                                    <Box className={classes.footerItemIcon}><Box component={"img"} src={PricingFooterItemIcon2.src} /></Box>
                                                    <Box mt={5} className={classes.footerItemContent}>
                                                        <Box className={classes.footerItemContentHeader} component="span">Generate  New</Box >
                                                        <Box component="p" className={classes.footerItemContentText}>This will create a set based on your rules and rarity settings, but isn't what you saw in the gallery. This will guarantee higher randomization and less bias.</Box>
                                                    </Box>
                                                </Box>
                                                <Box sx={styles.footerItemActions}>
                                                    <Button onClick={() => { handleGenerateModalOpen() }} className={classes.footerItemButton} variant="contained" color="primary">Generate Preview Set</Button>
                                                    <Button className={classes.footerItemViewButton} variant="contained" color="primary">View Preview</Button>
                                                </Box>
                                            </Box>
                                        </Grid>
                                    </Grid>
                                </Box>
                                <Dialog open={generateModalOpenValue} onClose={handleGenerateModalClose} sx={styles.generateModal} >
                                    <DialogContent>
                                        <Stack sx={styles.generateModalHeader} gap={2}>
                                            <Box component={"img"} src={SparklesOutlineIcon.src} />
                                            <Stack component={"span"}>Generate Tokens</Stack>
                                        </Stack>
                                        <Stack mt={5} sx={styles.generateModalContent} >
                                            <Stack width={{ md: "50%", sm: "100%" }} sx={styles.generateFormControl}>
                                                <Stack mb={1} component={"label"}>Select network</Stack>
                                                <ThemeProvider theme={theme}>
                                                    <Select value={selectNetworkValue}
                                                        onChange={onSelectNetworkValue}
                                                        displayEmpty
                                                        sx={styles.selectButton}
                                                    >
                                                        <MenuItem disabled sx={styles.selectMenuItem} value={0}>
                                                            <Stack component="span">All chains</Stack>
                                                            <ExpandMore />
                                                        </MenuItem>
                                                        <MenuItem sx={styles.selectMenuItem} value={1}>
                                                            {/* <Circle sx={styles.clothesItemCircleBIcon} /> */}
                                                            <Box component={"span"}>Ethereum</Box>
                                                        </MenuItem>
                                                        <MenuItem sx={styles.selectMenuItem} value={2}>
                                                            {/* <Circle sx={styles.clothesItemCircleBIcon} /> */}
                                                            <Box component={"span"}>Solana</Box>
                                                        </MenuItem>
                                                        <MenuItem sx={styles.selectMenuItem} value={3}>
                                                            {/* <Circle sx={styles.clothesItemCircleBIcon} /> */}
                                                            <Box component={"span"}>Polygon</Box>
                                                        </MenuItem>
                                                        <MenuItem sx={styles.selectMenuItem} value={4}>
                                                            {/* <Circle sx={styles.clothesItemCircleBIcon} /> */}
                                                            <Box component={"span"}>Cardano</Box>
                                                        </MenuItem>
                                                    </Select>
                                                </ThemeProvider>
                                                {/* <Button sx={styles.selectNetworkButton} endIcon={<ExpandMore />}>All chains</Button> */}
                                            </Stack>
                                            <Stack sx={styles.generateFormControl}>
                                                <Stack mb={1} component={"label"}>Generating Wallet</Stack>
                                                <TextField
                                                    sx={styles.generateFormTextField}
                                                    InputProps={{
                                                        endAdornment: <InputAdornment position="end">
                                                            <CheckCircle sx={{ color: "#1BBD01" }} />
                                                        </InputAdornment>
                                                    }}
                                                    placeholder="7XsmeBSm3xpNaXE5bTZddskgvPAwYbV7kTmDpt9JagA6"
                                                    variant="outlined"
                                                />
                                                <Stack sx={styles.generateFormUnder} mt={1} component={"span"}>ERC20</Stack>
                                                <Stack sx={styles.generateConfirmText} mt={5}>
                                                    <Stack component={"span"}>Are you sure you want to generate ________ Tokens?</Stack>
                                                </Stack>
                                            </Stack>
                                        </Stack>
                                        <Stack mt={{ md: 8, xs: 3 }} sx={styles.generateModalFooter}>
                                            <Button onClick={() => { handleGenerateModalClose() }} sx={styles.generateCancelButton}>Cancel</Button>
                                            <Button sx={styles.generateTokenButton} startIcon={<Box component={"img"} src={SparklesOutlineWIcon.src} />}>Generate Token</Button>
                                        </Stack>
                                    </DialogContent>
                                </Dialog>
                            </Box>
                        ) : tab === 5 ? (
                            <Stack padding={"20px"} sx={styles.layersSection}>
                                <Stack mt={2} sx={styles.layersHeader}>
                                    <Stack component={"span"}>Layers</Stack>
                                </Stack>
                                <Stack mt={8} sx={styles.layersContent}>
                                    <Grid container>
                                        <Grid item xl={6} lg={6} md={6} sm={12} xs={12}>
                                            <Box display="flex" flexDirection="column" alignItems="center">
                                                <Box component="h1" className={classes.previewHeaderText}>Preview</Box>
                                                <Box mt={5} component="img" className={classes.previewImage} src={PreviewUploadImage.src} />
                                                <Box my={3}>
                                                    <Button onClick={() => { handleShuffle() }} endIcon={<Box component={"img"} src={ShuffleIcon.src} width="1em" height="1em" />} sx={styles.shuffleOrderButton} variant="outlined" color="primary">Shuffle Order</Button>
                                                </Box>
                                            </Box>
                                        </Grid>
                                        <Grid item xl={6} lg={6} md={6} sm={12} xs={12}>
                                            <Box display="flex" flexDirection="column" alignItems={{ xl: "start", lg: "start", sm: "center", xs: "center" }}>
                                                <Box component="h1" className={classes.attributesHeaderText}>Attributes Order</Box>
                                                <Box my={5} display="flex" flexDirection="column">
                                                    <Button endIcon={<Box component={"img"} src={DragHandleBlueIcon.src} />} classes={{ root: classes.attributesOrderButton }} variant="outlined" color="primary">Body - Lorem</Button>
                                                    <Button endIcon={<Box component={"img"} src={DragHandleBlueIcon.src} />} className={classes.attributesOrderButton} variant="outlined" color="primary">Clothes - Lorem</Button>
                                                    <Button endIcon={<Box component={"img"} src={DragHandleBlueIcon.src} />} className={classes.attributesOrderButton} variant="outlined" color="primary">Color Background</Button>
                                                    <Button endIcon={<Box component={"img"} src={DragHandleBlueIcon.src} />} className={classes.attributesOrderButton} variant="outlined" color="primary">Eyes</Button>
                                                    <Button endIcon={<Box component={"img"} src={DragHandleBlueIcon.src} />} className={classes.attributesOrderButton} variant="outlined" color="primary">Hair</Button>
                                                    <Button endIcon={<Box component={"img"} src={DragHandleBlueIcon.src} />} className={classes.attributesOrderButton} variant="outlined" color="primary">Mouth</Button>
                                                    <Button endIcon={<Box component={"img"} src={DragHandleBlueIcon.src} />} className={classes.attributesOrderButton} variant="outlined" color="primary">Texture</Button>
                                                </Box>
                                            </Box>
                                        </Grid>
                                    </Grid>
                                </Stack>
                            </Stack>
                        ) : tab === 6 ? (
                            <Stack padding={"20px"} sx={styles.rulesSection}>
                                <Stack mt={2} sx={styles.rulesHeader}>
                                    <Stack component={"span"}>Rules</Stack>
                                </Stack>
                                <Stack mt={8} sx={styles.rulesContent}>
                                    <Stack sx={styles.createRuleSection}>
                                        <Stack sx={styles.rulesContentHeader}>
                                            <Stack component={"span"}>Create a Rule</Stack>
                                        </Stack>
                                        <Stack mt={3} alignItems={{ md: "center", xs: "stretch" }} spacing={{ md: 0, xs: 2 }} flexDirection={{ md: "row", xs: "column" }} justifyContent={"space-between"}>
                                            <Button sx={styles.createRuleSelectButton} endIcon={<ExpandMore />}>Select a component</Button>
                                            <Button sx={styles.createRuleSelectButton} endIcon={<ExpandMore />}>Select a rule</Button>
                                            <Button sx={styles.createRuleSelectButton} endIcon={<ExpandMore />}>Select a component</Button>
                                            <Button startIcon={<Add />} sx={styles.generalFormAddButton}>Add</Button>
                                        </Stack>
                                    </Stack>
                                    <Stack mt={10} sx={styles.ruleContentSection}>
                                        <Stack sx={styles.rulesContentHeader}>
                                            <Stack component={"span"}>Rules</Stack>
                                        </Stack>
                                        <Stack mt={3} alignItems={{ md: "center", xs: "stretch" }} spacing={{ md: 0, xs: 2 }} flexDirection={{ md: "row", xs: "column" }} justifyContent={"space-between"}>
                                            <Button sx={styles.createRuleSelectButton} endIcon={<ExpandMore />}>Select a component</Button>
                                            <Button sx={styles.createRuleSelectButton} endIcon={<ExpandMore />}>Select a rule</Button>
                                            <Button sx={styles.createRuleSelectButton} endIcon={<ExpandMore />}>Select a component</Button>
                                            <IconButton sx={styles.ruleDeleteButton} color="primary" size="large"><Box component={"img"} src={DeleteIcon.src}></Box></IconButton>
                                        </Stack>
                                        <Stack mt={3} alignItems={{ md: "center", xs: "stretch" }} spacing={{ md: 0, xs: 2 }} flexDirection={{ md: "row", xs: "column" }} justifyContent={"space-between"}>
                                            <Button sx={styles.createRuleSelectButton} endIcon={<ExpandMore />}>Select a component</Button>
                                            <Button sx={styles.createRuleSelectButton} endIcon={<ExpandMore />}>Select a rule</Button>
                                            <Button sx={styles.createRuleSelectButton} endIcon={<ExpandMore />}>Select a component</Button>
                                            <IconButton sx={styles.ruleDeleteButton} color="primary" size="large"><Box component={"img"} src={DeleteIcon.src}></Box></IconButton>
                                        </Stack>
                                        <Stack mt={3} alignItems={{ md: "center", xs: "stretch" }} spacing={{ md: 0, xs: 2 }} flexDirection={{ md: "row", xs: "column" }} justifyContent={"space-between"}>
                                            <Button sx={styles.createRuleSelectButton} endIcon={<ExpandMore />}>Select a component</Button>
                                            <Button sx={styles.createRuleSelectButton} endIcon={<ExpandMore />}>Select a rule</Button>
                                            <Button sx={styles.createRuleSelectButton} endIcon={<ExpandMore />}>Select a component</Button>
                                            <IconButton sx={styles.ruleDeleteButton} color="primary" size="large"><Box component={"img"} src={DeleteIcon.src}></Box></IconButton>
                                        </Stack>
                                    </Stack>
                                </Stack>
                            </Stack>
                        ) : (
                            <Box>Error!</Box>
                        )}
                    </Grid>
                </Grid >
            </Box >
        </Container >
    )
}

export default NftGenerator