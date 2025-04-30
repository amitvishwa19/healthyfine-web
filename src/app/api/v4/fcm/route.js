import { NextResponse } from 'next/server'
import { google } from 'googleapis'

export async function POST(req) {
    try {
        // console.log('Fcm Message')
        // const serviceAccount = require('../../../../../fcm_service_account.json')
        // var MESSAGING_SCOPE = 'https://www.googleapis.com/auth/firebase.messaging';
        // var SCOPES = [MESSAGING_SCOPE];
        // var access_token;

        // var jwtClient = new google.auth.JWT(
        //     serviceAccount.client_email,
        //     null,
        //     serviceAccount.private_key,
        //     SCOPES,
        //     null
        // );

        // jwtClient.authorize(function (err, tokens) {
        //     if (err) {
        //         reject(err);
        //         return;
        //     }

        //     const token = tokens.access_token


        //     console.log(token)
        //     //return tokens
        // });





        // console.log(access_token)

        return NextResponse.json({ status: 200, message: 'push notification sent' })
    } catch (error) {
        return NextResponse.json({ status: 500, message: 'Internal server Error' })
    }
}