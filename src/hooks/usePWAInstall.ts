import { useEffect, useState } from 'react';

export type DeviceType = 'android' | 'ios' | 'ipad' | 'laptop' | 'pc';

interface BeforeInstallPromptEvent extends Event {
  prompt: () => Promise<void>;
  userChoice: Promise<{ outcome: 'accepted' | 'dismissed'; platform: string }>;
}

// Global variable to capture beforeinstallprompt before component mount
let globalDeferredPrompt: BeforeInstallPromptEvent | null = null;

if (typeof window !== 'undefined') {
  window.addEventListener('beforeinstallprompt', (e) => {
    e.preventDefault();
    globalDeferredPrompt = e as BeforeInstallPromptEvent;
  });
}

export function detectDevice(): DeviceType {
  if (typeof window === 'undefined') return 'laptop';
  const ua = window.navigator.userAgent.toLowerCase();

  // iPad detection (including iPadOS 13+ that reports as MacIntel with touch points)
  const isIPad =
    /ipad/.test(ua) ||
    (window.navigator.platform === 'MacIntel' && window.navigator.maxTouchPoints > 1);
  if (isIPad) return 'ipad';

  // iPhone / iPod detection
  const isIPhone = /iphone|ipod/.test(ua);
  if (isIPhone) return 'ios';

  // Android detection
  const isAndroid = /android/.test(ua);
  if (isAndroid) return 'android';

  // Desktop Laptop vs PC heuristic (screen size and battery presence)
  if (window.innerWidth <= 1536) {
    return 'laptop';
  }
  return 'pc';
}

export function usePWAInstall() {
  const [deferredPrompt, setDeferredPrompt] = useState<BeforeInstallPromptEvent | null>(() => globalDeferredPrompt);
  const [isInstalled, setIsInstalled] = useState(false);
  const [detectedPlatform, setDetectedPlatform] = useState<DeviceType>('laptop');

  useEffect(() => {
    // Detect standalone mode (already running as installed app)
    const isStandalone =
      window.matchMedia('(display-mode: standalone)').matches ||
      (window.navigator as unknown as { standalone?: boolean }).standalone === true;
    setIsInstalled(isStandalone);

    setDetectedPlatform(detectDevice());

    const handleBeforeInstallPrompt = (e: Event) => {
      e.preventDefault();
      const promptEvent = e as BeforeInstallPromptEvent;
      globalDeferredPrompt = promptEvent;
      setDeferredPrompt(promptEvent);
    };

    const handleAppInstalled = () => {
      setIsInstalled(true);
      globalDeferredPrompt = null;
      setDeferredPrompt(null);
    };

    window.addEventListener('beforeinstallprompt', handleBeforeInstallPrompt);
    window.addEventListener('appinstalled', handleAppInstalled);

    // If global was set before hook initialized
    if (globalDeferredPrompt && !deferredPrompt) {
      setDeferredPrompt(globalDeferredPrompt);
    }

    return () => {
      window.removeEventListener('beforeinstallprompt', handleBeforeInstallPrompt);
      window.removeEventListener('appinstalled', handleAppInstalled);
    };
  }, [deferredPrompt]);

  const install = async (): Promise<{ success: boolean; outcome?: 'accepted' | 'dismissed'; reason?: string }> => {
    const promptEvent = deferredPrompt || globalDeferredPrompt;
    if (!promptEvent) {
      return {
        success: false,
        reason: 'no_prompt',
      };
    }

    try {
      await promptEvent.prompt();
      const { outcome } = await promptEvent.userChoice;
      if (outcome === 'accepted') {
        setIsInstalled(true);
        globalDeferredPrompt = null;
        setDeferredPrompt(null);
        return { success: true, outcome: 'accepted' };
      }
      return { success: false, outcome: 'dismissed' };
    } catch (err) {
      console.error('Install prompt error:', err);
      return { success: false, reason: 'prompt_failed' };
    }
  };

  return {
    isInstallable: !!(deferredPrompt || globalDeferredPrompt),
    isInstalled,
    detectedPlatform,
    isAndroid: detectedPlatform === 'android',
    isIOS: detectedPlatform === 'ios',
    isIPad: detectedPlatform === 'ipad',
    isLaptop: detectedPlatform === 'laptop',
    isPC: detectedPlatform === 'pc',
    install,
  };
}
