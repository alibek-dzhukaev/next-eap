class Routes {
  posts = '/posts';
  comments = '/comments';
  albums = '/albums';
  photos = '/photos';
  todos = '/todos';
  users = '/users';
  login = '/login';
  registration = '/registration';

  setBreadcrumbRoute(route: string): string {
    return route === 'Home' ? '/' : '/'.concat(route.toLowerCase());
  }

  setUserRoute(id: number): string {
    return this.users.concat('/', id.toString());
  }
}

export const routes = new Routes();
