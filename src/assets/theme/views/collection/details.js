const componentStyles = () => ({
    pageroot: {
        display: "flex",
        justifyContent: "center",
        position: "relative"
    },
    pagecontaner: {
        paddingTop: 40,
        // paddingLeft: 322,
        // "@media only screen and (max-width: 992px)": {
        //     paddingLeft: 245
        // },
        // "@media only screen and (max-width: 768px)": {
        //     paddingLeft: 145
        // },
        // "@media only screen and (max-width: 576px)": {
        //     padding: 20
        // }
    },
    bannericon: {
        position: "absolute",
        bottom: "-30%",
        left: "44%",
        "@media only screen and (max-width: 1200px)": {
            left: "43%",
            bottom: "-40%"
        },
        "@media only screen and (max-width: 992px)": {
            left: "43%",
            bottom: "-40%"
        },
        "@media only screen and (max-width: 768px)": {
            left: "43%",
            bottom: "-30px"
        },
        "@media only screen and (max-width: 576px)": {
            left: "43%",
            bottom: "-23px",
            display: "none"
        }
    },
    bannerbackground: {
        width: "220px",
        height: "220px",
        background: "white",
        borderRadius: "50%",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        overflow: "hidden",
        "@media only screen and (max-width: 1200px)": {
            width: "200px",
            height: "200px"
        },
        "@media only screen and (max-width: 992px)": {
            width: "170px",
            height: "170px"
        },
        "@media only screen and (max-width: 768px)": {
            width: "150px",
            height: "150px"
        },
        "@media only screen and (max-width: 576px)": {
            width: "200px",
            height: "200px"
        }
    },
    ellipseImg: {
        width: "100%",
        height: "100%",
        "@media only screen and (max-width: 1200px)": {
            width: "100%",
            height: "100%"
        },
        "@media only screen and (max-width: 992px)": {
            width: "100%",
            height: "100%"
        },
        "@media only screen and (max-width: 768px)": {
            width: "100%",
            height: "100%"
        },
        "@media only screen and (max-width: 576px)": {
            width: "100%",
            height: "100%"
        }
    },
    bannerbackgroundimg: {
        background: "linear-gradient(98.93deg, #7B61FF -6.98%, #00DAD9 108.86%)",
        width: "100%",
        height: "200px",
        objectFit: "cover",
        filter: "blur(50px)",
        transform: "scale(1.1)"
    },
    extrasoho: {
        fontSize: "36px !important",
        fontWeight: "700 !important",
        lineHeight: "44px !important",
        color: "black"
    },
    addressbutton: {
        background: "linear-gradient(0deg, rgba(255, 255, 255, 0.9), rgba(255, 255, 255, 0.9)), linear-gradient(98.79deg, #9B53E0 20.34%, #8551E6 77.89%) !important",
        color: "#8551E6 !important",
        borderWidth: "0px",
        borderRadius: "154.863px !important",
        width: "170px",
        height: "42.37px"
    },
    followbutton: {
        background: "linear-gradient(98.79deg, #9B53E0 20.34%, #8551E6 77.89%) !important",
        color: "#FFFFFF !important",
        borderWidth: "0px !important",
        borderRadius: "154.863px !important",
        width: "170px",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        height: "42.37px"
    },
    createbutton: {
        background: "linear-gradient(98.93deg, #7B61FF -6.98%, #00DAD9 108.86%)",
        color: "#FFFFFF",
        borderWidth: "0px",
        borderRadius: "154.863px",
        width: "170px",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        height: "42.37px"
    },
    createbuttonhead: {
        paddingTop: "100px",
        paddingBottom: "80px"
    },
    radiusbutton: {
        width: "40px",
        height: "39px",
        border: "0px",
        background: "linear-gradient(0deg, rgba(255, 255, 255, 0.9), rgba(255, 255, 255, 0.9)), linear-gradient(98.79deg, #9B53E0 20.34%, #8551E6 77.89%) !important",
        borderRadius: "82.47px",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        cursor: "pointer",
        color: "#6549F6 !important"
    },
    addicon: {
        color: "white"
    },
    pageheader: {

    },
    extrasohoemail: {
        fontWeight: "500 !important",
        fontSize: "22px !important",
        lineHeight: "27px !important",
        color: "#6549F6 !important"
    },
    extrasohodate: {
        width: "129px",
        height: "22px",
        border: "0px",
        background: "linear-gradient(0deg, rgba(255, 255, 255, 0.9), rgba(255, 255, 255, 0.9)), linear-gradient(98.79deg, #9B53E0 20.34%, #8551E6 77.89%)",
        borderRadius: "82.47px",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        fontFamily: 'Neue Haas Grotesk Text Pro',
        fontWeight: 600,
        fontSize: "12px",
        lineheight: "18px",
        color: "#6549F6"
    },
    fontformat: {
        fontWeight: 400,
        fontSize: "16px",
        lineHeight: "24px",
        color: "#000000"
    },
    fontbold: {
        fontFamily: 'Termina',
        fontWeight: "700 !important",
        fontSize: "21.7625px !important",
        lineHeight: "26px !important",
        color: "#000000"
    },
    iconsearch: {
        width: "25px",
        height: "25px"
    },
    searchinput: {
        width: "80%"
    },
    searchform: {
        width: "400px",
        height: "40px",
        border: "2px solid #6549F6",
        borderRadius: "50px !important",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        '@media only screen and (max-width: 1200px)': {
            width: "270px !important"
        }
    },
    grounddemo: {
        width: "258px",
        height: "54px",
        borderRadius: "10px"
    },
    tablist: {
        // paddingLeft: "12%",
        // "@media only screen and (max-width: 576px)": {
        //     padding: 0
        // },
        // "@media only screen and (max-width: 768px)": {
        //     padding: 0
        // }
    },
    cachedicon: {
        color: "black !important",
        fontWeight: 400,
        fontSize: "16px",
        lineHeight: "20px"
    },
    cachediconfal: {
        color: "black",
        fontWeight: 400,
        fontSize: "16px",
        lineHeight: "20px"
    },
    tabitems: {
        padding: "0px !important",
        textTransform: "none !important"
    },
    tabitem: {
        display: "flex !important",
        flexDirection: "row-reverse !important",
        padding: "0px !important",
        textTransform: "none !important"
    },
    tabblock: {
        display: "none"
    },
    scrollicon: {
        width: "20px",
        cursor: "pointer"
    },
    scrollfilter: {
        width: "30px",
        height: "30px",
        cursor: "pointer",
        background: "#6549F6",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        borderRadius: "5px !important"
    },
    nativeselect: {
        width: "258px",
        height: "44px",
        border: "2px solid #6549F6",
        borderRadius: "10px",
        padding: "10px",
        '& fieldset': {
            display: 'none'
        },
        '& svg': {
            color: "#6549F6"
        },
        '& .MuiSelect-select': {
            color: "#6549F6"
        },
        '@media only screen and (max-width: 576px)': {
            width: "150px"
        }
    },
    icongroupleft: {
        border: "2px solid #6549F6",
        borderRadius: "10px 0px 0px 10px",
        bgcolor: "#6549F6"
    },
    icongroupright: {
        border: "2px solid #6549F6",
        borderRadius: "0px 10px 10px 0px",
        bgcolor: "#6549F6"
    },
    toggleicongroup: {
        height: "40px",
        '& .Mui-selected': {
            background: "#6549F6 !important"
        },
        '@media only screen and (max-width: 576px)': {
            display: "none !important"
        }
    },
    toggleiconleft: {
        color: "white"
    },
    activeleft: {
        color: "#6549F6"
    },
    toggleiconright: {
        width: "100%"
    },
    activeright: {
        background: "white",
        width: "100%"
    },
    toggleright: {
        color: "#6549F6"
    },
    cardimggroup: {
        borderRadius: "10px",
        width: "100%"
    },
    cardnftdetail: {
        fontWeight: "700 !important",
        fontS: "20.9443px",
        lineHeight: "120%",
        color: "black"
    },
    cardnftfooter: {
        color: "#C4C4C4",
        fontWeight: "500 !important",
        fontSize: "18px",
        lineHeight: "120%"
    },
    nftethereum: {
        width: "22px",
        fontWeight: "700 !important",
        fontSize: "18px",
        lineHeight: "120%"
    },
    nftcheck: {
        width: "20px",
        objectFit: "contain",
        marginRight: "5px"
    },
    cardlogo: {
        position: "absolute",
        background: "white",
        borderRadius: "10px 0px",
        padding: 5
    },
    colorstyle: {
        width: "68.08px",
        height: "20px",
        background: "#F4EEFF !important",
        borderRadius: "4px !important",
        padding: 5,
        color: "#6549F6 !important",
        fontWeight: "700 !important",
        fontSize: "12px",
        lineHeight: "15px",
        textAlign: "center !important",
        display: "flex",
        alignItems: "center",
        justifyContent: "center"
    },
    griditems: {
        display: "flex"
    },
    boxshadow: {
        boxShadow: "5.26833px 5.26833px 13.1708px rgba(0, 0, 0, 0.1) !important",
        cursor: "pointer",
        "&:hover": {
            // filter: "blur(3px)"
        }
    },
    tablistitem: {
        // paddingLeft: "120px",
        // '@media only screen and (max-width: 576px)': {
        //     padding: 0
        // }
        display:'flex',
        justifyContent:'center'
    },
    displayicon: {
        "@media only screen and (max-width: 576px)": {
            display: "none !important",
            width: "81px !important"
        }
    },
    header: {
        padding: "24px 120px",
        "@media only screen and (max-width: 576px)": {
            paddingLeft: "50px"
        }
    },
    collectionhead: {
        padding: "24px 100px",
        "@media only screen and (max-width: 576px)": {
            padding: 0
        }
    },
    tabindicator: {
        '& .MuiTabs-scroller': {
            '& .MuiTabs-indicator': {
                height: 8,
                background: "#6549F6"
            },
            '& .Mui-selected': {
                color: "#6549F6"
            },
            '& .MuiTabs-flexContainer': {
                width: "100%",
                overflow: "auto"
            }
        }
    },
    itemprice: {
        fontWeight: "500 !important",
        fontSize: "16px !important",
        lineHeight: "24px",
        color: "#000000",
        '@media only screen and (max-width: 576px)': {
            fontSize: "12px !important"
        }
    },
    itemamount: {
        fontWeight: "1000 !important",
        fontSize: "22px !important",
        lineHeight: "24px",
        color: "#000000",
        '@media only screen and (max-width: 576px)': {
            fontSize: "16px !important"
        }
    },
    totalprice: {
        fontWeight: "500 !important",
        fontSize: "16px !important",
        lineHeight: "24px",
        color: "#6549F6",
        whiteSpace: "nowrap",
        '@media only screen and (max-width: 576px)': {
            fontSize: "12px !important"
        }
    },
    totalamount: {
        fontWeight: "1000 !important",
        fontSize: "22px !important",
        lineHeight: "24px",
        color: "#6549F6",
        '@media only screen and (max-width: 576px)': {
            fontSize: "16px !important"
        }
    },
    uniongroup: {
        width: "180px",
        height: "44px",
        padding: "10px 20px !important",
        background: "linear-gradient(98.93deg, #7B61FF -6.98%, #00DAD9 108.86%)",
        display: "flex",
        textTransform: "capitalize !important",
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center",
        borderRadius: "50px !important",
        gap: "20px",
        color: "white !important"
    },
    filters: {
        fontWeight: "700 !important",
        fontSize: "22px !important",
        lineHeight: "25px !important",
        color: "#6549F6",
        cursor: "pointer"
    },
    activitybar: {
        flexWrap: "wrap",
        gap: "5px",
        '@media only screen and (max-width: 992px)': {
            whiteSpace: "nowrap",
            padding: "0px !important",
            width: "100%",
            display: "flex",
            justifyContent: "center",
            gap: "5px"
        }
    },
    filtervalue: {
        width: "118px",
        height: "5px",
        background: "#6549F6",
        border: "2px solid #6549F6",
        borderRadius: "50px",
        padding: "10px",
        display: "flex",
        alignItems: "center",
        color: "white",
        justifyContent: "center",
        gap: "12px"
    },
    filterdirection: {
        paddingTop: "20px",
        '@media only screen and (max-width: 576px)': {
            display: "flex",
            flexDirection: "column !important",
            paddingBottom: "20px"
        }
    },
    NFTprice: {
        '@media only screen and (max-width: 1200px)': {
            display: "flex !important",
            flexDirection: "column !important"
        }
    },
    filteritemvalue: {
        width: "20px !important",
        cursor: "pointer"
    },
    filterlistsearch: {
        border: "2px solid #6549F6 !important",
        width: "200px",
        height: "40px",
        borderRadius: "10px",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        '& input': {
            textAlign: "center"
        }
    },
    filterlist: {
        width: '100%',
        maxWidth: 213,
        bgcolor: 'background.paper',
        border: "2px solid #6549F6",
        borderRadius: "8px"

    },
    listdark: {
        fontWeight: "600 !important",
        fontSize: "14px !important",
        lineHeight: "17px",
        color: "#000000",
        whiteSpace: "nowrap",
        width: "80px",
        textOverflow: "ellipsis",
        overflow: "hidden"
    },
    listblock: {
        fontWeight: "500 !important",
        fontSize: "12px !important",
        lineHeight: "15px",
        color: "#919191",
        whiteSpace: "nowrap"
    },
    listcheckbox: {
        padding: "0px !important"
    },
    scolltoolbar: {
        padding: "20px 100px",
        '@media only screen and (max-width: 576px)': {
            padding: "20px"
        }
    },
    listsearch: {
        padding: "4px 20px 5px !important"
    },
    filterTrait: {
        width: "118px",
        height: "24px",
        borderRadius: "5px",
        background: "#F4EEFF",
        display: "flex",
        justifyContent: "space-evenly"
    },
    scrolltoobarlist: {
        width: "100%",
        overflow: "auto",
        paddingBottom: "20px"
    },
    activityfilter: {
        '@media only screen and (max-width: 576px)': {
            paddingLeft: "20px"
        }
    },
    filtermadal: {
        marginTop: "-50px !important",
        marginLeft: "-70px",
        padding: "20px",
        position: "fixed",
        '@media only screen and (max-width: 1200px)': {
            maxHeight: "400px !important"
        },
        '@media only screen and (max-width: 992px)': {
            maxHeight: "300px !important"

        },
        '@media only screen and (max-width: 765px)': {
            maxHeight: "300px !important"

        },
        '@media only screen and (max-width: 576px)': {
            maxHeight: "300px !important",
            maxWidth: "400px !important",
            marginLeft: "0px"
        },
        '& .MuiPaper-root ul': {
            borderRadius: "0px !important"
        }
    }
})

export default componentStyles
