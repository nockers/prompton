import { captureException } from "@sentry/node"
import { Id, LabelEntity } from "core"
import db from "db"

export class LabelRepository {
  async findByName(name: string) {
    try {
      const label = await db.label.findUnique({
        where: { name: name },
      })

      if (label === null) {
        return null
      }

      return new LabelEntity({
        id: new Id(label.id),
        name: label.name,
      })
    } catch (error) {
      captureException(error)
      return new Error()
    }
  }

  async findManyByNames(names: string[]) {
    try {
      const labels = await db.label.findMany({
        where: { name: { in: names } },
      })

      return labels.map((label) => {
        return new LabelEntity({
          id: new Id(label.id),
          name: label.name,
        })
      })
    } catch (error) {
      captureException(error)
      return new Error()
    }
  }

  async persist(entity: LabelEntity) {
    try {
      await db.label.upsert({
        create: {
          id: entity.id.value,
          name: entity.name,
        },
        update: {},
        where: { name: entity.name },
      })

      return null
    } catch (error) {
      captureException(error)
      return new Error()
    }
  }
}
