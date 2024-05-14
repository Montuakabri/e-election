import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { postData, fetchData, deleteData } from "../../redux/AdminSlice";
import {
  election_get_req,
  party_get_req,
  party_get_req_id,
  partylist_delete_req,
  partylist_get_req,
  partylist_post_req,
} from "../../redux/Constant";
import {
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  Button,
  Grid,
} from "@mui/material";
import DataTable from "../../components/TableData";

export default function Connection() {
  const [Election, setElection] = useState("");
  const [Party, setParty] = useState("");

  const dispatch = useDispatch();
  const Electiondata = useSelector((state) => state.admin.election);
  const Partydata = useSelector((state) => state.admin.party);
  const Connection = useSelector((state) => state.admin.connection);

  useEffect(() => {
    dispatch(fetchData({ endpoint: election_get_req, dataType: "election" }));
    dispatch(fetchData({ endpoint: party_get_req, dataType: "party" }));
    dispatch(
      fetchData({ endpoint: partylist_get_req, dataType: "connection" })
    );
  }, [dispatch]);

  const handleSubmit = () => {
    const finalData = { election: Election, party: Party };
    dispatch(
      postData({
        payload: finalData,
        endpoint: partylist_post_req,
        dataType: "connection",
      })
    );
  };

  const handleDelete = (id) => {
    dispatch(
      deleteData({ endpoint: partylist_delete_req, id, dataType: "connection" })
    );
  };

  const columns = [
    {
      id: "ElectionName",
      label: "Election Name",
      minWidth: 170,
      align: "center",
    },
    { id: "Partyname", label: "Party Name", minWidth: 170, align: "center" },
  ];

  const rows = Connection?.map((conn) => ({
    ElectionName: conn.election.election_name,
    Partyname: conn.party.party_name,
    id: conn._id,
  }));

  return (
    <Grid
      container
      spacing={2}
      mt={4}
      columns={12}
      sx={{ flexGrow: 1, alignItems: "center", justifyContent: "center" }}
    >
      <Grid item xs={8}>
        <DataTable
          columns={columns}
          rows={rows}
          onDelete={handleDelete}
          height={500}
        />
      </Grid>
      <Grid item xs={4} container direction="column">
        <FormControl fullWidth sx={{ marginBottom: 2 }}>
          <InputLabel id="party-select-label">Choose Party</InputLabel>
          <Select
            labelId="party-select-label"
            id="party-select"
            value={Party}
            label="Party"
            onChange={(event) => setParty(event.target.value)}
          >
            <MenuItem value="">
              <em>None</em>
            </MenuItem>
            {Partydata?.map((val) => (
              <MenuItem key={val._id} value={val._id}>
                {val.party_name}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
        <FormControl fullWidth sx={{ marginBottom: 2 }}>
          <InputLabel id="election-select-label">Choose Election</InputLabel>
          <Select
            labelId="election-select-label"
            id="election-select"
            value={Election}
            label="Election"
            onChange={(event) => setElection(event.target.value)}
          >
            <MenuItem value="">
              <em>None</em>
            </MenuItem>
            {Electiondata?.map((val) => (
              <MenuItem key={val._id} value={val._id}>
                {val.election_name}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
        <Button variant="contained" onClick={handleSubmit}>
          Submit
        </Button>
      </Grid>
    </Grid>
  );
}
