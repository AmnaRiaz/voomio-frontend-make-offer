const componentStyles = () => ({
    nftethereum: {
        width: "22px !important",
        fontWeight: "700 !important",
        fontSize: "18px !important",
        lineHeight: "120% !important"
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
})
