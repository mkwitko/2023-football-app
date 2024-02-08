import { Context } from 'src/context/Context'
import React, { useContext, useEffect, useState } from 'react'
import Survey from './Survey'
import NoData from 'src/pages/components/NoData'

export default function Surveys({ findSurveys }: { findSurveys: any }) {
  const { surveys } = useContext(Context)

  const [survey, setSurveys] = useState<any[]>([])
  const [currentSurvey, setCurrentSurvey] = useState<any>(0)

  useEffect(() => {
    if (survey.length === 0) setSurveys(findSurveys())
  }, [])

  useEffect(() => {
    if (surveys.hook.data && surveys.hook.data.length > 0) {
      setSurveys(findSurveys())
    }
  }, [surveys.hook.data])

  return survey.length > 0 ? (
    <div className="m-4 flex flex-col gap-4">
      {survey && survey.length > 0 && survey[currentSurvey] && (
        <Survey
          survey={survey}
          setSurveys={setSurveys}
          findSurveys={findSurveys}
          currentSurvey={currentSurvey}
        />
      )}

      {survey.length > 1 && (
        <div className="flex flex-col gap-4 mb-8">
          <p className="font-bold text-[1rem] md:text-[1.5rem]">
            Outras enquetes
          </p>
          {survey
            .filter((e: any) => e.id !== survey[currentSurvey].id)
            .map((e: any, i: number) => {
              return (
                <div
                  onClick={() => {
                    const index = survey.findIndex(
                      (each: any) => each.id === e.id,
                    )
                    setCurrentSurvey(index)
                  }}
                  className="shadow-sendShadow bg-white flex flex-col border border-primary rounded-[0.625rem] w-full p-4"
                  key={`other_surveys_${i}`}
                >
                  <span className="text-[0.75rem] md:text-[1.5rem] text-primary font-bold">
                    Veja agora:
                  </span>
                  <span className="text-primary font-bold text-[1rem] md:text-[2rem]">
                    {e.question}
                  </span>
                </div>
              )
            })}
        </div>
      )}
    </div>
  ) : (
    <NoData text="enquetes" />
  )
}
