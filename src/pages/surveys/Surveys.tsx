import { Context } from '../../context/Context'
import { IonContent } from '@ionic/react'
import React, { useContext } from 'react'
import Surveys from '../match/(sections)/Survey/Surveys'

export default function SurveysPage() {
    const { surveys } = useContext(Context);

    const findSurvey = () => {
        const returner = surveys.hook.data.filter((e: any) => {
            return !e.associateFootball;
        })
        return returner;
    }

    return (
        <IonContent fullscreen>
        <div className='m-4'>
            <Surveys findSurveys={findSurvey} />
        </div>
    </IonContent>
    )
}