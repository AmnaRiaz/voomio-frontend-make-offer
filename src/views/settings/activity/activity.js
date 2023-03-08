import React, {useState} from 'react';
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import TableCell from "@mui/material/TableCell";
import TableBody from "@mui/material/TableBody";
import TableContainer from "@mui/material/TableContainer";
import {makeStyles} from "@mui/styles";
import componentStyles from "../../../assets/theme/views/profile/activity";
import {useMyTransactions} from "./state";
import {TableFooter, Pagination, Typography} from "@mui/material";
import Loading from "../../../components/loading/Loading";

const useStyles = makeStyles(componentStyles)

const Activity = () => {
    const classes = useStyles();

    const [page, setPage] = useState(1);

    const {data, isSuccess, isLoading} = useMyTransactions(page, 15);

    const handlePagination = (_, pageNum) => {
        setPage(pageNum)
    }

    return (
        <TableContainer component={Paper}>
            <Table className={classes.tablelist} size="small" aria-label="a dense table">
                <TableHead>
                    <TableRow>
                        <TableCell align="center" className={classes.itemhead}>From</TableCell>
                        <TableCell align="center" className={classes.itemhead}>To</TableCell>
                        <TableCell align="center" className={classes.itemhead}>Price</TableCell>
                        <TableCell align="center" className={classes.itemhead}>Type</TableCell>
                        <TableCell align="center" className={classes.itemhead}>Date</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody sx={{height: 500}}>
                    {isLoading &&
                        <TableCell colSpan={5}>
                            <Loading sx={{p: 6, width: '100%', textAlign: 'center'}}/>
                        </TableCell>
                    }

                    {isSuccess && data?.transactions?.length === 0 &&
                        <TableCell colSpan={5}>
                            <Typography textAlign='center'>You have no transaction</Typography>
                        </TableCell>
                    }

                    {isSuccess && data?.transactions?.map((transaction, i) => (
                        <TableRow
                            key={i}
                            sx={{'&:last-child td, &:last-child th': {border: 0}}}
                        >
                            <TableCell sx={{maxWidth: 200}} className={classes.NFTitemlist} component="th" scope="row">
                                {transaction.from}
                            </TableCell>
                            <TableCell sx={{maxWidth: 200}} align="center" className={classes.NFTitemlist}>
                                {transaction.to}
                            </TableCell>
                            <TableCell align="center" className={classes.NFTitemlist}>
                                {transaction.price}
                            </TableCell>
                            <TableCell align="center" className={classes.NFTitemlist}>
                                {transaction.type}
                            </TableCell>
                            <TableCell align="center" className={classes.NFTitemlist}>
                                {transaction.createdAt}
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
                <TableFooter>
                    <Pagination
                        sx={{py: 2}}
                        onChange={handlePagination}
                        page={page}
                        count={Math.ceil(data?.pagination?.total / data?.pagination?.items)}
                    />
                </TableFooter>
            </Table>
        </TableContainer>
    );
};

export default Activity;