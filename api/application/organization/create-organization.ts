import { OrganizationMemberEntity } from "~/domain/entities/organization-member.entity"
import { OrganizationEntity } from "~/domain/entities/organization.entity"
import { NameValue } from "~/domain/values/name.value"
import type { Context } from "~/env"
import { OrganizationMemberRepository } from "~/infrastructure/repositories/organization-member.repository"
import { OrganizationRepository } from "~/infrastructure/repositories/organization.repository"
import { InternalGraphQLError } from "~/interface/errors/internal-graphql-error"

type Props = {
  name: string
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
        name: new NameValue(props.name),
        deletedAt: null,
        createdAt: now,
        updatedAt: now,
      })

      const result = await this.deps.organizationRepository.write(organization)

      if (result instanceof Error) {
        return new InternalGraphQLError("組織の作成に失敗しました。")
      }

      const member = new OrganizationMemberEntity({
        id: crypto.randomUUID(),
        organizationId: organization.id,
        userId: props.userId,
        role: "OWNER",
        createdAt: now,
      })

      const memberResult = await this.deps.memberRepository.write(member)

      if (memberResult instanceof Error) {
        return new InternalGraphQLError("組織メンバーの作成に失敗しました。")
      }

      return organization
    } catch (error) {
      return new InternalGraphQLError()
    }
  }
}
