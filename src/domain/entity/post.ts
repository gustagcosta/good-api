export default class Post {
  constructor(
    readonly title: string,
    readonly content: string,
    readonly created_at?: Date,
    readonly id?: number
  ) {}
}
