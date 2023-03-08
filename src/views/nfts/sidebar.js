import React, { useEffect } from "react"
import { useSelector, useDispatch } from "react-redux"
// @mui/material components
import { styled } from '@mui/material/styles'
import { makeStyles } from '@mui/styles'
import Grid from "@mui/material/Grid"
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import Button from '@mui/material/Button'
import Grow from '@mui/material/Grow'
import Paper from '@mui/material/Paper'
import Popper from '@mui/material/Popper'
import MenuItem from '@mui/material/MenuItem'
import MenuList from '@mui/material/MenuList'
import ClickAwayListener from '@mui/material/ClickAwayListener'
import ExpandMoreIcon from '@mui/icons-material/ExpandMore'
import Collapse from '@mui/material/Collapse'
import IconButton from '@mui/material/IconButton'
import CardActions from '@mui/material/CardActions'
import CardContent from '@mui/material/CardContent'
import HorizontalRuleIcon from '@mui/icons-material/HorizontalRule'
import InputBase from '@mui/material/InputBase'
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown'
import FormatListBulletedIcon from '@mui/icons-material/FormatListBulleted';
import KeyboardBackspaceIcon from '@mui/icons-material/KeyboardBackspace'

import { FormControl, OutlinedInput, InputAdornment } from '@mui/material'
import InputLabel from '@mui/material/InputLabel';
import Select from '@mui/material/Select';

//listBar
import ListItem from '@mui/material/ListItem'
import ListItemButton from '@mui/material/ListItemButton'
import ListItemIcon from '@mui/material/ListItemIcon'
import ListItemText from '@mui/material/ListItemText'
import Checkbox from '@mui/material/Checkbox'

// core components
import componentStyles from "../../assets/theme/views/nft/sidebar"
import { List, TextField } from "@mui/material"
import { useState } from "react"

import { setslidestate } from "../../redux/actions/nfts"
import { queryKey } from "../../utils/queryKey"

const useStyles = makeStyles(componentStyles)

/*eslint-disable */

const ExpandMore = styled((props) => {
    const { expand, ...other } = props

    return <IconButton {...other} />
})(({ theme, expand }) => ({
    display: !expand ? 'block' : 'none',
    marginLeft: 'auto',
    transition: theme.transitions.create('transform', {
        duration: theme.transitions.duration.shortest
    })
}))
const ExpandLess = styled((props) => {
    const { expand, ...other } = props
    return <IconButton {...other} />
})(({ theme, expand }) => ({
    display: !expand ? 'none' : 'block',
    marginLeft: 'auto',
    transition: theme.transitions.create('transform', {
        duration: theme.transitions.duration.shortest
    })
}))

const Sidebar = ({ setFilter, setQuery, setCurrentPNumber, setIsQuery }) => {
    const classes = useStyles()
    const [open, setOpen] = useState(false)
    const [expanded, setExpanded] = useState({ 0: true, 1: true, 2: true })
    const [chainChecked, setChainChecked] = useState(["ALL", "ETHEREUM", "BANANCE", "CARDANO", "POLYGON", "SOLANA"]);
    const [categoryChecked, setCategoryChecked] = useState(["ALL", 'Art', 'Collections', 'Domain names', 'Music', 'Photography', 'Sports']);
    const [crypto, setCrypto] = useState('ADA');
    const [price, setPrice] = useState({ min: '', max: '' });
    const [name, setName] = useState("")

    const anchorRef = React.useRef(null)
    const prevOpen = React.useRef(open)

    const listArr = [
        { key: "name", name: 'Name & Price' },
        { key: "blockchain", name: 'Chains', data: ['ALL', 'ETHEREUM', 'BANANCE', 'CARDANO', 'POLYGON', 'SOLANA'] },
        { key: "categories", name: 'Category', data: ['ALL', 'Art', 'Collections', 'Domain names', 'Music', 'Photography', 'Sports'] },
    ]

    const checkbox = (type, value) => {
        if (type === "blockchain") {
            const allChains = listArr.filter((item) => item.name === "Chains")[0]?.data;
            const currentIndex = chainChecked.indexOf(value);
            let newChecked = [...chainChecked];
            if (currentIndex === -1) {
                if (value === "ALL") {
                    newChecked = allChains;
                } else {
                    if (newChecked.length === 5 && newChecked.includes("ALL")) {
                        newChecked = allChains
                    } else if (newChecked.length === 4 && !newChecked.includes("ALL")) {
                        newChecked = allChains
                    } else {
                        newChecked.push(value);
                    }
                }
            } else {
                if (value === "ALL") {
                    newChecked = []
                } else {
                    if (newChecked.includes("ALL")) {
                        newChecked.splice(newChecked.indexOf("ALL"), 1);
                    }
                    newChecked.splice(newChecked.indexOf(value), 1);
                }
            }
            setChainChecked(newChecked);
        } else {
            const currentIndex = categoryChecked.indexOf(value);
            let newChecked = [...categoryChecked];
            const allChains = listArr.filter((item) => item.name === "Category")[0]?.data;
            if (currentIndex === -1) {
                if (value === "ALL") {
                    newChecked = allChains;
                } else {
                    if (newChecked.length === 6 && newChecked.includes("ALL")) {
                        newChecked = allChains
                    } else if (newChecked.length === 5 && !newChecked.includes("ALL")) {
                        newChecked = allChains
                    } else {
                        newChecked.push(value);
                    }
                }
            } else {
                if (value === "ALL") {
                    newChecked = []
                } else {
                    if (newChecked.includes("ALL")) {
                        newChecked.splice(newChecked.indexOf("ALL"), 1);
                    }
                    newChecked.splice(newChecked.indexOf(value), 1);
                }
            }
            setCategoryChecked(newChecked);
        }
    };

    const handleExpandClick = (item) => {
        setExpanded(prev => { return { ...prev, [item]: prev[item] ? false : true } })
        if (item === 0) {
            setName("")
            setPrice({})
            setCrypto("ADA")
            setQuery({
                name: "",
                price: {},
                currency: "",
                isForSale: false
            })
        }
    }

    const searchByName = (value) => {
        setName(value)
    }
    const searchNameandPrice = () => {
        setIsQuery(true);
        setCurrentPNumber(1);
        setQuery({
            name: name,
            price: price,
            currency: crypto,
            isForSale: false
        })
    }

    useEffect(() => {
        if (prevOpen.current === true && open === false) {
            anchorRef.current.focus()
        }
        prevOpen.current = open
    }, [open])

    useEffect(() => {
        let queries = {};
        if (categoryChecked.length !== 7 && categoryChecked.length !== 0) {
            queries.categories = categoryChecked;
        }
        if (chainChecked.length !== 6 && chainChecked.length !== 0) {
            queries.networks = chainChecked
        }
        setCurrentPNumber(1)
        setIsQuery(false);
        setFilter(queries)
    }, [chainChecked, categoryChecked])

    const slidestate = useSelector(state => state.nfts.slidestate)
    const dispatch = useDispatch()

    const handleChange = (event) => {
        setCrypto(event.target.value);
    };

    return (
        <Grid className={classes.pageroot}>
            <Box sx={{ display: 'flex', justifyContent: 'end', pb: '10px' }}>
                {
                    slidestate ?
                        <IconButton onClick={() => {
                            dispatch(setslidestate({
                                slidestate: false
                            }))
                        }} color="primary" aria-label="add to shopping cart" sx={{ border: '3px solid #c5c5c5' }}>
                            <KeyboardBackspaceIcon />
                        </IconButton> :
                        <IconButton onClick={() => {
                            dispatch(setslidestate({
                                slidestate: true
                            }))
                        }} color="primary" aria-label="add to shopping cart" sx={{ border: '3px solid #c5c5c5' }}>
                            <FormatListBulletedIcon />
                        </IconButton>
                }
            </Box>
            {
                slidestate ?
                    <Box className={classes.listBox} sx={{ display: "flex", flexFlow: "column", rowGap: "20px" }}>
                        {
                            listArr.map((item, index) => {
                                if (item.name === 'Name & Price') {
                                    return (
                                        <Box key={index} className={classes.brandCard} >
                                            <Box>
                                                <Box className={classes.list} onClick={() => handleExpandClick(index)}>
                                                    <Typography variant='h1'>{item.name}</Typography>
                                                    <CardActions className={classes.detailCard} disableSpacing>
                                                        <ExpandMore
                                                            expand={expanded[index]}
                                                            aria-expanded={expanded[index]}
                                                            aria-label="show more"
                                                        >
                                                            <ExpandMoreIcon />
                                                        </ExpandMore>
                                                        <ExpandLess
                                                            expand={expanded[index]}
                                                            aria-expanded={expanded[index]}
                                                            aria-label="show more"
                                                        >
                                                            <HorizontalRuleIcon />
                                                        </ExpandLess>
                                                    </CardActions>
                                                </Box>
                                                <Collapse className={classes.collapseBoard} in={expanded[index]} timeout="auto" sx={{ borderRadius: '20px' }} unmountOnExit>
                                                    <OutlinedInput
                                                        sx={{ borderRadius: '20px', my: '10px' }}
                                                        onChange={(e) => searchByName(e.target.value)}
                                                        placeholder="NFT Name"
                                                        fullWidth />
                                                    <CardContent className={classes.cardcontent} sx={{ paddingRight: "0px !important" }}>
                                                        <Box className={classes.priceBtnbox}>
                                                            <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                                                                <Paper
                                                                    component="form"
                                                                    sx={{ width: 87, boxShadow: 'none' }}
                                                                >
                                                                    <OutlinedInput
                                                                        sx={{ borderRadius: '20px' }}
                                                                        onChange={(e) => setPrice({ ...price, min: e.target.value })}
                                                                        placeholder="Min" />
                                                                </Paper>
                                                                <Typography sx={{ color: 'lightgrey !important', fontSize: '1.5rem' }}>&nbsp;</Typography>
                                                                <Paper
                                                                    component="form"
                                                                    sx={{ width: 87, boxShadow: 'none' }}
                                                                >
                                                                    <OutlinedInput
                                                                        sx={{ borderRadius: '20px' }}
                                                                        onChange={(e) => setPrice({ ...price, max: e.target.value })}
                                                                        placeholder="Max" />
                                                                </Paper>
                                                            </Box>
                                                        </Box>
                                                        <Box fullWidth>
                                                            <FormControl fullWidth>
                                                                <InputLabel id="demo-simple-select-label">UNIT</InputLabel>
                                                                <Select
                                                                    labelId="demo-simple-select-label"
                                                                    id="demo-simple-select"
                                                                    value={crypto}
                                                                    onChange={handleChange}
                                                                    sx={{ borderRadius: '20px' }}
                                                                    label={crypto}
                                                                >
                                                                    <MenuItem value="ETH" >ETH</MenuItem>
                                                                    <MenuItem value="ADA" >ADA</MenuItem>
                                                                    <MenuItem value="MAT" >MAT</MenuItem>
                                                                    <MenuItem value="BNB" >BNB</MenuItem>
                                                                    <MenuItem value="SOL" >SOL</MenuItem>
                                                                </Select>
                                                            </FormControl>
                                                        </Box>
                                                    </CardContent>
                                                    <Button className={classes.detailBtn} onClick={searchNameandPrice}>Apply</Button>
                                                </Collapse>
                                            </Box>
                                        </Box>
                                    )
                                }
                                else {
                                    return (
                                        <Box key={index} className={classes.brandCard} >
                                            <Box>
                                                <Box className={classes.list} onClick={() => handleExpandClick(index)}>
                                                    <Typography variant='h1'>{item.name}</Typography>
                                                    <CardActions className={classes.detailCard} disableSpacing>
                                                        <ExpandMore
                                                            expand={expanded[index]}
                                                            aria-expanded={expanded[index]}
                                                            aria-label="show more"
                                                        >
                                                            <ExpandMoreIcon />
                                                        </ExpandMore>
                                                        <ExpandLess
                                                            expand={expanded[index]}
                                                            aria-expanded={expanded[index]}
                                                            aria-label="show more"
                                                        >
                                                            <HorizontalRuleIcon />
                                                        </ExpandLess>
                                                    </CardActions>
                                                </Box>
                                                <Collapse className={classes.collapseBoard} in={expanded[index]} timeout="auto" unmountOnExit>
                                                    <CardContent className={classes.cardcontent}>
                                                        <List>
                                                            {
                                                                item.data.map((subItem, subIndex) => {
                                                                    return (
                                                                        <ListItem
                                                                            key={subIndex}
                                                                            disablePadding
                                                                            onClick={(e) => { e.stopPropagation(); checkbox(item.key, subItem) }}
                                                                        >
                                                                            <ListItemButton className={classes.listBtn} dense>
                                                                                <ListItemIcon>
                                                                                    <Checkbox className={classes.checkBox} checked={item.key === "blockchain" ? chainChecked.includes(subItem) : categoryChecked.includes(subItem)} />
                                                                                </ListItemIcon>
                                                                                <ListItemText>
                                                                                    {subItem}
                                                                                </ListItemText>
                                                                            </ListItemButton>
                                                                        </ListItem>
                                                                    )
                                                                })
                                                            }
                                                        </List>
                                                    </CardContent>
                                                </Collapse>
                                            </Box>
                                        </Box>
                                    )
                                }
                            })
                        }
                    </Box>
                    : null
            }

        </Grid >
    )
}

export default Sidebar