const componentStyles = () => ({
    walletmodal: {
        "& h2, & h3": {
            color: 'black !important',
            fontWeight: 'bold  !important'
        },
        "& h5": {
            color: 'gray !important'
        },
        borderRadius: '10px !important',
        border: 'none !important',
        boxShadow: '3px 3px 5px -1px rgb(0 0 0 / 20%), 0px 1px 1px 0px rgb(0 0 0 / 14%), 0px 1px 3px 0px rgb(0 0 0 / 12%) !important'
    },
    modalheader: {
        display: 'flex',
        alignItems: 'center',
        padding: '0% 5% 8% 5%',
        "& img": {
            width: '40px',
            height: '40px'
        }
    },
    modalheaderText: {
        paddingLeft: '5%',
        alignItems: 'center'
    },
    imgback: {
        width: '45px',
        height: '40px',
        background: '#F4EEFF',
        borderRadius: '50%',
        textAlign: 'center',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center'

    },
    modalbody: {
        display: 'flex',
        alignItems: 'center',
        padding: '2% 0% 2% 5%',
        borderTop: '1px solid #d9d7d7'
    },
    walletimg: {
        width: '25px',
        height: '25px'
    },
    connectBtn: {
        color: '#8551E6',
        borderRadius: '100px !important',
        background: 'lightgrey',
        border: '1px solid #7B61FF !important',
        "& :hover": {
            background: 'white !important'
        },
        height: '30px  !important',
        padding: '2px 15px 0 15px  !important',
        textTransform: 'capitalize  !important'
    },
    modalbodyText: {
        display: 'flex',
        alignItems: 'center',
        width: '100%',
        justifyContent: 'space-between',
        "& h3": {
            paddingLeft: '15px'
        }
    },
    connectButton: {
        color: '#8551E6',
        borderRadius: '100px !important',
        background: '#F4EEFF !important',
        border: 'none',
        height: '30px  !important',
        padding: '2px 10px 0 10px  !important',
        textTransform: 'capitalize  !important'
    },
    modal: {
        overflow: 'scroll !important'
    },
    showMoreBtn: {
        color: '#8551E6',
        borderRadius: '100px !important',
        background: 'white !important',
        border: '2px solid #7B61FF !important',
        padding: '2px 20px 0 20px  !important',
        textTransform: 'capitalize  !important'
    },
    showmorediv: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '5% 0% 2% 5%',
        borderTop: '1px solid #d9d7d7'
    },
    close: {
        display: 'flex',
        justifyContent: 'end',
        color: '#6549F6'
    }
})

export default componentStyles
