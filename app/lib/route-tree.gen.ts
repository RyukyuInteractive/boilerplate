/* eslint-disable */

// @ts-nocheck

// noinspection JSUnusedGlobalSymbols

// This file was automatically generated by TanStack Router.
// You should NOT make any changes in this file as it will be overwritten.
// Additionally, you should also exclude this file from your linter and/or formatter to prevent it from being checked or modified.

// Import Routes

import { Route as rootRoute } from './../interface/routes/__root'
import { Route as NewImport } from './../interface/routes/new'
import { Route as AuthImport } from './../interface/routes/_auth'
import { Route as PasswordRestoreImport } from './../interface/routes/password.restore'
import { Route as AuthHomeImport } from './../interface/routes/_auth._home'
import { Route as AuthProjectImport } from './../interface/routes/_auth.$project'
import { Route as AuthHomeIndexImport } from './../interface/routes/_auth._home.index'
import { Route as AuthProjectIndexImport } from './../interface/routes/_auth.$project.index'
import { Route as AuthProjectSettingsImport } from './../interface/routes/_auth.$project.settings'
import { Route as AuthProjectMembersImport } from './../interface/routes/_auth.$project.members'
import { Route as AuthHomeProjectsNewImport } from './../interface/routes/_auth._home.projects.new'
import { Route as AuthHomeMySettingsImport } from './../interface/routes/_auth._home.my.settings'
import { Route as AuthHomeMyProjectsImport } from './../interface/routes/_auth._home.my.projects'
import { Route as AuthHomeMyProfileImport } from './../interface/routes/_auth._home.my.profile'
import { Route as AuthHomeMyAccountImport } from './../interface/routes/_auth._home.my.account'

// Create/Update Routes

const NewRoute = NewImport.update({
  id: '/new',
  path: '/new',
  getParentRoute: () => rootRoute,
} as any)

const AuthRoute = AuthImport.update({
  id: '/_auth',
  getParentRoute: () => rootRoute,
} as any)

const PasswordRestoreRoute = PasswordRestoreImport.update({
  id: '/password/restore',
  path: '/password/restore',
  getParentRoute: () => rootRoute,
} as any)

const AuthHomeRoute = AuthHomeImport.update({
  id: '/_home',
  getParentRoute: () => AuthRoute,
} as any)

const AuthProjectRoute = AuthProjectImport.update({
  id: '/$project',
  path: '/$project',
  getParentRoute: () => AuthRoute,
} as any)

const AuthHomeIndexRoute = AuthHomeIndexImport.update({
  id: '/',
  path: '/',
  getParentRoute: () => AuthHomeRoute,
} as any)

const AuthProjectIndexRoute = AuthProjectIndexImport.update({
  id: '/',
  path: '/',
  getParentRoute: () => AuthProjectRoute,
} as any)

const AuthProjectSettingsRoute = AuthProjectSettingsImport.update({
  id: '/settings',
  path: '/settings',
  getParentRoute: () => AuthProjectRoute,
} as any)

const AuthProjectMembersRoute = AuthProjectMembersImport.update({
  id: '/members',
  path: '/members',
  getParentRoute: () => AuthProjectRoute,
} as any)

const AuthHomeProjectsNewRoute = AuthHomeProjectsNewImport.update({
  id: '/projects/new',
  path: '/projects/new',
  getParentRoute: () => AuthHomeRoute,
} as any)

const AuthHomeMySettingsRoute = AuthHomeMySettingsImport.update({
  id: '/my/settings',
  path: '/my/settings',
  getParentRoute: () => AuthHomeRoute,
} as any)

const AuthHomeMyProjectsRoute = AuthHomeMyProjectsImport.update({
  id: '/my/projects',
  path: '/my/projects',
  getParentRoute: () => AuthHomeRoute,
} as any)

const AuthHomeMyProfileRoute = AuthHomeMyProfileImport.update({
  id: '/my/profile',
  path: '/my/profile',
  getParentRoute: () => AuthHomeRoute,
} as any)

const AuthHomeMyAccountRoute = AuthHomeMyAccountImport.update({
  id: '/my/account',
  path: '/my/account',
  getParentRoute: () => AuthHomeRoute,
} as any)

// Populate the FileRoutesByPath interface

declare module '@tanstack/react-router' {
  interface FileRoutesByPath {
    '/_auth': {
      id: '/_auth'
      path: ''
      fullPath: ''
      preLoaderRoute: typeof AuthImport
      parentRoute: typeof rootRoute
    }
    '/new': {
      id: '/new'
      path: '/new'
      fullPath: '/new'
      preLoaderRoute: typeof NewImport
      parentRoute: typeof rootRoute
    }
    '/_auth/$project': {
      id: '/_auth/$project'
      path: '/$project'
      fullPath: '/$project'
      preLoaderRoute: typeof AuthProjectImport
      parentRoute: typeof AuthImport
    }
    '/_auth/_home': {
      id: '/_auth/_home'
      path: ''
      fullPath: ''
      preLoaderRoute: typeof AuthHomeImport
      parentRoute: typeof AuthImport
    }
    '/password/restore': {
      id: '/password/restore'
      path: '/password/restore'
      fullPath: '/password/restore'
      preLoaderRoute: typeof PasswordRestoreImport
      parentRoute: typeof rootRoute
    }
    '/_auth/$project/members': {
      id: '/_auth/$project/members'
      path: '/members'
      fullPath: '/$project/members'
      preLoaderRoute: typeof AuthProjectMembersImport
      parentRoute: typeof AuthProjectImport
    }
    '/_auth/$project/settings': {
      id: '/_auth/$project/settings'
      path: '/settings'
      fullPath: '/$project/settings'
      preLoaderRoute: typeof AuthProjectSettingsImport
      parentRoute: typeof AuthProjectImport
    }
    '/_auth/$project/': {
      id: '/_auth/$project/'
      path: '/'
      fullPath: '/$project/'
      preLoaderRoute: typeof AuthProjectIndexImport
      parentRoute: typeof AuthProjectImport
    }
    '/_auth/_home/': {
      id: '/_auth/_home/'
      path: '/'
      fullPath: '/'
      preLoaderRoute: typeof AuthHomeIndexImport
      parentRoute: typeof AuthHomeImport
    }
    '/_auth/_home/my/account': {
      id: '/_auth/_home/my/account'
      path: '/my/account'
      fullPath: '/my/account'
      preLoaderRoute: typeof AuthHomeMyAccountImport
      parentRoute: typeof AuthHomeImport
    }
    '/_auth/_home/my/profile': {
      id: '/_auth/_home/my/profile'
      path: '/my/profile'
      fullPath: '/my/profile'
      preLoaderRoute: typeof AuthHomeMyProfileImport
      parentRoute: typeof AuthHomeImport
    }
    '/_auth/_home/my/projects': {
      id: '/_auth/_home/my/projects'
      path: '/my/projects'
      fullPath: '/my/projects'
      preLoaderRoute: typeof AuthHomeMyProjectsImport
      parentRoute: typeof AuthHomeImport
    }
    '/_auth/_home/my/settings': {
      id: '/_auth/_home/my/settings'
      path: '/my/settings'
      fullPath: '/my/settings'
      preLoaderRoute: typeof AuthHomeMySettingsImport
      parentRoute: typeof AuthHomeImport
    }
    '/_auth/_home/projects/new': {
      id: '/_auth/_home/projects/new'
      path: '/projects/new'
      fullPath: '/projects/new'
      preLoaderRoute: typeof AuthHomeProjectsNewImport
      parentRoute: typeof AuthHomeImport
    }
  }
}

// Create and export the route tree

interface AuthProjectRouteChildren {
  AuthProjectMembersRoute: typeof AuthProjectMembersRoute
  AuthProjectSettingsRoute: typeof AuthProjectSettingsRoute
  AuthProjectIndexRoute: typeof AuthProjectIndexRoute
}

const AuthProjectRouteChildren: AuthProjectRouteChildren = {
  AuthProjectMembersRoute: AuthProjectMembersRoute,
  AuthProjectSettingsRoute: AuthProjectSettingsRoute,
  AuthProjectIndexRoute: AuthProjectIndexRoute,
}

const AuthProjectRouteWithChildren = AuthProjectRoute._addFileChildren(
  AuthProjectRouteChildren,
)

interface AuthHomeRouteChildren {
  AuthHomeIndexRoute: typeof AuthHomeIndexRoute
  AuthHomeMyAccountRoute: typeof AuthHomeMyAccountRoute
  AuthHomeMyProfileRoute: typeof AuthHomeMyProfileRoute
  AuthHomeMyProjectsRoute: typeof AuthHomeMyProjectsRoute
  AuthHomeMySettingsRoute: typeof AuthHomeMySettingsRoute
  AuthHomeProjectsNewRoute: typeof AuthHomeProjectsNewRoute
}

const AuthHomeRouteChildren: AuthHomeRouteChildren = {
  AuthHomeIndexRoute: AuthHomeIndexRoute,
  AuthHomeMyAccountRoute: AuthHomeMyAccountRoute,
  AuthHomeMyProfileRoute: AuthHomeMyProfileRoute,
  AuthHomeMyProjectsRoute: AuthHomeMyProjectsRoute,
  AuthHomeMySettingsRoute: AuthHomeMySettingsRoute,
  AuthHomeProjectsNewRoute: AuthHomeProjectsNewRoute,
}

const AuthHomeRouteWithChildren = AuthHomeRoute._addFileChildren(
  AuthHomeRouteChildren,
)

interface AuthRouteChildren {
  AuthProjectRoute: typeof AuthProjectRouteWithChildren
  AuthHomeRoute: typeof AuthHomeRouteWithChildren
}

const AuthRouteChildren: AuthRouteChildren = {
  AuthProjectRoute: AuthProjectRouteWithChildren,
  AuthHomeRoute: AuthHomeRouteWithChildren,
}

const AuthRouteWithChildren = AuthRoute._addFileChildren(AuthRouteChildren)

export interface FileRoutesByFullPath {
  '': typeof AuthHomeRouteWithChildren
  '/new': typeof NewRoute
  '/$project': typeof AuthProjectRouteWithChildren
  '/password/restore': typeof PasswordRestoreRoute
  '/$project/members': typeof AuthProjectMembersRoute
  '/$project/settings': typeof AuthProjectSettingsRoute
  '/$project/': typeof AuthProjectIndexRoute
  '/': typeof AuthHomeIndexRoute
  '/my/account': typeof AuthHomeMyAccountRoute
  '/my/profile': typeof AuthHomeMyProfileRoute
  '/my/projects': typeof AuthHomeMyProjectsRoute
  '/my/settings': typeof AuthHomeMySettingsRoute
  '/projects/new': typeof AuthHomeProjectsNewRoute
}

export interface FileRoutesByTo {
  '': typeof AuthRouteWithChildren
  '/new': typeof NewRoute
  '/password/restore': typeof PasswordRestoreRoute
  '/$project/members': typeof AuthProjectMembersRoute
  '/$project/settings': typeof AuthProjectSettingsRoute
  '/$project': typeof AuthProjectIndexRoute
  '/': typeof AuthHomeIndexRoute
  '/my/account': typeof AuthHomeMyAccountRoute
  '/my/profile': typeof AuthHomeMyProfileRoute
  '/my/projects': typeof AuthHomeMyProjectsRoute
  '/my/settings': typeof AuthHomeMySettingsRoute
  '/projects/new': typeof AuthHomeProjectsNewRoute
}

export interface FileRoutesById {
  __root__: typeof rootRoute
  '/_auth': typeof AuthRouteWithChildren
  '/new': typeof NewRoute
  '/_auth/$project': typeof AuthProjectRouteWithChildren
  '/_auth/_home': typeof AuthHomeRouteWithChildren
  '/password/restore': typeof PasswordRestoreRoute
  '/_auth/$project/members': typeof AuthProjectMembersRoute
  '/_auth/$project/settings': typeof AuthProjectSettingsRoute
  '/_auth/$project/': typeof AuthProjectIndexRoute
  '/_auth/_home/': typeof AuthHomeIndexRoute
  '/_auth/_home/my/account': typeof AuthHomeMyAccountRoute
  '/_auth/_home/my/profile': typeof AuthHomeMyProfileRoute
  '/_auth/_home/my/projects': typeof AuthHomeMyProjectsRoute
  '/_auth/_home/my/settings': typeof AuthHomeMySettingsRoute
  '/_auth/_home/projects/new': typeof AuthHomeProjectsNewRoute
}

export interface FileRouteTypes {
  fileRoutesByFullPath: FileRoutesByFullPath
  fullPaths:
    | ''
    | '/new'
    | '/$project'
    | '/password/restore'
    | '/$project/members'
    | '/$project/settings'
    | '/$project/'
    | '/'
    | '/my/account'
    | '/my/profile'
    | '/my/projects'
    | '/my/settings'
    | '/projects/new'
  fileRoutesByTo: FileRoutesByTo
  to:
    | ''
    | '/new'
    | '/password/restore'
    | '/$project/members'
    | '/$project/settings'
    | '/$project'
    | '/'
    | '/my/account'
    | '/my/profile'
    | '/my/projects'
    | '/my/settings'
    | '/projects/new'
  id:
    | '__root__'
    | '/_auth'
    | '/new'
    | '/_auth/$project'
    | '/_auth/_home'
    | '/password/restore'
    | '/_auth/$project/members'
    | '/_auth/$project/settings'
    | '/_auth/$project/'
    | '/_auth/_home/'
    | '/_auth/_home/my/account'
    | '/_auth/_home/my/profile'
    | '/_auth/_home/my/projects'
    | '/_auth/_home/my/settings'
    | '/_auth/_home/projects/new'
  fileRoutesById: FileRoutesById
}

export interface RootRouteChildren {
  AuthRoute: typeof AuthRouteWithChildren
  NewRoute: typeof NewRoute
  PasswordRestoreRoute: typeof PasswordRestoreRoute
}

const rootRouteChildren: RootRouteChildren = {
  AuthRoute: AuthRouteWithChildren,
  NewRoute: NewRoute,
  PasswordRestoreRoute: PasswordRestoreRoute,
}

export const routeTree = rootRoute
  ._addFileChildren(rootRouteChildren)
  ._addFileTypes<FileRouteTypes>()

/* ROUTE_MANIFEST_START
{
  "routes": {
    "__root__": {
      "filePath": "__root.tsx",
      "children": [
        "/_auth",
        "/new",
        "/password/restore"
      ]
    },
    "/_auth": {
      "filePath": "_auth.tsx",
      "children": [
        "/_auth/$project",
        "/_auth/_home"
      ]
    },
    "/new": {
      "filePath": "new.tsx"
    },
    "/_auth/$project": {
      "filePath": "_auth.$project.tsx",
      "parent": "/_auth",
      "children": [
        "/_auth/$project/members",
        "/_auth/$project/settings",
        "/_auth/$project/"
      ]
    },
    "/_auth/_home": {
      "filePath": "_auth._home.tsx",
      "parent": "/_auth",
      "children": [
        "/_auth/_home/",
        "/_auth/_home/my/account",
        "/_auth/_home/my/profile",
        "/_auth/_home/my/projects",
        "/_auth/_home/my/settings",
        "/_auth/_home/projects/new"
      ]
    },
    "/password/restore": {
      "filePath": "password.restore.tsx"
    },
    "/_auth/$project/members": {
      "filePath": "_auth.$project.members.tsx",
      "parent": "/_auth/$project"
    },
    "/_auth/$project/settings": {
      "filePath": "_auth.$project.settings.tsx",
      "parent": "/_auth/$project"
    },
    "/_auth/$project/": {
      "filePath": "_auth.$project.index.tsx",
      "parent": "/_auth/$project"
    },
    "/_auth/_home/": {
      "filePath": "_auth._home.index.tsx",
      "parent": "/_auth/_home"
    },
    "/_auth/_home/my/account": {
      "filePath": "_auth._home.my.account.tsx",
      "parent": "/_auth/_home"
    },
    "/_auth/_home/my/profile": {
      "filePath": "_auth._home.my.profile.tsx",
      "parent": "/_auth/_home"
    },
    "/_auth/_home/my/projects": {
      "filePath": "_auth._home.my.projects.tsx",
      "parent": "/_auth/_home"
    },
    "/_auth/_home/my/settings": {
      "filePath": "_auth._home.my.settings.tsx",
      "parent": "/_auth/_home"
    },
    "/_auth/_home/projects/new": {
      "filePath": "_auth._home.projects.new.tsx",
      "parent": "/_auth/_home"
    }
  }
}
ROUTE_MANIFEST_END */
