#import "DeviceDetails.h"
#import <UIKit/UIKit.h>

@implementation DeviceDetails

RCT_EXPORT_MODULE()

RCT_EXPORT_METHOD(getDeviceInfo:(RCTPromiseResolveBlock)resolve
                  rejecter:(RCTPromiseRejectBlock)reject)
{
    UIDevice *device = [UIDevice currentDevice];
    NSDictionary *info = @{
        @"model":         device.model,
        @"manufacturer":  @"Apple",
        @"systemName":    device.systemName,
        @"systemVersion": device.systemVersion,
        @"sdkVersion":    @"N/A",
    };
    resolve(info);
}

@end
