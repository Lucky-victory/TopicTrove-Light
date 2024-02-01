import { relations } from "drizzle-orm";
import {
  int,
  mysqlEnum,
  mysqlTable,
  uniqueIndex,
  varchar,
  serial,
  timestamp,
  text,
  boolean,
  index,
  binary,
  primaryKey,
} from "drizzle-orm/mysql-core";

export const users = mysqlTable(
  "users",
  {
    id: int("id").primaryKey().autoincrement(),
    username: varchar("username", { length: 256 }).notNull().unique(),
    fullName: varchar("full_name", { length: 256 }).notNull(),
    firstName: varchar("first_name", { length: 256 }).notNull(),
    lastName: varchar("last_name", { length: 256 }),
    address: varchar("address", { length: 256 }).notNull(),
    loginProvider: varchar("login_provider", { length: 256 }),
    email: varchar("email", { length: 256 }).notNull().unique(),
    shortBio: text("short_bio"),
    avatar: text("avatar"),
    isVerified: boolean("is_verified").default(false),
    createdAt: timestamp("created_at").defaultNow(),
    updatedAt: timestamp("updated_at"),
  },
  (table) => ({
    usernameIdx: uniqueIndex("username_idx").on(table.username),
    emailIdx: uniqueIndex("email_idx").on(table.email),
  }),
);

export const userMeta = mysqlTable("user_meta", {
  id: int("id").primaryKey().autoincrement(),
  userId: int("user_id")
    .notNull()
    .references(() => users.id),
  amountEarned: int("amount_earned").default(0),
  payPerPost: int("pay_per_post"),
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at"),
});

export const posts = mysqlTable(
  "posts",
  {
    id: int("id").primaryKey().autoincrement(),
    title: varchar("title", { length: 256 }).notNull(),
    intro: text("intro"),
    content: text("content").notNull(),
    userId: int("user_id")
      .notNull()
      .references(() => users.id),
    slug: varchar("slug", { length: 256 }).unique().notNull(),
    views: int("views").default(0),
    readTime: int("read_time"),
    isLocked: boolean("is_locked").default(false),
    isVerified: boolean("is_verified").default(false),
    createdAt: timestamp("created_at").defaultNow(),
    updatedAt: timestamp("updated_at"),
    status: mysqlEnum("status", ["PUBLISHED", "DRAFT", "DELETED"]),
    coverImage: text("cover_image"),
  },
  (table) => ({
    titleIdx: index("title_idx").on(table.title),
  }),
);
export const postLikes = mysqlTable("post_likes", {
  id: int("id").autoincrement(),
  postId: int("post_id").primaryKey().notNull(),
  userId: int("user_id").primaryKey().notNull(),
  createdAt: timestamp("created_at").defaultNow(),
});
export const comments = mysqlTable("comments", {
  id: int("id").primaryKey().autoincrement(),
  text: text("text").notNull(),
  authorId: int("author_id").notNull(),
  postId: int("post_id").notNull(),
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at"),
  status: mysqlEnum("status", ["APPROVED", "PENDING"]),
});

export const prompts = mysqlTable(
  "prompts",
  {
    id: int("id").primaryKey().autoincrement(),
    userId: int("user_id").notNull(),
    writerId: int("writer_id").notNull(),
    title: varchar("title", { length: 256 }).notNull(),
    description: text("description").notNull(),
    amountToTip: int("amount_to_tip"),
    status: mysqlEnum("status", ["PUBLISHED", "DRAFT", "DELETED"]),
    postStatus: mysqlEnum("post_status", [
      "PENDING",
      "IN_PROGRESS",
      "COMPLETED",
      "ACCEPTED",
      "DECLINED",
    ]),
    // slug: varchar("slug", { length: 256 }),
    // views: int("views"),
    createdAt: timestamp("created_at").defaultNow(),
    updatedAt: timestamp("updated_at"),
  },
  (table) => ({
    titleIdx: index("title_idx").on(table.title),
    statusIdx: index("status_idx").on(table.status),
    postStatusIdx: index("post_status_idx").on(table.postStatus),
  }),
);

/**
 * This table handles the extra data for prompts table, which includes amount tipped, the user that tipped it and the prompt
 */
export const promptsMeta = mysqlTable("prompts_meta", {
  id: int("id").autoincrement().primaryKey(),
  promptId: int("prompt_id").notNull(),
  amountTipped: int("amount_tipped"),
  userId: int("user_id").notNull(),
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at"),
});
export const follows = mysqlTable(
  "follows",
  {
    followerId: int("follower_id").notNull(),
    followingId: int("following_id").notNull(),
    createdAt: timestamp("created_at").defaultNow(),
  },
  (table) => ({
    pk: primaryKey({ columns: [table.followerId, table.followingId] }),
  }),
);
export const userRelations = relations(users, ({ many, one }) => ({
  posts: many(posts),
  comments: many(comments),
  prompts: many(prompts),
  likes: many(postLikes),
  promptsMeta: many(promptsMeta),
  meta: one(userMeta, {
    fields: [users.id],
    references: [userMeta.userId],
  }),

  followers: many(follows, { relationName: "followers" }),
  following: many(follows, { relationName: "following" }),
}));
export const postRelations = relations(posts, ({ many, one }) => ({
  author: one(users, {
    fields: [posts.userId],
    references: [users.id],
  }),
  comments: many(comments),
  likes: many(postLikes),
}));
export const postLikesRelations = relations(postLikes, ({ many, one }) => ({
  user: one(users, {
    fields: [postLikes.userId],
    references: [users.id],
  }),
  post: one(posts, {
    fields: [postLikes.postId],
    references: [posts.id],
  }),
  // comments:many(comments), likes:many(postLikes),
}));

export const promptRelations = relations(prompts, ({ many, one }) => ({
  meta: many(promptsMeta),
  author: one(users, {
    fields: [prompts.userId],
    references: [users.id],
  }),
  postWriter: one(users, {
    fields: [prompts.writerId],
    references: [users.id],
  }),
}));
export const promptMetaRelations = relations(promptsMeta, ({ many, one }) => ({
  prompt: one(prompts, {
    fields: [promptsMeta.promptId],
    references: [prompts.id],
  }),
  author: one(users, {
    fields: [promptsMeta.userId],
    references: [users.id],
  }),
}));
export const commentsRelations = relations(comments, ({ one }) => ({
  post: one(posts, {
    fields: [comments.postId],
    references: [posts.id],
  }),
  author: one(users, {
    fields: [comments.authorId],
    references: [users.id],
  }),
}));
