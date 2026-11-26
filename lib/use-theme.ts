"use client";

import { useSyncExternalStore } from "react";

function subscribeTheme(callback: () => void) {
  const observer = new MutationObserver(callback);
  observer.observe(document.documentElement, {
    attributes: true,
    attributeFilter: ["class"],
  });
  return () => observer.disconnect();
}

function getThemeSnapshot() {
  return document.documentElement.classList.contains("light");
}

function getServerThemeSnapshot() {
  return true;
}

/**
 * Subscribe to the active Light/Dark theme class on `<html>` (defaults to Light on SSR).
 */
export function useIsLightTheme(): boolean {
  return useSyncExternalStore(
    subscribeTheme,
    getThemeSnapshot,
    getServerThemeSnapshot
  );
}
