//@ts-nocheck
'use client';

import { Call } from "@stream-io/video-react-sdk";
import { useGetCalls } from "@/hooks/useGetCalls";
import type { NextPage } from 'next'

interface UpcomingMeetingProps {
    latestCall?: Call;
}

const UpcomingMeeting: NextPage<UpcomingMeetingProps> = () => {
    const { upcomingCalls } = useGetCalls();
    const latestCall = upcomingCalls?.find((call, index, arr) =>
        index === arr.length - 1
    );

    return (
        <div>
            {latestCall ? (
                <h2 className="glassmorphism max-w-[270px] rounded py-2 text-center text-base font-normal">
                    Upcoming Meeting at: {latestCall.state.startsAt.toLocaleString('IST', { hour: '2-digit', minute: '2-digit'}) || latestCall.start_time.toLocaleString('IST', { hour: '2-digit', minute: '2-digit'})}
                </h2>
            ) : (
                <h1>No meeting scheduled for today</h1>
            )}
        </div>
    );
};

export default UpcomingMeeting;