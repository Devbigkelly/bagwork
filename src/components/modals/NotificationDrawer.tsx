'use client';

import React from 'react';
import { useNotification } from '../../context/NotificationContext';
import { X, Bell, CheckCheck, Sparkles, AlertCircle, Coins } from 'lucide-react';

export default function NotificationDrawer() {
  const { 
    notifications, 
    isDrawerOpen, 
    closeDrawer, 
    markAsRead, 
    markAllAsRead, 
    toasts, 
    removeToast 
  } = useNotification();

  return (
    <>
      {/* Toast Overlay Container */}
      <div className="fixed top-20 right-4 z-50 flex flex-col gap-2 max-w-sm w-full pointer-events-none">
        {toasts.map((toast) => (
          <div
            key={toast.id}
            className="pointer-events-auto flex items-start gap-3 rounded-2xl border border-zinc-200 bg-white/95 p-4 shadow-xl backdrop-blur-xl animate-in slide-in-from-right"
          >
            {toast.type === 'success' && <Coins className="h-5 w-5 text-emerald-600 shrink-0 mt-0.5" />}
            {toast.type === 'error' && <AlertCircle className="h-5 w-5 text-rose-600 shrink-0 mt-0.5" />}
            {toast.type === 'warning' && <AlertCircle className="h-5 w-5 text-amber-600 shrink-0 mt-0.5" />}
            {toast.type === 'info' && <Sparkles className="h-5 w-5 text-zinc-900 shrink-0 mt-0.5" />}

            <div className="flex-1">
              <h4 className="text-xs font-black text-zinc-900">{toast.title}</h4>
              <p className="mt-0.5 text-xs text-zinc-600 font-medium leading-snug">{toast.message}</p>
            </div>

            <button
              onClick={() => removeToast(toast.id)}
              className="text-zinc-400 hover:text-zinc-900"
            >
              <X className="h-4 w-4" />
            </button>
          </div>
        ))}
      </div>

      {/* Slide-over Notification Center Drawer */}
      {isDrawerOpen && (
        <div className="fixed inset-0 z-50 flex justify-end bg-black/40 backdrop-blur-sm animate-in fade-in">
          <div className="w-full max-w-md bg-white border-l border-zinc-200 p-6 shadow-2xl flex flex-col h-full animate-in slide-in-from-right">
            
            {/* Header */}
            <div className="flex items-center justify-between border-b border-zinc-100 pb-4">
              <div className="flex items-center gap-2">
                <Bell className="h-5 w-5 text-zinc-900" />
                <h3 className="text-base font-black text-zinc-900">Notification Center</h3>
              </div>
              <div className="flex items-center gap-2">
                <button
                  onClick={markAllAsRead}
                  className="flex items-center gap-1 text-xs font-extrabold text-emerald-700 hover:underline"
                >
                  <CheckCheck className="h-3.5 w-3.5" />
                  Mark all read
                </button>
                <button
                  onClick={closeDrawer}
                  className="rounded-lg p-1 text-zinc-400 hover:bg-zinc-100 hover:text-zinc-900"
                >
                  <X className="h-5 w-5" />
                </button>
              </div>
            </div>

            {/* List */}
            <div className="mt-4 flex-1 overflow-y-auto space-y-3">
              {notifications.length === 0 ? (
                <div className="flex flex-col items-center justify-center py-12 text-zinc-400">
                  <Bell className="h-8 w-8 opacity-40 mb-2" />
                  <p className="text-xs font-semibold">No notifications yet</p>
                </div>
              ) : (
                notifications.map((notif) => (
                  <div
                    key={notif.id}
                    onClick={() => markAsRead(notif.id)}
                    className={`rounded-2xl border p-3.5 transition-all cursor-pointer ${
                      notif.isRead
                        ? 'border-zinc-200 bg-zinc-50/60'
                        : 'border-emerald-200 bg-emerald-50/50'
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <h4 className="text-xs font-black text-zinc-900">{notif.title}</h4>
                      <span className="text-[10px] font-semibold text-zinc-500">{notif.timestamp}</span>
                    </div>
                    <p className="mt-1 text-xs font-medium text-zinc-600 leading-relaxed">{notif.message}</p>
                  </div>
                ))
              )}
            </div>

          </div>
        </div>
      )}
    </>
  );
}
