# AR Debugging Guide

## Common AR Button Errors and Solutions

### 1. **"WebXR is not supported in this browser"**
**Cause:** Browser doesn't support WebXR
**Solutions:**
- Use Chrome, Edge, or Firefox (latest versions)
- Ensure you're on a desktop with VR headset or mobile device
- Check if WebXR is enabled in browser flags

### 2. **"AR is not supported on this device"**
**Cause:** Device doesn't have AR capabilities
**Solutions:**
- Try on a modern smartphone (iPhone 12+ or Android with ARCore)
- Use a device with camera and AR support
- Desktop AR requires specific hardware

### 3. **"Failed to start AR session"**
**Cause:** HTTPS requirement or permissions
**Solutions:**
- **MUST use HTTPS** - WebXR requires secure connection
- Use `localhost` for development (automatically HTTPS)
- Deploy to HTTPS hosting (Vercel, Netlify, etc.)
- Grant camera permissions when prompted

### 4. **Permission Denied Errors**
**Cause:** Camera permissions not granted
**Solutions:**
- Click "Allow" when browser asks for camera permission
- Check browser settings for camera permissions
- Try refreshing the page and granting permissions again

## Testing Steps

### 1. **Check Browser Console**
Open Developer Tools (F12) and look for:
- WebXR support messages
- AR session errors
- Permission errors

### 2. **Test on Different Devices**
- **Mobile (Best):** iPhone/Android with AR support
- **Desktop:** Chrome/Edge with VR headset
- **Tablet:** iPad with ARKit support

### 3. **Check HTTPS**
- URL must start with `https://` or `localhost`
- No `http://` in production

## Status Indicators

The app now shows status indicators:
- **Gray "Ready":** AR not started
- **Green "AR Active":** AR session running
- **Red "AR Error":** Error occurred
- **Gray "Starting AR...":** AR session starting

## Browser Compatibility

| Browser | Desktop AR | Mobile AR | VR |
|---------|------------|-----------|----|
| Chrome  | ❌ | ✅ | ✅ |
| Edge    | ❌ | ✅ | ✅ |
| Firefox | ❌ | ✅ | ✅ |
| Safari  | ❌ | Limited | ❌ |

## Development Setup

### For Local Development:
```bash
npm run dev
# Access via https://localhost:3000
```

### For Production:
```bash
npm run build
npm start
# Deploy to HTTPS hosting
```

## Troubleshooting Checklist

1. ✅ **HTTPS Required** - Are you using HTTPS?
2. ✅ **Browser Support** - Using Chrome/Edge/Firefox?
3. ✅ **Device Support** - Mobile device or VR headset?
4. ✅ **Permissions** - Camera permissions granted?
5. ✅ **Console Errors** - Check browser console for errors
6. ✅ **Network** - Stable internet connection?

## Advanced Debugging

### Check WebXR Support:
```javascript
// Open browser console and run:
console.log('WebXR supported:', !!navigator.xr);
navigator.xr?.isSessionSupported('immersive-ar').then(console.log);
```

### Check Device Capabilities:
```javascript
// Check if device has AR capabilities
if (navigator.xr) {
  navigator.xr.isSessionSupported('immersive-ar').then(supported => {
    console.log('AR supported:', supported);
  });
}
```

## Common Error Messages

| Error | Cause | Solution |
|-------|-------|----------|
| "WebXR not supported" | Wrong browser | Use Chrome/Edge/Firefox |
| "AR not supported" | Wrong device | Use mobile or VR headset |
| "Permission denied" | Camera blocked | Grant camera permissions |
| "HTTPS required" | Not secure | Use HTTPS or localhost |
| "Session failed" | Device issue | Try different device |

## Next Steps

If AR still doesn't work:
1. Try on a different device
2. Check browser console for specific errors
3. Ensure HTTPS is being used
4. Try in incognito/private mode
5. Update browser to latest version

