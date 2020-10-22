import * as React from 'react';
import { Dropdown, DropdownProps } from '@fluentui/react-northstar';

const pkg = require('@fluentui/react-northstar/package.json');

export function VersionDropdown(props: { width: number }) {
  const currentVersion = pkg.version;
  window.sessionStorage.fluentuiDocsiteVersions = JSON.stringify(['0.51.2', '0.47.12']);

  if (
    !window.sessionStorage.fluentuiDocsiteVersions ||
    window.sessionStorage.fluentuiDocsiteVersions.indexOf(currentVersion) === -1
  ) {
    return null;
  }

  const items = [...JSON.parse(window.sessionStorage.fluentuiDocsiteVersions)];

  // We make assumptions about routing
  // https://<domain>/<version> should be the basename for each docsite in a multi version scenario
  const onChange = (_, data: DropdownProps) => {
    if (window.location.pathname.split('/')[1] === currentVersion) {
      const newPath = window.location.pathname.replace(currentVersion, data.value as string);
      window.location.pathname = newPath;
    } else {
      window.location.pathname = `/${data.value}`;
    }
  };

  return (
    <Dropdown
      variables={{ width: `${props.width}px` }}
      placeholder="Select package version"
      items={items}
      onChange={onChange}
      value={currentVersion}
    />
  );
}