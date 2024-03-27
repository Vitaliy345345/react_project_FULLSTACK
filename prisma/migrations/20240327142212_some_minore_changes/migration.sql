/*
  Warnings:

  - Made the column `userId` on table `TaskList` required. This step will fail if there are existing NULL values in that column.

*/
-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_TaskList" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "title" TEXT NOT NULL,
    "isDone" TEXT NOT NULL DEFAULT 'false',
    "todoId" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    CONSTRAINT "TaskList_todoId_fkey" FOREIGN KEY ("todoId") REFERENCES "TodoList" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "TaskList_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_TaskList" ("id", "isDone", "title", "todoId", "userId") SELECT "id", "isDone", "title", "todoId", "userId" FROM "TaskList";
DROP TABLE "TaskList";
ALTER TABLE "new_TaskList" RENAME TO "TaskList";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
