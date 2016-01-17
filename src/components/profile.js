import React from 'react';

import User from './user';
import { Link } from 'react-router';

import { getUrl, URL_NAMES } from '../utils/urlGenerator';

export default class ProfileHeader extends React.Component {
  static displayName = 'ProfileHeader'

  render () {
    const { user, current_user, i_am_following, following, followers } = this.props;
    let name = user.username;
    let summary = '';
    let followingCount;
    let followersCount;

    if (user.more) {
      if (user.more.firstName || user.more.lastName) {
        name = `${user.more.firstName} ${user.more.lastName}`;
      }

      if (user.more.summary) {
        summary = user.more.summary;
      }
    }

    if (following && following[user.id] && following[user.id].length) {
      // if anonym user, then do not show "Manage followers" links next to follow counters
      if (!current_user || (current_user && current_user.id != user.id)) {
        followingCount = (
          <div>
            {following[user.id].length}<br />
            Following
          </div>
        );
      } else {
        followingCount = (
          <div>
            {following[user.id].length}<br />
            <Link to={getUrl(URL_NAMES.MANAGE_FOLLOWERS)}>Following</Link>
          </div>
        );
      }

    }

    if (followers && followers[user.id] && followers[user.id].length) {
      // if anonym user, then do not show "Manage followers" too
      if (!current_user || (current_user && current_user.id != user.id)) {
        followersCount = (
          <div>
            {followers[user.id].length}<br />
            Followers
          </div>
        );
      } else {
        followersCount = (
          <div>
            {followers[user.id].length}<br />

            <Link to={getUrl(URL_NAMES.MANAGE_FOLLOWERS)}>Followers</Link>
          </div>
        );
      }

    }

    name = name.trim();

    return (
      <div className="profile">
        <div className="profile__body">
          <div className="layout__row">
            <User user={user} avatarSize="120" isRound={true} hideText={true} />
          </div>
          <div className="layout__row">
            <div className="layout__grid">
              <div className="layout__grid_item layout__grid_item-wide">
                <div className="profile__title">{name}</div>
                <div className="profile__summary">{summary}</div>
              </div>
              <div className="layout__grid_item">
                {followingCount}
              </div>
              <div className="layout__grid_item">
                {followersCount}
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }
}
