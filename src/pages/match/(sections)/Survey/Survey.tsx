import React, { useContext, useEffect, useState } from 'react'
import Percentual from './Percentual';
import { Context } from 'src/context/Context';
import { validityDateHour } from 'src/utils/DateUtils';

export default function Survey({
    survey,
    setSurveys,
    findSurveys,
    currentSurvey,
    hasVoted,
    setHasVoted,
}: {
    survey: any;
    setSurveys: any;
    findSurveys: any;
    currentSurvey: number;
    hasVoted: boolean;
    setHasVoted: any;
}) {
    const { user, surveys } = useContext(Context);

    const [displaySurvey, setDisplaySurvey] = useState<any>(survey[currentSurvey]);


    useEffect(() => {
        setDisplaySurvey(survey[currentSurvey]);
    }, [currentSurvey])
    
    const findVoteWidth = (options: any, each: any) => {
        let total = 0;
        options.forEach((e: any) => {
            total += e.votes;
        });

        const percentage = (each / total) * 100;

        return percentage || 0;
    };

    const findHighestVote = (options: any, each: any) => {
        let highest = 0;
        options.forEach((e: any) => {
            if (e.votes > highest) highest = e.votes;
        });
        const who = options.find((e: any) => {
            if (e.votes === highest) return e;
        });

        if (who.value === each.value) return true;
        return false;
    };

    const isValid = validityDateHour(survey[currentSurvey].validityDate, survey[currentSurvey].validityHour);

    return (
        <div className="bg-primary rounded-[0.625rem] p-4 flex flex-col">
            <div className="flex flex-col text-white">
                <p className="text-[0.75rem] md:text-[1.5rem]">Vote agora:</p>
                <p className="font-bold mb-4 text-[1rem] md:text-[2rem]">{displaySurvey.question}</p>
                <div className="flex flex-col gap-4">
                    {displaySurvey.options.map((e: any, i: number) => {
                        return (
                            <div
                                onClick={() => {
                                    if (!hasVoted) {
                                        const options = displaySurvey.options;
                                        options.find((each: any) => {
                                            if (each.value === e.value) {
                                                each.votes += 1;
                                            }
                                        });
                                        const data = {
                                            id: displaySurvey.id,
                                            options,
                                            voters: {
                                                ...e.voters,
                                                [user.hook.data.id]: true,
                                            },
                                        };
                                        surveys.update(data).then(() => {
                                            surveys.getHttp(displaySurvey.id).then((response: any) => {
                                                setDisplaySurvey(response);
                                                let data;
                                                surveys.hook.setData((prev: any) => {
                                                    const index = prev.findIndex((each: any) => each.id === response.id);
                                                    prev[index] = response;
                                                    data = prev;
                                                    return prev;
                                                })
                                                setSurveys(findSurveys(data));
                                                setHasVoted(true);
                                            })
                                        });
                                    }
                                }}
                                key={i}
                                className="p-2 bg-white cursor-pointer rounded-[0.625rem]"
                            >
                                {!isValid || hasVoted ? (
                                    <Percentual
                                        highest={findHighestVote(displaySurvey.options, e)}
                                        width={findVoteWidth(displaySurvey.options, e.votes)}
                                        e={e}
                                    />
                                ) : (
                                    <p className="text-primary-900 text-center font-bold h-8 leading-8 md:leading-[3rem] text-[1rem] md:text-[1.5rem]">
                                        {e.value}
                                    </p>
                                )}
                            </div>
                        );
                    })}
                </div>
            </div>
        </div>
    )
}
