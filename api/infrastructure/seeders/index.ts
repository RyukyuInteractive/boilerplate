import { seedUsers } from './user-seeder'
import { seedProjects } from './project-seeder'
import { seedUserSettings } from './user-setting-seeder'
import { seedProjectSettings } from './project-setting-seeder'
import { seedProjectMembers } from './project-member-seeder'

// ユーザーとプロジェクトを先にシード
await seedUsers()
await seedProjects()

// プロジェクトメンバーをシード
await seedProjectMembers()

// 設定データをシード
await seedUserSettings()
await seedProjectSettings()