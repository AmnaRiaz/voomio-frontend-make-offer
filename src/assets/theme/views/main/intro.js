const componentStyles = () => ({
    pageroot: {
        width: "100%",
        position: "relative",
        height: '770px',
        "@media (max-width: 1024px)": {
            height: '670px'
        },
        "@media (max-width: 768px)": {
            height: '420px'
        }
    },
    page: {
        width: '100%',
        height: '100%',
        background: '#110F1D url("../../../assets/image/component/main/home/intro/bg-img-1.jpg") repeat-y center center / 1920px'
    },
    intro1: {
        boxSizing: 'border-box',
        position: 'absolute',
        height: '412px',
        left: '-192px',
        right: '0px',
        top: '90px',
        filter: 'drop-shadow(0px 4px 15px rgba(0,0,0,0.25))',
        borderRadius: '20px',
        "@media (max-width: 1024px)": {
            height: '100%',
            left: '-15.8%',
            top: '-10%',
            maxWidth: '35%',
            minWidth: '25%'
        },
        "@media (max-width: 768px)": {
            display: 'none'
        },
        animationDuration: "3s",
        animationName: "intro1slidein",
        animationIterationCount: "infinite",
        animationDirection: "alternate"

    },
    intro2: {
        boxSizing: 'border-box',
        position: 'absolute',
        height: '24%',
        left: '72px',
        right: '0px',
        bottom: '220px',
        filter: 'drop-shadow(0px 4px 15px rgba(0, 0, 0, 0.25))',
        borderRadius: '20px',
        "@media (max-width: 1024px)": {
            maxWidth: '16%',
            minWidth: '10%',
            height: '100%',
            left: '6.7%',
            bottom: '-14.5%'
        },
        "@media (max-width: 768px)": {
            display: 'none'
        },
        animationDuration: "2.5s",
        animationName: "intro2slidein",
        animationIterationCount: "infinite",
        animationDirection: "alternate"
    },
    title1: {
        fontStyle: 'normal',
        fontFamily: 'Dela Gothic One !important',
        fontSize: '7rem !important',
        backgroundSize: "100%",
        whiteSpace: "nowrap",
        "-webkit-background-clip": "text",
        "-webkit-text-fill-color": "transparent",
        background: 'linear-gradient(92.12deg, #FFFFFF -5.07%, #6549F6 38.89%, #00DAD9 90.46%)',
        "@media (max-width: 1366px)": {
            fontSize: '5rem !important'
        },
        "@media (max-width: 1024px)": {
            fontSize: '4rem !important'
        },
        "@media (max-width: 768px)": {
            fontSize: '3rem !important'
        }
    },

    title3: {
        fontFamily: 'Lexend Giga, sans-serif',
        fontStyle: 'normal',
        fontWeight: '500',
        fontSize: '17px',
        lineHeight: '160%',
        color: '#000000',
        padding: "0px 17% 0 0",
        "@media (max-width: 1024px)": {
            fontSize: '1.1rem'
        },
        "@media (max-width: 768px)": {
            fontSize: '100%'
        }
    },
    intro3: {
        boxSizing: 'border-box',
        position: 'absolute',
        height: '290px',
        right: '-20px',
        bottom: '170px',
        filter: 'drop-shadow(0px 4px 15px rgba(0, 0, 0, 0.25))',
        borderRadius: '20px',
        "@media (max-width: 1024px)": {
            height: '100%',
            right: '-2%',
            bottom: '-16%',
            maxWidth: '23%',
            minWidth: '18%'
        },
        "@media (max-width: 768px)": {
            display: 'none'
        },
        animationDuration: "2.5s",
        animationName: "intro3slidein",
        animationIterationCount: "infinite",
        animationDirection: "alternate"
    },
    intro4: {
        boxSizing: 'border-box',
        position: 'absolute',
        height: '265px',
        right: '-75px',
        bottom: '0px',
        filter: 'drop-shadow(0px 4px 15px rgba(0, 0, 0, 0.25))',
        borderRadius: '20px',
        top: '170px',
        "@media (max-width: 1024px)": {
            height: '100%',
            right: '-6.6%',
            top: '-7%',
            maxWidth: '20%',
            minWidth: '15%'
        },
        "@media (max-width: 768px)": {
            display: 'none'
        },
        animationDuration: "2.5s",
        animationName: "intro4slidein",
        animationIterationCount: "infinite",
        animationDirection: "alternate"
    },
    explorebtn: {
        padding: '0px 0 5px 0px !important',
        width: '30%',
        height: '55px',
        "@media (max-width: 400px)": {
            width: "100%"
        },
        marginRight: "10px !important",
        // margin: '5% 0% 0% 6%',
        background: 'linear-gradient(98.93deg, #7B61FF -6.98%, #00DAD9 108.86%)',
        borderRadius: '386.071px !important',
        border: 'none !important',
        "& span": {
            // fontFamily: 'Lexend Giga, sans-serif !important',
            fontStyle: 'normal',
            fontWeight: '500 !important',
            fontSize: '32px !important',
            textTransform: "none !important",
            lineHeight: '40px !important',
            padding: "12px !important",
            textAlign: 'center',
            color: '#FFFFFF',
            "@media (max-width: 1024px)": {
                fontSize: '30px !important',
                padding: "9px !important"
            },
            "@media (max-width: 768px)": {
                fontSize: '25px !important',
                padding: "7px !important"
            }
        }
    },
    createbtn: {
        padding: '0px 0 5px 0px !important',
        width: '30%',
        "@media (max-width: 400px)": {
            width: "100%"
        },
        // margin: '5% 0% 0% 6%',
        height: '55px',
        marginLeft: "10px !important",
        // background: '#FFFFFF',
        boxShadow: '0px 0px 6px 2px rgba(101, 73, 246, 0.4)',
        background: 'linear-gradient(white, white) padding-box, linear-gradient(to right, rgba(123, 97, 255, 1), rgba(0, 218, 217, 1)) border-box',
        borderRadius: '50px !important',
        textTransform: "none !important",
        border: '2px solid transparent !important',
        "@media (max-width: 1024px)": {
        },
        "@media (max-width: 768px)": {
        },
        "& span": {
            // fontFamily: 'Lexend Giga, sans-serif',
            fontStyle: 'normal',
            fontWeight: '500 !important',
            fontSize: '32px !important',
            padding: "12px !important",
            lineHeight: '36px !important',
            textAlign: 'center',
            background: 'linear-gradient(98.93deg, #7B61FF -6.98%, #00DAD9 108.86%)',
            '-webkit-background-clip': 'text',
            ' -webkit-text-fill-color': 'transparent',
            "@media (max-width: 1024px)": {
                fontSize: '30px !important',
                padding: "9px !important"
            },
            "@media (max-width: 768px)": {
                fontSize: '150% !important',
                padding: "7px !important"
            }
        }
    },
    buttons: {
        width: "50%",
        display: "flex",
        alignItems: "center",
        justifyContent: "right",
        padding: "50px 50px 0 0 "
    },
    content: {
        width: "49%",
        height: "100%",
        margin: "auto",
        paddingTop: "6%",
        "@media (max-width: 1024px)": {
        },
        "@media (max-width: 768px)": {
            width: "90%"
        }
    }
})

export default componentStyles
