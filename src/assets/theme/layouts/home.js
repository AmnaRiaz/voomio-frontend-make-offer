const componentStyles = (theme) => ({
  bgDefault: {
    backgroundColor: theme.palette.dark.main
  },
  mainContent: {
    width: "100%",
    height: "100%",
    paddingTop: "80px",
    "@media (max-width: 1024px)": {
      paddingTop: "70px"
    },
    "@media (max-width: 768px)": {
      paddingTop: "60px"
    }
  },
  pageroot: {
    width: "100%",
    height: "100%",
  }
})

export default componentStyles
