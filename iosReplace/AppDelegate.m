/**
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

#import "AppDelegate.h"

#import "WXRNViewCtrl.h"
#import "WXTools.h"

@implementation AppDelegate

- (BOOL)application:(UIApplication *)application didFinishLaunchingWithOptions:(NSDictionary *)launchOptions
{
  [self setWindow];
  [WXTools copyPackages];
  return YES;
}

- (void)setWindow{
  self.window = [[UIWindow alloc] initWithFrame:[UIScreen mainScreen].bounds];
  // 标记位,脚本处理使用的
  replace
  
  _nav = [[UINavigationController alloc]initWithRootViewController: ctrl];
  _nav.navigationBarHidden = YES;
  self.window.rootViewController = _nav;
  [self.window makeKeyAndVisible];
}

@end
