import { z } from "zod"
import { Biography, Email, Id, Name, Url, Username } from "core/valueObjects"

const zProps = z.object({
  id: z.instanceof(Id),
  email: z.instanceof(Email).nullable(),
  login: z.instanceof(Username).nullable(),
  name: z.instanceof(Name),
  biography: z.instanceof(Biography),
  headerImageId: z.instanceof(Id).nullable(),
  avatarImageURL: z.instanceof(Url).nullable(),
  avatarImageId: z.instanceof(Id).nullable(),
  isRequestable: z.boolean(),
  isRequestableForFree: z.boolean(),
  maximumFee: z.number(),
  minimumFee: z.number(),
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
  readonly login!: Props["login"]

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

  /**
   * リクエスト可能かどうか
   */
  readonly isRequestable!: Props["isRequestable"]

  /**
   * 無償でリクエスト可能かどうか
   */
  readonly isRequestableForFree!: Props["isRequestableForFree"]

  /**
   * 報酬の最大額
   */
  readonly maximumFee!: Props["maximumFee"]

  /**
   * 報酬の最低額
   */
  readonly minimumFee!: Props["minimumFee"]

  constructor(public props: Props) {
    zProps.parse(props)
    Object.assign(this, props)
    Object.freeze(this)
  }

  updateEmail(email: Email) {
    return new UserEntity({ ...this.props, email })
  }

  updateUsername(username: Username) {
    return new UserEntity({ ...this.props, login: username })
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

  updateRequestSettings(input: {
    isRequestable: boolean
    isRequestableForFree: boolean
    maximumFee: number
    minimumFee: number
  }) {
    return new UserEntity({
      ...this.props,
      isRequestable: input.isRequestable,
      isRequestableForFree: input.isRequestableForFree,
      maximumFee: input.maximumFee,
      minimumFee: input.minimumFee,
    })
  }
}
