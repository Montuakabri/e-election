import React, { useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Radio,
  Button,
} from "@mui/material";
import { pink } from "@mui/material/colors";
import { Box } from "@mui/joy";

const TablewithRadio = ({ data, Output }) => {
  const [selectedRow, setSelectedRow] = useState(null);
  const [selectedData, setSelectedData] = useState(null);

  const handleRowSelect = (rowId, rowData) => {
    setSelectedRow(rowId);
    setSelectedData(rowData);
  };

  const handleSubmit = () => {
    // Handle submission of selected data
    if (selectedData) {
      Output(selectedData);
      // Reset selected row and data after submission
      setSelectedRow(null);
      setSelectedData(null);
    } else {
      console.warn("Please select a row before submitting."); // Handle no selection
    }
  };

  return (
    <>
      <TableContainer aria-label="selectable table">
        <Table>
          <TableHead>
            <TableRow>
              <TableCell style={{ textAlign: "center" }}>Party Logo</TableCell>
              <TableCell style={{ textAlign: "center" }}>Election</TableCell>
              <TableCell style={{ textAlign: "center" }}>Party Name</TableCell>
              <TableCell
                style={{ textAlign: "center", width: "200px" }}
                padding="checkbox"
              >
                Select
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {data.length > 0 ? (
              data.map((row) => (
                <TableRow
                  key={row.id}
                  onClick={() => handleRowSelect(row.id, row)}
                  hover
                  selected={selectedRow === row.id}
                >
                  <TableCell style={{ textAlign: "center" }}>
                    <img
                      src={row.partylogo}
                      alt={row.party}
                      onError={(e) => {
                        e.target.src = "https://via.placeholder.com/150";
                      }}
                    />{" "}
                    {/* Handle missing image */}
                  </TableCell>
                  <TableCell style={{ textAlign: "center" }}>
                    {row.election_name}
                  </TableCell>
                  <TableCell style={{ textAlign: "center" }}>
                    {row.party}
                  </TableCell>
                  <TableCell style={{ textAlign: "center" }}>
                    <Radio
                      sx={{
                        color: pink[800],
                        "&.Mui-checked": { color: pink[600] },
                      }}
                      checked={selectedRow === row.id}
                    />
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={4} style={{ textAlign: "center" }}>
                  No data available
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </TableContainer>
      <Box mt={4} sx={{ display: "flex", flexDirection: "row-reverse" }}>
        <Button variant="contained" onClick={handleSubmit}>
          Submit
        </Button>
      </Box>
    </>
  );
};

export default TablewithRadio;
