import React, { useEffect } from "react";
import { Box, Grid, IconButton, TextField } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import DataTable from "../../components/TableData";
import AddButton from "../../components/Botton";
import { useDispatch, useSelector } from "react-redux";
import { fetchData, postData } from "../../redux/AdminSlice";
import { user_get_req, user_post_req } from "../../redux/Constant";

const User = () => {
  const inputTitles = [
    "cardNo",
    "name",
    "fatherName",
    "sex",
    "dob",
    "assemblyNoandName",
    "address",
    "partNoandName",
    "password",
  ];

  const inputTypes = [
    "text",
    "text",
    "text",
    "text",
    "date",
    "text",
    "text",
    "text",
    "password",
  ];

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchData({ endpoint: user_get_req, dataType: "user" }));
  }, [dispatch]);

  const handleSubmit = (formData) => {
    dispatch(
      postData({
        payload: formData,
        endpoint: user_post_req,
        dataType: "user",
      })
    );
  };

  const data = useSelector((state) => state.admin.user);

  const columns = [
    { id: "cardNo", label: "Election Name", minWidth: 170, align: "center" },
    { id: "name", label: "Name", minWidth: 170, align: "center" },
    { id: "fatherName", label: "Father Name", minWidth: 170, align: "center" },
    { id: "sex", label: "Gender", minWidth: 170, align: "center" },
    { id: "dob", label: "DOB", minWidth: 170, align: "center" },
    { id: "assemblyNoandName", label: "A.N.N", minWidth: 170, align: "center" },
    { id: "partNoandName", label: "P.N", minWidth: 170, align: "center" },
    { id: "password", label: "Password", minWidth: 170, align: "center" },
    { id: "address", label: "Address", minWidth: 170, align: "center" },
  ];

  const rows = data?.map((user) => ({
    cardNo: user.cardNo,
    name: user.name,
    fatherName: user.fatherName,
    sex: user.sex,
    dob: user.dob,
    assemblyNoandName: user.assemblyNoandName,
    partNoandName: user.partNoandName,
    password: user.password,
    address: user.address,
  }));

  const handleDelete = () => {
    // Handle delete logic
  };

  const handleUpdate = () => {
    // Handle update logic
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
            className="text"
            label="Enter User Name"
            variant="outlined"
            placeholder="Search..."
            size="small"
          />
        </form>
        <AddButton
          title="Add User"
          inputTitles={inputTitles}
          inputTypes={inputTypes}
          onSubmit={handleSubmit}
        />
      </Grid>
      <Box mt={6}>
        <DataTable
          columns={columns}
          rows={rows}
          onDelete={handleDelete}
          onUpdate={handleUpdate}
          height={500}
        />
      </Box>
    </>
  );
};

export default User;
