import moongose from "mongoose";
import { ArticleDocs } from "./Article";

interface UserAttrs {
  username: string;
  password: string;
  role: string;
  articles: Array<ArticleDocs>;
  favorites: Array<ArticleDocs>;
}

export interface UserDocs extends moongose.Document {
  username: string;
  password: string;
  role: string;
  articles: Array<ArticleDocs>;
  favorites: Array<ArticleDocs>;
}

interface UserModel extends moongose.Model<UserDocs> {
  build(attrs: UserAttrs): UserDocs;
}

const userSchema = new moongose.Schema(
  {
    username: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
    role: {
      type: String,
      required: true,
    },
    articles: [
      {
        type: moongose.Schema.Types.ObjectId,
        ref: "Article",
      },
    ],
    favorites: [
      {
        type: moongose.Schema.Types.ObjectId,
        ref: "Article",
      },
    ],
  },
  {
    toJSON: {
      transform(doc, ret) {
        ret.id = ret._id;
        delete ret._id;
      },
    },
  }
);

userSchema.statics.build = (attrs: UserAttrs) => {
  return new User(attrs);
};

const User = moongose.model<UserDocs, UserModel>("User", userSchema);

export { User };
