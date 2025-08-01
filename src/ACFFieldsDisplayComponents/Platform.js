import React from 'react';
import { ReactComponent as AndroidIcon } from '../icons/android.svg';
import { ReactComponent as WindowsIcon } from '../icons/windows.svg';
import { ReactComponent as MacosIcon } from '../icons/macos.svg';

const platformIcons = {
  Android: <AndroidIcon className="w-4 h-4 mr-1" />,
  'Android Hack': <AndroidIcon className="w-4 h-4 mr-1" />,
  Windows: <WindowsIcon className="w-4 h-4 mr-1" />,
  MacOS: <MacosIcon className="w-4 h-4 mr-1" />
};

const platformColors = {
  Android: 'platformbg',
  'Android Hack': 'platformbg',
  Windows: 'platformbg',
  MacOS: 'platformbg',
  PC: 'platformbg'
};

const Platform = ({ platforms }) => {
  if (!Array.isArray(platforms) || platforms.length === 0) return null;

  return (
    <>
      {platforms.map((platform, index) => (
        <span
          key={index}
          className={`flex items-center ${platformColors[platform] || ''} text-xs font-semibold px-2 py-1 rounded mr-2 mb-2`}
        >
          {platformIcons[platform] || (
            <svg
              className="w-4 h-4 mr-1"
              version="1.1"
              xmlns="http://www.w3.org/2000/svg"
              xmlnsXlink="http://www.w3.org/1999/xlink"
              viewBox="0 0 512 512"
              xmlSpace="preserve"
              fill="#000000"
            >
              <path
                fill="#ffffff"
                d="M61.938,345.188h388.125c14.813,0,26.828-12.016,26.828-26.828V89.969c0-14.797-12.016-26.813-26.828-26.813H61.938c-14.813,0-26.813,12.016-26.813,26.813v228.391C35.125,333.172,47.125,345.188,61.938,345.188z M76.125,99.188h359.75v203.656H76.125V99.188z"
              ></path>
              <path
                fill="#ffffff"
                d="M508.031,419.609l-47.844-42.469c-3.078-2.719-7.5-4.266-12.172-4.266H63.984c-4.672,0-9.094,1.547-12.172,4.266L3.969,419.609C1.406,421.875,0,424.797,0,427.813v14.797c0,3.453,3.609,6.234,8.063,6.234h495.875c4.469,0,8.063-2.781,8.063-6.234v-14.797C512,424.797,510.594,421.875,508.031,419.609z M201.141,424.625l13.844-18.719h87.734l13.828,18.719H201.141z"
              ></path>
            </svg>
          )}
          {platform || ''}
        </span>
      ))}
    </>
  );
};

export default Platform;
