const componentStyles = () => ({
    pageroot: {
        width: "100%",
        padding: "0px",
        position: "relative",
        height: '1000px',
        "@media (max-width: 1024px)": {
            height: '850px'
        },
        "@media (max-width: 768px)": {
            height: '600px'
        }
    },
    page: {
        display: "flex",
        justifyContent: "center",
        position: 'absolute',
        width: '100%',
        left: '0px',
        top: '5%',
        height: '100%',
        backgroundRepeat: 'no-repeat',
        backgroundSize: 'cover'
    },
    intro1: {
        boxSizing: 'border-box',
        position: 'absolute',
        height: '41%',
        left: '-192px',
        right: '0px',
        top: '90px',
        filter: 'drop-shadow(0px 4px 15px rgba(0,0,0,0.25))',
        borderRadius: '20px',
        "@media (max-width: 1024px)": {
            height: '100%',
            left: '-13.8%',
            top: '-20%',
            maxWidth: '30%',
            minWidth: '25%'
        },
        "@media (max-width: 768px)": {
            display: 'none'
        },
        animationDuration: "3s",
        animationName: "intro5slidein",
        animationIterationCount: "infinite",
        animationDirection: "alternate"

    },
    intro2: {
        top: '35%',
        left: '5%',
        height: '20%',
        boxSizing: 'border-box',
        position: 'absolute',
        filter: 'drop-shadow(0px 4px 15px rgba(0, 0, 0, 0.25))',
        borderRadius: '20px',
        "@media (max-width: 1024px)": {
            maxWidth: '13%',
            minWidth: '10%',
            height: '100%',
            left: '5.7%',
            top: '-7.5%'
        },
        "@media (max-width: 768px)": {
            display: 'none'
        },
        animationDuration: "2.7s",
        animationName: "intro6slidein",
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
        filter: 'drop-shadow(0px 4px 15px rgba(0, 0, 0, 0.25))',
        borderRadius: '20px',
        left: '-8%',
        bottom: '4%',
        height: '30%',
        "@media (max-width: 1024px)": {
            height: '100%',
            maxWidth: '21%',
            minWidth: '18%',
            left: '-7.5%',
            bottom: '-20.5%'
        },
        "@media (max-width: 768px)": {
            display: 'none'
        },
        animationDuration: "3.2s",
        animationName: "intro7slidein",
        animationIterationCount: "infinite",
        animationDirection: "alternate"
    },
    intro4: {
        boxSizing: 'border-box',
        position: 'absolute',
        filter: 'drop-shadow(0px 4px 15px rgba(0, 0, 0, 0.25))',
        borderRadius: '20px',
        top: '45.6%',
        left: '-3.5%',
        height: '30%',
        "@media (max-width: 1024px)": {
            minWidth: '15%',
            top: '40%',
            left: '-1.7%',
            maxWidth: '19%'
        },
        "@media (max-width: 768px)": {
            display: 'none'
        },
        animationDuration: "3.2s",
        animationName: "intro8slidein",
        animationIterationCount: "infinite",
        animationDirection: "alternate"
    },
    explorebtn: {
        padding: '0px 0 5px 0px !important',
        width: '30%',
        height: '55px',
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
        width: "100%",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        paddingTop: "8%",
        "@media (max-width: 1024px)": {
            paddingTop: "90px"
        },
        "@media (max-width: 768px)": {
            fontSize: '150% !important',
            padding: "7px !important"
        }
    },
    content: {
        width: "49%",
        height: "100%",
        margin: "auto",
        paddingTop: "6%",
        textAlign: 'center',
        "@media (max-width: 1024px)": {
        },
        "@media (max-width: 768px)": {
            width: "90%"
        }
    },
    vector: {
        display: 'flex',
        padding: '90px 20% 0 20%',
        "& h1": {
            color: 'black',
            fontWeight: 'bold'
        },
        "& h3": {
            padddingTop: '1%',
            color: 'black'
            // fontWeight: 'bold'
        },
        "& img": {
            width: '20%'
        },
        "@media (max-width: 1024px)": {
            padding: '40px 20% 0 20%',
            "& h1": {
                fontSize: '1.3rem',
                whiteSpace: 'nowrap'
            },
            "& h3": {
                fontSize: '1rem'
                // fontWeight: 'bold'
            },
            "& img": {
                width: '30%'
            }
        },
        "@media (max-width: 768px)": {
            padding: '30px 20% 0 20%',
            "& h1": {
                fontSize: '1rem',
                whiteSpace: 'nowrap'
            },
            "& h3": {
                padddingTop: '1%',
                color: 'black'
                // fontWeight: 'bold'
            },
            "& img": {
                width: '10%'
            }
        }
    },
    textbox: {
        textAlign: 'left',
        paddingLeft: '5%'
    },
    introA: {
        boxSizing: 'border-box',
        position: 'absolute',
        bottom: '10%',
        right: '-155px',
        height: '41%',
        filter: 'drop-shadow(0px 4px 15px rgba(0,0,0,0.25))',
        borderRadius: '20px',
        "@media (max-width: 1024px)": {
            bottom: '-17%',
            right: '-11%',
            height: '100%',
            maxWidth: '30%',
            minWidth: '25%'
        },
        "@media (max-width: 768px)": {
            display: 'none'
        },
        animationDuration: "3s",
        animationName: "introAslidein",
        animationIterationCount: "infinite",
        animationDirection: "alternate"
    },
    introB: {
        boxSizing: 'border-box',
        position: 'absolute',
        filter: 'drop-shadow(0px 4px 15px rgba(0, 0, 0, 0.25))',
        borderRadius: '20px',
        bottom: '0.6%',
        right: '-20px',
        height: '20%',
        "@media (max-width: 1024px)": {
            height: '100%',
            maxWidth: '13%',
            minWidth: '15%',
            top: '34.5%',
            right: '-1.6%'
        },
        "@media (max-width: 768px)": {
            display: 'none'
        },
        animationDuration: "2.7s",
        animationName: "introBslidein",
        animationIterationCount: "infinite",
        animationDirection: "alternate"
    },
    introC: {
        boxSizing: 'border-box',
        position: 'absolute',
        filter: 'drop-shadow(0px 4px 15px rgba(0, 0, 0, 0.25))',
        borderRadius: '20px',
        right: '-15px',
        top: '31%',
        height: '25%',
        "@media (max-width: 1024px)": {
            minWidth: '18%',
            right: ' -1%',
            top: '-6.5%',
            height: '100%',
            maxWidth: '21%'
        },
        "@media (max-width: 768px)": {
            display: 'none'
        },
        animationDuration: "3.3s",
        animationName: "introCslidein",
        animationIterationCount: "infinite",
        animationDirection: "alternate"
    },
    introD: {
        boxSizing: 'border-box',
        position: 'absolute',
        filter: 'drop-shadow(0px 4px 15px rgba(0, 0, 0, 0.25))',
        borderRadius: '20px',
        top: '17.6%',
        right: '-59px',
        height: '22%',
        "@media (max-width: 1024px)": {
            height: '100%',
            right: '-5.1%',
            top: '-22%',
            maxWidth: '19%',
            minWidth: '15%'
        },
        "@media (max-width: 768px)": {
            display: 'none'
        },
        animationDuration: "2.5s",
        animationName: "introDslidein",
        animationIterationCount: "infinite",
        animationDirection: "alternate"
    }
})

export default componentStyles
