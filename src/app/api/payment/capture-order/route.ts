import paypal from '@paypal/checkout-server-sdk';
import { NextResponse } from 'next/server';
import client from '../../../../utils/paypal/serverClient';

export async function POST(req) {
  const body = await req.json();
  console.log('REQ: ', body);
  // return NextResponse.json({ message: 'Hello World' }, { status: 200 });

  // Do whatever you want
  if (!body.orderID) {
    return NextResponse.json(
      { success: false, message: 'Please Provide Order ID' },
      { status: 400 }
    );
  }

  //Capture order to complete payment
  const { orderID } = body;
  const PaypalClient = client();
  const request = new paypal.orders.OrdersCaptureRequest(orderID);
  request.requestBody({});
  const response = await PaypalClient.execute(request);
  if (!response) {
    return NextResponse.json(
      { success: false, message: 'Some Error Occured at backend' },
      { status: 500 }
    );
  }
  console.log('capture Response: ', response);

  // Your Custom Code to Update Order Status
  // And Other stuff that is related to that order, like wallet
  // Here I am updateing the wallet and sending it back to frontend to update it on frontend

  // do whatever you want to do with the response

  return NextResponse.json(
    { success: true, data: { response } },
    { status: 200 }
  );
}
