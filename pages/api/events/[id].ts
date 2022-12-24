import { getApps, initializeApp } from "firebase-admin/app"
import type { NextApiHandler } from "next"
import { container } from "tsyringe"
import { z } from "zod"
import { Id } from "core"
import { Env, EventRepository } from "infrastructure"
import { EventHandler } from "service"

const zBody = z.object({
  eventToken: z.string(),
})

if (getApps().length === 0) {
  initializeApp({
    credential: Env.googleCredential,
    storageBucket: Env.googleStorageBucket,
  })
}

const apiEvent: NextApiHandler = async (req, res) => {
  const eventId = req.query.id

  if (typeof eventId !== "string") {
    res.status(500).json({})
    return
  }

  const result = zBody.safeParse(req.body)

  if (!result.success) {
    res.status(500).json({})
    return
  }

  if (result.data.eventToken !== Env.eventToken) {
    res.status(500).json({})
    return
  }

  const repository = container.resolve(EventRepository)

  const event = await repository.find(new Id(eventId))

  if (event === null) {
    res.status(200).json({})
    return
  }

  if (event instanceof Error) {
    res.status(500).json({})
    return
  }

  const service = new EventHandler()

  await service.execute(event)

  res.status(200).json({})
}

export default apiEvent
