class MetaInfo {
  index: string;
  posts: string;
  comments: string;
  albums: string;
  photos: string;
  todos: string;
  users: string;

  constructor() {
    this.index = 'Blog';
    this.posts = 'Posts';
    this.comments = 'Comments';
    this.albums = 'Albums';
    this.photos = 'Photos';
    this.todos = 'Todos';
    this.users = 'Users';
  }

  getMetadata(
    page:
      | 'posts'
      | 'comments'
      | 'albums'
      | 'photos'
      | 'todos'
      | 'user'
      | 'index'
  ) {
    return this._metadata[page].join(' ');
  }

  get _metadata() {
    return {
      index: ['home', 'blog', 'alibek'],
      posts: ['posts', 'my-posts'],
      comments: ['comments', 'comments-332'],
      albums: ['albums', 'my-albums'],
      photos: ['photos'],
      todos: ['todos'],
      user: ['users', 'jsonplaceholder', 'list-of-people'],
    };
  }
}

export const metaInfo = new MetaInfo();
