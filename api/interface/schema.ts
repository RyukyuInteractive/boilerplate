import { builder } from "./builder"
import { createProject } from "./mutation-fields/create-project"
import { createProjectMember } from "./mutation-fields/create-project-member"
import { createUser } from "./mutation-fields/create-user"
import { deleteProject } from "./mutation-fields/delete-project"
import { updateProject } from "./mutation-fields/update-project"
import { updateProjectSetting } from "./mutation-fields/update-project-setting"
import { updateUser } from "./mutation-fields/update-user"
import { updateUserSetting } from "./mutation-fields/update-user-setting"
import { project } from "./query-fields/project"
import { user } from "./query-fields/user"
import { viewer } from "./query-fields/viewer"

import "./query-fields/cms/tables"
import "./mutation-fields/cms/create-table"
import "./mutation-fields/cms/create-column"
import "./mutation-fields/cms/create-record"
import "./mutation-fields/cms/update-cell"

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
