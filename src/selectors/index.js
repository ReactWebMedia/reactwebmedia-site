export function defaultSelector(state) {
  let data = state.toJS();

  data.is_logged_in = !!data.current_user.id;

  if (data.is_logged_in) {
    let current_user_id = data.current_user.id;

    data.current_user_tags = data.current_user.tags;

    data.current_user = Object.assign(data.current_user, data.users[current_user_id]);
    data.current_user.likes = data.likes[current_user_id] || [];
    data.current_user.favourites = data.favourites[current_user_id] || [];

    data.i_am_following = data.following[current_user_id];
  } else {
    data.current_user = null;
  }

  return data;
}
