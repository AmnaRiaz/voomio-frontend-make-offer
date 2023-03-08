import React, { Fragment, useEffect, useRef, useState } from "react"
import { makeStyles } from "@mui/styles"
import {
  AppBar, Grid, Container, Toolbar, Paper, IconButton, Button, Box, Typography,
  MenuItem, Avatar, Tooltip, Menu, Badge, Drawer, Divider, TextField, Accordion,
  AccordionSummary, AccordionDetails, Fade, InputAdornment, Popper, Skeleton, CircularProgress
} from "@mui/material"
import Media from "react-media"
import componentStyles, { styles } from "../../assets/theme/components/header"
import BtncomponentStyles from "../../assets/theme/components/button"
import tableStyles from "../../assets/theme/views/profile/profileexplore"
import NFTcheck from "../../assets/image/views/profile/collection/NFTcheck.svg";

import { Favorite, Logout, Person, Settings, Close, ExpandMore, Info, Notifications, Search, ShoppingCart, SendIcon, Collections } from "@mui/icons-material"
import { useDispatch, useSelector } from "react-redux"
import { notification, chainList } from "/src/utils/utility"
import WalletDrawerCmp from "./WalletDrawer"
import { searchCollectionAndNft } from "/src/redux/actions/main"
import Logo from "/src/assets/image/component/headers/logo.svg"
import { getCoinIcons, getRealPrice, getUnit, replaceIpfsUrl, sliceLongString1 } from "../../utils/utility"
import { setCartNfts, setAddCartBoxState, setAddedItemsTotalPrice } from "../../redux/actions/nfts"
import { GridView } from "@mui/icons-material"
import ImageIcon from '@mui/icons-material/Image';
import { MenuBar } from "./Menu/Menu"
import HighlightOffIcon from '@mui/icons-material/HighlightOff';
import RemoveIcon from '@mui/icons-material/Remove';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import { Stack } from "@mui/system"
import { useNavigate } from "react-router-dom"
import Loading from "../loading/Loading"

const useStyles = makeStyles(componentStyles)
const buttonuseStyles = makeStyles(BtncomponentStyles)
const tableuseStyles = makeStyles(tableStyles``)

const profileMenu = [
  { title: 'Profile', navlink: "/profile", icon: <Person /> },
  // { title: 'Favorites', navlink: "/favorite", icon: <Favorite /> },
  // { title: 'My collections', navlink: "/my-collections", icon: <GridOn /> },
  { title: 'Settings', navlink: "/settings", icon: <Settings /> },
  // { title: 'Language' },
  // { title: "Favourite", navlink: "/favourites", icon: }
  { title: 'Logout', navlink: "/logout", icon: <Logout /> }
]
const convertFormatedDigit = (orgNumber, floor = 2, blockchain) => {
  const realNumber = getRealPrice(orgNumber, blockchain) === "no certain" ? 0 : getRealPrice(orgNumber, blockchain);
  if (realNumber < 1000) {
    return realNumber;
  }
  else if (realNumber / 1000 < 100) {
    return (realNumber / 1000).toFixed(floor) + 'k';
  } else {
    return (realNumber / 1000000).toFixed(floor) + 'm';
  }
}

export default function Header() {

  const classes = useStyles()
  const btnclasses = buttonuseStyles()
  const tclasses = tableuseStyles()
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const [jpgcount, setJpgCount] = useState(0);
  const [loading, setLoading] = useState(true)

  const userData = useSelector(state => state.user)
  const walletData = useSelector(state => state.wallet)
  const [walletAddress, setWalletAddress] = useState(null)
  const [anchorElUser, setAnchorElUser] = useState(null)
  const [searchdata, setSearchdata] = useState({})
  const [totalPrice, setTotalPrice] = useState(0);
  const [wallet, setWallet] = useState("")
  const [result, setResult] = useState([])
  const [open, setOpen] = useState(false)

  const [search, setSearch] = useState('')
  const searchRef = useRef(null);

  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget)
  }

  const handleCloseUserMenu = (item) => {
    if (item.navlink === "/logout") {
      localStorage.clear()
      window.location.href = "/"
    } else {
      if (item.navlink === "/profile") {
        navigate("/profile/" + userData?.user?._id)
      } else {
        navigate(item.navlink)
      }
    }
    setAnchorElUser(null)
  }

  const onpush = (data) => {
    if (data.auth && walletAddress === null) {
      notification("Please connect wallet!", "error")
      toggleWalletDrawer(true)
      return false
    }
    navigate(data.navlink)
  }

  const getAccountsAndCollections = async (val) => {
    setSearch(val)
    setLoading(true)
    setOpen(true)
    const res = await searchCollectionAndNft({
      limit: 100,
      query: {
        nameQuery: val
      }
    });
    if (res?.data) {
      setResult(res?.data)
    }
    setLoading(false)
  }

  const goCollectionDetail = (id) => {
    navigate("/collection/" + result.collection[id]._id)
    setOpen(false)
  }
  const goUserDetail = (id) => {
    navigate("/profile/" + result.user[id]._id)
    setOpen(false)
  }
  const goNftDetail = (id) => {
    navigate('/asset/' + result.items[id]._id)
    setOpen(false)
  }

  const [cartDrawerOpen, setCartDrawerOpen] = useState(false)
  const [notiDrawerOpen, setNotiDrawerOpen] = useState(false)
  const [walletDrawerOpen, setWalletDrawerOpen] = useState(false)
  const [opencount, setOpenCount] = useState(0)
  const [solcount, setSolCount] = useState(0)
  const [polcount, setPolCount] = useState(0)
  const jpgcartNfts = useSelector(state => state.nfts.jpgcartNfts);
  const opencartNfts = useSelector(state => state.nfts.opencartNfts);
  const polycartNfts = useSelector(state => state.nfts.polycartNfts);
  const solcartNfts = useSelector(state => state.nfts.solcartNfts);
  const boxstate = useSelector(state => state.nfts.boxstate);
  const jpgprice = useSelector(state => state.nfts.jpgprice);
  const solprice = useSelector(state => state.nfts.solprice);
  const polyprice = useSelector(state => state.nfts.polyprice);
  const openseaprice = useSelector(state => state.nfts.openseaprice);

  const toggleCartDrawer = (para) => {
    setCartDrawerOpen(para)
  }

  const toggleNotificationDrawer = (open) => {
    setNotiDrawerOpen(open)
  }

  const toggleWalletDrawer = (open) => {
    setWalletDrawerOpen(open)
  }

  const clearjpg = () => {
    localStorage.setItem('jpgcartItems', JSON.stringify([]));
    dispatch(setCartNfts({
      jpgcartNfts: []
    }))
    dispatch(setAddedItemsTotalPrice({
      jpgprice: 0,
    }))
  }
  const clearopen = () => {
    localStorage.setItem('opencartItems', JSON.stringify([]));
    dispatch(setCartNfts({
      opencartNfts: []
    }))
    dispatch(setAddedItemsTotalPrice({
      openseaprice: 0
    }))
  }
  const clearsol = () => {
    localStorage.setItem('solcartItems', JSON.stringify([]));
    dispatch(setCartNfts({
      solcartNfts: []
    }))
    dispatch(setAddedItemsTotalPrice({
      solprice: 0
    }))
  }
  const clearpoly = () => {
    localStorage.setItem('polycartItems', JSON.stringify([]));
    dispatch(setCartNfts({
      polycartNfts: []
    }))
    dispatch(setAddedItemsTotalPrice({
      polyprice: 0
    }))
  }

  const addOrRemoveCart = (item) => {
    let jpgadded = JSON.parse(localStorage.getItem('jpgcartItems') || '[]');
    let openadded = JSON.parse(localStorage.getItem('opencartItems') || '[]');
    let soladded = JSON.parse(localStorage.getItem('solcartItems') || '[]');
    let polyadded = JSON.parse(localStorage.getItem('polycartItems') || '[]');
    if (item.platform === "jpg.store") {
      const ids = jpgadded.map((i) => i.id);
      const id = item.id;
      if (ids.indexOf(id) > -1) {
        jpgadded = jpgadded.filter((i) => i.id !== id);
      } else {
        jpgadded.push({
          name: item.name,
          price: item.price,
          blockchain: item.blockchain,
          image: replaceIpfsUrl(item.imageUrl),
          platform: item.platform,
          id: id
        })
        dispatch(setAddCartBoxState({
          boxstate: true
        }))
      }
      priceCalculate(jpgadded);
      localStorage.setItem('jpgcartItems', JSON.stringify(jpgadded));
      dispatch(setCartNfts({
        jpgcartNfts: jpgadded
      }))
    } else if (item.platform === "opensea") {
      const ids = openadded.map((i) => i.id);
      const id = item.id;
      if (ids.indexOf(id) > -1) {
        openadded = openadded.filter((i) => i.id !== id);
      } else {
        openadded.push({
          name: item.name,
          price: item.price,
          blockchain: item.blockchain,
          image: replaceIpfsUrl(item.imageUrl),
          platform: item.platform,
          id: id
        })
        dispatch(setAddCartBoxState({
          boxstate: true
        }))
      }
      priceCalculate(openadded);
      localStorage.setItem('opencartItems', JSON.stringify(openadded));
      dispatch(setCartNfts({
        opencartNfts: openadded
      }))
    } else if (item.platform === "solanart") {
      const ids = soladded.map((i) => i.id);
      const id = item.id;
      if (ids.indexOf(id) > -1) {
        soladded = soladded.filter((i) => i.id !== id);
      } else {
        soladded.push({
          name: item.name,
          price: item.price,
          blockchain: item.blockchain,
          image: replaceIpfsUrl(item.imageUrl),
          platform: item.platform,
          id: id
        })
        dispatch(setAddCartBoxState({
          boxstate: true
        }))
      }
      priceCalculate(soladded);
      localStorage.setItem('solcartItems', JSON.stringify(soladded));
      dispatch(setCartNfts({
        solcartNfts: soladded
      }))
    } else if (item.platform === "nftrade.com") {
      const ids = polyadded.map((i) => i.id);
      const id = item.id;
      if (ids.indexOf(id) > -1) {
        polyadded = polyadded.filter((i) => i.id !== id);
      } else {
        polyadded.push({
          name: item.name,
          price: item.price,
          blockchain: item.blockchain,
          image: replaceIpfsUrl(item.imageUrl),
          platform: item.platform,
          id: id
        })
        dispatch(setAddCartBoxState({
          boxstate: true
        }))
      }
      priceCalculate(polyadded);
      localStorage.setItem('polycartItems', JSON.stringify(polyadded));
      dispatch(setCartNfts({
        polycartNfts: polyadded
      }))
    }
  }

  const priceCalculate = (data) => {
    var jpgprice = 0, openseaprice = 0, solprice = 0, polyprice = 0;
    for (let i = 0; i < data.length; i++) {
      if (data[i].platform === "jpg.store") {
        jpgprice += Number(getRealPrice(data[i].price, data[i].blockchain));
      } else if (data[i].platform === "opensea") {
        openseaprice += Number(getRealPrice(data[i].price, data[i].blockchain));
      } else if (data[i].platform === "solanart") {
        solprice += Number(getRealPrice(data[i].price, data[i].blockchain));
      } else if (data[i].platform === "nftrade.com") {
        polyprice += Number(getRealPrice(data[i].price, data[i].blockchain));
      }
    }
    dispatch(setAddedItemsTotalPrice({
      jpgprice: jpgprice,
      openseaprice: openseaprice,
      solprice: solprice,
      polyprice: polyprice
    }))
  }
  useEffect(() => {
    let jpgdata = JSON.parse(localStorage.getItem('jpgcartItems') || '[]');
    let opendata = JSON.parse(localStorage.getItem('opencartItems') || '[]');
    let soldata = JSON.parse(localStorage.getItem('solcartItems') || '[]');
    let poldata = JSON.parse(localStorage.getItem('polycartItems') || '[]');
    var jpgprice = 0, openseaprice = 0, solprice = 0, polyprice = 0;
    for (let i = 0; i < jpgdata.length; i++) {
      jpgprice += Number(getRealPrice(jpgdata[i].price, jpgdata[i].blockchain));
    }
    for (let i = 0; i < opendata.length; i++) {
      openseaprice += Number(getRealPrice(opendata[i].price, opendata[i].blockchain));
    }
    for (let i = 0; i < soldata.length; i++) {
      solprice += Number(getRealPrice(soldata[i].price, soldata[i].blockchain));
    }
    for (let i = 0; i < poldata.length; i++) {
      polyprice += Number(getRealPrice(poldata[i].price, poldata[i].blockchain));
    }
    dispatch(setAddedItemsTotalPrice({
      jpgprice: jpgprice,
      openseaprice: openseaprice,
      solprice: solprice,
      polyprice: polyprice
    }))
  }, [])
  useEffect(() => {
    jpgcartNfts.map((item, key) => {
      setJpgCount(key)
    })
    opencartNfts.map((item, key) => {
      setOpenCount(key)
    })
    solcartNfts.map((item, key) => {
      setSolCount(key)
    })
    polycartNfts.map((item, key) => {
      setPolCount(key)
    })
  }, [jpgcartNfts, opencartNfts, solcartNfts, polycartNfts])

  const shoppingCartDrawer = () => (
    <Box>
      <Box mb={2} sx={styles.cartHeader}>
        <Box sx={styles.cartHeaderTitle}>
          <Box mr={1} component={"span"}>Your cart</Box>
          <Info />
        </Box>
        <Box sx={styles.cartBoxClose} onClick={() => { toggleCartDrawer(false) }}><Close /></Box>
      </Box>
      <Divider />
      {
        cartNfts.length > 0 ? (
          <React.Fragment>
            <Box
              display={'flex'}
              justifyContent={'space-between'}
              padding={'20px'}
              color={'black'}
            >
              <Box component={"span"}>{cartNfts.length} items</Box>
              <Box component={"span"} onClick={() => clearAll()} cursor={'pointer'}>Clear all</Box>
            </Box>
            {cartNfts.map((item, index) => {
              return (
                <Box key={index} display={'flex'} alignItems={'center'}>
                  <Box>
                    <Box
                      component={"img"}
                      sx={{ width: "72px", height: "72px", marginRight: "10px", borderRadius: "10px" }}
                    ></Box>
                  </Box>
                  <Box>
                    <Box component={"span"}>{item.name}</Box>
                    <Box sx={{ display: "flex", alignItem: "center" }}>
                      <Box mr={1} component="img" src={getCoinIcons(item.blockchain)} className={classes.blockchainIcon} ></Box>
                      <Typography variant="h5" color={'#000'}>{getRealPrice(item.price, item.blockchain)}</Typography>
                    </Box>
                  </Box>
                </Box>
              )
            })}
            <Divider />
            <Box>
              <Box
                display={'flex'}
                justifyContent={'space-between'}
                padding={'20px'}
                color={'black'}
              >
                <Box component={"span"}>Total price</Box>
                <Box component={"span"}>{price}</Box>
              </Box>
              <Box>
                <Accordion>
                  <AccordionSummary
                    expandIcon={<ExpandMore />}
                  >
                    <Typography>Send to a different wallet</Typography>
                  </AccordionSummary>
                  <AccordionDetails>
                    <TextField placeholder="e.g. 0x1ed3...." />
                  </AccordionDetails>
                </Accordion>
              </Box>
            </Box>
          </React.Fragment>
        ) : (
          <React.Fragment>
            <Box sx={styles.emptyCart}>
              <Box my={10} component={"span"}>Add items to get started.</Box>
              <Box><Button disabled sx={styles.purchaseButton} variant="contained" >Complete purchase</Button></Box>
            </Box>
          </React.Fragment>
        )
      }
    </Box>
  )

  const notificationCartDrawer = () => (
    <Box sx={styles.cartBox}>
      <Box mb={2} sx={styles.cartHeader}>
        <Box sx={styles.cartHeaderTitle}>
          <Box mr={1} component={"span"}>New notification</Box>
        </Box>
        <Box sx={styles.cartBoxClose} onClick={() => { toggleNotificationDrawer(false) }}><Close /></Box>
      </Box>
      <Divider />
      <Box sx={styles.emptyCart}>
        <Box my={10} component={"span"}>Empty notification</Box>
      </Box>
    </Box>
  )

  const handleSearch = (data, type) => {
    if (type === "accounts") {
      navigate("/profile/" + data._id)
    } else {
      navigate("/collection/" + data._id)
    }
  }

  useEffect(() => {
    if (walletData.address) {
      let wallet = walletData.address
      let address = wallet.slice(0, 5) + '..' + wallet.slice(-3)
      setWalletAddress(address)
    }
    if (walletData.network) {
      setWallet(walletData.network.toLowerCase())
    }
  }, [walletData])

  return (
    <>
      <Fade in={boxstate} >
        <Grid sx={{
          overflowY: 'scroll',
          position: 'fixed',
          transition: '2s',
          zIndex: '99',
          height: '92vh',
          top: '8vh',
          border: '1px solid #9b9b9b',
          right: '0px',
          width: '17vw',
          background: 'white',
          borderRadius: "5px",
          padding: "24px"
        }}>
          <Box>
            <Box mb={2} sx={styles.cartHeader}>
              <Box sx={styles.cartHeaderTitle}>
                <Box mr={1} component={"span"}>Your cart</Box>
                <Info />
              </Box>
              <Box sx={styles.cartBoxClose} onClick={() => {
                dispatch(setAddCartBoxState({
                  boxstate: false
                }))
              }}><Close /></Box>
            </Box>
            <Divider />
            {
              (jpgcartNfts.length + opencartNfts.length + solcartNfts.length + polycartNfts.length) > 0 ?
                <Box>
                  {
                    walletData?.wallet === "Nami" && jpgcartNfts.length > 0 && (
                      <Box sx={{ display: "flex", flexFlow: "column", rowGap: "10px" }}>
                        <Box
                          display={'flex'}
                          justifyContent={'space-between'}
                          padding={'20px'}
                          color={'black'}
                        >
                          <Box component={"span"}>{jpgcartNfts.length} items</Box>
                          <Box component={"span"} sx={{ cursor: 'pointer' }} onClick={() => clearjpg()}>Clear all</Box>
                        </Box>
                        {jpgcartNfts.map((item, index) => {
                          if (item.platform === "jpg.store") {
                            return (
                              <Box key={index} display={'flex'} alignItems={'center'} justifyContent="space-between">
                                <Box display={'flex'} alignItems={'center'}>
                                  <Box sx={{ position: "relative" }}>
                                    <Box
                                      component={"img"}
                                      width={'72px'}
                                      height={'72px'}
                                      marginRight={'10px'}
                                      sx={{ borderRadius: "10px" }}
                                      src={item.image}
                                    />
                                  </Box>
                                  <Box>
                                    <Box component={"span"}>{item.name}</Box>
                                    <Box sx={{ display: "flex", alignItems: "flex-end", rowGap: "10px" }}>
                                      <Box mr={1} component="img" src={getCoinIcons(item.blockchain)} className={classes.blockchainIcon} ></Box>
                                      <Typography variant="h5" color={'#000'}>{getRealPrice(item.price, item.blockchain)}</Typography>
                                    </Box>
                                  </Box>
                                </Box>
                                <Box
                                  display="flex"
                                  justifyContent="right"
                                  alignItems={"center"}>
                                  <DeleteForeverIcon sx={{ cursor: "pointer", transition: "0.4s", "&:hover": { color: "#f5365c" } }} onClick={() => addOrRemoveCart(item)}></DeleteForeverIcon>
                                </Box>
                              </Box>
                            )
                          }
                        })}
                        <Box>
                          <Box
                            display={'flex'}
                            justifyContent={'space-between'}
                            padding={'20px'}
                            color={'black'}
                          >
                            <Box component={"span"}>Total price</Box>
                            <Box component={"span"}>{jpgprice}</Box>
                          </Box>
                          {/* <Box>
                          <Accordion>
                            <AccordionSummary
                              expandIcon={<ExpandMore />}
                            >
                              <Typography>Send to a different wallet</Typography>
                            </AccordionSummary>
                            <AccordionDetails>
                              <TextField placeholder="e.g. 0x1ed3...." />
                              <Button variant="contained" sx={{ float: 'right', marginTop: '5px', marginBottom: '5px', marginRight: '17px' }} onClick={() => { alert('wallet send') }}>
                                Send
                              </Button>
                            </AccordionDetails>
                          </Accordion>
                        </Box> */}
                        </Box>
                        {
                          jpgcount === -1 ?
                            <Box display="flex" justifyContent={"center"} alignItems="center"><Button disabled sx={styles.purchaseButton} variant="contained" >Purchase</Button></Box>
                            : <Box display="flex" justifyContent={"center"} alignItems="center"><Button sx={styles.purchaseButton} variant="contained" >Purchase</Button></Box>
                        }
                        <Divider />
                      </Box>
                    )
                  }
                  {
                    walletData?.wallet === "Metamask" && opencartNfts.length > 0 && (
                      <Box sx={{ display: "flex", flexFlow: "column", rowGap: "10px" }}>
                        <Box
                          display={'flex'}
                          justifyContent={'space-between'}
                          padding={'20px'}
                          color={'black'}
                        >
                          <Box component={"span"}>{opencartNfts.length} items</Box>
                          <Box component={"span"} sx={{ cursor: 'pointer' }} onClick={() => clearopen()}>Clear all</Box>
                        </Box>
                        {opencartNfts.map((item, index) => {
                          if (item.platform === "opensea") {
                            return (
                              <Box key={index} display={'flex'} alignItems={'center'} justifyContent="space-between">
                                <Box display={'flex'} alignItems={'center'}>
                                  <Box sx={{ position: "relative" }}>
                                    <Box
                                      component={"img"}
                                      width={'72px'}
                                      height={'72px'}
                                      marginRight={'10px'}
                                      sx={{ borderRadius: "10px" }}
                                      src={item.image}
                                    />
                                  </Box>
                                  <Box>
                                    <Box component={"span"}>{item.name}</Box>
                                    <Box sx={{ display: "flex", alignItems: "flex-end", rowGap: "10px" }}>
                                      <Box mr={1} component="img" src={getCoinIcons(item.blockchain)} className={classes.blockchainIcon} ></Box>
                                      <Typography variant="h5" color={'#000'}>{getRealPrice(item.price, item.blockchain)}</Typography>
                                    </Box>
                                  </Box>
                                </Box>
                                <Box
                                  display="flex"
                                  justifyContent="right"
                                  alignItems={"center"}>
                                  <DeleteForeverIcon sx={{ cursor: "pointer", transition: "0.4s", "&:hover": { color: "#f5365c" } }} onClick={() => addOrRemoveCart(item)}></DeleteForeverIcon>
                                </Box>
                              </Box>
                            )
                          }
                        })}
                        <Box>
                          <Box
                            display={'flex'}
                            justifyContent={'space-between'}
                            padding={'20px'}
                            color={'black'}
                          >
                            <Box component={"span"}>Total price</Box>
                            <Box component={"span"}>{openseaprice}</Box>
                          </Box>
                          {/* <Box>
                        <Accordion>
                          <AccordionSummary
                            expandIcon={<ExpandMore />}
                          >
                            <Typography>Send to a different wallet</Typography>
                          </AccordionSummary>
                          <AccordionDetails>
                            <TextField placeholder="e.g. 0x1ed3...." />
                            <Button variant="contained" sx={{ float: 'right', marginTop: '5px', marginBottom: '5px', marginRight: '17px' }} onClick={() => { alert('wallet send') }}>
                              Send
                            </Button>
                          </AccordionDetails>
                        </Accordion>
                      </Box> */}
                        </Box>
                        {
                          opencount === -1 ?
                            <Box display="flex" justifyContent={"center"} alignItems="center"><Button disabled sx={styles.purchaseButton} variant="contained" >Purchase</Button></Box>
                            : <Box display="flex" justifyContent={"center"} alignItems="center"><Button sx={styles.purchaseButton} variant="contained" >Purchase</Button></Box>
                        }
                        <Divider />
                      </Box>
                    )
                  }
                  {
                    walletData?.wallet === "Phantom" && solcartNfts.length > 0 && (
                      <Box sx={{ display: "flex", flexFlow: "column", rowGap: "10px" }}>
                        <Box
                          display={'flex'}
                          justifyContent={'space-between'}
                          padding={'20px'}
                          color={'black'}
                        >
                          <Box component={"span"}>{solcartNfts.length} items</Box>
                          <Box component={"span"} sx={{ cursor: 'pointer' }} onClick={() => clearsol()}>Clear all</Box>
                        </Box>
                        {solcartNfts.map((item, index) => {
                          if (item.platform === "solanart") {
                            return (
                              <Box key={index} display={'flex'} alignItems={'center'} justifyContent="space-between">
                                <Box display={'flex'} alignItems={'center'}>
                                  <Box sx={{ position: "relative" }}>
                                    <Box
                                      component={"img"}
                                      width={'72px'}
                                      height={'72px'}
                                      marginRight={'10px'}
                                      sx={{ borderRadius: "10px" }}
                                      src={item.image}
                                    />
                                  </Box>
                                  <Box>
                                    <Box component={"span"}>{item.name}</Box>
                                    <Box sx={{ display: "flex", alignItems: "flex-end", rowGap: "10px" }}>
                                      <Box mr={1} component="img" src={getCoinIcons(item.blockchain)} className={classes.blockchainIcon} ></Box>
                                      <Typography variant="h5" color={'#000'}>{getRealPrice(item.price, item.blockchain)}</Typography>
                                    </Box>
                                  </Box>
                                </Box>
                                <Box
                                  display="flex"
                                  justifyContent="right"
                                  alignItems={"center"}>
                                  <DeleteForeverIcon sx={{ cursor: "pointer", transition: "0.4s", "&:hover": { color: "#f5365c" } }} onClick={() => addOrRemoveCart(item)}></DeleteForeverIcon>
                                </Box>
                              </Box>
                            )
                          }
                        })}
                        <Box>
                          <Box
                            display={'flex'}
                            justifyContent={'space-between'}
                            padding={'20px'}
                            color={'black'}
                          >
                            <Box component={"span"}>Total price</Box>
                            <Box component={"span"}>{solprice}</Box>
                          </Box>
                          {/* <Box>
                        <Accordion>
                          <AccordionSummary
                            expandIcon={<ExpandMore />}
                          >
                            <Typography>Send to a different wallet</Typography>
                          </AccordionSummary>
                          <AccordionDetails>
                            <TextField placeholder="e.g. 0x1ed3...." />
                            <Button variant="contained" sx={{ float: 'right', marginTop: '5px', marginBottom: '5px', marginRight: '17px' }} onClick={() => { alert('wallet send') }}>
                              Send
                            </Button>
                          </AccordionDetails>
                        </Accordion>
                      </Box> */}
                        </Box>
                        {
                          solcount === -1 ?
                            <Box display="flex" justifyContent={"center"} alignItems="center"><Button disabled sx={styles.purchaseButton} variant="contained" >Purchase</Button></Box>
                            : <Box display="flex" justifyContent={"center"} alignItems="center"><Button sx={styles.purchaseButton} variant="contained" >Purchase</Button></Box>
                        }
                        <Divider />
                      </Box>
                    )
                  }
                  {
                    walletData?.wallet === "Metamask" && polycartNfts.length > 0 && (
                      <Box sx={{ display: "flex", flexFlow: "column", rowGap: "10px" }}>
                        <Box
                          display={'flex'}
                          justifyContent={'space-between'}
                          padding={'20px'}
                          color={'black'}
                        >
                          <Box component={"span"}>{polycartNfts.length} items</Box>
                          <Box component={"span"} sx={{ cursor: 'pointer' }} onClick={() => clearpoly()}>Clear all</Box>
                        </Box>
                        {polycartNfts.map((item, index) => {
                          if (item.platform === "nftrade.com") {
                            return (
                              <Box key={index} display={'flex'} alignItems={'center'} justifyContent="space-between">
                                <Box display={'flex'} alignItems={'center'}>
                                  <Box sx={{ position: "relative" }}>
                                    <Box
                                      component={"img"}
                                      width={'72px'}
                                      height={'72px'}
                                      marginRight={'10px'}
                                      sx={{ borderRadius: "10px" }}
                                      src={item.image}
                                    />
                                  </Box>
                                  <Box>
                                    <Box component={"span"}>{item.name}</Box>
                                    <Box sx={{ display: "flex", alignItems: "flex-end", rowGap: "10px" }}>
                                      <Box mr={1} component="img" src={getCoinIcons(item.blockchain)} className={classes.blockchainIcon} ></Box>
                                      <Typography variant="h5" color={'#000'}>{getRealPrice(item.price, item.blockchain)}</Typography>
                                    </Box>
                                  </Box>
                                </Box>
                                <Box
                                  display="flex"
                                  justifyContent="right"
                                  alignItems={"center"}>
                                  <DeleteForeverIcon sx={{ cursor: "pointer", transition: "0.4s", "&:hover": { color: "#f5365c" } }} onClick={() => addOrRemoveCart(item)}></DeleteForeverIcon>
                                </Box>
                              </Box>
                            )
                          }
                        })}
                        <Box>
                          <Box
                            display={'flex'}
                            justifyContent={'space-between'}
                            padding={'20px'}
                            color={'black'}
                          >
                            <Box component={"span"}>Total price</Box>
                            <Box component={"span"}>{polyprice}</Box>
                          </Box>
                          {/* <Box>
                        <Accordion>
                          <AccordionSummary
                            expandIcon={<ExpandMore />}
                          >
                            <Typography>Send to a different wallet</Typography>
                          </AccordionSummary>
                          <AccordionDetails>
                            <TextField placeholder="e.g. 0x1ed3...." />
                            <Button variant="contained" sx={{ float: 'right', marginTop: '5px', marginBottom: '5px', marginRight: '17px' }} onClick={() => { alert('wallet send') }}>
                              Send
                            </Button>
                          </AccordionDetails>
                        </Accordion>
                      </Box> */}
                        </Box>
                        {
                          polcount === -1 ?
                            <Box display="flex" justifyContent={"center"} alignItems="center"><Button disabled sx={styles.purchaseButton} variant="contained" >Purchase</Button></Box>
                            : <Box display="flex" justifyContent={"center"} alignItems="center"><Button sx={styles.purchaseButton} variant="contained" >Purchase</Button></Box>
                        }
                        <Divider />
                      </Box>
                    )
                  }
                </Box> :
                <React.Fragment>
                  <Box sx={styles.emptyCart}>
                    <Box my={10} component={"span"}>Your Cart is empty. Fill it with NFTs and start collecting.
                    </Box>
                    {/* <Box><Button disabled sx={styles.purchaseButton} variant="contained" >Complete purchase</Button></Box> */}
                  </Box>
                </React.Fragment>
            }
          </Box>
        </Grid>
      </Fade>
      <AppBar id="mainHeader" className={classes.header} >
        <Toolbar disableGutters className={classes.headerpart} >
          <Container
            maxWidth={false}
            component={Grid}
            classes={{ root: classes.containerRoot }}
          >
            <Media queries={{
              small: "(max-width: 768px)",
              medium: "(min-width: 769px) and (max-width: 1199px)",
              large: "(min-width: 1200px)"
            }}>
              {matches => (
                <Fragment>
                  {matches.small &&
                    <Grid className={classes.headeritem} >
                      <Grid item xs={6} className={classes.logoitem} onClick={() => navigate("/")} >
                        <Box className={classes.logo} component='img' src={Logo.src} >
                        </Box>
                        <Typography variant="h2">VOOMIO</Typography>
                      </Grid>
                      <Grid item xs={6} className={classes.walletconnect}>
                        {/* <Drawer
                          sx={styles.cartDrawer}
                          anchor={"right"}
                          open={cartDrawerOpen}
                          onClose={() => { toggleCartDrawer(false) }}
                        >
                          {shoppingCartDrawer()}
                        </Drawer> */}
                        <Drawer
                          sx={styles.cartDrawer}
                          anchor={"right"}
                          open={notiDrawerOpen}
                          onClose={() => { toggleNotificationDrawer(false) }}
                        >
                          {notificationCartDrawer()}
                        </Drawer>
                        <WalletDrawerCmp open={walletDrawerOpen} toggleDrawer={toggleWalletDrawer} />
                        {walletAddress ? (
                          <React.Fragment>
                            <Box>
                              <IconButton
                                size="large"
                                aria-label="show 17 new notifications"
                                color="inherit"
                                onClick={() => { toggleNotificationDrawer(true) }}
                              >
                                <Badge badgeContent={0} color="error">
                                  <Notifications />
                                </Badge>
                              </IconButton>
                            </Box>
                            <Box>
                              <IconButton
                                size="large"
                                color="inherit"
                                onClick={() => { alert() }}
                              >
                                <Badge badgeContent={
                                  walletData?.wallet === "Metamask" ? (polycartNfts.length + opencartNfts.length) : walletData?.wallet === "Phantom" ? solcartNfts.length : walletData?.wallet === "Nami" ? jpgcartNfts.length : ""
                                } color="error">
                                  <ShoppingCart />
                                </Badge>
                              </IconButton>
                            </Box>
                            <Box>
                              <Tooltip title="Open settings">
                                <IconButton
                                  size="large"
                                  onClick={handleOpenUserMenu}
                                  color="white"
                                >
                                  <Avatar alt="User Profile" src={userData.user?.profileUrl} />
                                  {/* <AccountCircle sx={{ fontSize: "40px" }} /> */}
                                </IconButton>
                              </Tooltip>
                              <Menu
                                sx={styles.profileMenu}
                                anchorEl={anchorElUser}
                                anchorOrigin={{
                                  vertical: 'top',
                                  horizontal: 'right',
                                }}
                                keepMounted
                                transformOrigin={{
                                  vertical: 'top',
                                  horizontal: 'right',
                                }}
                                open={Boolean(anchorElUser)}
                                onClose={handleCloseUserMenu}
                              >
                                {profileMenu.map((item, index) => (
                                  <MenuItem key={index} sx={{ borderBottom: "1px solid #00000033", py: "13px", color: "black !important", alignItems: "center" }} onClick={() => { handleCloseUserMenu(item) }}>
                                    <Box mr={1} sx={{ display: "flex" }} component={"span"}>{item.icon}</Box>
                                    <Typography sx={{ color: "black !important" }} textAlign="center">{item.title}</Typography>
                                  </MenuItem>
                                ))}
                              </Menu>
                            </Box>
                          </React.Fragment>
                        ) : ""}
                        <Button onClick={() => { toggleWalletDrawer(true) }} variant="contained" classes={{ root: btnclasses.buttonFillPrimary }}>
                          {walletAddress === null ? "Connect Wallet" : walletAddress}
                        </Button>
                      </Grid>
                    </Grid>
                  }
                  {matches.medium &&
                    <Grid className={classes.headeritem} >
                      <Grid md={2} item className={classes.logoitem} onClick={() => navigate("/")} >
                        <Box className={classes.logo} component='img' src={Logo.src} >
                        </Box>
                        <Typography variant="h2">VOOMIO</Typography>
                      </Grid>
                      <Grid md={10} item className={classes.headeritem} >
                        {/* {
                          MenuList.map((item, i) => (
                            <Typography sx={{ cursor: "pointer" }} key={i} onClick={() => onpush(item)} variant="h3">{item.title}</Typography>
                          ))
                        } */}
                        <MenuBar onpush={onpush} />
                        {/* <Drawer
                          sx={styles.cartDrawer}
                          anchor={"right"}
                          open={cartDrawerOpen}
                          onClose={() => { toggleCartDrawer(false) }}
                        >
                          {shoppingCartDrawer()}
                        </Drawer>
                        <Drawer
                          sx={styles.cartDrawer}
                          anchor={"right"}
                          open={notiDrawerOpen}
                          onClose={() => { toggleNotificationDrawer(false) }}
                        >
                          {notificationCartDrawer()}
                        </Drawer> */}
                        <WalletDrawerCmp open={walletDrawerOpen} toggleDrawer={toggleWalletDrawer} />

                        {walletAddress ? (
                          <React.Fragment>
                            <Box>
                              <IconButton
                                size="large"
                                aria-label="show 17 new notifications"
                                color="inherit"
                                onClick={() => { toggleNotificationDrawer(true) }}
                              >
                                <Badge badgeContent={0} color="error">
                                  <Notifications />
                                </Badge>
                              </IconButton>
                            </Box>
                            <Box>
                              {/* <IconButton
                                size="large"
                                color="inherit"
                                onClick={() => { alert(true) }}
                              >
                                <Badge badgeContent={cartNfts.length} color="error">
                                  <ShoppingCart />
                                </Badge>
                              </IconButton> */}
                            </Box>
                            <Box>
                              <Tooltip title="Open settings">
                                <IconButton
                                  size="large"
                                  onClick={handleOpenUserMenu}
                                  color="white"
                                >
                                  <Avatar alt="User Profile" src={userData.user?.profileUrl} />
                                  {/* <AccountCircle sx={{ fontSize: "40px" }} /> */}
                                </IconButton>
                              </Tooltip>
                              <Menu
                                sx={styles.profileMenu}
                                anchorEl={anchorElUser}
                                anchorOrigin={{
                                  vertical: 'top',
                                  horizontal: 'right',
                                }}
                                keepMounted
                                transformOrigin={{
                                  vertical: 'top',
                                  horizontal: 'right',
                                }}
                                open={Boolean(anchorElUser)}
                                onClose={handleCloseUserMenu}
                              >
                                {profileMenu.map((item, index) => (
                                  <MenuItem sx={{ borderBottom: "1px solid #00000033", py: "13px", color: "black !important", alignItems: "center" }} key={index} onClick={() => { handleCloseUserMenu(item) }}>
                                    <Box mr={1} sx={{ display: "flex" }} component={"span"}>{item.icon}</Box>
                                    <Typography sx={{ color: "black !important" }} textAlign="center">{item.title}</Typography>
                                  </MenuItem>
                                ))}
                              </Menu>
                            </Box>
                          </React.Fragment>
                        ) : ""}
                        <Button onClick={() => { toggleWalletDrawer(true) }} variant="contained" classes={{ root: btnclasses.buttonFillPrimary }}>
                          {walletAddress === null ? "Connect Wallet" : walletAddress}
                        </Button>
                      </Grid>
                    </Grid>
                  }
                  {matches.large &&
                    <>
                      <Grid className={classes.headeritem} >
                        <Grid item md={1} lg={1} className={classes.logoitem} onClick={() => navigate("/")}  >
                          <Box className={classes.logo} component='img' src={Logo.src} >
                          </Box>
                          <Typography variant="h1">VOOMIO</Typography>
                        </Grid>
                        <Grid item md={5} lg={5} className={classes.headeritem} paddingRight="1.5rem" paddingLeft={"0.5rem"} >
                          <Paper className={classes.root} sx={{ position: 'relative' }}>
                            {/* <IconButton className={classes.iconButton} aria-label="menu">
                              <Search />
                            </IconButton> */}
                            <TextField
                              id="grouped-demo"
                              className={classes.input}
                              ref={searchRef}
                              value={search}
                              placeholder="Search items, collections and accounts"
                              onChange={(e) => {
                                getAccountsAndCollections(e.target.value)
                              }}
                              InputProps={{
                                startAdornment: <InputAdornment><Search /></InputAdornment>,
                                ...(Boolean(search) &&
                                {
                                  endAdornment: <InputAdornment>
                                    <IconButton onClick={() => { setSearch(''), setOpen(false) }}>
                                      <Close />
                                    </IconButton>
                                  </InputAdornment>
                                })
                              }}
                            />
                            <Popper sx={{ zIndex: 1100, width: '39%' }} open={open} anchorEl={searchRef.current} placement={'bottom-start'} transition>
                              {({ TransitionProps }) => (
                                <Fade {...TransitionProps} timeout={350}>
                                  <Paper sx={{ mt: 2, width: 1, padding: '1rem', height: 'auto', maxHeight: '35rem', overflowY: 'scroll', display: "flex", flexFlow: "column", rowGap: "20px" }}>
                                    {
                                      loading ? <Stack sx={{ height: "300px" }} direction="row" justifyContent={"center"} alignItems="center">
                                        <CircularProgress color="inherit" />
                                      </Stack> :
                                        <>
                                          <Stack direction="column" alignItems="flex-start" justifyContent={"center"} sx={{ width: "100%", rowGap: "5px" }}>
                                            <Typography variant="h4" sx={{ color: "#555 !important", fontWeight: "700" }}>COLLECTIONS</Typography>
                                            {
                                              result && result?.collection?.length ? result?.collection.map((item, index) => (
                                                <Stack direction="row" justifyContent="space-between" alignItem="center" sx={{ width: "100%", "&:hover": { background: "#AAA" }, transition: "0.4s", padding: "5px", cursor: "pointer", borderRadius: "12px" }} onClick={() => goCollectionDetail(index)}>
                                                  <Box display="flex" justifyContent={"left"} alignItems="center" sx={{ columnGap: "20px" }}>
                                                    <Box className={tclasses.namebox}>
                                                      <span className={tclasses.spanbox}>
                                                        <Box className={tclasses.imgbox} component="img" src={item.coverUrl}>
                                                        </Box>
                                                      </span>
                                                    </Box>
                                                    <Stack
                                                      direction="column"
                                                      justifyContent="center"
                                                      alignItems="flex-start"
                                                      sx={{ rowGap: "5px" }}
                                                    >
                                                      <Typography variant="h3" sx={{ color: "#333 !important", fontWeight: "600" }}>{item?.name}</Typography>
                                                      <Box display="flex" justifyContent={"left"} alignItems="center">
                                                        <Box className={tclasses.namebox} sx={{ width: "25px !important", height: "25px !important" }}>
                                                          <span className={tclasses.spanbox}>
                                                            <Box className={tclasses.imgbox} component="img" src={getCoinIcons(item?.blockchain)}>
                                                            </Box>
                                                          </span>
                                                        </Box>
                                                        <Box display="flex" alignItems="center" sx={{ height: "25px" }}>
                                                          <Typography variant="h3" sx={{ color: "#666 !important", fontWeight: "600" }}>
                                                            {item?.nfts.length} items</Typography>
                                                        </Box>
                                                      </Box>
                                                    </Stack>
                                                  </Box>
                                                  <Box display="flex" alignItems="center" justifyContent={"center"}>
                                                    <Typography variant="h3" sx={{ color: "#666 !important", fontWeight: "600" }}>
                                                      {convertFormatedDigit((item?.volume || 0), 2, item?.blockchain)} &nbsp;
                                                      {getUnit(item?.blockchain)}
                                                    </Typography>
                                                  </Box>
                                                </Stack>))
                                                : <Typography sx={{ p: 2 }}>No items found</Typography>
                                            }
                                          </Stack>
                                          <Stack direction="column" alignItems="flex-start" justifyContent={"center"} sx={{ width: "100%", rowGap: "5px" }}>
                                            <Typography variant="h4" sx={{ color: "#555 !important", fontWeight: "700" }}>ACCOUNTS</Typography>
                                            {
                                              result && result?.user?.length ? result.user.map((item, index) => (
                                                <Stack direction="row" justifyContent="space-between" alignItem="center" sx={{ width: "100%", "&:hover": { background: "#AAA" }, transition: "0.4s", padding: "5px", cursor: "pointer", borderRadius: "12px" }} onClick={() => goUserDetail(index)}>
                                                  <Box display="flex" justifyContent={"left"} alignItems="center" sx={{ columnGap: "20px" }}>
                                                    <Box className={tclasses.namebox}>
                                                      <span className={tclasses.spanbox}>
                                                        <Box className={tclasses.imgbox} component="img" src={item.profileUrl}>
                                                        </Box>
                                                      </span>
                                                    </Box>
                                                    <Stack
                                                      direction="column"
                                                      justifyContent="center"
                                                      alignItems="flex-start"
                                                      sx={{ rowGap: "5px" }}
                                                    >
                                                      <Typography variant="h3" sx={{ color: "#333 !important", fontWeight: "600" }}>{item?.displayName}</Typography>
                                                    </Stack>
                                                  </Box>
                                                </Stack>))
                                                : <Typography sx={{ p: 2 }}>No items found</Typography>
                                            }
                                          </Stack>
                                          <Stack direction="column" alignItems="flex-start" justifyContent={"center"} sx={{ width: "100%", rowGap: "5px" }}>
                                            <Typography variant="h4" sx={{ color: "#555 !important", fontWeight: "700" }}>ITEMS</Typography>
                                            {
                                              result && result?.items?.length ? result?.items.map((item, index) => (
                                                <Stack direction="row" justifyContent="space-between" alignItem="center" sx={{ width: "100%", "&:hover": { background: "#AAA" }, transition: "0.4s", padding: "5px", cursor: "pointer", borderRadius: "12px" }} onClick={() => goNftDetail(index)}>
                                                  <Box display="flex" justifyContent={"left"} alignItems="center" sx={{ columnGap: "20px" }}>
                                                    <Box className={tclasses.namebox}>
                                                      <span className={tclasses.spanbox}>
                                                        <Box className={tclasses.imgbox} component="img" src={item.imageUrl}>
                                                        </Box>
                                                      </span>
                                                    </Box>
                                                    <Stack
                                                      direction="column"
                                                      justifyContent="center"
                                                      alignItems="flex-start"
                                                      sx={{ rowGap: "5px" }}
                                                    >
                                                      <Box display="flex" alignItems="center">
                                                        <Typography variant="h3" sx={{ color: "#333 !important", fontWeight: "600" }}>{item?.name}
                                                        </Typography>
                                                        <Box ml={1} component="img" src={NFTcheck.src}></Box>
                                                      </Box>
                                                      <Box display="flex" justifyContent={"left"} alignItems="center">
                                                        <Typography variant="h3" sx={{ color: "#666 !important", fontWeight: "600" }}>{item?.collection[0].name}</Typography>
                                                      </Box>
                                                    </Stack>
                                                  </Box>
                                                </Stack>))
                                                : <Typography sx={{ p: 2 }}>No items found</Typography>
                                            }
                                          </Stack>
                                        </>
                                    }
                                  </Paper>
                                </Fade>
                              )}
                            </Popper>
                          </Paper>
                        </Grid>
                        <Grid item md={6} className={classes.headeritem} >
                          {/* <Drawer
                            sx={styles.cartDrawer}
                            anchor={"right"}
                            open={cartDrawerOpen}
                            onClose={() => { toggleCartDrawer(false) }}
                          >
                            {shoppingCartDrawer()}
                          </Drawer> */}
                          <Drawer
                            sx={styles.cartDrawer}
                            anchor={"right"}
                            open={notiDrawerOpen}
                            onClose={() => { toggleNotificationDrawer(false) }}
                          >
                            {notificationCartDrawer()}
                          </Drawer>
                          <WalletDrawerCmp open={walletDrawerOpen} toggleDrawer={toggleWalletDrawer} />
                          <MenuBar onpush={onpush} />
                          {walletAddress ? (
                            <React.Fragment>
                              <Box>
                                <IconButton
                                  size="large"
                                  aria-label="show 17 new notifications"
                                  color="inherit"
                                  onClick={() => { toggleNotificationDrawer(true) }}
                                >
                                  <Badge badgeContent={0} color="error">
                                    <Notifications />
                                  </Badge>
                                </IconButton>
                              </Box>
                              <Box>
                                <IconButton
                                  size="large"
                                  color="inherit"
                                  onClick={() => {
                                    dispatch(setAddCartBoxState({
                                      boxstate: !boxstate
                                    }));
                                  }}
                                >
                                  <Badge badgeContent={
                                    walletData?.wallet === "Metamask" ? (polycartNfts.length + opencartNfts.length) : walletData?.wallet === "Phantom" ? solcartNfts.length : walletData?.wallet === "Nami" ? jpgcartNfts.length : ""
                                  } color="error">
                                    <ShoppingCart />
                                  </Badge>
                                </IconButton>
                              </Box>
                              <Box>
                                <Tooltip title="Open settings">
                                  <IconButton
                                    size="large"
                                    onClick={handleOpenUserMenu}
                                    color="white"
                                  >
                                    <Avatar alt="User Profile" src={userData.user?.profileUrl} />
                                    {/* <AccountCircle sx={{ fontSize: "40px" }} /> */}
                                  </IconButton>
                                </Tooltip>
                                <Menu
                                  sx={styles.profileMenu}
                                  anchorEl={anchorElUser}
                                  anchorOrigin={{
                                    vertical: 'top',
                                    horizontal: 'right',
                                  }}
                                  keepMounted
                                  transformOrigin={{
                                    vertical: 'top',
                                    horizontal: 'right',
                                  }}
                                  open={Boolean(anchorElUser)}
                                  onClose={handleCloseUserMenu}
                                >
                                  {profileMenu.map((item, index) => (
                                    <MenuItem sx={{ borderBottom: "1px solid #00000033", py: "13px", color: "black !important", alignItems: "center" }} key={index} onClick={() => { handleCloseUserMenu(item) }}>
                                      <Box mr={1} sx={{ display: "flex" }} component={"span"}>{item.icon}</Box>
                                      <Typography sx={{ color: "black !important" }} textAlign="center">{item.title}</Typography>
                                    </MenuItem>
                                  ))}
                                </Menu>
                              </Box>
                            </React.Fragment>
                          ) : ""}
                          <Button onClick={() => { toggleWalletDrawer(true) }} variant="contained" classes={{ root: btnclasses.buttonFillPrimary }}>
                            {walletAddress === null ? "Connect Wallet" : walletAddress}
                          </Button>
                        </Grid>
                      </Grid>

                    </>
                  }
                </Fragment>
              )}
            </Media>
          </Container>
        </Toolbar>
      </AppBar>
    </>
  )
}
