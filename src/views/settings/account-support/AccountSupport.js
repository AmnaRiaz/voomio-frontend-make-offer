import React, {useState} from 'react';
import {
    Grid,
    Typography,
    Stack, Pagination, TableFooter,
} from "@mui/material";
import Button from "@mui/material/Button";
import Table from "@mui/material/Table";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import TableCell from "@mui/material/TableCell";
import TableBody from "@mui/material/TableBody";
import TableContainer from "@mui/material/TableContainer";
import Paper from "@mui/material/Paper";
import {useCloseTicket, useTickets} from "./state";
import NewTicketModal from "./new-ticket-modal/NewTicketModal";
import {Link} from "react-router-dom";
import Loading from "../../../components/loading/Loading";

const AccountSupport = () => {
    const [page, setPage] = useState(1);

    const {data, isSuccess, isLoading} = useTickets(page);

    const {mutate: closeTicket} = useCloseTicket();

    const handlePagination = (_, pageNum) => {
        setPage(pageNum)
    }

    return (
        <Grid direction='column' container spacing={4}>
            <Grid item container alignItems='center'>
                <Grid item xs>
                    <Typography fontSize='28px' fontWeight='bold'>My tickets</Typography>
                </Grid>

                <Grid item>
                    <NewTicketModal trigger={(handleOpen) => (
                        <Button onClick={handleOpen} variant='contained' color='success'>
                            New ticket
                        </Button>
                    )}/>

                </Grid>
            </Grid>

            <Grid item>
                <TableContainer component={Paper}>
                    <Table sx={{minWidth: 650}} aria-label="simple table">
                        <TableHead>
                            <TableRow>
                                <TableCell>Title</TableCell>
                                <TableCell align="center">Category</TableCell>
                                <TableCell align="center">Status</TableCell>
                                <TableCell align="center">Date</TableCell>
                                <TableCell align="left"></TableCell>
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

                            {isSuccess && data?.data.map(ticket => (
                                <TableRow>
                                    <TableCell>{ticket.title}</TableCell>

                                    <TableCell align="center">{ticket.category}</TableCell>

                                    <TableCell align="center">{ticket.isOpen ? 'Open' : 'Close'}</TableCell>

                                    <TableCell align="center">{ticket.openedAt}</TableCell>

                                    <TableCell align='left'>
                                        <Stack direction='row' spacing={1} justifyContent='end'>
                                            <Button
                                                component={Link}
                                                to={'/settings/ticket/' + ticket._id}
                                                variant='contained'
                                                color='info'
                                            >
                                                Show
                                            </Button>

                                            {ticket.isOpen &&
                                                <Button
                                                    onClick={() => closeTicket(ticket._id)}
                                                    variant='contained'
                                                    color='error'
                                                >
                                                    Close
                                                </Button>
                                            }
                                        </Stack>
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
            </Grid>
        </Grid>
    );
};

export default AccountSupport;