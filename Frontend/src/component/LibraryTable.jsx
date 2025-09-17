import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { styled } from '@mui/material/styles';

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: "#27374e",
    color: theme.palette.common.white,
    fontWeight: 600,
    fontSize: '16px',
    padding: '16px',
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
    padding: '14px',
  },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  '&:nth-of-type(odd)': {
    backgroundColor: theme.palette.action.hover,
  },
  // hide last border
  '&:last-child td, &:last-child th': {
    border: 0,
  },
  '&:hover': {
    backgroundColor: 'rgba(39, 55, 78, 0.08)',
  },
}));

export default function LibraryTable({rows}) {
  return (
    <TableContainer component={Paper} className="rounded-xl shadow-md">
      <Table sx={{ minWidth: 650 }} aria-label="library books table">
        <TableHead>
          <TableRow>
            <StyledTableCell>Book Title</StyledTableCell>
            <StyledTableCell align="right">Book Id</StyledTableCell>
            <StyledTableCell align="right">Borrowed Date</StyledTableCell>
            <StyledTableCell align="right">Return Deadline</StyledTableCell>
            <StyledTableCell align="right">Remaining Days</StyledTableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row) => (
            <StyledTableRow
              key={row.name}
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
              <StyledTableCell component="th" scope="row">
                {row.bookTitle}
              </StyledTableCell>
              <StyledTableCell align="right">{row.bookId}</StyledTableCell>
              <StyledTableCell align="right">{row.borrowedDate}</StyledTableCell>
              <StyledTableCell align="right">{row.returnDeadline}</StyledTableCell>
              <StyledTableCell align="right">
                <span className={`font-medium ${row.remainingDays < 3 ? 'text-red-500' : 'text-green-500'}`}>
                  {row.remainingDays}
                </span>
              </StyledTableCell>
            </StyledTableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}