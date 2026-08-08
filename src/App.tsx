import React, { useState } from 'react';
import { MOCK_SPACES, MOCK_PROFESSIONALS, MOCK_CHECKIN_LOGS } from './data/mockData';
import { CoWorkingSpace, Professional, BookingState } from './types';
import { HeaderNavbar } from './components/HeaderNavbar';
import { InteractiveMapSection } from './components/InteractiveMapSection';
import { WorkspaceInfoSection } from './components/WorkspaceInfoSection';
import { UserProfileModal } from './components/UserProfileModal';
import { ProfessionalProfileModal } from './components/ProfessionalProfileModal';
import { BookingFlowOverlay } from './components/BookingFlowOverlay';
import { ScheduleAppointmentModal } from './components/ScheduleAppointmentModal';
import { ConfirmationReceiptModal } from './components/ConfirmationReceiptModal';
import { SynergyMatcherModal } from './components/SynergyMatcherModal';
import { QAModal } from './components/QAModal';

export default function App() {
  const [spaces, setSpaces] = useState<CoWorkingSpace[]>(MOCK_SPACES);
  const [professionals, setProfessionals] = useState<Professional[]>(MOCK_PROFESSIONALS);
  const [checkInLogs, setCheckInLogs] = useState(MOCK_CHECKIN_LOGS);

  // Filters & Selection State
  const [selectedDepartment, setSelectedDepartment] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [selectedSpaceId, setSelectedSpaceId] = useState<string>('space-1');

  // Modals
  const [selectedProfessional, setSelectedProfessional] = useState<Professional | null>(null);
  const [isBookingOpen, setIsBookingOpen] = useState<boolean>(false);
  const [confirmedBooking, setConfirmedBooking] = useState<BookingState | null>(null);
  const [isScheduleOpen, setIsScheduleOpen] = useState<boolean>(false);
  const [scheduleProfessional, setScheduleProfessional] = useState<Professional | null>(null);
  const [isSynergyMatcherOpen, setIsSynergyMatcherOpen] = useState<boolean>(false);
  const [isUserProfileOpen, setIsUserProfileOpen] = useState<boolean>(false);
  const [isQAOpen, setIsQAOpen] = useState<boolean>(false);

  // Selected space object
  const selectedSpace = spaces.find((s) => s.id === selectedSpaceId) || spaces[0];

  // Active professionals checked in to the currently selected space
  const activeProsForSpace = professionals.filter((p) => {
    const isCheckedInHere = p.checkedInSpaceId === selectedSpaceId;
    if (!isCheckedInHere) return false;

    if (selectedDepartment !== 'all' && p.department !== selectedDepartment) {
      return false;
    }

    if (searchQuery) {
      const q = searchQuery.toLowerCase();
      const matchName = p.name.toLowerCase().includes(q);
      const matchCompany = p.company.toLowerCase().includes(q);
      const matchJobTitle = p.jobTitle?.toLowerCase().includes(q) || false;
      const matchDept = p.department.toLowerCase().includes(q);
      const matchIndustry = p.industryTag.toLowerCase().includes(q);
      const matchSkill = p.skills.some((s) => s.toLowerCase().includes(q));
      const matchSpace = selectedSpace.name.toLowerCase().includes(q);
      const matchProject = p.portfolio?.some(
        (proj) =>
          proj.title.toLowerCase().includes(q) ||
          proj.description.toLowerCase().includes(q) ||
          proj.category.toLowerCase().includes(q) ||
          proj.tags.some((t) => t.toLowerCase().includes(q))
      ) || false;
      const matchTimeline = p.timeline?.some(
        (t) =>
          t.role.toLowerCase().includes(q) ||
          t.summary.toLowerCase().includes(q) ||
          t.company.toLowerCase().includes(q)
      ) || false;

      return (
        matchName ||
        matchCompany ||
        matchJobTitle ||
        matchDept ||
        matchIndustry ||
        matchSkill ||
        matchSpace ||
        matchProject ||
        matchTimeline
      );
    }

    return true;
  });

  // Filtered spaces based on search query or department
  const filteredSpaces = spaces.filter((sp) => {
    if (selectedDepartment !== 'all') {
      const hasDept = sp.topDepartments.some(
        (d) => d.toLowerCase() === selectedDepartment.toLowerCase()
      );
      if (!hasDept) return false;
    }

    if (searchQuery) {
      const q = searchQuery.toLowerCase();
      const matchSpaceName = sp.name.toLowerCase().includes(q);
      const matchDistrict = sp.district.toLowerCase().includes(q);
      const matchDept = sp.topDepartments.some((d) => d.toLowerCase().includes(q));

      // Match if any professional checked in at this space matches the query (e.g. by project name or user name)
      const matchMember = professionals.some(
        (p) =>
          p.checkedInSpaceId === sp.id &&
          (p.name.toLowerCase().includes(q) ||
            p.company.toLowerCase().includes(q) ||
            (p.jobTitle && p.jobTitle.toLowerCase().includes(q)) ||
            p.department.toLowerCase().includes(q) ||
            p.industryTag.toLowerCase().includes(q) ||
            p.skills.some((s) => s.toLowerCase().includes(q)) ||
            (p.portfolio &&
              p.portfolio.some(
                (proj) =>
                  proj.title.toLowerCase().includes(q) ||
                  proj.description.toLowerCase().includes(q) ||
                  proj.category.toLowerCase().includes(q) ||
                  proj.tags.some((t) => t.toLowerCase().includes(q))
              )))
      );

      return matchSpaceName || matchDistrict || matchDept || matchMember;
    }

    return true;
  });

  // Handlers
  const handleSelectSpace = (space: CoWorkingSpace) => {
    setSelectedSpaceId(space.id);
  };

  const handleConfirmBooking = (booking: BookingState) => {
    setIsBookingOpen(false);
    setConfirmedBooking(booking);

    // Update occupancy count for space dynamically
    setSpaces((prev) =>
      prev.map((sp) =>
        sp.id === booking.spaceId
          ? { ...sp, occupancyCurrent: Math.min(sp.occupancyCapacity, sp.occupancyCurrent + 1) }
          : sp
      )
    );
  };

  const handleOpenScheduleForProf = (prof: Professional) => {
    setScheduleProfessional(prof);
    setIsScheduleOpen(true);
  };

  const handleConfirmSchedule = (details: { profName: string; time: string; topic: string }) => {
    setIsScheduleOpen(false);
    alert(`Appointment scheduled with ${details.profName} at ${details.time}! Confirmation sent.`);
  };

  return (
    <div className="min-h-screen bg-[#F8FAFC] text-slate-900 flex flex-col font-sans antialiased selection:bg-[#EC4899] selection:text-white">
      
      {/* Top Header Navigation Navbar */}
      <HeaderNavbar
        selectedDepartment={selectedDepartment}
        onSelectDepartment={setSelectedDepartment}
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
        totalHubsCount={spaces.length}
        activeProsCount={professionals.length}
        activeProjectsCount={42}
        onOpenUserProfile={() => setIsUserProfileOpen(true)}
        onOpenQA={() => setIsQAOpen(true)}
      />

      {/* Main Single-View Workspace Map Layout */}
      <main className="flex-1 max-w-[1600px] w-full mx-auto p-3 sm:p-4 lg:p-6 flex flex-col lg:flex-row gap-4 lg:gap-6 overflow-hidden">
        {/* Left Column: Workspace Hub Information Panel */}
        <WorkspaceInfoSection
          space={selectedSpace}
          activeProfessionals={activeProsForSpace}
          onOpenBooking={() => setIsBookingOpen(true)}
          onSelectProfessional={(prof) => setSelectedProfessional(prof)}
        />

        {/* Right Column: Interactive Vector District Map */}
        <InteractiveMapSection
          spaces={filteredSpaces.length > 0 ? filteredSpaces : spaces}
          selectedSpaceId={selectedSpaceId}
          onSelectSpace={handleSelectSpace}
          checkInLogs={checkInLogs}
          onOpenBookingForSpace={(space) => {
            setSelectedSpaceId(space.id);
            setIsBookingOpen(true);
          }}
        />
      </main>

      {/* Modal 1: Professional Profile Overlay */}
      {selectedProfessional && (
        <ProfessionalProfileModal
          professional={selectedProfessional}
          onClose={() => setSelectedProfessional(null)}
          onScheduleAppointment={(prof) => handleOpenScheduleForProf(prof)}
        />
      )}

      {/* Modal 2: Visual Booking Flow & Seat Selection Overlay */}
      {isBookingOpen && (
        <BookingFlowOverlay
          space={selectedSpace}
          isOpen={isBookingOpen}
          onClose={() => setIsBookingOpen(false)}
          onConfirmBooking={handleConfirmBooking}
        />
      )}

      {/* Modal 3: Appointment Scheduler Modal */}
      {isScheduleOpen && (
        <ScheduleAppointmentModal
          professional={scheduleProfessional}
          onClose={() => setIsScheduleOpen(false)}
          onConfirmSchedule={handleConfirmSchedule}
        />
      )}

      {/* Modal 4: Digital Confirmation Pass Receipt Modal */}
      {confirmedBooking && (
        <ConfirmationReceiptModal
          booking={confirmedBooking}
          onClose={() => setConfirmedBooking(null)}
        />
      )}

      {/* Modal 5: AI Synergy Cross-Department Matcher Modal */}
      {isSynergyMatcherOpen && (
        <SynergyMatcherModal
          isOpen={isSynergyMatcherOpen}
          onClose={() => setIsSynergyMatcherOpen(false)}
          spaces={spaces}
          professionals={professionals}
          onSelectSpace={(space) => {
            handleSelectSpace(space);
          }}
          onSelectProfessional={(prof) => setSelectedProfessional(prof)}
        />
      )}

      {/* Modal 6: User Personal Profile Modal (Triggered by Profile button on top right) */}
      <UserProfileModal
        isOpen={isUserProfileOpen}
        onClose={() => setIsUserProfileOpen(false)}
        currentSpace={selectedSpace}
        onOpenBooking={() => setIsBookingOpen(true)}
      />

      {/* Modal 7: Community & Workspace Q&A Modal */}
      <QAModal
        isOpen={isQAOpen}
        onClose={() => setIsQAOpen(false)}
      />

    </div>
  );
}
