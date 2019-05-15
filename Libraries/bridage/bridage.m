// Copyright (c) Facebook, Inc. and its affiliates.
//
// This source code is licensed under the MIT license found in the
// LICENSE file in the root directory of this source tree.

#import "bridage.h"

@implementation bridage

RCT_EXPORT_MODULE(native)

RCT_EXPORT_METHOD(showLoading)
{
  // Your implementation here
  NSLog(@"打印");
}


RCT_EXPORT_METHOD(dismissLoading)
{
  // Your implementation here
  NSLog(@"打印");
}

RCT_EXPORT_METHOD(showToast:(NSString *)str)
{
  // Your implementation here
  NSLog(@"打印");
}

@end
