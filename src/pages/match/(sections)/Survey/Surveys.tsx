import { Context } from 'src/context/Context';
import React, { useContext, useEffect, useState } from 'react'
import Survey from './Survey';

export default function Surveys({ findSurveys }: {
    findSurveys: any;
}) {

    const { user } = useContext(Context);

    const [survey, setSurveys] = useState<any[]>([]);
    const [currentSurvey, setCurrentSurvey] = useState<any>(0);
    const [hasVoted, setHasVoted] = useState<boolean>(false);

    const findVoter = (survey: any, userId: string) => {
        if (!survey || !survey.voters) return;
        return survey.voters[userId];
    };

    useEffect(() => {
        if (survey.length === 0) setSurveys(findSurveys());
        if (user.hook.data && user.hook.data.id) {
            const voters = findVoter(survey[currentSurvey], user.hook.data.id);
            if (voters) setHasVoted(voters)
        }
    }, [user.hook.data, survey]);


    return (
        <div className="flex flex-col gap-4">
            {survey && survey.length > 0 && survey[currentSurvey] && (
                <Survey
                    survey={survey}
                    setSurveys={setSurveys}
                    findSurveys={findSurveys}
                    currentSurvey={currentSurvey}
                    hasVoted={hasVoted}
                    setHasVoted={setHasVoted}
                />
            )}

            {survey.length > 1 && (
                <div className='flex flex-col gap-4 mb-8'>
                    <p className='font-bold '>Outras enquetes</p>
                    {survey
                        .filter((e: any) => e.id !== survey[currentSurvey].id).map((e: any, i: number) => {
                            return (
                                <div onClick={() => {
                                    const index = survey.findIndex((each: any) => each.id === e.id);
                                    setCurrentSurvey(index);
                                    const voters = findVoter(survey[index], user.hook.data.id);
                                    if (voters) setHasVoted(voters);
                                    else setHasVoted(false);
                                }} className='shadow-sendShadow bg-white flex flex-col border border-primary rounded-[0.625rem] w-full p-4' key={`other_surveys_${i}`}>
                                    <span className='text-[0.75rem] text-primary font-bold'>
                                        Veja agora:
                                    </span>
                                    <span className='text-primary font-bold'>
                                        {e.question}
                                    </span>
                                </div>
                            )
                        })}
                </div>
            )}
        </div>
    )
}
