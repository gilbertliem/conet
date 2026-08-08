import React from 'react';
import { BookingState } from '../types';
import { X, CheckCircle2, QrCode, MapPin, Calendar, Clock, Download, Share2, ShieldCheck } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

interface ConfirmationReceiptModalProps {
  booking: BookingState | null;
  onClose: () => void;
}

export const ConfirmationReceiptModal: React.FC<ConfirmationReceiptModalProps> = ({
  booking,
  onClose,
}) => {
  if (!booking) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-md">
        <motion.div
          initial={{ opacity: 0, scale: 0.9, y: 15 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.9, y: 15 }}
          className="relative w-full max-w-md bg-white border border-slate-200 rounded-3xl shadow-2xl p-6 text-center overflow-hidden text-slate-900"
        >
          {/* Header Icon */}
          <div className="w-16 h-16 mx-auto mb-3 rounded-2xl bg-emerald-100 text-emerald-600 border border-emerald-200 flex items-center justify-center shadow-md">
            <CheckCircle2 className="w-8 h-8" />
          </div>

          <span className="px-2.5 py-0.5 text-[10px] font-black uppercase tracking-wider rounded bg-emerald-100 text-emerald-800 border border-emerald-200">
            Booking Confirmed & Access Issued
          </span>

          <h3 className="text-xl font-extrabold text-slate-900 mt-2">
            Your Digital Space Pass
          </h3>
          <p className="text-xs text-slate-500 mt-1">
            Access credentials sent to your enterprise email.
          </p>

          {/* QR Code Pass Card */}
          <div className="my-5 p-5 rounded-2xl bg-slate-50 border border-slate-200 space-y-4">
            
            {/* Visual QR Code Graphic */}
            <div className="p-3 bg-white border border-slate-200 rounded-2xl w-36 h-36 mx-auto shadow-sm flex items-center justify-center">
              <QrCode className="w-full h-full text-slate-900" />
            </div>

            <div className="text-xs text-slate-500 font-mono tracking-widest uppercase">
              PASS ID: #CONET-8842-SF
            </div>

            {/* Details Breakdown */}
            <div className="space-y-1.5 text-xs text-left pt-3 border-t border-slate-200">
              <div className="flex justify-between items-center">
                <span className="text-slate-500">Hub Location:</span>
                <span className="font-bold text-slate-900">{booking.spaceName}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-slate-500">Reserved Chair:</span>
                <span className="font-extrabold text-purple-700 bg-purple-50 px-2 py-0.5 rounded border border-purple-200">
                  {booking.seatLabel}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500">Date & Time:</span>
                <span className="font-bold text-slate-800">{booking.date} @ {booking.timeStart}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500">Duration:</span>
                <span className="font-bold text-slate-800">{booking.durationHours} Hours Pass</span>
              </div>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={onClose}
              className="flex-1 py-3 rounded-xl font-bold text-xs text-white bg-gradient-to-r from-[#EC4899] via-[#8B5CF6] to-[#06B6D4] hover:opacity-95 shadow-md"
            >
              Done & Return to Dashboard
            </button>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
