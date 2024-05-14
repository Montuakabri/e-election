import React, { useEffect, useState } from "react";
import TablewithRadio from "../../components/TablewithRadio ";
import { useDispatch } from "react-redux";
import { fetchData, postData } from "../../redux/AdminSlice";
import {
  partylist_get_req,
  vote_get_req,
  vote_post_req,
} from "../../redux/Constant";

export default function Home() {
  const dispatch = useDispatch();
  const [connectionData, setConnectionData] = useState([]);
  const [voteData, setVoteData] = useState([]);
  const [error, setError] = useState(null);

  // Fetch data
  useEffect(() => {
    const fetchDataThunk = async () => {
      try {
        const connectionResponse = dispatch(
          fetchData({ endpoint: partylist_get_req, dataType: "connection" })
        );
        const voteResponse = dispatch(
          fetchData({ dataType: "vote", endpoint: vote_get_req })
        );
        setConnectionData(connectionResponse.payload.data);
        setVoteData(voteResponse.payload.data);
      } catch (err) {
        setError(err.message);
      }
    };
    fetchDataThunk();
  }, [dispatch]);

  // Get user Info
  const getUser = () => {
    const userData = JSON.parse(localStorage.getItem("userData"));
    return userData;
  };
  const user = getUser();

  // Post data
  const finalData = (rowData) => {
    dispatch(
      postData({
        dataType: "vote",
        endpoint: vote_post_req,
        payload: { user: user._id, party: rowData.id },
      })
    );
    // Update UI or show success message here
  };

  // Handle errors
  if (error) {
    return <div>Error: {error}</div>;
  }

  const data = connectionData?.map((connection) => ({
    id: connection._id,
    election_name: connection.election.election_name,
    party: connection.party.party_name,
    partylogo: connection.party.party_logo,
  }));

  return <TablewithRadio data={data} Output={finalData} />;
}
