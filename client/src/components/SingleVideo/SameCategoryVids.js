import React from 'react';

import SameCategoryItem from './SameCategoryItem';

const SameCategoryVids = ({ singleVideo }) => {
  return (
    <div className='category-videos'>
      <h3>
        More Videos in <span className='primary'>{singleVideo.category}</span>
      </h3>

      <div className='category-vids'>
        {singleVideo.categoryVids.length > 0 ? (
          singleVideo.categoryVids.map((video) => (
            <SameCategoryItem key={video.video} video={video} />
          ))
        ) : (
          <h4 className='text-center'>
            No Videos for {singleVideo.category}...
          </h4>
        )}
      </div>
    </div>
  );
};

export default SameCategoryVids;
