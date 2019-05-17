
#import "RNNativeBridage.h"
#import "MBProgressHUD.h"
#import "ZHBPopTipView.h"

@interface RNNativeBridage()
@property (nonatomic, strong) MBProgressHUD *hud;

@property (atomic, assign) BOOL canceled;

@end
@implementation RNNativeBridage
    
- (dispatch_queue_t)methodQueue{
    return dispatch_get_main_queue();
}
RCT_EXPORT_MODULE(native)
#pragma mark -- Toast展示
RCT_EXPORT_METHOD(showToast:(NSString*)message){
    dispatch_async(dispatch_get_main_queue(), ^{
        [ZHBPopTipView showText:message position:ZHBPopTipViewPositionCenter duration:2];
    });
}
    
#pragma mark -- loading
//普通loading
RCT_EXPORT_METHOD(showLoading){
    dispatch_async(dispatch_get_main_queue(), ^{
        UIWindow *window = [UIApplication sharedApplication].delegate.window;
        self.hud = [MBProgressHUD showHUDAddedTo:window animated:YES];
    });
}
//
RCT_EXPORT_METHOD(dismissLoading){
    dispatch_async(dispatch_get_main_queue(), ^{
        [self.hud hideAnimated:YES];
    });
}
//
//    //圆环loading
//    RCT_EXPORT_METHOD(showRingLoading){
//        dispatch_async(dispatch_get_main_queue(), ^{
//            UIWindow *window = [UIApplication sharedApplication].delegate.window;
//            self.hud = [MBProgressHUD showHUDAddedTo:window animated:YES];
//            self.hud.mode = MBProgressHUDModeAnnularDeterminate;
//            self.hud.label.text = NSLocalizedString(@"Loading...", @"HUD loading title");
//
//        });
//    }
//
//    //环形的loading加载条
//    //  用法
//    //dispatch_async(dispatch_get_global_queue(QOS_CLASS_USER_INITIATED, 0), ^{
//    //  // Do something useful in the background and update the HUD periodically.
//    //  [self doSomeWorkWithProgress];
//    //  dispatch_async(dispatch_get_main_queue(), ^{
//    //    [self.hud hideAnimated:YES];
//    //  });
//    //});
//- (void)doSomeWorkWithProgress {
//    self.canceled = NO;
//    // This just increases the progress indicator in a loop.
//    float progress = 0.0f;
//    while (progress < 1.0f) {
//        if (self.canceled) break;
//        progress += 0.01f;
//        dispatch_async(dispatch_get_main_queue(), ^{
//            // Instead we could have also passed a reference to the HUD
//            // to the HUD to myProgressTask as a method parameter.
//            UIWindow *window = [UIApplication sharedApplication].delegate.window;
//            [MBProgressHUD HUDForView:window].progress = progress;
//        });
//        usleep(50000);
//    }
//}
//
//    /**
//     * 通知RN：发送事件
//     */
#pragma mark -- OC向RN发送事件
- (NSArray<NSString *> *)supportedEvents{
    return @[];
}

@end

