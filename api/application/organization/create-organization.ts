import type { Context } from "~/env"
import { HTTPException } from "hono/http-exception"
import { OrganizationMemberEntity } from "~/domain/entities/organization-member.entity"
import { OrganizationEntity } from "~/domain/entities/organization.entity"
import { OrganizationMemberRepository } from "~/infrastructure/repositories/organization-member.repository"
import { OrganizationRepository } from "~/infrastructure/repositories/organization.repository"

type Props = {
  name: string
  nameEN?: string | null
  userId: string
}

/**
 * 組織を作成する
 */
export class CreateOrganization {
  constructor(
    readonly c: Context,
    readonly deps = {
      organizationRepository: new OrganizationRepository(c),
      memberRepository: new OrganizationMemberRepository(c),
    },
  ) {}

  async run(props: Props) {
    try {
      const organizationId = crypto.randomUUID()

      const now = new Date()
      const organization = new OrganizationEntity({
        id: organizationId,
        login: organizationId,
        name: props.name,
        createdAt: now,
        updatedAt: now,
      })

      await this.deps.organizationRepository.write(organization)

      const member = new OrganizationMemberEntity({
        id: crypto.randomUUID(),
        organizationId: organization.id,
        userId: props.userId,
        role: "OWNER",
        createdAt: now,
      })

      await this.deps.memberRepository.write(member)

      return organization
    } catch (error) {
      return new HTTPException(500, {
        message: "組織の作成に失敗しました。詳細が不明なエラーが発生しました。",
      })
    }
  }
}
