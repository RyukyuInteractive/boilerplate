import { builder } from "~/interface/builder"
import { createOrganization } from "~/interface/mutation-fields/create-organization"
import { createOrganizationMember } from "~/interface/mutation-fields/create-organization-member"
import { createProject } from "~/interface/mutation-fields/create-project"
import { createProjectMember } from "~/interface/mutation-fields/create-project-member"
import { createUser } from "~/interface/mutation-fields/create-user"
import { deleteOrganization } from "~/interface/mutation-fields/delete-organization"
import { deleteProject } from "~/interface/mutation-fields/delete-project"
import { updateOrganization } from "~/interface/mutation-fields/update-organization"
import { updateProject } from "~/interface/mutation-fields/update-project"
import { updateProjectSetting } from "~/interface/mutation-fields/update-project-setting"
import { updateUser } from "~/interface/mutation-fields/update-user"
import { updateUserSetting } from "~/interface/mutation-fields/update-user-setting"
import { organization } from "~/interface/query-fields/organization"
import { project } from "~/interface/query-fields/project"
import { user } from "~/interface/query-fields/user"
import { viewer } from "~/interface/query-fields/viewer"

builder.queryType({
  fields(t) {
    return {
      organization: organization(t),
      project: project(t),
      user: user(t),
      viewer: viewer(t),
    }
  },
})

builder.mutationType({
  fields(t) {
    return {
      createOrganization: createOrganization(t),
      createOrganizationMember: createOrganizationMember(t),
      createProject: createProject(t),
      createProjectMember: createProjectMember(t),
      createUser: createUser(t),
      deleteOrganization: deleteOrganization(t),
      deleteProject: deleteProject(t),
      updateOrganization: updateOrganization(t),
      updateProject: updateProject(t),
      updateProjectSetting: updateProjectSetting(t),
      updateUser: updateUser(t),
      updateUserSetting: updateUserSetting(t),
    }
  },
})

export const schema = builder.toSchema()
