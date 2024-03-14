import { TaskList } from "@prisma/client"
import { TaskType } from "../components/TodoList"
import { isTimeLeft } from "./isTimeLeft"

export const isTodoListCompleted = (targetDate: string, currentDate: Date, task: TaskList[] | undefined): boolean | undefined => {
    if (isTimeLeft(targetDate, currentDate) === true) {
        return false
    } else if (task?.every(t => {
        const tIsDone = Boolean(t.isDone)
        return tIsDone === true
    })
        && task.length > 0) {
        return true
    }

}