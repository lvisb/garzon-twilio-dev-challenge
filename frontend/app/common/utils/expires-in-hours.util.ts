export const expiresInHours = (hours: number): Date => {
  const date = new Date()
  date.setHours(date.getHours() + hours)
  return date
}
