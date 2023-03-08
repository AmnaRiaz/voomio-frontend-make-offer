const componentStyles = () => ({
  header: {
    background: "#250C50 !important",
    // background: "#391578 !important",
    // background: "#4914a3 !important",
    // background: "#1d77df !important",
    height: "80px",
    "& .MuiToolbar-regular": {
      height: "100%"
    },
    "@media (max-width: 1024px)": {
      height: "70px"
    },
    "@media (max-width: 768px)": {
      height: "60px"
    }
  },
  headerpart: {
    maxWidth: "1500px",
    // maxWidth: "1366px",
    width: "100%",
    margin: "auto"
  },
  containerRoot: {
    width: "100%",
    height: "100%",
    // padding: "0px 50px",
    paddingLeft: "3rem",
    paddingRight: "2.5rem",
    "@media (max-width: 1024px)": {
      paddingLeft: "2rem",
      paddingRight: "1.5rem"
    },
    "@media (max-width: 768px)": {
      paddingLeft: "2rem",
      paddingRight: "1.5rem"
    }
  },
  headeritem: {
    width: "100%",
    height: "100%",
    display: "flex",
    alignItems: "center",
    justifyContent: 'space-evenly',
    "& h3, & h2": {
      paddingRight: '1rem',
      fontWeight: 'bold'
    }
  },
  walletconnect: {
    width: "100%",
    height: "100%",
    display: "flex",
    alignItems: "center",
    justifyContent: 'end'
  },
  logoitem: {
    // width: "100%",
    marginRight: "32px !important",
    height: "100%",
    display: "flex",
    alignItems: "center",
    cursor: "pointer",
    "& h1": {
      paddingLeft: '0.5rem',
      fontWeight: "bold !important"
    },
    "& h2": {
      paddingLeft: '0.5rem'
    }
  },

  logo: {
    width: "46px",
    "@media (max-width: 1024px)": {
      width: "40px"

    },
    "@media (max-width: 768px)": {
      width: "35px"
    }
  },
  root: {
    padding: '0px 5px',
    display: 'flex',
    alignItems: 'center',
    width: '100%',
    border: '2px solid #6549F6',
    borderRadius: '9999px !important',
    "@media (max-width: 1024px)": {
      padding: '0px 0px'
    },
    "@media (max-width: 768px)": {
      padding: '0px 10px'
    }
  },
  input: {
    flex: 1,
    "& fieldset": {
      border: '0px !important'
    },
    "& input": {
      padding: '10px !important',
      borderRadius: '100px !important'
    }
  },
  iconButton: {
    padding: 10,
    "@media (max-width: 1024px)": {
      padding: 5
    },
    "@media (max-width: 768px)": {
      padding: 2
    },
    "& svg": {
      color: "#7b61ff !important"
    }
  },
  divider: {
    height: 28
    // margin: 4
  },
  select: {
    "& fieldset": {
      display: 'none'
    },
    "& svg": {
      color: 'black !important'
    },
    "& .MuiOutlinedInput-root": {
      "& .MuiOutlinedInput-input": {
        padding: '8px 14px !important',
        paddingRight: '32px !important',
        color: 'black !important',
        fontWeight: 'bold'
      }
    }
  },
  blockchainIcon: {
    width: "22px !important",
    fontWeight: "700 !important",
    fontSize: "18px !important",
    lineHeight: "120% !important"
  },
})

export const styles = {
  cartDrawer: {
    ".MuiPaper-root": {
      height: "95%",
      top: "2.5%",
      // color: "#000000",
      width: "400px",
      borderRadius: "15px",
      padding: "24px",
      right: "30px"
    }
  },
  cartHeader: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between"
  },
  cartHeaderTitle: {
    fontSize: "20px",
    color: "#000000",
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between"
  },
  cartBoxClose: {
    cursor: "pointer",
    color: "#000000"
  },
  emptyCart: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  purchaseButton: {
    padding: "17px 24px",
    fontSize: "16px",
    color: "#FFFFFF",
    borderRadius: "12px",
    background: "#2081e2 !important",
    height: "50px",
    "&.Mui-disabled": {
      opacity: "0.5",
      color: "#FFFFFF"
    }
  },
  walletDrawer: {
    ".MuiBackdrop-root": {
      marginTop: "80px",
      "@media (max-width: 1024px)": {
        marginTop: "70px"
      },
      "@media (max-width: 768px)": {
        marginTop: "60px"
      }
    },
    ".MuiPaper-root": {
      marginTop: "80px",
      width: "400px",
      "@media (max-width: 1024px)": {
        marginTop: "70px",
        width: "400px"
      },
      "@media (max-width: 768px)": {
        marginTop: "60px",
        width: "300px"
      }
    }
  },
  walletDrawerHeader: {
    padding: "20px",
    color: "#000000",
    display: "flex",
    fontSize: "20px",
    flexDirection: "row",
    alignItems: "center",
    "& svg": {
      fontSize: "32px"
    }
  },
  walletDrawerContent: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    padding: "20px"
  },
  walletDrawerContentList: {
    width: "100%",
    border: "1px solid #e5e8eb",
    borderRadius: "10px"
  },
  walletDrawerList: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    padding: "15px",
    justifyContent: "space-between",
    border: "none",
    borderBottom: "1px solid #e5e8eb",
    "&:hover": {
      cursor: "pointer",
      boxShadow: "#04111d40 0px 0px 8px 0px"
    }
  },
  walletDrawerListItem: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    "& img": {
      width: "30px",
      height: "30px"
    }
  },
  popularBadge: {
    color: "#FFFFFF",
    padding: "4px 8px",
    fontSize: "14px",
    background: "#2081e2",
    borderRadius: "10px"
  },
  profileMenu: {
    mt: "50px",
    " .MuiList-root": {
      py: "0px !important",
      border: "none !important"
    }
  },
}

export default componentStyles
