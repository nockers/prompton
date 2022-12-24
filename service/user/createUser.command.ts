import { captureException } from "@sentry/node"
import { injectable } from "tsyringe"
import { Biography, Email, Id, Name, Url, UserEntity } from "core"
import { UserRepository } from "infrastructure"

type Props = {
  userId: string
  userName: string
  userAvatarURL: string | null
  userEmail: string | null
}

@injectable()
export class CreateUserCommand {
  constructor(private readonly userRepository: UserRepository) {}

  async execute(props: Props) {
    try {
      const draftUser = new UserEntity({
        id: new Id(props.userId),
        email: props.userEmail ? new Email(props.userEmail) : null,
        biography: new Biography(""),
        headerImageId: null,
        avatarImageId: null,
        avatarImageURL:
          props.userAvatarURL !== null ? new Url(props.userAvatarURL) : null,
        name: new Name(props.userName),
        login: null,
      })

      const transaction = await this.userRepository.persist(draftUser)

      if (transaction instanceof Error) {
        return new Error()
      }

      return { userId: draftUser.id.value }
    } catch (error) {
      captureException(error)
      return new Error()
    }
  }
}
