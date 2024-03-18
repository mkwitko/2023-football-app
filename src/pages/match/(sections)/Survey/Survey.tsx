import { useIonLoading } from '@ionic/react'
import { useContext, useEffect, useState } from 'react'
import { Context } from 'src/context/Context'
import { validityDateHour } from 'src/utils/DateUtils'
import { findVoter } from 'src/utils/SurveysUtil'
import Percentual from './Percentual'

export default function Survey({
  survey,
  setSurveys,
  findSurveys,
  currentSurvey,
}: {
  survey: any
  setSurveys: any
  findSurveys: any
  currentSurvey: number
}) {
  const { user, surveys } = useContext(Context)

  const [displaySurvey, setDisplaySurvey] = useState<any>(survey[currentSurvey])

  const [voted, setVoted] = useState(false)

  useEffect(() => {
    setDisplaySurvey(survey[currentSurvey])
  }, [survey, currentSurvey])

  useEffect(() => {
    if (user.hook.data && user.hook.data.id) {
      surveys
        .getHttp(surveys.hook.data[currentSurvey].id)
        .then((response: any) => {
          const voters = findVoter(response, user.hook.data.id)
          setVoted(voters)
        })
    }
  }, [user.hook.data, survey, currentSurvey])

  const findVoteWidth = (options: any, each: any) => {
    let total = 0
    options.forEach((e: any) => {
      total += e.votes
    })

    const percentage = (each / total) * 100

    return percentage || 0
  }

  const findHighestVote = (options: any, each: any) => {
    let highest = 0
    options.forEach((e: any) => {
      if (e.votes > highest) highest = e.votes
    })
    const who = options.find((e: any) => e.votes === highest)

    if (who.value === each.value) return true
    return false
  }

  const isExpired = validityDateHour(
    survey[currentSurvey].validityDate,
    survey[currentSurvey].validityHour,
  )

  const [present, dismiss] = useIonLoading()

  return (
    <div className="bg-primary rounded-[0.625rem] p-4 flex flex-col">
      <div className="flex flex-col text-white">
        <p className="text-[0.75rem] md:text-[1.5rem]">Vote agora:</p>
        <p className="font-bold mb-4 text-[1rem] md:text-[2rem]">
          {displaySurvey.question}
        </p>
        <div className="flex flex-col gap-4">
          {displaySurvey.options.map((e: any, i: number) => {
            return (
              <div
                onClick={() => {
                  if (!voted && !isExpired) {
                    present()
                    const options = displaySurvey.options
                    options.forEach((each: any) => {
                      if (each.value === e.value) {
                        each.votes += 1
                      }
                    })
                    const data = {
                      id: displaySurvey.id,
                      options,
                      voters: {
                        ...e.voters,
                        [user.hook.data.id]: true,
                      },
                    }
                    surveys
                      .update(data)
                      .then(() => {
                        surveys
                          .getHttp(displaySurvey.id)
                          .then((response: any) => {
                            surveys.hook.setData(() => {
                              const index = survey.findIndex(
                                (each: any) => each.id === response.id,
                              )
                              const indexSetter = index === -1 ? 0 : index
                              const data = survey
                              data[indexSetter] = response
                              return data
                            })
                            setDisplaySurvey(response)
                          })
                      })
                      .finally(() => {
                        dismiss()
                      })
                  }
                }}
                key={i}
                className="p-2 bg-white cursor-pointer rounded-[0.625rem]"
              >
                {isExpired || voted ? (
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
            )
          })}
        </div>
      </div>
    </div>
  )
}
