import React from 'react';

interface PaymentLogosProps {
  compact?: boolean;
}

export const PaymentLogos: React.FC<PaymentLogosProps> = ({ compact = false }) => {
  const moov = compact ? 'h-11' : 'h-14';
  const mixx = compact ? 'h-8' : 'h-10';
  return (
    <div className="flex flex-wrap items-center gap-3">
      <img src="/payments/moov-money.png" alt="Moov Money" className={`${moov} w-auto object-contain`} />
      <img src="/payments/mixx-by-yas.png" alt="Mixx by Yas" className={`${mixx} w-auto object-contain rounded-md`} />
    </div>
  );
};
