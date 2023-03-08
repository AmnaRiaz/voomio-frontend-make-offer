import backgroundImage from "../../../image/component/nftGenerator/path.png"

const componentStyles = () => ({
    container: {
        marginTop: "150px"
    },
    pageHeaderTitle: {
        marginTop: "0px",
        fontFamily: 'Termina, Arial, sans-serif',
        fontStyle: "normal",
        fontWeight: "700",
        fontSize: "44px",
        lineHeight: "100%",
        color: "#222222"
    },
    pageHeaderSubTitle: {
        fontFamily: 'Neue Haas Grotesk Text Pro, Arial, sans-serif',
        fontStyle: "normal",
        fontWeight: "500",
        fontSize: "18px",
        lineHeight: "22px",
        color: "#250C50"
    },
    pageHeaderText: {
        display: "flex",
        alignItems: "center",
        fontFamily: 'Neue Haas Grotesk Text Pro, Arial, sans-serif',
        fontStyle: "normal",
        fontWeight: "400",
        fontSize: "16px",
        lineHeight: "20px",
        color: "#6549F6",
        marginBottom: "14px",
        "&:hover": {
            cursor: "pointer",
            textDecoration: "underline"
        }
    },
    uploadStepButton: {
        width: "50%",
        paddingTop: "10px !important",
        paddingBottom: "25px !important",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        marginTop: "20px !important",
        fontFamily: 'Neue Haas Grotesk Text Pro, Arial, sans-serif',
        fontStyle: "normal",
        fontWeight: "500",
        fontSize: "16px",
        lineHeight: "20px",
        cursor: "pointer",
        // textAlign: "center",
        backgroundImage: `url(${backgroundImage})`,
        backgroundRepeat: "no-repeat",
        backgroundPosition: "bottom",
        color: "#7B61FF !important",
        "& span": {
            paddingTop: "6px"
        },
        "& svg": {
            width: "32px",
            height: "32px"
        }
    },
    disabledUploadStepButton: {
        width: "50%",
        paddingTop: "10px !important",
        paddingBottom: "25px !important",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        marginTop: "20px !important",
        fontFamily: 'Neue Haas Grotesk Text Pro, Arial, sans-serif',
        fontStyle: "normal",
        fontWeight: "500",
        fontSize: "16px",
        lineHeight: "20px",
        // textAlign: "center",
        // backgroundImage: `url(${backgroundImage})`,
        backgroundRepeat: "no-repeat",
        backgroundPosition: "bottom",
        color: "#7B61FF",
        "&:hover": {
            backgroundImage: `url(${backgroundImage})`
        },
        "& span": {
            paddingTop: "6px"
        },
        "& svg": {
            width: "32px",
            height: "32px"
        },
        cursor: "pointer",
        opacity: "0.4"
    },
    uploadSection: {
        border: "1px solid #d1daf1",
        borderRadius: "15px",
        padding: "20px"
    },
    dropzone: {
        width: "400px",
        height: "400px",
        padding: "10px",
        border: "1px dashed #7b61ff",
        borderRadius: "40px",
        display: "flex",
        flexDirection: "column"
    },
    nftName: {
        margin: "0",
        wordBreak: "break-all",
        fontSize: "28px"
    },
    nftDescription: {

    },
    chooseFileButton: {
        border: "none",
        // padding: "14px 44px",
        // background: "#7B61FF",
        background: "#7B61FF !important",
        // transform: "matrix(1, 0, 0, -1, 0, 0)",
        borderRadius: "154.863px !important",
        fontFamily: 'Neue Haas Grotesk Text Pro, Arial, sans-serif',
        fontStyle: "normal",
        fontWeight: "500",
        fontSize: "20px",
        lineHeight: "32px",
        textAlign: "center",
        color: "#FFFFFF"
    },
    dropzoneText: {
        fontFamily: 'Neue Haas Grotesk Text Pro, Arial, sans-serif',
        fontStyle: "normal",
        fontWeight: "500",
        fontSize: "18px",
        textAlign: "center",
        lineHeight: "22px",
        color: "#250C50"
    },
    uploadingDropzone: {
        position: "relative",
        width: "100%",
        height: "300px",
        overflow: "hidden",
        display: "flex",
        flexDirection: "column",
        justifyContent: "end",
        alignItems: "center",
        maxHeight: "770px",
        border: "2px solid #7b61ff",
        borderRadius: "40px",
        opacity: "0.5"
    },
    successDropzone: {
        borderTop: "1px solid #d1daf1",
    },
    successDropzoneText: {
        fontFamily: 'Termina, Arial, sans-serif',
        fontStyle: "normal",
        fontWeight: "600",
        fontSize: "38px",
        // textAlign: "center",
        marginTop: "35px",
        lineHeight: "100%",
        color: "#222222"
    },
    successDropzoneDescription: {
        marginTop: "15px",
        fontFamily: 'Neue Haas Grotesk Text Pro, Arial, sans-serif',
        fontStyle: "normal",
        fontWeight: "400",
        fontSize: "22px",
        textAlign: "center",
        lineHeight: "27px",
        color: "#999999"
    },
    previewHeaderText: {
        fontFamily: 'Termina, Arial, sans-serif',
        fontStyle: "normal",
        fontWeight: "700",
        fontSize: "26px",
        lineHeight: "120%",
        color: "#000000"
    },
    attributesHeaderText: {
        fontFamily: 'Termina, Arial, sans-serif',
        fontStyle: "normal",
        fontWeight: "700",
        fontSize: "26px",
        lineHeight: "120%",
        color: "#000000"
    },
    attributesOrderButton: {
        width: { sm: "300px", xs: "100%" },
        textTransform: "capitalize !important",
        display: "flex !important",
        justifyContent: "space-between !important",
        marginBottom: "20px !important",
        padding: "14px 20px !important",
        border: "2px solid #6549F6 !important",
        borderRadius: "10px !important",
        fontFamily: 'Neue Haas Grotesk Text Pro, Arial, sans-serif',
        fontStyle: "normal",
        fontWeight: "500",
        fontSize: "18px",
        textAlign: "center",
        lineHeight: "22px",
        color: "#6549F6 !important"
    },
    previewSection: {
        width: "100%"
        // height: "100vh",
        // maxWidth: "1092px",
        // minHeight: "1217px"
        // maxHeight: "1217px",
        // border: "5px dashed #F4EEFF",
        // border: "5px solid #7b61ff",
        // borderRadius: "40px"
    },
    footerItem: {
        border: "2px solid #7B61FF",
        borderRadius: "10px",
        display: "flex",
        flexDirection: "column",
        alignItems: "flex-start",
        justifyContent: "space-between",
        // padding: "30px 36px 48px"
        padding: "30px 36px"
    },
    disabledFooterItem: {
        border: "2px solid #7B61FF",
        borderRadius: "10px",
        display: "flex",
        flexDirection: "column",
        alignItems: "flex-start",
        padding: "30px 36px",
        pointerEvents: "none",
        opacity: "0.4"
    },
    footerItemContentHeader: {
        fontFamily: 'Termina, Arial, sans-serif',
        fontStyle: "normal",
        fontWeight: "600",
        fontSize: "18px",
        lineHeight: "100%",
        letterSpacing: "0.12em",
        color: "#222222 !important"
    },
    footerItemContentText: {
        fontFamily: 'Neue Haas Grotesk Text Pro, Arial, sans-serif',
        fontStyle: "normal",
        fontWeight: "400",
        fontSize: "16px",
        lineHeight: "24px",
        color: "#333333"
    },
    footerItemButton: {
        border: "none",
        fontFamily: 'Neue Haas Grotesk Text Pro, Arial, sans-serif !important',
        fontStyle: "normal",
        fontWeight: "500",
        fontSize: "15px",
        lineHeight: "120%",
        color: "#FFFFFF",
        padding: "10px 20px !important",
        textTransform: "capitalize !important",
        background: "linear-gradient(98.79deg, #9B53E0 20.34%, #8551E6 77.89%)",
        borderRadius: "154.863px !important"
    },
    footerItemViewButton: {
        border: "none",
        color: "#8551E6 !important",
        padding: "10px 20px !important",
        textTransform: "capitalize !important",
        background: "linear-gradient(0deg, rgba(255, 255, 255, 0.9), rgba(255, 255, 255, 0.9)), linear-gradient(98.79deg, #9B53E0 20.34%, #8551E6 77.89%)",
        borderRadius: "154.863px !important"
    },
    uploadWave: {
        height: "70%",
        opacity: "50%",
        position: "absolute"
    },
    uploadWave1: {
        height: "60%",
        opacity: "50%",
        position: "absolute"
    }
})

export const styles = {
    uploadBannerImage: {
        width: "100%",
        height: "150px",
        objectFit: "cover"
    },
    uploadCoverBox: {
        display: "flex",
        justifyContent: "center"
    },
    uploadCoverImage: {
        width: "195px",
        height: "195px",
        borderRadius: "50%",
        marginTop: "-100px",
        border: "solid 1px #d1daf1"
    },
    uploadBannerBox: {
        width: "400px",
        height: "150px",
        border: "2px solid #6549F6",
        borderStyle: "dashed",
        borderRadius: "10px",
        display: "flex",
        justifyContent: "center",
        alignItems: "center"
    },
    mintLoadingDialog: {
        "& .MuiPaper-root": {
            padding: "15px 30px"
        }
    },
    mintLoadingTitle: {
        fontSize: "20px",
        color: "#000000",
        padding: "15px 30px"
    },
    mintLoadingBox: {
        display: "flex",
        justifyContent: "center",
        padding: "15px 30px"
    },
    previewTabBar: {
        borderBottom: 1,
        borderColor: 'divider'
    },
    previewTabList: {
        "& .MuiTabs-indicator": {
            height: "8px",
            backgroundColor: "#6549F6"
        }
    },
    previewTabButton: {
        padding: "27px 16px",
        fontFamily: 'Neue Haas Grotesk Text Pro, Arial, sans-serif',
        fontStyle: "normal",
        fontWeight: "500",
        fontSize: "22px",
        lineHeight: "27px",
        color: "#250C50",
        textTransform: "capitalize",
        "&.Mui-selected": {
            color: "#6549F6"
        }
    },
    tokenGallerySideBar: {
        display: "flex",
        flexDirection: "column",
        width: "100%",
        alignItems: "stretch"
    },
    regenerateTokenButton: {
        width: "100%",
        padding: "12px 30px",
        background: "linear-gradient(93.69deg, #7B61FF 0%, #00DAD9 107.12%)",
        borderRadius: "154.863px",
        fontFamily: 'Neue Haas Grotesk Text Pro, Arial, sans-serif',
        fontStyle: "normal",
        fontWeight: "500",
        textTransform: "capitalize",
        fontSize: "15px",
        textAlign: "center",
        lineHeight: "120%",
        color: "#FFFFFF"
    },
    tokenGalleryFilter: {

    },
    tokenGalleryFilterButton: {
        width: "100%",
        display: "flex",
        padding: "14px 20px",
        marginBottom: "20px",
        justifyContent: "space-between",
        border: "2px solid #6549F6",
        borderRadius: "10px",
        textTransform: "capitalize",
        fontFamily: 'Neue Haas Grotesk Text Pro, Arial, sans-serif',
        fontStyle: "normal",
        fontWeight: "500",
        fontSize: "18px",
        textAlign: "center",
        lineHeight: "22px",
        color: "#6549F6"
    },
    tokenGalleryCotent: {
        paddingLeft: { lg: "20px", xs: "0px" }
    },
    tokenGalleryCard: {
        border: "1px solid #C4C4C4",
        borderRadius: "8px",
        display: "flex",
        flexDirection: "column",
        width: "100%",
        height: "100%",
        justifyContent: "space-between",
        cursor: "pointer"
    },
    tokenGalleryCardContent: {
        display: "flex",
        width: "100%",
        height: "100%",
        // height: "100%",
        // background: "#EDEFF4",
        // border: "1px solid #C4C4C4",
        // borderBottom: "0px",
        borderRadius: "8px 8px 0px 0px"
    },
    tokenGalleryCardFooter: {
        padding: "5px 10px",
        // background: "#FFFFFF",
        // border: "1px solid #C4C4C4",
        borderRadius: "0px 0px 8px 8px",
        borderTop: "none",
        fontFamily: 'Inter, Arial, sans-serif',
        fontStyle: "normal",
        fontWeight: "400",
        fontSize: "16px",
        lineHeight: "19px",
        color: "#000000"
    },
    previewTokenModal: {
        padding: "20px 40px"
    },
    tokenDialog: {
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        // background: "transparent",
        "& .MuiDialog-paper": {
            // padding: "20px 40px",
            maxWidth: "max-content"
            // width: "700px",
            // minWidth: "800px"
        },
        "& .MuiDialog-container": {
            minWidth: "inherit"
        },
        "& .MuiBackdrop-root": {
            background: "transparent"
        }
    },
    tokenDialogCloseButton: {
        color: "#6549F6",
        position: 'absolute',
        right: "10px",
        top: "10px",
        "& .MuiSvgIcon-root": {
            fontSize: "30px"
        }
    },
    tokenDialogHeader: {
        display: "flex",
        alignItems: "center",
        textAlign: "center",
        fontFamily: 'Termina, Arial, sans-serif',
        fontStyle: "normal",
        fontWeight: "700",
        fontSize: "21px",
        lineHeight: "25px",
        color: "#000000",
        "& .MuiIconButton-root": {
            marginLeft: "10px",
            background: "#F4EEFF"
        }
    },
    tokenDialogContent: {
        display: "flex",
        width: "100%",
        marginTop: "30px"
    },
    tokenDialogAttributes: {
        display: "flex",
        flexDirection: "column"
    },
    tokenDialogAttributesText: {
        fontFamily: 'Termina, Arial, sans-serif',
        fontStyle: "normal",
        fontWeight: "600",
        fontSize: "18px",
        lineHeight: "100%",
        color: "#222222",
        marginBottom: "20px",
        textTransform: "capitalize"
    },
    tokenDialogAttributesList: {
        fontFamily: 'Neue Haas Grotesk Text Pro, Arial, sans-serif',
        fontStyle: "normal",
        fontWeight: "500",
        fontSize: "16px",
        lineHeight: "20px",
        color: "#000000",
        textTransform: "capitalize",
        alignItems: "center",
        marginBottom: "14px",
        display: "flex",
        justifyContent: "space-between"
    },
    tokenDialogFooter: {
        margin: "15px 0px",
        display: "flex",
        justifyContent: "end"
    },
    createRuleButton: {
        padding: { md: "12px 50px", xs: "12px 30px" },
        textTransform: "capitalize",
        background: "linear-gradient(98.79deg, #9B53E0 20.34%, #8551E6 77.89%)",
        borderRadius: "154.863px",
        fontFamily: 'Neue Haas Grotesk Text Pro, Arial, sans-serif',
        fontStyle: "normal",
        fontWeight: "500",
        fontSize: "15px",
        lineHeight: "120%",
        display: "flex",
        alignItems: "center",
        color: "#FFFFFF"
    },
    cancelRuleButton: {
        padding: "12px 50px",
        background: "#FFFFFF",
        border: "2px solid #6549F6",
        borderRadius: "154.863px",
        fontFamily: 'Neue Haas Grotesk Text Pro, Arial, sans-serif',
        fontStyle: "normal",
        fontWeight: "500",
        fontSize: "15px",
        lineHeight: "120%",
        display: "flex",
        alignItems: "center",
        color: "#6549F6"
    },
    createRuleContent: {
        padding: "40px",
        background: "#F4EEFF",
        borderRadius: "0px 0px 13.7899px 13.7899px"
    },
    createRuleHeader: {
        fontFamily: 'Termina, Arial, sans-serif',
        fontStyle: "normal",
        fontWeight: "600",
        fontSize: "18px",
        lineHeight: "100%",
        display: "flex",
        letterSpacing: "0.12em",
        textTransform: "capitalize",
        color: "#6549F6"
    },
    createRuleDescription: {
        fontFamily: 'Neue Haas Grotesk Text Pro, Arial, sans-serif',
        fontStyle: "normal",
        fontWeight: "400",
        fontSize: "16px",
        lineHeight: "20px",
        display: "flex",
        alignItems: "center",
        color: "#000000"
    },
    createRuleSelect: {
        display: "flex",
        gap: 3,
        flexDirection: { md: "row", xs: "column" },
        alignItems: { md: "center", xs: "stretch" },
        justifyContent: "space-between"
    },
    createRuleSelectButton: {
        display: "flex",
        padding: "14px 20px",
        // width: "100%",
        // marginBottom: "20px",
        // margin: "10px 30px",
        // width: "100%",
        textTransform: "capitalize",
        justifyContent: "space-between",
        border: "2px solid #6549F6",
        borderRadius: "10px",
        fontFamily: 'Neue Haas Grotesk Text Pro, Arial, sans-serif',
        fontStyle: "normal",
        fontWeight: "500",
        fontSize: "15px",
        textAlign: "center",
        lineHeight: "22px",
        color: "#6549F6"
    },
    createRuleFooter: {
        marginTop: "50px",
        display: "flex",
        justifyContent: "end"
    },
    manageTabBar: {
        borderBottom: 1,
        borderColor: 'divider'
    },
    manageTabList: {
        "& .MuiTabs-indicator": {
            height: "8px",
            backgroundColor: "#6549F6"
        }
    },
    manageTabButton: {
        padding: "27px 16px",
        fontFamily: 'Neue Haas Grotesk Text Pro, Arial, sans-serif',
        fontStyle: "normal",
        fontWeight: "500",
        fontSize: "22px",
        lineHeight: "27px",
        color: "#250C50",
        textTransform: "capitalize",
        "&.Mui-selected": {
            color: "#6549F6"
        }
    },
    componentsTabPanel: {
        padding: "42px 0px"
    },
    componentsTabContent: {
        display: "flex",
        flexDirection: "column"
    },
    componentsFilter: {
        display: "flex",
        justifyContent: "end"
    },
    componentsContent: {
        display: "flex",
        flexDirection: "column"
    },
    section: {
        display: "flex",
        flexDirection: "column"
    },
    sectionHeader: {
        display: "flex",
        alignItems: "center",
        "& span": {
            fontFamily: 'Termina, sans-serif',
            fontStyle: "normal",
            fontWeight: "600",
            fontSize: "18px",
            lineHeight: "100%",
            color: "#222222",
            textTransform: "capitalize",
            letterSpacing: "0.12em"
        },
        "& .MuiIconButton-root": {
            marginLeft: "10px",
            background: "#F4EEFF"
        }
    },
    sectionContent: {
        display: "flex"
    },
    clothesItem: {
        width: "300px",
        flexDirection: "column",
        display: "flex"
        // border: "2px solid #6549F6",
        // borderRadius: "10px",
        // padding: "30px 30px 0px 30px"
    },
    clothesItemContent: {
        height: "150px",
        display: "flex",
        border: "2px solid #6549F6",
        borderRadius: "10px",
        padding: "50px 50px 0px 50px"
    },
    clothesItemImage: {
        width: "100%"
    },
    clothesItemFooter: {
        "& span": {
            fontFamily: 'Termina, sans-serif',
            fontStyle: "normal",
            fontWeight: "400",
            fontSize: "22px",
            lineHeight: "27px",
            color: "#000000",
            textTransform: "capitalize"
        }
    },
    clothesItemFooterIcons: {
        display: "flex", justifyContent: "space-between", alignItems: "center"
    },
    clothesItemCircleBIcon: {
        fontSize: "16px", marginRight: "10px"
    },
    clothesItemCircleWIcon: {
        fontSize: "16px", marginRight: "10px", color: "#D9D9D9"
    },
    onesHeader: {
        fontFamily: 'Termina, sans-serif',
        fontStyle: "normal",
        fontWeight: "600",
        fontSize: "28px",
        lineHeight: "100%",
        color: "#7B61FF",
        textTransform: "capitalize"
    },
    onesManageButton: {
        width: { sm: "300px", xs: "100%" },
        textTransform: "capitalize",
        display: "flex !important",
        justifyContent: "space-between !important",
        marginBottom: "20px !important",
        padding: "14px 20px !important",
        border: "2px solid #6549F6 !important",
        borderRadius: "10px !important",
        fontFamily: 'Neue Haas Grotesk Text Pro, Arial, sans-serif',
        fontStyle: "normal",
        fontWeight: "500",
        fontSize: "18px",
        textAlign: "center",
        lineHeight: "22px",
        color: "#6549F6 !important"
    },
    generateHeaderText: {
        fontFamily: 'Termina, sans-serif',
        fontStyle: "normal",
        fontWeight: "600",
        fontSize: "28px",
        lineHeight: "100%",
        color: "#7B61FF",
        textTransform: "capitalize"
    },
    generateHeaderDescription: {
        fontFamily: 'Neue Haas Grotesk Text Pro, sans-serif',
        fontStyle: "normal",
        fontWeight: "400",
        fontSize: "22px",
        lineHeight: "27px",
        color: "#000000",
        textTransform: "capitalize"
    },
    generalSection: {
        padding: "40px 100px"
    },
    generalContent: {
        border: "solid 1px #d1daf1",
        borderRadius: "15px",
        padding: '20px'
    },
    generalHeader: {
        fontFamily: 'Termina, sans-serif',
        fontStyle: "normal",
        fontWeight: "600",
        fontSize: "28px",
        lineHeight: "100%",
        color: "#7B61FF"
    },
    generalUpload: {
        border: "solid 1px #d1daf1",
        borderRadius: "15px",
        backgroundColor: "#eaecf0",
        padding: "30px"
    },
    generalUploadImg: {
        width: "100%",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center"
    },
    generalUploadContent: {
        display: "flex",
        flexDirection: "column",
        "& span": {
            fontFamily: 'Neue Haas Grotesk Text Pro, sans-serif',
            fontStyle: "normal",
            fontWeight: "400",
            fontSize: "16px",
            lineHeight: "24px",
            color: "#333333",
            textTransform: "capitalize"
        }
    },
    generalUploadCollection: {
        display: "flex",
        justifyContent: "center",
        fontSize: "36px",
        lineHeight: "162.5%",
        color: "#000"
    },
    generalUploadDetail: {
        display: "flex",
        justifyContent: "center",
        fontSize: "20px",
        color: "grey"
    },
    generalUploadButton: {
        padding: "10px 50px",
        fontFamily: 'Neue Haas Grotesk Text Pro, sans-serif',
        fontStyle: "normal",
        fontWeight: "500",
        fontSize: "15px",
        lineHeight: "120%",
        // color: "#000000",
        textTransform: "capitalize",
        display: "flex",
        alignItems: "center",
        color: "#8551E6",
        background: "linear-gradient(0deg, rgba(255, 255, 255, 0.9), rgba(255, 255, 255, 0.9)), linear-gradient(98.79deg, #9B53E0 20.34%, #8551E6 77.89%)",
        borderRadius: "154.863px"
    },
    generalRight: {
        display: "flex",
        justifyContent: "center",
        flexDirection: "column",
        padding: "32px"
    },
    generalForm: {
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        "& span": {
            fontFamily: 'Neue Haas Grotesk Text Pro, sans-serif',
            fontStyle: "normal",
            fontWeight: "400",
            fontSize: "16px",
            lineHeight: "24px",
            color: "#333333",
            textTransform: "capitalize",
            marginRight: "10px"
        }
    },
    generalFormControl: {
        display: "flex",
        flexDirection: "column",
        "& label": {
            fontFamily: 'Neue Haas Grotesk Text Pro, sans-serif',
            fontStyle: "normal",
            fontWeight: "400",
            fontSize: "16px",
            lineHeight: "24px",
            color: "#333333"
            // display: "flex",
            // alignItems: "center"
        }
    },
    generalFormTextField: {
        border: "2px solid #d1daf1",
        borderRadius: "10px",
        "& .MuiOutlinedInput-notchedOutline": {
            border: "none"
        }
    },
    generalInput: {
        borderTop: "1px solid #d1daf1",
        marginLeft: "0px !important",
        width: "100% !important"
    },
    generalFormAddButton: {
        padding: "10px 30px",
        fontFamily: 'Neue Haas Grotesk Text Pro, sans-serif',
        fontStyle: "normal",
        fontWeight: "500",
        fontSize: "15px",
        lineHeight: "120%",
        // color: "#000000",
        textTransform: "capitalize",
        display: "flex",
        alignItems: "center",
        color: "#8551E6",
        background: "linear-gradient(0deg, rgba(255, 255, 255, 0.9), rgba(255, 255, 255, 0.9)), linear-gradient(98.79deg, #9B53E0 20.34%, #8551E6 77.89%)",
        borderRadius: "154.863px"
    },
    layersHeader: {
        fontFamily: 'Termina, sans-serif',
        fontStyle: "normal",
        fontWeight: "600",
        fontSize: "28px",
        lineHeight: "100%",
        color: "#7B61FF"
    },
    rulesHeader: {
        fontFamily: 'Termina, sans-serif',
        fontStyle: "normal",
        fontWeight: "600",
        fontSize: "28px",
        lineHeight: "100%",
        color: "#7B61FF"
    },
    rulesContentHeader: {
        fontFamily: 'Termina, sans-serif',
        fontStyle: "normal",
        fontWeight: "700",
        fontSize: "26px",
        lineHeight: "120%",
        color: "#000000"
    },
    ruleDeleteButton: {
        "& .MuiSvgIcon-root": {
            color: "#826CF7"
        }
    },
    generateModalHeader: {
        flexDirection: "row",
        alignItems: "center",
        "& span": {
            fontFamily: 'Termina, sans-serif',
            fontStyle: "normal",
            fontWeight: "600",
            fontSize: "28px",
            lineHeight: "100%",
            color: "#000000"
        }
    },
    selectNetworkButton: {
        display: "flex",
        padding: "14px 20px",
        // width: "100%",
        // marginBottom: "20px",
        // margin: "10px 30px",
        // width: "100%",
        textTransform: "capitalize",
        justifyContent: "space-between",
        border: "2px solid #6549F6",
        borderRadius: "10px",
        fontFamily: 'Neue Haas Grotesk Text Pro, Arial, sans-serif',
        fontStyle: "normal",
        fontWeight: "500",
        fontSize: "15px",
        textAlign: "center",
        lineHeight: "22px",
        color: "#6549F6"
    },
    generateCancelButton: {
        padding: "10px 50px",
        fontFamily: 'Neue Haas Grotesk Text Pro, sans-serif',
        fontStyle: "normal",
        fontWeight: "500",
        fontSize: "15px",
        lineHeight: "120%",
        textTransform: "capitalize",
        display: "flex",
        alignItems: "center",
        color: "#8551E6",
        background: "linear-gradient(0deg, rgba(255, 255, 255, 0.9), rgba(255, 255, 255, 0.9)), linear-gradient(98.79deg, #9B53E0 20.34%, #8551E6 77.89%)",
        borderRadius: "154.863px"
    },
    generateTokenButton: {
        padding: { md: "12px 50px", xs: "12px" },
        background: "linear-gradient(93.69deg, #7B61FF 0%, #00DAD9 107.12%)",
        borderRadius: "154.863px",
        fontFamily: 'Neue Haas Grotesk Text Pro, Arial, sans-serif',
        fontStyle: "normal",
        fontWeight: "500",
        textTransform: "capitalize",
        fontSize: "15px",
        textAlign: "center",
        lineHeight: "120%",
        color: "#FFFFFF"
    },
    generateFormControl: {
        "& label": {
            fontFamily: 'Neue Haas Grotesk Text Pro, sans-serif',
            fontStyle: "normal",
            fontWeight: "400",
            fontSize: "16px",
            lineHeight: "24px",
            color: "#333333"
            // display: "flex",
            // alignItems: "center"
        }
    },
    generateFormTextField: {
        border: "2px solid #6549F6",
        borderRadius: "10px",
        "& .MuiOutlinedInput-notchedOutline": {
            border: "none"
        }
    },
    generateModalFooter: {
        flexDirection: { md: "row", sm: "column" },
        gap: { md: 5, xs: 3 },
        justifyContent: "end"
    },
    generateFormUnder: {
        flexDirection: "row",
        justifyContent: "end",
        fontFamily: 'Neue Haas Grotesk Text Pro, sans-serif',
        fontStyle: "normal",
        fontWeight: "400",
        fontSize: "14px",
        lineHeight: "24px",
        color: "#333333"
    },
    generateConfirmText: {
        display: { md: "flex", xs: "none" },
        "& span": {
            fontFamily: 'Neue Haas Grotesk Text Pro, sans-serif',
            fontStyle: "normal",
            fontWeight: "400",
            fontSize: "22px",
            lineHeight: "27px",
            color: "#000000"
        }
    },
    generateModal: {
        // display: "flex",
        // justifyContent: "center",
        // alignItems: "center",
        // background: "transparent",
        "& .MuiDialog-paper": {
            padding: { md: "20px 40px", xs: "0px" }
        },
        // "& .MuiBackdrop-root": {
        //     background: "#89898996 !important"
        // }
    },
    generateModal1: {
        // display: "flex",
        // justifyContent: "center",
        // alignItems: "center",
        // background: "transparent",
        "& .MuiDialog-paper": {
            padding: { md: "20px 40px", xs: "0px" }
        },
        "& .MuiBackdrop-root": {
            background: "transparent"
        }
    },
    generateModalContent: {
        height: { md: "400px", xs: "300px" },
        justifyContent: "space-between"
    },
    footerItemActions: {
        display: "flex",
        gap: 2,
        flexDirection: { md: "row", xs: "column" },
        justifyContent: "space-between",
        width: "100%"
    },
    selectButton: {
        fontFamily: 'Neue Haas Grotesk Text Pro, sans-serif',
        fontStyle: "normal",
        fontWeight: "500",
        fontSize: "18px",
        lineHeight: "22px",
        color: "#6549F6",
        width: "258px",
        height: "54px",
        border: "2px solid #6549F6",
        borderRadius: "10px",
        padding: "10px",
        '& fieldset': {
            display: 'none'
        },
        '& svg': {
            color: "#6549F6"
        }
    },
    selectMenuItem: {
        fontFamily: 'Neue Haas Grotesk Text Pro, sans-serif',
        padding: "14px 23px",
        fontStyle: "normal",
        fontWeight: "500",
        fontSize: "16px",
        lineHeight: "20px",
        color: "#250C50",
        "&:hover": {
            color: "#6549F6"
        },
        "&.Mui-disabled": {
            display: "flex",
            flexDirection: "row",
            justifyContent: "space-between",
            padding: "14px 23px",
            fontFamily: 'Neue Haas Grotesk Text Pro, sans-serif',
            fontStyle: "normal",
            fontWeight: "500",
            fontSize: "18px",
            background: "linear-gradient(93.69deg, #7B61FF 0%, #00DAD9 107.12%)",
            borderRadius: "5px",
            lineHeight: "22px",
            color: "#FFFFFF",
            opacity: "1"
        }
    },
    moreMenuItem: {
        "& span": {
            fontFamily: 'Neue Haas Grotesk Text Pro, sans-serif',
            fontStyle: "normal",
            fontWeight: "400",
            fontSize: "14px",
            lineHeight: "17px",
            color: "#000000"
        }
    },
    successDropzoneButton: {
        "@media (max-width: 300px)": {
            padding: "14px 30px"
        },
        margin: "10px 12px !important",
        padding: { sm: "14px 75px", xs: "14px 50px" },
        border: "2px solid #6549F6 !important",
        borderRadius: "10px !important",
        textTransform: "capitalize",
        fontFamily: 'Neue Haas Grotesk Text Pro, Arial, sans-serif',
        fontStyle: "normal",
        fontWeight: "500",
        fontSize: "18px",
        textAlign: "center",
        lineHeight: "22px",
        color: "#6549F6 !important"
    },
    selectedSuccessDropzoneButton: {
        "@media (max-width: 300px)": {
            padding: "14px 30px"
        },
        textTransform: "capitalize",
        background: "#6549F6 !important",
        margin: "10px 12px !important",
        padding: { sm: "14px 75px", xs: "14px 50px" },
        border: "2px solid #6549F6 !important",
        borderRadius: "10px !important",
        fontFamily: 'Neue Haas Grotesk Text Pro, Arial, sans-serif',
        fontStyle: "normal",
        fontWeight: "500",
        fontSize: "18px",
        textAlign: "center",
        lineHeight: "22px !important",
        color: "#FFFFFF !important"
    },
    shuffleOrderButton: {
        width: "100%",
        background: "#6549F6 !important",
        padding: { sm: "14px 50px", xs: "14px 30px" },
        border: "2px solid #6549F6 !important",
        borderRadius: "10px !important",
        textTransform: "capitalize",
        fontFamily: 'Neue Haas Grotesk Text Pro, Arial, sans-serif',
        fontStyle: "normal",
        fontWeight: "500",
        fontSize: "18px",
        textAlign: "center",
        lineHeight: "22px !important",
        color: "#FFFFFF !important"
    },
    uploadingDropzoneText: {
        position: "absolute",
        top: "50%",
        fontFamily: 'Termina, Arial, sans-serif',
        fontStyle: "normal",
        fontWeight: "700",
        fontSize: { md: "84px", xs: "40px" },
        // textAlign: "center",
        lineHeight: "100%",
        color: "#7b61ff"
    },
    uploadPreviewContent: {
        display: "flex",
        flexDirection: { md: "row", xs: "column" },
        alignItems: { md: "start", xs: "center" },
        justifyContent: "center"
    },
    previewImage: {
        width: { md: "245px", xs: "100%" },
        borderRadius: "5px",
        filter: "drop-shadow(0px 4px 4px rgba(0, 0, 0, 0.25))"
    }
}

export default componentStyles
