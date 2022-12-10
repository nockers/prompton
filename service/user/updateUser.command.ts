import { captureException } from "@sentry/node"
import { injectable } from "tsyringe"
import { Id, Name } from "core"
import { UserRepository } from "infrastructure"

type Props = {
  userId: string
  userName: string
  userAvatarFileId: string | null
}

@injectable()
export class UpdateUserCommand {
  constructor(private readonly userRepository: UserRepository) {}

  async execute(props: Props) {
    try {
      const user = await this.userRepository.find(new Id(props.userId))

      if (user === null) {
        return new Error()
      }

      if (user instanceof Error) {
        return new Error()
      }

      const draftUser = user.update({
        avatarImageId: props.userAvatarFileId
          ? new Id(props.userAvatarFileId)
          : null,
        name: new Name(props.userName),
      })

      const transaction = await this.userRepository.persist(draftUser)

      if (transaction instanceof Error) {
        return new Error()
      }

      return null
    } catch (error) {
      captureException(error)
      return new Error()
    }
  }
}
