import React, { useEffect } from 'react';
import { useApp } from '../context/AppContext';
import { 
  CheckCircleIcon, 
  XCircleIcon, 
  InformationCircleIcon,
  ExclamationTriangleIcon,
  XMarkIcon
} from '@heroicons/react/24/outline';

const NotificationSystem = () => {
  const { state, removeNotification } = useApp();

  useEffect(() => {
    // Auto-remove notifications after 5 seconds
    state.notifications.forEach(notification => {
      if (notification.autoRemove !== false) {
        setTimeout(() => {
          removeNotification(notification.id);
        }, 5000);
      }
    });
  }, [state.notifications, removeNotification]);

  const getIcon = (type) => {
    switch (type) {
      case 'success':
        return CheckCircleIcon;
      case 'error':
        return XCircleIcon;
      case 'warning':
        return ExclamationTriangleIcon;
      default:
        return InformationCircleIcon;
    }
  };

  const getStyles = (type) => {
    switch (type) {
      case 'success':
        return 'bg-green-50 border-green-200 text-green-800';
      case 'error':
        return 'bg-red-50 border-red-200 text-red-800';
      case 'warning':
        return 'bg-yellow-50 border-yellow-200 text-yellow-800';
      default:
        return 'bg-blue-50 border-blue-200 text-blue-800';
    }
  };

  if (state.notifications.length === 0) return null;

  return (
    <div className="fixed top-20 right-4 z-50 space-y-2 max-w-sm">
      {state.notifications.map((notification) => {
        const Icon = getIcon(notification.type);
        const styles = getStyles(notification.type);

        return (
          <div
            key={notification.id}
            className={`p-4 border rounded-lg shadow-lg ${styles} slide-up`}
          >
            <div className="flex items-start">
              <Icon className="h-5 w-5 mr-3 mt-0.5 flex-shrink-0" />
              <div className="flex-1 min-w-0">
                {notification.title && (
                  <h4 className="font-semibold mb-1">{notification.title}</h4>
                )}
                <p className="text-sm">{notification.message}</p>
              </div>
              <button
                onClick={() => removeNotification(notification.id)}
                className="ml-3 flex-shrink-0 opacity-70 hover:opacity-100"
              >
                <XMarkIcon className="h-4 w-4" />
              </button>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default NotificationSystem;