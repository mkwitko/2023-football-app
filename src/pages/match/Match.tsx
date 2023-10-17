import React, { useContext, useEffect, useState } from 'react';
import { getCache } from '../../services/Cache';
import {
    IonContent,
    IonSegment,
    IonSegmentButton,
} from '@ionic/react';
import { Context } from '../../context/Context';
import MatchCardFull from '../../components/home/cards/MatchCardFull';
import Stats from './(sections)/Stats/Stats';
import { otherTeamId } from '../../utils/FootballUtils';
import Head2Head from './(sections)/Head2Head/Head2Head';
import LineUp from './(sections)/LineUp/LineUp';
import Surveys from './(sections)/Survey/Surveys';

export default function Match() {
    const { head2Head, surveys } = useContext(Context);

    const match = getCache('match');

    const findSurveys = (data?: any) => {
        const survey = data ?? surveys.hook.data;
        const returner = survey.map((e: any) => {
            if (+e.associatedMatchId === +match.match_id) return e;
        })
            .filter((e: any) => e);
        return returner;
    };


    const tabs = [
        {
            title: 'Estatísticas',
        },
        {
            title: 'Confronto',
        },
        {
            title: 'Escalação',
        },
        {
            title: 'Enquete',
            disabled: findSurveys().length === 0,
        },
    ];


    const willUseTabs = match.statistics.length > 0;

    const other_team_cache = getCache('other_team_id');

    const [currentView, setCurrentView] = useState<string>(tabs[0].title);
    const [head2head, setHead2head] = useState([]);

    const other_team_id = otherTeamId(match);

    const getHead2Head = async () => {
        if (other_team_cache !== other_team_id) {
            await head2Head(
                process.env.REACT_APP_FOOTBALL_API_CLUB,
                other_team_id
            ).then((res: any) => {
                setHead2head(res);
            });
        } else {
            setHead2head(getCache('head2head'));
        }
    };



    const isHome =
        match.match_hometeam_id === process.env.REACT_APP_FOOTBALL_API_CLUB;

    useEffect(() => {
        getHead2Head();
    }, []);

    return (
        <IonContent fullscreen>
            <MatchCardFull match={match} />
            <IonSegment
                value={currentView}
                className="match-segment rounded-none bg-primary-300 "
                onIonChange={(e: any) => {
                    const title: string = e.detail.value;
                    setCurrentView(title);
                }}
            >
                {willUseTabs &&
                    tabs.map((e) => (
                        <IonSegmentButton
                            mode="ios"
                            value={e.title}
                            key={e.title}
                            className="rounded-none"
                            disabled={e.disabled || false}
                        >
                            <p className="text-white">{e.title}</p>
                        </IonSegmentButton>
                    ))}
            </IonSegment>

            <div className="m-4">
                {willUseTabs && currentView === tabs[0].title && (
                    <div className="flex flex-col gap-4 p-4 bg-white shadow-convenienceShadow rounded-[0.625rem] w-full">
                        <Stats
                            stats={match.statistics}
                            isHome={isHome}
                        />
                    </div>
                )}
                {!willUseTabs && (
                    <div className="flex flex-col gap-4 p-4 bg-white shadow-convenienceShadow rounded-[0.625rem] w-full">
                        <Head2Head
                            head2head={head2head}
                            isHome={isHome}
                            match={match}
                        />
                    </div>
                )}
                {willUseTabs && currentView === tabs[1].title && (
                    <div className="flex flex-col gap-4 p-4 bg-white shadow-convenienceShadow rounded-[0.625rem] w-full">
                        <Head2Head
                            head2head={head2head}
                            isHome={isHome}
                            match={match}
                        />
                    </div>
                )}
                {willUseTabs && currentView === tabs[2].title && (
                    <div className="flex flex-col">
                        <LineUp
                            match={match}
                            isHome={isHome}
                        />
                    </div>
                )}

                {willUseTabs && currentView === tabs[3].title && (
                    <Surveys findSurveys={findSurveys} />
                )}
            </div>
        </IonContent>
    );
}
