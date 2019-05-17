//
//  ZHBPopTipView.h
//  PopTipView
//
//  Created by apple on 16/8/4.
//  Copyright © 2016年 kunMingYouRuHe. All rights reserved.
//

#import <UIKit/UIKit.h>

typedef NS_ENUM(NSInteger, ZHBPopTipViewPosition){
    ZHBPopTipViewPositionCenter,
    ZHBPopTipViewPositionTop,
    ZHBPopTipViewPositionBottom
};
@interface ZHBPopTipView : UIView
/**
 * 中间显示+时间默认 show in center and duration is default 1.5
 * @param text 内容
 */
+ (void)showText:(NSString*)text;

/**
 * 给定位置 + 时间默认 show in position(ZHBPopTipViewPosition) we given and duration is default 1.5
 */
+ (void)showText:(NSString*)text position:(ZHBPopTipViewPosition)position;

/**
 * 自定义位置 + 自定义时间
 */
+ (void)showText:(NSString*)text position:(ZHBPopTipViewPosition)position duration:(CGFloat)duration;

/**
 * 给定位置 + 偏移量 + 自定义时间 show in position(ZHBPopTipViewPosition) we given with a offset and duration is default 1.5
 */
+ (void)showText:(NSString*)text position:(ZHBPopTipViewPosition)position offset:(CGFloat)offset duration:(CGFloat)duration;
@end
