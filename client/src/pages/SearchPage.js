import { Link } from 'react-router-dom';
import React, { useEffect, useState } from 'react';
import Section from '../components/Section';
import { useSearchGlobalContext } from '../actions/search';
import { useChannelGlobalContext } from '../actions/channel';
import { useAuthGlobalContext } from '../actions/auth';
import {
  secondsToTime,
  timeSince,
  shortenText,
  intToString,
} from '../utils/utilities';
const SearchPage = () => {
  const [subscribed, setSubscribed] = useState(false);
  const [sub, setSub] = useState(false);
  const [notified, setNotified] = useState(false);
  const [notify, setNotify] = useState(false);

  const {
    notifyChannel,
    unnotifyChannel,
    subscribeChannel,
    unsubscribeChannel,
  } = useChannelGlobalContext();
  const { user, isAuthenticated } = useAuthGlobalContext();

  const { searched, searchResult, search, cat, sort, setSort } =
    useSearchGlobalContext();
  useEffect(() => {
    searchResult(search, cat, sort);
    console.log('searched', searched);
  }, [search, cat, sort]);
  return (
    <Section nameClass='main'>
      <div class='filters'>
        <h5>Sort</h5>
        <select
          name='sort'
          value={sort}
          onChange={(e) => setSort(e.target.value)}
          id='filters'
        >
          <option value='a-z'>a-z</option>
          <option value='z-a'>z-a</option>
          <option value='oldest'>oldest</option>
          <option value='newest'>newest</option>
          <option value='views'>views</option>
        </select>
      </div>
      <div class='search-page'>
        {searched && searched.length > 0 ? (
          searched
            .filter((vid) => vid.category)
            .map((vid) => (
              <Link
                to={`/videos/${vid.channel.title
                  .trim()
                  .toLowerCase()
                  .split(' ')
                  .join('')}/${vid._id}`}
              >
                <div class='search-video'>
                  <div class='vid-thumb'>
                    <img
                      src={
                        vid.thumbnail
                          ? `http://localhost:5000/${vid.thumbnail}`
                          : '/img/no-image.png'
                      }
                      alt=''
                    />
                    <span>{secondsToTime(vid.duration)}</span>
                  </div>
                  <div class='vid-info'>
                    <h4>{vid.title}</h4>
                    <div class='views-time'>
                      <span class='views'>{intToString(vid.views)} views</span>
                      <span class='vid-published'>
                        {timeSince(vid.createdAt)}
                      </span>
                    </div>
                    <div class='channel-thumb'>
                      <img
                        src={
                          vid.channel.image
                            ? `http://localhost:5000/${vid.channel.image}`
                            : '/img/no-image.png'
                        }
                        alt=''
                      />
                      <span class='channel-name'>
                        {vid.channel.title}{' '}
                        <i class='fa-solid fa-check check'></i>
                      </span>
                    </div>
                    <p class='desc'>{shortenText(vid.description, 100)}</p>
                  </div>
                </div>
              </Link>
            ))
        ) : (
          <h3 className='text-center'>No Videos...</h3>
        )}

        {searched && searched.length > 0 ? (
          searched
            .filter((sear) => sear.subscribers)
            .map((cha) => (
              <Link to={`/channels/${cha.user}`}>
                <div class='search-channel'>
                  <img
                    src={
                      cha.image
                        ? `http://localhost:5000/${cha.image}`
                        : '/img/no-image.png'
                    }
                    alt=''
                  />
                  <div class='cha-info'>
                    <h4>
                      {cha.title} <i class='fa-solid fa-check check'></i>
                    </h4>
                    <div class='views-time'>
                      <span class='views'>
                        {intToString(cha.subscribers.length)} Subscribers
                      </span>
                    </div>
                    <p class='desc'>{shortenText(cha.description, 100)}</p>
                  </div>
                  <div class='btns'>
                    <button class='btn-2'>Subscribe</button>
                  </div>
                </div>
              </Link>
            ))
        ) : (
          <h3 className='text-center'>No Channels...</h3>
        )}
        {searched && searched.length > 0 ? (
          searched
            .filter((sear) => sear.location)
            .map((pro) => (
              <Link to={`/profiles/${pro.user._id}`}>
                <div class='search-user'>
                  <img
                    src={
                      pro.image
                        ? `http://localhost:5000/${pro.image}`
                        : '/img/no-image.png'
                    }
                    alt=''
                  />
                  <div class='user-info'>
                    <h4>{pro.user.name}</h4>
                    <div class='location'>
                      Location: <span>{pro.location}</span>
                    </div>
                    <p class='desc'>{shortenText(pro.bio, 100)}</p>
                  </div>
                </div>
              </Link>
            ))
        ) : (
          <h3 className='text-center'>No Profiles...</h3>
        )}
      </div>
    </Section>
  );
};
export default SearchPage;
