import { HTTPException } from "hono/http-exception"
import type { Context } from "~/env"
import { OrganizationMemberEntity } from "~/domain/entities/organization-member.entity"
import { OrganizationMemberRepository } from "~/infrastructure/repositories/organization-member.repository"
import { OrganizationRepository } from "~/infrastructure/repositories/organization.repository"

type Props = {
  organizationId: string
  userId: string
  role: "ADMIN" | "MEMBER"
}

/**
 * 組織のメンバーを作成する
 */
export class CreateOrganizationMember {
  constructor(
    readonly c: Context,
    readonly deps = {
      organizationRepository: new OrganizationRepository(c),
      memberRepository: new OrganizationMemberRepository(c),
    },
  ) {}

  async run(props: Props) {
    try {
      const organization = await this.deps.organizationRepository.read(
        props.organizationId,
      )

      if (organization === null) {
        return new HTTPException(404, {
          message: "指定された組織が存在しません。",
        })
      }

      const memberId = crypto.randomUUID()
      const member = new OrganizationMemberEntity({
        id: memberId,
        organizationId: props.organizationId,
        userId: props.userId,
        role: props.role,
        createdAt: new Date(),
      })

      const result = await this.deps.memberRepository.write(member)
      if (result instanceof Error) {
        return result
      }

      return member
    } catch (error) {
      return new HTTPException(500, {
        message: "メンバーの作成に失敗しました。",
      })
    }
  }
}
