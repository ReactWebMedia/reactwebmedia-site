import React from 'react';
import { IndexLink } from 'react-router';

import Header from '../../components/header';
import Footer from '../../components/footer';
import PageContentLink from '../../components/page-content-link';
import ProfileHeader from '../../components/profile';


export default class BaseUserPage extends React.Component {
  static displayName = 'BaseUserPage';

  // FIXME: These links won't hide/show properly if following/unfollowing is performed directly on the page.
  // Something is wrong with the redux state.

  render() {
    let {
      current_user,
      i_am_following,
      is_logged_in,
      page_user,
      following,
      followers
    } = this.props;

    let showLikesLink = page_user.liked_posts && !!page_user.liked_posts.length;
    let showFavouritesLink = page_user.favourited_posts && !!page_user.favourited_posts.length;
    let showBioLink = page_user.more && !!page_user.more.bio;

    return (
      <div>
        <Header is_logged_in={is_logged_in} current_user={current_user}/>

        <div className="page__container">
          <div className="page__body">

            <div className="page__body_content">
              <ProfileHeader
                user={page_user}
                current_user={current_user}
                i_am_following={i_am_following}
                following={following}
                followers={followers}
                triggers={this.props.triggers} />

              <div className="page__content page__content-horizontal_space">
                <div className="layout__space-double">
                  <div className="layout__grid tabs">
                    <div className="layout__grid_item"><IndexLink className="tabs__link" activeClassName="tabs__link-active" to={`/user/${page_user.username}`}>Posts</IndexLink></div>
                    {showLikesLink &&
                      <div className="layout__grid_item">
                        <PageContentLink
                          activeClassName="tabs__link-active"
                          className="tabs__link"
                          to={`/user/${page_user.username}/likes`}
                          visible
                        >
                          Likes
                        </PageContentLink>
                      </div>
                    }
                    {showFavouritesLink &&
                      <div className="layout__grid_item">
                        <PageContentLink
                          activeClassName="tabs__link-active"
                          className="tabs__link"
                          to={`/user/${page_user.username}/favorites`}
                          visible
                        >
                          Favorites
                        </PageContentLink>
                      </div>
                    }
                    {showBioLink &&
                      <div className="layout__grid_item">
                        <PageContentLink
                          activeClassName="tabs__link-active"
                          className="tabs__link"
                          to={`/user/${page_user.username}/bio`}
                          visible
                        >
                          Bio
                        </PageContentLink>
                      </div>
                    }
                  </div>
                </div>
                <div className="layout__row layout__row-double">
                  {this.props.children}
                </div>
              </div>
            </div>
          </div>
        </div>

        <Footer/>
      </div>
    );
  }
}
