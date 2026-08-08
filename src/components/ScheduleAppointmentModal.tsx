import React, { useState } from 'react';
import { Professional } from '../types';
import { X, Calendar, Clock, MessageSquare, CheckCircle2, UserCheck, Sparkles } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

interface ScheduleAppointmentModalProps {
  professional: Professional | null;
  onClose: () => void;
  onConfirmSchedule: (details: { profName: string; time: string; topic: string }) => void;
}

export const ScheduleAppointmentModal: React.FC<ScheduleAppointmentModalProps> = ({
  professional,
  onClose,
  onConfirmSchedule,
}) => {
  const [selectedTime, setSelectedTime] = useState<string>('2:30 PM (Today)');
  const [meetingTopic, setMeetingTopic] = useState<string>(
    'Cross-departmental AI model quantization & compliance alignment'
  );
  const [meetingType, setMeetingType] = useState<'coffee' | 'pod' | 'virtual'>('pod');

  if (!professional) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onConfirmSchedule({
      profName: professional.name,
      time: selectedTime,
      topic: meetingTopic,
    });
  };

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.95 }}
          className="relative w-full max-w-lg bg-slate-900 border border-slate-800 rounded-3xl shadow-2xl p-6 overflow-hidden"
        >
          <button
            onClick={onClose}
            className="absolute top-4 right-4 p-2 rounded-full bg-slate-950 hover:bg-slate-800 text-slate-400 hover:text-white"
          >
            <X className="w-5 h-5" />
          </button>

          <div className="flex items-center gap-3 mb-4">
            <img
              src={professional.avatar}
              alt={professional.name}
              className="w-12 h-12 rounded-xl object-cover ring-2 ring-blue-500/50"
            />
            <div>
              <span className="text-[10px] font-bold uppercase tracking-wider text-blue-400">
                1-on-1 Sync Request
              </span>
              <h3 className="text-lg font-bold text-white">
                Connect with {professional.name}
              </h3>
              <p className="text-xs text-slate-400">{professional.jobTitle} • {professional.company}</p>
            </div>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="text-xs font-semibold text-slate-300 block mb-1">
                Select Available Slot
              </label>
              <select
                value={selectedTime}
                onChange={(e) => setSelectedTime(e.target.value)}
                className="w-full bg-slate-950 text-xs text-slate-200 p-3 rounded-xl border border-slate-800 focus:outline-none focus:border-blue-500"
              >
                <option>2:30 PM (Today at {professional.checkedInSpaceName})</option>
                <option>4:00 PM (Today at {professional.checkedInSpaceName})</option>
                <option>10:00 AM (Tomorrow)</option>
              </select>
            </div>

            <div>
              <label className="text-xs font-semibold text-slate-300 block mb-1">
                Meeting Venue
              </label>
              <div className="grid grid-cols-3 gap-2">
                <button
                  type="button"
                  onClick={() => setMeetingType('pod')}
                  className={`p-2.5 rounded-xl text-xs font-semibold border ${
                    meetingType === 'pod'
                      ? 'bg-blue-600/20 text-blue-300 border-blue-500'
                      : 'bg-slate-950 text-slate-400 border-slate-800'
                  }`}
                >
                  Soundproof Pod
                </button>
                <button
                  type="button"
                  onClick={() => setMeetingType('coffee')}
                  className={`p-2.5 rounded-xl text-xs font-semibold border ${
                    meetingType === 'coffee'
                      ? 'bg-blue-600/20 text-blue-300 border-blue-500'
                      : 'bg-slate-950 text-slate-400 border-slate-800'
                  }`}
                >
                  Espresso Lounge
                </button>
                <button
                  type="button"
                  onClick={() => setMeetingType('virtual')}
                  className={`p-2.5 rounded-xl text-xs font-semibold border ${
                    meetingType === 'virtual'
                      ? 'bg-blue-600/20 text-blue-300 border-blue-500'
                      : 'bg-slate-950 text-slate-400 border-slate-800'
                  }`}
                >
                  Virtual Link
                </button>
              </div>
            </div>

            <div>
              <label className="text-xs font-semibold text-slate-300 block mb-1">
                Collaboration Objective
              </label>
              <textarea
                rows={3}
                value={meetingTopic}
                onChange={(e) => setMeetingTopic(e.target.value)}
                className="w-full bg-slate-950 text-xs text-slate-200 p-3 rounded-xl border border-slate-800 focus:outline-none focus:border-blue-500"
              />
            </div>

            <button
              type="submit"
              className="w-full py-3 px-4 rounded-xl font-bold text-xs text-white bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 shadow-lg shadow-blue-600/30 flex items-center justify-center gap-2"
            >
              <Calendar className="w-4 h-4" />
              <span>Send Sync Invitation</span>
            </button>
          </form>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
