import {IAppParams} from '@interfaces/app.interface';
import {NavigationContainerRef} from '@react-navigation/native';
import * as React from 'react';

export const navigationRef =
  React.createRef<NavigationContainerRef<IAppParams>>();

export function navigate(name: IAppParams, params: any) {
  navigationRef.current?.navigate(name, params);
}
