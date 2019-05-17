//
//  ZHBPopTipView.m
//  PopTipView
//
//  Created by apple on 16/8/4.
//  Copyright © 2016年 kunMingYouRuHe. All rights reserved.
//

#import "ZHBPopTipView.h"

#define PopTextFont  [UIFont boldSystemFontOfSize:16]
#define PopTextColor [UIColor whiteColor]
#define PopTextBackgroundColor [UIColor clearColor]
#define PopBackgroundColor [UIColor colorWithRed:0.2 green:0.2 blue:0.2 alpha:0.75]
#define PopDispalyDuration 1.5f

@interface ZHBPopTipView ()
@property (nonatomic,strong) UIButton *contentView;
@property (nonatomic,assign) CGFloat duration;
@end

@implementation ZHBPopTipView
- (void)dealloc
{
    [[NSNotificationCenter defaultCenter] removeObserver:self name:UIDeviceOrientationDidChangeNotification object:[UIDevice currentDevice]];
}

- (id)initWithText:(NSString*)text
{
    if (self = [super init]) {
        NSDictionary * dict=[NSDictionary dictionaryWithObject:PopTextFont forKey:NSFontAttributeName];
        CGRect rect=[text boundingRectWithSize:CGSizeMake(250,CGFLOAT_MAX) options:NSStringDrawingTruncatesLastVisibleLine|NSStringDrawingUsesFontLeading|NSStringDrawingUsesLineFragmentOrigin attributes:dict context:nil];
        UILabel *textLabel = [[UILabel alloc] initWithFrame:CGRectMake(0, 0,rect.size.width + 40, rect.size.height+ 20)];
        textLabel.backgroundColor = PopTextBackgroundColor;
        textLabel.textColor = PopTextColor;
        textLabel.textAlignment = NSTextAlignmentCenter;
        textLabel.font = PopTextFont;
        textLabel.text = text;
        textLabel.numberOfLines = 0;
        
        UIButton *contentView = [[UIButton alloc] initWithFrame:CGRectMake(0, 0, textLabel.frame.size.width, textLabel.frame.size.height)];
        _contentView = contentView;
        _contentView.layer.cornerRadius = 5.0f;
        _contentView.backgroundColor = PopBackgroundColor;
        [_contentView addSubview:textLabel];
        _contentView.autoresizingMask = UIViewAutoresizingFlexibleWidth;
        [_contentView addTarget:self action:@selector(toastTaped:) forControlEvents:UIControlEventTouchDown];
        _contentView.alpha = 0.0f;
        _duration = PopDispalyDuration;
        [[NSNotificationCenter defaultCenter] addObserver:self selector:@selector(deviceOrientationDidChanged) name:UIDeviceOrientationDidChangeNotification object:[UIDevice currentDevice]];
    }
    return self;
}

- (void)deviceOrientationDidChanged
{
    [self dismiss];
}

- (void)toastTaped:(UIButton *)sender
{
    [self dismiss];
}

- (void)appear
{
    [UIView beginAnimations:@"appear" context:NULL];
    [UIView setAnimationCurve:UIViewAnimationCurveEaseIn];
    [UIView setAnimationDuration:0.3];
    _contentView.alpha = 1.0f;
    [UIView commitAnimations];
}

- (void)dismiss
{
    [UIView beginAnimations:@"dismiss" context:NULL];
    [UIView setAnimationCurve:UIViewAnimationCurveEaseOut];
    [UIView setAnimationDelegate:self];
    [UIView setAnimationDidStopSelector:@selector(didDismiss)];
    [UIView setAnimationDuration:0.3];
    _contentView.alpha = 0.0f;
    [UIView commitAnimations];
}

- (void)didDismiss
{
    [_contentView removeFromSuperview];
    _contentView = nil;
}

- (void)show
{
    // Displayed on the top of app
    UIWindow *window = [[[UIApplication sharedApplication] windows] lastObject];
    _contentView.center = window.center;
    [window  addSubview:_contentView];
    [self appear];
    [self performSelector:@selector(dismiss) withObject:nil afterDelay:_duration];
}

- (void)showTopWithOffset:(CGFloat)offset{
    UIWindow *window = [[[UIApplication sharedApplication] windows] lastObject];
    _contentView.center = CGPointMake(window.center.x, offset + _contentView.frame.size.height/0.5);
    [window  addSubview:_contentView];
    [self appear];
    [self performSelector:@selector(dismiss) withObject:nil afterDelay:_duration];
}

- (void)showBottomWithOffset:(CGFloat)offset{
    UIWindow *window = [[[UIApplication sharedApplication] windows] lastObject];
    _contentView.center = CGPointMake(window.center.x, window.frame.size.height-(offset + _contentView.frame.size.height/0.5));
    [window  addSubview:_contentView];
    [self appear];
    [self performSelector:@selector(dismiss) withObject:nil afterDelay:_duration];
}


#pragma mark -对外接口 External interface
+ (void)showText:(NSString*)text
{
    [ZHBPopTipView showText:text position:ZHBPopTipViewPositionCenter offset:0.0f duration:PopDispalyDuration];
}

+ (void)showText:(NSString*)text position:(ZHBPopTipViewPosition)position
{
    [ZHBPopTipView showText:text position:position offset:0.0f duration:PopDispalyDuration];
}

+ (void)showText:(NSString*)text position:(ZHBPopTipViewPosition)position duration:(CGFloat)duration
{
    [ZHBPopTipView showText:text position:position offset:0.0f duration:duration];
}

+ (void)showText:(NSString*)text position:(ZHBPopTipViewPosition)position offset:(CGFloat)offset duration:(CGFloat)duration
{
    ZHBPopTipView *toast = [[ZHBPopTipView alloc] initWithText:text];
    [toast setDuration:duration];
    if (position == ZHBPopTipViewPositionCenter)
    {
        [toast show];
    }else if (position == ZHBPopTipViewPositionTop)
    {
        [toast showTopWithOffset:offset];
    }else if (position == ZHBPopTipViewPositionBottom)
    {
        [toast showBottomWithOffset:offset];
    }
}

@end
