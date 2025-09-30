# XR Integration Guide

## Installation

To complete the XR integration, you need to install the `@react-three/xr` package:

```bash
npm install @react-three/xr@latest
```

## What's Been Added

### 1. XR Store
- Created a global XR store using `createXRStore()` to manage XR session state
- The store handles entering/exiting AR/VR modes and tracks session status

### 2. XR Component Wrapper
- Wrapped the Canvas content with the `<XR>` component
- This enables AR/VR functionality for all 3D objects in the scene

### 3. AR/VR Control Buttons
- Added "Enter AR" button to start AR mode
- Added "Exit XR" button to exit AR/VR mode
- Buttons are positioned in the top-left corner with proper styling

### 4. Smart Camera Controls
- OrbitControls are automatically disabled in AR mode
- This prevents conflicts between user device camera and manual controls

## How to Use

### For Students Learning XR:

1. **Basic AR Experience:**
   - Click "Enter AR" to start AR mode
   - Your device camera will activate
   - The 3D scene (cube and potted plant) will appear in your real environment
   - You can walk around and view the objects from different angles

2. **Interaction in AR:**
   - The potted plant can still be clicked to teleport (if that functionality exists)
   - The orange cube remains static
   - The grid floor provides spatial reference

3. **Exiting AR:**
   - Click "Exit XR" to return to normal 3D view
   - OrbitControls will be re-enabled for manual navigation

## Technical Details

### XR Store
```javascript
const store = createXRStore();
```
- Manages XR session state globally
- Handles device compatibility checks
- Tracks AR/VR mode status

### XR Component
```javascript
<XR store={store}>
  {/* Your 3D content goes here */}
</XR>
```
- Enables WebXR functionality
- Connects to the XR store
- Handles device-specific XR features

### State Management
```javascript
const [isAR, setIsAR] = useState(false);
```
- Tracks whether the app is currently in AR mode
- Used to conditionally disable/enable controls

## Browser Requirements

- **Chrome/Edge:** Full WebXR support
- **Firefox:** Limited WebXR support
- **Safari:** No WebXR support (iOS 15+ has limited support)
- **Mobile:** Requires HTTPS and compatible device

## Device Compatibility

- **AR Mode:** Requires device with camera and AR support
- **VR Mode:** Requires VR headset (Oculus, HTC Vive, etc.)
- **Desktop:** Limited to VR headsets only
- **Mobile:** Best experience on modern smartphones

## Troubleshooting

1. **"Enter AR" button doesn't work:**
   - Ensure you're using HTTPS (required for WebXR)
   - Check browser compatibility
   - Try on a mobile device for better AR support

2. **Objects not appearing in AR:**
   - Check device camera permissions
   - Ensure good lighting conditions
   - Try moving to a different location

3. **Performance issues:**
   - Reduce object complexity
   - Lower lighting quality
   - Close other browser tabs

## Next Steps for Learning

1. **Add Hand Tracking:** Use `@react-three/xr` hand tracking features
2. **Add Controllers:** Implement VR controller support
3. **Add Interactions:** Create touch/click interactions in AR
4. **Add Physics:** Integrate physics for realistic object behavior
5. **Add Audio:** Add spatial audio for immersive experience

## Resources

- [React Three XR Documentation](https://github.com/pmndrs/xr)
- [WebXR Device API](https://developer.mozilla.org/en-US/docs/Web/API/WebXR_Device_API)
- [Three.js WebXR Guide](https://threejs.org/docs/#manual/en/introduction/How-to-use-WebXR)

