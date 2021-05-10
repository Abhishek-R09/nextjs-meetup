import React, { Fragment, useEffect, useState } from "react";
import MeetupList from "../components/meetups/MeetupList";
import { MongoClient } from "mongodb";
import Head from "next/head";

const HomePage = (props) => {
  // const [data, setData] = useState([]);
  // useEffect(() => {
  //   setData(DUMMY_MEETUPS);
  // }, []);
  // return <MeetupList meetups={data} />;
  return (
    <Fragment>
      <Head>
        <title>React Meetups</title>
      </Head>
      <MeetupList meetups={props.meetups} />
    </Fragment>
  );
};

// export const getServerSideProps = (context) => {
//   // Run any async codes here
//   // Runs for every incoming req

//   return {
//     props: {
//       meetups: DUMMY_MEETUPS,
//     },
//     revalidate: 10 // Num of secs after which regenerated on server
//   };
// }

export const getStaticProps = async () => {
  // Run any async codes here
  const client = await MongoClient.connect(
    "mongodb+srv://admin-abhishek:67z56rQ8aXjfjxKm@cluster0.rzdh9.mongodb.net/meetupsDB?retryWrites=true&w=majority"
  );
  const db = client.db();
  const meetupsCollection = db.collection("meetups");
  const meetups = await meetupsCollection.find().toArray();
  client.close();
  return {
    props: {
      meetups: meetups.map((meetup) => ({
        id: meetup._id.toString(),
        title: meetup.title,
        image: meetup.image,
        address: meetup.address,
      })),
    },
    revalidate: 10, // Num of secs after which regenerated on server
  };
};

export default HomePage;
