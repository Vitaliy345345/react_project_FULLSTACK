export const isTimeLeft = (targetDate: string, currentDate: Date): boolean => {
    const target = new Date(targetDate)

    if(target <= currentDate) {
        return true
    }
    return false
}