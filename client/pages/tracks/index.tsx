import React, { useState } from "react";
import MainLayout from "../../layouts/MainLayout";
import { Box, Button, Card, Grid, TextField } from "@material-ui/core";
import { useRouter } from "next/router";
import { ITrack } from "../../types/track";
import TrackList from "../../components/TrackList";
import Player from "../../components/Player";
import { useTypedSelector } from "../../hooks/useTypedSelector";
import { useActions } from "../../hooks/useActions";
import { NextThunkDispatch, wrapper } from "../../store";
import { fetchTracks, searchTracks } from "../../store/actions-creators/track";
import { useDispatch } from "react-redux";

const Index = () => {
  const router = useRouter();
  const { tracks, error } = useTypedSelector((state) => state.track);
  const [query, setQuery] = useState("");
  const [timer,setTimer] = useState(null)
  const dispatch = useDispatch() as NextThunkDispatch;

  const search = async (e: React.ChangeEvent<HTMLInputElement>) => {
    setQuery(e.target.value);
    if(timer){
        clearTimeout(timer)
    }
    setTimer(setTimeout(async()=>{
        await dispatch(searchTracks(e.target.value));
    },1000))
   
  };
  if (error) {
    return (
      <MainLayout>
        <h1>{error}</h1>
      </MainLayout>
    );
  }

  return (
    <MainLayout title={"List of tracks"}>
      <Grid container justifyContent="center">
        <Card style={{ width: 900 }}>
          <Box p={3}>
            <Grid container justifyContent="space-between">
              <h1>List</h1>
              <Button onClick={() => router.push("/tracks/create")}>
                Upload
              </Button>
            </Grid>
          </Box>
          <TextField
          placeholder="Search"
            style={{ padding: "0 35px 0 35px" }}
            fullWidth
            value={query}
            onChange={search}
          />
          <TrackList tracks={tracks} />
        </Card>
      </Grid>
    </MainLayout>
  );
};

export default Index;

export const getServerSideProps = wrapper.getServerSideProps(
  async ({ store }) => {
    const dispatch = store.dispatch as NextThunkDispatch;
    await dispatch(await fetchTracks());
  }
);
