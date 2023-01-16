-- CreateTable
CREATE TABLE "passportUser" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "avatar" TEXT,

    CONSTRAINT "passportUser_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Tasks" (
    "id" SERIAL NOT NULL,
    "task" TEXT,
    "start_time" TEXT,
    "end_time" TEXT,
    "task_duration" TEXT,
    "user_id" TEXT NOT NULL,

    CONSTRAINT "Tasks_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Tasks" ADD CONSTRAINT "Tasks_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "passportUser"("id") ON DELETE CASCADE ON UPDATE CASCADE;
