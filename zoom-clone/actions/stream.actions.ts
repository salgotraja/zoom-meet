'use server';

import {StreamClient} from '@stream-io/node-sdk';
import {currentUser} from "@clerk/nextjs/server";

const apiKey = process.env.NEXT_PUBLIC_STREAM_API_KEY;
const apiSecret = process.env.STREAM_SECRET_KEY;

export const tokenProvider = async () => {
    const user = await currentUser();

    if (!user) throw new Error('User is not logged in.');
    if (!apiKey) throw new Error('API key is required');
    if (!apiSecret) throw new Error('API secret is required');

    const client = new StreamClient(apiKey, apiSecret);

    const exp = Math.round(new Date().getTime() / 1000) + 60 * 60;

    const issued = Math.floor(Date.now() / 1000) - 60;

    return client.createToken(user.id, exp, issued);
};