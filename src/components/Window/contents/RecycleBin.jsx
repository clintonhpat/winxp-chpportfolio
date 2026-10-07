import React from 'react';
import './ContentStyles.css';

/**
 * RecycleBin Content Component
 * Fun easter egg with "deleted" skills or old projects
 */
function RecycleBin() {
  const deletedItems = [
    {
      id: 1,
      name: 'old_code_habits.txt',
      type: 'Text Document',
      dateDeleted: '01/01/2020',
      size: '∞ KB',
      description: 'var instead of const, callback hell, no comments',
    },
    {
      id: 2,
      name: 'jquery_dependency.js',
      type: 'JavaScript File',
      dateDeleted: '06/15/2021',
      size: '87 KB',
      description: 'Thanks for the memories, but React is here now',
    },
    {
      id: 3,
      name: 'imposter_syndrome.exe',
      type: 'Application',
      dateDeleted: 'Recurring',
      size: 'Too Large',
      description: 'Still trying to permanently delete this one...',
    },
    {
      id: 4,
      name: 'float_layouts.css',
      type: 'Style Sheet',
      dateDeleted: '03/20/2019',
      size: '12 KB',
      description: 'clearfix everywhere. Flexbox saved us all.',
    },
    {
      id: 5,
      name: 'sleep_schedule.ics',
      type: 'Calendar',
      dateDeleted: 'Unknown',
      size: '1 KB',
      description: 'Who needs sleep when there\'s code to write?',
    },
  ];

  return (
    <div className="recycle-bin-content">
      <div className="recycle-header">
        <span className="recycle-icon">🗑️</span>
        <div>
          <h1>Recycle Bin</h1>
          <p>Things I've moved on from (mostly)</p>
        </div>
      </div>

      <div className="recycle-toolbar">
        <button className="xp-button" disabled>
          Empty Recycle Bin
        </button>
        <button className="xp-button" disabled>
          Restore All Items
        </button>
      </div>

      <div className="recycle-list-header">
        <span className="col-name">Name</span>
        <span className="col-type">Type</span>
        <span className="col-date">Date Deleted</span>
        <span className="col-size">Size</span>
      </div>

      <div className="recycle-list">
        {deletedItems.map((item) => (
          <div key={item.id} className="recycle-item" title={item.description}>
            <span className="col-name">
              <span className="item-icon">📄</span>
              {item.name}
            </span>
            <span className="col-type">{item.type}</span>
            <span className="col-date">{item.dateDeleted}</span>
            <span className="col-size">{item.size}</span>
          </div>
        ))}
      </div>

      <div className="recycle-footer">
        <p>💡 Hover over items to see why they were deleted</p>
        <p className="recycle-joke">
          Don't worry, my actual coding skills are NOT in here! 😄
        </p>
      </div>
    </div>
  );
}

export default RecycleBin;
