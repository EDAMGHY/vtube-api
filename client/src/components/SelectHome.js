import React from 'react';
const SelectHome = () => {
  return (
    <div className='select-search'>
      <label htmlFor='categories'>Search By </label>
      <select id='categories' className='select'>
        <option value='Anime &amp; Animation'>Anime &amp; Animation</option>
        <option value='Autos &amp; Vehicles'>Autos &amp; Vehicles</option>
        <option value='Comedy'>Comedy</option>
        <option value='Education'>Education</option>
        <option value='Entertainment'>Entertainment</option>
        <option value='Fashion &amp; Style'>Fashion &amp; Style</option>
        <option value='Film &amp; Movies'>Film &amp; Movies</option>
        <option value='How-to-do'>How-to-do</option>
        <option value='Gaming'>Gaming</option>
        <option value='Music'>Music</option>
        <option value='News &amp; Politics'>News &amp; Politics</option>
        <option value='People &amp; Blogs'>People &amp; Blogs</option>
        <option value='Pets &amp; Animals'>Pets &amp; Animals</option>
        <option value='Science &amp; Technology'>
          Science &amp; Technology
        </option>
        <option value='Sports'>Sports</option>
        <option value='Travel &amp; Events'>Travel &amp; Events</option>
      </select>
    </div>
  );
};
export default SelectHome;
