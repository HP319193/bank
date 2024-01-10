import { NextResponse, NextRequest } from "next/server";

const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;
const client = require("twilio")(accountSid, authToken);

export const GET = async () => {
  let transciptSID;
  let JSONuri;
  await client.transcriptions.list({ limit: 1 }).then((transcriptions) =>
    transcriptions.forEach((tran) => {
      transciptSID = tran.sid;
      console.log("sid====>", transciptSID);
    })
  );
  await client
    .transcriptions(transciptSID)
    .fetch()
    .then(
      (transcription) => (JSONuri = transcription.uri),
      console.log("data fetch======>", transcription.uri)
    );

  return NextResponse.json(
    { message: "Hello, GET Method works!" },
    { status: 200 }
  );
};
