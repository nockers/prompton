import { z } from "zod"
import { Biography, Email, Id, Name, Url, Username } from "core/valueObjects"

const zProps = z.object({
  id: z.instanceof(Id),
  email: z.instanceof(Email).nullable(),
  username: z.instanceof(Username).nullable(),
  name: z.instanceof(Name),
  biography: z.instanceof(Biography),
  headerImageId: z.instanceof(Id).nullable(),
  avatarImageURL: z.instanceof(Url).nullable(),
  avatarImageId: z.instanceof(Id).nullable(),
})

type Props = z.infer<typeof zProps>

/**
 * ユーザー
 */
export class UserEntity {
  /**
   * ID
   */
  readonly id!: Props["id"]

  /**
   * メールアドレス（非公開）
   */
  readonly email!: Props["email"]

  /**
   * ユーザーID
   */
  readonly username!: Props["username"]

  /**
   * 表示名
   */
  readonly name!: Props["name"]

  /**
   * 自己紹介
   */
  readonly biography!: Props["biography"]

  /**
   * ヘッダー画像
   */
  readonly headerImageId!: Props["headerImageId"]

  /**
   * アイコン画像（URL）
   */
  readonly avatarImageURL!: Props["avatarImageURL"]

  /**
   * アイコン画像
   */
  readonly avatarImageId!: Props["avatarImageId"]

  constructor(public props: Props) {
    zProps.parse(props)
    Object.assign(this, props)
    Object.freeze(this)
  }

  updateEmail(email: Email) {
    return new UserEntity({ ...this.props, email })
  }

  updateUsername(username: Username) {
    return new UserEntity({ ...this.props, username })
  }

  update(input: {
    headerImageId?: Id
    avatarImageId?: Id | null
    name: Name
    biography?: Biography
  }) {
    return new UserEntity({
      ...this.props,
      biography: input.biography ?? this.biography,
      name: input.name ?? this.name,
      headerImageId: input.headerImageId ?? this.headerImageId,
      avatarImageId: input.avatarImageId ?? this.avatarImageId,
    })
  }
}
