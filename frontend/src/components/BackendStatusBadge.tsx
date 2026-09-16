import React, { useEffect, useState } from 'react';
import { CheckCircle2, AlertCircle, RefreshCw } from 'lucide-react';
import api from '../services/api';
import { HealthResponse } from '../types';

export const BackendStatusBadge: React.FC = () => {
  const [health, setHealth] = useState<HealthResponse | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<boolean>(false);

  const checkStatus = async () => {
    setLoading(true);
    try {
      const data = await api.checkHealth();
      setHealth(data);
      setError(false);
    } catch {
      setHealth(null);
      setError(true);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    checkStatus();
    const interval = setInterval(checkStatus, 15000);
    return () => clearInterval(interval);
  }, []);

  if (loading && !health && !error) {
    return (
      <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium bg-amber-50 text-amber-800 border border-amber-200">
        <RefreshCw className="w-3.5 h-3.5 animate-spin" />
        <span>Connexion Backend...</span>
      </div>
    );
  }

  if (error) {
    return (
      <div 
        className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium bg-red-50 text-red-700 border border-red-200 cursor-pointer hover:bg-red-100 transition-colors"
        onClick={checkStatus}
        title="Cliquez pour réessayer la connexion au backend Spring Boot"
      >
        <AlertCircle className="w-3.5 h-3.5" />
        <span>API non démarrée</span>
      </div>
    );
  }

  return (
    <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium bg-emerald-50 text-emerald-800 border border-emerald-200">
      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
      <span>API connectée</span>
    </div>
  );
};
