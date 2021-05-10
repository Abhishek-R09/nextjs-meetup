import { useRouter } from "next/router";
import Head from "next/head";
import NewMeetupForm from "../../components/meetups/NewMeetupForm";
import { Fragment } from "react";

const NewMeetup = (props) => {
  const router = useRouter();
  const addNewMeetupHandler = async (newMeetupData) => {
    console.log(newMeetupData);
    const response = await fetch("/api/new-meetup", {
      method: "POST",
      body: JSON.stringify(newMeetupData),
      headers: {
        "Content-Type": "application/json",
      },
    });
    const data = await response.json();
    console.log(data);
    router.replace("/");
  };
  return (
    <Fragment>
      {" "}
      <Head>
        <title>New Meetup</title>
      </Head>{" "}
      <NewMeetupForm onAddMeetup={addNewMeetupHandler} />
    </Fragment>
  );
};

export default NewMeetup;
