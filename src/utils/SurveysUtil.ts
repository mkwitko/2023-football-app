export const findVoter = (survey: any, userId: string) => {
  if (!survey || !survey.voters) return
  return survey.voters[userId]
}
