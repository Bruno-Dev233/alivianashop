import { useSyncExternalStore } from "react";

export type AdminNotification = {
  id: string;
  title: string;
  body: string;
  createdAt: string;
  read: boolean;
};

let items: AdminNotification[] = [];
const listeners = new Set<() => void>();

function emit() {
  listeners.forEach((listener) => listener());
}

export function pushNotification(notification: Omit<AdminNotification, "read">) {
  if (items.some((item) => item.id === notification.id)) return;
  items = [{ ...notification, read: false }, ...items].slice(0, 30);
  emit();
}

export function markAllRead() {
  if (!items.some((item) => !item.read)) return;
  items = items.map((item) => ({ ...item, read: true }));
  emit();
}

export function clearNotifications() {
  items = [];
  emit();
}

function subscribe(listener: () => void) {
  listeners.add(listener);
  return () => listeners.delete(listener);
}

const empty: AdminNotification[] = [];

export function useNotifications(): AdminNotification[] {
  return useSyncExternalStore(
    subscribe,
    () => items,
    () => empty,
  );
}
