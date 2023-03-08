const componentStyles = () => ({
    container: {
        marginTop: "150px"
    },
    header: {
        "& h1": {
            color: "#222222",
            fontFamily: 'Termina, Arial, sans-serif',
            fontStyle: "normal",
            fontWeight: "700",
            fontSize: "44px",
            lineHeight: "100%"
        }
    },
    contentHeader: {
        "& h2": {
            marginTop: "70px",
            fontFamily: 'Termina, Arial, sans-serif',
            fontStyle: "normal",
            fontWeight: "600",
            fontSize: "28px",
            lineHeight: "100%",
            color: "#7B61FF"
        },
        "& p": {
            marginTop: "13px",
            fontFamily: 'Neue Haas Grotesk Text Pro, Arial, sans-serif',
            fontStyle: "normal",
            fontWeight: "400",
            fontSize: "22px",
            lineHeight: "27px",
            color: "#000000"
        }
    },
    contentItem: {
        // position: "absolute",
        // width: "397px",
        // height: "441px",
        // left: "179px",
        // top: "436px",
        border: "2px solid #7B61FF",
        borderRadius: "10px",
        display: "flex",
        flexDirection: "column",
        alignItems: "flex-start"
        // padding: "40px 20px 24px 20px"
    },
    contentItemHeader: {
        // width: "395px",
        // height: "203px",
        width: "100%",
        display: "flex",
        flexDirection: "column",
        alignItems: "flex-start",
        // marginBottom: "22px",
        boxSizing: "border-box",
        padding: "40px 20px 20px 20px",
        gap: "11px"
    },
    sContentItemHeader: {
        // width: "395px",
        // height: "203px",
        display: "flex",
        width: "100%",
        flexDirection: "column",
        alignItems: "flex-start",
        boxSizing: "border-box",
        padding: "40px 20px 20px 20px",
        gap: "11px",
        background: "#F4EEFF",
        borderRadius: "10px"
    },
    selectedContentItemHeader: {
        // width: "395px",
        // height: "203px",
        display: "flex",
        width: "100%",
        flexDirection: "column",
        alignItems: "flex-start",
        boxSizing: "border-box",
        padding: "0px",
        // padding: "40px 20px 20px 20px",
        gap: "11px",
        background: "#F4EEFF",
        borderRadius: "10px"
    },
    contentItemHeaderPricingBadge: {
        // width: "354px",
        // height: "104px",
        display: "flex",
        flexDirection: "column",
        alignItems: "flex-start",
        padding: "0px",
        gap: "16px"
    },
    contentItemHeaderBadge: {
        display: "flex",
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center",
        padding: "4px 16px",
        background: "#E0E7FF",
        borderRadius: "14px",
        // width: "140px",
        // height: "28px",

        fontFamily: 'Neue Haas Grotesk Text Pro, Arial, sans-serif',
        fontStyle: "normal",
        fontWeight: "500",
        fontSize: "14px",
        lineHeight: "20px",
        textAlign: "center",
        letterSpacing: "0.025em",
        textTransform: "uppercase",
        color: "#4F46E5"
    },
    contentItemHeaderPricing: {
        // width: "354px",
        // height: "60px",
        display: "flex",
        flexDirection: "row",
        alignItems: "flex-end",
        padding: "0px",
        gap: "4px"
    },
    contentItemHeaderPricingPrice: {
        // width: "165px",
        // height: "60px",
        fontFamily: 'Termina, Arial, sans-serif',
        fontStyle: "normal",
        fontWeight: "800",
        fontSize: "60px",
        lineHeight: "60px",
        color: "#111827"
    },
    contentItemHeaderPricingFrequency: {
        // width: "46px",
        // height: "32px",
        fontFamily: 'Neue Haas Grotesk Text Pro, Arial, sans-serif',
        fontStyle: "normal",
        fontWeight: "500",
        fontSize: "24px",
        lineHeight: "32px",
        color: "#6B7280"
    },
    contentItemHeaderSupport: {
        // width: "355px",
        // height: "24px",
        color: "#333333",
        fontFamily: 'Neue Haas Grotesk Text Pro, Arial, sans-serif',
        fontStyle: "normal",
        fontWeight: "400",
        fontSize: "16px",
        lineHeight: "24px"
    },
    contentItemContent: {
        width: "100%",
        display: "flex",
        flexDirection: "column",
        alignItems: "flex-start",
        boxSizing: "border-box",
        padding: "20px 20px 24px 20px",
        // marginTop: "22px",
        gap: "24px",
        // width: "397px",
        // height: "238px",
        background: "linear-gradient(0deg, rgba(255, 255, 255, 0.6), rgba(255, 255, 255, 0.6)), #F4EEF)F"
    },
    selectedContentItemContent: {
        marginTop: "48px !important",
        width: "100%",
        display: "flex",
        flexDirection: "column",
        alignItems: "flex-start",
        padding: "20px 20px 24px 20px",
        boxSizing: "border-box",
        gap: "24px",
        // width: "397px",
        // height: "238px",
        background: "linear-gradient(0deg, rgba(255, 255, 255, 0.6), rgba(255, 255, 255, 0.6)), #F4EEFF)"
    },
    contentItemContentFeatures: {
        display: "flex",
        flexDirection: "column",
        alignItems: "flex-start",
        padding: "0px",
        gap: "10px"
        // width: "357px",
        // height: "126px"
    },
    contentItemContentFeature: {
        display: "flex",
        flexDirection: "row",
        alignItems: "flex-start",
        padding: "0px",
        gap: "12px"
        // width: "357px",
        // height: "24px"
    },
    contentItemContentFeatureIcon: {
        color: "#10B981",
        fontSize: "24px",
        width: "24px",
        height: "24px"
        // position: "absolute",
        // left: "20.83%",
        // right: "20.83%",
        // top: "29.17%",
        // bottom: "29.17%",
        // border: "2px solid #10B981"
    },
    contentItemContentFeatureText: {
        // width: "321px",
        // height: "24px",

        fontFamily: 'Neue Haas Grotesk Text Pro, Arial, sans-serif',
        fontStyle: "normal",
        fontWeight: "500",
        fontSize: "14px",
        lineHeight: "24px",
        color: "#6B7280"
    },
    contentItemContentButton: {
        display: "flex",
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center",
        padding: "13px 21px",
        // alignSelf: "stretch",
        // width: "357px",
        // height: "44px",
        width: "100%",
        // background: "#FFFFFF",
        border: "2px solid #7B61FF !important",
        borderRadius: "154.863px !important",

        fontFamily: 'Neue Haas Grotesk Text Pro, Arial, sans-serif',
        fontStyle: "normal",
        fontWeight: "500",
        fontSize: "14.9345px",
        lineHeight: "120%",
        color: "#7B61FF !important",
        "&:hover": {
            border: "2px solid #7B61FF !important",
            // border: "2px solid #7B61FF !important",
            color: "#FFFFFF !important",
            background: "linear-gradient(98.79deg, #9B53E0 20.34%, #8551E6 77.89%)"
        }
    },
    selectedContentItemContentButton: {
        display: "flex",
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center",
        padding: "13px 21px",
        // alignSelf: "stretch",
        // width: "357px",
        // height: "44px",
        width: "100%",
        background: "linear-gradient(98.79deg, #9B53E0 20.34%, #8551E6 77.89%)",
        border: "2px solid #7B61FF !important",
        // border: "none !important",
        borderRadius: "154.863px !important",

        fontFamily: 'Neue Haas Grotesk Text Pro, Arial, sans-serif',
        fontStyle: "normal",
        fontWeight: "500",
        fontSize: "14.9345px",
        lineHeight: "120%",
        color: "#FFFFFF !important"
    },
    contentItemContentBasicText: {
        fontFamily: 'Neue Haas Grotesk Text Pro, Arial, sans-serif',
        marginRight: '12px',
        fontStyle: "normal",
        fontWeight: "400",
        fontSize: "22px",
        lineHeight: "27px",
        color: "#000000"
    },
    contentItemContentFreeText: {
        fontFamily: 'Neue Haas Grotesk Text Pro, Arial, sans-serif',
        fontStyle: "normal",
        fontWeight: "500",
        fontSize: "14px",
        lineHeight: "20px",
        textAlign: "center",
        letterSpacing: "0.025em",
        textTransform: "uppercase",
        color: "#4F46E5"
    },
    contentItemContentText: {
        fontFamily: 'Neue Haas Grotesk Text Pro, Arial, sans-serif',
        fontStyle: "normal",
        fontWeight: "400",
        fontSize: "14px",
        lineHeight: "24px",
        color: "#333333"
    },
    footerItem: {
        border: "2px solid #7B61FF",
        borderRadius: "10px",
        display: "flex",
        flexDirection: "column",
        alignItems: "flex-start",
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
        color: "#222222"
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
        background: "linear-gradient(98.79deg, #9B53E0 20.34%, #8551E6 77.89%)",
        borderRadius: "154.863px !important"
    },
    tabbtn: {
        display: 'flex',
        justifyContent: 'center',
        width: "100%",
        "& button": {
            background: 'transparent',
            color: 'black !important',
            fontWeight: 'bold !important',
            borderRadius: '100px !important',
            textTransform: "none !important",
            width: '90%',
            boxShadow: 'none'
        },
        "& button:hover": {
            background: '#e0e5e5',
            boxShadow: 'none',
            transparent: 'none'
        }
    },
    tabselbtn: {
        display: 'flex',
        justifyContent: 'center',
        width: "100%",
        "& button": {
            background: '#000000 !important',
            color: 'white !important',
            fontWeight: 'bold !important',
            borderRadius: '100px !important',
            textTransform: "none !important",
            width: '90%',
            boxShadow: 'none'
        },
        "& button:hover": {
            background: '#e0e5e5',
            boxShadow: 'none',
            transparent: 'none'
        }
    }
})

export default componentStyles
