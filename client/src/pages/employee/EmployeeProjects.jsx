import React, { useState, useEffect } from 'react';
import api from '../../api/client';
import { useNotification } from '../../context/NotificationContext';
import { Calendar, MapPin, Users, CheckCircle2, Clock, FileText } from 'lucide-react';

const EmployeeProjects = () => {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const { addToast } = useNotification();

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const res = await api.get('/bookings');
        setProjects(res.data || []);
      } catch (err) {
        console.error('Error fetching employee projects', err);
      } finally {
        setLoading(false);
      }
    };
    fetchProjects();
  }, []);

  const updateDeliverable = async (bookingId, itemIndex, newStatus) => {
    try {
      const bkg = projects.find((p) => p._id === bookingId);
      const updatedDeliverables = [...bkg.deliverablesStatus];
      updatedDeliverables[itemIndex].status = newStatus;

      await api.put(`/bookings/${bookingId}/status`, {
        deliverablesStatus: updatedDeliverables,
      });

      setProjects((prev) =>
        prev.map((p) => (p._id === bookingId ? { ...p, deliverablesStatus: updatedDeliverables } : p))
      );
      addToast({ title: 'Status Updated', message: 'Deliverable progress updated.', type: 'success' });
    } catch (err) {
      addToast({ title: 'Error', message: err.message, type: 'error' });
    }
  };

  return (
    <div className="space-y-8 animate-fade-in text-neutral-900">
      <div>
        <span className="text-xs uppercase tracking-widest text-amber-800 font-bold block">
          Shoots & Post-Production
        </span>
        <h1 className="font-serif text-3xl font-bold text-neutral-900">Assigned Projects & Briefs</h1>
      </div>

      <div className="space-y-8">
        {projects.map((proj) => (
          <div key={proj._id} className="bg-white rounded-3xl p-6 sm:p-8 border border-amber-900/15 shadow-sm space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-neutral-200">
              <div>
                <span className="text-xs font-mono text-amber-800 font-bold">Booking #{proj.bookingNumber}</span>
                <h2 className="font-serif text-2xl font-bold text-neutral-900 mt-1">{proj.eventType}</h2>
                <div className="flex flex-wrap items-center gap-2 text-xs text-neutral-600 mt-1">
                  <span>{new Date(proj.eventDate).toLocaleDateString()}</span>
                  <span>•</span>
                  <span>{proj.location?.venue}, {proj.location?.city}</span>
                </div>
              </div>

              <div className="text-xs text-neutral-700 bg-amber-50/70 border border-amber-300/60 p-3 rounded-xl">
                <p>Client: <strong className="text-neutral-900 font-bold">{proj.customer?.name}</strong></p>
                <p>Contact: <strong className="text-amber-900 font-bold">{proj.customer?.phone}</strong></p>
              </div>
            </div>

            {/* Timeline Schedule */}
            {proj.scheduleTimeline?.length > 0 && (
              <div className="space-y-3">
                <h4 className="text-xs uppercase tracking-wider text-amber-900 font-bold">Shot Schedule Checklist</h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                  {proj.scheduleTimeline.map((item, sIdx) => (
                    <div key={sIdx} className="p-3 rounded-xl bg-stone-50 border border-neutral-200 flex items-center justify-between">
                      <div>
                        <span className="font-mono text-amber-800 font-bold mr-2">{item.time}</span>
                        <span className="text-neutral-900 font-medium">{item.event}</span>
                      </div>
                      <span className="text-[10.5px] text-neutral-500 font-mono">{item.notes}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Deliverables Status Toggle */}
            {proj.deliverablesStatus?.length > 0 && (
              <div className="space-y-3 pt-4 border-t border-neutral-200">
                <h4 className="text-xs uppercase tracking-wider text-amber-900 font-bold">Update Deliverable Progress</h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
                  {proj.deliverablesStatus.map((del, dIdx) => (
                    <div key={dIdx} className="p-4 rounded-xl bg-stone-50 border border-neutral-200 flex items-center justify-between gap-2">
                      <span className="text-neutral-900 font-medium">{del.item}</span>
                      <select
                        value={del.status}
                        onChange={(e) => updateDeliverable(proj._id, dIdx, e.target.value)}
                        className="bg-white border border-neutral-300 rounded-lg px-2.5 py-1 text-xs text-amber-900 font-mono font-bold focus:outline-none focus:border-amber-500 shadow-sm"
                      >
                        <option value="Pending">Pending</option>
                        <option value="In Progress">In Progress</option>
                        <option value="Ready">Ready</option>
                        <option value="Delivered">Delivered</option>
                      </select>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default EmployeeProjects;
