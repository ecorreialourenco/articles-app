import moongose from "mongoose";

interface ArticleAttrs {
  title: string;
  description: string;
  image: Buffer;
  category: string;
  content: string;
  type: string;
}

export interface ArticleDocs extends moongose.Document {
  title: string;
  description: string;
  image: Buffer;
  category: string;
  content: string;
  type: string;
}

interface ArticleModel extends moongose.Model<ArticleDocs> {
  build(attrs: ArticleAttrs): ArticleDocs;
}

const articleSchema = new moongose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    image: {
      type: Buffer,
      required: false,
    },
    category: {
      type: String,
      required: false,
    },
    content: {
      type: String,
      required: true,
    },
    type: {
      type: String,
      required: true,
    },
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

articleSchema.statics.build = (attrs: ArticleAttrs) => {
  return new Article(attrs);
};

const Article = moongose.model<ArticleDocs, ArticleModel>(
  "Article",
  articleSchema
);

export { Article };
