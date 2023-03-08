import React, { useState, useEffect } from "react"
// @mui/material components
import { makeStyles } from "@mui/styles"
import Grid from "@mui/material/Grid"
// core components
import Stack from '@mui/material/Stack'
import componentStyles from "../../assets/theme/views/collection/activity"
import { Box, Button, IconButton, InputBase, Pagination, Typography } from "@mui/material"
import Accordion from '@mui/material/Accordion'
import AccordionSummary from '@mui/material/AccordionSummary'
import AccordionDetails from '@mui/material/AccordionDetails'
import FormControlLabel from '@mui/material/FormControlLabel'
import Checkbox from '@mui/material/Checkbox'
import CardHeader from '@mui/material/CardHeader'
import Avatar from '@mui/material/Avatar'

import Table from '@mui/material/Table'
import TableBody from '@mui/material/TableBody'
import TableCell from '@mui/material/TableCell'
import TableContainer from '@mui/material/TableContainer'
import TableHead from '@mui/material/TableHead'
import TableRow from '@mui/material/TableRow'
import Paper from '@mui/material/Paper'

import ExpandMoreIcon from '@mui/icons-material/ExpandMore'
import FilterListIcon from '@mui/icons-material/FilterList'
import MonkeyNFT from "/src/assets/image/views/profile/collection/monkeyNFT.svg"
import Ethereum from "/src/assets/image/views/profile/collection/etherum.svg"
import NFTcheck from "/src/assets/image/views/profile/collection/NFTcheck.svg"
import Filterresult from "/src/assets/image/views/profile/collection/filterresult.svg"
import { getJpgStoreCollectionTransactions } from "../../redux/actions/jpg.store"
import { Search } from "@mui/icons-material"


function createData(name, calories, fat, carbs, protein, time) {
    return { name, calories, fat, carbs, protein, time }
}

const useStyles = makeStyles(componentStyles)
const Activity = ({ collection }) => {
    const classes = useStyles()

    const [activityPage, setActivityPage] = useState(1);
    const [nameQuery, setNameQuery] = useState('');
    const [nameQueryTimeout, setNameQueryTimeout] = useState(0);
    const [totalRows, setTotalRows] = useState(0);
    const [totalPages, setTotalPages] = useState(0);
    const [activities, setActivities] = useState([]);

    const onChangePagination = (event, value) => {
        setActivityPage(value)
    }

    const onChangeSearch = (value) => {
        clearTimeout(nameQueryTimeout);
        setNameQuery(value);
        const timeout = setTimeout(() => {
            setActivityPage(1);
            setActivities([]);
        }, 500)
        setNameQueryTimeout(timeout);
    }

    const fetchData = async () => {
        if (collection.platform === 'jpg.store') {
            const activityHistory = await getJpgStoreCollectionTransactions({
                policyId: collection.collectionAddress,
                page: activityPage,
                nameQuery
            })
            if (!activityHistory) {
                return;
            }

            setTotalRows(activityHistory.tot);
            setTotalPages(parseInt(activityHistory.tot / 50) + 1);
            setActivities(activityHistory.transactions.map((t) => ({
                nftId: t.asset_id,
                from: t.seller_address,
                to: t.signer_address,
                blockchain: 'cardano',
                type: t.action,
                transactionHash: t.tx_hash,
                name: t.display_name,
                price: t.amount_lovelace / 1e6,
                currency: 'ADA',
                createdAt: t.created_at,
                confirmedAt: t.confirmed_at,
            })))
        }
    }

    useEffect(() => {
        if (collection) {
            fetchData();
        }
    }, [collection, activityPage, nameQuery])

    return (
        <>
            <Stack alignItems={"center"} direction={"row"} paddingTop={2} paddingBottom={2} paddingLeft={30} spacing={2} className={classes.activityfilter} >
                {/* <Typography className={classes.filters}>Filters</Typography>
                <Stack className={classes.activitybar} direction={"row"} spacing={1}>
                    <Box className={classes.filtervalue}>
                        <Typography> Sales</Typography>
                    </Box>
                    <Box className={classes.filtervalue}>
                        <Typography> Listings</Typography>
                    </Box>
                </Stack>
                <Box className={classes.clearall}>
                    <Typography >  Clear all</Typography>
                </Box> */}
                <Stack className={classes.spacer}></Stack>
                <Paper className={classes.searchform} >
                    <IconButton aria-label="menu">
                        <Search className={classes.iconsearch} />
                    </IconButton>
                    <InputBase onChange={e => { onChangeSearch(e.target.value) }} className={classes.searchinput} placeholder="Search by name" />
                </Paper>
            </Stack>
            <Grid container spacing={2} lg={12} md={12} sm={12} xs={12} alignItems={"center"} justifyContent={"center"}>
                {/* <Grid item lg={2} md={12} xs={12}>
                    <Stack spacing={5}>
                        <FilterListIcon />
                        <Stack>
                            <Accordion className={classes.nabarhead} >
                                <AccordionSummary
                                    expandIcon={<ExpandMoreIcon className={classes.collapseevent} />}
                                    aria-controls="panel1a-content"
                                    id="panel1a-header"
                                >
                                    <Typography className={classes.collapseevent} >Event Type</Typography>
                                </AccordionSummary>
                                <AccordionDetails>
                                    <Stack direction={"column"}>
                                        <FormControlLabel className={classes.nabar} control={<Checkbox defaultChecked />} label="Sales" />
                                        <FormControlLabel className={classes.nabar} control={<Checkbox defaultChecked />} label="Listings" />
                                        <FormControlLabel className={classes.nabar} control={<Checkbox />} label="Offers" />
                                        <FormControlLabel className={classes.nabar} control={<Checkbox />} label="Collection offers" />
                                        <FormControlLabel className={classes.nabar} control={<Checkbox />} label="Transfers" />
                                    </Stack>
                                </AccordionDetails>
                            </Accordion>
                            <Accordion className={classes.nabarhead}>
                                <AccordionSummary
                                    expandIcon={<ExpandMoreIcon className={classes.collapseevent} />}
                                    aria-controls="panel2a-content"
                                    id="panel2a-header"
                                >
                                    <Typography className={classes.collapseevent} >Collections</Typography>
                                </AccordionSummary>
                                <AccordionDetails>
                                    <Stack direction={"column"}>
                                        <FormControlLabel className={classes.nabar} control={<Checkbox />} label="Sales" />
                                    </Stack>
                                </AccordionDetails>
                            </Accordion>
                            <Accordion className={classes.nabarhead}>
                                <AccordionSummary
                                    expandIcon={<ExpandMoreIcon className={classes.collapseevent} />}
                                    aria-controls="panel2a-content"
                                    id="panel2a-header"
                                >
                                    <Typography className={classes.collapseevent} >Chains</Typography>
                                </AccordionSummary>
                                <AccordionDetails>
                                    <Stack direction={"column"}>
                                        <FormControlLabel className={classes.nabar} control={<Checkbox />} label="Sales" />
                                    </Stack>
                                </AccordionDetails>
                            </Accordion>
                        </Stack>
                    </Stack>
                </Grid> */}
                <Grid item lg={10} md={12} xs={12}>
                    <TableContainer component={Paper}>
                        <Table className={classes.tablelist} size="small" aria-label="a dense table">
                            <TableHead>
                                <TableRow>
                                    <TableCell align="center" className={classes.itemhead}>Status</TableCell>
                                    <TableCell align="center" className={classes.itemhead}>Event</TableCell>
                                    <TableCell align="center" className={classes.itemhead}>Item</TableCell>
                                    <TableCell align="center" className={classes.itemhead}>Price</TableCell>
                                    <TableCell align="center" className={classes.itemhead}>From</TableCell>
                                    <TableCell align="center" className={classes.itemhead}>To</TableCell>
                                    <TableCell align="center" className={classes.itemhead}>Date</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {activities.map((row, i) => (
                                    <TableRow
                                        key={i}
                                        sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                    >
                                        <TableCell className={classes.NFTitemlist} component="th" scope="row">
                                            {row.confirmedAt ? 'Confirmed' : 'Processing'}
                                        </TableCell>
                                        <TableCell className={classes.NFTitemlist} component="th" scope="row">
                                            {row.type}
                                        </TableCell>
                                        <TableCell align="center" className={classes.NFTitemlist} >{row.name}</TableCell>
                                        <TableCell align="center" className={classes.NFTitemlist} >{row.price}</TableCell>
                                        <TableCell align="center" className={classes.NFTitemlist} >{row.from.substring(0, 7) + '...' + row.from.substring(row.from.length - 4)}</TableCell>
                                        <TableCell align="center" className={classes.NFTitemlist} >{row.to.substring(0, 7) + '...' + row.to.substring(row.to.length - 4)}</TableCell>
                                        <TableCell align="center" className={classes.NFTitemlist} >{row.confirmedAt}</TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </TableContainer>
                    <Stack width={'100%'} mt={3} flexDirection={"row"} justifyContent={"end"} >
                        <Pagination onChange={(e, v) => { onChangePagination(e, v) }} count={totalPages} />
                    </Stack>
                </Grid>
            </Grid>
        </>
    )
}

export default Activity