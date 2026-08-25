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
    <div className="space-y-8 animate-fade-in">
      <div>
        <span className="text-xs uppercase tracking-widest text-gold-400 font-semibold block">
          Shoots & Post-Production
        </span>
        <h1 className="font-serif text-3xl font-bold text-white">Assigned Projects & Briefs</h1>
      </div>

      <div className="space-y-8">
        {projects.map((proj) => (
          <div key={proj._id} className="luxury-card rounded-3xl p-8 border border-white/10 space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-white/10">
              <div>
                <span className="text-xs font-mono text-gold-400 font-bold">Booking #{proj.bookingNumber}</span>
                <h2 className="font-serif text-2xl font-bold text-white mt-1">{proj.eventType}</h2>
                <div className="flex items-center space-x-3 text-xs text-neutral-400 mt-1">
                  <span>{new Date(proj.eventDate).toLocaleDateString()}</span>
                  <span>•</span>
                  <span>{proj.location?.venue}, {proj.location?.city}</span>
                </div>
              </div>

              <div className="text-xs text-neutral-300">
                <p>Client: <strong className="text-white">{proj.customer?.name}</strong></p>
                <p>Contact: <strong className="text-gold-300">{proj.customer?.phone}</strong></p>
              </div>
            </div>

            {/* Timeline Schedule */}
            {proj.scheduleTimeline?.length > 0 && (
              <div className="space-y-3">
                <h4 className="text-xs uppercase tracking-wider text-gold-300 font-semibold">Shot Schedule Checklist</h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                  {proj.scheduleTimeline.map((item, sIdx) => (
                    <div key={sIdx} className="p-3 rounded-xl bg-obsidian-500 border border-white/5 flex items-center justify-between">
                      <div>
                        <span className="font-mono text-gold-400 font-bold mr-2">{item.time}</span>
                        <span className="text-white">{item.event}</span>
                      </div>
                      <span className="text-[10px] text-neutral-400">{item.notes}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Deliverables Status Toggle */}
            {proj.deliverablesStatus?.length > 0 && (
              <div className="space-y-3 pt-4 border-t border-white/10">
                <h4 className="text-xs uppercase tracking-wider text-gold-300 font-semibold">Update Deliverable Progress</h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
                  {proj.deliverablesStatus.map((del, dIdx) => (
                    <div key={dIdx} className="p-4 rounded-xl bg-obsidian-500 border border-white/5 flex items-center justify-between">
                      <span className="text-white font-medium">{del.item}</span>
                      <select
                        value={del.status}
                        onChange={(e) => updateDeliverable(proj._id, dIdx, e.target.value)}
                        className="bg-obsidian-300 border border-white/15 rounded-lg px-2.5 py-1 text-xs text-gold-300 font-mono focus:outline-none"
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
