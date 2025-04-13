import { builder } from "~/interface/builder"
import { createProject } from "~/interface/mutation-fields/create-project"
import { createProjectMember } from "~/interface/mutation-fields/create-project-member"
import { createUser } from "~/interface/mutation-fields/create-user"
import { deleteProject } from "~/interface/mutation-fields/delete-project"
import { updateProject } from "~/interface/mutation-fields/update-project"
import { updateProjectSetting } from "~/interface/mutation-fields/update-project-setting"
import { updateUser } from "~/interface/mutation-fields/update-user"
import { updateUserSetting } from "~/interface/mutation-fields/update-user-setting"
import { project } from "~/interface/query-fields/project"
import { user } from "~/interface/query-fields/user"
import { viewer } from "~/interface/query-fields/viewer"

builder.queryType({
  fields(t) {
    return {
      project: project(t),
      user: user(t),
      viewer: viewer(t),
    }
  },
})

builder.mutationType({
  fields(t) {
    return {
      createProject: createProject(t),
      createProjectMember: createProjectMember(t),
      createUser: createUser(t),
      deleteProject: deleteProject(t),
      updateProject: updateProject(t),
      updateProjectSetting: updateProjectSetting(t),
      updateUser: updateUser(t),
      updateUserSetting: updateUserSetting(t),
    }
  },
})

export const schema = builder.toSchema()
