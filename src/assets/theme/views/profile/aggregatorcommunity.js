const componentStyles = () => ({
    nabarhead: {
        boxShadow: "none !important",
        width: "307px",
        height: "58px",
        border: "2px solid #6549F6",
        borderRadius: "12px !important"
    },
    nfttraits: {
        fontWeight: "700 !important",
        fontSize: "22.9615px !important",
        lineHeight: "34px",
        color: "#000000",
        paddingLeft: "18px"
    },
    collectionhead: {
        boxShadow: "none !important"
    },
    nftaddicon: {
        color: "#6549F6",
        fontSize: "32px !important"
    },
    communityhead: {
        padding: "0px 300px",
        display: "flex !important",
        flexDirection: "row !important",
        justifyContent: "space-between !important",
        '@media only screen and (max-width: 992px)': {
            padding: "20px 180px"
        },
        '@media only screen and (max-width: 765px)': {
            padding: "20px",
            flexDirection: "column !important"
        },
        '@media only screen and (max-width: 576px)': {
            padding: "20px",
            flexDirection: "column !important"
        }
    },
    messageboth: {
        width: "20px"
    },
    dangericon: {
        color: "#D6C3FA",
        fontWeight: "600 !important",
        whiteSpace: "nowrap"
    },
    messagemumber: {
        color: "#6549F6",
        fontWeight: "600 !important",
        whiteSpace: "nowrap"
    },
    reportdetail: {
        fontWeight: "700 !important",
        fontSize: "20px",
        color: "#222222"
    },
    messageid: {
        fontWeight: "500 !important",
        fontSize: "14px",
        lineHeight: "17px",
        color: "#6549F6",
        whiteSpace: "nowrap"
    },
    messagedate: {
        fontWeight: "500 !important",
        fontSize: "14px",
        lineHeight: "17px",
        color: "#D6C3FA",
        whiteSpace: "nowrap"
    },
    pagenum: {
        fontWeight: "800 !important",
        fontSize: "32px !important",
        lineHeight: "38px !important",
        color: "#6549F6"
    },
    maxnum: {
        fontWeight: "800 !important",
        fontSize: "70px !important",
        lineHeight: "38px !important",
        color: "#6549F6",
        cursor: "pointer"
    },
    minnum: {
        fontWeight: "800 !important",
        fontSize: "70px !important",
        lineHeight: "38px !important",
        color: "#D6C3FA"
    },
    bgcolorcard: {
        width: "400px",
        '@media only screen and (max-width: 576px)': {
            width: "300px"
        }
    },
    cardimggroup: {
        height: 40,
        width: 40
    },
    NFTtype: {
        fontWeight: 700,
        fontSize: "16px",
        lineHeight: "120%",
        color: "#919191"
    },
    nftcheck: {
        width: 15,
        height: 15
    }
})

export default componentStyles
