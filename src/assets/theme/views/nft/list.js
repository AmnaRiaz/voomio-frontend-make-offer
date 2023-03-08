const componentStyles = () => ({
    pageroot: {
        overflowX: 'hidden !important',
        padding: "2rem",
        width: "100%",
        height: "100%",
        display: 'flex',
        flexDirection: ''
    },
    nftethereum: {
        width: "22px !important",
        fontWeight: "700 !important",
        fontSize: "18px !important",
        lineHeight: "120% !important"
    },
    nftlist: {
        // paddingLeft: '8.5rem',
        // paddingRight: '9rem',
        paddingTop: "0rem",
        paddingBottom: "4rem",
        width: "100%",
        height: "100%"
    },
    nftGrid: {
        display: 'grid',
        gap: '16px',
        gridAutoRows: 'minmax(0px, 1fr)',
        '--template-reduced-columns-multiplier': 1,
        // gridTemplateColumns: 'repeat(5, minmax(0,1fr))',
        gridTemplateColumns: 'repeat( calc( var(--template-columns) - ( var(--template-reduced-columns) * var(--template-reduced-columns-multiplier) ) ), minmax(0,1fr) )',
    },
    title: {
        "& h1": {
            fontSize: '2.2rem !important',
            color: 'black !important',
            fontWeight: 'bold'
        }
    },
    header: {
        display: 'flex',
        justifyContent: 'space-between',
        paddingBottom: '2rem'
    },
    btnselect: {
        display: 'flex !important',
        width: '12rem',
        color: ' #303030 !important',
        background: 'white !important',
        justifyContent: 'space-between !important',
        padding: '0.5rem 0.5rem 0.5rem 0.5rem!important',
        border: '1px solid #DEDEDE !important',
        borderRadius: '5px !important',
        boxShadow: 'none',
        textTransform: 'none !important',
        "& :hover": {
            transform: 'none'
        },
        "& svg": {
            paddingLeft: '40px'
        }
    },
    dropmenu: {
        width: '12rem',
        border: '1px solid #DEDEDE !important',
        "& li": {
            color: '#303030 !important'
        }
    },
    drop: {
        zIndex: '9 !important'
    },
    selectbtns: {
        display: 'flex',
        alignItems: 'center',
        padding: '0% 15% 5% 15% !important',
        "@media (max-width: 768px)": {
            display: 'block'
        }
    },
    items: {
        marginTop: '5%'
    },
    content: {
        color: 'black !important',
        fontWeight: 'bold !important'
    },
    cardcontent: {
        padding: '1.4rem 0.7rem 0.7rem 0.7rem !important',
        "& h4": {
            lineHeight: '2rem',
            color: 'black !important',
            fontWeight: 'bold'
        },
        "& h5": {
            paddingBottom: '1rem',
            color: 'black !important',
            fontSize: '0.96rem !important',
            // color: '#777777',
            fontWeight: 'bold'
        }
    },
    explorebtn: {
        display: 'flex',
        paddingTop: '1rem',
        justifyContent: 'space-between',
        "& button, button:hover": {
            fontSize: '0.75rem',
            width: '48%',
            textTransform: 'none',
            background: 'rgb(32, 129, 226)',
            color: 'white',
            " & svg": {
                fill: 'white'
            }
        }
    },
    viewAllCars: {
        alignItems: 'center',
        padding: '1.5rem',
        justifyContent: 'center !important',
        "& button": {
            textTransform: 'none',
            width: '12rem',
            background: '#336DC3 !important',
            color: 'white !important',
            "& svg": {
                fill: 'white'
            }
        }
    },
    nftCards: {
        paddngBottom: '20px !important',
        "& img": {
            width: '100%',
            borderRadius: '10px,10px,0px,0px !important'
        }
    },
    card: {
        display: 'flex',
        flexDirection: 'column',
        height: '100%',
        borderRadius: '10px',
        position: 'relative',
        zIndex: 2,
        overflow: 'hidden',
        backgroundColor: 'rgb(255, 255, 255)',
        boxShadow: 'rgb(0 0 0 / 8 %) 0px 4px 15px',
        transition: 'box-shadow 0.25s ease-in-out 0s',
        "&:not(:hover) .toolbar": {
            left: '0px',
            display: 'flex',
            width: '100%',
            position: 'absolute',
            bottom: '-50px',
            visibility: 'hidden',
            transition: 'bottom 0.075s ease-in-out 0s, visibility 0s ease 0.075s',
        },
        "&:hover .toolbar": {
            left: '0px',
            display: 'flex',
            width: '100%',
            height: '36px',
            position: 'absolute',
            bottom: '0px',
            transition: 'bottom 0.075s ease-in-out 0s',
        }
    },
    selectedCard: {
        border: 'solid 1px #6366f1',
    },
    link: {
        pointerEvents: 'initial',
        display: 'flex',
        flexDirection: 'column',
        height: '100%',
        overflow: 'hidden',
        borderRadius: 'inherit',
        textDecoration: 'none',
        cursor: 'pointer'
    },
    nftImageWrapper: {
        overflow: 'hidden',
        borderTopLeftRadius: '10px',
        borderTopRightRadius: '10px',
        paddingBottom: '100%',
        position: 'relative',
    },
    nftImage: {
        position: 'absolute',
        inset: '0px',
        boxSizing: 'border-box',
        padding: '0px',
        border: 'none',
        margin: 'auto',
        display: 'block',
        width: '0px',
        height: '0px',
        minWidth: '100%',
        maxWidth: '100%',
        minHeight: '100%',
        maxHeight: '100%',
        objectFit: 'cover',
    },
    nftInfoWrapper: {
        display: 'flex',
        flexDirection: 'column',
        width: '100%',
        padding: '16px'
    },
    toolbarButton: {
        display: 'inline-flex',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        fontSize: '16px',
        fontWeight: '600',
        lineHeight: '22px',
        letterSpacing: '0.01em',
        backgroundColor: 'rgb(32, 129, 226)',
        border: '2px solid rgb(32, 129, 226)',
        color: 'rgb(255, 255, 255)',
        width: '100%',
        height: '36px',
        cursor: 'pointer',
    },
    addToCart: {
        borderRadius: '0px 0px 0px 10px'
    },
    buyNow: {
        borderRadius: '0px 0px 10px'
    },
    introcontent: {
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        "& h5": {
            fontSize: '1rem !important',
            fontWeight: 'bold',
            color: 'black !important',
            padding: "0px !important"
        }
    },
    "@media (min-width: 20rem)": {
        nftGrid: {
            '--template-columns': 2
        }
    },
    "@media (min-width: 30rem)": {
        nftGrid: {
            '--template-columns': 3
        }
    },
    "@media (min-width: 50rem)": {
        nftGrid: {
            '--template-columns': 4
        }
    },
    "@media (min-width: 60rem)": {
        nftGrid: {
            '--template-columns': 5
        }
    },
    "@media (min-width: 768px)": {
        nftGrid: {
            '--template-column-gutters': '16px'
        }
    },
    "@media (min-width: 1024px)": {
        nftGrid: {
            '--template-reduced-columns': 1
        }
    },
    "@media (min-width: 70rem)": {
        nftGrid: {
            '--template-columns': 6
        }
    },
})

export default componentStyles
