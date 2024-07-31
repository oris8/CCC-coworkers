declare module '@ccc-types' {
  export type ArticleTitle = string; // minimum: 1 , maximum: 200
  export type ArticleWriter = Pick<User, 'nickname' | 'id'>;
  export type ArticleContent = string; // minimum: 1
  export type ArticleOrder = 'recent' | 'like';

  export type ArticleDetail = {
    updatedAt: DateString;
    createdAt: DateString;
    likeCount: number;
    writer: ArticleWriter;
    image?: UrlType | null;
    title: ArticleTitle;
    id: Id;
    isLiked: boolean | null; // nullable
    content: ArticleContent;
  };

  export type Article = Omit<Article, 'isLiked' | 'content'>;
}
