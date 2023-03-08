import React, { useState } from 'react';
import componentStyles, { styles } from "../../assets/theme/views/collection/list";
import { Stack } from "@mui/system";
import { Search } from "@mui/icons-material";
import { useDebounce } from "react-use";
import { makeStyles } from "@mui/styles";
import {
    createTheme,
    IconButton,
    InputBase,
    MenuItem,
    Paper,
    Select,
    ThemeProvider
} from "@mui/material";

const theme = createTheme({
    components: {
        MuiList: {
            styleOverrides: {
                root: {
                    padding: '0px'
                }
            }
        },
        MuiPaper: {
            styleOverrides: {
                root: {
                    background: "white",
                    borderRadius: "11px !important"
                }
            }
        }
    }
})

const allChains = [
    { value: 'all', title: "All Chains", selected: true },
    { value: 'ethereum', title: "ETHEREUM", selected: false },
    { value: 'binance', title: "BINANCE", selected: false },
    { value: 'polygon', title: "POLYGON", selected: false },
    { value: 'solana', title: "SOLANA", selected: false },
    { value: 'cardano', title: "CARDANO", selected: false }
]

const allCategories = [
    { value: 'all', title: "All categories", selected: true },
    { value: 'Art', title: "Art", selected: false },
    { value: 'Collections', title: "Collections", selected: false },
    { value: 'Domain names', title: "Domain names", selected: false },
    { value: "Music", title: "Music", selected: false },
    { value: "Photography", title: "Photography", selected: false },
    { value: "Sports", title: "Sports", selected: false }
]

const useStyles = makeStyles(componentStyles)

const CollectionFilters = ({ filters, setFilters }) => {
    const classes = useStyles()

    const [collectionName, setCollectionName] = useState('');

    const handleCategoryChange = (e) => {
        setFilters(p => ({
            ...p,
            category: e.target.value
        }))
    }

    const handleBlockChainChange = (e) => {
        setFilters(p => ({
            ...p,
            blockchain: e.target.value
        }))
    }

    const handleNameChange = (e) => {
        setCollectionName(e.target.value);
    }

    useDebounce(() => {
        setFilters(p => ({
            ...p,
            name: collectionName
        }))
    }, 1000, [collectionName])

    return (
        <Stack direction={"row"} spacing={5} paddingTop={5} paddingBottom={5}>
            <ThemeProvider theme={theme}>
                <Select
                    value={filters.category}
                    onChange={handleCategoryChange}
                    displayEmpty
                    className={classes.nativeselect}
                    sx={styles.selectButton}
                >
                    {allCategories.map((item, index) => (
                        <MenuItem key={index}
                            sx={styles.selectMenuItem}
                            value={item.value}
                        >
                            <Stack component="span">{item.title}</Stack>
                        </MenuItem>
                    ))}
                </Select>
                <Paper className={classes.searchform}>
                    <IconButton aria-label="menu">
                        <Search className={classes.iconsearch} />
                    </IconButton>
                    <InputBase
                        value={collectionName}
                        onChange={handleNameChange}
                        className={classes.searchinput}
                        placeholder="Search by name"
                    />
                </Paper>
                <Select
                    value={filters.blockchain}
                    onChange={handleBlockChainChange}
                    displayEmpty
                    className={classes.nativeselect}
                    sx={styles.selectButton}
                >
                    {allChains.map((item, index) => (
                        <MenuItem key={index}
                            sx={styles.selectMenuItem}
                            value={item.value}>
                            <Stack component="span">{item.title}</Stack>
                        </MenuItem>
                    ))}
                </Select>
            </ThemeProvider>
        </Stack>
    );
};

export default CollectionFilters;