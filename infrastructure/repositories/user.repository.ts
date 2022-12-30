import { captureException } from "@sentry/node"
import { Biography, Email, Id, Name, Url, UserEntity, Username } from "core"
import db from "db"

export class UserRepository {
  async find(id: Id) {
    try {
      const user = await db.user.findUnique({
        where: { id: id.value },
      })

      if (user === null) {
        return null
      }

      return new UserEntity({
        id: new Id(user.id),
        email: user.email ? new Email(user.email) : null,
        login: user.login !== null ? new Username(user.login) : null,
        name: new Name(user.name),
        biography: new Biography(""),
        isRequestable: user.isRequestable,
        minimumFee: user.minimumFee,
        maximumFee: user.maximumFee,
        headerImageId: null,
        avatarImageId: null,
        avatarImageURL:
          user.avatarImageURL !== null ? new Url(user.avatarImageURL) : null,
      })
    } catch (error) {
      captureException(error)
      return new Error()
    }
  }

  async findByUsername(username: Username) {
    try {
      const user = await db.user.findUnique({
        where: { login: username.value },
      })

      if (user === null) {
        return null
      }

      return new UserEntity({
        id: new Id(user.id),
        email: user.email ? new Email(user.email) : null,
        login: user.login !== null ? new Username(user.login) : null,
        name: new Name(user.name),
        biography: new Biography(""),
        isRequestable: user.isRequestable,
        minimumFee: user.minimumFee,
        maximumFee: user.maximumFee,
        headerImageId: null,
        avatarImageId: null,
        avatarImageURL:
          user.avatarImageURL !== null ? new Url(user.avatarImageURL) : null,
      })
    } catch (error) {
      captureException(error)
      return new Error()
    }
  }

  async persist(entity: UserEntity) {
    try {
      return db.user.upsert({
        create: {
          id: entity.id.value,
          email: entity.email?.value,
          login: entity.login?.value,
          name: entity.name.value,
          avatarImageURL: entity.avatarImageURL?.value,
          avatarFileId: entity.avatarImageId?.value,
          description: entity.biography.value,
        },
        update: {
          email: entity.email?.value,
          login: entity.login?.value,
          name: entity.name.value,
          avatarImageURL: entity.avatarImageURL?.value,
          avatarFileId: entity.avatarImageId?.value,
          description: entity.biography.value,
          isRequestable: entity.isRequestable,
          minimumFee: entity.minimumFee,
          maximumFee: entity.maximumFee,
        },
        where: { email: entity.email?.value },
      })
    } catch (error) {
      captureException(error)
      return new Error()
    }
  }
}
