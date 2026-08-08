import React, { useState } from 'react';
import { CoWorkingSpace, BookingState, SeatZone, Seat } from '../types';
import { 
  X, 
  Calendar, 
  Clock, 
  MapPin, 
  CheckCircle2, 
  ShieldCheck,
  Armchair,
  Zap,
  Monitor,
  Headphones,
  Check,
  Info,
  Sparkles,
  Users
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

interface BookingFlowOverlayProps {
  space: CoWorkingSpace;
  isOpen: boolean;
  onClose: () => void;
  onConfirmBooking: (booking: BookingState) => void;
}

export const BookingFlowOverlay: React.FC<BookingFlowOverlayProps> = ({
  space,
  isOpen,
  onClose,
  onConfirmBooking,
}) => {
  const [durationHours, setDurationHours] = useState<number>(4);
  const [selectedDate, setSelectedDate] = useState<string>('Today, Aug 8');
  const [selectedTime, setSelectedTime] = useState<string>('10:00 AM');
  const [purposeNote, setPurposeNote] = useState<string>('Cross-department AI & Fintech sync');

  // Sitting Position & Zone State
  const seatZones: SeatZone[] = space.seatZones && space.seatZones.length > 0
    ? space.seatZones
    : [
        {
          id: 'zone-hotdesk',
          name: 'Focus Hot Desk Row',
          description: 'Herman Miller ergonomic desks with dual 32" 4K displays.',
          zoneType: 'hot_desk',
          totalSeats: 12,
          availableSeats: 5,
          hourlyRate: 0,
          seats: Array.from({ length: 12 }).map((_, idx) => ({
            id: `seat-hd-${idx + 1}`,
            label: `Desk H-${idx + 1}`,
            status: idx % 3 === 0 ? 'occupied' : idx % 5 === 0 ? 'reserved' : 'available',
            x: 10 + (idx % 4) * 22,
            y: 20 + Math.floor(idx / 4) * 25,
            type: 'hot_desk',
            monitors: 2,
            powerOutlet: true,
            features: ['Standing Desk', 'Dual 4K', 'Ergonomic Task Chair'],
          })),
        },
        {
          id: 'zone-lounge',
          name: 'Collaborative Lounge',
          description: 'Open modular sofas with mobile whiteboards and power stations.',
          zoneType: 'collaborative_lounge',
          totalSeats: 8,
          availableSeats: 3,
          hourlyRate: 0,
          seats: Array.from({ length: 8 }).map((_, idx) => ({
            id: `seat-lg-${idx + 1}`,
            label: `Lounge Pod L-${idx + 1}`,
            status: idx % 2 === 0 ? 'available' : 'occupied',
            x: 15 + (idx % 4) * 22,
            y: 30 + Math.floor(idx / 4) * 35,
            type: 'lounge_chair',
            powerOutlet: true,
            features: ['Modular Sofa', 'Acoustic Screen', 'Mobile Whiteboard'],
          })),
        },
        {
          id: 'zone-pods',
          name: 'Soundproof Pods',
          description: 'Acoustically isolated single focus booths.',
          zoneType: 'quiet_pod',
          totalSeats: 4,
          availableSeats: 2,
          hourlyRate: 0,
          seats: Array.from({ length: 4 }).map((_, idx) => ({
            id: `seat-pod-${idx + 1}`,
            label: `Focus Pod P-${idx + 1}`,
            status: idx % 2 === 1 ? 'available' : 'occupied',
            x: 20 + idx * 20,
            y: 50,
            type: 'quiet_pod',
            powerOutlet: true,
            features: ['Soundproof Glass', 'Dimmable Ring Light', 'Dual Power'],
          })),
        },
      ];

  const [activeZoneId, setActiveZoneId] = useState<string>(seatZones[0].id);

  // Active Zone object
  const activeZone = seatZones.find((z) => z.id === activeZoneId) || seatZones[0];

  // Default selected seat: first available in active zone or fallback
  const firstAvailableSeat = activeZone.seats.find((s) => s.status === 'available') || activeZone.seats[0];
  const [selectedSeatId, setSelectedSeatId] = useState<string>(firstAvailableSeat?.id || '');

  // Find currently selected seat across all zones
  const currentSelectedSeat = seatZones
    .flatMap((z) => z.seats)
    .find((s) => s.id === selectedSeatId) || firstAvailableSeat;

  const currentSelectedZone = seatZones.find((z) =>
    z.seats.some((s) => s.id === selectedSeatId)
  ) || activeZone;

  if (!isOpen) return null;

  const handleFinalConfirm = () => {
    const seatLabel = currentSelectedSeat
      ? `${currentSelectedSeat.label} (${currentSelectedZone.name})`
      : 'On-Demand Workspace Chair';

    const bookingData: BookingState = {
      spaceId: space.id,
      spaceName: space.name,
      date: selectedDate,
      timeStart: selectedTime,
      durationHours,
      zoneId: currentSelectedZone.id,
      seatId: currentSelectedSeat?.id || 'chair-flex',
      seatLabel,
      totalPrice: 0,
      purposeNote,
    };
    onConfirmBooking(bookingData);
  };

  const getSeatIcon = (type: Seat['type']) => {
    switch (type) {
      case 'quiet_pod':
        return <Headphones className="w-3.5 h-3.5" />;
      case 'standing_desk':
      case 'hot_desk':
        return <Monitor className="w-3.5 h-3.5" />;
      case 'lounge_chair':
      default:
        return <Armchair className="w-3.5 h-3.5" />;
    }
  };

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-5 bg-slate-900/60 backdrop-blur-md overflow-y-auto">
        
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 20 }}
          className="relative w-full max-w-2xl bg-white border border-slate-200 rounded-3xl shadow-2xl overflow-hidden my-auto text-slate-900 flex flex-col max-h-[90vh]"
        >
          {/* Close Button */}
          <button
            onClick={onClose}
            className="absolute top-4 right-4 z-20 p-2 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-600 hover:text-slate-900 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>

          {/* Modal Header */}
          <div className="p-5 sm:p-6 bg-slate-50 border-b border-slate-200 flex flex-wrap items-center justify-between gap-3 shrink-0">
            <div>
              <span className="px-2.5 py-0.5 text-[10px] font-black uppercase tracking-wider rounded bg-purple-100 text-purple-700 border border-purple-200">
                Workspace Booking & Chair Selection
              </span>
              <h2 className="text-lg sm:text-xl font-bold text-slate-900 mt-1">
                Reserve Seat at {space.name}
              </h2>
              <p className="text-xs text-slate-500 flex items-center gap-1.5 mt-0.5">
                <MapPin className="w-3.5 h-3.5 text-purple-600 shrink-0" />
                {space.address}
              </p>
            </div>
          </div>

          <div className="p-4 sm:p-6 space-y-5 overflow-y-auto flex-1">
            
            {/* Step 1: Duration & Time Picker */}
            <div className="space-y-3.5 p-4 rounded-2xl bg-slate-50 border border-slate-200">
              <div className="flex items-center justify-between">
                <label className="text-xs font-bold uppercase tracking-wider text-slate-700 flex items-center gap-1.5">
                  <Clock className="w-4 h-4 text-purple-600" />
                  Booking Duration
                </label>
                <span className="px-3 py-1 rounded-xl bg-purple-100 text-purple-800 font-bold text-xs sm:text-sm border border-purple-200">
                  {durationHours} Hours Pass
                </span>
              </div>

              {/* Duration Range Slider */}
              <input
                type="range"
                min="1"
                max="10"
                step="1"
                value={durationHours}
                onChange={(e) => setDurationHours(Number(e.target.value))}
                className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-purple-600"
              />

              <div className="flex justify-between text-[11px] text-slate-500 font-semibold px-1">
                <span>1 hr (Quick Sync)</span>
                <span>4 hrs (Half Day)</span>
                <span>8 hrs (Full Day)</span>
                <span>10 hrs</span>
              </div>

              {/* Time & Date Selectors */}
              <div className="grid grid-cols-2 gap-3 pt-2 border-t border-slate-200">
                <div>
                  <label className="text-[11px] font-bold text-slate-600 block mb-1">Select Date</label>
                  <select
                    value={selectedDate}
                    onChange={(e) => setSelectedDate(e.target.value)}
                    className="w-full bg-white text-xs text-slate-800 p-2.5 rounded-xl border border-slate-200 focus:outline-none focus:border-purple-500 shadow-2xs font-medium"
                  >
                    <option>Today, Aug 8</option>
                    <option>Tomorrow, Aug 9</option>
                    <option>Friday, Aug 10</option>
                    <option>Monday, Aug 13</option>
                  </select>
                </div>

                <div>
                  <label className="text-[11px] font-bold text-slate-600 block mb-1">Start Time</label>
                  <select
                    value={selectedTime}
                    onChange={(e) => setSelectedTime(e.target.value)}
                    className="w-full bg-white text-xs text-slate-800 p-2.5 rounded-xl border border-slate-200 focus:outline-none focus:border-purple-500 shadow-2xs font-medium"
                  >
                    <option>09:00 AM</option>
                    <option>10:00 AM</option>
                    <option>01:00 PM</option>
                    <option>03:00 PM</option>
                  </select>
                </div>
              </div>
            </div>

            {/* Step 2: Interactive Sitting Position & Chair Availability Selector */}
            <div className="p-4 rounded-2xl bg-gradient-to-br from-purple-50/70 via-slate-50 to-pink-50/50 border border-purple-200/80 space-y-3.5">
              
              <div className="flex flex-wrap items-center justify-between gap-2 pb-2 border-b border-purple-200/60">
                <div className="flex items-center gap-1.5 text-xs font-black text-slate-900">
                  <Armchair className="w-4 h-4 text-purple-600" />
                  <span>Sitting Position Availability</span>
                </div>

                {/* Legend Badges */}
                <div className="flex items-center gap-2 text-[10px] font-bold">
                  <span className="flex items-center gap-1 text-emerald-700 bg-emerald-100/80 px-2 py-0.5 rounded border border-emerald-200">
                    <span className="w-2 h-2 rounded-full bg-emerald-500" />
                    Available
                  </span>
                  <span className="flex items-center gap-1 text-rose-700 bg-rose-100/80 px-2 py-0.5 rounded border border-rose-200">
                    <span className="w-2 h-2 rounded-full bg-rose-500" />
                    Occupied
                  </span>
                  <span className="flex items-center gap-1 text-purple-800 bg-purple-100 px-2 py-0.5 rounded border border-purple-300">
                    <Sparkles className="w-2.5 h-2.5 text-purple-600" />
                    Selected
                  </span>
                </div>
              </div>

              {/* Zone Filter Tabs */}
              <div className="flex items-center gap-1.5 overflow-x-auto pb-1 scrollbar-none">
                {seatZones.map((zone) => {
                  const availCount = zone.seats.filter((s) => s.status === 'available').length;
                  const isZoneActive = activeZoneId === zone.id;
                  return (
                    <button
                      key={zone.id}
                      type="button"
                      onClick={() => setActiveZoneId(zone.id)}
                      className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all whitespace-nowrap flex items-center gap-1.5 border ${
                        isZoneActive
                          ? 'bg-purple-600 text-white border-purple-700 shadow-xs'
                          : 'bg-white text-slate-700 border-slate-200 hover:bg-slate-100'
                      }`}
                    >
                      <span>{zone.name}</span>
                      <span
                        className={`px-1.5 py-0.2 rounded-full text-[10px] ${
                          isZoneActive
                            ? 'bg-purple-800 text-purple-100'
                            : 'bg-slate-100 text-slate-600'
                        }`}
                      >
                        {availCount} Free
                      </span>
                    </button>
                  );
                })}
              </div>

              {/* Active Zone Floorplan / Sitting Grid */}
              <div className="p-3.5 rounded-xl bg-white border border-slate-200 shadow-2xs space-y-3">
                <div className="flex items-center justify-between text-xs">
                  <span className="font-bold text-slate-800">{activeZone.name} Layout</span>
                  <span className="text-[11px] text-slate-500 font-medium">{activeZone.description}</span>
                </div>

                {/* Chair Floorplan Buttons Grid */}
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 pt-1">
                  {activeZone.seats.map((seat) => {
                    const isSelected = selectedSeatId === seat.id;
                    const isOccupied = seat.status === 'occupied' || seat.status === 'reserved';

                    return (
                      <button
                        key={seat.id}
                        type="button"
                        disabled={isOccupied}
                        onClick={() => setSelectedSeatId(seat.id)}
                        className={`p-2.5 rounded-xl border text-left transition-all relative flex flex-col justify-between h-20 ${
                          isSelected
                            ? 'bg-gradient-to-br from-purple-600 to-pink-600 text-white border-purple-500 ring-2 ring-purple-300 shadow-md scale-[1.02]'
                            : isOccupied
                            ? 'bg-rose-50/70 border-rose-200/80 text-rose-400 cursor-not-allowed opacity-80'
                            : 'bg-emerald-50/50 hover:bg-emerald-100/80 border-emerald-200 text-slate-800 cursor-pointer shadow-2xs hover:scale-[1.02]'
                        }`}
                      >
                        <div className="flex items-center justify-between w-full">
                          <span
                            className={`p-1 rounded-lg ${
                              isSelected
                                ? 'bg-white/20 text-white'
                                : isOccupied
                                ? 'bg-rose-100 text-rose-500'
                                : 'bg-emerald-200/70 text-emerald-800'
                            }`}
                          >
                            {getSeatIcon(seat.type)}
                          </span>

                          {/* Status Badge */}
                          {isSelected ? (
                            <span className="p-1 rounded-full bg-white text-purple-700">
                              <Check className="w-3 h-3 stroke-[3]" />
                            </span>
                          ) : isOccupied ? (
                            <span className="text-[9px] font-extrabold uppercase tracking-wide text-rose-600 bg-rose-100 px-1.5 py-0.5 rounded">
                              Busy
                            </span>
                          ) : (
                            <span className="text-[9px] font-extrabold uppercase tracking-wide text-emerald-700 bg-emerald-100 px-1.5 py-0.5 rounded">
                              Free
                            </span>
                          )}
                        </div>

                        <div>
                          <div
                            className={`text-xs font-black truncate ${
                              isSelected ? 'text-white' : isOccupied ? 'text-slate-400' : 'text-slate-900'
                            }`}
                          >
                            {seat.label}
                          </div>
                          <div
                            className={`text-[9px] font-medium truncate flex items-center gap-1 ${
                              isSelected ? 'text-purple-100' : 'text-slate-500'
                            }`}
                          >
                            {seat.monitors ? `🖥️ ${seat.monitors} Mon` : '⚡ Power'}
                            {seat.powerOutlet && ' • Outlet'}
                          </div>
                        </div>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Selected Chair Summary Banner */}
              {currentSelectedSeat && (
                <div className="p-3 rounded-xl bg-purple-100/90 border border-purple-300 text-purple-900 flex flex-wrap items-center justify-between gap-2">
                  <div className="flex items-center gap-2">
                    <div className="p-2 rounded-lg bg-purple-600 text-white shadow-2xs">
                      <Armchair className="w-4 h-4" />
                    </div>
                    <div>
                      <div className="text-xs font-black text-slate-900 flex items-center gap-1.5">
                        Selected Sitting Position: <span className="text-purple-800">{currentSelectedSeat.label}</span>
                      </div>
                      <div className="text-[11px] text-purple-800 font-medium flex items-center gap-1">
                        <span>Zone: {currentSelectedZone.name}</span>
                        {currentSelectedSeat.features && currentSelectedSeat.features.length > 0 && (
                          <span>• {currentSelectedSeat.features.join(' • ')}</span>
                        )}
                      </div>
                    </div>
                  </div>
                  <span className="text-[10px] font-extrabold text-emerald-800 bg-emerald-100 border border-emerald-300 px-2 py-0.5 rounded-full flex items-center gap-1">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                    Seat Reserved
                  </span>
                </div>
              )}

            </div>

            {/* Step 3: Purpose Note */}
            <div>
              <label className="text-[11px] font-bold text-slate-600 block mb-1">
                Cross-Department Synergy Goal (Optional)
              </label>
              <input
                type="text"
                value={purposeNote}
                onChange={(e) => setPurposeNote(e.target.value)}
                placeholder="e.g. AI & Legal compliance sync..."
                className="w-full bg-white text-xs text-slate-800 p-2.5 rounded-xl border border-slate-200 focus:outline-none focus:border-purple-500 shadow-2xs font-medium"
              />
            </div>

            {/* Selected Space & Chair Summary Card */}
            <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-3">
              <div className="flex items-center gap-3">
                <img
                  src={space.image}
                  alt={space.name}
                  className="w-12 h-12 rounded-xl object-cover border border-slate-200 shrink-0"
                />
                <div>
                  <h4 className="text-sm font-bold text-slate-900">{space.name}</h4>
                  <p className="text-xs text-slate-500">{selectedDate} @ {selectedTime}</p>
                </div>
              </div>

              <div className="pt-3 border-t border-slate-200 space-y-1.5 text-xs">
                <div className="flex items-center justify-between">
                  <span className="text-slate-500">Reserved Chair:</span>
                  <span className="font-extrabold text-purple-800 bg-purple-50 px-2 py-0.5 rounded border border-purple-200">
                    {currentSelectedSeat ? `${currentSelectedSeat.label} (${currentSelectedZone.name})` : 'Flex Hot Desk'}
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-slate-500">Duration:</span>
                  <span className="font-bold text-slate-800">{durationHours} Hours Pass</span>
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="space-y-2 pt-1">
              <button
                type="button"
                onClick={handleFinalConfirm}
                className="w-full py-3.5 px-4 rounded-xl font-bold text-sm text-white bg-gradient-to-r from-[#EC4899] via-[#8B5CF6] to-[#06B6D4] hover:opacity-95 shadow-md flex items-center justify-center gap-2 transition-all active:scale-[0.98]"
              >
                <CheckCircle2 className="w-4 h-4" />
                <span>Confirm Booking & Reserve Chair</span>
              </button>

              <p className="text-[10px] text-center text-slate-500 flex items-center justify-center gap-1">
                <ShieldCheck className="w-3 h-3 text-emerald-600" />
                Free cancellation up to 1 hour before start time
              </p>
            </div>

          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};

