import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Box, TablePagination } from '@mui/material';

const statusStyles = {
  Upcoming: { border: '2px solid blue', borderRadius: '10px', padding: '2px 4px', display: 'flex', alignItems: 'center', justifyContent: 'center' },
  Ongoing: { border: '2px solid green', borderRadius: '10px', padding: '2px 4px', display: 'flex', alignItems: 'center', justifyContent: 'center' },
  Completed: { border: '2px solid gray', borderRadius: '10px', padding: '2px 4px', display: 'flex', alignItems: 'center', justifyContent: 'center' },
  Cancelled: { border: '2px solid red', borderRadius: '10px', padding: '2px 4px', display: 'flex', alignItems: 'center', justifyContent: 'center' },
};

const TutoringSessionsTable = () => {
  const [sessions, setSessions] = useState([]);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('/api/TutorSessions');
        setSessions(response.data);
      } catch (error) {
        console.log("🚀 ~ fetchData ~ error:", error)
      }
    };

    fetchData();
  }, []);



  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  return (
    <Box p={3}>
      <TableContainer component={Paper}>
        <Table>
          <TableHead sx={{ backgroundColor: 'rgba(128, 0, 128, 0.1)' }}>
            <TableRow>
              <TableCell>Tutor Name</TableCell>
              <TableCell>Student Name</TableCell>
              <TableCell>Course</TableCell>
              <TableCell>Module</TableCell>
              <TableCell>Tutor Date</TableCell>
              <TableCell>Duration</TableCell>
              <TableCell>Status</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {sessions.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((session, index) => (
              <TableRow key={index} sx={{ '&:hover': { backgroundColor: 'rgba(128, 0, 128, 0.1)' } }}>
                <TableCell>{session.tutorName}</TableCell>
                <TableCell>{session.studentName}</TableCell>
                <TableCell>{session.course}</TableCell>
                <TableCell>{session.module}</TableCell>
                <TableCell>{session.tutorDate}</TableCell>
                <TableCell>{session.duration}</TableCell>
                <TableCell>
                  <Box sx={statusStyles[session.status]}>
                    {session.status}
                  </Box>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
        <TablePagination
          rowsPerPageOptions={[5, 10, 25]}
          component="div"
          count={sessions.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </TableContainer>
    </Box>
  );
};

export default TutoringSessionsTable;