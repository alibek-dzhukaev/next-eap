export enum Pages {
  POSTS = 'posts',
  COMMENTS = 'comments',
  ALBUMS = 'albums',
  PHOTOS = 'photos',
  TODOS = 'todos',
  USERS = 'users',
}

class LocalStoragePagination {
  DEFAULT_PAGE = 0;

  _posts = 'pagination-posts';
  _comments = 'pagination-comments';
  _albums = 'pagination-albums';
  _photos = 'pagination-photos';
  _todos = 'pagination-todos';

  setPagination(page: Pages, queries: string): void {
    if (queries.startsWith('?_start=0')) {
      this.removePagination(page);
      return;
    }

    switch (page) {
      case Pages.POSTS:
        this._setItem(this._posts, queries);
        break;
      case Pages.TODOS:
        this._setItem(this._todos, queries);
        break;
      case Pages.ALBUMS:
        this._setItem(this._albums, queries);
        break;
      case Pages.COMMENTS:
        this._setItem(this._comments, queries);
        break;
      case Pages.PHOTOS:
        this._setItem(this._photos, queries);
        break;
      default:
        break;
    }
  }

  getPagination(page: Pages): string | null {
    switch (page) {
      case Pages.POSTS:
        return this._getItem(this._posts);
      case Pages.TODOS:
        return this._getItem(this._todos);
      case Pages.ALBUMS:
        return this._getItem(this._albums);
      case Pages.COMMENTS:
        return this._getItem(this._comments);
      case Pages.PHOTOS:
        return this._getItem(this._photos);
      default:
        return null;
    }
  }

  removePagination(page: Pages) {
    switch (page) {
      case Pages.POSTS:
        this._removeItem(this._posts);
        break;
      case Pages.TODOS:
        this._removeItem(this._todos);
        break;
      case Pages.ALBUMS:
        this._removeItem(this._albums);
        break;
      case Pages.COMMENTS:
        this._removeItem(this._comments);
        break;
      case Pages.PHOTOS:
        this._removeItem(this._photos);
        break;
      default:
        break;
    }
  }

  setPaginationQueries = (
    start: number | undefined,
    limit: number | undefined
  ): string => {
    //  ?_start=0&_limit=5
    let queryString = '';
    if (start || start === 0)
      queryString = queryString.concat('?_start=', start.toString());
    if (limit || limit === 0)
      queryString = queryString.concat('&_limit=', limit.toString());
    return queryString;
  };

  extractCurrentPage = (query: string): number => {
    const [start, limit] = query.split('&').map((it) => it.split('=').pop());
    return start && limit ? Number(start) / Number(limit) + 1 : 1;
  };

  itemsPerPage(page: Pages): number {
    switch (page) {
      case Pages.POSTS:
        return 9;
      case Pages.PHOTOS:
        return 10;
      case Pages.COMMENTS:
        return 6;
      case Pages.ALBUMS:
        return 12;
      case Pages.TODOS:
        return 14;
      default:
        return 10;
    }
  }

  totalItems(page: Pages) {
    switch (page) {
      case Pages.POSTS:
        return 100;
      case Pages.PHOTOS:
        return 5000;
      case Pages.COMMENTS:
        return 500;
      case Pages.ALBUMS:
        return 100;
      case Pages.TODOS:
        return 200;
      case Pages.USERS:
        return 10;
      default:
        return 0;
    }
  }

  _setItem(key: string, query: string) {
    window.localStorage.setItem(key, query);
  }

  _getItem(key: string) {
    return window.localStorage.getItem(key) || null;
  }

  _removeItem(key: string) {
    window.localStorage.removeItem(key);
  }
}

export const paginationStorage = new LocalStoragePagination();
