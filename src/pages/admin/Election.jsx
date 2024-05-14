import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { deleteData, fetchData, postData } from "../../redux/AdminSlice";
import {
  election_delete_req,
  election_get_req,
  election_post_req,
} from "../../redux/Constant";
import DataTable from "../../components/TableData";
import AddButton from "../../components/Botton";
import { Box, Grid, IconButton, TextField } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";

const Election = () => {
  const inputTitles = ["election_name", "date"];
  const inputTypes = ["text", "date"];

  // State for search input
  const [searchTerm, setSearchTerm] = useState("");

  const data = useSelector((state) => state.admin.election);
  const isLoading = useSelector((state) => state.admin.isLoading);
  const error = useSelector((state) => state.admin.error);

  const dispatch = useDispatch();

  // Fetch data on component mount
  useEffect(() => {
    dispatch(fetchData({ endpoint: election_get_req, dataType: "election" }));
  }, [dispatch]); // Add dispatch as a dependency

  // Handle search functionality (optional, implement based on requirements)
  const handleSearch = (event) => {
    setSearchTerm(event.target.value);
    // Implement search logic on `data` based on `searchTerm`
  };

  if (isLoading) {
    return "Loading...";
  }

  if (error) {
    return error;
  }

  const handleSubmit = (formData) => {
    dispatch(
      postData({
        payload: formData,
        endpoint: election_post_req,
        dataType: "election",
      })
    );
  };

  const columns = [
    {
      id: "ElectionName",
      label: "Election Name",
      minWidth: 170,
      align: "center",
    },
    { id: "date", label: "Date", minWidth: 170, align: "center" },
  ];

  // Filter rows based on search term (optional)
  const filteredRows = searchTerm
    ? data?.filter((election) =>
        election.election_name.toLowerCase().includes(searchTerm.toLowerCase())
      )
    : data;

  const rows = filteredRows?.map((election) => ({
    ElectionName: election.election_name,
    date: election.date,
    id: election._id,
  }));

  // Securely handle data deletion (avoid accidental deletion)
  const handleDeleteConfirmation = (id) => {
    if (window.confirm("Are you sure you want to delete this election?")) {
      dispatch(
        deleteData({ endpoint: election_delete_req, id, dataType: "election" })
      );
    }
  };

  const handleUpdate = () => {
    console.log("Update not implemented yet.");
  };

  return (
    <>
      <Grid
        container
        direction="row"
        justifyContent="space-between"
        alignItems="center"
      >
        <form>
          <IconButton type="submit" aria-label="search">
            <SearchIcon style={{ fill: "blue" }} />
          </IconButton>
          <TextField
            id="search-bar"
            label="Enter Election Name"
            variant="outlined"
            placeholder="Search..."
            size="small"
            value={searchTerm}
            onChange={handleSearch} // Optional, if search is implemented
          />
        </form>
        <AddButton
          title="Add Election"
          inputTitles={inputTitles}
          inputTypes={inputTypes}
          onSubmit={handleSubmit}
        />
      </Grid>
      <Box mt={11}>
        <DataTable
          columns={columns}
          rows={rows}
          onDelete={handleDeleteConfirmation} // Secure deletion
          onUpdate={handleUpdate}
          height={450}
        />
      </Box>
    </>
  );
};

export default Election;
