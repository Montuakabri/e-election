import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { postData, fetchData, deleteData } from "../../redux/AdminSlice";
import {
  party_get_req,
  party_post_req,
  party_delete_req,
} from "../../redux/Constant";
import {
  Box,
  Grid,
  IconButton,
  TextField,
  Button,
  Modal,
  Typography,
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import DataTable from "../../components/TableData";
import { Add } from "@mui/icons-material";

const Party = () => {
  const dispatch = useDispatch();
  const [open, setOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const partyData = useSelector((state) => state.admin.party);
  const isLoading = useSelector((state) => state.admin.isLoading);
  const error = useSelector((state) => state.admin.error);

  useEffect(() => {
    dispatch(fetchData({ endpoint: party_get_req, dataType: "party" }));
  }, [dispatch]);

  const handleSubmit = (event) => {
    event.preventDefault();
    // Handle form submission
  };

  const handleDelete = (id) => {
    dispatch(deleteData({ endpoint: party_delete_req, id, dataType: "party" }));
  };

  const handleUpdate = () => {
    // Handle update logic
  };

  const columns = [
    { id: "PartyLogo", label: "Party Logo", minWidth: 170, align: "center" },
    { id: "PartyName", label: "Party Name", minWidth: 170, align: "center" },
    {
      id: "PartySCode",
      label: "Party Short-Code",
      minWidth: 170,
      align: "center",
    },
  ];

  const rows = partyData?.map((party) => ({
    id: party._id,
    PartyName: party.party_name,
    PartyLogo: party.party_logo,
    PartySCode: party.short_code,
  }));

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
            label="Enter Party Name"
            variant="outlined"
            placeholder="Search..."
            size="small"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </form>
        <div>
          <Button
            variant="outlined"
            color="neutral"
            onClick={() => setOpen(true)}
          >
            <Add />
            &nbsp; Add Party
          </Button>
          <Modal
            aria-labelledby="modal-title"
            aria-describedby="modal-desc"
            open={open}
            onClose={() => setOpen(false)}
            sx={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            {/* Modal content */}
          </Modal>
        </div>
      </Grid>
      <Box mt={11}>
        <DataTable
          columns={columns}
          rows={rows}
          onDelete={handleDelete}
          onUpdate={handleUpdate}
          height={450}
        />
      </Box>
    </>
  );
};

export default Party;
