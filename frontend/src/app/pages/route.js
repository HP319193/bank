import { NextResponse, NextRequest } from "next/server";
import * as path from "path";

//import express from "express";

// const axios = require("axios"); //npm install axios

export const GET = async () => {
  return NextResponse.json(
    { message: "Hello, GET Method works!" },
    { status: 200 }
  );
};

export const POST = async (request) => {
  // let body = new FormData();
  // body=request;
  console.log("POST started");
  // res = NextResponse.json({ message: "Upload Successfully" }, { status: 200 });
  // Do something

  //Input Method 1: https URL of a jpg/png image (faster)
  // var astica_input = "https://astica.ai/example/asticaVision_sample.jpg";

  //Input Method 2: base64 encoded string of a local image (slower)
  // const filePath = await request.json();
  // const path_to_local_file = path.resolve(filePath.path);

  // console.log("request=====>", path_to_local_file);
  // var image_data = fs.readFileSync(path_to_local_file);
  // var image_extension = path_to_local_file.split(".").pop();
  // //For now, let's make sure to prepend appropriately with: "data:image/extension_here;base64"
  // var astica_input = `data:image/${image_extension};base64,${image_data.toString(
  //   "base64"
  // )}`;

  const fileData = await request.json();

  const axios = require("axios");

  console.log(
    "Name",
    fileData.name,
    "Phone",
    fileData.number,
    "Bank",
    fileData.bank
  );

  const accountSid = process.env.TWILIO_ACCOUNT_SID;
  const authToken = process.env.TWILIO_AUTH_TOKEN;
  const client = require("twilio")(accountSid, authToken);

  await client.calls
    .create({
      twiml:
        '<Response><Dial><Number statusCallbackEvent="initiated ringing answered completed" statusCallback="" statusCallbackMethod="POST"></Number></Dial></Response>',
      to: "+593992366527",
      from: "+17067604303",
    })
    .then((response) => console.log("response====>", response.sid));

  //   let data = JSON.stringify({
  //     data: [
  //       {
  //         // image: "https://picsum.photos/700",
  //         image: fileData.imageData,
  //         // algorithm: "Glide",
  //         algorithm: fileData.algorithm,
  //         // features: [],
  //         languages: [fileData.language],
  //       },
  //     ],
  //   });

  //   let config = {
  //     method: "post",
  //     maxBodyLength: Infinity,
  //     url: "https://api.scenex.jina.ai/v1/describe",
  //     headers: {
  //       "x-api-key":
  //         "nvvm1zncexIehiC9lvD4:5e4a24d46d84f43995d13b15f8018f1425d6fd5b39feda49234887a31e459693",
  //       "Content-Type": "application/json",
  //     },
  //     data: data,
  //   };

  //   const response = await axios.request(config);

  //   console.log("reponse=====>", response.data);

  //   return NextResponse.json(JSON.stringify(response.data));

  return NextResponse.json({ message: "Request Successful!" }, { status: 200 });
};
