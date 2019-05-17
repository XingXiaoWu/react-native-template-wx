using ReactNative.Bridge;
using System;
using System.Collections.Generic;
using Windows.ApplicationModel.Core;
using Windows.UI.Core;

namespace Native.Bridage.RNNativeBridage
{
    /// <summary>
    /// A module that allows JS to share data.
    /// </summary>
    class RNNativeBridageModule : NativeModuleBase
    {
        /// <summary>
        /// Instantiates the <see cref="RNNativeBridageModule"/>.
        /// </summary>
        internal RNNativeBridageModule()
        {

        }

        /// <summary>
        /// The name of the native module.
        /// </summary>
        public override string Name
        {
            get
            {
                return "RNNativeBridage";
            }
        }
    }
}
