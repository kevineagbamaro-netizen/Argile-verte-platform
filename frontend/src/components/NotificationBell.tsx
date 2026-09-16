import React, { useEffect, useRef, useState } from 'react';
import { Bell } from 'lucide-react';
import { Link } from 'react-router-dom';
import api from '../services/api';
import { AdminNotification } from '../types';
import { formatDate } from '../lib/currency';

export const NotificationBell: React.FC = () => {
  const [open, setOpen] = useState(false);
  const [unread, setUnread] = useState(0);
  const [items, setItems] = useState<AdminNotification[]>([]);
  const root = useRef<HTMLDivElement>(null);

  const load = async () => {
    try {
      const data = await api.getNotifications();
      setUnread(Number(data.unread) || 0);
      setItems(data.items || []);
    } catch {
      /* ignore */
    }
  };

  useEffect(() => {
    load();
    const interval = setInterval(load, 20000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const onClick = (event: MouseEvent) => {
      if (root.current && !root.current.contains(event.target as Node)) {
        setOpen(false);
      }
    };
    document.addEventListener('mousedown', onClick);
    return () => document.removeEventListener('mousedown', onClick);
  }, []);

  return (
    <div className="relative" ref={root}>
      <button
        type="button"
        onClick={() => setOpen((value) => !value)}
        className="relative inline-flex items-center justify-center w-10 h-10 rounded-full border border-clay-brown/15 text-clay-green hover:bg-clay-green hover:text-cream transition-colors"
        aria-label="Notifications"
      >
        <Bell className="w-4 h-4" />
        {unread > 0 && (
          <span className="absolute -top-1 -right-1 min-w-[1.15rem] h-5 px-1 rounded-full bg-red-700 text-white text-[10px] font-semibold flex items-center justify-center">
            {unread > 9 ? '9+' : unread}
          </span>
        )}
      </button>
      {open && (
        <div className="absolute right-0 mt-2 w-80 bg-cream-light border border-clay-brown/10 rounded-2xl shadow-xl z-50 overflow-hidden">
          <div className="flex items-center justify-between px-4 py-3 border-b border-clay-brown/10">
            <p className="text-sm font-medium text-clay-green">Notifications</p>
            {unread > 0 && (
              <button
                type="button"
                className="text-[11px] text-clay-brown hover:underline"
                onClick={async () => {
                  await api.markAllNotificationsRead();
                  await load();
                }}
              >
                Tout lire
              </button>
            )}
          </div>
          <ul className="max-h-80 overflow-y-auto">
            {items.length === 0 && (
              <li className="px-4 py-6 text-sm text-natural-text/60">Aucune alerte pour le moment.</li>
            )}
            {items.slice(0, 8).map((item) => (
              <li key={item.id} className={`px-4 py-3 border-t border-clay-brown/5 ${item.read ? 'opacity-70' : 'bg-white/40'}`}>
                <p className="text-sm font-medium text-natural-text">{item.title}</p>
                <p className="text-xs text-natural-text/65 mt-0.5">{item.message}</p>
                <p className="text-[10px] text-clay-brown mt-1">{formatDate(item.createdAt)}</p>
              </li>
            ))}
          </ul>
          <Link to="/admin" onClick={() => setOpen(false)} className="block text-center text-xs py-3 border-t border-clay-brown/10 text-clay-green">
            Ouvrir l’administration
          </Link>
        </div>
      )}
    </div>
  );
};
